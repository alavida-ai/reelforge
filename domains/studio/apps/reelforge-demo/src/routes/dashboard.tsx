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
      <div className="pt-14 max-w-[1200px] mx-auto px-6 py-8">
        {/* Header with org name and KPIs */}
        <div className="flex justify-between items-center pb-4 border-b border-border mb-5">
          <div className="font-bold text-[15px]">
            {org.name}{" "}
            <span className="font-normal text-muted-foreground">
              / {org.product}
            </span>
          </div>
          <div className="flex gap-5">
            <KpiBadge value={kpis.hooksThisWeek} label="Hooks This Week" />
            <KpiBadge value={kpis.avgTurnaround} label="Avg Turnaround" />
            <KpiBadge value={kpis.returnRate} label="Return Rate" highlight />
            <KpiBadge value={kpis.avgCost} label="Avg Cost / Hook" />
          </div>
        </div>
        <BrokerTable brokers={brokers} />
      </div>
    </>
  );
}
