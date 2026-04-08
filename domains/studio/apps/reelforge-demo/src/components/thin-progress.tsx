import { cn } from "@/lib";

interface ThinProgressProps {
  percent: number;
  color?: string;
  className?: string;
}

export function ThinProgress({
  percent,
  color = "var(--color-green)",
  className,
}: ThinProgressProps) {
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={cn("h-1 rounded-full bg-border overflow-hidden", className)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${clampedPercent}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
