

import AppShell from "@/components/AppShell";
import AIAssistant from "@/components/AIAssistant";

export const metadata = {
  title: "ResumeVaultGodAI Dashboard",
  description: "Build resumes, track applications, prepare for interviews, and grow your career.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <AIAssistant />
    </AppShell>
  );
}
