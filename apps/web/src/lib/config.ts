const requiredEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
  rootDomain: process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
};

export function getPublicConfig() {
  return {
    ...requiredEnv,
    hasSupabase: Boolean(
      requiredEnv.supabaseUrl && requiredEnv.supabaseAnonKey,
    ),
    hasFirebase: Boolean(
      requiredEnv.firebaseProjectId &&
        requiredEnv.firebaseApiKey &&
        requiredEnv.firebaseAuthDomain,
    ),
  };
}
