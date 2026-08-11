//! HTML templates for the OG images, ported 1:1 from the original JSX
//! components in `src/components/`. takumi's `from_html` understands the same
//! `tw` attribute the Satori templates used.

use crate::data::{model_short_name, GalleryImage, GalleryOutput};

pub const WIDTH: u32 = 1200;
pub const HEIGHT: u32 = 630;

const BG_COLOR: &str = "rgb(18, 18, 23)";
const ON_BG_COLOR: &str = "rgb(220, 220, 234)";
const BG_SECONDARY_COLOR: &str = "rgb(28, 28, 35)";

/// URL key under which the embedded profile/gallery base image is registered
/// with the renderer (the original fetched this exact URL from itself).
pub const PROFILE_BASE_IMAGE_URL: &str =
    "https://og.stablecog.com/user_profile_preview_base_2.png";

pub fn esc(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '&' => out.push_str("&amp;"),
            '<' => out.push_str("&lt;"),
            '>' => out.push_str("&gt;"),
            '"' => out.push_str("&quot;"),
            '\'' => out.push_str("&#39;"),
            _ => out.push(c),
        }
    }
    out
}

/// The dotted background shared by the profile/output/gallery templates:
/// four radial gradients tiled at 42px.
fn dot_background() -> String {
    let dot_color = "rgba(220, 220, 234, 0.03)";
    let d = 42;
    let size = 5;
    format!(
        "background-image: \
         radial-gradient(circle at 0px 0px, {dot_color} {size}%, transparent 0%), \
         radial-gradient(circle at 0px {d}px, {dot_color} {size}%, transparent 0%), \
         radial-gradient(circle at {d}px 0px, {dot_color} {size}%, transparent 0%), \
         radial-gradient(circle at {d}px {d}px, {dot_color} {size}%, transparent 0%); \
         background-size: {d}px {d}px;"
    )
}

// ---------------------------------------------------------------------------
// Logos (src/components/logos)
// ---------------------------------------------------------------------------

