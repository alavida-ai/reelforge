import { createFileRoute } from "@tanstack/react-router";
import { Plus, Video, Clock, ArrowUpLeft, Euro } from "lucide-react";
import { Nav } from "@/components/nav";
import { KpiBadge } from "@/components/kpi-badge";
import { BrokerTable } from "@/components/broker-table";
import { getOrg, getBrokers } from "@/data/get-data";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const org = getOrg();
  const brokers = getBrokers();
  const kpis = org.headerKpis;

  return (
    <>
      <Nav />
      <div className="pt-14 max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <header className="py-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Brokers</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage client parameters and monitor generation health.</p>
          </div>
          <button className="bg-foreground text-background hover:bg-white transition-colors px-3.5 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" />
            Add Broker
          </button>
        </header>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KpiBadge
            value={kpis.hooksThisWeek}
            label="Hooks This Week"
            icon={Video}
            trend="+12%"
            trendDirection="up"
            trendColor="blue"
            sparklinePath="M0 40 Q 20 10, 40 20 T 80 5 L 100 0"
          />
          <KpiBadge
            value="34"
            label="Avg Turnaround"
            unit="sec"
            icon={Clock}
            trend="-2s"
            trendDirection="down"
            trendColor="green"
            sparklinePath="M0 10 L 20 15 L 40 8 L 60 20 L 80 30 L 100 40"
          />
          <KpiBadge
            value={kpis.returnRate}
            label="Return Rate"
            icon={ArrowUpLeft}
            trend="-0.2%"
            trendDirection="down"
            trendColor="green"
            highlight
          />
          <KpiBadge
            value={kpis.avgCost}
            label="Avg Cost"
            icon={Euro}
            trend="Flat"
            trendDirection="flat"
            trendColor="muted"
          />
        </section>

        {/* Broker Table */}
        <BrokerTable brokers={brokers} />
      </div>
    </>
  );
}
