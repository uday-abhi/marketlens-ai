"use client";

/**
 * Tooltip Component
 *
 * Features:
 * - Reusable tooltip for hover information
 * - Auto-positioning (top/bottom/left/right)
 * - Smooth fade-in animation
 * - Works with any child element
 *
 * Usage: <Tooltip text="Help text"><button>Hover me</button></Tooltip>
 */

import { useState, useRef, ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({ text, children, position = "top" }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} z-50 whitespace-nowrap bg-slate-900 text-slate-100 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 shadow-lg animate-fade-in-up`}
        >
          {text}
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-slate-900 border border-slate-700 ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
                : position === "bottom"
                  ? "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45"
                  : position === "left"
                    ? "left-full top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45"
                    : "right-full top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45"
            }`}
          />
        </div>
      )}
    </div>
  );
}
