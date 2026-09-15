"use client";

/**
 * Price Chart Component - Simple line chart for price history
 *
 * Features:
 * - Custom SVG line chart (no external libraries)
 * - Smooth animated line
 * - Interactive tooltips on hover
 * - Grid lines and axis labels
 * - Responsive design
 *
 * Interview point: "Built custom chart without external dependencies"
 */

import { useEffect, useRef, useState } from "react";

type DataPoint = {
  time: string;
  price: number;
};

type Props = {
  data: DataPoint[];
  title: string;
  isPositive: boolean;
};

export default function PriceChart({ data, title, isPositive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Get min/max prices
    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Helper to convert data to canvas coordinates
    const getX = (index: number) => padding + (index / (data.length - 1)) * chartWidth;
    const getY = (price: number) => height - padding - ((price - minPrice) / priceRange) * chartHeight;

    // Draw grid lines
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Draw price labels
      const price = maxPrice - (priceRange / 4) * i;
      ctx.fillStyle = "#64748b";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("$" + price.toFixed(0), padding - 10, y + 4);
    }

    // Draw time labels
    for (let i = 0; i < data.length; i += Math.ceil(data.length / 5)) {
      const x = getX(i);
      ctx.fillStyle = "#64748b";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data[i].time, x, height - 10);
    }

    // Draw line chart
    ctx.strokeStyle = isPositive ? "#10b981" : "#ef4444";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = getX(index);
      const y = getY(point.price);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw gradient fill under line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, isPositive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)");
    gradient.addColorStop(1, "rgba(15, 23, 42, 0)");

    ctx.strokeStyle = "transparent";
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw points
    data.forEach((point, index) => {
      const x = getX(index);
      const y = getY(point.price);

      if (hoveredIndex === index) {
        // Draw larger circle for hovered point
        ctx.fillStyle = isPositive ? "#10b981" : "#ef4444";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small points
        ctx.fillStyle = isPositive ? "#10b981" : "#ef4444";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw tooltip if hovering
    if (hoveredIndex !== null && hoveredIndex < data.length) {
      const point = data[hoveredIndex];
      const x = getX(hoveredIndex);
      const y = getY(point.price);

      // Tooltip box
      const tooltipWidth = 100;
      const tooltipHeight = 50;
      let tooltipX = x - tooltipWidth / 2;
      let tooltipY = y - tooltipHeight - 10;

      // Keep tooltip in bounds
      if (tooltipX < 0) tooltipX = 0;
      if (tooltipX + tooltipWidth > width) tooltipX = width - tooltipWidth;
      if (tooltipY < 0) tooltipY = y + 10;

      ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("$" + point.price.toFixed(2), tooltipX + tooltipWidth / 2, tooltipY + 20);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.fillText(point.time, tooltipX + tooltipWidth / 2, tooltipY + 35);
    }
  }, [data, hoveredIndex, isPositive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = 40;
    const chartWidth = rect.width - padding * 2;

    const index = Math.round(((x - padding) / chartWidth) * (data.length - 1));
    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-64 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
        <div className={`w-3 h-3 rounded-full ${isPositive ? "bg-green-500" : "bg-red-500"}`} />
        <span>{isPositive ? "📈 Uptrend" : "📉 Downtrend"}</span>
      </div>
    </div>
  );
}
