"use client";

import * as React from "react";
import { Button, Card, Input, Mono } from "@/components/ui";

function normalizeAddr(v: string) {
  return v.trim().toLowerCase();
}

export default function WalletLookup({ title = "Wallet lookup" }: { title?: string }) {
  const [value, setValue] = React.useState("");
  const [href, setHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    const v = normalizeAddr(value);
    if (v.startsWith("0x") && v.length === 42) setHref(`/wallet/${v}`);
    else setHref(null);
  }, [value]);

  return (
    <Card>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-white/65">Paste an address to view tasks + reputation.</p>
        </div>
        <div className="flex w-full max-w-xl gap-2">
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="0x…" spellCheck={false} />
          <Button onClick={() => { if (href) window.location.href = href; }} disabled={!href}>Open</Button>
        </div>
      </div>
      <div className="mt-3 text-xs text-white/50">
        Set <Mono>NEXT_PUBLIC_SUBGRAPH_URL</Mono> on Vercel.
      </div>
    </Card>
  );
}
