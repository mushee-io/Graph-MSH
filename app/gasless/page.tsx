import Link from "next/link";
import { Shell } from "@/components/shell";
import { Card, Pill, Badge, Button, Divider, Mono } from "@/components/ui";

export default function GaslessPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="space-y-2">
          <Pill>Gasless</Pill>
          <h1 className="text-2xl font-semibold md:text-3xl">Gasless Screen</h1>
          <p className="text-white/65 max-w-3xl">The investor-ready explanation of how Mushee feels like Web2.</p>
        </div>

        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-p-500/18 blur-3xl animate-pulseGlow" />
            <div className="absolute right-16 top-10 h-56 w-56 rounded-full bg-p-400/14 blur-3xl animate-pulseGlow" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Session wallet</Badge><Badge>Sponsored tx</Badge><Badge>No gas prompts</Badge>
              </div>
              <div className="text-2xl font-semibold text-white">Start → Earn → Reputation</div>
              <div className="text-white/65">Relayer / paymaster pattern under the hood. This is the demo story.</div>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard"><Button>Dashboard</Button></Link>
              <a href="https://thegraph.com/" target="_blank" rel="noreferrer"><Button variant="ghost">The Graph</Button></a>
            </div>
          </div>

          <Divider />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-white font-medium">1) One-click onboarding</div>
              <div className="mt-1 text-sm text-white/65">Create a session wallet on-device.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-white font-medium">2) Sponsored execution</div>
              <div className="mt-1 text-sm text-white/65">Relayer pays gas. User sees zero gas prompts.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-white font-medium">3) Reputation indexed</div>
              <div className="mt-1 text-sm text-white/65">Events → subgraph → dashboard updates.</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/80">Vercel env</div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span className="kbd"><Mono>NEXT_PUBLIC_SUBGRAPH_URL</Mono></span>
              <span>→ your subgraph endpoint.</span>
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
