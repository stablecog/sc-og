export type TImage = {
  url: string;
  width: number;
  height: number;
};

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

export interface TGenerationFullOutput extends TGenerationOutput {
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
  outputs: TGenerationOutput[];
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

export interface TGalleryGenerationFullOutputPageRes {
  hits: TGalleryGenerationHit[];
  next?: string;
}
export interface TUserProfileGenerationFullOutputPageRes {
  hits: TGalleryGenerationHit[];
  next?: string;
  metadata: {
    username: string;
  };
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
  is_public: boolean;
  was_auto_submitted: boolean;
  user: {
    username: string;
  };
  is_liked?: boolean;
  like_count: number;
}
