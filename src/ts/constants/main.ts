export const goApiUrl = process.env.PUBLIC_GO_API_URL;

export const galleryPreview = fetch(
  new URL("../../../assets/gallery-v2.png", import.meta.url)
).then((res) => res.arrayBuffer());

export const userProfilePreview = fetch(
  new URL("../../../assets/user_profile_preview_base_2.png", import.meta.url)
).then((res) => res.arrayBuffer());
