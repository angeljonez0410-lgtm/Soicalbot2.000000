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
  // AI tips for dashboard
  const aiTips = [
    "Tip: Use the Content Calendar to plan a month of posts in seconds!",
    "Tip: Connect all your socials for full automation and analytics.",
    "Tip: Try the AI Assistant for code, content, and strategy help!",
    "Tip: Use the Characters page to create custom AI personas for your brand.",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % aiTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
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
    <>
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg focus-visible:ring-4 focus-visible:ring-fuchsia-400">Skip to main content</a>
      {/* AI Suggest floating button */}
      <button
        aria-label="Get AI suggestions for this page"
        title="Get AI suggestions for this page"
        className="fixed bottom-8 left-8 z-40 rounded-full bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 p-5 shadow-2xl border-4 border-fuchsia-300 animate-pop focus-visible:ring-4 focus-visible:ring-yellow-300"
        onClick={() => alert('AI Suggestion: ' + aiTips[tipIndex])}
      >
        <Sparkles className="h-8 w-8 text-white drop-shadow" />
      </button>
      {/* Main content */}
      <div id="main-content" className="relative mx-auto max-w-6xl py-20 px-6 animate-gradient-bg">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-700 via-violet-700 to-slate-900 animate-gradient-move opacity-80 blur-2xl" />
        {/* AI Tip Banner */}
        <div role="status" aria-live="polite" className="mb-14 flex items-center justify-center gap-8 rounded-3xl bg-gradient-to-r from-yellow-300 via-fuchsia-400 to-violet-600 px-16 py-10 shadow-2xl border-8 border-yellow-400 animate-pop scale-105">
          <Sparkles className="h-16 w-16 text-white animate-bounce drop-shadow-2xl" />
          <span className="text-4xl font-black text-white drop-shadow-2xl tracking-wide uppercase animate-pulse">{aiTips[tipIndex]}</span>
        </div>
        <h1 className="text-8xl font-black text-fuchsia-100 drop-shadow-[0_8px_32px_fuchsia] mb-20 text-center uppercase tracking-tighter flex items-center justify-center gap-10 animate-pop scale-105">
          <LayoutDashboard className="h-24 w-24 animate-pulse drop-shadow-2xl" aria-label="Dashboard" />
          Zuzu AI Dashboard
        </h1>

        {/* Animated Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-20">
          <div className="rounded-4xl p-12 bg-gradient-to-br from-yellow-300 via-fuchsia-400 to-violet-600 shadow-2xl border-8 border-yellow-400 animate-pop flex flex-col items-center focus-visible:ring-4 focus-visible:ring-yellow-300 scale-105" tabIndex={0} aria-label="12 Socials Linked">
            <span className="text-7xl font-black text-white drop-shadow-2xl animate-bounce">12</span>
            <span className="text-2xl font-extrabold text-fuchsia-100 mt-4 uppercase tracking-widest">Socials Linked</span>
          </div>
          <div className="rounded-4xl p-12 bg-gradient-to-br from-fuchsia-400 via-violet-500 to-yellow-300 shadow-2xl border-8 border-fuchsia-400 animate-pop flex flex-col items-center focus-visible:ring-4 focus-visible:ring-yellow-300 scale-105" tabIndex={0} aria-label="30 Day Content Plan">
            <span className="text-7xl font-black text-white drop-shadow-2xl animate-bounce">30</span>
            <span className="text-2xl font-extrabold text-fuchsia-100 mt-4 uppercase tracking-widest">Day Content Plan</span>
          </div>
          <div className="rounded-4xl p-12 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-yellow-300 shadow-2xl border-8 border-fuchsia-400 animate-pop flex flex-col items-center focus-visible:ring-4 focus-visible:ring-yellow-300 scale-105" tabIndex={0} aria-label="99% AI Success Rate">
            <span className="text-7xl font-black text-white drop-shadow-2xl animate-bounce">99%</span>
            <span className="text-2xl font-extrabold text-fuchsia-100 mt-4 uppercase tracking-widest">AI Success Rate</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-20 flex flex-col items-center">
          <span className="text-4xl font-black text-yellow-300 drop-shadow-2xl animate-bounce uppercase tracking-widest" role="status" aria-live="polite">✨ Supercharge your brand with Zuzu! ✨</span>
          <Link href="/app/social-bot" className="mt-8 px-20 py-10 rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-400 to-yellow-300 text-white font-extrabold text-4xl shadow-[0_8px_32px_pink] border-8 border-pink-400 animate-pop hover:scale-110 hover:shadow-pink-300/60 transition focus-visible:ring-8 focus-visible:ring-pink-200 flex items-center gap-6 group" aria-label="Go to Social Hub">
            <Sparkles className="h-12 w-12 text-yellow-100 drop-shadow-2xl animate-bounce group-hover:animate-spin" />
            Go to Social Hub
            <Sparkles className="h-12 w-12 text-yellow-100 drop-shadow-2xl animate-bounce group-hover:animate-spin" />
          </Link>
        </div>

        {/* Dashboard Links */}
        <div className="grid gap-20 md:grid-cols-2">
          {dashboardLinks.map(({ href, label, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border-8 border-pink-400 bg-gradient-to-br from-pink-200 via-fuchsia-300 to-yellow-200 p-20 shadow-[0_8px_32px_pink] flex flex-col items-center hover:scale-110 hover:shadow-pink-300/60 transition-transform animate-pop focus-visible:ring-8 focus-visible:ring-pink-200 scale-105 group"
              tabIndex={0}
              aria-label={label + ': ' + desc}
            >
              <Icon className="h-28 w-28 text-fuchsia-200 drop-shadow-2xl mb-12 animate-bounce" aria-label={label} />
              <span className="text-5xl font-black text-white drop-shadow-2xl mb-6 mt-2 uppercase tracking-widest flex items-center gap-6">
                <Sparkles className="h-10 w-10 text-yellow-100 animate-bounce group-hover:animate-spin" />
                {label}
                <Sparkles className="h-10 w-10 text-yellow-100 animate-bounce group-hover:animate-spin" />
              </span>
              <span className="text-3xl text-pink-100 font-extrabold text-center mb-2">{desc}</span>
            </Link>
          ))}
      </div>

      {/* Vibrant Quick Actions Panel */}
      <div className="mt-20 mb-10">
        <h2 className="text-3xl font-black text-fuchsia-200 mb-8 uppercase tracking-tight animate-pop text-center">Quick Actions</h2>
        <div className="flex flex-wrap gap-10 justify-center">
          <Link href="/app/characters" className="rounded-full bg-gradient-to-br from-pink-300 via-fuchsia-400 to-yellow-200 px-16 py-10 text-3xl font-black text-white shadow-[0_8px_32px_pink] hover:scale-110 hover:shadow-pink-300/60 transition animate-pop flex items-center gap-6 border-4 border-pink-400 group">
            <Users className="h-10 w-10" />
            New Character
            <Sparkles className="h-8 w-8 text-yellow-100 animate-bounce group-hover:animate-spin" />
          </Link>
          <Link href="/app/create-video" className="rounded-full bg-gradient-to-br from-fuchsia-400 via-pink-300 to-yellow-200 px-16 py-10 text-3xl font-black text-white shadow-[0_8px_32px_pink] hover:scale-110 hover:shadow-pink-300/60 transition animate-pop flex items-center gap-6 border-4 border-yellow-300 group">
            <Video className="h-10 w-10" />
            Create Video
            <Sparkles className="h-8 w-8 text-yellow-100 animate-bounce group-hover:animate-spin" />
          </Link>
          <Link href="/app/content-calendar" className="rounded-full bg-gradient-to-br from-yellow-200 via-pink-300 to-fuchsia-400 px-16 py-10 text-3xl font-black text-white shadow-[0_8px_32px_pink] hover:scale-110 hover:shadow-pink-300/60 transition animate-pop flex items-center gap-6 border-4 border-fuchsia-300 group">
            <Sparkles className="h-10 w-10" />
            Content Plan
            <Sparkles className="h-8 w-8 text-yellow-100 animate-bounce group-hover:animate-spin" />
          </Link>
          <Link href="/app/social-media" className="rounded-full bg-gradient-to-br from-pink-200 via-yellow-200 to-fuchsia-400 px-16 py-10 text-3xl font-black text-white shadow-[0_8px_32px_pink] hover:scale-110 hover:shadow-pink-300/60 transition animate-pop flex items-center gap-6 border-4 border-yellow-300 group">
            <Share2 className="h-10 w-10" />
            Social Media
            <Sparkles className="h-8 w-8 text-yellow-100 animate-bounce group-hover:animate-spin" />
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
