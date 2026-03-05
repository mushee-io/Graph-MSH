import Link from "next/link";
import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Button, Divider, Mono } from "@/components/ui";

export default function Home() {
  return (
    <Shell>
      <div className="space-y-6">
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-p-500/20 blur-3xl animate-pulseGlow" />
            <div className="absolute right-10 top-12 h-56 w-56 rounded-full bg-p-400/15 blur-3xl animate-pulseGlow" />
            <div className="absolute left-1/3 -bottom-24 h-72 w-72 rounded-full bg-p-700/15 blur-3xl animate-pulseGlow" />
          </div>

          <div className="relative">
            <Pill>Dark purple • floating glow • YC-grade</Pill>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Mushee Identity Intelligence
            </h1>
            <p className="mt-3 max-w-3xl text-white/70 text-base md:text-lg">
              Gasless-first onboarding + a queryable identity graph (tasks, reputation, datasets) powered by The Graph.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard"><Button>Open Futuristic Dashboard</Button></Link>
              <Link href="/gasless"><Button variant="ghost">Gasless Screen</Button></Link>
              <a href="https://thegraph.com/" target="_blank" rel="noreferrer"><Button variant="ghost">The Graph</Button></a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
              <Badge>Env</Badge>
              <span>Set</span>
              <span className="kbd"><Mono>NEXT_PUBLIC_SUBGRAPH_URL</Mono></span>
              <span>to stream real data.</span>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Investor demo flow</h2>
              <Badge>60s</Badge>
            </div>
            <Divider />
            <div className="mt-4 space-y-3 text-white/75">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white font-medium">1) Gasless start</div>
                <div className="mt-1 text-sm text-white/65">User begins instantly — no gas prompts, no friction.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white font-medium">2) Earn & prove contribution</div>
                <div className="mt-1 text-sm text-white/65">Tasks produce events → indexed → reputation signals.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white font-medium">3) Queryable intelligence</div>
                <div className="mt-1 text-sm text-white/65">Apps/DAOs query your data layer via GraphQL.</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">What’s inside</h2>
              <Badge>tabs</Badge>
            </div>
            <Divider />
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Futuristic dashboard + activity charts</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Tasks feed + dataset intelligence</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Reputation layer + wallet explorer</div>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
