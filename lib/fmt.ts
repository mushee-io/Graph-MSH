export function shortAddr(a: string) { return a.slice(0,6) + "…" + a.slice(-4); }
export function fmtTs(ts: string) { return new Date(Number(ts)*1000).toLocaleString(); }
export function bytes32Label(hex: string) { return hex ? hex.slice(0,10) + "…" : "—"; }
export function dayKeyFromTs(ts: string) {
  const d = new Date(Number(ts) * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth()+1).padStart(2,"0");
  const da = String(d.getUTCDate()).padStart(2,"0");
  return `${y}-${m}-${da}`;
}
