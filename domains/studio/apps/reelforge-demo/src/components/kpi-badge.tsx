import { cn } from "@/lib";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  highlight?: boolean;
  className?: string;
}

export function KpiBadge({ value, label, highlight, className }: KpiBadgeProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className={cn(
        "font-mono text-2xl font-bold tracking-tight",
        highlight ? "text-[var(--color-green)]" : "text-foreground"
      )}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
