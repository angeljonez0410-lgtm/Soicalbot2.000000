"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "../../../lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      const supabase = getSupabaseBrowser();
      await supabase.auth.getSession();
      router.replace("/admin/social-bot");
    }

    handleAuth();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow p-8">
        <p className="text-gray-700 font-medium">Signing you in...</p>
      </div>
    </main>
  );
}