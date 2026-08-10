## Stablecog OG Image API

This is the OG image API of [Stablecog](https://stablecog.com). It is live at [og.stablecog.com](https://og.stablecog.com). This API is responsible for generating the OG images for our gallery searches, profile pages, generation pages, and model pages.

It is a Rust service built on [axum](https://github.com/tokio-rs/axum) and [takumi](https://github.com/kane50613/takumi) (a Satori-compatible renderer), ported from the original Next.js + `@vercel/og` implementation.

### Endpoints

| Route                                      | Renders                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `/api/user/{username}/profile-preview.png` | Profile card                                             |
| `/api/user/{username}/output/{id}.png`     | Output card with `@username`                             |
| `/api/gallery/output/{id}.png`             | Output card                                              |
| `/api/gallery/preview/{base64-params}.png` | 5×2 gallery search grid (falls back to a static preview) |
| `/api/generation-model-v2/{model-id}.png`  | Model promo card                                         |
| `/`, `/api`, `/api/health`                 | Health checks                                            |

### Development

```bash
cargo run
```

Or with auto-reload on save (`brew install watchexec`):

```bash
watchexec -r -e rs,toml -- cargo run
```

`.env` at the repo root is loaded automatically (real environment variables take precedence). Environment variables: `PUBLIC_GO_API_URL`, `PUBLIC_IMGPROXY_URL`, `OG_SERVICE_TOKEN`, `PUBLIC_SUPABASE_URL`, `SUPABASE_ADMIN_KEY`, optionally `LOKI_URL`/`LOKI_USERNAME`/`LOKI_PASSWORD` and `PORT` (default 3000).

Fonts and fallback images are embedded in the binary at compile time from [`assets/`](assets) and [`public/`](public).
