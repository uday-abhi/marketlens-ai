"use client";

import { Activity, Bitcoin, Gauge, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { marketApi } from "../../lib/api";
import type { DashboardOverview } from "../../types/market";
import AnimatedNumber from "../ui/AnimatedNumber";
import LoadingCard from "../ui/LoadingCard";
import StatusMessage from "../ui/StatusMessage";

/**
 * Live Market Snapshot - shows key market metrics on home page.
 * Fetches data on mount and displays 4 metric cards.
 * 
 * In interviews: "This is a client component ('use client') because it uses useState/useEffect.
 * It fetches data from our backend API when the component mounts."
 */
export default function LiveMarket() {
  const [market, setMarket] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    marketApi.getOverview()
      .then(setMarket)
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  if (error) return <StatusMessage variant="error">{error}</StatusMessage>;
  
  if (!market) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <LoadingCard className="h-36" />
        <LoadingCard className="h-36" />
        <LoadingCard className="h-36" />
        <LoadingCard className="h-36" />
      </div>
    );
  }

  const cards = [
    { 
      label: "Bitcoin", 
      value: <AnimatedNumber value={market.btcPrice} decimals={0} prefix="$" className="tabular-nums" />, 
      detail: `${market.btcChange >= 0 ? "+" : ""}${market.btcChange.toFixed(2)}% today`, 
      icon: Bitcoin, 
      positive: market.btcChange >= 0 
    },
    { 
      label: "Market mood", 
      value: market.fearGreedLabel, 
      detail: `${market.fearGreed}/100 Fear & Greed`, 
      icon: Gauge, 
      positive: true 
    },
    { 
      label: "BTC dominance", 
      value: `${market.btcDominance.toFixed(1)}%`, 
      detail: "Share of market cap", 
      icon: Activity, 
      positive: true 
    },
    { 
      label: "Market trend", 
      value: market.marketTrend, 
      detail: "Based on BTC 24h move", 
      icon: TrendingUp, 
      positive: !market.marketTrend.includes("Bear") 
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Live market snapshot</p>
          <p className="mt-1 text-xs text-slate-500">Updated when this page loads</p>
        </div>
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {cards.map(({ label, value, detail, icon: Icon, positive }) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-[#0b1525] p-4 transition hover:-translate-y-0.5 hover:border-slate-600">
            <Icon className="mb-5 text-blue-400" size={19} />
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 truncate text-lg font-bold text-white sm:text-xl">{value}</p>
            <p className={`mt-2 text-xs ${positive ? "text-emerald-400" : "text-red-400"}`}>{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}