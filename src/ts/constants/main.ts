export const goApiUrl = process.env.PUBLIC_GO_API_URL;

export const galleryPreview = fetch(
  new URL("../../../gallery-v2", import.meta.url)
).then((res) => res.arrayBuffer());

export const userProfilePreview = fetch(
  new URL("../../../user_profile_preview_base_2", import.meta.url)
).then((res) => res.arrayBuffer());
