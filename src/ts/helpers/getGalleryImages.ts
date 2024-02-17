import { goApiUrl } from "@/ts/constants/main";
import { TImgProxyPreset, getImgProxySrc } from "@/ts/helpers/getImgProxySrc";
import {
  TImage,
  TUserProfileGenerationFullOutputPageRes,
} from "@/ts/types/gallery";

const SEARCH_SCORE_THRESHOLD_DEFAULT = 50;
const PER_PAGE_DEFAULT = 10;
const OVERSAMPLING_DEFAULT = 50;

export async function getGalleryImages({
  search,
  per_page = PER_PAGE_DEFAULT,
  search_score_threshold = SEARCH_SCORE_THRESHOLD_DEFAULT,
  oversampling = OVERSAMPLING_DEFAULT,
  imgProxyPreset = "256w",
}: {
  search?: string | null;
  per_page?: number;
  search_score_threshold?: number;
  oversampling?: number;
  imgProxyPreset?: TImgProxyPreset;
}): Promise<TImage[]> {
  const query = new URLSearchParams();
  query.append("per_page", per_page.toString());
  query.append("oversampling", oversampling.toString());
  if (search && search !== "") {
    query.append("search", search);
    query.append("score_threshold", search_score_threshold.toString());
  }
  let queryString = query.toString();
  if (queryString) queryString = `?${queryString}`;
  const url = `${goApiUrl}/v1/gallery${queryString}`;
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const res = await fetch(url, {
    headers,
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch gallery outputs: ${res.status}, ${res.statusText}`
    );
  }
  const data: TUserProfileGenerationFullOutputPageRes = await res.json();
  const { hits } = data;
  const images: TImage[] = hits.map((hit) => {
    const image: TImage = {
      url: getImgProxySrc({ src: hit.image_url, preset: imgProxyPreset }),
      width: hit.width,
      height: hit.height,
    };
    return image;
  });
  return images;
}
