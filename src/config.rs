#[derive(Clone)]
pub struct Config {
    pub go_api_url: String,
    pub imgproxy_url: String,
    pub og_service_token: String,
    pub supabase_url: String,
    pub supabase_admin_key: String,
    pub loki_url: String,
    pub loki_username: String,
    pub loki_password: String,
    pub port: u16,
}

impl Config {
    pub fn from_env() -> Self {
        let get = |key: &str| std::env::var(key).unwrap_or_default();
        Self {
            go_api_url: get("PUBLIC_GO_API_URL"),
            imgproxy_url: get("PUBLIC_IMGPROXY_URL"),
            og_service_token: get("OG_SERVICE_TOKEN"),
            supabase_url: get("PUBLIC_SUPABASE_URL"),
            supabase_admin_key: get("SUPABASE_ADMIN_KEY"),
            loki_url: get("LOKI_URL"),
            loki_username: get("LOKI_USERNAME"),
            loki_password: get("LOKI_PASSWORD"),
            port: std::env::var("PORT")
                .ok()
                .and_then(|p| p.parse().ok())
                .unwrap_or(3000),
        }
    }

    /// Names of required variables that are unset or empty. The service still
    /// starts without them (health checks keep working, matching the old
    /// Next.js behavior), but every route that needs the missing value fails.
    pub fn missing_required(&self) -> Vec<&'static str> {
        [
            ("PUBLIC_GO_API_URL", &self.go_api_url),
            ("PUBLIC_IMGPROXY_URL", &self.imgproxy_url),
            ("OG_SERVICE_TOKEN", &self.og_service_token),
            ("PUBLIC_SUPABASE_URL", &self.supabase_url),
            ("SUPABASE_ADMIN_KEY", &self.supabase_admin_key),
        ]
        .into_iter()
        .filter(|(_, value)| value.is_empty())
        .map(|(name, _)| name)
        .collect()
    }
}
