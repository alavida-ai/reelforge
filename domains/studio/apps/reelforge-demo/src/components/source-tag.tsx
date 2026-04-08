import { cn } from "@/lib";

type SourceType = "MARKET" | "BROKER" | "GUARDRAIL";

const tagStyles: Record<SourceType, string> = {
  MARKET: "bg-[var(--color-market-bg)] text-[var(--color-market)]",
  BROKER: "bg-[var(--color-broker-bg)] text-[var(--color-broker)]",
  GUARDRAIL: "bg-[var(--color-guardrail-bg)] text-[var(--color-guardrail)]",
};

interface SourceTagProps {
  type: SourceType;
}

export function SourceTag({ type }: SourceTagProps) {
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded text-[9px] font-semibold inline-block",
        tagStyles[type],
      )}
    >
      {type}
    </span>
  );
}

interface InsightLineProps {
  insight: {
    source: SourceType;
    text: string;
  };
}

export function InsightLine({ insight }: InsightLineProps) {
  return (
    <div className="flex items-center gap-1">
      <SourceTag type={insight.source} />
      <span className="text-[10px] text-muted-foreground">{insight.text}</span>
    </div>
  );
}

export function SourceTagLegend() {
  return (
    <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
      <span className="text-muted-foreground/70">Source tags:</span>
      <span className="flex items-center gap-1">
        <SourceTag type="MARKET" />
        <span>2,400+ posts dataset</span>
      </span>
      <span className="flex items-center gap-1">
        <SourceTag type="BROKER" />
        <span>Broker history</span>
      </span>
      <span className="flex items-center gap-1">
        <SourceTag type="GUARDRAIL" />
        <span>From rejection log</span>
      </span>
    </div>
  );
}
