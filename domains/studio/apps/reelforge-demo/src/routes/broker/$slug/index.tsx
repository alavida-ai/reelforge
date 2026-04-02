import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
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
        <div className="pt-16 max-w-[1200px] mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-16 max-w-[1200px] mx-auto px-6 py-6">
        {/* Hero header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{broker.name}</h1>
              <p className="text-sm text-muted-foreground">{broker.tagline}</p>
            </div>
          </div>
          <Link
            to="/broker/$slug/produce"
            params={{ slug: broker.slug }}
            className="px-4 py-2 rounded-lg bg-brand text-primary-foreground text-[12px] font-semibold hover:opacity-90 hover:shadow-[0_0_16px_oklch(0.72_0.10_300/25%)] transition-all duration-200"
          >
            Generate Hook &rarr;
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
