type StatusMessageProps = {
  children: React.ReactNode;
  variant?: "error" | "muted";
};

export default function StatusMessage({ children, variant = "muted" }: StatusMessageProps) {
  const color = variant === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-slate-700 bg-slate-900/70 text-slate-300";

  return <div className={`rounded-xl border px-4 py-3 text-sm ${color}`}>{children}</div>;
}
