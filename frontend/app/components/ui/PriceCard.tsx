"use client";

/**
 * Animated Price Card - displays price with smooth animations.
 *
 * Features:
 * - Large animated number display
 * - Up/down arrow with color (green/red)
 * - Percentage change
 * - Pulse animation on load
 * - Interview point: "Animates price changes to draw user attention"
 */

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  price: number;
  change: number;
  label: string;
};

export default function PriceCard({ price, change, label }: Props) {
  const [displayPrice, setDisplayPrice] = useState(price);
  const isPositive = change >= 0;

  // Animate price from old to new value
  useEffect(() => {
    let current = displayPrice;
    const target = price;
    const diff = target - current;
    const steps = 20;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = displayPrice + (diff / steps) * step;
      setDisplayPrice(current);
      if (step >= steps) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [price, displayPrice]);

  const arrowColor = isPositive ? "text-green-400" : "text-red-400";
  const bgColor = isPositive
    ? "bg-green-400/10 border-green-400/20"
    : "bg-red-400/10 border-red-400/20";

  return (
    <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            {label}
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <h2 className="text-4xl font-bold text-white">
              ${displayPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h2>
            <span
              className={`text-lg font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div
          className={`rounded-xl border p-3 ${bgColor} ${arrowColor} animate-pulse`}
        >
          {isPositive ? (
            <ArrowUp size={32} />
          ) : (
            <ArrowDown size={32} />
          )}
        </div>
      </div>
    </div>
  );
}
