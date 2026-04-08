import { MoreHorizontal, Play, Film, AppWindow, Clapperboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Broker } from "@/data/types";

const BRAND_ASSET_TEMPLATES = [
  { name: "Opening Frame", icon: Play },
  { name: "Transition", icon: Clapperboard },
  { name: "Lower Third", icon: null },
  { name: "End Card", icon: AppWindow },
  { name: "Outro Seq.", icon: Film },
] as const;

export function VisualIdentityCard({ broker }: { broker: Broker }) {
  const colorSwatches = [
    { color: broker.colors.primary, label: "Primary" },
    { color: broker.colors.secondary, label: "Secondary" },
    { color: broker.colors.accent, label: "Accent" },
    { color: broker.colors.background, label: "Base" },
  ];

  return (
    <Card>
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="font-medium text-foreground uppercase tracking-wide text-xs">
          Visual Identity
        </h2>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <CardContent className="p-5 flex flex-col gap-8">
        {/* Top Row: Logo & Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo / URL */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Brand Details
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center text-white font-medium border border-border shrink-0"
                style={{ backgroundColor: broker.colors.primary }}
              >
                {broker.logoLetter}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{broker.name}</span>
                <span className="font-mono text-xs text-[var(--color-market)]">
                  {broker.websiteUrl}
                </span>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Color Palette
            </span>
            <div className="flex items-start gap-4">
              {colorSwatches.map(({ color, label }) => (
                <div key={label} className="flex flex-col gap-1.5 items-center">
                  <div
                    className="w-8 h-8 rounded-md border border-border shadow-sm"
                    style={{
                      backgroundColor: color,
                      borderColor: color === "#FFFFFF" || color === "#ffffff" || color === "#F5F5F5"
                        ? "var(--border)"
                        : undefined,
                    }}
                  />
                  <div className="text-center">
                    <div className="font-mono text-[0.65rem] text-foreground">{color}</div>
                    <div className="text-[0.6rem] text-muted-foreground uppercase">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Brand Assets Grid */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Motion Templates
            </span>
            <span className="bg-accent border border-border px-2 py-0.5 rounded text-xs text-foreground">
              5 Active
            </span>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {BRAND_ASSET_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.name} className="flex flex-col gap-2">
                  <div className="aspect-video w-full rounded border border-dashed border-muted-foreground/50 bg-muted/30 flex items-center justify-center">
                    {Icon ? (
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <div className="w-2/3 h-1/3 bg-border/80 rounded-sm" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate">{template.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fonts */}
        <div className="flex items-center gap-4 pt-2">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider w-24">
            Typography
          </span>
          <div className="flex items-center gap-2">
            {broker.fonts.split(" \u00b7 ").map((font, i) => (
              <span key={font}>
                {i > 0 && <span className="text-muted-foreground mr-2">\u00b7</span>}
                <span className="px-2 py-1 bg-accent border border-border rounded text-foreground">
                  {font}
                </span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
