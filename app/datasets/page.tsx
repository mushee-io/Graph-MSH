import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Mono, Divider } from "@/components/ui";
import { Q, gql, type GraphTask } from "@/lib/graph";
import { bytes32Label } from "@/lib/fmt";

type Row = { datasetId: string; taskCount: number; avgQuality: number; totalRewards: bigint };

export default async function DatasetsPage() {
  let tasks: GraphTask[] = [];
  let err: string | null = null;
  try { tasks = (await gql<{ tasks: GraphTask[] }>(Q.recentTasks, { first: 900 })).tasks ?? []; }
  catch(e:any){ err = e?.message || "Failed to load datasets."; }

  const map = new Map<string, { c:number; q:number; r:bigint }>();
  for (const t of tasks) {
    const k = t.datasetId || "0x0";
    const cur = map.get(k) ?? { c:0, q:0, r:0n };
    cur.c += 1; cur.q += Number(t.qualityScore ?? 0);
    try { cur.r += BigInt(t.rewardAmount ?? "0"); } catch {}
    map.set(k, cur);
  }
  const rows: Row[] = Array.from(map.entries()).map(([datasetId,v])=>({
    datasetId, taskCount: v.c, avgQuality: v.c ? Math.round(v.q/v.c) : 0, totalRewards: v.r
  })).sort((a,b)=>b.taskCount-a.taskCount).slice(0,40);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="space-y-2">
          <Pill>Datasets</Pill>
          <h1 className="text-2xl font-semibold md:text-3xl">Dataset Intelligence</h1>
          <p className="text-white/65">Derived from Task.datasetId — perfect for demo.</p>
        </div>

        {err && <Card className="border border-red-500/30 bg-red-500/10"><div className="text-sm text-white/85">{err}</div></Card>}

        <Card>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Top datasets</h2><Badge>{rows.length} shown</Badge></div>
          <Divider />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/60">
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4">Dataset</th><th className="py-2 pr-4">Tasks</th><th className="py-2 pr-4">Avg Q</th><th className="py-2">Rewards</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {rows.length===0 ? <tr><td className="py-6 text-white/60" colSpan={4}>No dataset activity yet.</td></tr> : rows.map((r)=>(
                  <tr key={r.datasetId} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2 pr-4 whitespace-nowrap">
                      <div className="text-white/85">{bytes32Label(r.datasetId)}</div>
                      <div className="text-[11px] text-white/45"><Mono>{r.datasetId.slice(0,22)}…</Mono></div>
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">{r.taskCount}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{r.avgQuality}</td>
                    <td className="py-2 whitespace-nowrap">{r.totalRewards.toString()}</td>
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
