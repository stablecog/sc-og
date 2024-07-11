import LogoHorizontal from "@/components/logos/LogoHorizontal";
import { TGenerationModel } from "@/ts/helpers/getGenerationModel";

function toSlug(input: string): string {
  return input
    .toLowerCase() // convert the whole string to lowercase
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[.]+/g, "-"); // replace periods with hyphens
}

export default async function OGGenerationModel({
  model,
  width,
  height,
}: {
  model: TGenerationModel;
  width: number;
  height: number;
}) {
  const bgColor = "rgb(18, 18, 23)";
  const onBgColor = "rgb(220, 220, 234)";

  const imageUrl = `https://ba.stablecog.com/guide/previews/${toSlug(
    model.name_in_worker
  )}.jpg`;

  return (
    <div
      style={{
        background: bgColor,
        color: onBgColor,
      }}
      tw="flex w-full h-full items-center justify-center relative"
    >
      <img width={width} height={height} tw="w-full" src={imageUrl} />
      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0) 50%)",
        }}
        tw="w-full h-full absolute left-0 top-0 flex items-end justify-between px-14 py-7"
      >
        <div tw="flex flex-col items-start justify-start">
          <p tw="font-medium text-4xl">Generate with</p>
          <p tw="font-bold text-7xl -mt-9">{model.name_in_worker}</p>
        </div>
        <div tw="flex items-end justify-end pb-6">
          <LogoHorizontal />
        </div>
      </div>
    </div>
  );
}
