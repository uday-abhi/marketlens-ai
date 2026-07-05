export default function ReportPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white px-10 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Market Report
      </h1>

      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">

        <h2 className="text-2xl font-semibold mb-6">
          Today's Market Summary
        </h2>

        <div className="space-y-5 text-slate-300">

          <p>• Overall market trend</p>

          <p>• Market health</p>

          <p>• Fear & Greed</p>

          <p>• Bitcoin dominance</p>

          <p>• What traders should watch today</p>

        </div>

      </div>

    </main>
  );
}