export type TImage = {
  url: string;
  width: number;
  height: number;
};

export interface TGalleryFullOutputPage {
  outputs: TGalleryFullOutput[];
  next?: string;
  metadata: {
    username: string;
  };
}

export interface TGalleryFullOutput extends TGenerationOutput {
  generation: TGeneration;
}

export interface TGenerationOutput {
  id: string;
  image_url: string;
  upscaled_image_url?: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
  is_favorited?: boolean;
  was_auto_submitted: boolean;
  is_public: boolean;
  like_count: number;
  is_liked?: boolean;
  aesthetic_rating_score?: number;
  aesthetic_artifact_score?: number;
}

export interface TGeneration extends TGenerationBase {
  error?: string;
  id?: string;
  ui_id: string;
  width: number;
  height: number;
  started_at?: string;
  created_at: string;
  completed_at?: string;
  submit_to_gallery: boolean;
  is_placeholder?: boolean;
  user: TUser;
  queued_id?: string;
}

export interface TGenerationBase {
  prompt: {
    id: string;
    text: string;
  };
  negative_prompt?: {
    id: string;
    text: string;
  };
  model_id: string;
  scheduler_id: string;
  width: number;
  height: number;
  seed: number;
  inference_steps: number;
  guidance_scale: number;
  num_outputs: number;
  init_image_url?: string;
  prompt_strength?: number;
}

export interface TUser {
  email?: string;
  username: string;
}
