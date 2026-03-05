# Mushee Identity Dashboard (V3) — Heavenly Dark Purple

This is the “futuristic / YC standard” UI: floating orbs, gridlines, glass panels, neon glow, and a dedicated Gasless screen.

## Routes
- `/` Overview (pitch-style landing)
- `/dashboard` Futuristic dashboard (Graph data)
- `/tasks` Task table
- `/datasets` Dataset intelligence (derived)
- `/reputation` Reputation leaderboard
- `/explorer` Wallet explorer + activity
- `/gasless` Gasless investor screen
- `/wallet/[address]` Wallet profile

## Run
```bash
npm install
npm run dev
```

## Vercel env
Set:
`NEXT_PUBLIC_SUBGRAPH_URL="https://api.thegraph.com/subgraphs/name/<YOU>/<SUBGRAPH>"`
