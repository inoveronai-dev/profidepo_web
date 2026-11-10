"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Flash, TextInput } from "@/components/admin/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Prihlásenie zlyhalo.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Prihlásenie zlyhalo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-[#42634C]/20 bg-white p-8 shadow-sm"
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-[#42634C] uppercase">
          ProfiDepo Admin
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1E3A2C]">
          Prihlásenie
        </h1>
        <p className="mt-2 text-sm text-[#2A2E2C]/65">Správa cenníka webovej stránky.</p>

        <div className="mt-8">
          <Flash type={error ? "error" : null} message={error} />
          <Field label="E-mail">
            <TextInput
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="Heslo">
            <TextInput
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Prihlasujem…" : "Prihlásiť sa"}
          </Button>
        </div>
      </form>
    </div>
  );
}
