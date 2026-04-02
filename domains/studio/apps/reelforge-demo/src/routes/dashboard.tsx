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
      <div className="pt-14 max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Brokers</h1>
          <div className="flex items-center gap-8">
            <KpiBadge value={kpis.hooksThisWeek} label="Hooks this week" />
            <KpiBadge value={kpis.avgTurnaround} label="Avg turnaround" />
            <KpiBadge value={kpis.returnRate} label="Return rate" highlight />
            <KpiBadge value={kpis.avgCost} label="Avg cost" />
          </div>
        </div>
        <BrokerTable brokers={brokers} />
      </div>
    </>
  );
}
