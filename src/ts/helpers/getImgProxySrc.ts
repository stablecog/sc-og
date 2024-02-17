import { Base64 } from "js-base64";

export type TImgProxyPreset =
  | "32w"
  | "64w"
  | "76w"
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
