import { Card, CardContent } from "@/components/ui/card";
import type { Broker } from "@/data/types";

interface VisualIdentityCardProps {
  broker: Broker;
}

export function VisualIdentityCard({ broker }: VisualIdentityCardProps) {
  const colorSwatches = [
    { color: broker.colors.primary, label: "Primary" },
    { color: broker.colors.secondary, label: "Secondary" },
    { color: broker.colors.accent, label: "Accent" },
    { color: broker.colors.background, label: "Background" },
  ];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          {/* Logo + name + website */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <div>
              <h2 className="font-semibold text-base">{broker.name}</h2>
              <p className="text-xs text-muted-foreground">
                {broker.websiteUrl}
              </p>
            </div>
          </div>

          {/* Color palette swatches */}
          <div className="flex items-center gap-2">
            {colorSwatches.map(({ color, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-md"
                  style={{
                    backgroundColor: color,
                    border:
                      color === "#FFFFFF" || color === "#ffffff"
                        ? "1px solid var(--border)"
                        : undefined,
                  }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Fonts */}
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
              Fonts
            </div>
            <div className="text-sm font-medium">{broker.fonts}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
