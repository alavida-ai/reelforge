import { cn } from "@/lib";
import type { LucideIcon } from "lucide-react";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  unit?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "flat";
  trendColor?: "green" | "blue" | "muted";
  icon?: LucideIcon;
  highlight?: boolean;
  sparklinePath?: string;
}

const trendColorMap = {
  green: "text-[var(--color-green)]",
  blue: "text-[var(--color-market)]",
  muted: "text-muted-foreground",
};

export function KpiBadge({
  value,
  label,
  unit,
  trend,
  trendDirection = "flat",
  trendColor = "muted",
  icon: Icon,
  highlight,
  sparklinePath,
}: KpiBadgeProps) {
  const TrendIcon = trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "—";

  return (
    <div className={cn(
      "bg-background border border-border rounded-lg p-4 relative overflow-hidden group",
      highlight && "ring-1 ring-inset ring-white/5 bg-gradient-to-b from-background to-accent/30"
    )}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-mono text-foreground font-semibold">{value}</span>
        {unit && <span className="font-mono text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className={cn("flex items-center font-mono", trendColorMap[trendColor])}>
            {TrendIcon}{trend}
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
      {sparklinePath && (
        <svg
          className={cn(
            "absolute bottom-0 right-0 w-24 h-12 opacity-30 group-hover:opacity-60 transition-opacity",
            trendColorMap[trendColor]
          )}
          viewBox="0 0 100 40"
          fill="none"
        >
          <path d={sparklinePath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