pub fn logo_horizontal(width: f32) -> String {
    let height = width / (271.0 / 54.0);
    format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 271 54" fill="none"><path fill="url(#a)" d="M1.6 41.47c-1.15 1.15-1.16 3.05.17 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77c.8.2 1.6-.26 1.81-1.05l.02-.05a2.14 2.14 0 0 1 2.1-1.53c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77a1.48 1.48 0 0 0 1.05-1.8l-.01-.05c-.25-.93.2-1.9 1.04-2.38a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l2.09-2.09a1.5 1.5 0 0 0 0-2.09l-.04-.03a2.16 2.16 0 0 1-.27-2.6 2.13 2.13 0 0 1 2.38-1.04h.04c.8.22 1.6-.25 1.81-1.04l.77-2.85c.2-.79-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.54-2.1c0-.97.6-1.85 1.54-2.1l.05-.02a1.48 1.48 0 0 0 1.05-1.8l-.77-2.86a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.74 17.74 0 0 0-2.8-3.63L1.62 41.47Z"/><path fill="url(#b)" d="M1.6 41.47c-1.15 1.15-1.16 3.05.17 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77c.8.2 1.6-.26 1.81-1.05l.02-.05a2.14 2.14 0 0 1 2.1-1.53c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77a1.48 1.48 0 0 0 1.05-1.8l-.01-.05c-.25-.93.2-1.9 1.04-2.38a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l2.09-2.09a1.5 1.5 0 0 0 0-2.09l-.04-.03a2.16 2.16 0 0 1-.27-2.6 2.13 2.13 0 0 1 2.38-1.04h.04c.8.22 1.6-.25 1.81-1.04l.77-2.85c.2-.79-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.54-2.1c0-.97.6-1.85 1.54-2.1l.05-.02a1.48 1.48 0 0 0 1.05-1.8l-.77-2.86a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.74 17.74 0 0 0-2.8-3.63L1.62 41.47Z"/><path fill="url(#c)" d="M4.74 11.2a1.48 1.48 0 0 1 0-2.1l2.09-2.08a1.48 1.48 0 0 1 2.08 0l.04.03c.68.68 1.76.76 2.6.27a2.13 2.13 0 0 0 1.04-2.37l-.01-.05c-.21-.79.26-1.6 1.04-1.8l2.85-.77c.8-.21 1.6.26 1.81 1.04l.02.05a2.14 2.14 0 0 0 2.1 1.54c.96 0 1.85-.6 2.1-1.54l.01-.05a1.48 1.48 0 0 1 1.81-1.04l2.85.76a1.48 1.48 0 0 1 1.05 1.81 2.2 2.2 0 0 0 1.08 2.45c.47.28.93.57 1.38.9 1.32.94 1.31 2.83.16 3.99L7.87 35.2a17.75 17.75 0 0 1-2.8-3.62 2.21 2.21 0 0 0-2.45-1.08c-.78.2-1.6-.26-1.8-1.05L.04 26.6c-.21-.79.26-1.6 1.04-1.8l.05-.02a2.14 2.14 0 0 0 1.54-2.1c0-.97-.6-1.86-1.54-2.1l-.05-.02a1.48 1.48 0 0 1-1.04-1.8L.8 15.9a1.48 1.48 0 0 1 1.81-1.04h.05c.93.26 1.9-.2 2.38-1.03.48-.84.4-1.92-.28-2.6l-.03-.04Z"/><path fill="url(#d)" fill-rule="evenodd" d="M5.36 10.57a1.48 1.48 0 0 1 0-2.09l1.5-1.5a1.5 1.5 0 0 0-.03.04L4.73 9.1a1.48 1.48 0 0 0 0 2.1l.04.03a2.16 2.16 0 0 1 .2 2.73c.28-.2.52-.45.7-.76.48-.83.41-1.91-.27-2.6l-.04-.03Zm-3.8 4.4c-.36.19-.63.52-.75.93l-.76 2.85c-.21.8.26 1.6 1.04 1.81l.05.01a2.14 2.14 0 0 1 1.54 2.1c0 .45-.13.89-.36 1.24.61-.39.99-1.1.99-1.86 0-.96-.6-1.85-1.54-2.1l-.05-.01a1.48 1.48 0 0 1-1.04-1.81l.76-2.85c.03-.11.07-.21.12-.3Zm-.77 9.94c-.6.31-.92 1-.74 1.69l.76 2.85a1.48 1.48 0 0 0 1.81 1.05 2.2 2.2 0 0 1 2.45 1.08c.76 1.3 1.69 2.51 2.8 3.62l-6.26 6.27c-1.16 1.15-1.17 3.05.16 4 .45.31.9.61 1.38.88.85.5 1.33 1.5 1.08 2.45-.21.8.25 1.6 1.04 1.81l2.85.77a1.5 1.5 0 0 0 1.7-.74c-.32.16-.7.21-1.07.11L5.9 50a1.48 1.48 0 0 1-1.05-1.8 2.21 2.21 0 0 0-1.08-2.46 17.6 17.6 0 0 1-1.38-.89c-1.32-.95-1.31-2.84-.16-4l6.27-6.26a17.74 17.74 0 0 1-2.8-3.63 2.21 2.21 0 0 0-2.45-1.08c-.79.21-1.6-.25-1.81-1.04l-.76-2.85a1.5 1.5 0 0 1 .11-1.07Zm10.02 24.2a2.3 2.3 0 0 1 1.24-.36c.96 0 1.85.6 2.1 1.53l.01.05a1.48 1.48 0 0 0 1.81 1.05l2.85-.77c.42-.1.74-.39.93-.74-.1.05-.2.1-.3.12l-2.86.76c-.78.21-1.6-.25-1.8-1.04l-.02-.05a2.14 2.14 0 0 0-2.1-1.54 2.2 2.2 0 0 0-1.86.99Zm9.96-2.65.13-.08a2.16 2.16 0 0 1 2.6.27l.03.04c.58.58 1.51.58 2.09 0l.59-.59c-.58.54-1.49.53-2.05-.03l-.04-.04a2.16 2.16 0 0 0-2.6-.27c-.3.18-.56.42-.75.7Zm7.34-7.34a2.05 2.05 0 0 1 1.67-.28h.04c.68.2 1.38-.13 1.7-.73-.32.16-.7.22-1.07.12l-.05-.02a2.12 2.12 0 0 0-2.3.91Zm2.64-9.95c.17-.1.35-.19.55-.24l.05-.02c.41-.1.74-.38.93-.74-.1.05-.2.1-.3.12l-.06.01c-.5.14-.9.45-1.17.87Zm-7.5-26.72c-.35.18-.62.5-.74.92v.05c-.06.2-.15.39-.25.56.41-.27.73-.68.87-1.18v-.05l.13-.3Zm-9.93.76c-.6.31-.92 1.01-.74 1.7l.01.04c.16.59.03 1.19-.29 1.67.75-.5 1.15-1.41.92-2.3l-.02-.04a1.5 1.5 0 0 1 .12-1.07Z" clip-rule="evenodd"/><path fill="url(#e)" fill-rule="evenodd" d="M4.34 14.58c-.48.32-1.08.45-1.67.29l-.04-.01a1.48 1.48 0 0 0-1.7.74c.32-.17.7-.22 1.07-.12l.05.01c.88.24 1.79-.16 2.29-.9ZM1.7 24.54c-.17.1-.35.19-.55.24l-.05.01c-.42.11-.74.39-.93.74.1-.05.2-.09.3-.11l.05-.02c.5-.13.9-.45 1.18-.86Zm7.5 26.72c.34-.19.62-.51.73-.93l.02-.05c.05-.2.13-.38.24-.55-.42.27-.73.67-.87 1.18l-.01.05-.12.3Zm9.93-.76c.6-.32.92-1.01.74-1.7l-.01-.04a2.05 2.05 0 0 1 .29-1.67 2.12 2.12 0 0 0-.92 2.3l.01.04c.1.37.05.75-.11 1.07Zm6.45-3.78c.02 0 .03-.02.04-.03l2.09-2.09c.58-.58.58-1.51 0-2.09l-.04-.03a2.16 2.16 0 0 1-.19-2.73 2.3 2.3 0 0 0-.7.75c-.49.84-.41 1.92.27 2.6l.03.04c.58.57.58 1.5 0 2.08l-1.5 1.5Zm5.31-7.99c.35-.18.63-.5.74-.93l.77-2.85c.2-.78-.26-1.6-1.05-1.8l-.05-.02a2.14 2.14 0 0 1-1.53-2.1c0-.45.13-.88.36-1.24a2.2 2.2 0 0 0-.99 1.86c0 .97.6 1.85 1.54 2.1l.05.02a1.48 1.48 0 0 1 1.04 1.8l-.76 2.86-.12.3Zm.76-9.93c.6-.32.93-1.01.75-1.7l-.77-2.85a1.48 1.48 0 0 0-1.8-1.04 2.21 2.21 0 0 1-2.46-1.08 17.75 17.75 0 0 0-2.8-3.63l6.27-6.26c1.15-1.16 1.17-3.05-.16-4-.45-.32-.9-.61-1.38-.89a2.21 2.21 0 0 1-1.08-2.45c.21-.79-.26-1.6-1.04-1.8l-2.86-.77a1.48 1.48 0 0 0-1.69.74c.32-.17.7-.22 1.07-.12l2.85.77a1.48 1.48 0 0 1 1.05 1.8c-.26.96.22 1.96 1.08 2.46.47.27.93.57 1.37.89 1.33.94 1.32 2.84.17 3.99l-6.27 6.26a17.74 17.74 0 0 1 2.8 3.63 2.2 2.2 0 0 0 2.45 1.08c.79-.2 1.6.26 1.8 1.05l.77 2.85c.1.37.05.75-.12 1.07ZM21.63 4.6c-.35.23-.78.36-1.23.36-.96 0-1.85-.6-2.1-1.54l-.01-.05a1.48 1.48 0 0 0-1.81-1.04l-2.86.76c-.4.11-.74.4-.92.74.1-.05.2-.08.3-.11l2.85-.77c.79-.2 1.6.26 1.81 1.05l.01.05a2.14 2.14 0 0 0 2.1 1.53 2.2 2.2 0 0 0 1.86-.98Zm-9.95 2.64-.13.08c-.84.49-1.92.41-2.6-.27l-.03-.03a1.48 1.48 0 0 0-2.1 0l-.58.58a1.48 1.48 0 0 1 2.05.04l.04.03c.68.69 1.76.76 2.6.28.3-.18.56-.42.75-.7Z" clip-rule="evenodd"/><path fill="#DCDCEA" d="M62.88 43.52a18.9 18.9 0 0 1-6.79-1.24 14.37 14.37 0 0 1-5.36-3.44l5.13-5.23a9.04 9.04 0 0 0 3.12 2.47c1.32.65 2.62.97 3.9.97 1.32 0 2.39-.28 3.22-.83.85-.58 1.28-1.48 1.28-2.7 0-.8-.26-1.44-.78-1.93a5.47 5.47 0 0 0-2.02-1.29 49.7 49.7 0 0 0-3.94-1.42 20.84 20.84 0 0 1-4.22-1.84 8.56 8.56 0 0 1-2.94-2.89 8.51 8.51 0 0 1-1.15-4.59c0-2.26.6-4.16 1.8-5.69a10.92 10.92 0 0 1 4.67-3.4c1.93-.73 3.96-1.1 6.1-1.1 1.9 0 3.8.36 5.7 1.06a13.8 13.8 0 0 1 4.95 2.94l-5 5.28a7.05 7.05 0 0 0-2.62-2.02 7.2 7.2 0 0 0-3.17-.78 6.4 6.4 0 0 0-3.2.78c-.9.49-1.34 1.31-1.34 2.47 0 .68.19 1.24.55 1.7.4.46.94.84 1.6 1.15.71.28 1.66.6 2.85.96 1.96.58 3.63 1.23 5 1.93a9.65 9.65 0 0 1 3.58 2.94 7.7 7.7 0 0 1 1.52 4.9 10 10 0 0 1-1.75 6.02 10.24 10.24 0 0 1-4.54 3.63 15.4 15.4 0 0 1-6.15 1.19Zm25.88-.28c-2.9 0-4.99-.7-6.24-2.1-1.26-1.42-1.88-3.42-1.88-6.02v-9.77h-3.67V19.7h3.62v-5.96h7.39v5.96h5.36v5.65h-5.36v8.85c0 1.1.21 1.91.64 2.43.43.52 1.16.78 2.2.78.37 0 .75-.03 1.15-.09.43-.06.78-.15 1.05-.27l.1 5.5c-.53.19-1.2.34-2.02.46-.8.16-1.58.23-2.34.23Zm15 0c-1.34 0-2.64-.23-3.9-.69a7.47 7.47 0 0 1-3.16-2.34 6.57 6.57 0 0 1-1.24-4.13c0-5.14 4.85-7.7 14.54-7.7h.14V28a2.8 2.8 0 0 0-1.15-2.43 4.8 4.8 0 0 0-2.98-.88c-1.04 0-2.07.23-3.07.7-.98.42-1.84.97-2.57 1.64l-3.81-4.08a13.09 13.09 0 0 1 4.63-2.85c1.8-.67 3.66-1 5.55-1 2.54 0 4.58.42 6.1 1.28a7.27 7.27 0 0 1 3.35 3.95c.7 1.74 1.06 4.02 1.06 6.83V42.7h-6.88v-2.43h-.14a5.72 5.72 0 0 1-2.62 2.2 9.5 9.5 0 0 1-3.85.78Zm1.88-5.04c1.5 0 2.66-.42 3.49-1.24.83-.86 1.24-2 1.24-3.45v-.78h-.97c-2.05 0-3.73.22-5.04.65-1.32.42-1.97 1.25-1.97 2.47 0 .8.32 1.4.96 1.8.64.36 1.4.55 2.3.55Zm31.81 5.13c-1.52 0-2.98-.32-4.35-.96a7.43 7.43 0 0 1-3.12-2.66h-.1v2.98h-6.92V8h7.52v14.28h.1a8.84 8.84 0 0 1 2.88-2.16 8.82 8.82 0 0 1 4.09-.91 9.8 9.8 0 0 1 5.64 1.65 10.55 10.55 0 0 1 3.8 4.36 13.53 13.53 0 0 1 1.34 5.96 14 14 0 0 1-1.33 6.06 10.86 10.86 0 0 1-3.77 4.45 10.17 10.17 0 0 1-5.78 1.65Zm-1.78-6.24a5.02 5.02 0 0 0 4.77-2.98 6.86 6.86 0 0 0 0-5.78 5.02 5.02 0 0 0-4.78-2.98c-1.07 0-2.03.29-2.89.87a5.62 5.62 0 0 0-1.92 2.2 6.02 6.02 0 0 0-.7 2.8c0 1 .24 1.97.7 2.9a5.7 5.7 0 0 0 1.92 2.15c.83.55 1.8.82 2.9.82Zm25.14 5.61h-7.61V8h7.61v34.7Zm17.39.73a14.2 14.2 0 0 1-6.38-1.43 11.06 11.06 0 0 1-4.54-4.17c-1.1-1.84-1.66-4-1.66-6.47 0-2.45.54-4.6 1.6-6.43 1.11-1.86 2.6-3.3 4.46-4.31a13 13 0 0 1 6.28-1.52c2.27 0 4.26.5 5.97 1.52a9.86 9.86 0 0 1 4.04 4.31 14.05 14.05 0 0 1 1.46 6.61c0 .83-.01 1.42-.04 1.8h-16.56c.06.82.35 1.57.87 2.24a5.85 5.85 0 0 0 2.02 1.51c.82.37 1.68.55 2.57.55a6.3 6.3 0 0 0 2.93-.64 5.89 5.89 0 0 0 2.11-1.74l5.23 3.3a11.08 11.08 0 0 1-4.31 3.63 14 14 0 0 1-6.06 1.24Zm4.3-14.78a4.6 4.6 0 0 0-.5-2.2 3.5 3.5 0 0 0-1.56-1.56 4.7 4.7 0 0 0-2.43-.6c-.95 0-1.8.2-2.57.6-.76.4-1.38.93-1.83 1.6a4.2 4.2 0 0 0-.78 2.16h9.68Zm23.25 14.78c-2.41 0-4.6-.5-6.56-1.47a11.3 11.3 0 0 1-4.59-4.22c-1.1-1.84-1.65-4-1.65-6.47 0-2.42.57-4.55 1.7-6.38a11.21 11.21 0 0 1 4.59-4.27 13.72 13.72 0 0 1 6.47-1.52c1.62 0 3.2.3 4.77.88a9.3 9.3 0 0 1 3.71 2.2l-4.35 5.05c-.4-.55-.98-1-1.75-1.33a5.35 5.35 0 0 0-2.25-.5c-1.04 0-1.95.27-2.75.82a5.47 5.47 0 0 0-1.88 2.1 6.67 6.67 0 0 0-.64 2.95c0 1.07.21 2.05.64 2.93.46.89 1.09 1.6 1.88 2.11a5.78 5.78 0 0 0 5.14.32 4.8 4.8 0 0 0 1.79-1.23l4.17 5.09a9.8 9.8 0 0 1-3.67 2.16c-1.5.52-3.09.78-4.77.78Zm22.94 0c-2.3 0-4.42-.5-6.38-1.52a11.53 11.53 0 0 1-4.59-4.31c-1.13-1.87-1.7-4-1.7-6.43 0-2.41.57-4.54 1.7-6.38a11.3 11.3 0 0 1 4.59-4.22 13.87 13.87 0 0 1 6.38-1.47c2.32 0 4.45.5 6.37 1.47 1.96.98 3.5 2.39 4.64 4.23a11.91 11.91 0 0 1 1.7 6.37 11.9 11.9 0 0 1-6.34 10.74 13.53 13.53 0 0 1-6.37 1.52Zm.04-6.34c1.14 0 2.1-.27 2.9-.82a5.67 5.67 0 0 0 1.87-2.2 6.75 6.75 0 0 0 0-5.74 5.17 5.17 0 0 0-4.82-2.98c-1.12 0-2.1.27-2.93.82-.8.55-1.4 1.27-1.83 2.16a6.87 6.87 0 0 0 .04 5.73 5.82 5.82 0 0 0 1.84 2.2c.82.56 1.8.83 2.93.83Zm28.21 16.61a21.8 21.8 0 0 1-6.28-.96 16.48 16.48 0 0 1-5.47-2.61l3.77-5.37a11.31 11.31 0 0 0 7.57 2.89c2.14 0 3.74-.58 4.81-1.75 1.1-1.13 1.66-2.67 1.66-4.63v-1.38h-.14c-.74.95-1.7 1.7-2.9 2.25a10 10 0 0 1-4.03.78c-2.23 0-4.17-.53-5.83-1.6a10.62 10.62 0 0 1-3.8-4.32 13.64 13.64 0 0 1-1.29-5.92c0-2.17.43-4.16 1.29-5.96.88-1.84 2.15-3.3 3.8-4.4a10.18 10.18 0 0 1 5.78-1.66c1.5 0 2.9.3 4.18.92a7.36 7.36 0 0 1 3.12 2.66h.1V19.7h7.1v20.84c0 2.9-.55 5.33-1.65 7.3a10.2 10.2 0 0 1-4.68 4.4 15.95 15.95 0 0 1-7.11 1.47Zm.73-16.74a5.3 5.3 0 0 0 4.87-2.94c.46-.92.69-1.91.69-2.98a6.3 6.3 0 0 0-.7-2.94 5.3 5.3 0 0 0-4.86-2.9 5.3 5.3 0 0 0-2.89.79c-.8.52-1.4 1.22-1.83 2.1a6.66 6.66 0 0 0-.64 2.95c0 1.04.21 2.02.64 2.93.43.89 1.04 1.6 1.83 2.16.83.55 1.8.83 2.9.83Z"/><defs><linearGradient id="a" x1="24.7" x2="-.4" y1="18.73" y2="43.09" gradientUnits="userSpaceOnUse"><stop stop-color="#9866FF"/><stop offset="1" stop-color="#C3A6FF"/></linearGradient><linearGradient id="b" x1="15.6" x2="19.34" y1="24.12" y2="29.11" gradientUnits="userSpaceOnUse"><stop stop-color="#0F0F12" stop-opacity=".1"/><stop offset="1" stop-color="#0F0F12" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="8.02" x2="32.68" y1="35.06" y2="10.39" gradientUnits="userSpaceOnUse"><stop stop-color="#9866FF"/><stop offset="1" stop-color="#C3A6FF"/></linearGradient><linearGradient id="d" x1="1.87" x2="18.09" y1="45.58" y2="28.11" gradientUnits="userSpaceOnUse"><stop stop-color="#9C6CFF"/><stop offset="1" stop-color="#925CFF"/></linearGradient><linearGradient id="e" x1="16.81" x2="33.07" y1="24.95" y2="14.14" gradientUnits="userSpaceOnUse"><stop stop-color="#AD85FF"/><stop offset="1" stop-color="#CEB7FF"/></linearGradient></defs></svg>"##
    )
}

