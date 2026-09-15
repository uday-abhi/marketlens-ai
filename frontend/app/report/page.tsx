"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { marketApi } from "../lib/api";
import type { DashboardOverview } from "../types/market";
import LoadingCard from "../components/ui/LoadingCard";
import StatusMessage from "../components/ui/StatusMessage";

/**
 * Market Report Page - generates a simple text report from overview data.
 * 
 * Flow:
 * 1. Fetch overview data on mount
 * 2. Generate report sections from the data
 * 3. Display as static cards
 * 
 * In interviews: "This page shows how to transform raw API data into 
 * a readable report. No AI needed - just template strings with data."
 */
export default function ReportPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    marketApi.getOverview().then(setOverview).catch((requestError: Error) => setError(requestError.message));
  }, []);

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <StatusMessage variant="error">{error}</StatusMessage>
      </main>
    );
  }

  if (!overview) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <LoadingCard className="h-96" />
      </main>
    );
  }

  const direction = overview.btcChange >= 0 ? "higher" : "lower";
  const sections = [
    ["Market direction", `Bitcoin is ${direction} by ${Math.abs(overview.btcChange).toFixed(2)}% over the last 24 hours, giving the market a ${overview.marketTrend.toLowerCase()} tone.`],
    ["Market health", `The Fear & Greed Index is ${overview.fearGreed}/100 (${overview.fearGreedLabel}), while total crypto market capitalization is ${overview.marketCap}.`],
    ["Bitcoin dominance", `Bitcoin represents ${overview.btcDominance.toFixed(2)}% of the total market capitalization. Watch this level for signs of capital rotating into or out of altcoins.`],
    ["What to watch", `Follow the reaction around current Bitcoin prices, the 24-hour volume of ${overview.volume24h}, and whether the daily trend remains intact.`],
  ];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-blue-400">
          <FileText size={17} /> MARKET REPORT
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Today&apos;s market snapshot</h1>
        <p className="mt-2 text-slate-400">A concise summary created from the live overview metrics.</p>
        <div className="mt-8 space-y-4">
          {sections.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-slate-800 bg-[#0b1525] p-5 transition hover:border-slate-600">
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-2 leading-7 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}