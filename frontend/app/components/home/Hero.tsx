import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import LiveMarket from "./LiveMarket";

/**
 * Hero section - main landing area.
 * Simple layout: text on left, live market preview on right.
 * No animations for simplicity - CSS transitions handle hover effects.
 */
export default function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
      <div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300">
          <Sparkles size={15} /> Clearer crypto decisions
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Understand the market, <span className="text-blue-400">not just the price.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          MarketLens AI brings live market data, practical technical levels, and easy-to-read AI explanations into one focused workspace.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500">
            Explore dashboard <ArrowRight size={18} />
          </Link>
          <Link href="/coin" className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">
            Analyze a coin
          </Link>
        </div>
        <p className="mt-5 text-sm text-slate-500">Built for learners, researchers, and everyday crypto investors.</p>
      </div>
      <LiveMarket />
    </section>
  );
}