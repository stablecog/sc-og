use base64::Engine;
use serde::Deserialize;

use crate::config::Config;

// ---------------------------------------------------------------------------
// Types (subset of src/ts/types/gallery.ts actually used by the templates)
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Deserialize)]
pub struct GalleryPage {
    #[serde(default)]
    pub outputs: Vec<GalleryOutput>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct GalleryOutput {
    pub id: String,
    pub image_url: String,
    pub generation: Generation,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Generation {
    pub width: f32,
    pub height: f32,
    pub prompt: Prompt,
    pub model_id: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Prompt {
    pub text: String,
}

#[derive(Debug, Clone)]
pub struct GalleryImage {
    pub url: String,
    pub width: f32,
    pub height: f32,
}

#[derive(Debug, Clone, Deserialize)]
pub struct GenerationModel {
    pub name_in_worker: String,
}

// ---------------------------------------------------------------------------
// Generation model table (src/ts/helpers/getGalleryImages.ts)
// ---------------------------------------------------------------------------

/// (id, short_name, active)
pub const GENERATION_MODELS: &[(&str, &str, bool)] = &[
    ("0a99668b-45bd-4f7e-aa9c-f9aaa41ef13b", "FLUX.1", true),
    ("b6c1372f-31a7-457c-907c-d292a6ffef97", "Luna D.", true),
    ("fc06f6ab-ed14-4186-a7c0-aaec288d4f38", "22h D.", true),
    ("f7f3d973-ac6f-4a7a-9db8-e89e4fba03a9", "Waifu D.", true),
    ("8acfe4c8-751d-4aa6-8c3c-844e3ef478e0", "Openjourney", true),
    ("eaa438e1-dbf9-48fd-be71-206f0f257617", "Redshift D.", true),
    ("8002bc51-7260-468f-8840-cf1e6dbe3f8a", "SDXL", true),
    ("22b0857d-7edc-4d00-9cd9-45aa509db093", "Kandinsky", true),
    ("9fa49c00-109d-430f-9ddd-449f02e2c71a", "Kandinsky 2.2", true),
    ("3fb1f6d9-c0d3-4ae4-adf4-77f8da78a6f7", "Waifu D. XL", true),
    ("048b4aa3-5586-47ed-900f-f4341c96bdb2", "SD v1.5", false),
    ("48a7031d-43b6-4a23-9f8c-8020eb6862e4", "Ghibli D.", false),
    ("36d9d835-646f-4fc7-b9fe-98654464bf8e", "Arcane D.", true),
    ("4e54440f-ee17-4712-b4b6-0671b94d685d", "SSD-1B", true),
    ("986d447d-c38b-4218-a2c8-6e0b691f47ec", "Stable D. 3", true),
];

pub fn model_short_name(id: &str) -> &'static str {
    GENERATION_MODELS
        .iter()
        .find(|(model_id, _, _)| *model_id == id)
        .map(|(_, short, _)| *short)
        .unwrap_or("Unknown")
}

fn is_active_model_id(id: &str) -> bool {
    GENERATION_MODELS
        .iter()
        .any(|(model_id, _, active)| *model_id == id && *active)
}

const AVAILABLE_ASPECT_RATIOS: &[&str] = &["1-1", "4-5", "2-3", "3-2", "9-16", "16-9", "2_4-1"];

// ---------------------------------------------------------------------------
// imgproxy (src/ts/helpers/getImgProxySrc.ts)
// ---------------------------------------------------------------------------

pub fn imgproxy_src(cfg: &Config, src: &str, preset: &str, extension: &str) -> String {
    let encoded = base64::engine::general_purpose::URL_SAFE_NO_PAD.encode(src);
    format!("{}/insecure/{preset}/{encoded}.{extension}", cfg.imgproxy_url)
}

// ---------------------------------------------------------------------------
// base64 query decoding (src/ts/helpers/base64ToSearchParams.ts)
// ---------------------------------------------------------------------------

pub fn base64_to_query_pairs(encoded: &str) -> Vec<(String, String)> {
    let standard: String = encoded
        .chars()
        .filter_map(|c| match c {
            '-' => Some('+'),
            '_' => Some('/'),
            '=' => None,
            other => Some(other),
        })
        .collect();
    let Ok(bytes) = base64::engine::general_purpose::STANDARD_NO_PAD.decode(standard) else {
        return Vec::new();
    };
    form_urlencoded::parse(&bytes)
        .map(|(k, v)| (k.into_owned(), v.into_owned()))
        .collect()
}

// ---------------------------------------------------------------------------
// Gallery-like params (getGalleryLikeParamsFromSearchParams)
// ---------------------------------------------------------------------------

pub struct GalleryParams {
    pub search: String,
    pub model_ids: Vec<String>,
    pub aspect_ratios: Vec<String>,
    pub usernames: Vec<String>,
    pub sorts: Vec<String>,
    /// True when the `sort` param was absent/empty and the default was applied.
    /// The original code compares against the default array by reference, so an
    /// explicit `sort=new` still counts as non-default.
    pub sorts_is_default: bool,
}

impl GalleryParams {
    pub fn from_pairs(pairs: &[(String, String)]) -> Self {
        let get = |key: &str| {
            pairs
                .iter()
                .find(|(k, _)| k == key)
                .map(|(_, v)| v.as_str())
        };
        let split_csv = |value: Option<&str>| -> Vec<String> {
            value
                .map(|v| v.split(',').map(str::to_owned).collect())
                .unwrap_or_default()
        };

        let model_ids = split_csv(get("mi"))
            .into_iter()
            .filter(|id| is_active_model_id(id))
            .collect();
        let aspect_ratios = split_csv(get("ar"))
            .into_iter()
            .filter(|ar| AVAILABLE_ASPECT_RATIOS.contains(&ar.as_str()))
            .collect();
        let search = get("q").unwrap_or_default().to_owned();
        let usernames = split_csv(get("un"));
        let sort_query = get("sort").filter(|s| !s.is_empty());
        let sorts_is_default = sort_query.is_none();
        let sorts = match sort_query {
            Some(s) => s.split(',').map(str::to_owned).collect(),
            None => vec!["new".to_owned()],
        };

        Self {
            search,
            model_ids,
            aspect_ratios,
            usernames,
            sorts,
            sorts_is_default,
        }
    }

    /// Mirrors the "everything is default → serve the static preview" check.
    pub fn is_default(&self) -> bool {
        self.search.is_empty()
            && self.aspect_ratios.is_empty()
            && self.model_ids.is_empty()
            && (self.sorts.is_empty() || self.sorts_is_default)
            && self.usernames.is_empty()
    }
}

// ---------------------------------------------------------------------------
// Go API clients (getOutput / getGalleryImages)
// ---------------------------------------------------------------------------

/// Sends a GET request, retrying once on a transport-level error. A pooled
/// keep-alive connection the upstream already closed surfaces as a send error;
/// the retry opens a fresh connection. Timeouts are not retried.
pub async fn send_with_retry(
    req: reqwest::RequestBuilder,
) -> Result<reqwest::Response, reqwest::Error> {
    let retry = req.try_clone();
    match req.send().await {
        Err(e) if !e.is_timeout() && retry.is_some() => retry.unwrap().send().await,
        other => other,
    }
}

pub async fn get_output(
    http: &reqwest::Client,
    cfg: &Config,
    id: &str,
    username: Option<&str>,
) -> Result<GalleryOutput, String> {
    let url = match username {
        Some(username) => format!(
            "{}/v1/profile/{username}/outputs?output_id={id}",
            cfg.go_api_url
        ),
        None => format!("{}/v1/gallery?output_id={id}", cfg.go_api_url),
    };
    let res = send_with_retry(http.get(&url))
        .await
        .map_err(|e| format!("Request failed: {e} ({url})"))?;
    if !res.status().is_success() {
        return Err("Response wasn't okay".to_owned());
    }
    let page: GalleryPage = res
        .json()
        .await
        .map_err(|e| format!("Failed to parse response: {e}"))?;
    page.outputs.into_iter().next().ok_or("No data".to_owned())
}

pub struct GalleryImagesRequest<'a> {
    pub params: &'a GalleryParams,
    pub per_page: u32,
    pub imgproxy_preset: &'a str,
}

pub async fn get_gallery_images(
    http: &reqwest::Client,
    cfg: &Config,
    req: GalleryImagesRequest<'_>,
) -> Result<Vec<GalleryImage>, String> {
    const SEARCH_SCORE_THRESHOLD: u32 = 50;
    const OVERSAMPLING: u32 = 8;

    let params = req.params;
    let mut query: Vec<(&str, String)> = vec![
        ("per_page", req.per_page.to_string()),
        ("oversampling", OVERSAMPLING.to_string()),
    ];
    if !params.search.is_empty() {
        query.push(("search", params.search.clone()));
        query.push(("score_threshold", SEARCH_SCORE_THRESHOLD.to_string()));
    }
    if !params.model_ids.is_empty() {
        query.push(("model_ids", params.model_ids.join(",")));
    }
    if !params.aspect_ratios.is_empty() {
        let mapped: Vec<String> = params
            .aspect_ratios
            .iter()
            .map(|ar| ar.replace('.', "_").replace(':', "-"))
            .collect();
        query.push(("aspect_ratio", mapped.join(",")));
    }
    if !params.usernames.is_empty() {
        query.push(("username", params.usernames.join(",")));
    }
    if !params.sorts.is_empty() {
        query.push(("sort", params.sorts.join(",")));
    }

    let res = send_with_retry(
        http.get(format!("{}/v1/gallery", cfg.go_api_url))
            .query(&query)
            .header("Content-Type", "application/json")
            .header("X-OG-Service-Token", &cfg.og_service_token),
    )
    .await
    .map_err(|e| format!("Failed to fetch gallery outputs: {e} ({}/v1/gallery)", cfg.go_api_url))?;
    if !res.status().is_success() {
        return Err(format!(
            "Failed to fetch gallery outputs: {}",
            res.status()
        ));
    }
    let page: GalleryPage = res
        .json()
        .await
        .map_err(|e| format!("Failed to parse gallery outputs: {e}"))?;
    Ok(page
        .outputs
        .into_iter()
        .map(|output| GalleryImage {
            url: imgproxy_src(cfg, &output.image_url, req.imgproxy_preset, "png"),
            width: output.generation.width,
            height: output.generation.height,
        })
        .collect())
}

// ---------------------------------------------------------------------------
// Supabase PostgREST (getGenerationModel) — replaces @supabase/supabase-js
// ---------------------------------------------------------------------------

pub async fn get_generation_model(
    http: &reqwest::Client,
    cfg: &Config,
    id: &str,
) -> Result<GenerationModel, String> {
    if cfg.supabase_url.is_empty() || cfg.supabase_admin_key.is_empty() {
        return Err("No Supabase instance found".to_owned());
    }
    let res = send_with_retry(
        http.get(format!("{}/rest/v1/generation_models", cfg.supabase_url))
            .query(&[
                ("select", "name_in_worker,created_at,updated_at,id"),
                ("id", &format!("eq.{id}")),
            ])
            .header("apikey", &cfg.supabase_admin_key)
            .bearer_auth(&cfg.supabase_admin_key),
    )
    .await
    .map_err(|e| e.to_string())?;
    if !res.status().is_success() {
        return Err(format!("Supabase request failed: {}", res.status()));
    }
    let rows: Vec<GenerationModel> = res.json().await.map_err(|e| e.to_string())?;
    rows.into_iter()
        .next()
        .ok_or("Something went wrong".to_owned())
}
