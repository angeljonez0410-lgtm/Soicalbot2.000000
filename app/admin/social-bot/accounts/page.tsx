"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ConnectedAccount = {
  platform: string;
  username: string;
  connected_at: string;
};

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    icon: "📷",
    authUrl: "https://api.instagram.com/oauth/authorize",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    color: "bg-black",
    icon: "𝕏",
    authUrl: "https://twitter.com/i/oauth2/authorize",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "bg-blue-700",
    icon: "in",
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "bg-black",
    icon: "♪",
    authUrl: "https://www.tiktok.com/v2/auth/authorize/",
  },
];

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("sb_access_token")) {
      router.push("/admin/login");
      return;
    }
    // Load connected accounts from localStorage
    const stored = localStorage.getItem("connected_accounts");
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  }, [router]);

  function handleConnect(platformId: string) {
    // For now, simulate connecting an account
    const existing = accounts.find((a) => a.platform === platformId);
    if (existing) {
      // Disconnect
      const updated = accounts.filter((a) => a.platform !== platformId);
      setAccounts(updated);
      localStorage.setItem("connected_accounts", JSON.stringify(updated));
      // Log disconnect
      fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platformId, action: "disconnect", username: existing.username, detail: `Disconnected ${platformId} account` }),
      });
      return;
    }

    // Simulate OAuth connect - in production, redirect to real OAuth URL
    const username = prompt(`Enter your ${platformId} username/handle:`);
    if (!username) return;

    const newAccount: ConnectedAccount = {
      platform: platformId,
      username,
      connected_at: new Date().toISOString(),
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    localStorage.setItem("connected_accounts", JSON.stringify(updated));
    // Log connect
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: platformId, action: "connect", username, detail: `Connected ${platformId} account @${username}` }),
    });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin/social-bot" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">←</span>
            <h1 className="text-2xl font-bold text-gray-900">Social Accounts</h1>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Connect Your Accounts</h2>
        <p className="text-gray-600">Link your social media accounts to publish posts directly from the dashboard.</p>

        <div className="grid gap-4">
          {platforms.map((platform) => {
            const connected = accounts.find((a) => a.platform === platform.id);
            return (
              <div
                key={platform.id}
                className="bg-white rounded-2xl shadow p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${platform.color} text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                    {connected ? (
                      <p className="text-sm text-green-600">
                        Connected as @{connected.username}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Not connected</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(platform.id)}
                  className={`px-5 py-2 rounded-xl font-semibold text-sm ${
                    connected
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Full OAuth integration requires registering your app with each platform&apos;s developer portal. 
            Currently using simulated connections. Real publishing to connected accounts will be enabled once OAuth credentials are configured.
          </p>
        </div>
      </div>
    </main>
  );
}