pub fn logo_mark(width: f32) -> String {
    let height = width;
    format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 64 64" fill="none"><path fill="url(#a)" d="M12.97 51.03c-1.5 1.5-1.52 3.97.2 5.2.6.42 1.19.8 1.8 1.16a2.88 2.88 0 0 1 1.4 3.2 1.92 1.92 0 0 0 1.37 2.35l3.71 1a1.92 1.92 0 0 0 2.36-1.37l.01-.06a2.8 2.8 0 0 1 2.74-2 2.8 2.8 0 0 1 2.74 2l.02.06a1.92 1.92 0 0 0 2.35 1.36l3.71-1a1.92 1.92 0 0 0 1.36-2.35l-.01-.06a2.78 2.78 0 0 1 1.36-3.1 2.8 2.8 0 0 1 3.38.37l.05.04c.75.75 1.96.75 2.71 0l2.72-2.72c.75-.75.75-1.97 0-2.72l-.04-.04a2.8 2.8 0 0 1-.36-3.39 2.78 2.78 0 0 1 3.1-1.36l.06.02a1.92 1.92 0 0 0 2.35-1.36l1-3.71a1.92 1.92 0 0 0-1.36-2.36l-.07-.02a2.8 2.8 0 0 1-2-2.73 2.8 2.8 0 0 1 2-2.74l.07-.02a1.92 1.92 0 0 0 1.36-2.35l-1-3.72a1.92 1.92 0 0 0-2.35-1.36 2.88 2.88 0 0 1-3.2-1.4 23.1 23.1 0 0 0-3.63-4.73L12.96 51.03Z"/><path fill="url(#b)" d="M12.97 51.03c-1.5 1.5-1.52 3.97.2 5.2.6.42 1.19.8 1.8 1.16a2.88 2.88 0 0 1 1.4 3.2 1.92 1.92 0 0 0 1.37 2.35l3.71 1a1.92 1.92 0 0 0 2.36-1.37l.01-.06a2.8 2.8 0 0 1 2.74-2 2.8 2.8 0 0 1 2.74 2l.02.06a1.92 1.92 0 0 0 2.35 1.36l3.71-1a1.92 1.92 0 0 0 1.36-2.35l-.01-.06a2.78 2.78 0 0 1 1.36-3.1 2.8 2.8 0 0 1 3.38.37l.05.04c.75.75 1.96.75 2.71 0l2.72-2.72c.75-.75.75-1.97 0-2.72l-.04-.04a2.8 2.8 0 0 1-.36-3.39 2.78 2.78 0 0 1 3.1-1.36l.06.02a1.92 1.92 0 0 0 2.35-1.36l1-3.71a1.92 1.92 0 0 0-1.36-2.36l-.07-.02a2.8 2.8 0 0 1-2-2.73 2.8 2.8 0 0 1 2-2.74l.07-.02a1.92 1.92 0 0 0 1.36-2.35l-1-3.72a1.92 1.92 0 0 0-2.35-1.36 2.88 2.88 0 0 1-3.2-1.4 23.1 23.1 0 0 0-3.63-4.73L12.96 51.03Z"/><path fill="url(#c)" d="M17.05 11.6a1.92 1.92 0 0 1 0-2.71l2.71-2.72a1.92 1.92 0 0 1 2.72 0l.05.04c.89.9 2.3.99 3.38.36a2.78 2.78 0 0 0 1.36-3.1l-.02-.05a1.92 1.92 0 0 1 1.36-2.36l3.72-1a1.92 1.92 0 0 1 2.35 1.37l.02.06a2.8 2.8 0 0 0 2.74 2 2.8 2.8 0 0 0 2.73-2l.02-.06A1.92 1.92 0 0 1 42.55.07l3.71 1a1.92 1.92 0 0 1 1.36 2.35 2.88 2.88 0 0 0 1.4 3.19c.62.35 1.22.74 1.8 1.16 1.73 1.23 1.71 3.7.21 5.2l-29.9 29.9a23.1 23.1 0 0 1-3.65-4.72 2.88 2.88 0 0 0-3.19-1.4 1.92 1.92 0 0 1-2.35-1.36l-1-3.72a1.92 1.92 0 0 1 1.36-2.35l.07-.02a2.8 2.8 0 0 0 2-2.74 2.8 2.8 0 0 0-2-2.73l-.07-.02a1.92 1.92 0 0 1-1.36-2.36l1-3.71a1.92 1.92 0 0 1 2.35-1.36l.06.02a2.78 2.78 0 0 0 3.1-1.36 2.8 2.8 0 0 0-.36-3.39l-.04-.04Z"/><path fill="url(#d)" fill-rule="evenodd" d="M17.86 10.8a1.92 1.92 0 0 1 0-2.72l1.91-1.92v.01l-2.72 2.72a1.92 1.92 0 0 0 0 2.72l.04.04a2.8 2.8 0 0 1 .25 3.56c.37-.25.69-.58.92-.99a2.8 2.8 0 0 0-.36-3.38l-.04-.04Zm-4.96 5.73c-.46.24-.82.67-.96 1.2l-1 3.72a1.92 1.92 0 0 0 1.36 2.36l.07.02a2.8 2.8 0 0 1 2 2.73 3 3 0 0 1-.47 1.61c.8-.5 1.28-1.43 1.28-2.42a2.8 2.8 0 0 0-2-2.74L13.1 23a1.92 1.92 0 0 1-1.36-2.35l1-3.71c.04-.14.09-.27.15-.4Zm-1 12.94c-.77.4-1.2 1.31-.96 2.2l1 3.72a1.92 1.92 0 0 0 2.35 1.35 2.88 2.88 0 0 1 3.2 1.41 23.1 23.1 0 0 0 3.63 4.73l.82-.82a23.1 23.1 0 0 1-3.64-4.72 2.88 2.88 0 0 0-3.2-1.4 1.92 1.92 0 0 1-2.35-1.37l-1-3.71c-.13-.49-.06-.98.16-1.39Zm1.88 20.75-.81.81c-1.5 1.5-1.52 3.97.2 5.2.6.42 1.19.8 1.8 1.16a2.88 2.88 0 0 1 1.4 3.2 1.92 1.92 0 0 0 1.37 2.35l3.71 1c.89.23 1.8-.2 2.2-.97-.4.21-.9.28-1.38.15l-3.72-1a1.92 1.92 0 0 1-1.36-2.35 2.88 2.88 0 0 0-1.4-3.2c-.62-.35-1.22-.73-1.8-1.15-1.73-1.23-1.71-3.7-.21-5.2Zm11.17 10.76a3 3 0 0 1 1.61-.47 2.8 2.8 0 0 1 2.74 2l.02.06a1.92 1.92 0 0 0 2.35 1.36l3.72-1c.54-.14.96-.5 1.2-.96-.12.07-.25.12-.4.16l-3.7 1a1.92 1.92 0 0 1-2.36-1.37l-.02-.06a2.8 2.8 0 0 0-2.74-2c-.98 0-1.9.48-2.42 1.28Zm12.97-3.44c.05-.04.1-.08.17-.11a2.8 2.8 0 0 1 3.38.36l.05.04c.75.75 1.96.75 2.71 0l.81-.8c-.75.74-1.96.73-2.71-.01l-.05-.05a2.8 2.8 0 0 0-3.38-.35c-.4.23-.74.55-.98.92Zm9.55-9.56a2.66 2.66 0 0 1 2.18-.38l.06.02c.88.24 1.8-.18 2.2-.97-.41.22-.9.29-1.39.16l-.06-.02c-1.15-.3-2.33.21-2.99 1.19Zm3.45-12.96c.21-.14.45-.25.71-.32l.07-.02c.54-.14.96-.5 1.2-.96-.12.06-.25.11-.39.15l-.06.02c-.66.17-1.18.59-1.53 1.13ZM41.16.22c-.46.24-.82.67-.97 1.2l-.02.07c-.07.26-.17.5-.31.72.54-.35.95-.88 1.13-1.53L41 .6c.04-.14.1-.27.16-.39Zm-12.94 1c-.78.4-1.2 1.3-.97 2.2l.02.06c.2.76.04 1.54-.38 2.17a2.76 2.76 0 0 0 1.2-2.99l-.02-.06c-.13-.48-.07-.97.15-1.39Z" clip-rule="evenodd"/><path fill="url(#e)" fill-rule="evenodd" d="M16.53 16.02c-.63.42-1.41.58-2.18.38l-.06-.02c-.89-.24-1.8.18-2.2.96.41-.21.9-.28 1.39-.15l.06.02c1.15.3 2.33-.21 2.99-1.19Zm-3.45 12.96c-.21.14-.45.25-.71.32l-.07.02c-.54.14-.96.5-1.2.96.12-.06.25-.11.39-.15l.06-.02a2.63 2.63 0 0 0 1.53-1.13Zm9.76 34.8c.46-.24.82-.67.97-1.2l.01-.07c.07-.26.18-.5.32-.72-.54.35-.95.88-1.13 1.53l-.02.07c-.03.14-.08.27-.15.39Zm12.94-1c.78-.4 1.2-1.31.96-2.2l-.01-.06c-.2-.76-.05-1.54.37-2.17a2.76 2.76 0 0 0-1.18 2.99l.01.06c.13.48.06.97-.15 1.39Zm8.43-4.93.02-.02 2.72-2.72c.75-.75.75-1.97 0-2.72l-.04-.04a2.8 2.8 0 0 1-.25-3.56c-.37.25-.69.58-.92.98a2.8 2.8 0 0 0 .36 3.39l.04.04c.75.75.75 1.97 0 2.72l-1.93 1.93Zm6.89-10.38c.46-.24.82-.67.96-1.2l1-3.72a1.92 1.92 0 0 0-1.36-2.36l-.07-.02a2.8 2.8 0 0 1-2-2.73c0-.59.17-1.15.47-1.61-.8.5-1.28 1.43-1.28 2.42a2.8 2.8 0 0 0 2 2.74l.07.01a1.92 1.92 0 0 1 1.36 2.36l-1 3.71c-.04.14-.09.27-.15.4Zm1-12.94c.77-.4 1.2-1.32.96-2.2l-1-3.72a1.92 1.92 0 0 0-2.35-1.36 2.88 2.88 0 0 1-3.2-1.4 23.1 23.1 0 0 0-3.63-4.73l8.15-8.15c1.5-1.5 1.52-3.97-.21-5.2-.58-.42-1.18-.8-1.8-1.16a2.88 2.88 0 0 1-1.4-3.2 1.92 1.92 0 0 0-1.36-2.35l-3.71-1c-.89-.23-1.8.2-2.2.97.4-.21.9-.28 1.38-.15l3.72 1a1.92 1.92 0 0 1 1.36 2.35 2.88 2.88 0 0 0 1.4 3.19c.62.36 1.21.74 1.8 1.16 1.73 1.23 1.71 3.7.2 5.2l-8.15 8.16a23.1 23.1 0 0 1 3.64 4.72 2.88 2.88 0 0 0 3.2 1.4 1.92 1.92 0 0 1 2.35 1.37l1 3.71c.13.49.06.98-.16 1.39ZM39.04 3.03c-.47.3-1.03.46-1.61.46a2.8 2.8 0 0 1-2.74-2l-.02-.06A1.92 1.92 0 0 0 32.33.07l-3.72 1c-.54.14-.96.5-1.2.96.12-.07.25-.12.4-.16l3.7-1a1.92 1.92 0 0 1 2.36 1.37l.02.06a2.8 2.8 0 0 0 2.73 2c1 0 1.92-.48 2.43-1.28ZM26.08 6.45a2.8 2.8 0 0 1-3.55-.25l-.05-.04a1.92 1.92 0 0 0-2.72 0l-.78.79a1.92 1.92 0 0 1 2.7.02l.04.05c.88.89 2.29.98 3.38.35.4-.23.74-.55.98-.92Z" clip-rule="evenodd"/><defs><linearGradient id="a" x1="43.04" x2="10.35" y1="21.43" y2="53.15" gradientUnits="userSpaceOnUse"><stop stop-color="#9866FF"/><stop offset="1" stop-color="#C3A6FF"/></linearGradient><linearGradient id="b" x1="31.19" x2="36.06" y1="28.44" y2="34.94" gradientUnits="userSpaceOnUse"><stop stop-color="#0F0F12" stop-opacity="0.1"/><stop offset="1" stop-color="#0F0F12" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="21.31" x2="53.43" y1="42.69" y2="10.57" gradientUnits="userSpaceOnUse"><stop stop-color="#9866FF"/><stop offset="1" stop-color="#C3A6FF"/></linearGradient><linearGradient id="d" x1="13.31" x2="34.44" y1="56.39" y2="33.64" gradientUnits="userSpaceOnUse"><stop stop-color="#9C6CFF"/><stop offset="1" stop-color="#925CFF"/></linearGradient><linearGradient id="e" x1="32.76" x2="53.93" y1="29.53" y2="15.45" gradientUnits="userSpaceOnUse"><stop stop-color="#AD85FF"/><stop offset="1" stop-color="#CEB7FF"/></linearGradient></defs></svg>"##
    )
}

