import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import { VideoPreview } from "@/components/video-preview";
import { SplitKpiPanel } from "@/components/split-kpi-panel";
import { AdjustmentCard } from "@/components/adjustment-card";
import { DeliveryPackage } from "@/components/delivery-package";
import { PerformanceBrief } from "@/components/performance-brief";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/reveal")({
  component: HookRevealPage,
});

function HookRevealPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);

  if (!broker) {
    return (
      <>
        <Nav />
        <div className="pt-14 max-w-[1200px] mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  const reveal = broker.revealData;

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-[1200px] mx-auto px-5 py-5">
        {/* Screen header */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
            Screen 4 of 4
          </div>
          <h1 className="text-[16px] font-bold text-foreground leading-tight">
            Hook Reveal &mdash; {broker.name}
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Final hook with production metrics, creative rationale, and delivery
            package.
          </p>
        </div>

        {/* Main grid: left video + right content stack */}
        <div className="grid grid-cols-[300px_1fr] gap-5">
          {/* Left column -- Video Preview */}
          <div>
            <VideoPreview broker={broker} />
          </div>

          {/* Right column -- Content stack */}
          <div className="flex flex-col gap-3.5">
            {/* KPI Panel */}
            <SplitKpiPanel data={reveal} />

            {/* Creative Rationale (inline) */}
            <div className="bg-card rounded-xl border border-border p-4">
              <SectionLabel>Creative Rationale</SectionLabel>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {reveal.creativeRationale}
              </p>
              <div className="flex gap-1.5 mt-1.5">
                {reveal.creativeTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-green-subtle)] text-[var(--color-green)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Adjustments */}
            <div className="bg-card rounded-xl border border-border p-4">
              <SectionLabel>Adjustments</SectionLabel>
              <p className="text-[10px] text-muted-foreground/60 -mt-1 mb-3">
                Optional modifications with risk and trade-off transparency
              </p>
              <div className="space-y-2.5">
                {reveal.adjustments.map((adj) => (
                  <AdjustmentCard key={adj.name} adj={adj} />
                ))}
              </div>
            </div>

            {/* Delivery Package */}
            <DeliveryPackage broker={broker} />
          </div>
        </div>

        {/* Delivery package deep dive */}
        <div className="mt-6 mb-8">
          <h3 className="text-[13px] font-bold text-foreground mb-3">
            Delivery Package &mdash; Full Brief Preview
          </h3>
          <PerformanceBrief broker={broker} />
        </div>
      </div>
    </>
  );
}
