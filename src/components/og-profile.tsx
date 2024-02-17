import LogoHorizontal from "@/components/logos/LogoHorizontal";

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
      tw="flex flex-col w-full h-full items-center justify-between relative"
    >
      <div style={{ paddingTop: "4.5rem" }} tw="flex flex-col items-center">
        <LogoHorizontal width={233} />
        <p tw="font-bold text-7xl -mt-1">
          <span tw="opacity-50 font-semibold">@</span>
          {username}
        </p>
      </div>
      <img
        tw="w-full"
        width={1200}
        height={352}
        src="https://og.stablecog.com/user_profile_preview_base_2.png"
      />
    </div>
  );
}
