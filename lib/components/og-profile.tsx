// @ts-ignore
import { TGalleryGenerationHit } from "../ts/types/gallery";
import { getImgProxySrc } from "./helpers";

export default async function OGProfile({
  width,
  height,
  username,
}: {
  width: number;
  height: number;
  username?: string;
}) {
  const bgColor = "rgb(18, 18, 23)";
  const shadowColor = "rgba(0, 0, 4, 0.3)";
  const onBgColor = "rgb(220, 220, 234)";
  const bgSecondaryColor = "rgb(28, 28, 35)";
  const dotColor = "rgba(220, 220, 234, 0.03)";
  const dotDistance = 42;
  const dotSizePercent = 5;
  const ringWidth = 5;

  return (
    <div
      style={{
        background: bgColor,
        color: onBgColor,
        backgroundImage: `
          radial-gradient(circle at 0px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at 0px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
        `,
        backgroundSize: `${dotDistance}px ${dotDistance}px`,
        position: "relative",
      }}
      tw="flex flex-col w-full h-full items-center justify-center relative"
    >
      <img
        tw="w-full h-auto"
        width={1200}
        height={352}
        src="https://og.stablecog.com/user_profile_preview_base_2.png"
      />
      <p>asdfasdf</p>
    </div>
  );
}
