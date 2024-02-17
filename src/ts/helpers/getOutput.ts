import { goApiUrl } from "@/ts/constants/main";
import {
  TGalleryGenerationFullOutputPageRes,
  TGalleryGenerationHit,
} from "../types/gallery";

export async function getOutput(id: string, username?: string) {
  let hit: TGalleryGenerationHit | undefined = undefined;
  const url = `${goApiUrl}/v1/${
    username ? `profile/${username}/outputs` : `gallery`
  }?output_id=${id}`;
  console.log("Url is:", url);
  const res = await fetch(url);
  if (!res.ok) {
    console.log("Response wasn't okay");
    return { error: "Response wasn't okay" };
  }
  const data: TGalleryGenerationFullOutputPageRes = await res.json();
  if (!data.hits || !data.hits[0]) return { error: "No data" };
  hit = data.hits[0];
  return { data: hit };
}