// ---------------------------------------------------------------------------
// Profile card (src/components/og-profile.tsx)
// ---------------------------------------------------------------------------

pub fn og_profile(username: &str) -> String {
    let dots = dot_background();
    let logo = logo_horizontal(233.0);
    let username = esc(username);
    format!(
        r#"<div tw="flex flex-col items-center justify-between relative" style="width: {WIDTH}px; height: {HEIGHT}px; background: {BG_COLOR}; color: {ON_BG_COLOR}; {dots}">
  <div tw="flex flex-col items-center" style="padding-top: 4.5rem">
    {logo}
    <p tw="font-bold text-7xl mt-1" style="line-height: 1.738"><span tw="opacity-50 font-semibold">@</span>{username}</p>
  </div>
  <img tw="w-full" width="1200" height="352" src="{PROFILE_BASE_IMAGE_URL}"/>
</div>"#
    )
}

// ---------------------------------------------------------------------------
// Generation model card (src/components/og-generation-model.tsx)
// ---------------------------------------------------------------------------

pub fn model_slug(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut last_was_dash = false;
    for c in input.to_lowercase().chars() {
        if c.is_whitespace() || c == '.' {
            if !last_was_dash {
                out.push('-');
                last_was_dash = true;
            }
        } else {
            out.push(c);
            last_was_dash = false;
        }
    }
    out
}

