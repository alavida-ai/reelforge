import { cn } from "@/lib";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
}

const valueSizeMap = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
} as const;

export function KpiBadge({
  value,
  label,
  highlight = false,
  size = "md",
}: KpiBadgeProps) {
  return (
    <div className="flex flex-col items-start">
      <span
        className={cn(
          "font-mono font-bold leading-tight",
          valueSizeMap[size],
          highlight ? "text-green" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-muted-foreground leading-tight mt-0.5">
        {label}
      </span>
    </div>
  );
}
