"use client";

/**
 * Professional Fear & Greed Index Gauge Component
 *
 * Features:
 * - Large, clear semicircular gauge with 5 color zones
 * - Smooth needle animation that actually moves
 * - Big bold number display with trend indicator
 * - Zone labels: Extreme Fear, Fear, Neutral, Greed, Extreme Greed
 * - Responsive design, looks professional
 * - Interview point: "Custom SVG gauge showing market sentiment at a glance"
 */

import { useEffect, useState } from "react";

type Props = {
  value: number;
  label: string;
};

export default function AnimatedGauge({ value, label }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate number counter from 0 to target value
  useEffect(() => {
    setDisplayValue(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(value / 20);
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  // Store animated value for CSS animation
  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  // Determine color and sentiment based on value
  const getColorTheme = () => {
    if (value >= 80) return { bg: "from-green-600 to-green-500", text: "#10b981", sentiment: "Extreme Greed", icon: "📈" };
    if (value >= 60) return { bg: "from-green-500 to-yellow-500", text: "#84cc16", sentiment: "Greed", icon: "📊" };
    if (value >= 40) return { bg: "from-yellow-500 to-orange-500", text: "#f59e0b", sentiment: "Neutral", icon: "⚡" };
    if (value >= 20) return { bg: "from-orange-500 to-red-500", text: "#f97316", sentiment: "Fear", icon: "📉" };
    return { bg: "from-red-600 to-red-500", text: "#ef4444", sentiment: "Extreme Fear", icon: "🔴" };
  };

  const theme = getColorTheme();
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center border border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          📊 Market Sentiment
        </h3>
        <p className="text-2xl font-bold text-white mt-1">Fear & Greed Index</p>
      </div>

      {/* Main Gauge SVG */}
      <div className="relative mx-auto mt-6 mb-8 flex justify-center">
        <svg
          viewBox="0 0 240 140"
          className="h-40 w-full max-w-sm drop-shadow-lg"
          style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))" }}
        >
          <defs>
            {/* Gradient for the colored arc */}
            <linearGradient id="fearGreedGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="20%" stopColor="#f97316" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="80%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Glow filter for needle */}
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background gray arc */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            stroke="#334155"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Colored gradient arc (full range) */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            stroke="url(#fearGreedGradient)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />

          {/* Needle (animated) */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "120px 120px",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Needle shadow */}
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="25"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Needle */}
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="20"
              stroke={theme.text}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#needleGlow)"
            />
            {/* Needle head */}
            <circle cx="120" cy="20" r="5" fill={theme.text} filter="url(#needleGlow)" />
          </g>

          {/* Center circle (needle pivot) */}
          <circle cx="120" cy="120" r="8" fill={theme.text} opacity="0.8" />
          <circle cx="120" cy="120" r="5" fill="#0f172a" />

          {/* Zone labels */}
          <text x="30" y="135" fontSize="10" fill="#64748b" fontWeight="600" textAnchor="middle">
            FEAR
          </text>
          <text x="210" y="135" fontSize="10" fill="#64748b" fontWeight="600" textAnchor="middle">
            GREED
          </text>
        </svg>
      </div>

      {/* Value and sentiment display */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="text-6xl font-black" style={{ color: theme.text }}>
          {displayValue}
        </div>
        <div className={`text-xl font-bold bg-gradient-to-r ${theme.bg} bg-clip-text text-transparent`}>
          {theme.sentiment} {theme.icon}
        </div>
      </div>

      {/* Scale explanation */}
      <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-slate-400">
        <div className="flex flex-col items-center">
          <div className="w-6 h-1 rounded-full bg-red-600 mb-2"></div>
          <span>0-20</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-1 rounded-full bg-orange-500 mb-2"></div>
          <span>20-40</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-1 rounded-full bg-yellow-500 mb-2"></div>
          <span>40-60</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-1 rounded-full bg-lime-500 mb-2"></div>
          <span>60-80</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-1 rounded-full bg-green-500 mb-2"></div>
          <span>80-100</span>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          Based on market data • Updates every 5 minutes
        </p>
      </div>
    </div>
  );
}
