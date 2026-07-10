"use client";

import { useEffect, useState } from "react";
import FearGreedGauge from "./FearGreedGauge";
import BtcDominanceChart from "./BtcDominanceChart";
import StatCard from "./StatCard"; // Step 2: Added StatCard Import

type DashboardOverviewResponse = {
  fearGreed: number;
  fearGreedLabel: string;
  btcDominance: number;
  marketCap: string;
  marketCapChange: number;
  volume24h: string;
  volumeChange: number;
  btcPrice: number;
  btcChange: number;
  marketTrend: string;
};

export default function DashboardOverview() {
  const [overview, setOverview] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/overview")
      .then((res) => {
        if (!res.ok) throw new Error("Network response error");
        return res.json();
      })
      .then((data) => {
        setOverview(data);
      })
      .catch((err) => console.error("Error fetching overview data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white text-lg animate-pulse p-8">Loading...</div>;
  }

  if (!overview) {
    return <div className="text-red-500 font-semibold p-8">Unable to load overview.</div>;
  }

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-8">
        Market Overview
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visual Analytics Widgets */}
        <FearGreedGauge value={overview.fearGreed} label={overview.fearGreedLabel} />
        <BtcDominanceChart dominance={overview.btcDominance} />

        {/* Step 3: Replaced with modular BTC Price StatCard */}
        <StatCard
          title="BTC Price"
          value={`$${overview.btcPrice.toLocaleString()}`}
          change={overview.btcChange}
        />

        {/* Step 4: Replaced with modular Market Cap StatCard */}
        <StatCard
          title="Market Cap"
          value={overview.marketCap}
          change={overview.marketCapChange}
        />

        {/* Step 5: Replaced with modular 24H Volume StatCard */}
        <StatCard
          title="24H Volume"
          value={overview.volume24h}
          change={overview.volumeChange}
        />

        {/* Step 6: Refactored Market Trend Display Box */}
        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Market Trend
          </p>
          <div className="mt-6">
            <span
              className={`px-6 py-3 rounded-full text-xl font-bold ${
                overview.marketTrend.includes("Bull")
                  ? "bg-green-500/20 text-green-400"
                  : overview.marketTrend.includes("Bear")
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {overview.marketTrend}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}