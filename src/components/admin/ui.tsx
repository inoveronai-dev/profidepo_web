"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1E3A2C]">{title}</h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2A2E2C]/70">{description}</p>
      ) : null}
    </div>
  );
}

export function Flash({
  type,
  message,
}: {
  type: "success" | "error" | null;
  message: string;
}) {
  if (!type || !message) return null;
  return (
    <p
      className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
        type === "success"
          ? "border-[#42634C]/25 bg-[#CEDBCB]/60 text-[#1E3A2C]"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
      role="status"
    >
      {message}
    </p>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-sm font-medium text-[#1E3A2C]">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#42634C]/25 bg-white px-3 py-2.5 text-sm text-[#2A2E2C] outline-none focus:border-[#42634C] focus:ring-1 focus:ring-[#42634C]/30";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-28 ${props.className || ""}`} />;
}

export function Button({
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const styles = {
    primary: "bg-[#1E3A2C] text-white hover:bg-[#42634C]",
    secondary: "border border-[#42634C]/30 bg-white text-[#1E3A2C] hover:bg-[#CEDBCB]/40",
    danger: "bg-red-700 text-white hover:bg-red-800",
    ghost: "text-[#2A2E2C]/70 hover:text-[#1E3A2C]",
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm transition-colors disabled:opacity-50 ${styles} ${props.className || ""}`}
    />
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#42634C]/20 bg-white p-5 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

export function RowActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 flex flex-wrap gap-2">{children}</div>;
}
