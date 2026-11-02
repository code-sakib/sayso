import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import "../fields.css";
import "./dashboard.css";

export const metadata: Metadata = { title: "Daily reports · SaySo" };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
