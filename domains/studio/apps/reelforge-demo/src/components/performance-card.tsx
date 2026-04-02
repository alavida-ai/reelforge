import { SectionLabel } from "@/components/section-label";
import type { Broker } from "@/data/types";

interface PerformanceCardProps {
  perf: Broker["contentPerformance"];
}

function StatRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <div>{children}</div>
    </div>
  );
}

export function PerformanceCard({ perf }: PerformanceCardProps) {
  return (
    <div className="card-elevated rounded-xl p-5">
      <SectionLabel>Content Performance</SectionLabel>
      <div className="flex flex-col gap-1.5">
        <StatRow label="Avg Views">
          <span className="font-mono font-semibold">{perf.avgViews}</span>{" "}
          <span className="text-[9px] text-[var(--color-green)]">
            {perf.avgViewsTrend}
          </span>
        </StatRow>
        <StatRow label="Top Hook">
          <span className="font-medium">{perf.topHook}</span>
        </StatRow>
        <StatRow label="vs Standard">
          <span className="font-mono font-semibold text-[var(--color-green)]">
            {perf.vsStandard}
          </span>
        </StatRow>
      </div>
      <div className="text-[10px] text-muted-foreground mt-2 pt-1.5 border-t border-border">
        Downstream data BR has never tracked. Sits here quietly.
      </div>
    </div>
  );
}
