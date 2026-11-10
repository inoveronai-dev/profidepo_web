import type { Metadata } from "next";
import { connection } from "next/server";
import { AdminAuthGate } from "@/components/admin/admin-auth-gate";
import { AdminShell } from "@/components/admin/admin-shell";
import { getCurrentAdmin } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "ProfiDepo Admin",
  robots: { index: false, follow: false },
};

/** Admin reads session cookies — allow blocking render. */
export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const admin = await getCurrentAdmin();

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#F3F0E8] text-[#2A2E2C]">
        <AdminAuthGate>{children}</AdminAuthGate>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#2A2E2C]">
      <AdminShell email={admin.email}>{children}</AdminShell>
    </div>
  );
}
