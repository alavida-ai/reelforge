import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Nav } from "@/components/nav";
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
        <div className="pt-14 max-w-5xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  const reveal = broker.revealData;

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {broker.name} &mdash; Hook Delivery
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Final hook with production metrics, creative rationale, and delivery
            package.
          </p>
        </div>

        {/* Main grid: left video + right content stack */}
        <div className="grid grid-cols-[300px_1fr] gap-6">
          {/* Left column -- Video Preview */}
          <div>
            <VideoPreview broker={broker} />
          </div>

          {/* Right column -- Content stack */}
          <div className="flex flex-col gap-4">
            {/* KPI Panel */}
            <SplitKpiPanel data={reveal} />

            {/* Creative Rationale */}
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-bold mb-2">Creative Rationale</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {reveal.creativeRationale}
                </p>
                <div className="flex gap-1.5 mt-2.5">
                  {reveal.creativeTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-green-subtle)] text-[var(--color-green)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Adjustments */}
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-bold mb-1">Adjustments</h3>
                <p className="text-[10px] text-muted-foreground mb-3">
                  Optional modifications with risk and trade-off transparency
                </p>
                <div className="space-y-3">
                  {reveal.adjustments.map((adj) => (
                    <AdjustmentCard key={adj.name} adj={adj} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Package */}
            <DeliveryPackage broker={broker} />
          </div>
        </div>

        {/* Delivery package deep dive */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-bold mb-4">
            Delivery Package &mdash; Full Brief
          </h2>
          <PerformanceBrief broker={broker} />
        </div>
      </div>
    </>
  );
}
