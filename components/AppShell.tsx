import { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}