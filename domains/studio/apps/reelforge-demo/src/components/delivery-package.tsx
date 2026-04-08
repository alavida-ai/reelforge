import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/section-label";
import type { Broker } from "@/data/types";

interface DeliveryPackageProps {
  broker: Broker;
}

const ITEMS = [
  { emoji: "\uD83C\uDFAC", name: "Hook Video", subtitle: "MP4 \u00B7 9:16 \u00B7 3s" },
  {
    emoji: "\uD83D\uDCCA",
    name: "Performance Brief",
    subtitle: "Why this hook \u00B7 metrics \u00B7 brand match",
  },
  {
    emoji: "\uD83D\uDDBC\uFE0F",
    name: "Selected Assets",
    subtitle: "Hero shots used",
  },
];

export function DeliveryPackage({ broker }: DeliveryPackageProps) {
  return (
    <Card>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <SectionLabel className="text-[var(--color-green)] mb-0">
            Delivery Package
          </SectionLabel>
          <span className="text-[9px] text-muted-foreground">
            What the broker receives
          </span>
        </div>

        <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
          Ready-to-publish package exported for {broker.name} with brand
          overlays, performance metrics, and selected property assets.
        </p>

        {/* 3 items */}
        <div className="grid grid-cols-3 gap-2">
          {ITEMS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-border p-3 text-center hover:bg-accent transition-colors"
            >
              <span className="text-lg block mb-1">{item.emoji}</span>
              <span className="text-[11px] font-semibold text-foreground block">
                {item.name}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
