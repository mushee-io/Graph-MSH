import * as React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Mono } from "@/components/ui";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-glow grid place-items-center">
              <span className="text-lg font-semibold text-white">M</span>
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -left-10 top-0 h-16 w-24 rotate-12 bg-white/10 blur-xl animate-shimmer" />
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Mushee</div>
              <div className="text-sm text-white/60">Identity & Contribution Graph • Gasless UX</div>
            </div>
          </div>
          <div className="text-xs text-white/55">
            Set <Mono>NEXT_PUBLIC_SUBGRAPH_URL</Mono> on Vercel to show real data.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a className="kbd" href="https://thegraph.com/" target="_blank" rel="noreferrer">The Graph</a>
          <a className="kbd" href="https://x.com/mushee_io" target="_blank" rel="noreferrer">x.com/mushee_io</a>
          <Link className="kbd" href="/gasless">Gasless</Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
