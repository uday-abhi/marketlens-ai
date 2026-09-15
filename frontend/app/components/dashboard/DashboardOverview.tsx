"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { marketApi } from "../../lib/api";
import type { DashboardOverview as DashboardOverviewData } from "../../types/market";
import AnimatedNumber from "../ui/AnimatedNumber";
import LoadingCard from "../ui/LoadingCard";
import StatusMessage from "../ui/StatusMessage";
import AnimatedGauge from "../ui/AnimatedGauge";
import PriceCard from "../ui/PriceCard";
import BtcDominanceChart from "./BtcDominanceChart";
import StatCard from "./StatCard";

/**
 * Dashboard Overview - shows market overview data.
 *
 * Data flow:
 * 1. useEffect runs on mount → calls marketApi.getOverview()
 * 2. API returns data → setOverview() triggers re-render
 * 3. Components display the data
 *
 * In interviews: "We fetch data in useEffect on component mount.
 * This is the standard React pattern for data fetching."
 */
export default function DashboardOverview() {
  const [overview, setOverview] = useState<DashboardOverviewData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    marketApi.getOverview()
      .then(setOverview)
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  if (error) return <StatusMessage variant="error">{error}</StatusMessage>;

  if (!overview) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        <LoadingCard className="h-72" />
        <LoadingCard className="h-72" />
        <LoadingCard className="h-40" />
        <LoadingCard className="h-40" />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity size={18} className="text-blue-400" />
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
        <span className="text-sm text-slate-500">Live data</span>
      </div>

      {/* Top row: Fear & Greed + BTC Price */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatedGauge value={overview.fearGreed} label={overview.fearGreedLabel} />
        <PriceCard price={overview.btcPrice} change={overview.btcChange} label="Bitcoin Price" />
      </div>

      {/* Middle row: Dominance + Market stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <BtcDominanceChart dominance={overview.btcDominance} />
        <div className="space-y-3">
          <StatCard title="Total Market Cap" value={overview.marketCap} change={overview.marketCapChange} />
          <StatCard title="24h Volume" value={overview.volume24h} change={overview.volumeChange} />
        </div>
      </div>

      {/* Bottom: Market Trend */}
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Market Trend</h3>
        <p className="mt-3 text-3xl font-bold text-white">{overview.marketTrend}</p>
        <p className="mt-1 text-sm text-slate-400">
          {overview.btcChange >= 0 ? "📈 Bullish" : "📉 Bearish"} - BTC {overview.btcChange >= 0 ? "+" : ""}{overview.btcChange.toFixed(2)}%
        </p>
      </div>
    </section>
  );
}