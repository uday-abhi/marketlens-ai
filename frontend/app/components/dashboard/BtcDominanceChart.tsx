"use client";

/**
 * Simple BTC Dominance display - no chart library.
 * In interviews: "We show the percentage directly with a simple bar.
 * A pie chart can be added with recharts if needed."
 */
type Props = {
  dominance: number;
};

export default function BtcDominanceChart({ dominance }: Props) {
  const others = Math.max(0, 100 - dominance);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h3 className="text-xl font-bold text-white mb-4">BTC Dominance</h3>

      {/* Simple horizontal bar visualization */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-amber-400 font-semibold">BTC</span>
            <span className="text-white font-bold">{dominance.toFixed(2)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${dominance}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Others</span>
            <span className="text-white font-bold">{others.toFixed(2)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-600 transition-all duration-500"
              style={{ width: `${others}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-4xl font-bold text-amber-400">{dominance.toFixed(2)}%</h2>
        <p className="text-slate-400 mt-2">Bitcoin Market Share</p>
      </div>
    </div>
  );
}