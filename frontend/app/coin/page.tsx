"use client";

import { BrainCircuit, CandlestickChart, Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { marketApi } from "../lib/api";
import type { CoinAnalysis } from "../types/market";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import LoadingCard from "../components/ui/LoadingCard";
import StatusMessage from "../components/ui/StatusMessage";

/**
 * Coin Analysis Page - search and analyze any coin.
 * 
 * Features:
 * - Search any Binance USDT pair
 * - Shows live market data (price, change, volume, etc.)
 * - Optional AI analysis on demand
 * 
 * State management:
 * - symbol: what user types in input
 * - selectedSymbol: what was actually searched
 * - coin: the fetched data
 * - loading/aiLoading: loading states
 * - error: error messages
 * 
 * In interviews: "We use multiple useState hooks for different concerns.
 * This keeps state updates predictable and easy to debug."
 */
const quickSymbols = ["BTC", "ETH", "SOL", "BNB", "XRP"];

function formatNumber(value: string) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function CoinPage() {
  const [symbol, setSymbol] = useState("BTC");
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [coin, setCoin] = useState<CoinAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  // Load initial coin (BTC) on mount
  useEffect(() => {
    marketApi
      .getCoin("BTC")
      .then(setCoin)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  // Load coin data (without AI)
  async function loadCoin(nextSymbol = symbol) {
    const cleanSymbol = nextSymbol.trim().replace("USDT", "").toUpperCase();

    if (!cleanSymbol) {
      setError("Enter a coin symbol such as BTC or ETH.");
      return;
    }

    setSymbol(cleanSymbol);
    setSelectedSymbol(cleanSymbol);
    setLoading(true);
    setError("");

    try {
      const response = await marketApi.getCoin(cleanSymbol);
      setCoin(response);
    } catch (requestError) {
      setCoin(null);
      setError(requestError instanceof Error ? requestError.message : "Unable to load this coin.");
    } finally {
      setLoading(false);
    }
  }

  // Load coin data WITH AI analysis
  async function analyzeWithAI() {
    if (!coin) return;

    setAiLoading(true);
    setError("");

    try {
      const response = await marketApi.analyzeCoin(selectedSymbol);
      setCoin(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to generate analysis.");
    } finally {
      setAiLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    loadCoin();
  }

  const change = Number(coin?.change24h ?? 0);
  const isPositive = change >= 0;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-blue-400">
          <CandlestickChart size={17} /> COIN ANALYSIS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Make sense of a market in minutes.
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Search any Binance USDT ticker for live technical context and an optional AI explanation.
        </p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="coin-symbol">Coin symbol</label>
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              id="coin-symbol"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value.toUpperCase())}
              placeholder="BTC"
              className="w-full rounded-xl border border-slate-700 bg-[#0b1525] py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>
          <button disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700">
            {loading ? "Loading..." : "Analyze coin"}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickSymbols.map((item) => (
            <button
              key={item}
              onClick={() => loadCoin(item)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                selectedSymbol === item ? "bg-blue-500/20 text-blue-300" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {error && <div className="mt-5"><StatusMessage variant="error">{error}</StatusMessage></div>}

      {loading && (
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <LoadingCard className="h-32" />
          <LoadingCard className="h-32" />
          <LoadingCard className="h-32" />
        </section>
      )}

      {coin && !loading && (
        <CoinDetails coin={coin} change={change} isPositive={isPositive} aiLoading={aiLoading} onAnalyze={analyzeWithAI} />
      )}
    </main>
  );
}

type CoinDetailsProps = {
  coin: CoinAnalysis;
  change: number;
  isPositive: boolean;
  aiLoading: boolean;
  onAnalyze: () => void;
};

function CoinDetails({ coin, change, isPositive, aiLoading, onAnalyze }: CoinDetailsProps) {
  const trendTone = coin.trend.includes("Bull") ? "positive" : coin.trend.includes("Bear") ? "negative" : "neutral";
  const technicalData = [
    ["24h high", `$${formatNumber(coin.highPrice)}`],
    ["24h low", `$${formatNumber(coin.lowPrice)}`],
    ["24h volume", formatNumber(coin.volume)],
    ["Support", `$${formatNumber(coin.support)}`],
    ["Resistance", `$${formatNumber(coin.resistance)}`],
    ["Buyer strength", coin.buyerStrength],
    ["Seller strength", coin.sellerStrength],
  ];

  return (
    <>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric label="Current price" value={<AnimatedNumber value={Number(coin.currentPrice)} decimals={2} prefix="$" className="tabular-nums" />} />
        <Metric label="24h change" value={`${isPositive ? "+" : ""}${change.toFixed(2)}%`} tone={isPositive ? "positive" : "negative"} />
        <Metric label="Market trend" value={coin.trend} tone={trendTone} />
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-bold text-white">Technical snapshot</h2>
          <dl className="mt-5 divide-y divide-slate-800">
            {technicalData.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <dt className="text-slate-400">{label}</dt>
                <dd className="text-right font-semibold text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-violet-300">
                <BrainCircuit size={17} /> AI MARKET SUMMARY
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Read the setup in plain language</h2>
            </div>
            <button
              onClick={onAnalyze}
              disabled={aiLoading}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:bg-slate-700"
            >
              {aiLoading ? "Generating..." : coin.aiSummary ? "Refresh analysis" : "Analyze with AI"}
            </button>
          </div>
          <div className="mt-5 min-h-52 whitespace-pre-wrap rounded-xl border border-slate-800 bg-[#0b1525] p-5 text-sm leading-7 text-slate-300">
            {coin.aiSummary || "Generate an AI explanation to connect the trend, price movement, key levels, and risk factors."}
          </div>
        </article>
      </section>
    </>
  );
}

function Metric({ label, value, tone = "neutral" }: { label: string; value: React.ReactNode; tone?: "positive" | "negative" | "neutral" }) {
  const color = tone === "positive" ? "text-emerald-400" : tone === "negative" ? "text-red-400" : "text-white";
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 truncate text-2xl font-bold ${color}`}>{value}</p>
    </article>
  );
}