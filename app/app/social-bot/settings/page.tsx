"use client";

import { authFetch } from "@/lib/auth-fetch";
import { Loader2, Save, Settings } from "lucide-react";

type SocialSettings = {
  brand_voice: string;
  target_audience: string;
  post_frequency: string;
};

const DEFAULT_SETTINGS: SocialSettings = {
  brand_voice: "Professional, empowering, modern",
  target_audience: "job seekers and career switchers",
  post_frequency: "daily",
};

const API_KEYS = [
  { key: "REPLICATE_API_TOKEN", label: "Replicate API Token" },
  { key: "OPENAI_API_KEY", label: "OpenAI API Key" },
  { key: "SUPABASE_URL", label: "Supabase URL" },
  { key: "SUPABASE_SERVICE_ROLE_KEY", label: "Supabase Service Role Key" },
  { key: "SUPABASE_ANON_KEY", label: "Supabase Anon Key" },
  { key: "SOCIAL_FACEBOOK_CLIENT_ID", label: "Facebook Client ID" },
  { key: "SOCIAL_FACEBOOK_CLIENT_SECRET", label: "Facebook Client Secret" },
  { key: "SOCIAL_INSTAGRAM_CLIENT_ID", label: "Instagram Client ID" },
  { key: "SOCIAL_INSTAGRAM_CLIENT_SECRET", label: "Instagram Client Secret" },
  { key: "SOCIAL_TWITTER_CLIENT_ID", label: "X/Twitter Client ID" },
  { key: "SOCIAL_TWITTER_CLIENT_SECRET", label: "X/Twitter Client Secret" },
  { key: "SOCIAL_LINKEDIN_CLIENT_ID", label: "LinkedIn Client ID" },
  { key: "SOCIAL_LINKEDIN_CLIENT_SECRET", label: "LinkedIn Client Secret" },
  { key: "SOCIAL_TIKTOK_CLIENT_KEY", label: "TikTok Client Key" },
  { key: "SOCIAL_TIKTOK_CLIENT_SECRET", label: "TikTok Client Secret" },
  { key: "SOCIAL_THREADS_CLIENT_ID", label: "Threads Client ID" },
  { key: "SOCIAL_THREADS_CLIENT_SECRET", label: "Threads Client Secret" },
  { key: "SOCIAL_YOUTUBE_CLIENT_ID", label: "YouTube Client ID" },
  { key: "SOCIAL_YOUTUBE_CLIENT_SECRET", label: "YouTube Client Secret" },
  { key: "SOCIAL_PINTEREST_CLIENT_ID", label: "Pinterest Client ID" },
  { key: "SOCIAL_PINTEREST_CLIENT_SECRET", label: "Pinterest Client Secret" },
  { key: "SOCIAL_REDDIT_CLIENT_ID", label: "Reddit Client ID" },
  { key: "SOCIAL_REDDIT_CLIENT_SECRET", label: "Reddit Client Secret" },
];

export default function SocialBotSettingsPage() {
  return (
    <main>
      <h1>Social Bot Settings</h1>
      <p>Configure your social bot preferences here.</p>
    </main>
  );
}
