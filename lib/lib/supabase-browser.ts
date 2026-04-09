import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowser() {
  // Try to read from globalThis or window for browser-safe env
  const url =
    (typeof window !== "undefined" && (window as any).__env?.NEXT_PUBLIC_SUPABASE_URL) ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    (typeof window !== "undefined" && (window as any).__env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof window !== "undefined" && (window as any).__env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase browser environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
    );
  }

  return createBrowserClient(url, anonKey);
}