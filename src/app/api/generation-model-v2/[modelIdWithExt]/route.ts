import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import cors from "@/ts/constants/cors";
import { getGenerationModel } from "@/ts/helpers/getGenerationModel";
import OGGenerationModel from "@/components/og-generation-model";
import { sharedHeaders } from "@/ts/constants/headers";

export const runtime = "edge";

const width = 1200;
const height = 630;

const font400 = fetch(
  new URL(
    "../../../../../assets/fonts/avenir-next/avenir-next-400.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font500 = fetch(
  new URL(
    "../../../../../assets/fonts/avenir-next/avenir-next-500.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font700 = fetch(
  new URL(
    "../../../../../assets/fonts/avenir-next/avenir-next-700.ttf",
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
  const modelIdWithExt = searchParams.get("modelIdWithExt");
  if (!modelIdWithExt) {
    return new NextResponse("Not found", { status: 400 });
  }
  const split = modelIdWithExt.split(".");
  const id = split[0];
  const { data: generationModel, error } = await getGenerationModel(id);
  if (error) return new Response(error, { status: 500 });
  if (!generationModel)
    return new Response("No generation model found", { status: 404 });
  const response = new ImageResponse(
    await OGGenerationModel({ model: generationModel, width, height }),
    {
      headers: sharedHeaders,
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
  console.log(
    `-- OG image for model "${generationModel.id}" in: ${end - start}ms --`
  );
  return cors(req, response);
}
