"use client";

import Link from "next/link";
import { Briefcase, FileText, Mail, Map, Mic, Plus, Star, TrendingUp, Zap } from "lucide-react";

const stats = [
  { title: "Applications", value: 0, subtitle: "Tracked roles", icon: Briefcase, glow: "bg-blue-500" },
  { title: "Interviews", value: 0, subtitle: "In progress", icon: Mic, glow: "bg-emerald-500" },
  { title: "Credits Used", value: 0, subtitle: "This month", icon: Zap, glow: "bg-cyan-500" },
  { title: "Response Rate", value: "-", subtitle: "Job hunt signal", icon: TrendingUp, glow: "bg-amber-500" },
];

const actions = [
  {
    label: "Update Profile",
    description: "Save your career details",
    icon: FileText,
    path: "/app/profile",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    label: "Track Application",
    description: "Add a job opportunity",
    icon: Briefcase,
    path: "/app/application-tracker",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "Practice Interview",
    description: "Prepare stronger answers",
    icon: Mic,
    path: "/app/interview-coach",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Studio</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your resume, job search, interviews, and next career move.</p>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full opacity-10 blur-2xl ${stat.glow}`} />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.subtitle}</p>
                </div>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.glow}/20`}>
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.path}
                className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-5 transition-all duration-300 hover:border-white/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-white">{action.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{action.description}</p>
                <Plus className="absolute right-4 top-4 h-4 w-4 text-slate-600 transition-colors group-hover:text-slate-400" />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Career Toolkit</h2>
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-8 text-center">
          <Star className="mx-auto mb-3 h-10 w-10 text-slate-600" />
          <p className="text-sm text-slate-400">Start with your profile, then use AI tools to move faster.</p>
          <p className="mt-1 text-xs text-slate-500">ResumeVaultGodAI keeps the whole job search in one place.</p>
          <Link
            href="/app/career-roadmap"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/15"
          >
            <Map className="h-4 w-4" />
            Build a roadmap
          </Link>
          <Link
            href="/app/follow-up-email"
            className="ml-3 mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/15"
          >
            <Mail className="h-4 w-4" />
            Write follow-up
          </Link>
        </div>
      </section>
    </div>
  );
}
