import { ogApiUrl } from "@/ts/constants/main";

export const font400 = fetch(
  `${ogApiUrl}/fonts/avenir-next/avenir-next-400.ttf`
).then((res) => res.arrayBuffer());

export const font500 = fetch(
  `${ogApiUrl}/fonts/avenir-next/avenir-next-500.ttf`
).then((res) => res.arrayBuffer());

export const font700 = fetch(
  `${ogApiUrl}/fonts/avenir-next/avenir-next-700.ttf`
).then((res) => res.arrayBuffer());
