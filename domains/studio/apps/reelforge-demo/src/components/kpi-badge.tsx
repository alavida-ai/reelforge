import { cn } from "@/lib";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function KpiBadge({
  value,
  label,
  highlight = false,
  size = "md",
  className,
}: KpiBadgeProps) {
  return (
    <div
      className={cn(
        "metric-tile flex flex-col",
        highlight && "ring-1 ring-[var(--color-green)]/20",
        className,
      )}
    >
      <span
        className={cn(
          "font-mono font-extrabold tracking-tight",
          size === "sm" && "text-sm",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl",
          highlight ? "text-[var(--color-green)]" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
}
