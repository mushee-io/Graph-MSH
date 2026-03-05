import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Mono, Divider } from "@/components/ui";
import { Q, gql, type GraphTask } from "@/lib/graph";
import { bytes32Label, fmtTs, shortAddr } from "@/lib/fmt";

export default async function TasksPage() {
  let tasks: GraphTask[] = [];
  let err: string | null = null;
  try { tasks = (await gql<{ tasks: GraphTask[] }>(Q.recentTasks, { first: 300 })).tasks ?? []; }
  catch(e:any){ err = e?.message || "Failed to load tasks."; }

  return (
    <Shell>
      <div className="space-y-6">
        <div className="space-y-2">
          <Pill>Tasks</Pill>
          <h1 className="text-2xl font-semibold md:text-3xl">Task Feed</h1>
          <p className="text-white/65">A clean, high-signal table for demos.</p>
        </div>

        {err && <Card className="border border-red-500/30 bg-red-500/10"><div className="text-sm text-white/85">{err}</div></Card>}

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Latest tasks</h2><Badge>{tasks.length} loaded</Badge></div>
          <Divider />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/60">
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4">Time</th><th className="py-2 pr-4">Wallet</th><th className="py-2 pr-4">Task</th><th className="py-2 pr-4">Dataset</th><th className="py-2 pr-4">Q</th><th className="py-2 pr-4">Reward</th><th className="py-2">Tx</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {tasks.length===0 ? <tr><td className="py-6 text-white/60" colSpan={7}>No tasks yet.</td></tr> : tasks.slice(0,180).map((t)=>(
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2 pr-4 whitespace-nowrap text-white/70">{fmtTs(t.timestamp)}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{shortAddr(t.user.id)}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{bytes32Label(t.taskType)}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{bytes32Label(t.datasetId)}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{t.qualityScore}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{t.rewardAmount}</td>
                    <td className="py-2 whitespace-nowrap"><Mono>{t.txHash.slice(0,12)}…</Mono></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
