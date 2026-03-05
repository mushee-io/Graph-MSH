import * as React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={"glass rounded-3xl p-5 " + (className ?? "")}>{children}</div>;
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <span className="h-2 w-2 rounded-full bg-p-500 shadow-neon" />
      {children}
    </span>
  );
}

export function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-white/90">{children}</span>;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-p-500/40 " +
        (props.className ?? "")
      }
    />
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const variant = props.variant ?? "primary";
  const base =
    "rounded-2xl px-4 py-3 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const cls =
    variant === "primary"
      ? "bg-p-500 hover:bg-p-600 text-white shadow-glow"
      : "border border-white/10 bg-white/5 hover:bg-white/10 text-white/85";
  return <button {...props} className={base + " " + cls + " " + (props.className ?? "")} />;
}

export function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}
