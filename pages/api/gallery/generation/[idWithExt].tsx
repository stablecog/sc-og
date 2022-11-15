import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";
import OG from "../../../../lib/components/og";
import { getGenerationG } from "../../../../lib/ts/helpers/getGenerationG";

export const config = {
  runtime: "experimental-edge",
};

const width = 1200;
const height = 630;

const jbMono400 = fetch(
  new URL("../../../../public/fonts/jetbrains-mono-400.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const jbMono700 = fetch(
  new URL("../../../../public/fonts/jetbrains-mono-400.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const jbMono800 = fetch(
  new URL("../../../../public/fonts/jetbrains-mono-400.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const [dataJbMono400, dataJbMono700, dataJbMono800] = await Promise.all([
    jbMono400,
    jbMono700,
    jbMono800,
  ]);
  const { searchParams } = new URL(req.url);
  const idWithExt = searchParams.get("idWithExt");
  if (!idWithExt) {
    return new NextResponse("Not found", { status: 400 });
  }
  const id = idWithExt.split(".")[0];
  const generationRes = await getGenerationG(id);
  const { data, error } = generationRes;
  if (error) return new Response(error, { status: 500 });
  if (!data) return new Response("No generation found", { status: 404 });
  return new ImageResponse(OG({ generation: data, width, height }), {
    width: width,
    height: height,
    fonts: [
      {
        name: "JetBrains Mono",
        data: dataJbMono400,
        style: "normal",
        weight: 400,
      },
      {
        name: "JetBrains Mono",
        data: dataJbMono700,
        style: "normal",
        weight: 700,
      },
      {
        name: "JetBrains Mono",
        data: dataJbMono800,
        style: "normal",
        weight: 800,
      },
    ],
  });
}