pub fn model_preview_url(name_in_worker: &str) -> String {
    format!(
        "https://ba.stablecog.com/guide/previews/{}.jpg",
        model_slug(name_in_worker)
    )
}

pub fn og_generation_model(name_in_worker: &str) -> String {
    let image_url = model_preview_url(name_in_worker);
    let logo = logo_horizontal(271.0);
    let name = esc(name_in_worker);
    format!(
        r#"<div tw="flex w-full h-full items-center justify-center relative" style="width: {WIDTH}px; height: {HEIGHT}px; background: {BG_COLOR}; color: {ON_BG_COLOR}">
  <img tw="w-full" width="{WIDTH}" height="{HEIGHT}" src="{image_url}"/>
  <div tw="w-full h-full absolute left-0 top-0 flex items-end justify-between px-14 py-7" style="background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0) 50%)">
    <div tw="flex flex-col items-start justify-start pb-3">
      <p tw="font-medium text-4xl" style="line-height: 1">Generate with</p>
      <p tw="font-bold text-7xl mt-4" style="line-height: 1">{name}</p>
    </div>
    <div tw="flex items-end justify-end pb-6">
      {logo}
    </div>
  </div>
</div>"#
    )
}

// ---------------------------------------------------------------------------
// Output card (src/components/og-output.tsx)
// ---------------------------------------------------------------------------

