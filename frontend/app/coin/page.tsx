export default function CoinPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white px-10 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Coin Analysis
      </h1>

      <div className="flex gap-4 mb-10">

        <input
          type="text"
          placeholder="Enter Coin Symbol (BTC)"
          className="w-80 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
        />

        <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg">
          Analyze
        </button>

      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-800 h-[500px] flex items-center justify-center">

        TradingView Chart

      </div>

    </main>
  );
}