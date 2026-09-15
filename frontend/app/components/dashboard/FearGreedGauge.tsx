"use client";

/**
 * Simple Fear & Greed display - no external gauge library.
 * In interviews: "We show the value directly. 
 * A gauge chart can be added with libraries like recharts or custom SVG."
 */
type Props = {
  value: number;
  label: string;
};

const getColor = (value: number) => {
  if (value >= 75) return "emerald-400";   // Extreme Greed
  if (value >= 60) return "green-400";     // Greed
  if (value >= 45) return "amber-400";     // Neutral
  if (value >= 30) return "orange-400";    // Fear
  return "red-400";                        // Extreme Fear
};

const colorToHex: Record<string, string> = {
  "emerald-400": "#34d399",
  "green-400": "#4ade80",
  "amber-400": "#fbbf24",
  "orange-400": "#fb923c",
  "red-400": "#f87171",
};

export default function FearGreedGauge({ value, label }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
      <h3 className="text-xl font-bold text-white mb-4">Fear & Greed Index</h3>
      
      <div className="text-5xl font-bold mb-2" style={{ color: colorToHex[getColor(value)] }}>
        {value}
      </div>
      
      <div className="text-lg font-semibold mb-4" style={{ color: colorToHex[getColor(value)] }}>
        {label}
      </div>

      {/* Simple visual bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            width: `${value}%`,
            backgroundColor: colorToHex[getColor(value)]
          }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        0 = Extreme Fear → 100 = Extreme Greed
      </p>
    </div>
  );
}