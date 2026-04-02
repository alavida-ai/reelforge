import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { VisualIdentityCard } from "@/components/visual-identity-card";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { HookHistory } from "@/components/hook-history";
import { getBroker } from "@/data/get-data";
import { Plus } from "lucide-react";

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
        <div className="pt-14 max-w-6xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-6xl mx-auto px-6 py-6">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Logo + Name */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                {broker.name}
              </h1>
              <p className="text-sm text-muted-foreground">{broker.tagline}</p>
            </div>

            {/* Key stats — inline text pairs */}
            <div className="hidden md:flex items-center gap-1 ml-4 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">
                Return Rate{" "}
                <span className="text-[var(--color-green)]">
                  {broker.productionSla.returnRate} ↓
                </span>
              </span>
              <span className="mx-1.5">·</span>
              <span>
                Turnaround{" "}
                <span className="text-foreground font-medium">
                  {broker.productionSla.turnaround}
                </span>
              </span>
              <span className="mx-1.5">·</span>
              <span>
                Hooks{" "}
                <span className="text-foreground font-medium">
                  {broker.productionSla.hooksDelivered}
                </span>
              </span>
              <span className="mx-1.5">·</span>
              <span>
                Views{" "}
                <span className="text-foreground font-medium">
                  {broker.contentPerformance.avgViews}{" "}
                  <span className="text-[var(--color-green)]">
                    {broker.contentPerformance.avgViewsTrend}
                  </span>
                </span>
              </span>
            </div>
          </div>

          {/* New Hook button */}
          <Link to="/broker/$slug/produce" params={{ slug: broker.slug }}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1.5" />
              New Hook
            </Button>
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left column: Visual Identity + Brand Intelligence */}
          <div className="flex flex-col gap-6">
            <VisualIdentityCard broker={broker} />
            <BrandIntelligence broker={broker} />
          </div>

          {/* Right column: Hook History */}
          <div>
            <HookHistory broker={broker} />
          </div>
        </div>
      </div>
    </>
  );
}
