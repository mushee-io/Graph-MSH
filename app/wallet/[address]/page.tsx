import Link from "next/link";
import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Mono, Divider } from "@/components/ui";
import { Q, gql, type GraphTask, type GraphUser } from "@/lib/graph";
import { bytes32Label, fmtTs, shortAddr } from "@/lib/fmt";

export default async function WalletPage({ params }: { params: { address: string } }) {
  const address = params.address.toLowerCase();
  let user: GraphUser | null = null;
  let tasks: GraphTask[] = [];
  let err: string | null = null;
  try {
    const data = await gql<{ user: GraphUser | null; tasks: GraphTask[] }>(Q.userById, { id: address });
    user = data.user; tasks = data.tasks ?? [];
  } catch(e:any){ err = e?.message || "Failed to load wallet."; }

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Pill>Wallet</Pill>
            <h1 className="text-2xl font-semibold md:text-3xl">{shortAddr(address)}</h1>
            <div className="text-sm text-white/60">Full: <Mono>{address}</Mono></div>
          </div>
          <Link href="/explorer" className="kbd">← Explorer</Link>
        </div>

        {err && <Card className="border border-red-500/30 bg-red-500/10"><div className="text-sm text-white/85">{err}</div></Card>}

        <section className="grid gap-6 lg:grid-cols-3">
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Reputation</div><Badge>score</Badge></div><div className="mt-3 text-4xl font-semibold">{user?.reputationScore ?? 0}</div><div className="mt-2 text-xs text-white/50">last update: {user?.lastReputationUpdate ? fmtTs(user.lastReputationUpdate) : "—"}</div></Card>
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Tasks</div><Badge>count</Badge></div><div className="mt-3 text-4xl font-semibold">{user?.taskCount ?? "0"}</div><div className="mt-2 text-xs text-white/50">indexed completions</div></Card>
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Rewards</div><Badge>total</Badge></div><div className="mt-3 text-4xl font-semibold">{user?.totalRewards ?? "0"}</div><div className="mt-2 text-xs text-white/50">raw amount</div></Card>
        </section>

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Recent tasks</h2><Badge>latest 50</Badge></div>
          <Divider />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {tasks.length===0 ? <div className="text-sm text-white/60">No tasks found.</div> : tasks.map((t)=>(
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between"><div className="text-sm font-medium">type {bytes32Label(t.taskType)}</div><div className="text-xs text-white/55">{fmtTs(t.timestamp)}</div></div>
                <div className="mt-2 text-xs text-white/70">dataset <span className="text-white/85">{bytes32Label(t.datasetId)}</span> • quality <span className="text-white/85">{t.qualityScore}</span></div>
                <div className="mt-2 text-[11px] text-white/45">tx <Mono>{t.txHash.slice(0,16)}…</Mono></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
