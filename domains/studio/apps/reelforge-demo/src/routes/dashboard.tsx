import { createFileRoute } from "@tanstack/react-router";
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
      <div className="pt-16 max-w-[1200px] mx-auto px-6 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Operations Overview
        </h1>

        {/* KPI Tiles */}
        <div className="flex gap-3 mb-8">
          <KpiBadge value={kpis.hooksThisWeek} label="Hooks This Week" />
          <KpiBadge value={kpis.avgTurnaround} label="Avg Turnaround" />
          <KpiBadge value={kpis.returnRate} label="Return Rate" highlight />
          <KpiBadge value={kpis.avgCost} label="Avg Cost / Hook" />
        </div>

        {/* Broker Table */}
        <BrokerTable brokers={brokers} />
      </div>
    </>
  );
}
