"use client";

import type { ReactNode } from "react";

/**
 * Simple wrapper component - no animations for simplicity.
 * In interviews, you can explain: "We use a simple wrapper 
 * for consistent styling. Animations can be added with CSS or libraries like Framer Motion."
 */
type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}