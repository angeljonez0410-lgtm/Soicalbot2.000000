"use client";

import { useEffect } from "react";
import { LayoutDashboard, Bot, Sparkles, Users, Video, Share2 } from "lucide-react";
import Link from "next/link";

const dashboardLinks = [
  { href: "/app/social-bot", label: "Social Hub", icon: Bot, desc: "All accounts, content, and logs in one place." },
  { href: "/app/content-calendar", label: "Content Calendar", icon: Sparkles, desc: "View and refresh your 30-day AI content plan." },
  { href: "/app/characters", label: "Characters", icon: Users, desc: "Generate and manage AI personas for your brand." },
  { href: "/app/create-video", label: "Create Video", icon: Video, desc: "Generate AI influencer videos and voiceovers." },
  { href: "/app/social-media", label: "Social Media", icon: Share2, desc: "Plan captions, hooks, and platform content." },
];

// Confetti burst effect
function fireConfetti() {
  if (typeof window !== "undefined" && window.confetti) {
    window.confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#f0abfc", "#a78bfa", "#f472b6", "#facc15", "#38bdf8", "#fff"],
    });
  }
}

export default function ZuzuDashboard() {
  useEffect(() => {
    // Dynamically load canvas-confetti if not present
    if (typeof window !== "undefined" && !window.confetti) {
      import("canvas-confetti").then((mod) => {
        window.confetti = mod.default;
        fireConfetti();
      });
    } else {
      fireConfetti();
    }
  }, []);

  return (
    <div className="relative mx-auto max-w-6xl py-20 px-6 animate-gradient-bg">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-700 via-violet-700 to-slate-900 animate-gradient-move opacity-80 blur-2xl" />
      <h1 className="text-7xl font-black text-fuchsia-200 drop-shadow-2xl mb-14 text-center uppercase tracking-tight flex items-center justify-center gap-6 animate-pop">
        <LayoutDashboard className="h-16 w-16 animate-pulse" />
        Zuzu AI Dashboard
      </h1>

      {/* Animated Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        <div className="rounded-3xl p-8 bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 shadow-xl border-4 border-fuchsia-300 animate-pop flex flex-col items-center">
          <span className="text-5xl font-black text-white drop-shadow animate-bounce">12</span>
          <span className="text-lg font-extrabold text-fuchsia-100 mt-2 uppercase tracking-wider">Socials Linked</span>
        </div>
        <div className="rounded-3xl p-8 bg-gradient-to-br from-fuchsia-400 via-violet-500 to-yellow-400 shadow-xl border-4 border-yellow-300 animate-pop flex flex-col items-center">
          <span className="text-5xl font-black text-white drop-shadow animate-bounce">30</span>
          <span className="text-lg font-extrabold text-fuchsia-100 mt-2 uppercase tracking-wider">Day Content Plan</span>
        </div>
        <div className="rounded-3xl p-8 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-yellow-400 shadow-xl border-4 border-fuchsia-300 animate-pop flex flex-col items-center">
          <span className="text-5xl font-black text-white drop-shadow animate-bounce">99%</span>
          <span className="text-lg font-extrabold text-fuchsia-100 mt-2 uppercase tracking-wider">AI Success Rate</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mb-16 flex flex-col items-center">
        <span className="text-2xl font-black text-yellow-300 drop-shadow animate-bounce">🚀 Supercharge your brand with Zuzu!</span>
        <Link href="/app/social-bot" className="mt-6 px-10 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 text-white font-extrabold text-2xl shadow-lg border-2 border-yellow-300 animate-pop hover:scale-105 transition">
          Go to Social Hub
        </Link>
      </div>

      {/* Dashboard Links */}
      <div className="grid gap-12 md:grid-cols-2">
        {dashboardLinks.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded-4xl border-4 border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-900 via-violet-900 to-slate-900 p-12 shadow-2xl flex flex-col items-center hover:scale-105 hover:shadow-fuchsia-400/40 transition-transform animate-pop"
          >
            <Icon className="h-16 w-16 text-fuchsia-300 drop-shadow-2xl mb-6 animate-bounce" />
            <div className="text-4xl font-black text-white drop-shadow-2xl mb-3 text-center uppercase tracking-wider animate-pop">
              {label}
            </div>
            <div className="text-2xl text-fuchsia-100 font-extrabold text-center animate-bounce-slow">
              {desc}
            </div>
          </Link>
        ))}
      </div>

      {/* Vibrant Quick Actions Panel */}
      <div className="mt-20 mb-10">
        <h2 className="text-3xl font-black text-fuchsia-200 mb-8 uppercase tracking-tight animate-pop text-center">Quick Actions</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <Link href="/app/characters" className="rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 px-10 py-6 text-2xl font-black text-white shadow-2xl hover:scale-105 transition animate-pop flex items-center gap-3 border-2 border-fuchsia-300">
            <Users className="h-7 w-7" /> New Character
          </Link>
          <Link href="/app/create-video" className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 px-10 py-6 text-2xl font-black text-white shadow-2xl hover:scale-105 transition animate-pop flex items-center gap-3 border-2 border-yellow-300">
            <Video className="h-7 w-7" /> Create Video
          </Link>
          <Link href="/app/content-calendar" className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 px-10 py-6 text-2xl font-black text-white shadow-2xl hover:scale-105 transition animate-pop flex items-center gap-3 border-2 border-fuchsia-300">
            <Sparkles className="h-7 w-7" /> Content Plan
          </Link>
          <Link href="/app/social-media" className="rounded-2xl bg-gradient-to-br from-yellow-400 to-fuchsia-500 px-10 py-6 text-2xl font-black text-white shadow-2xl hover:scale-105 transition animate-pop flex items-center gap-3 border-2 border-yellow-300">
            <Share2 className="h-7 w-7" /> Social Media
          </Link>
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 h-32 pointer-events-none z-50">
        {/* Extra animated gradient glow at the bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 w-2/3 h-32 bg-gradient-to-r from-fuchsia-400/30 via-violet-400/30 to-fuchsia-400/30 blur-2xl animate-gradient-move" />
      </div>
    </div>
  );
}
