import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/section-label";
import type { Broker } from "@/data/types";

interface SlaCardProps {
  sla: Broker["productionSla"];
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

export function SlaCard({ sla }: SlaCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <SectionLabel>Production SLA</SectionLabel>
        <div className="flex flex-col gap-1.5">
          <StatRow label="Return Rate">
            <span className="font-mono font-semibold text-[var(--color-green)]">
              {sla.returnRate}
            </span>{" "}
            <span className="text-[9px] text-[var(--color-green)]">
              {sla.returnRateTrend}
            </span>
          </StatRow>
          <StatRow label="Turnaround">
            <span className="font-mono font-semibold">{sla.turnaround}</span>
          </StatRow>
          <StatRow label="Cost / Hook">
            <span className="font-mono font-semibold">{sla.costPerHook}</span>
          </StatRow>
          <StatRow label="Hooks Delivered">
            <span className="font-mono font-semibold">{sla.hooksDelivered}</span>
          </StatRow>
        </div>
        <div className="text-[10px] text-muted-foreground mt-2 pt-1.5 border-t border-border">
          Return rate improving — {sla.hooksDelivered > 0 ? "2" : "0"} rejections
          in {sla.hooksDelivered} hooks, both fed back into guardrails.
        </div>
      </CardContent>
    </Card>
  );
}
