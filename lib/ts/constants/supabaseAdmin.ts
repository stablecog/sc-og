import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_ADMIN_KEY || ""
);
