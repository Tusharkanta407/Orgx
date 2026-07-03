const requiredEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

export function getPublicConfig() {
  return {
    ...requiredEnv,
    hasSupabase: Boolean(
      requiredEnv.supabaseUrl && requiredEnv.supabaseAnonKey,
    ),
  };
}
