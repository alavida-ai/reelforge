import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  lines?: number;
}

export function Shimmer({ className, lines = 3 }: ShimmerProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="shimmer h-4 rounded-md bg-muted"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={cn("shimmer rounded-xl bg-muted", className)} />
  );
}
