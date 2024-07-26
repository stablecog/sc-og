import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import OGOutput from "@/components/og-output";
import cors from "@/ts/constants/cors";
import { getOutput } from "@/ts/helpers/getOutput";
import { font400, font500, font700 } from "@/ts/constants/fonts";

const width = 1200;
const height = 630;

export async function GET(req: Request) {
  const start = Date.now();
  const [fontData400, fontData500, fontData700] = await Promise.all([
    font400,
    font500,
    font700,
  ]);
  const { searchParams } = new URL(req.url);
  const idWithExt = searchParams.get("idWithExt");
  if (!idWithExt) {
    return new NextResponse("Not found", { status: 400 });
  }
  const split = idWithExt.split(".");
  const id = split[0];
  const { data: output, error } = await getOutput(id);
  if (error) return new Response(error, { status: 500 });
  if (!output) return new Response("Not found", { status: 404 });
  const response = new ImageResponse(
    await OGOutput({ output, width, height }),
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
  console.log(`-- OG image for "${output.id}" in: ${end - start}ms --`);
  return cors(req, response);
}
