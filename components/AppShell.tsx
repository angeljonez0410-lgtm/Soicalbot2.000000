"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Briefcase,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Mail,
  Map,
  Menu,
  MessageSquare,
  Mic,
  Search,
  Send,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
  { name: "Auto Apply", path: "/app/auto-apply", icon: Zap },
  { name: "Job Analyzer", path: "/app/job-analyzer", icon: Search },
  { name: "Social Bot", path: "/app/social-bot", icon: Bot },
  { name: "Resume Library", path: "/app/resume-library", icon: FileText },
  { name: "Cover Letter", path: "/app/cover-letter", icon: Mail },
  { name: "Follow-Up Email", path: "/app/follow-up-email", icon: Send },
  { name: "My Profile", path: "/app/profile", icon: User },
  { name: "Application Tracker", path: "/app/application-tracker", icon: Briefcase },
  { name: "Analytics", path: "/app/analytics", icon: TrendingUp },
  { name: "Pricing", path: "/app/pricing", icon: CreditCard },
  { name: "Reviews", path: "/app/reviews", icon: MessageSquare },
];

const PREMIUM_NAV = [
  { name: "Interview Coach", path: "/app/interview-coach", icon: Mic },
  { name: "Salary Negotiation", path: "/app/salary-negotiation", icon: DollarSign },
  { name: "Career Roadmap", path: "/app/career-roadmap", icon: Map },
  { name: "Portfolio Ideas", path: "/app/portfolio-ideas", icon: Lightbulb },
];

const ADMIN_NAV = [
  { name: "Admin Users", path: "/app/admin-users", icon: Users },
  { name: "Admin AI Assistant", path: "/app/admin-ai", icon: Bot },
];

const ADMIN_EMAILS = ["angeljonez0410@gmail.com"];

const BOTTOM_TABS = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard },
  { name: "Analyzer", path: "/app/job-analyzer", icon: Search },
  { name: "Social Bot", path: "/app/social-bot", icon: Bot },
  { name: "Profile", path: "/app/profile", icon: User },
];

function NavLink({
  item,
  active,
  onNavigate,
  premium = false,
}: {
  item: { name: string; path: string; icon: typeof LayoutDashboard };
  active: boolean;
  onNavigate: () => void;
  premium?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
        active ? "bg-[#f0b83a] text-[#173d37] shadow-lg" : "text-emerald-50/85 hover:bg-white/10"
      }`}
    >
      <Icon
        className="h-[18px] w-[18px] shrink-0"
        style={!active && premium ? { color: "#f0b83a" } : undefined}
      />
      <span className="min-w-0 flex-1 truncate">{item.name}</span>
      {active ? <ChevronRight className="h-4 w-4 shrink-0 opacity-60" /> : null}
      {!active && premium ? <Zap className="h-3 w-3 shrink-0 text-[#f0b83a]/80" /> : null}
    </Link>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("sb_user") : null;
    if (!userStr) return;

    try {
      const email = JSON.parse(userStr).email;
      setIsAdmin(Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase())));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/app") return pathname === "/app";
    return pathname.startsWith(path);
  };

  const handleSignOut = () => {
    localStorage.removeItem("sb_access_token");
    localStorage.removeItem("sb_refresh_token");
    localStorage.removeItem("sb_user");
    router.push("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#f6f8f4] text-[#17201a] lg:flex">
      {sidebarOpen ? (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-[86vw] flex-col border-r border-white/10 bg-[#173d37] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/app" className="group flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0b83a] shadow-lg transition group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-[#173d37]" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-extrabold leading-tight text-white">Social Bot</h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-50/75">
                  AI Social Automation
                </p>
              </div>
            </Link>
            <button className="rounded-lg p-2 text-white lg:hidden" onClick={closeSidebar}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-emerald-50/75">
            AI-powered scheduling, captions, and social performance in one workspace.
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 sidebar-scroll">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} item={item} active={isActive(item.path)} onNavigate={closeSidebar} />
          ))}
        </nav>

        <div className="space-y-1 px-3 pb-3">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-50/60">Premium</p>
          {PREMIUM_NAV.map((item) => (
            <NavLink
              key={item.path}
              item={item}
              active={isActive(item.path)}
              onNavigate={closeSidebar}
              premium
            />
          ))}
        </div>

        {isAdmin ? (
          <div className="space-y-1 px-3 pb-3">
            <p className="flex items-center gap-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-50/60">
              <Shield className="h-3 w-3 text-[#f0b83a]" /> Admin
            </p>
            {ADMIN_NAV.map((item) => (
              <NavLink key={item.path} item={item} active={isActive(item.path)} onNavigate={closeSidebar} premium />
            ))}
          </div>
        ) : null}

        <div className="mt-auto space-y-3 border-t border-white/10 p-3">
          <div className="rounded-lg border border-[#f0b83a]/30 bg-[#f0b83a]/15 p-4">
            <p className="mb-1 text-xs font-bold text-[#f0b83a]">AI-Powered</p>
            <p className="text-[11px] leading-relaxed text-white/70">
              Manage, schedule, and analyze your social media with AI.
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pt-14 lg:pt-0">
        <header className="fixed left-0 right-0 top-0 z-40 flex items-center gap-3 bg-[#173d37] px-4 py-3 lg:hidden">
          <button className="rounded-lg p-1 text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          {pathname !== "/app" ? (
            <button className="rounded-lg p-1 text-white" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <Link href="/app" className="ml-auto flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0b83a]">
              <Sparkles className="h-3.5 w-3.5 text-[#173d37]" />
            </div>
            <span className="truncate text-sm font-bold text-white">Social Bot</span>
          </Link>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-white/10 bg-[#173d37] lg:hidden">
        {BOTTOM_TABS.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center px-1 py-3 text-xs font-semibold transition ${
                active ? "text-[#f0b83a]" : "text-emerald-50/60 hover:text-emerald-50"
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span className="w-full truncate text-center">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
