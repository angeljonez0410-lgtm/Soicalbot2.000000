"use client";

import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../lib/auth-fetch";

export default function CreatePostForm({
  onCreated,
}: {
  onCreated: () => Promise<void>;
}) {
  const [platform, setPlatform] = useState("instagram");
  const [topic, setTopic] = useState("ResumeVaultGod.com AI resume builder");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [scheduledTime, setScheduledTime] = useState("");
  const [visualPrompt, setVisualPrompt] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [visualStyle, setVisualStyle] = useState("Premium SaaS Ad");
  const [tiktokPrivacyLevel, setTikTokPrivacyLevel] = useState("");
  const [tiktokPrivacyOptions, setTikTokPrivacyOptions] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingPhotoPrompt, setLoadingPhotoPrompt] = useState(false);
  const [loadingVideoPrompt, setLoadingVideoPrompt] = useState(false);
  const [loadingTikTokOptions, setLoadingTikTokOptions] = useState(false);

  function getErrorMessage(error: string | undefined, fallback: string) {
    return error === "Unauthorized" ? "Please log in again, then try this button." : error || fallback;
  }

  const loadTikTokPrivacyOptions = useCallback(async () => {
    setLoadingTikTokOptions(true);

    try {
      const res = await authFetch("/api/social-accounts");
      const data = await res.json();
      if (!res.ok) {
        setTikTokPrivacyOptions([]);
        return;
      }

      const tiktokAccount = (data.accounts || []).find((account: { provider?: string; metadata?: Record<string, unknown> }) => account.provider === "tiktok");
      const options = tiktokAccount?.metadata?.tiktok_privacy_level_options;
      const privacyOptions = Array.isArray(options) ? options.filter((option): option is string => typeof option === "string") : [];
      setTikTokPrivacyOptions(privacyOptions);
      setTikTokPrivacyLevel((currentValue) => currentValue || privacyOptions[0] || "");
    } catch {
      setTikTokPrivacyOptions([]);
    } finally {
      setLoadingTikTokOptions(false);
    }
  }, []);

  useEffect(() => {
    if (platform === "tiktok") {
      void loadTikTokPrivacyOptions();
    }
  }, [loadTikTokPrivacyOptions, platform]);

  async function generateCaption() {
    if (!topic) {
      setMessage("Enter a topic first");
      return;
    }

    setLoadingCaption(true);
    setMessage("");

    try {
      const res = await authFetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(getErrorMessage(data.error, "Failed to generate caption"));
        return;
      }

      setCaption(data.caption || "");
      setMessage("Caption generated");
    } catch {
      setMessage("Could not connect to caption generator");
    } finally {
      setLoadingCaption(false);
    }
  }

  async function generateImage() {
    if (!topic) {
      setMessage("Enter a topic first");
      return;
    }

    setLoadingImage(true);
    setMessage("");

    try {
      const res = await authFetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(getErrorMessage(data.error, "Failed to generate image"));
        return;
      }

      setImageUrl(data.imageUrl || "");
      setMessage("Image generated");
    } catch {
      setMessage("Could not connect to image generator");
    } finally {
      setLoadingImage(false);
    }
  }

  async function generateRealPhotoPrompt() {
    if (!topic) {
      setMessage("Enter a topic first");
      return;
    }

    setLoadingPhotoPrompt(true);
    setMessage("");

    try {
      const res = await authFetch("/api/generate-real-photo-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          visualStyle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(getErrorMessage(data.error, "Failed to generate photo prompt"));
        return;
      }

      setVisualPrompt(data.prompt || "");
      setMessage("Realistic photo prompt generated");
    } catch {
      setMessage("Could not connect to photo prompt generator");
    } finally {
      setLoadingPhotoPrompt(false);
    }
  }

  async function generateVideoPrompt() {
    if (!topic) {
      setMessage("Enter a topic first");
      return;
    }

    setLoadingVideoPrompt(true);
    setMessage("");

    try {
      const res = await authFetch("/api/generate-video-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          visualStyle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(getErrorMessage(data.error, "Failed to generate video prompt"));
        return;
      }

      setVideoPrompt(data.prompt || "");
      setMessage("Realistic video prompt generated");
    } catch {
      setMessage("Could not connect to video prompt generator");
    } finally {
      setLoadingVideoPrompt(false);
    }
  }

  async function handleSubmit() {
    setMessage("");

    if (platform === "tiktok" && !tiktokPrivacyLevel) {
      setMessage("Choose a TikTok privacy level first");
      return;
    }

    const res = await authFetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform,
        topic,
        caption,
        image_url: imageUrl,
        status,
        scheduled_time: scheduledTime || null,
        visual_prompt: visualPrompt,
        video_prompt: videoPrompt,
        visual_style: visualStyle,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(getErrorMessage(data.error, "Failed to create post"));
      return;
    }

    setPlatform("instagram");
    setTopic("");
    setCaption("");
    setImageUrl("");
    setMediaUrl("");
    setStatus("draft");
    setScheduledTime("");
    setVisualPrompt("");
    setVideoPrompt("");
    setVisualStyle("Premium SaaS Ad");
    setTikTokPrivacyLevel("");
    setTikTokPrivacyOptions([]);
    setMessage("Post created");
    await onCreated();
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6">
      <h2 className="text-xl font-bold text-white">Create ResumeVaultGod Post</h2>
      <p className="mt-1 text-sm text-slate-400">
        Generate social content for ResumeVaultGod.com: resumes, ATS wins, interview prep, and career growth.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Platform</label>
          <select
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter/X</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="pinterest">Pinterest</option>
            <option value="tiktok">TikTok</option>
            <option value="reddit">Reddit</option>
            <option value="threads">Threads</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Topic</label>
          <input
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="AI resume builder for job seekers"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Visual Style</label>
          <select
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={visualStyle}
            onChange={(e) => setVisualStyle(e.target.value)}
          >
            <option value="ResumeVaultGod AI Career Brand">ResumeVaultGod AI Career Brand</option>
            <option value="Premium SaaS Ad">Premium SaaS Ad</option>
            <option value="Professional Corporate">Professional Corporate</option>
            <option value="Modern Minimalist">Modern Minimalist</option>
            <option value="Warm and Approachable">Warm and Approachable</option>
          </select>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={generateCaption}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-violet-700 text-sm"
          >
            {loadingCaption ? "Generating..." : "AI Caption"}
          </button>
          <button
            type="button"
            onClick={generateImage}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 text-sm"
          >
            {loadingImage ? "Generating..." : "AI Image"}
          </button>
          <button
            type="button"
            onClick={generateRealPhotoPrompt}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 text-sm"
          >
            {loadingPhotoPrompt ? "Generating..." : "Photo Prompt"}
          </button>
          <button
            type="button"
            onClick={generateVideoPrompt}
            className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 text-sm"
          >
            {loadingVideoPrompt ? "Generating..." : "Video Prompt"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Caption</label>
          <textarea
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3 min-h-[140px]"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Image URL</label>
          <input
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Media / Video URL</label>
          <input
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://...video.mp4"
          />
        </div>

        {platform === "tiktok" ? (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-300">TikTok Privacy</label>
            <select
              className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
              value={tiktokPrivacyLevel}
              onChange={(e) => setTikTokPrivacyLevel(e.target.value)}
              disabled={loadingTikTokOptions}
            >
              <option value="">
                {loadingTikTokOptions ? "Loading available privacy levels..." : "Choose a privacy level"}
              </option>
              {tiktokPrivacyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-500">
              This list comes from the connected TikTok account and is required before publishing.
            </p>
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Visual Prompt</label>
          <textarea
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3 min-h-[100px]"
            value={visualPrompt}
            onChange={(e) => setVisualPrompt(e.target.value)}
            placeholder="Photorealistic prompt for image generation"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Video Prompt</label>
          <textarea
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3 min-h-[100px]"
            value={videoPrompt}
            onChange={(e) => setVideoPrompt(e.target.value)}
            placeholder="Detailed video prompt for production"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Status</label>
          <select
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-300">Scheduled Time</label>
          <input
            type="datetime-local"
            className="w-full border border-white/10 bg-slate-950 text-white rounded-xl px-4 py-3"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700"
        >
          Save Post
        </button>

        {imageUrl ? <img src={imageUrl} alt="Generated visual" className="rounded-xl border border-white/10" /> : null}

        {message ? <p className="text-sm text-slate-400">{message}</p> : null}
      </div>
    </div>
  );
}
