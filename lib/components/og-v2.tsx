// @ts-ignore
import { TGalleryGenerationHit } from "../ts/types/gallery";
import { getImgProxySrc } from "./helpers";

export default async function OG({
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
  const finalImageUrl = getImgProxySrc({
    src: hit.image_url,
    preset: "768w",
    extention: "png",
  });

  const maxPromptLength = 125;
  const padding = 28;
  let imageWidth: number;
  let imageHeight: number;
  let imageContainerWidth: number;
  let imageContainerHeight: number;
  const imageAspectRatio = hit.width / hit.height;

  if (imageAspectRatio >= 1) {
    imageHeight = height - padding * 2;
    imageWidth = imageHeight * imageAspectRatio;
    imageContainerWidth = imageHeight - 48;
    imageContainerHeight = imageHeight;
  } else {
    imageHeight = height - padding * 2;
    imageWidth = imageHeight * imageAspectRatio;
    imageContainerWidth = imageWidth;
    imageContainerHeight = imageHeight;
  }
  const containerWidth = width - 2 * padding - imageContainerWidth;

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
        padding: padding,
        backgroundImage: `
          radial-gradient(circle at 0px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at 0px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%)
        `,
        backgroundSize: `${dotDistance}px ${dotDistance}px`,
      }}
      tw="flex w-full h-full items-center justify-center"
    >
      <div
        tw="flex justify-center items-center rounded-2xl"
        style={{
          overflow: "hidden",
          width: imageContainerWidth,
          height: imageContainerHeight,
          boxShadow: `0px 0px 0px ${ringWidth}px ${bgSecondaryColor}, 0px 12px 36px 0px ${shadowColor}`,
        }}
      >
        <img
          width={imageWidth.toString()}
          height={imageHeight.toString()}
          src={finalImageUrl}
        />
      </div>
      <div
        style={{
          width: containerWidth,
          overflow: "hidden",
          paddingLeft: padding * 2,
          paddingRight: padding * 2,
        }}
        tw="h-full flex flex-col justify-center"
      >
        <div tw="w-full flex flex-col">
          <div tw="w-full flex items-center">
            {!username && (
              <svg
                style={{
                  width: 72,
                  height: 72,
                  marginLeft: -8,
                  marginTop: -8,
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
              >
                <g>
                  <path
                    fill="url(#b)"
                    d="M6.484 25.516c-.75.75-.759 1.984.105 2.601.292.208.591.401.897.58.559.324.871.97.704 1.595a.961.961 0 0 0 .68 1.177l1.857.498a.961.961 0 0 0 1.177-.68l.009-.032c.162-.608.74-1 1.368-1 .629 0 1.206.392 1.369 1l.008.032a.961.961 0 0 0 1.178.68l1.857-.498a.961.961 0 0 0 .68-1.177l-.009-.03c-.162-.607.136-1.233.68-1.547.544-.315 1.247-.267 1.692.178l.022.022a.961.961 0 0 0 1.36 0l1.359-1.36a.961.961 0 0 0 0-1.36l-.022-.021c-.445-.445-.492-1.148-.178-1.692.314-.545.94-.842 1.547-.68l.03.008a.961.961 0 0 0 1.178-.68l.497-1.857a.961.961 0 0 0-.68-1.177l-.032-.009c-.607-.162-1-.74-1-1.368 0-.629.393-1.206 1-1.369l.032-.008a.961.961 0 0 0 .68-1.178l-.497-1.857a.961.961 0 0 0-1.178-.68c-.624.168-1.27-.145-1.596-.703a11.557 11.557 0 0 0-1.82-2.362L6.484 25.516Z"
                  />
                  <path
                    fill="url(#c)"
                    d="M6.484 25.516c-.75.75-.759 1.984.105 2.601.292.208.591.401.897.58.559.324.871.97.704 1.595a.961.961 0 0 0 .68 1.177l1.857.498a.961.961 0 0 0 1.177-.68l.009-.032c.162-.608.74-1 1.368-1 .629 0 1.206.392 1.369 1l.008.032a.961.961 0 0 0 1.178.68l1.857-.498a.961.961 0 0 0 .68-1.177l-.009-.03c-.162-.607.136-1.233.68-1.547.544-.315 1.247-.267 1.692.178l.022.022a.961.961 0 0 0 1.36 0l1.359-1.36a.961.961 0 0 0 0-1.36l-.022-.021c-.445-.445-.492-1.148-.178-1.692.314-.545.94-.842 1.547-.68l.03.008a.961.961 0 0 0 1.178-.68l.497-1.857a.961.961 0 0 0-.68-1.177l-.032-.009c-.607-.162-1-.74-1-1.368 0-.629.393-1.206 1-1.369l.032-.008a.961.961 0 0 0 .68-1.178l-.497-1.857a.961.961 0 0 0-1.178-.68c-.624.168-1.27-.145-1.596-.703a11.557 11.557 0 0 0-1.82-2.362L6.484 25.516Z"
                  />
                  <path
                    fill="url(#d)"
                    d="M8.523 5.804a.961.961 0 0 1 0-1.36l1.36-1.359a.961.961 0 0 1 1.359 0l.022.022c.445.445 1.148.493 1.692.178.544-.314.842-.94.68-1.547l-.008-.03a.961.961 0 0 1 .68-1.177l1.856-.498a.961.961 0 0 1 1.178.68l.008.032c.163.608.74 1 1.369 1 .628 0 1.206-.392 1.368-1l.01-.032a.961.961 0 0 1 1.176-.68l1.858.498a.961.961 0 0 1 .68 1.177c-.168.624.145 1.27.703 1.596.306.178.605.37.896.579.865.617.857 1.85.106 2.6L10.562 21.439a11.552 11.552 0 0 1-1.82-2.362c-.325-.558-.972-.87-1.596-.704a.961.961 0 0 1-1.178-.68l-.497-1.856a.961.961 0 0 1 .68-1.178l.032-.008c.607-.163 1-.74 1-1.369 0-.628-.393-1.206-1-1.369l-.032-.008a.961.961 0 0 1-.68-1.178l.497-1.857a.961.961 0 0 1 1.178-.68l.03.009c.607.162 1.233-.135 1.547-.68.314-.544.267-1.247-.178-1.692l-.022-.022Z"
                  />
                  <path
                    fill="url(#e)"
                    fill-rule="evenodd"
                    d="M8.93 5.398a.961.961 0 0 1 0-1.36l-.407.407a.961.961 0 0 0 0 1.359l.022.022c.445.445.492 1.148.178 1.692a1.79 1.79 0 0 1-.053.086 1.48 1.48 0 0 0 .46-.492c.314-.545.266-1.247-.179-1.692l-.022-.022ZM6.45 8.267a.959.959 0 0 0-.483.602l-.497 1.857a.961.961 0 0 0 .68 1.178l.032.008c.607.163 1 .74 1 1.369 0 .291-.084.571-.235.804.399-.254.642-.716.642-1.21 0-.629-.393-1.206-1-1.369l-.033-.008a.961.961 0 0 1-.68-1.178l.498-1.857a.965.965 0 0 1 .076-.196Zm-.497 6.468a.962.962 0 0 0-.483 1.1l.497 1.858a.961.961 0 0 0 1.178.68c.624-.168 1.27.145 1.596.703.49.844 1.097 1.639 1.82 2.362l.406-.406a11.553 11.553 0 0 1-1.82-2.362c-.325-.559-.972-.871-1.596-.704a.961.961 0 0 1-1.177-.68l-.498-1.857a.958.958 0 0 1 .077-.694Zm.93 10.381-.4.4c-.75.75-.759 1.984.105 2.601.292.208.591.401.897.579.559.325.871.972.704 1.596a.961.961 0 0 0 .68 1.177l1.857.498a.962.962 0 0 0 1.1-.483.958.958 0 0 1-.694.077l-1.857-.498a.961.961 0 0 1-.68-1.177c.167-.624-.145-1.271-.704-1.596a11.297 11.297 0 0 1-.896-.58c-.862-.614-.857-1.842-.112-2.594Zm5.593 5.373a1.49 1.49 0 0 1 .804-.235c.629 0 1.206.393 1.369 1l.008.033a.961.961 0 0 0 1.178.68l1.857-.498a.959.959 0 0 0 .603-.482.966.966 0 0 1-.197.076l-1.857.498a.961.961 0 0 1-1.177-.68l-.01-.033c-.162-.607-.74-1-1.368-1-.494 0-.956.243-1.21.642Zm6.481-1.721c.028-.019.057-.036.086-.053.544-.315 1.247-.267 1.692.178l.022.022a.961.961 0 0 0 1.36 0l.406-.406a.961.961 0 0 1-1.36 0l-.022-.023c-.444-.444-1.147-.492-1.692-.177a1.48 1.48 0 0 0-.492.459Zm4.779-4.778c.314-.21.705-.29 1.087-.188l.03.008a.962.962 0 0 0 1.101-.483.958.958 0 0 1-.694.077l-.03-.008c-.575-.154-1.167.104-1.495.594Zm1.72-6.482c.11-.069.23-.123.36-.158l.032-.009a.959.959 0 0 0 .603-.482.966.966 0 0 1-.196.076l-.033.009c-.326.087-.59.294-.765.564ZM20.58.11a.959.959 0 0 0-.483.603l-.009.032a1.29 1.29 0 0 1-.157.36c.27-.176.476-.44.564-.766l.009-.033A.96.96 0 0 1 20.58.11Zm-6.47.497a.962.962 0 0 0-.484 1.1l.008.03c.103.383.023.774-.187 1.089.49-.329.748-.92.594-1.494l-.008-.03a.958.958 0 0 1 .077-.695Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="url(#f)"
                    fill-rule="evenodd"
                    d="M9.477 3.491a.961.961 0 0 1 1.359 0l.022.022c.444.445 1.147.493 1.692.178a1.48 1.48 0 0 0 .491-.46 1.52 1.52 0 0 1-.085.054c-.544.315-1.247.267-1.692-.178l-.022-.022a.961.961 0 0 0-1.36 0l-.405.406Zm4.227-2.478a.964.964 0 0 1 .197-.076l1.857-.498a.961.961 0 0 1 1.177.68l.01.033c.162.607.74 1 1.368 1 .494 0 .956-.243 1.21-.642a1.482 1.482 0 0 1-.804.236c-.629 0-1.206-.393-1.369-1l-.008-.033a.961.961 0 0 0-1.178-.68l-1.857.498a.959.959 0 0 0-.603.482Zm6.469-.497a.958.958 0 0 1 .694-.077l1.857.498a.961.961 0 0 1 .68 1.177c-.167.624.145 1.271.704 1.596.305.178.605.37.896.579.864.617.857 1.85.106 2.601l.406-.406c.75-.751.759-1.984-.105-2.601a11.47 11.47 0 0 0-.897-.58c-.558-.324-.871-.97-.704-1.595A.961.961 0 0 0 23.13.53L21.275.033a.962.962 0 0 0-1.101.483Zm1.265 10.046-.406.406a11.55 11.55 0 0 1 1.82 2.362c.325.559.972.871 1.596.704a.961.961 0 0 1 1.177.68l.498 1.856a.958.958 0 0 1-.077.695.962.962 0 0 0 .483-1.1l-.497-1.858a.961.961 0 0 0-1.178-.68c-.624.168-1.27-.145-1.596-.703a11.557 11.557 0 0 0-1.82-2.362Zm3.614 7.353a1.434 1.434 0 0 0-.642 1.21c0 .629.393 1.206 1 1.369l.033.008a.961.961 0 0 1 .68 1.178l-.498 1.857a.971.971 0 0 1-.076.196c.23-.12.41-.332.483-.602l.497-1.858a.961.961 0 0 0-.68-1.177l-.032-.009c-.607-.162-1-.74-1-1.368 0-.291.084-.571.235-.805Zm-1.722 6.481c-.184.123-.343.29-.46.492-.314.544-.266 1.247.179 1.692l.022.022a.961.961 0 0 1 0 1.36l.406-.407a.961.961 0 0 0 0-1.36l-.022-.021c-.445-.445-.492-1.148-.178-1.692a1.79 1.79 0 0 1 .053-.086Zm-4.778 4.778c-.49.328-.748.92-.594 1.494l.008.03a.958.958 0 0 1-.077.695.962.962 0 0 0 .483-1.1l-.008-.03a1.331 1.331 0 0 1 .188-1.089Zm-6.481 1.722c-.27.175-.477.439-.565.765l-.008.032a.966.966 0 0 1-.077.197c.23-.12.41-.332.483-.603l.009-.032c.034-.13.088-.25.158-.36ZM5.548 15.14a.972.972 0 0 1 .196-.076l.033-.01a1.31 1.31 0 0 0 .765-.563 1.303 1.303 0 0 1-.359.158l-.032.008a.959.959 0 0 0-.603.483Zm.497-6.468a.958.958 0 0 1 .694-.077l.03.008c.575.154 1.166-.105 1.494-.594-.314.21-.705.29-1.087.188l-.03-.008a.962.962 0 0 0-1.101.483Z"
                    clip-rule="evenodd"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="b"
                    x1="21.519"
                    x2="5.177"
                    y1="10.713"
                    y2="26.574"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#9866FF" />
                    <stop offset="1" stop-color="#C3A6FF" />
                  </linearGradient>
                  <linearGradient
                    id="c"
                    x1="15.594"
                    x2="18.031"
                    y1="14.218"
                    y2="17.468"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#0F0F12" stop-opacity=".1" />
                    <stop offset="1" stop-color="#0F0F12" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="d"
                    x1="10.657"
                    x2="26.717"
                    y1="21.344"
                    y2="5.284"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#9866FF" />
                    <stop offset="1" stop-color="#C3A6FF" />
                  </linearGradient>
                  <linearGradient
                    id="e"
                    x1="6.657"
                    x2="17.219"
                    y1="28.193"
                    y2="16.818"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#9C6CFF" />
                    <stop offset="1" stop-color="#925CFF" />
                  </linearGradient>
                  <linearGradient
                    id="f"
                    x1="16.38"
                    x2="26.967"
                    y1="14.763"
                    y2="7.723"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#AD85FF" />
                    <stop offset="1" stop-color="#CEB7FF" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            <h1 tw="font-bold text-7xl ml-4 -mt-6">
              {username && <span tw="-ml-4 opacity-50 font-semibold">@</span>}
              {username ? username : "Gallery"}
            </h1>
          </div>
          <p
            style={{
              lineHeight: 1,
            }}
            tw="w-full flex font-medium flex-wrap break-words text-4xl opacity-75 mt-2"
          >
            {`${hit.prompt_text.slice(0, maxPromptLength)}${
              hit.prompt_text.length > maxPromptLength ? "..." : ""
            }`}
          </p>
          <div tw="w-full flex mt-3">
            <div tw="flex items-center mr-10">
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
              <p tw="font-bold text-4xl mt-0.5 ml-2">
                {Math.round(hit.guidance_scale)}
              </p>
            </div>
            <div tw="flex items-center mr-10">
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
              <p tw="font-bold text-4xl mt-0.5 ml-2">{hit.inference_steps}</p>
            </div>
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
              <p tw="font-bold text-4xl mt-0.5 ml-2">
                {hit.width}
                <span tw="mx-1.5 mt-1 text-3xl">×</span>
                {hit.height}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
