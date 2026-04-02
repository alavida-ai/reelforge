import { SectionLabel } from "@/components/section-label";
import type { Broker } from "@/data/types";

interface VisualIdentityCardProps {
  broker: Broker;
}

export function VisualIdentityCard({ broker }: VisualIdentityCardProps) {
  const colorSwatches = [
    broker.colors.primary,
    broker.colors.secondary,
    broker.colors.accent,
    broker.colors.background,
  ];

  return (
    <div className="card-elevated rounded-xl p-5">
      <SectionLabel>Visual Identity</SectionLabel>

      {/* Logo + name */}
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[15px] font-bold text-white"
          style={{ backgroundColor: broker.colors.primary }}
        >
          {broker.logoLetter}
        </div>
        <div>
          <div className="font-bold text-sm">{broker.name}</div>
          <div className="text-[10px] text-muted-foreground">
            {broker.websiteUrl}
          </div>
        </div>
      </div>

      {/* Color swatches */}
      <div className="flex gap-1.5 mb-2">
        {colorSwatches.map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded"
            style={{
              backgroundColor: color,
              border:
                color === "#FFFFFF" || color === "#ffffff"
                  ? "1px solid var(--border)"
                  : undefined,
            }}
          />
        ))}
      </div>

      {/* Font names */}
      <div className="text-[11px] text-muted-foreground">{broker.fonts}</div>
    </div>
  );
}
