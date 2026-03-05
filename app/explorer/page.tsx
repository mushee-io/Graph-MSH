import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Mono, Divider } from "@/components/ui";
import WalletLookup from "@/components/wallet-lookup";
import { Q, gql, type GraphTask } from "@/lib/graph";
import { fmtTs, shortAddr, bytes32Label } from "@/lib/fmt";

export default async function ExplorerPage() {
  let tasks: GraphTask[] = [];
  let err: string | null = null;
  try { tasks = (await gql<{ tasks: GraphTask[] }>(Q.recentTasks, { first: 70 })).tasks ?? []; }
  catch(e:any){ err = e?.message || "Failed to load explorer."; }

  return (
    <Shell>
      <div className="space-y-6">
        <div className="space-y-2">
          <Pill>Explorer</Pill>
          <h1 className="text-2xl font-semibold md:text-3xl">Wallet Explorer</h1>
          <p className="text-white/65">Search wallets and skim activity.</p>
        </div>

        <WalletLookup />

        {err && <Card className="border border-red-500/30 bg-red-500/10"><div className="text-sm text-white/85">{err}</div></Card>}

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Live activity</h2><Badge>recent {tasks.length}</Badge></div>
          <Divider />
          <div className="mt-4 space-y-3">
            {tasks.length===0 ? <div className="text-sm text-white/60">No activity yet.</div> : tasks.map((t)=>(
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between"><div className="text-sm font-medium">{shortAddr(t.user.id)}</div><div className="text-xs text-white/55">{fmtTs(t.timestamp)}</div></div>
                <div className="mt-2 text-xs text-white/70">type <span className="text-white/85">{bytes32Label(t.taskType)}</span> • quality <span className="text-white/85">{t.qualityScore}</span></div>
                <div className="mt-2 text-[11px] text-white/45">tx <Mono>{t.txHash.slice(0,16)}…</Mono></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
