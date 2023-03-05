export interface TGalleryGenerationFullOutputPageRes {
  hits: TGalleryGenerationHit[];
  next?: string;
}

export interface TGalleryGenerationHit {
  id: string;
  generation_id: string;
  image_url: string;
  upscaled_image_url?: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  inference_steps: number;
  guidance_scale: number;
  model_id: string;
  scheduler_id: string;
  prompt_text: string;
  prompt_id: string;
  negative_prompt_text?: string;
  negative_prompt_id?: string;
}
