"use client";

import { useEffect, useState } from "react";
import StatsCards from "./StatsCards";

type DashboardData = {
  marketStatus: string;
  marketHealth: number;
  fearGreed: number;
  btcDominance: number;
  bitcoinPrice: string;
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    marketStatus: "",
    marketHealth: 0,
    fearGreed: 0,
    btcDominance: 0,
    bitcoinPrice: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-8">

      <StatsCards
        bitcoinPrice={dashboard.bitcoinPrice}
        marketHealth={dashboard.marketHealth}
        fearGreed={dashboard.fearGreed}
      />

      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">

        <h2 className="text-3xl font-bold">
          Market Insight
        </h2>

        <p className="text-gray-400 mt-2">
          Understand what the market is doing in simple language.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-[#1F2937] rounded-xl p-6">

            <h3 className="text-xl font-semibold">
              Current Market
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">Trend</span>
                <span className="font-semibold text-green-400">
                  {dashboard.marketStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Market Health</span>
                <span>{dashboard.marketHealth}/100</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Fear & Greed</span>
                <span>{dashboard.fearGreed}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">BTC Dominance</span>
                <span>{dashboard.btcDominance}%</span>
              </div>

            </div>

          </div>

          <div className="bg-[#1F2937] rounded-xl p-6">

            <h3 className="text-xl font-semibold">
              Market Explained
            </h3>

            <div className="space-y-5 mt-5 text-gray-300 leading-7">

              <div>
                <strong className="text-white">
                  What is happening?
                </strong>

                <p>
                  The overall market is currently{" "}
                  {dashboard.marketStatus.toLowerCase()}.
                </p>
              </div>

              <div>
                <strong className="text-white">
                  What does this mean?
                </strong>

                <p>
                  Buyers are currently controlling the market more than sellers.
                </p>
              </div>

              <div>
                <strong className="text-white">
                  What should you watch?
                </strong>

                <p>
                  Monitor important support and resistance levels before expecting the next major move.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}