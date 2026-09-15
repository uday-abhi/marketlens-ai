"use client";

/**
 * Simple number display - no animation for simplicity.
 * In interviews: "We display numbers directly. 
 * Animations can be added with Framer Motion's animate() if needed."
 */
type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  return (
    <span className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}