const MODEL_ICON: &str = r#"<path fill-rule="evenodd" clip-rule="evenodd" d="M9.13.5a4.8 4.8 0 0 0-4.57 3.34 5.27 5.27 0 0 0-2.82 6.51 5.73 5.73 0 0 0 1.68 8.57A5.27 5.27 0 0 0 12 22.3a5.25 5.25 0 0 0 8.58-3.38 5.75 5.75 0 0 0 1.68-8.57 5.27 5.27 0 0 0-2.82-6.5A4.8 4.8 0 0 0 12 1.44C11.2.86 10.2.5 9.12.5ZM6.3 4.74a2.88 2.88 0 0 1 4.03-2.06c.5.23.71.78.71 1.33V19.79c0 .5-.18 1-.6 1.28A3.35 3.35 0 0 1 5.3 18.3l-.02-.62-.56-.25a3.83 3.83 0 0 1-1.46-5.9h2.03c.53 0 .96.42.96.95v.73a1.92 1.92 0 1 0 1.92 0v-.73A2.87 2.87 0 0 0 5.29 9.6H3.51a3.36 3.36 0 0 1 2.16-4.14l.53-.17.1-.55Zm6.66 12.05h1.91a2.88 2.88 0 0 0 2.88-2.87v-3.13a1.92 1.92 0 1 0-1.92 0v3.13c0 .53-.43.96-.96.96h-1.91V4c0-.55.22-1.1.71-1.33a2.86 2.86 0 0 1 4.03 2.06l.1.55.53.17a3.36 3.36 0 0 1 1.96 4.66l-.3.61.48.48a3.82 3.82 0 0 1-1.19 6.22l-.56.25-.01.61a3.35 3.35 0 0 1-5.14 2.78c-.43-.27-.61-.77-.61-1.28v-3Z"/>"#;

