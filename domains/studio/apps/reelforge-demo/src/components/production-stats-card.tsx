import { SectionLabel } from "@/components/section-label";
import type { Broker } from "@/data/types";

interface ProductionStatsCardProps {
  sla: Broker["productionSla"];
}

function StatRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono font-semibold ${valueClassName ?? ""}`}>
        {value}
      </span>
    </div>
  );
}

export function ProductionStatsCard({ sla }: ProductionStatsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <SectionLabel>Production</SectionLabel>
      <div className="flex flex-col gap-1.5">
        <StatRow label="Hooks" value={sla.hooksDelivered} />
        <StatRow
          label="Return Rate"
          value={sla.returnRate}
          valueClassName="text-[var(--color-green)]"
        />
        <StatRow label="Turnaround" value={sla.turnaround} />
        <StatRow label="Cost / Hook" value={sla.costPerHook} />
      </div>
    </div>
  );
}
