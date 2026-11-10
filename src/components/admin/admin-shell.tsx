"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminNav } from "@/lib/admin/nav";

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-[#42634C]/20 bg-[#1E3A2C] text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#CEDBCB] uppercase">
            ProfiDepo
          </p>
          <p className="mt-1 text-sm text-white/80">Administrácia</p>
          <p className="mt-3 truncate text-xs text-white/40">{email}</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {adminNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-0.5 block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-[#CEDBCB]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            Odhlásiť sa
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto bg-[#F3F0E8] p-6 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
