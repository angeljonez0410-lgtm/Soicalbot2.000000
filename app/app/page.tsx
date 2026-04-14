"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/auth-fetch";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CalendarPlus,
  Crown,
  DollarSign,
  Lightbulb,
  Map,
  MessageSquareText,
  Mic,
  PenLine,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const quickActions = [
  {
    title: "Schedule Post",
    desc: "Plan the next post and keep your queue moving.",
    icon: CalendarPlus,
    page: "/app/social-bot/posts",
    tone: "bg-[#e9f4ee] text-[#176b5b]",
  },
  {
    title: "Analytics",
    desc: "Read what is working across your social channels.",
    icon: TrendingUp,
    page: "/app/analytics",
    tone: "bg-[#eaf0ff] text-[#3157a8]",
  },
  {
    title: "Connect Accounts",
    desc: "Link profiles so publishing can run from one place.",
    icon: Bot,
    page: "/app/social-bot/accounts",
    tone: "bg-[#fff3cf] text-[#946812]",
  },
  {
    title: "AI Post Builder",
    desc: "Turn an idea into a caption, hook, and posting plan.",
    icon: PenLine,
    page: "/app/social-bot",
    tone: "bg-[#f2ecff] text-[#6a4aa0]",
  },
];

const premiumActions = [
  { title: "Mock Interview", desc: "Practice with generated questions.", icon: Mic, page: "/app/interview-coach" },
  { title: "Salary Negotiation", desc: "Get scripts for the hard parts.", icon: DollarSign, page: "/app/salary-negotiation" },
  { title: "Career Roadmap", desc: "Build a clear next-step plan.", icon: Map, page: "/app/career-roadmap" },
  { title: "Portfolio Ideas", desc: "Shape projects recruiters remember.", icon: Lightbulb, page: "/app/portfolio-ideas" },
];

const statusColors: Record<string, string> = {
  analyzing: "bg-[#eaf0ff] text-[#3157a8]",
  ready: "bg-[#e9f4ee] text-[#176b5b]",
  applied: "bg-[#f2ecff] text-[#6a4aa0]",
  interview: "bg-[#fff3cf] text-[#946812]",
  offer: "bg-[#e8f6dc] text-[#4f7d24]",
  rejected: "bg-[#ffe8e5] text-[#b34333]",
};

const quotes = [
  "Your social presence is the key. Let AI boost it to perfection.",
  "Every post is a step closer. Keep going.",
  "AI cannot stop a God-Mode social strategy.",
  "The best time to post was yesterday. The next best is now.",
  "Success is built one great post at a time.",
];

export default function DashboardPage() {
  const [applications, setApplications] = useState<Record<string, string | number>[]>([]);
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch("/api/applications");
        if (res.ok && !cancelled) setApplications(await res.json());
      } catch {
        // Dashboard should still render when auth data is unavailable.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalApps = applications.length;
  const interviewCount = applications.filter((a) => a.status === "interview").length;
  const appliedCount = applications.filter((a) => ["applied", "interview", "offer"].includes(a.status as string)).length;

  const stats = [
    { label: "Total Applications", value: totalApps, icon: Briefcase, tone: "bg-[#e9f4ee] text-[#176b5b]" },
    { label: "Active Applications", value: appliedCount, icon: TrendingUp, tone: "bg-[#eaf0ff] text-[#3157a8]" },
    { label: "Interviews", value: interviewCount, icon: Star, tone: "bg-[#fff3cf] text-[#946812]" },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-[#dce3d7] bg-[#fbfcf7]">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#176b5b]">
              Beat the ATS in 60 seconds
            </p>
            <h1 className="max-w-4xl text-balance text-3xl font-black leading-[1.05] text-[#17201a] sm:text-5xl">
              Run your job search and social engine from one clean command center.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#647067] sm:text-base">
              Build resumes, track applications, prepare interviews, and create social content without jumping between tools.
            </p>
          </div>

          <div className="rounded-lg border border-[#dce3d7] bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff3cf] text-[#946812]">
                <Crown className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-[#17201a]">Unlock premium tools</p>
                <p className="mt-1 text-sm leading-5 text-[#647067]">Interview practice, salary scripts, roadmaps, and portfolio ideas.</p>
              </div>
            </div>
            <Link
              href="/app/pricing"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#176b5b] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0f4d44]"
            >
              Upgrade Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stat.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-3xl font-black leading-none text-[#17201a]">{stat.value}</p>
                  <p className="mt-1 truncate text-xs font-bold uppercase tracking-[0.04em] text-[#647067]">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {quote ? (
        <section className="rounded-lg border border-[#dce3d7] bg-[#fff3cf] px-5 py-4">
          <p className="text-sm font-semibold leading-6 text-[#6f4f11]">&ldquo;{quote}&rdquo;</p>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#176b5b]">Start Here</p>
            <h2 className="mt-1 text-2xl font-black text-[#17201a]">Quick Actions</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.page} href={action.page} className="group block">
                <div className="card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg ${action.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#17201a]">{action.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#647067]">{action.desc}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-[#176b5b] transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#946812]">Premium</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-black text-[#17201a]">
              <Zap className="h-5 w-5 text-[#946812]" /> Career Boosters
            </h2>
          </div>
          <Link href="/app/pricing" className="inline-flex items-center gap-1 text-sm font-bold text-[#176b5b]">
            Unlock all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {premiumActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.page} href={action.page} className="group block">
                <div className="card h-full border-[#ead9a6] bg-[#fffdf5] p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff3cf] text-[#946812]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#17201a]">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#647067]">{action.desc}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-[#946812] transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {applications.length > 0 ? (
        <section className="space-y-4 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-[#17201a]">Recent Applications</h2>
            <Link href="/app/application-tracker" className="inline-flex items-center gap-1 text-sm font-bold text-[#176b5b]">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-[#dce3d7] bg-[#f8faf5]">
                  <th className="px-4 py-3 text-left font-bold text-[#647067]">Position</th>
                  <th className="px-4 py-3 text-left font-bold text-[#647067]">Company</th>
                  <th className="px-4 py-3 text-left font-bold text-[#647067]">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map((app, i) => (
                  <tr key={i} className="border-b border-[#edf1e9] last:border-0">
                    <td className="px-4 py-3 font-bold text-[#17201a]">{app.job_title as string}</td>
                    <td className="px-4 py-3 text-[#647067]">{app.company_name as string}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[app.status as string] || "bg-gray-100 text-gray-600"}`}>
                        {(app.status as string) || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
