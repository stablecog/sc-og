import { ImageResponse } from "@vercel/og";
import OG from "@components/og-voiceover";
import cors from "@ts/constants/cors";
import { supabaseAdmin } from "@ts/constants/supabaseAdmin";
import { Base64 } from "js-base64";
import { getImgProxySrc, getSpeakerImageUrl } from "@components/helpers";

export const runtime = "edge";

const width = 1200;
const height = 480;

const font400 = fetch(
  new URL(
    `../../../../../assets/fonts/avenir-next/avenir-next-400.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font500 = fetch(
  new URL(
    `../../../../../assets/fonts/avenir-next/avenir-next-500.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());
const font700 = fetch(
  new URL(
    `../../../../../assets/fonts/avenir-next/avenir-next-700.ttf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  const [fontData400, fontData500, fontData700] = await Promise.all([
    font400,
    font500,
    font700,
  ]);

  const { searchParams } = new URL(req.url);
  const speaker = Base64.decode(searchParams.get("speaker") || "");
  const prompt = Base64.decode(searchParams.get("prompt") || "");
  const audioArrayParam = searchParams.get("audio_array");
  const audioArray: number[] | null = audioArrayParam
    ? audioArrayParam.split(",").map((a) => parseFloat(a))
    : null;

  let speakerImageUrl = null;
  let speakerName = null;
  try {
    let speakerId = null;
    const { data } = await supabaseAdmin
      .from("voiceover_speakers")
      .select("*")
      .filter("name_in_worker", "eq", speaker)
      .single();
    if (data) {
      speakerId = data.id;
      speakerName = data.name;
    }
    if (speakerId) {
      const url = getImgProxySrc({
        src: getSpeakerImageUrl(speakerId),
        extention: "png",
        preset: "76w",
      });
      const res = await fetch(url);
      if (res.ok) {
        speakerImageUrl = url;
      }
    }
  } catch (error) {
    console.log(error);
  }

  const response = new ImageResponse(
    await OG({
      width,
      height,
      speakerImageUrl,
      speakerName,
      prompt,
      audioArray,
    }),
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
  return cors(req, response);
}
