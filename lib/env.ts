function readEnv(name: string) {
  const value = process.env[name];
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

export const env = {
  supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabasePublishableKey: readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  databaseUrl: readEnv("DATABASE_URL"),
  openrouterApiKey: readEnv("OPENROUTER_API_KEY"),
  openrouterModel: readEnv("OPENROUTER_MODEL") ?? "openrouter/free",
  vercelProjectId: readEnv("VERCEL_PROJECT_ID"),
  vercelToken: readEnv("VERCEL_TOKEN")
};

export const hasSupabase = Boolean(env.supabaseUrl && env.supabasePublishableKey);
export const hasDatabase = Boolean(env.databaseUrl);
export const hasOpenRouter = Boolean(env.openrouterApiKey);
