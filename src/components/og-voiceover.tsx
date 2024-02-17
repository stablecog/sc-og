import LogoHorizontal from "@/components/logos/LogoHorizontal";
import {
  cleanText,
  monotoneCubicInterpolation,
  normalizeArray,
} from "@/ts/helpers/voiceover";

export default async function OG({
  speakerImageUrl,
  speakerName,
  prompt,
  audioArray,
}: {
  width: number;
  height: number;
  speakerImageUrl: string | null;
  speakerName: string | null;
  prompt: string;
  audioArray: number[] | null;
}) {
  prompt = cleanText(prompt).slice(0, 200);

  const padding = 58;
  const bgColor = "rgb(18, 18, 23)";
  const onBgColor = "rgb(220, 220, 234)";
  const primaryColor = "rgb(181 140 255)";

  const valueMin = 0.2;
  const valueMax = 1;
  const valueCount = 50;
  const placeholderArray = Array.from({ length: valueCount }).map(
    () => Math.random() * (1 - valueMin) + valueMin
  );
  const audioArrayFinal = audioArray
    ? normalizeArray({
        array: audioArray,
        min: valueMin,
        max: valueMax,
      })
    : monotoneCubicInterpolation({
        data: placeholderArray,
        fitCount: valueCount,
        min: valueMin,
        max: valueMax,
      });
  return (
    <div
      style={{
        background: bgColor,
        color: onBgColor,
        padding: padding,
      }}
      tw="flex flex-col w-full h-full items-center justify-center"
    >
      {/* Header */}
      <div style={{ marginTop: -36 }} tw="w-full flex justify-end items-center">
        {
          <div
            style={{
              paddingRight: 40,
              opacity: speakerImageUrl && speakerName ? 1 : 0,
            }}
            tw="flex-1 min-w-0 flex items-center"
          >
            {speakerImageUrl ? (
              <img
                style={{
                  width: 76,
                  height: 76,
                  background: "rgb(220, 220, 234)",
                  borderRadius: 16,
                }}
                src={speakerImageUrl}
              ></img>
            ) : (
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "rgb(220, 220, 234)",
                  borderRadius: 12,
                }}
              ></div>
            )}
            <p
              tw="flex-1 min-w-0"
              style={{
                fontWeight: 700,
                fontSize: 48,
                paddingBottom: 20,
                paddingLeft: 22,
                paddingRight: 22,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {speakerName}
              {speakerName && speakerName.length > 0 ? "" : "..."}
            </p>
          </div>
        }
        <LogoHorizontal width={290.4} />
      </div>
      {/* Prompt */}
      <div style={{ paddingBottom: 15, marginTop: -24 }} tw="w-full flex">
        <p
          style={{
            fontSize: 38,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: 500,
          }}
          tw="flex-1 min-w-0"
        >
          {prompt}
          {prompt && prompt.length > 0 ? "" : "..."}
        </p>
      </div>
      {/* Waveform */}
      <div
        style={{
          borderRadius: 12,
          paddingTop: 8,
        }}
        tw="flex-1 w-full h-full flex flex-col items-center justify-between"
      >
        <div tw="flex flex-1 flex-row items-center justify-between">
          {audioArrayFinal.map((value, index) => (
            <div
              key={index}
              tw="flex"
              style={{
                height: `${value * 100}%`,
                width: `${100 / audioArrayFinal.length}%`,
                paddingRight: 3,
                paddingLeft: 3,
              }}
            >
              <div
                style={{
                  backgroundColor: primaryColor,
                  width: "100%",
                  height: "100%",
                  borderRadius: 9999,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
