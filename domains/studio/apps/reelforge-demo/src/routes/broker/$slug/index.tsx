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
        <div className="pt-14 max-w-[1200px] mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-[1200px] mx-auto px-5 py-5">
        {/* Breadcrumb + CTA */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-muted-foreground">
            <Link
              to="/dashboard"
              className="hover:text-foreground transition-colors"
            >
              ← Brokers
            </Link>{" "}
            <span className="mx-1">/</span>{" "}
            <span className="font-semibold text-foreground">{broker.name}</span>
          </div>
          <Link
            to="/broker/$slug/produce"
            params={{ slug: broker.slug }}
            className="px-3 py-1.5 rounded-md bg-brand text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-opacity"
          >
            Generate Hook for {broker.name} →
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-[220px_1fr_260px] gap-3.5">
          {/* Left column: Visual Identity + Production */}
          <div className="flex flex-col gap-3">
            <VisualIdentityCard broker={broker} />
            <ProductionStatsCard sla={broker.productionSla} />
          </div>

          {/* Center column: Brand Intelligence */}
          <BrandIntelligence broker={broker} />

          {/* Right column: SLA + Performance + Data Depth */}
          <div className="flex flex-col gap-3">
            <SlaCard sla={broker.productionSla} />
            <PerformanceCard perf={broker.contentPerformance} />
            <DataDepthCard depth={broker.dataDepth} />
          </div>
        </div>
      </div>
    </>
  );
}
