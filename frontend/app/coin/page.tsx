"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the widget with SSR disabled to prevent development build freezes
const AdvancedRealTimeChart = dynamic(
  () => import("react-ts-tradingview-widgets").then((mod) => mod.AdvancedRealTimeChart),
  { ssr: false }
);

type CoinResponse = {
  symbol: string;
  currentPrice: string;
  change24h: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
  trend: string;
  support: string;
  resistance: string;
  buyerStrength: string;
  sellerStrength: string;
  aiSummary: string;
};

export default function CoinPage() {
  const [symbol, setSymbol] = useState("BTC");
  const [coin, setCoin] = useState<CoinResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const activeSymbolRef = useRef("BTC");

  // Xử lý gọi phân tích dữ liệu từ API
  const analyzeCoin = useCallback(async (coinSymbol?: string) => {
    const search = (coinSymbol || symbol).trim().toUpperCase();

    if (coinSymbol) {
      setSymbol(coinSymbol);
    }
    
    activeSymbolRef.current = search;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/coin/${search}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch coin analysis");
      }

      const data = await res.json();
      
      // Chống race condition
      if (activeSymbolRef.current === search) {
        setCoin({ ...data, aiSummary: "" });
      }
    } catch (e) {
      console.error(e);
      alert(`Unable to fetch coin: ${search}`);
    } finally {
      if (activeSymbolRef.current === search) {
        setLoading(false);
      }
    }
  }, [symbol]);

  const analyzeWithAI = async () => {
    if (!coin) return;

    setAiLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/coin/${coin.symbol.replace("USDT", "")}/analyze`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("AI analysis failed");
      }

      const data = await res.json();
      
      setCoin((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          aiSummary: data.aiSummary,
        };
      });
    } catch (e) {
      console.error(e);
      alert("Unable to generate AI analysis.");
    } finally {
      setAiLoading(false);
    }
  };

  // FIX 1: Run only once when the page loads so typing doesn't reset input to BTC
  useEffect(() => {
    analyzeCoin("BTC");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white px-10 py-10">
      
      {/* Heading */}
      <h1 className="text-5xl font-extrabold mb-10 tracking-tight">
        Coin Analysis
      </h1>

      {/* Input & Search Button */}
      <div className="flex gap-4 mb-8">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              analyzeCoin();
            }
          }}
          placeholder="Enter Coin Symbol"
          className="bg-slate-800 border border-slate-700 rounded-lg px-5 py-3 w-80 outline-none focus:border-blue-500"
        />

        <button
          onClick={() => analyzeCoin()}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-8 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Loading..." : "Analyze"}
        </button>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {["BTC", "ETH", "SOL", "BNB", "XRP"].map((item) => (
          <button
            key={item}
            onClick={() => analyzeCoin(item)}
            className={`px-5 py-2 rounded-lg transition ${
              activeSymbolRef.current === item
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Live Chart Section - react-ts-tradingview-widgets */}
      <div className="bg-slate-800 rounded-xl p-4 mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Live TradingView Chart
        </h2>
        <div className="w-full h-[600px]">
          <AdvancedRealTimeChart
            theme="dark"
            symbol={`BINANCE:${symbol}USDT`}
            autosize
          />
        </div>
      </div>

      {loading && (
        <p className="text-xl mb-8 animate-pulse">
          Loading technical data...
        </p>
      )}

      {/* Data Presentation */}
      {coin && !loading && (
        <>
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-slate-400 mb-2">Current Price</h3>
              <p className="text-3xl font-bold">
                ${Number(coin.currentPrice).toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-slate-400 mb-2">24H Change</h3>
              <p
                className={`text-3xl font-bold ${
                  Number(coin.change24h) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.change24h}%
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-slate-400 mb-2">Trend</h3>
              <p
                className={`text-3xl font-bold ${
                  (coin.trend ?? "").includes("Bull")
                    ? "text-green-400"
                    : (coin.trend ?? "").includes("Bear")
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {coin.trend ?? "Unknown"}
              </p>
            </div>
          </div>

          <div className="grid xl:grid-cols-2 gap-8 mb-10">
            {/* Technical Metrics Summary */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Technical Metrics</h2>
              <div className="space-y-4">
                <p><strong>Symbol:</strong> {coin.symbol}</p>
                <p>
                  <strong>24H High / Low:</strong> ${Number(coin.highPrice).toLocaleString()} / ${Number(coin.lowPrice).toLocaleString()}
                </p>
                <p><strong>Volume:</strong> {Number(coin.volume).toLocaleString()}</p>
                <p><strong>Support Level:</strong> ${Number(coin.support).toLocaleString()}</p>
                <p><strong>Resistance Level:</strong> ${Number(coin.resistance).toLocaleString()}</p>
                <p><strong>Buyer Strength:</strong> {coin.buyerStrength}</p>
                <p><strong>Seller Strength:</strong> {coin.sellerStrength}</p>
              </div>
            </div>

            {/* AI Report Summary */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">AI Market Summary</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className={coin?.trend?.includes("Bull") ? "text-green-400" : "text-red-400"}>●</span>
                  <span className="font-semibold">Trend</span>
                  <span className={`ml-auto font-bold ${coin?.trend?.includes("Bull") ? "text-green-400" : "text-red-400"}`}>
                    {coin.trend}
                  </span>
                </div>

                <div className="border-t border-slate-700"></div>

                <button
                  onClick={analyzeWithAI}
                  disabled={aiLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-5 py-2 rounded-lg font-semibold mb-6"
                >
                  {aiLoading ? "Generating..." : "Analyze with AI"}
                </button>

                <div className="whitespace-pre-line leading-8 text-gray-300">
                  {coin.aiSummary || "Click 'Analyze with AI' to generate a detailed AI explanation."}
                </div>

                <div className="border-t border-slate-700 pt-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-slate-400">Buyer Strength</p>
                      <p className={`font-bold ${coin?.buyerStrength?.includes("Strong") ? "text-green-400" : "text-yellow-400"}`}>
                        {coin.buyerStrength}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Seller Strength</p>
                      <p className={`font-bold ${coin?.sellerStrength?.includes("Strong") ? "text-red-400" : "text-green-400"}`}>
                        {coin.sellerStrength}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </main>
  );
}