"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Futuristic Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/datasets", label: "Datasets" },
  { href: "/reputation", label: "Reputation" },
  { href: "/explorer", label: "Explorer" },
  { href: "/gasless", label: "Gasless Screen" },
];

export function Sidebar() {
  const p = usePathname();
  return (
    <nav className="glass rounded-3xl p-4">
      <div className="text-xs font-medium text-white/55 mb-3 px-2">Navigation</div>
      <div className="space-y-1">
        {items.map((it) => {
          const active = p === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={
                "flex items-center justify-between rounded-2xl px-3 py-2 text-sm transition border " +
                (active
                  ? "border-p-500/50 bg-p-500/15 text-white"
                  : "border-white/0 hover:border-white/10 hover:bg-white/5 text-white/75")
              }
            >
              <span>{it.label}</span>
              {active ? <span className="text-[11px] text-white/70">•</span> : <span className="text-[11px] text-white/40">→</span>}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="text-xs text-white/55">Status</div>
        <div className="mt-1 text-sm text-white/80">Demo UI is live. Plug in your subgraph to stream real data.</div>
      </div>
    </nav>
  );
}
