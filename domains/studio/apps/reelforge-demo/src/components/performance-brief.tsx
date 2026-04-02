import type { Broker } from "@/data/types";

interface PerformanceBriefProps {
  broker: Broker;
}

export function PerformanceBrief({ broker }: PerformanceBriefProps) {
  const reveal = broker.revealData;
  const pkg = reveal.deliveryPackage;
  const pq = reveal.productionQuality;
  const ep = reveal.expectedPerformance;
  const property = broker.demoProperty;
  const today = "2026-04-02";

  const slugifiedProperty = property.address
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "");

  return (
    <div className="card-hero rounded-xl p-6">
      {/* Package header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: broker.colors.primary }}
        >
          {broker.logoLetter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-foreground">
            Hook Delivery &mdash; {broker.name}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {property.address} &middot; {today}
          </div>
        </div>
        <div className="text-[8px] text-muted-foreground/50 text-right leading-tight">
          Produced by Bright River
          <br />
          Powered by ReelForge
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-[280px_1fr] gap-5">
        {/* LEFT -- Video thumbnail + package contents */}
        <div className="flex flex-col gap-3">
          {/* Thumbnail */}
          <div
            className="relative rounded-lg border border-border overflow-hidden"
            style={{ aspectRatio: "9/16", background: "#0a0a0a" }}
          >
            {/* Brand strip */}
            <div
              className="absolute top-0 inset-x-0 h-[2px]"
              style={{ background: broker.colors.primary }}
            />
            {/* Small play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center border border-white/15">
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 14 16"
                  fill="none"
                  className="ml-0.5"
                >
                  <path
                    d="M0 0L14 8L0 16V0Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
            {/* Duration */}
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/50">
              0:03
            </div>
          </div>

          {/* Package contents */}
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 block mb-1.5">
              Package Contents
            </span>
            {[
              {
                name: `hook-${broker.slug}-${slugifiedProperty}.mp4`,
                size: "2.4 MB",
              },
              { name: "performance-brief.pdf", size: "140 KB" },
              { name: "selected-assets.zip", size: "8.1 MB" },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between text-[9px]"
              >
                <span className="font-mono text-muted-foreground truncate">
                  {file.name}
                </span>
                <span className="text-muted-foreground/50 shrink-0 ml-2">
                  {file.size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT -- The brief document */}
        <div className="rounded-xl border border-border p-5 space-y-4" style={{ background: 'oklch(0.10 0.015 275)', boxShadow: 'inset 0 2px 8px oklch(0 0 0 / 20%)' }}>
          {/* 1. Hook Summary */}
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              Hook Summary
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 block">
                  Hook Type
                </span>
                <span className="text-[12px] font-semibold text-foreground">
                  {pkg.hookSummary.hookType}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 block">
                  Property
                </span>
                <span className="text-[12px] font-semibold text-foreground">
                  {pkg.hookSummary.property}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 block">
                  Platform
                </span>
                <span className="text-[12px] font-semibold text-foreground">
                  {pkg.hookSummary.platform}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Production Quality */}
          <div className="border-t border-border pt-3">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              Production Quality
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[18px] font-bold font-mono text-[var(--color-green)] leading-none block">
                  {pq.returnRate} {pq.returnRateTrend}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 mt-1 block">
                  Return Rate
                </span>
              </div>
              <div>
                <span className="text-[18px] font-bold font-mono text-foreground leading-none block">
                  {pq.turnaround}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 mt-1 block">
                  Turnaround
                </span>
              </div>
              <div>
                <span className="text-[18px] font-bold font-mono text-foreground leading-none block">
                  {pq.cost}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50 mt-1 block">
                  Cost
                </span>
              </div>
            </div>
          </div>

          {/* 3. Expected Performance */}
          <div className="border-t border-border pt-3">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Expected Performance
              </h4>
              <span className="text-[8px] text-muted-foreground/40 bg-muted px-1.5 py-0.5 rounded">
                Based on market benchmarks
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[14px] font-mono text-muted-foreground leading-none block">
                  {ep.views}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 mt-1 block">
                  Views vs Standard
                </span>
              </div>
              <div>
                <span className="text-[14px] font-mono text-muted-foreground leading-none block">
                  {ep.retention}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 mt-1 block">
                  3s Retention Lift
                </span>
              </div>
              <div>
                <span className="text-[14px] font-mono text-muted-foreground leading-none block">
                  {ep.brandRecall}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 mt-1 block">
                  Brand Recall
                </span>
              </div>
            </div>
            <div className="text-[8px] text-muted-foreground/40 mt-2">
              Data source: {ep.dataPoints} posts analyzed &middot; Dutch real
              estate &middot; Q1 2026
            </div>
          </div>

          {/* 4. Brand Match */}
          <div className="border-t border-border pt-3">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              Brand Match
            </h4>
            <div className="space-y-1">
              {pkg.brandMatchChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-1.5 text-[10px]"
                >
                  <span className="text-[var(--color-green)] shrink-0 leading-none mt-px">
                    &#10003;
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Property Features */}
          <div className="border-t border-border pt-3">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              Property Features
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {pkg.propertyFeaturesHighlighted.map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* 6. End Card / CTA */}
          <div className="border-t border-border pt-3">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              End Card / CTA
            </h4>
            <div
              className="rounded-lg border border-border p-3 flex items-center gap-3"
              style={{ background: `${broker.colors.primary}08` }}
            >
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ background: broker.colors.primary }}
              >
                {broker.logoLetter}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-foreground block">
                  {pkg.endCard.ctaText}
                </span>
                <span className="text-[9px] text-muted-foreground/60 truncate block">
                  {pkg.endCard.brokerUrl}
                </span>
              </div>
              <div className="flex gap-1">
                {[broker.colors.primary, broker.colors.secondary, broker.colors.accent].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm border border-white/10"
                      style={{ background: c }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          {/* 7. Optimization Note */}
          <div className="rounded-lg border border-[var(--color-green)]/20 bg-[var(--color-green-subtle)] p-3">
            <h4 className="text-[10px] font-bold text-[var(--color-green)] mb-1">
              Optimization Note
            </h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              {pkg.optimizationNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
