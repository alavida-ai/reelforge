import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/section-label";
import { ThinProgress } from "@/components/thin-progress";
import type { Broker } from "@/data/types";

interface DataDepthCardProps {
  depth: Broker["dataDepth"];
}

function DepthRow({
  label,
  count,
  percent,
  color,
}: {
  label: string;
  count: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[10px]" style={{ color }}>
          {count}
        </span>
      </div>
      <ThinProgress percent={percent} color={color} />
    </div>
  );
}

export function DataDepthCard({ depth }: DataDepthCardProps) {
  const green = "var(--color-green)";
  const orange = "var(--color-orange)";

  return (
    <Card>
      <CardContent className="p-5">
        <SectionLabel>Data Depth</SectionLabel>
        <div className="flex flex-col gap-2">
          <DepthRow
            label="Market"
            count={depth.market.count}
            percent={depth.market.percent}
            color={green}
          />
          <DepthRow
            label="Cross-industry"
            count={depth.crossIndustry.count}
            percent={depth.crossIndustry.percent}
            color={green}
          />
          <DepthRow
            label="Broker-specific"
            count={depth.brokerSpecific.count}
            percent={depth.brokerSpecific.percent}
            color={orange}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          At 100+ hooks → shifts to broker-optimized predictions
        </p>
      </CardContent>
    </Card>
  );
}
