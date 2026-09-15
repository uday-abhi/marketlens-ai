import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function DashboardHeader() {
  return <section className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8"><div><p className="flex items-center gap-2 text-sm font-semibold text-blue-400"><LayoutDashboard size={16} /> MARKET PULSE</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Crypto market dashboard</h1><p className="mt-2 text-slate-400">A practical snapshot of the metrics moving the broader market.</p></div><Link href="/coin" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white">Analyze a coin <ArrowRight size={16} /></Link></section>;
}
