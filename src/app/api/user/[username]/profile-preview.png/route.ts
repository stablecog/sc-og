import { ImageResponse } from "@vercel/og";
import { NextResponse } from "next/server";
import cors from "@/ts/constants/cors";
import OGProfile from "@/components/og-profile";
import { sharedHeaders } from "@/ts/constants/headers";

export const runtime = "edge";

const width = 1200;
const height = 630;

const font400 = fetch(
  new URL(
    "../../../../../../assets/fonts/avenir-next/avenir-next-400.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font500 = fetch(
  new URL(
    "../../../../../../assets/fonts/avenir-next/avenir-next-500.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font700 = fetch(
  new URL(
    "../../../../../../assets/fonts/avenir-next/avenir-next-700.ttf",
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
  const username = searchParams.get("username");
  if (!username) {
    return new NextResponse("Not found", { status: 400 });
  }
  const response = new ImageResponse(
    await OGProfile({ width, height, username }),
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
  console.log(`-- OG image for "@${username}" in: ${end - start}ms --`);
  return cors(req, response);
}
