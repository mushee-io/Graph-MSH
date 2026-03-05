"use client";

import * as React from "react";
import type { GraphTask } from "@/lib/graph";
import { dayKeyFromTs } from "@/lib/fmt";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function ActivityBars({ tasks }: { tasks: GraphTask[] }) {
  const { labels, values } = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const t of tasks) {
      const k = dayKeyFromTs(t.timestamp);
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    const days = Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0])).slice(-16);
    return { labels: days.map((d) => d[0].slice(5)), values: days.map((d) => d[1]) };
  }, [tasks]);

  if (!tasks.length) return <div className="text-sm text-white/60">No activity yet.</div>;
  const max = Math.max(1, ...values);

  return (
    <div>
      <div className="flex h-20 items-end gap-1">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-xl bg-p-500/25 hover:bg-p-500/40 transition shadow-[0_0_24px_rgba(124,78,255,0.18)]"
            style={{ height: `${clamp((v / max) * 100, 10, 100)}%` }}
            title={`${labels[i]}: ${v}`}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11px] text-white/45">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}
