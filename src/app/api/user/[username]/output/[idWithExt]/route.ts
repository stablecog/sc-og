import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import OGOutput from "@/components/og-output";
import cors from "@/ts/constants/cors";
import { getOutput } from "@/ts/helpers/getOutput";

export const runtime = "edge";

const width = 1200;
const height = 630;

const font400 = fetch(
  new URL(
    `../../../../../../../assets/fonts/avenir-next/avenir-next-400.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font500 = fetch(
  new URL(
    `../../../../../../../assets/fonts/avenir-next/avenir-next-500.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font700 = fetch(
  new URL(
    `../../../../../../../assets/fonts/avenir-next/avenir-next-700.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  const start = Date.now();
  const [fontData400, fontData500, fontData700] = await Promise.all([
    font400,
    font500,
    font700,
  ]);
  const { searchParams } = new URL(req.url);
  const idWithExt = searchParams.get("idWithExt");
  const username = searchParams.get("username");
  if (!idWithExt) {
    return new NextResponse("Not found", { status: 400 });
  }
  if (!username) {
    return new NextResponse("Not found", { status: 400 });
  }
  const split = idWithExt.split(".");
  const id = split[0];
  const { data: hit, error } = await getOutput(id, username);
  if (error) return new Response(error, { status: 500 });
  if (!hit) return new Response("Not found", { status: 404 });
  const response = new ImageResponse(
    await OGOutput({ hit, width, height, username }),
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
  console.log(`-- OG image for "${hit.id}" in: ${end - start}ms --`);
  return cors(req, response);
}
