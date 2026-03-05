import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Mono, Divider } from "@/components/ui";
import { Q, gql, getEndpoint, type GraphTask, type GraphUser } from "@/lib/graph";
import { bytes32Label, fmtTs, shortAddr } from "@/lib/fmt";
import WalletLookup from "@/components/wallet-lookup";
import { ActivityBars } from "@/components/charts";

export default async function DashboardPage() {
  const endpoint = getEndpoint();
  let users: GraphUser[] = [];
  let tasks: GraphTask[] = [];
  let err: string | null = null;

  try {
    const u = await gql<{ users: GraphUser[] }>(Q.topUsers, { first: 12 });
    const t = await gql<{ tasks: GraphTask[] }>(Q.recentTasks, { first: 120 });
    users = u.users ?? [];
    tasks = t.tasks ?? [];
  } catch (e: any) {
    err = e?.message || "Failed to load data from subgraph.";
  }

  const usingPlaceholder = endpoint.includes("YOUR/SUBGRAPH");
  const uniqueWallets = new Set(tasks.map((t) => t.user.id)).size;
  const avgQuality = tasks.length ? Math.round(tasks.reduce((a, t) => a + (t.qualityScore || 0), 0) / tasks.length) : 0;

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Pill>Futuristic Dashboard</Pill>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">Network Intelligence</h1>
            <p className="text-white/65 max-w-3xl">High-signal analytics from your subgraph — made for demos.</p>
          </div>
          <div className="text-sm text-white/60">Endpoint: <Mono>{endpoint}</Mono></div>
        </div>

        {usingPlaceholder && (
          <Card className="border border-p-500/40 bg-p-500/10">
            <div className="text-sm text-white/85">Set <Mono>NEXT_PUBLIC_SUBGRAPH_URL</Mono> in Vercel.</div>
          </Card>
        )}
        {err && (
          <Card className="border border-red-500/30 bg-red-500/10">
            <div className="text-sm text-white/85">Could not load subgraph data</div>
            <div className="mt-1 text-sm text-white/65">{err}</div>
          </Card>
        )}

        <section className="grid gap-6 lg:grid-cols-3">
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Tasks</div><Badge>recent</Badge></div><div className="mt-3 text-4xl font-semibold">{tasks.length}</div></Card>
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Active wallets</div><Badge>unique</Badge></div><div className="mt-3 text-4xl font-semibold">{uniqueWallets}</div></Card>
          <Card><div className="flex items-center justify-between"><div className="text-xs text-white/55">Avg quality</div><Badge>signal</Badge></div><div className="mt-3 text-4xl font-semibold">{avgQuality}</div></Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Activity</h2><Badge>last 16 days</Badge></div>
            <Divider />
            <div className="mt-4"><ActivityBars tasks={tasks} /></div>
          </Card>
          <Card>
            <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Top contributors</h2><Badge>by tasks</Badge></div>
            <Divider />
            <div className="mt-4 space-y-3">
              {users.length === 0 ? <div className="text-sm text-white/60">No users yet.</div> : users.slice(0,8).map((u)=>(
                <div key={u.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between"><div className="text-sm font-medium">{shortAddr(u.id)}</div><Badge>rep {u.reputationScore}</Badge></div>
                  <div className="mt-2 text-sm text-white/70">{u.taskCount} tasks • rewards {u.totalRewards}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <WalletLookup title="Find any wallet instantly" />

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Latest task stream</h2><Badge>live feed</Badge></div>
          <Divider />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {tasks.length === 0 ? <div className="text-sm text-white/60">No tasks yet.</div> : tasks.slice(0,10).map((t)=>(
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between"><div className="text-sm font-medium">{shortAddr(t.user.id)}</div><div className="text-xs text-white/55">{fmtTs(t.timestamp)}</div></div>
                <div className="mt-2 text-xs text-white/70">type <span className="text-white/85">{bytes32Label(t.taskType)}</span> • dataset <span className="text-white/85">{bytes32Label(t.datasetId)}</span></div>
                <div className="mt-1 text-xs text-white/60">quality <span className="text-white/80">{t.qualityScore}</span> • reward <span className="text-white/80">{t.rewardAmount}</span></div>
                <div className="mt-2 text-[11px] text-white/45">tx <Mono>{t.txHash.slice(0,16)}…</Mono></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
