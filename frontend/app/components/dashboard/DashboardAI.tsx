"use client";

import { BrainCircuit, RefreshCw } from "lucide-react";
import { useState } from "react";
import { marketApi } from "../../lib/api";
import StatusMessage from "../ui/StatusMessage";

/**
 * AI Market Brief - generates AI analysis on demand.
 * 
 * Flow:
 * 1. User clicks "Generate report"
 * 2. generateReport() calls API → sets loading=true
 * 3. On success: sets summary, loading=false
 * 4. On error: sets error, loading=false
 * 
 * In interviews: "We use useState for summary, loading, and error states.
 * The button disables during loading to prevent double-clicks."
 */
export default function DashboardAI() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReport() {
    setLoading(true);
    setError("");
    try {
      const response = await marketApi.analyzeDashboard();
      setSummary(response.aiSummary);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to generate the report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-violet-300">
            <BrainCircuit size={17} /> AI MARKET BRIEF
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">A balanced read on Bitcoin</h2>
          <p className="mt-1 text-sm text-slate-400">
            Uses current market data and always includes risk factors.
          </p>
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Generating..." : summary ? "Refresh report" : "Generate report"}
        </button>
      </div>

      {error && <div className="mt-5"><StatusMessage variant="error">{error}</StatusMessage></div>}

      <div className="mt-6 min-h-24 rounded-xl border border-slate-800 bg-[#0b1525] p-5 text-sm leading-7 text-slate-300 whitespace-pre-wrap">
        {summary || "Generate a report to turn the latest Bitcoin market data into a clear, risk-aware summary."}
      </div>
    </section>
  );
}