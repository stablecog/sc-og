use std::collections::HashMap;
use std::sync::Arc;

use takumi::prelude::{
    FontResource, Fonts, FromHtmlOptions, ImageSource, OutputFormat, RenderOptions, StylePresets,
    Viewport,
};
use takumi::{render, write_image};

pub const FONT_400: &[u8] = include_bytes!("../assets/fonts/avenir-next/avenir-next-400.ttf");
pub const FONT_500: &[u8] = include_bytes!("../assets/fonts/avenir-next/avenir-next-500.ttf");
pub const FONT_700: &[u8] = include_bytes!("../assets/fonts/avenir-next/avenir-next-700.ttf");

pub const PROFILE_BASE_PNG: &[u8] = include_bytes!("../assets/user_profile_preview_base_2.png");
pub const GALLERY_DEFAULT_PNG: &[u8] = include_bytes!("../assets/gallery-v2.png");
pub const FAVICON_ICO: &[u8] = include_bytes!("../public/favicon.ico");

pub struct Renderer {
    fonts: Fonts,
}

impl Renderer {
    pub fn new() -> Result<Self, String> {
        let mut fonts = Fonts::default();
        for bytes in [FONT_400, FONT_500, FONT_700] {
            fonts
                .register(FontResource::new(bytes))
                .map_err(|e| format!("font: {e:?}"))?;
        }
        Ok(Self { fonts })
    }

    /// Renders an HTML template to a 1200x630 PNG. `images` maps `<img src>`
    /// URLs to pre-fetched image sources.
    pub fn render_png(
        &self,
        html: &str,
        images: Vec<(String, ImageSource)>,
    ) -> Result<Vec<u8>, String> {
        // Satori's element presets resolve `em` margins against the 16px base
        // font size, not the element's own font size like takumi's chromium
        // presets do. The templates carry those margins inline instead.
        let options = FromHtmlOptions::builder()
            .presets(StylePresets::empty())
            .build();
        let node = takumi::from_html(html, options).map_err(|e| format!("html: {e:?}"))?;

        let image_map: HashMap<Arc<str>, ImageSource> = images
            .into_iter()
            .map(|(url, source)| (Arc::from(url.as_str()), source))
            .collect();

        let render_options = RenderOptions::builder()
            .viewport(Viewport::new((
                crate::templates::WIDTH,
                crate::templates::HEIGHT,
            )))
            .node(node)
            .fonts(&self.fonts)
            .images(image_map)
            .build();

        let bitmap = render(render_options).map_err(|e| format!("render: {e}"))?;
        let mut out = Vec::new();
        write_image(&bitmap, &mut out, OutputFormat::Png).map_err(|e| format!("encode: {e}"))?;
        Ok(out)
    }
}

pub fn decode_image(bytes: &[u8]) -> Result<ImageSource, String> {
    ImageSource::from_bytes(bytes).map_err(|e| format!("image decode: {e:?}"))
}
