use std::time::{Duration, SystemTime, UNIX_EPOCH};

use serde_json::json;
use tokio::sync::mpsc;

const BATCH_SIZE: usize = 10;
const FLUSH_INTERVAL: Duration = Duration::from_millis(250);

struct LokiTarget {
    url: String,
    username: String,
    password: String,
    http: reqwest::Client,
}

/// Console + batched Loki logger, mirroring the behavior of the original
/// `src/ts/constants/logger.ts` (labels application=sc-og, logger=root).
#[derive(Clone)]
pub struct Logger {
    tx: mpsc::UnboundedSender<(&'static str, String)>,
}

impl Logger {
    pub fn new(cfg: &crate::config::Config, http: reqwest::Client) -> Self {
        let (tx, mut rx) = mpsc::unbounded_channel::<(&'static str, String)>();
        if cfg.loki_url.is_empty() {
            eprintln!("LOKI_URL is not set. Logs will only be output to console.");
        }
        let target = LokiTarget {
            url: cfg.loki_url.clone(),
            username: cfg.loki_username.clone(),
            password: cfg.loki_password.clone(),
            http,
        };
        tokio::spawn(async move {
            let mut batch: Vec<(&'static str, String, u128)> = Vec::new();
            let mut last_ts: u128 = 0;
            let mut ticker = tokio::time::interval(FLUSH_INTERVAL);
            ticker.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
            loop {
                tokio::select! {
                    msg = rx.recv() => match msg {
                        Some((level, text)) => {
                            let now = SystemTime::now()
                                .duration_since(UNIX_EPOCH)
                                .unwrap_or_default()
                                .as_nanos();
                            last_ts = now.max(last_ts + 1);
                            batch.push((level, text, last_ts));
                            if batch.len() >= BATCH_SIZE {
                                flush(&target, &mut batch).await;
                            }
                        }
                        None => {
                            flush(&target, &mut batch).await;
                            break;
                        }
                    },
                    _ = ticker.tick() => {
                        if !batch.is_empty() {
                            flush(&target, &mut batch).await;
                        }
                    }
                }
            }
        });
        Self { tx }
    }

    pub fn info(&self, msg: impl Into<String>) {
        let msg = msg.into();
        println!("{msg}");
        let _ = self.tx.send(("info", msg));
    }

    pub fn error(&self, msg: impl Into<String>) {
        let msg = msg.into();
        eprintln!("{msg}");
        let _ = self.tx.send(("error", msg));
    }
}

async fn flush(target: &LokiTarget, batch: &mut Vec<(&'static str, String, u128)>) {
    let entries = std::mem::take(batch);
    if target.url.is_empty() || entries.is_empty() {
        return;
    }
    let mut by_level: Vec<(&'static str, Vec<[String; 2]>)> = Vec::new();
    for (level, text, ts) in entries {
        match by_level.iter_mut().find(|(l, _)| *l == level) {
            Some((_, values)) => values.push([ts.to_string(), text]),
            None => by_level.push((level, vec![[ts.to_string(), text]])),
        }
    }
    let body = json!({
        "streams": by_level
            .into_iter()
            .map(|(level, values)| {
                json!({
                    "stream": {
                        "level": level,
                        "application": "sc-og",
                        "logger": "root",
                    },
                    "values": values,
                })
            })
            .collect::<Vec<_>>(),
    });
    let mut req = target
        .http
        .post(format!("{}/loki/api/v1/push", target.url))
        .json(&body);
    if !target.username.is_empty() && !target.password.is_empty() {
        req = req.basic_auth(&target.username, Some(&target.password));
    }
    if let Err(err) = req.send().await.and_then(|res| res.error_for_status()) {
        eprintln!("Error sending logs to Loki: {err}");
    }
}
