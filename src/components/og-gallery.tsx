import LogoHorizontal from "@/components/logos/LogoHorizontal";
import LogoVertical from "@/components/logos/LogoVertical";
import { TImage } from "@/ts/types/gallery";

export default async function OGGalleryGrid({
  images,
  width,
  height,
  gridCols,
  gridRows,
}: {
  images: TImage[];
  width: number;
  height: number;
  gridCols: number;
  gridRows: number;
}) {
  const imageContainer = {
    width: width / gridCols,
    height: height / gridRows,
  };
  const imageContainerMax = Math.max(
    imageContainer.width,
    imageContainer.height
  );
  const imageGrid = images.reduce((acc, item, i) => {
    const row = Math.floor(i / gridCols);
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(item);
    return acc;
  }, [] as TImage[][]);

  const bgFadedColor = "rgba(18, 18, 23, 1)";
  const bgColor = "rgb(18, 18, 23)";
  const onBgColor = "rgb(220, 220, 234)";
  const dotColor = "rgba(220, 220, 234, 0.03)";
  const dotDistance = 42;
  const dotSizePercent = 5;

  return (
    <div
      style={{
        background: bgColor,
        color: onBgColor,
        backgroundImage: `
          radial-gradient(circle at 0px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at 0px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%)
        `,
        backgroundSize: `${dotDistance}px ${dotDistance}px`,
      }}
      tw="flex flex-col items-center justify-center"
    >
      {imageGrid.map((row, i) => (
        <div tw="w-full flex" key={i}>
          {row.map((item, j) => {
            const aspectRatio = item.width / item.height;
            let imageHeight: number;
            let imageWidth: number;
            if (aspectRatio >= 1) {
              imageHeight = imageContainerMax;
              imageWidth = imageHeight * aspectRatio;
            } else {
              imageWidth = imageContainerMax;
              imageHeight = imageWidth / aspectRatio;
            }
            const isLastImage =
              i === imageGrid.length - 1 && j === row.length - 1;

            if (isLastImage) {
              return (
                <div
                  style={{
                    width: imageContainer.width,
                    height: imageContainer.height,
                  }}
                  tw="flex items-center justify-center"
                >
                  <LogoVertical width={180} />
                </div>
              );
            }
            return (
              <div
                key={j}
                style={{
                  width: imageContainer.width,
                  height: imageContainer.height,
                }}
                tw={`flex justify-center overflow-hidden relative items-center`}
              >
                <img src={item.url} width={imageWidth} height={imageHeight} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
