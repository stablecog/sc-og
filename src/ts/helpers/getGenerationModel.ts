import { logger } from "@/ts/constants/logger";
import { supabaseAdmin } from "@/ts/constants/supabaseAdmin";

export async function getGenerationModel(id: string) {
  if (!supabaseAdmin) {
    logger.error("No Supabase instance found");
    return { data: null, error: "No Supabase instance found" };
  }
  const { data, error } = await supabaseAdmin
    .from("generation_models")
    .select(
      `
			name_in_worker,
			created_at,
			updated_at,
			id
		`
    )
    .filter("id", "eq", id)
    .maybeSingle();
  if (error) logger.error(error);
  if (data) {
    const generation: TGenerationModel = {
      id: data.id as string,
      name_in_worker: data.name_in_worker,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
    return { data: generation, error: null };
  }
  return { data: null, error: "Something went wrong" };
}

export interface TGenerationModel {
  id: string;
  name_in_worker: string;
  created_at: string;
  updated_at: string;
}
