import { SectionLabel } from "@/components/section-label";
import type { RevealData } from "@/data/types";

interface SplitKpiPanelProps {
  data: RevealData;
}

function trendColor(trend: string) {
  if (trend === "\u2193") return "text-[var(--color-green)]";
  if (trend === "\u2191") return "text-[var(--color-red)]";
  return "text-muted-foreground";
}

export function SplitKpiPanel({ data }: SplitKpiPanelProps) {
  const pq = data.productionQuality;
  const ep = data.expectedPerformance;

  return (
    <div className="card-hero rounded-xl p-5">
      <div className="grid grid-cols-[1fr_1px_1fr] gap-5">
        {/* LEFT -- Production Quality (DOMINANT) */}
        <div>
          <SectionLabel>Production Quality</SectionLabel>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {/* Return Rate -- LEAD metric */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-lg bg-[var(--color-green)]/5 pointer-events-none" />
              <div className="relative flex items-baseline gap-1">
                <span className="text-[24px] font-extrabold text-[var(--color-green)] font-mono leading-none">
                  {pq.returnRate}
                </span>
                <span className={`text-[12px] font-semibold ${trendColor(pq.returnRateTrend)}`}>
                  {pq.returnRateTrend}
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1 block">
                Return Rate
              </span>
            </div>
            {/* Turnaround */}
            <div>
              <span className="text-[18px] font-bold text-foreground font-mono leading-none block">
                {pq.turnaround}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1 block">
                Turnaround
              </span>
            </div>
            {/* Production Cost */}
            <div>
              <span className="text-[18px] font-bold text-foreground font-mono leading-none block">
                {pq.cost}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1 block">
                Production Cost
              </span>
            </div>
            {/* Guardrail Violations */}
            <div>
              <span className="text-[18px] font-bold text-foreground font-mono leading-none block">
                {pq.guardrailViolations}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1 block">
                Guardrail Violations
              </span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="bg-border" />

        {/* RIGHT -- Expected Performance (MUTED, smaller) */}
        <div className="opacity-80">
          <div className="flex items-center gap-2 mb-2.5">
            <SectionLabel className="mb-0">Expected Performance</SectionLabel>
            <span className="text-[8px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
              Based on market benchmarks
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div>
              <span className="text-[14px] text-muted-foreground font-mono leading-none block">
                {ep.views}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1 block">
                Expected Views
              </span>
            </div>
            <div>
              <span className="text-[14px] text-muted-foreground font-mono leading-none block">
                {ep.retention}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1 block">
                3s Retention Lift
              </span>
            </div>
            <div>
              <span className="text-[14px] text-muted-foreground font-mono leading-none block">
                {ep.brandRecall}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1 block">
                Brand Recall
              </span>
            </div>
            <div>
              <span className="text-[14px] text-muted-foreground font-mono leading-none block">
                {ep.dataPoints}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1 block">
                Data Points
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
