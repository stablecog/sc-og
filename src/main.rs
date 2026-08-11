mod config;
mod data;
mod logger;
mod render;
mod templates;

use std::sync::Arc;
use std::time::{Duration, Instant};

use axum::{
    extract::{Path, Request, State},
    http::{header, HeaderValue, Method, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};
use futures::future::join_all;
use takumi::prelude::ImageSource;
use tower_http::cors::{AllowHeaders, Any, CorsLayer};

use config::Config;
use data::GalleryImagesRequest;
use logger::Logger;
use render::Renderer;

struct AppState {
    cfg: Config,
    http: reqwest::Client,
    logger: Logger,
    renderer: Renderer,
    profile_base: ImageSource,
}

#[tokio::main]
async fn main() {
    // Load .env / .env.local (earlier files win). Variables already set in
    // the environment take precedence over both, so in production the k8s
    // secret wins.
    for path in [".env", ".env.local"] {
        let _ = dotenvy::from_filename(path);
    }
    let cfg = Config::from_env();
    let http = reqwest::Client::builder()
        .timeout(Duration::from_secs(30))
        // Drop idle keep-alive connections well before upstreams/proxies do,
        // so we don't send requests down sockets the other side already closed.
        .pool_idle_timeout(Duration::from_secs(90))
        // HTTP/2 connection reuse against the Cloudflare-proxied Supabase
        // origin intermittently stalls; the Next.js version (undici) spoke
        // HTTP/1.1 only, so match that.
        .http1_only()
        .build()
        .expect("failed to build http client");
    let logger = Logger::new(&cfg, http.clone());
    let missing = cfg.missing_required();
    if !missing.is_empty() {
        logger.error(format!(
            "🔴 Missing required env vars: {} — routes depending on them will fail. \
             For local runs: set -a; source .env.local; set +a",
            missing.join(", ")
        ));
    }
    let renderer = Renderer::new().expect("failed to load fonts");
    let profile_base =
        render::decode_image(render::PROFILE_BASE_PNG).expect("failed to decode profile base");

    let port = cfg.port;
    let state = Arc::new(AppState {
        cfg,
        http,
        logger: logger.clone(),
        renderer,
        profile_base,
    });

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([
            Method::GET,
            Method::HEAD,
            Method::PUT,
            Method::PATCH,
            Method::POST,
            Method::DELETE,
        ])
        .allow_headers(AllowHeaders::mirror_request());

    let app = Router::new()
        .route("/", get(root))
        .route("/api", get(root))
        .route("/api/health", get(health))
        .route("/favicon.ico", get(favicon))
        .route("/user_profile_preview_base_2.png", get(profile_base_png))
        .route("/gallery-v2.png", get(gallery_default_png))
        .route(
            "/api/user/{username}/profile-preview.png",
            get(user_profile_preview),
        )
        .route("/api/user/{username}/output/{id_with_ext}", get(user_output))
        .route("/api/gallery/output/{id_with_ext}", get(gallery_output))
        .route(
            "/api/gallery/preview/{encoded_string_with_ext}",
            get(gallery_preview),
        )
        .route(
            "/api/generation-model-v2/{model_id_with_ext}",
            get(generation_model),
        )
        .layer(cors)
        .layer(middleware::from_fn_with_state(state.clone(), log_requests))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind(("0.0.0.0", port))
        .await
        .expect("failed to bind");
    logger.info(format!("🚀 sc-og listening on port {port}"));
    axum::serve(listener, app).await.expect("server error");
}

// ---------------------------------------------------------------------------
// Basic routes
// ---------------------------------------------------------------------------

async fn root() -> impl IntoResponse {
    Json(serde_json::json!({ "status": "ok" }))
}

async fn health() -> &'static str {
    "ok"
}

async fn favicon() -> impl IntoResponse {
    (
        [(header::CONTENT_TYPE, "image/x-icon")],
        render::FAVICON_ICO,
    )
}

async fn profile_base_png() -> impl IntoResponse {
    ([(header::CONTENT_TYPE, "image/png")], render::PROFILE_BASE_PNG)
}

async fn gallery_default_png() -> impl IntoResponse {
    ([(header::CONTENT_TYPE, "image/png")], render::GALLERY_DEFAULT_PNG)
}

// ---------------------------------------------------------------------------
// OG image routes
// ---------------------------------------------------------------------------