const DIMENSIONS_ICON: &str = r#"<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a1 1 0 0 1 1-1h1a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v1a1 1 0 0 0 2 0V5Zm14-3a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v1a1 1 0 1 0 2 0V5a3 3 0 0 0-3-3h-1Zm3 15a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1a1 1 0 1 1 0-2h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1ZM4 18a1 1 0 1 0-2 0v1a3 3 0 0 0 3 3h1a1 1 0 1 0 0-2H5a1 1 0 0 1-1-1v-1Zm17-8.5a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm-17 1a1 1 0 0 0-2 0v3a1 1 0 1 0 2 0v-3ZM9.5 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm1 17a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z"/>"#;

pub fn og_output(
    output: &GalleryOutput,
    username: Option<&str>,
    final_image_url: &str,
) -> String {
    let dots = dot_background();
    let shadow_color = "rgba(0, 0, 4, 0.4)";
    let ring_width = 5.0;
    let max_prompt_length = 120;
    let root_padding = 24.0;
    let max_aspect_ratio = 0.7_f32;
    let border_radius = 26.0;

    let main_w = WIDTH as f32 - root_padding * 2.0;
    let main_h = HEIGHT as f32 - root_padding * 2.0;

    let aspect = output.generation.width / output.generation.height;
    let image_height = main_h;
    let image_width = image_height * aspect;
    let (container_w, container_h) = if aspect >= max_aspect_ratio {
        (image_height * max_aspect_ratio, image_height)
    } else {
        (image_width, image_height)
    };
    let right_w = WIDTH as f32 - container_w;

    let prompt_text = &output.generation.prompt.text;
    let truncated: String = prompt_text.chars().take(max_prompt_length).collect();
    let prompt = esc(&format!(
        "{truncated}{}",
        if prompt_text.chars().count() > max_prompt_length {
            "..."
        } else {
            ""
        }
    ));

    let header = match username {
        Some(username) => {
            let username = esc(username);
            format!(
                r#"<h1 tw="font-bold text-7xl -mt-7" style="line-height: 1.5"><span tw="opacity-50 font-semibold">@</span>{username}</h1>"#
            )
        }
        None => {
            let logo = logo_mark(72.0);
            format!(
                r#"<div tw="flex items-center justify-center -mr-0.5 -mt-7 -ml-2">{logo}</div>
              <h1 tw="font-bold text-7xl ml-5 -mt-6" style="line-height: 1.5">Gallery</h1>"#
            )
        }
    };

    let model_name = esc(model_short_name(&output.generation.model_id));
    let gen_w = output.generation.width;
    let gen_h = output.generation.height;

    format!(
        r#"<div tw="flex w-full h-full items-center justify-center" style="width: {WIDTH}px; height: {HEIGHT}px; background: {BG_COLOR}; padding: {root_padding}px; color: {ON_BG_COLOR}; {dots}">
  <div tw="flex items-center justify-center" style="width: {main_w}px; height: {main_h}px">
    <div tw="flex justify-center items-center" style="overflow: hidden; width: {container_w}px; height: {container_h}px; box-shadow: 0px 12px 36px 0px {shadow_color}; border-radius: {border_radius}px; border: {ring_width}px solid {BG_SECONDARY_COLOR}">
      <img width="{image_width}" height="{image_height}" src="{final_image_url}"/>
    </div>
    <div tw="flex flex-1 flex-row overflow-hidden items-center justify-start pl-18 pr-24" style="width: {right_w}px; height: {main_h}px">
      <div tw="w-full h-full flex flex-col justify-center">
        <div tw="w-full flex items-center">
          {header}
        </div>
        <div tw="w-full flex overflow-hidden">
          <div tw="w-full flex pr-1 py-3">
            <p tw="w-full flex font-medium flex-wrap text-4xl opacity-75 mt-0" style="line-height: 1.5; max-height: 210px">{prompt}</p>
          </div>
        </div>
        <div tw="w-full flex mt-6">
          <div tw="flex items-center mr-12">
            <svg style="width: 36px; height: 36px" width="24" height="24" viewBox="0 0 24 24" fill="{ON_BG_COLOR}" xmlns="http://www.w3.org/2000/svg">{MODEL_ICON}</svg>
            <p tw="font-bold text-4xl mt-0.5 ml-3" style="line-height: 1">{model_name}</p>
          </div>
          <div tw="flex items-center">
            <svg style="width: 36px; height: 36px" width="24" height="24" viewBox="0 0 24 24" fill="{ON_BG_COLOR}" xmlns="http://www.w3.org/2000/svg">{DIMENSIONS_ICON}</svg>
            <p tw="font-bold text-4xl mt-0.5 ml-3" style="line-height: 1">{gen_w}<span tw="mx-1.5 mt-1 text-3xl">×</span>{gen_h}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>"#
    )
}

