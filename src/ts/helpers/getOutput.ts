import { goApiUrl } from "@/ts/constants/main";
import { TGalleryFullOutput, TGalleryFullOutputPage } from "../types/gallery";
import { logger } from "@/ts/constants/logger";

export async function getOutput(id: string, username?: string) {
  let output: TGalleryFullOutput | undefined = undefined;
  const url = `${goApiUrl}/v1/${
    username ? `profile/${username}/outputs` : `gallery`
  }?output_id=${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    logger.error("Response wasn't okay");
    return { error: "Response wasn't okay" };
  }
  const data: TGalleryFullOutputPage = await res.json();
  if (!data.outputs || !data.outputs[0]) return { error: "No data" };
  output = data.outputs[0];
  return { data: output };
}
