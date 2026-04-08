import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { VisualIdentityCard } from "@/components/visual-identity-card";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { HookHistory } from "@/components/hook-history";
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
        <div className="pt-14 max-w-6xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-[5.5rem] pb-8 px-6 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
        {/* Header bar */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl font-semibold shadow-inner"
              style={{ backgroundColor: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-tight">
                {broker.name}
              </h1>
              <span className="text-muted-foreground">{broker.tagline}</span>
            </div>
          </div>

          {/* KPIs & Actions */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1 pr-6 border-r border-border">
                <div className="flex items-end gap-2">
                  <span className="font-mono text-xl text-foreground leading-none font-medium">
                    {broker.productionSla.returnRate}
                  </span>
                  <span className="text-[var(--color-green)] font-mono text-xs flex items-center">
                    <ArrowDownRight className="h-3 w-3" />
                  </span>
                </div>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                  Return Rate
                </span>
              </div>

              <div className="flex flex-col gap-1 pr-6 border-r border-border">
                <span className="font-mono text-xl text-foreground leading-none font-medium">
                  {broker.productionSla.turnaround}
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                  Turnaround
                </span>
              </div>

              <div className="flex flex-col gap-1 pr-6 border-r border-border">
                <span className="font-mono text-xl text-foreground leading-none font-medium">
                  {broker.productionSla.hooksDelivered}
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                  Hooks Delivered
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-2">
                  <span className="font-mono text-xl text-foreground leading-none font-medium">
                    {broker.contentPerformance.avgViews}
                  </span>
                  <span className="text-[var(--color-green)] font-mono text-xs flex items-center">
                    <ArrowUpRight className="h-3 w-3" /> {broker.contentPerformance.avgViewsTrend.replace("\u2191 ", "")}
                  </span>
                </div>
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                  Avg Views
                </span>
              </div>
            </div>

            <Link to="/broker/$slug/produce" params={{ slug: broker.slug }}>
              <button className="bg-foreground text-background font-medium px-4 py-2 rounded-md hover:bg-white transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                New Hook
              </button>
            </Link>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <VisualIdentityCard broker={broker} />
            <BrandIntelligence broker={broker} />
          </div>
          <div className="lg:col-span-5 relative">
            <HookHistory broker={broker} />
          </div>
        </div>
      </div>
    </>
  );
}
