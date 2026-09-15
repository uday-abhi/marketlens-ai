import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = { title: string; value: React.ReactNode; change?: number };

export default function StatCard({ title, value, change }: StatCardProps) {
  const positive = (change ?? 0) >= 0;
  return <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-600"><p className="text-sm text-slate-400">{title}</p><p className="mt-3 truncate text-2xl font-bold text-white">{value}</p>{change !== undefined && <p className={`mt-4 flex items-center gap-1.5 text-sm font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>{positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}{positive ? "+" : ""}{change.toFixed(2)}% <span className="font-normal text-slate-500">24h</span></p>}</article>;
}
