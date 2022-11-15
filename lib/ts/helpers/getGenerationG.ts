import { supabaseAdmin } from "../constants/supabaseAdmin";

export async function getGenerationG(id: string) {
  if (!supabaseAdmin) {
    console.log("No Supabase instance found");
    return { data: null, error: "No Supabase instance found" };
  }
  const { data, error } = await supabaseAdmin
    .from("generation_g")
    .select(
      `
			width,
			height,
			prompt:prompt_id(id,text),
			negative_prompt:negative_prompt_id(id,text),
			model:model_id(id,name),
			seed,
			inference_steps,
			guidance_scale,
			image_id,
			created_at,
			updated_at,
			id
		`
    )
    .filter("id", "eq", id)
    .maybeSingle();
  if (error) console.log(error);
  if (data) {
    const generation: TDBGenerationG = {
      id: data.id as string,
      width: data.width,
      height: data.height,
      seed: data.seed,
      inference_steps: data.inference_steps,
      guidance_scale: data.guidance_scale,
      image_id: data.image_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      prompt: data.prompt as { id: string; text: string },
      negative_prompt: (data.negative_prompt as {
        id: string;
        text: string;
      } | null)
        ? (data.negative_prompt as { id: string; text: string })
        : null,
      model: data.model as { id: string; name: string },
    };
    return { data: generation, error: null };
  }
  return { data: null, error: "Something went wrong" };
}

export interface TDBGenerationG {
  id: string;
  width: number;
  height: number;
  seed: number;
  inference_steps: number | null;
  guidance_scale: number;
  image_id: string;
  created_at: string;
  updated_at: string;
  prompt: {
    id: string;
    text: string;
  };
  negative_prompt: { id: string; text: string } | null;
  model: {
    id: string;
    name: string;
  };
}
