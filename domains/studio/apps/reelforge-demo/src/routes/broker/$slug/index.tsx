import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { VisualIdentityCard } from "@/components/visual-identity-card";
import { ProductionStatsCard } from "@/components/production-stats-card";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { SlaCard } from "@/components/sla-card";
import { PerformanceCard } from "@/components/performance-card";
import { DataDepthCard } from "@/components/data-depth-card";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/")({
  component: BrokerPresetPage,
});

function BrokerPresetPage() {
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

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{broker.name}</h1>
              <p className="text-sm text-muted-foreground">{broker.tagline}</p>
            </div>
          </div>
          <Link
            to="/broker/$slug/produce"
            params={{ slug: broker.slug }}
          >
            <Button>
              Generate Hook →
            </Button>
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-[240px_1fr_280px] gap-4">
          {/* Left column: Visual Identity + Production */}
          <div className="flex flex-col gap-4">
            <VisualIdentityCard broker={broker} />
            <ProductionStatsCard sla={broker.productionSla} />
          </div>

          {/* Center column: Brand Intelligence */}
          <BrandIntelligence broker={broker} />

          {/* Right column: SLA + Performance + Data Depth */}
          <div className="flex flex-col gap-4">
            <SlaCard sla={broker.productionSla} />
            <PerformanceCard perf={broker.contentPerformance} />
            <DataDepthCard depth={broker.dataDepth} />
          </div>
        </div>
      </div>
    </>
  );
}
