import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Divider } from "@/components/ui";
import { Q, gql, type GraphUser } from "@/lib/graph";
import { shortAddr } from "@/lib/fmt";

export default async function ReputationPage() {
  let users: GraphUser[] = [];
  let err: string | null = null;
  try { users = (await gql<{ users: GraphUser[] }>(Q.topUsers, { first: 300 })).users ?? []; }
  catch(e:any){ err = e?.message || "Failed to load reputation."; }

  const top = [...users].sort((a,b)=>(b.reputationScore??0)-(a.reputationScore??0)).slice(0,18);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="space-y-2">
          <Pill>Reputation</Pill>
          <h1 className="text-2xl font-semibold md:text-3xl">Reputation Layer</h1>
          <p className="text-white/65">Trust signals for wallets.</p>
        </div>

        {err && <Card className="border border-red-500/30 bg-red-500/10"><div className="text-sm text-white/85">{err}</div></Card>}

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Leaderboard</h2><Badge>top {top.length}</Badge></div>
          <Divider />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {top.length===0 ? <div className="text-sm text-white/60">No users yet.</div> : top.map((u,i)=>(
              <div key={u.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">#{i+1} {shortAddr(u.id)}</div>
                  <Badge>score {u.reputationScore}</Badge>
                </div>
                <div className="mt-2 text-sm text-white/70">{u.taskCount} tasks • rewards {u.totalRewards}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
