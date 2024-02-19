import LogoMark from "@/components/logos/LogoMark";
import { generationModels } from "@/ts/helpers/getGalleryImages";
import { getImgProxySrc } from "@/ts/helpers/getImgProxySrc";
import { TGalleryGenerationHit } from "@/ts/types/gallery";

export default async function OGOutput({
  hit,
  width,
  height,
  username,
}: {
  hit: TGalleryGenerationHit;
  width: number;
  height: number;
  username?: string;
}) {
  const bgColor = "rgb(18, 18, 23)";
  const shadowColor = "rgba(0, 0, 4, 0.4)";
  const onBgColor = "rgb(220, 220, 234)";
  const bgSecondaryColor = "rgb(28, 28, 35)";
  const dotColor = "rgba(220, 220, 234, 0.03)";
  const dotDistance = 42;
  const dotSizePercent = 5;
  const ringWidth = 5;

  const finalImageUrl = getImgProxySrc({
    src: hit.image_url,
    preset: "768w",
    extention: "png",
  });

  const maxPromptLength = 120;
  const rootContainerPadding = 24;
  const maxAspectRatio = 0.7;
  const imageContainerBorderRadius = 26;

  const mainContainer = {
    width: width - rootContainerPadding * 2,
    height: height - rootContainerPadding * 2,
  };

  let imageWidth: number;
  let imageHeight: number;
  let imageContainerWidth: number;
  let imageContainerHeight: number;
  const imageAspectRatio = hit.width / hit.height;

  if (imageAspectRatio >= maxAspectRatio) {
    imageHeight = mainContainer.height;
    imageWidth = imageHeight * imageAspectRatio;
    imageContainerWidth = imageHeight * maxAspectRatio;
    imageContainerHeight = imageHeight;
  } else {
    imageHeight = mainContainer.height;
    imageWidth = imageHeight * imageAspectRatio;
    imageContainerWidth = imageWidth;
    imageContainerHeight = imageHeight;
  }

  const rightContainerWidth = width - imageContainerWidth;

  return (
    <div
      style={{
        background: bgColor,
        width,
        height,
        padding: rootContainerPadding,
        color: onBgColor,
        backgroundImage: `
          radial-gradient(circle at 0px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at 0px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%)
        `,
        backgroundSize: `${dotDistance}px ${dotDistance}px`,
      }}
      tw="flex w-full h-full items-center justify-left"
    >
      <div
        style={{
          width: mainContainer.width,
          height: mainContainer.height,
        }}
        tw="flex items-center justify-left"
      >
        <div
          tw="flex justify-center items-center"
          style={{
            overflow: "hidden",
            width: imageContainerWidth,
            height: imageContainerHeight,
            boxShadow: `0px 12px 36px 0px ${shadowColor}`,
            borderRadius: imageContainerBorderRadius,
            border: `${ringWidth}px solid ${bgSecondaryColor}`,
          }}
        >
          <img
            width={imageWidth.toString()}
            height={imageHeight.toString()}
            src={finalImageUrl}
          />
        </div>
        <div
          tw="flex flex-row overflow-hidden items-center justify-start pl-18 pr-24"
          style={{ width: rightContainerWidth, height: mainContainer.height }}
        >
          <div tw="w-full h-full flex flex-col justify-center">
            <div tw="w-full flex items-center">
              {!username && (
                <div tw="flex items-center justify-center -mr-0.5 -mt-3 -ml-2">
                  <LogoMark width={72} />
                </div>
              )}
              <h1 tw="font-bold text-7xl ml-5 -mt-6">
                {username && <span tw="-ml-5 opacity-50 font-semibold">@</span>}
                {username ? username : "Gallery"}
              </h1>
            </div>
            <div tw="w-full flex overflow-hidden">
              <div tw="w-full flex pr-1">
                <p
                  style={{
                    lineHeight: 1,
                    maxHeight: 210,
                  }}
                  tw="w-full flex font-medium flex-wrap break-words text-4xl opacity-75 mt-0"
                >
                  {`${hit.prompt_text.slice(0, maxPromptLength)}${
                    hit.prompt_text.length > maxPromptLength ? "..." : ""
                  }`}
                </p>
              </div>
            </div>
            <div tw="w-full flex mt-4.5">
              <div tw="flex items-center mr-12">
                <svg
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.13.5a4.8 4.8 0 0 0-4.57 3.34 5.27 5.27 0 0 0-2.82 6.51 5.73 5.73 0 0 0 1.68 8.57A5.27 5.27 0 0 0 12 22.3a5.25 5.25 0 0 0 8.58-3.38 5.75 5.75 0 0 0 1.68-8.57 5.27 5.27 0 0 0-2.82-6.5A4.8 4.8 0 0 0 12 1.44C11.2.86 10.2.5 9.12.5ZM6.3 4.74a2.88 2.88 0 0 1 4.03-2.06c.5.23.71.78.71 1.33V19.79c0 .5-.18 1-.6 1.28A3.35 3.35 0 0 1 5.3 18.3l-.02-.62-.56-.25a3.83 3.83 0 0 1-1.46-5.9h2.03c.53 0 .96.42.96.95v.73a1.92 1.92 0 1 0 1.92 0v-.73A2.87 2.87 0 0 0 5.29 9.6H3.51a3.36 3.36 0 0 1 2.16-4.14l.53-.17.1-.55Zm6.66 12.05h1.91a2.88 2.88 0 0 0 2.88-2.87v-3.13a1.92 1.92 0 1 0-1.92 0v3.13c0 .53-.43.96-.96.96h-1.91V4c0-.55.22-1.1.71-1.33a2.86 2.86 0 0 1 4.03 2.06l.1.55.53.17a3.36 3.36 0 0 1 1.96 4.66l-.3.61.48.48a3.82 3.82 0 0 1-1.19 6.22l-.56.25-.01.61a3.35 3.35 0 0 1-5.14 2.78c-.43-.27-.61-.77-.61-1.28v-3Z"
                    fill={onBgColor}
                  />
                </svg>
                <p tw="font-bold text-4xl mt-0.5 ml-3">
                  {generationModels[hit.model_id].shortName}
                </p>
              </div>
              {/* <div tw="flex items-center mr-12">
                <svg
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 2.75A.75.75 0 0 1 2.75 2h18.5a.75.75 0 0 1 0 1.5h-2.361l2.839 7.3c.18.463.297.96.192 1.445a3.501 3.501 0 0 1-6.84 0c-.106-.485.012-.982.192-1.444L18.11 3.5H12.75v17h5.5a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1 0-1.5h5.5v-17H5.889l2.839 7.3c.18.463.298.96.192 1.445a3.501 3.501 0 0 1-6.84 0c-.106-.485.012-.982.192-1.444L5.11 3.5H2.75A.75.75 0 0 1 2 2.75Zm3.5 3.889L7.39 11.5H3.61L5.5 6.639ZM20.39 11.5 18.5 6.639 16.61 11.5h3.78Z"
                    fill={onBgColor}
                  />
                </svg>
                <p tw="font-bold text-4xl mt-0.5 ml-3">
                  {Math.round(hit.guidance_scale)}
                </p>
              </div> */}
              {/* <div tw="flex items-center mr-12">
                <svg
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5 3.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h4v-4a2 2 0 0 1 2-2h4v-4Zm7 .5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v3.5a2 2 0 0 1-2 2H10a.5.5 0 0 0-.5.5v3.5a2 2 0 0 1-2 2H4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V4Z"
                    fill={onBgColor}
                  />
                </svg>
                <p tw="font-bold text-4xl mt-0.5 ml-3">{hit.inference_steps}</p>
              </div> */}
              <div tw="flex items-center">
                <svg
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 5a1 1 0 0 1 1-1h1a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v1a1 1 0 0 0 2 0V5Zm14-3a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v1a1 1 0 1 0 2 0V5a3 3 0 0 0-3-3h-1Zm3 15a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1a1 1 0 1 1 0-2h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1ZM4 18a1 1 0 1 0-2 0v1a3 3 0 0 0 3 3h1a1 1 0 1 0 0-2H5a1 1 0 0 1-1-1v-1Zm17-8.5a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm-17 1a1 1 0 0 0-2 0v3a1 1 0 1 0 2 0v-3ZM9.5 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm1 17a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Z"
                    fill={onBgColor}
                  />
                </svg>
                <p tw="font-bold text-4xl mt-0.5 ml-3">
                  {hit.width}
                  <span tw="mx-1.5 mt-1 text-3xl">×</span>
                  {hit.height}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