// ---------------------------------------------------------------------------
// Gallery grid (src/components/og-gallery.tsx)
// ---------------------------------------------------------------------------

pub const GALLERY_GRID_COLS: usize = 5;
pub const GALLERY_GRID_ROWS: usize = 2;

/// `resolved` holds the image URLs whose bytes were successfully fetched;
/// cells whose image failed to fetch render as an empty frame instead.
pub fn og_gallery(images: &[GalleryImage], resolved: &std::collections::HashSet<String>) -> String {
    let dots = dot_background();
    let ring_width = 4.0;
    let image_container_padding = 4.0;
    let root_padding = 16.0;
    let inner_border_radius = 22.0;

    let main_w = WIDTH as f32 - root_padding * 2.0;
    let main_h = HEIGHT as f32 - root_padding * 2.0;
    let cell_w = main_w / GALLERY_GRID_COLS as f32;
    let cell_h = main_h / GALLERY_GRID_ROWS as f32;
    let inner_w = cell_w - image_container_padding * 2.0;
    let inner_h = cell_h - image_container_padding * 2.0;
    let inner_max = inner_w.max(inner_h);

    let total = GALLERY_GRID_COLS * GALLERY_GRID_ROWS;
    let mut rows_html = String::new();
    for row in 0..GALLERY_GRID_ROWS {
        let mut cells = String::new();
        for col in 0..GALLERY_GRID_COLS {
            let i = row * GALLERY_GRID_COLS + col;
            if i == total - 1 {
                let logo = logo_mark(112.0);
                cells.push_str(&format!(
                    r#"<div tw="flex flex-col items-center justify-center text-center pt-3" style="width: {cell_w}px; height: {cell_h}px">{logo}<p tw="font-bold" style="font-size: 40px; margin-top: 24px; line-height: 1.5">Gallery</p></div>"#
                ));
                continue;
            }
            let Some(image) = images.get(i) else {
                continue;
            };
            let aspect = image.width / image.height;
            let (img_w, img_h) = if aspect >= 1.0 {
                (inner_max * aspect, inner_max)
            } else {
                (inner_max, inner_max / aspect)
            };
            let img_tag = if resolved.contains(&image.url) {
                let url = esc(&image.url);
                format!(r#"<img src="{url}" width="{img_w}" height="{img_h}"/>"#)
            } else {
                String::new()
            };
            cells.push_str(&format!(
                r#"<div tw="flex justify-center items-center relative" style="width: {cell_w}px; height: {cell_h}px"><div tw="flex justify-center items-center overflow-hidden relative" style="width: {inner_w}px; height: {inner_h}px; background: {BG_SECONDARY_COLOR}; border-radius: {inner_border_radius}px; border: {ring_width}px solid {BG_SECONDARY_COLOR}">{img_tag}</div></div>"#
            ));
        }
        rows_html.push_str(&format!(r#"<div tw="w-full flex">{cells}</div>"#));
    }

    format!(
        r#"<div tw="flex flex-col items-center justify-center" style="width: {WIDTH}px; height: {HEIGHT}px; background: {BG_COLOR}; color: {ON_BG_COLOR}; {dots}">
  <div tw="flex flex-col items-center justify-center" style="width: {main_w}px; height: {main_h}px">{rows_html}</div>
</div>"#
    )
}
