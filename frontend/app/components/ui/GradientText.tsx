"use client";

/**
 * Gradient Text Component - text with animated gradient background.
 *
 * Features:
 * - Animated gradient shift
 * - Premium feel
 * - Reusable for headers/titles
 */

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GradientText({ children, className = "" }: Props) {
  return (
    <div
      className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse ${className}`}
    >
      {children}
    </div>
  );
}
