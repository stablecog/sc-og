import { ImageResponse } from "next/og";
import OGGallery from "@/components/og-gallery";
import cors from "@/ts/constants/cors";
import {
  SORTS_DEFAULT_ARRAY,
  getGalleryImages,
  getGalleryLikeParamsFromSearchParams,
} from "@/ts/helpers/getGalleryImages";
import { TImgProxyPreset } from "@/ts/helpers/getImgProxySrc";
import { base64ToSearchParams } from "@/ts/helpers/base64ToSearchParams";
import { font400, font500, font700 } from "@/ts/constants/fonts";
import { userProfilePreviewUrl } from "@/ts/constants/main";
import { logger } from "@/ts/constants/logger";

export const runtime = "edge";

const width = 1200;
const height = 630;

const gridCols = 5;
const gridRows = 2;
const imgProxyPreset: TImgProxyPreset = "256w";
const numImages = gridCols * gridRows;

export async function GET(req: Request) {
  const start = Date.now();
  const [fontData400, fontData500, fontData700] = await Promise.all([
    font400,
    font500,
    font700,
  ]);
  let { searchParams } = new URL(req.url);
  const encodedStringWithExt = searchParams.get("encodedStringWithExt");
  if (!encodedStringWithExt || encodedStringWithExt === "main.png") {
    return defaultResponse(req);
  }
  const encodedString = encodedStringWithExt.split(".")[0];
  if (!encodedString) return defaultResponse(req);
  searchParams = base64ToSearchParams(encodedString);

  const {
    searchString,
    aspectRatioFilters,
    modelIdFilters,
    sorts,
    usernameFilters,
  } = getGalleryLikeParamsFromSearchParams(searchParams);

  if (
    searchString === "" &&
    aspectRatioFilters.length === 0 &&
    modelIdFilters.length === 0 &&
    (sorts.length === 0 || sorts === SORTS_DEFAULT_ARRAY) &&
    usernameFilters.length === 0
  ) {
    return defaultResponse(req);
  }

  try {
    const images = await getGalleryImages({
      search: searchString,
      aspect_ratios: aspectRatioFilters,
      model_ids: modelIdFilters,
      sorts,
      username_filters: usernameFilters,
      per_page: numImages,
      imgProxyPreset,
    });
    if (!images || !Array.isArray(images) || images.length < numImages) {
      return defaultResponse(req);
    }
    const response = new ImageResponse(
      await OGGallery({ images, width, height, gridRows, gridCols }),
      {
        width,
        height,
        fonts: [
          {
            name: "Avenir Next",
            data: fontData400,
            style: "normal",
            weight: 400,
          },
          {
            name: "Avenir Next",
            data: fontData500,
            style: "normal",
            weight: 500,
          },
          {
            name: "Avenir Next",
            data: fontData700,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
    const end = Date.now();
    logger.info(
      `✅ OG image for search query "${searchString}" in: ${end - start}ms`
    );
    return cors(req, response);
  } catch {
    return defaultResponse(req);
  }
}

async function defaultResponse(req: Request) {
  const defaultPreviewImage = await fetch(userProfilePreviewUrl).then((res) =>
    res.arrayBuffer()
  );
  const res = new Response(defaultPreviewImage, {
    headers: {
      "Content-Type": "image/png",
    },
  });
  return cors(req, res);
}
