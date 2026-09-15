import Link from "next/link";
import { BarChart3, Database } from "lucide-react";

/**
 * Footer - site footer with links and data attribution.
 * Simple presentational component - no state, no effects.
 * In interviews: "Footer is a server component (no 'use client') - 
 * it's just static UI, no interactivity needed."
 */
const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/coin", label: "Coin analysis" },
  { href: "/report", label: "Market report" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight text-white">
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600"><BarChart3 size={18} /></span>
            MarketLens <span className="text-blue-400">AI</span>
          </Link>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Live crypto market intelligence powered by real data and balanced AI explanations.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-400" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Database size={16} />
          <span>Data: Binance · CoinGecko · alternative.me</span>
        </div>
      </div>
      <div className="border-t border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          Not financial advice. For educational purposes only.
        </div>
      </div>
    </footer>
  );
}