async fn user_profile_preview(
    State(state): State<Arc<AppState>>,
    Path(username): Path<String>,
) -> Response {
    let start = Instant::now();
    let html = templates::og_profile(&username);
    let images = vec![(
        templates::PROFILE_BASE_IMAGE_URL.to_owned(),
        state.profile_base.clone(),
    )];
    match render_blocking(&state, html, images).await {
        Ok(png) => {
            state.logger.info(format!(
                "✅ OG for \"@{username}\" - {}ms",
                start.elapsed().as_millis()
            ));
            png_response(png)
        }
        Err(err) => internal_error(&state, err),
    }
}

async fn user_output(
    State(state): State<Arc<AppState>>,
    Path((username, id_with_ext)): Path<(String, String)>,
) -> Response {
    output_response(&state, &id_with_ext, Some(&username)).await
}

async fn gallery_output(
    State(state): State<Arc<AppState>>,
    Path(id_with_ext): Path<String>,
) -> Response {
    output_response(&state, &id_with_ext, None).await
}

async fn output_response(
    state: &Arc<AppState>,
    id_with_ext: &str,
    username: Option<&str>,
) -> Response {
    let start = Instant::now();
    let id = id_with_ext.split('.').next().unwrap_or_default();
    let output = match data::get_output(&state.http, &state.cfg, id, username).await {
        Ok(output) => output,
        Err(err) => return internal_error(state, err),
    };
    let final_image_url = data::imgproxy_src(&state.cfg, &output.image_url, "768w", "png");
    let image = match fetch_image(state, &final_image_url).await {
        Ok(image) => image,
        Err(err) => return internal_error(state, err),
    };
    let html = templates::og_output(&output, username, &final_image_url);
    match render_blocking(state, html, vec![(final_image_url, image)]).await {
        Ok(png) => {
            state.logger.info(format!(
                "✅ OG for \"{}\" - {}ms",
                output.id,
                start.elapsed().as_millis()
            ));
            png_response(png)
        }
        Err(err) => internal_error(state, err),
    }
}

async fn gallery_preview(
    State(state): State<Arc<AppState>>,
    Path(encoded_string_with_ext): Path<String>,
) -> Response {
    let start = Instant::now();
    if encoded_string_with_ext == "main.png" {
        return default_gallery_response();
    }
    let encoded = encoded_string_with_ext
        .split('.')
        .next()
        .unwrap_or_default();
    if encoded.is_empty() {
        return default_gallery_response();
    }
    let pairs = data::base64_to_query_pairs(encoded);
    let params = data::GalleryParams::from_pairs(&pairs);
    if params.is_default() {
        return default_gallery_response();
    }

    let num_images = templates::GALLERY_GRID_COLS * templates::GALLERY_GRID_ROWS;
    let images = match data::get_gallery_images(
        &state.http,
        &state.cfg,
        GalleryImagesRequest {
            params: &params,
            per_page: num_images as u32,
            imgproxy_preset: "256w",
        },
    )
    .await
    {
        Ok(images) if images.len() >= num_images => images,
        Ok(_) => return default_gallery_response(),
        Err(err) => {
            state.logger.error(format!("🔴 {err}"));
            return default_gallery_response();
        }
    };

    // The last grid cell is the logo, so only the first N-1 images are drawn.
    // A single failed image fetch doesn't sink the grid: the cell renders
    // empty, like Satori did when one of its image fetches failed.
    let fetched = join_all(
        images[..num_images - 1]
            .iter()
            .map(|image| fetch_image_pair(&state, image.url.clone())),
    )
    .await;
    let mut sources = Vec::new();
    let mut resolved = std::collections::HashSet::new();
    for result in fetched {
        match result {
            Ok((url, source)) => {
                resolved.insert(url.clone());
                sources.push((url, source));
            }
            Err(err) => state.logger.error(format!("🔴 {err}")),
        }
    }

    let html = templates::og_gallery(&images, &resolved);
    match render_blocking(&state, html, sources).await {
        Ok(png) => {
            state.logger.info(format!(
                "✅ OG for search \"{}\" - {}ms",
                params.search,
                start.elapsed().as_millis()
            ));
            png_response(png)
        }
        Err(err) => {
            state.logger.error(format!("🔴 {err}"));
            default_gallery_response()
        }
    }
}

