import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Broker } from "@/data/types";

interface VisualIdentityCardProps {
  broker: Broker;
}

const BRAND_ASSET_TEMPLATES = [
  "Opening Frame",
  "Transition",
  "Lower Third",
  "End Card",
  "Outro Sequence",
] as const;

export function VisualIdentityCard({ broker }: VisualIdentityCardProps) {
  const colorSwatches = [
    { color: broker.colors.primary, label: "Primary" },
    { color: broker.colors.secondary, label: "Secondary" },
    { color: broker.colors.accent, label: "Accent" },
    { color: broker.colors.background, label: "Background" },
  ];

  const hasLogoFile = broker.slug === "homey";

  return (
    <Card>
      <CardContent className="p-5 space-y-5">
        {/* Top section: Logo + name + website */}
        <div className="flex items-center gap-4">
          {hasLogoFile ? (
            <img
              src="/brand/homi-logo.png"
              alt={broker.name}
              className="w-[120px] h-auto shrink-0"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-base">{broker.name}</h2>
            <p className="text-xs text-muted-foreground">
              {broker.websiteUrl}
            </p>
          </div>
        </div>

        {/* Color palette — horizontal strip */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Color Palette
          </div>
          <div className="flex items-center gap-3">
            {colorSwatches.map(({ color, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-10 h-10 rounded-md"
                  style={{
                    backgroundColor: color,
                    border:
                      color === "#FFFFFF" || color === "#ffffff"
                        ? "1px solid var(--border)"
                        : undefined,
                  }}
                />
                <span className="text-[10px] font-mono text-muted-foreground">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Assets section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Brand Assets
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4"
            >
              {BRAND_ASSET_TEMPLATES.length} templates
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {BRAND_ASSET_TEMPLATES.map((template) => (
              <div
                key={template}
                className="w-[120px] aspect-video rounded-md border border-dashed border-border bg-muted flex items-center justify-center"
              >
                <span className="text-[10px] text-muted-foreground text-center px-1 leading-tight">
                  {template === "End Card"
                    ? `Visit ${broker.websiteUrl}`
                    : template}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            Fonts
          </div>
          <div className="text-sm text-muted-foreground">{broker.fonts}</div>
        </div>
      </CardContent>
    </Card>
  );
}
