import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("[supabase-debug] url:", url);
  console.log("[supabase-debug] key starts with:", anonKey?.slice(0, 20));

  if (!url || !anonKey) {
    throw new Error("Missing Supabase browser environment variables");
  }

  return createBrowserClient(url, anonKey);
}