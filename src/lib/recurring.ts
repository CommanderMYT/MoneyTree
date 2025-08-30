export type Transaction = { name: string; amount: number; date: string };

export type Subscription = { name: string; amount: number; due: string; recurring: boolean };

function daysBetween(a: string, b: string) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.abs((db - da) / (1000 * 60 * 60 * 24));
}

export function detectRecurring(transactions: Transaction[]): Subscription[] {
  const byName: Record<string, Transaction[]> = {};
  for (const t of transactions) {
    byName[t.name] = byName[t.name] || [];
    byName[t.name].push(t);
  }
  const subs: Subscription[] = [];
  for (const [name, txns] of Object.entries(byName)) {
    const sorted = txns.sort((a, b) => a.date.localeCompare(b.date));
    if (sorted.length < 3) continue;
    const gaps: number[] = [];
    for (let i = 1; i < sorted.length; i++) gaps.push(daysBetween(sorted[i - 1].date, sorted[i].date));
    const avg = gaps.reduce((s, g) => s + g, 0) / gaps.length;
    const isMonthly = avg > 26 && avg < 35;
    const isWeekly = avg > 6 && avg < 8;
    if (isMonthly || isWeekly) {
      const last = sorted[sorted.length - 1];
      const next = new Date(last.date);
      next.setDate(next.getDate() + (isMonthly ? 30 : 7));
      subs.push({ name, amount: last.amount, due: next.toISOString().slice(0, 10), recurring: true });
    }
  }
  return subs;
}
