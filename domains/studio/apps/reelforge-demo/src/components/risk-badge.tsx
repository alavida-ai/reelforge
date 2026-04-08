import { cn } from "@/lib";

type RiskLevel = "Low" | "Medium" | "High" | "Blocked";

interface RiskBadgeProps {
  level: RiskLevel;
}

const levelStyles: Record<RiskLevel, string> = {
  Low: "bg-[var(--color-green-subtle)] text-[var(--color-green)]",
  Medium: "bg-[color:oklch(0.7_0.15_70/0.12)] text-[var(--color-orange)]",
  High: "bg-[color:oklch(0.7_0.2_25/0.12)] text-[var(--color-red)]",
  Blocked: "bg-[color:oklch(0.7_0.2_25/0.12)] text-[var(--color-red)]",
};

const levelLabels: Record<RiskLevel, string> = {
  Low: "Risk: Low",
  Medium: "Risk: Medium",
  High: "Risk: High",
  Blocked: "Blocked",
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "text-[9px] font-semibold px-2 py-0.5 rounded inline-block",
        levelStyles[level],
      )}
    >
      {levelLabels[level]}
    </span>
  );
}
