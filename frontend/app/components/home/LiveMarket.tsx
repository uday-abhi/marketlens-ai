"use client";

import { useEffect, useState } from "react";

type MarketData = {
  btcPrice: number;
  btcChange: number;
  fearGreed: number;
  fearGreedLabel: string;
  btcDominance: number;
  marketTrend: string;
};

export default function LiveMarket() {
  const [market, setMarket] = useState<MarketData | null>(null);

  useEffect(() => {
    loadMarket();
  }, []);

  async function loadMarket() {
    try {
      const res = await fetch(
        "http://localhost:8080/api/dashboard/overview"
      );

      const data = await res.json();

      setMarket(data);

    } catch (error) {
      console.log(error);
    }
  }

  if (!market) {
    return (
      <div className="text-white text-xl">
        Loading Market...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5">

      <MarketCard
        title="Bitcoin"
        value={`$${market.btcPrice.toLocaleString()}`}
        extra={`${market.btcChange}%`}
      />

      <MarketCard
        title="Fear & Greed"
        value={market.fearGreed.toString()}
        extra={market.fearGreedLabel}
      />

      <MarketCard
        title="BTC Dominance"
        value={`${market.btcDominance.toFixed(2)}%`}
      />

      <MarketCard
        title="Market Trend"
        value={market.marketTrend}
      />

    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  extra?: string;
};

function MarketCard({
  title,
  value,
  extra,
}: CardProps) {

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition">

      <p className="text-gray-400 text-sm">

        {title}

      </p>

      <h2
  className={`text-3xl font-bold mt-3 ${
    value === "Bearish"
      ? "text-red-400"
      : value === "Bullish"
      ? "text-green-400"
      : "text-white"
  }`}
>
  {value}
</h2>

      {extra && (
  <p
    className={`mt-3 font-semibold ${
      extra.includes("-") ? "text-red-400" : "text-green-400"
    }`}
  >
    {extra}
  </p>
)}

    </div>

  );

}