async fn generation_model(
    State(state): State<Arc<AppState>>,
    Path(model_id_with_ext): Path<String>,
) -> Response {
    let start = Instant::now();
    let id = model_id_with_ext.split('.').next().unwrap_or_default();
    let model = match data::get_generation_model(&state.http, &state.cfg, id).await {
        Ok(model) => model,
        Err(err) => return internal_error(&state, err),
    };
    let preview_url = templates::model_preview_url(&model.name_in_worker);
    let image = match fetch_image(&state, &preview_url).await {
        Ok(image) => image,
        Err(err) => return internal_error(&state, err),
    };
    let html = templates::og_generation_model(&model.name_in_worker);
    match render_blocking(&state, html, vec![(preview_url, image)]).await {
        Ok(png) => {
            state.logger.info(format!(
                "✅ OG for model \"{id}\" - {}ms",
                start.elapsed().as_millis()
            ));
            png_response(png)
        }
        Err(err) => internal_error(&state, err),
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async fn render_blocking(
    state: &Arc<AppState>,
    html: String,
    images: Vec<(String, ImageSource)>,
) -> Result<Vec<u8>, String> {
    let state = state.clone();
    tokio::task::spawn_blocking(move || state.renderer.render_png(&html, images))
        .await
        .map_err(|e| format!("render task failed: {e}"))?
}

async fn fetch_image(state: &Arc<AppState>, url: &str) -> Result<ImageSource, String> {
    let res = data::send_with_retry(state.http.get(url))
        .await
        .map_err(|e| format!("Failed to fetch image: {e}"))?;
    if !res.status().is_success() {
        return Err(format!("Failed to fetch image: {} ({url})", res.status()));
    }
    let bytes = res
        .bytes()
        .await
        .map_err(|e| format!("Failed to read image: {e}"))?;
    render::decode_image(&bytes)
}

async fn fetch_image_pair(
    state: &Arc<AppState>,
    url: String,
) -> Result<(String, ImageSource), String> {
    let source = fetch_image(state, &url).await?;
    Ok((url, source))
}

fn png_response(bytes: Vec<u8>) -> Response {
    (
        [
            (header::CONTENT_TYPE, "image/png"),
            (
                header::CACHE_CONTROL,
                "public, immutable, no-transform, max-age=31536000",
            ),
        ],
        bytes,
    )
        .into_response()
}

fn default_gallery_response() -> Response {
    (
        [(header::CONTENT_TYPE, "image/png")],
        render::GALLERY_DEFAULT_PNG,
    )
        .into_response()
}

fn internal_error(state: &Arc<AppState>, err: String) -> Response {
    state.logger.error(format!("🔴 {err}"));
    (StatusCode::INTERNAL_SERVER_ERROR, err).into_response()
}

// ---------------------------------------------------------------------------
// Request logging (src/middleware.ts + src/ts/helpers/asTable.ts)
// ---------------------------------------------------------------------------

async fn log_requests(
    State(state): State<Arc<AppState>>,
    req: Request,
    next: Next,
) -> Response {
    fn header_str(req: &Request, name: header::HeaderName) -> String {
        req.headers()
            .get(name)
            .and_then(|v: &HeaderValue| v.to_str().ok())
            .unwrap_or("Unknown")
            .to_owned()
    }
    let user_agent = header_str(&req, header::USER_AGENT);
    if !user_agent.starts_with("kube-probe") {
        let method = req.method().to_string();
        let relative_url = req
            .uri()
            .path_and_query()
            .map(|pq| pq.to_string())
            .unwrap_or_else(|| req.uri().path().to_owned());
        let referer = header_str(&req, header::REFERER);
        state.logger.info(as_table(
            &[
                ("Request Method", &method),
                ("Relative URL", &relative_url),
                ("User Agent", &user_agent),
                ("Referer", &referer),
            ],
            100,
        ));
    }
    next.run(req).await
}

fn as_table(data: &[(&str, &str)], width: usize) -> String {
    if data.is_empty() {
        return String::new();
    }
    let max_prop = data.iter().map(|(p, _)| p.len()).max().unwrap_or(0);
    let max_value = width.saturating_sub(max_prop + 3).max(1);
    let divider = "-".repeat(width);
    let mut out = format!("{divider}\n");
    for (prop, value) in data {
        for (i, line) in wrap_text(value, max_value).iter().enumerate() {
            let prop_text = if i == 0 {
                format!("{prop:<max_prop$}")
            } else {
                " ".repeat(max_prop)
            };
            out.push_str(&format!("{prop_text} | {line:<max_value$}\n"));
        }
    }
    out.push_str(&divider);
    out
}

fn wrap_text(text: &str, max_length: usize) -> Vec<String> {
    let mut lines = Vec::new();
    let mut current = String::new();
    for c in text.chars() {
        if current.chars().count() >= max_length {
            lines.push(std::mem::take(&mut current));
        }
        if c == ' ' && current.is_empty() {
            continue;
        }
        current.push(c);
        if c == '\n' {
            lines.push(std::mem::take(&mut current));
        }
    }
    if !current.is_empty() {
        lines.push(current);
    }
    lines
}
