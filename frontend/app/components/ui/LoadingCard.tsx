export default function LoadingCard({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70 ${className}`} />;
}
