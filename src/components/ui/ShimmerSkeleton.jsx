export default function ShimmerSkeleton({ className = 'h-20' }) {
  return <div className={`relative overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700 ${className}`}><div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-slate-500/40" /></div>;
}
