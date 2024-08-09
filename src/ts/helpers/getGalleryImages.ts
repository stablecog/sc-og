import { goApiUrl } from "@/ts/constants/main";
import { TImgProxyPreset, getImgProxySrc } from "@/ts/helpers/getImgProxySrc";
import {
  TGalleryFullOutput,
  TGalleryFullOutputPage,
  TImage,
} from "@/ts/types/gallery";

const SEARCH_SCORE_THRESHOLD_DEFAULT = 50;
const PER_PAGE_DEFAULT = 10;
const OVERSAMPLING_DEFAULT = 8;
const SORTS_DEFAULT = "new";
const OG_SERVICE_TOKEN = process.env.OG_SERVICE_TOKEN;

export const SORTS_DEFAULT_ARRAY = [SORTS_DEFAULT];

export async function getGalleryImages({
  search,
  model_ids,
  aspect_ratios,
  username_filters,
  sorts,
  per_page = PER_PAGE_DEFAULT,
  search_score_threshold = SEARCH_SCORE_THRESHOLD_DEFAULT,
  oversampling = OVERSAMPLING_DEFAULT,
  imgProxyPreset = "256w",
}: {
  search?: string;
  model_ids?: string[];
  aspect_ratios?: string[];
  username_filters?: string[];
  sorts?: string[];
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
  if (model_ids && model_ids.length > 0) {
    query.append("model_ids", model_ids.join(","));
  }
  if (aspect_ratios && aspect_ratios.length > 0) {
    query.append(
      "aspect_ratio",
      aspect_ratios
        .map((i) => i.replaceAll(".", "_").replaceAll(":", "-"))
        .join(",")
    );
  }
  if (username_filters && username_filters.length > 0) {
    query.append("username", username_filters.join(","));
  }
  if (sorts && sorts.length > 0) {
    query.append("sort", sorts.join(","));
  }
  let queryString = query.toString();
  if (queryString) queryString = `?${queryString}`;
  const url = `${goApiUrl}/v1/gallery${queryString}`;
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-OG-Service-Token": `${OG_SERVICE_TOKEN}`,
  };
  const res = await fetch(url, {
    headers,
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch gallery outputs: ${res.status}, ${res.statusText}`
    );
  }
  const data: TGalleryFullOutputPage = await res.json();
  const { outputs } = data;
  const images: TImage[] = outputs.map((output) => {
    const image: TImage = {
      url: getImgProxySrc({ src: output.image_url, preset: imgProxyPreset }),
      width: output.generation.width,
      height: output.generation.height,
    };
    return image;
  });
  return images;
}

export function getGalleryLikeParamsFromSearchParams(
  searchParams: URLSearchParams
) {
  const modelIdQuery = searchParams.get("mi");
  const modelIds = modelIdQuery?.split(",") || [];
  const filteredModelIds = modelIds.filter((modelId) =>
    availableGenerationModelIds.includes(modelId as TAvailableGenerationModelId)
  ) as TAvailableGenerationModelId[];
  const aspectRatioFiltersQuery = searchParams.get("ar");
  const aspectRatioFilters = aspectRatioFiltersQuery?.split(",") || [];
  const filteredAspectRatioFilters = aspectRatioFilters.filter((aspectRatio) =>
    availableAspectRatios.includes(aspectRatio as TAvailableAspectRatio)
  ) as TAvailableAspectRatio[];
  const searchStringParam = searchParams.get("q");
  const searchString = searchStringParam || "";
  const usernameFiltersQuery = searchParams.get("un");
  const usernameFilters = usernameFiltersQuery?.split(",") || [];
  const sortsQuery = searchParams.get("sort");
  const sorts = sortsQuery ? sortsQuery.split(",") : SORTS_DEFAULT_ARRAY;
  return {
    modelIdFilters: filteredModelIds,
    aspectRatioFilters: filteredAspectRatioFilters,
    searchString,
    usernameFilters,
    sorts,
  };
}

const availableAspectRatios = [
  "1-1",
  "4-5",
  "2-3",
  "3-2",
  "9-16",
  "16-9",
  "2_4-1",
] as const;

type TAvailableGenerationModelId = string;
type TAvailableAspectRatio = (typeof availableAspectRatios)[number];

export const generationModels: {
  [key: string]: {
    name: string;
    shortName: string;
    active?: boolean;
  };
} = {
  "0a99668b-45bd-4f7e-aa9c-f9aaa41ef13b": {
    name: "FLUX.1",
    shortName: "FLUX.1",
  },
  "b6c1372f-31a7-457c-907c-d292a6ffef97": {
    name: "Luna Diffusion",
    shortName: "Luna D.",
  },
  "fc06f6ab-ed14-4186-a7c0-aaec288d4f38": {
    name: "22h Diffusion",
    shortName: "22h D.",
  },
  "f7f3d973-ac6f-4a7a-9db8-e89e4fba03a9": {
    name: "Waifu Diffusion",
    shortName: "Waifu D.",
  },
  "8acfe4c8-751d-4aa6-8c3c-844e3ef478e0": {
    name: "Openjourney",
    shortName: "Openjourney",
  },
  "eaa438e1-dbf9-48fd-be71-206f0f257617": {
    name: "Redshift Diffusion",
    shortName: "Redshift D.",
  },
  "8002bc51-7260-468f-8840-cf1e6dbe3f8a": {
    name: "SDXL",
    shortName: "SDXL",
  },
  "22b0857d-7edc-4d00-9cd9-45aa509db093": {
    name: "Kandinsky",
    shortName: "Kandinsky",
  },
  "9fa49c00-109d-430f-9ddd-449f02e2c71a": {
    name: "Kandinsky 2.2",
    shortName: "Kandinsky 2.2",
  },
  "3fb1f6d9-c0d3-4ae4-adf4-77f8da78a6f7": {
    name: "Waifu Diffusion XL",
    shortName: "Waifu D. XL",
  },
  "048b4aa3-5586-47ed-900f-f4341c96bdb2": {
    name: "Stable Diffusion v1.5",
    shortName: "SD v1.5",
    active: false,
  },
  "48a7031d-43b6-4a23-9f8c-8020eb6862e4": {
    name: "Ghibli Diffusion",
    shortName: "Ghibli D.",
    active: false,
  },
  "36d9d835-646f-4fc7-b9fe-98654464bf8e": {
    name: "Arcane Diffusion",
    shortName: "Arcane D.",
  },
  "4e54440f-ee17-4712-b4b6-0671b94d685d": {
    name: "SSD-1B",
    shortName: "SSD-1B",
  },
  "986d447d-c38b-4218-a2c8-6e0b691f47ec": {
    name: "Stable Diffusion 3",
    shortName: "Stable D. 3",
  },
} as const;

export const availableGenerationModelIds = Object.keys(generationModels).filter(
  (k) => generationModels[k].active !== false
) as TAvailableGenerationModelId[];
