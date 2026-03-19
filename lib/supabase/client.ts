import { createClient } from "@supabase/supabase-js";

import { env, hasSupabase } from "@/lib/env";

export function createSupabaseBrowserClient() {
  if (!hasSupabase || !env.supabaseUrl || !env.supabasePublishableKey) {
    return null;
  }

  return createClient(env.supabaseUrl, env.supabasePublishableKey);
}
