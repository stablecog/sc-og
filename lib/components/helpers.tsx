import { Base64 } from "js-base64";

type TImgProxyPreset =
  | "32w"
  | "64w"
  | "128w"
  | "256w"
  | "512w"
  | "768w"
  | "1024w"
  | "1536w"
  | "1920w"
  | "2560w"
  | "full";

type TExtention = "jpeg" | "webp" | "png";

const extentionDefault: TExtention = "png";

export function getImgProxySrc({
  src,
  preset,
  extention = extentionDefault,
}: {
  src: string;
  preset: TImgProxyPreset;
  extention?: TExtention;
}) {
  return `${
    process.env.PUBLIC_IMGPROXY_URL
  }/insecure/${preset}/${Base64.encodeURL(src)}.${extention}`;
}

export function getSpeakerImageUrl(speakerId: string) {
  return `https://ba.stablecog.com/voiceover/speakers/${speakerId}.jpeg`;
}

export function normalizeArray({
  array,
  min = 0,
  max = 1,
}: {
  array: number[];
  min?: number;
  max?: number;
}): number[] {
  const multiplier = Math.pow(Math.max(...array), -1);
  return array.map((num) => Math.max(min, Math.min(max, num * multiplier)));
}
