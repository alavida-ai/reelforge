import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RiskBadge } from "@/components/risk-badge";
import { InsightLine } from "@/components/source-tag";
import type { Adjustment } from "@/data/types";

interface AdjustmentCardProps {
  adj: Adjustment;
}

export function AdjustmentCard({ adj }: AdjustmentCardProps) {
  return (
    <Card>
      {/* Header */}
      <CardContent className="flex items-center justify-between px-4 py-2.5">
        <span className="text-[12px] font-semibold text-foreground">
          {adj.name}
        </span>
        <RiskBadge level={adj.risk} />
      </CardContent>

      {/* Body */}
      <CardContent className="px-4 pb-3 space-y-2.5">
        {/* What changes */}
        <div>
          <span className="text-[10px] font-bold text-foreground block mb-0.5">
            What changes:
          </span>
          <span className="text-[10px] text-muted-foreground leading-relaxed">
            {adj.whatChanges}
          </span>
        </div>

        {/* Hallucination risk */}
        <div>
          <span className="text-[10px] font-bold text-foreground block mb-0.5">
            Hallucination risk:
          </span>
          <span className="text-[10px] text-muted-foreground leading-relaxed">
            {adj.hallucinationRisk}
          </span>
        </div>

        {/* Insights */}
        <div className="space-y-1">
          {adj.insights.map((insight, i) => (
            <InsightLine key={i} insight={insight} />
          ))}
        </div>
      </CardContent>

      {/* Trade-off footer */}
      <CardFooter className="px-4 py-2 flex gap-3">
        <div className="flex items-start gap-1 flex-1">
          <span className="text-[10px] font-bold text-[var(--color-green)] shrink-0">
            +
          </span>
          <span className="text-[10px] text-muted-foreground leading-relaxed">
            {adj.tradeoffs.positive}
          </span>
        </div>
        <div className="flex items-start gap-1 flex-1">
          <span className="text-[10px] font-bold text-[var(--color-orange)] shrink-0">
            &minus;
          </span>
          <span className="text-[10px] text-muted-foreground leading-relaxed">
            {adj.tradeoffs.negative}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
