import Link from "next/link";
import { CreditCard, FileText, Settings, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-blue-600">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-slate-400">Manage your account, profile, credits, and security.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: "/app/profile", icon: FileText, title: "Career Profile", desc: "Update your resume details and saved experience." },
          { href: "/app/pricing", icon: CreditCard, title: "Credits", desc: "Buy credits for premium AI career tools." },
          { href: "/app/admin-users", icon: Shield, title: "Admin", desc: "Manage users and credit balances." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="rounded-xl border border-white/5 bg-slate-900/50 p-5 transition hover:border-white/10 hover:bg-slate-900">
              <Icon className="mb-4 h-6 w-6 text-blue-300" />
              <h2 className="font-semibold text-white">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
