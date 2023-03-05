import {
  TGalleryGenerationFullOutputPageRes,
  TGalleryGenerationHit,
} from "../types/gallery";

export async function getOutput(id: string) {
  const apiUrl = process.env.PUBLIC_GO_API_URL;
  let hit: TGalleryGenerationHit | undefined = undefined;
  const res = await fetch(`${apiUrl}/v1/gallery?output_id=${id}`);
  if (!res.ok) {
    return { error: "Response wasn't okay" };
  }
  const data: TGalleryGenerationFullOutputPageRes = await res.json();
  if (!data.hits || !data.hits[0]) return { error: "No data" };
  hit = data.hits[0];
  return { data: hit };
}
