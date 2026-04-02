import { Link } from "@tanstack/react-router";
import type { Broker } from "@/data/types";

interface BrokerTableProps {
  brokers: Broker[];
}

function totalHooksDelivered(brokers: Broker[]): number {
  return brokers.reduce((sum, b) => sum + b.productionSla.hooksDelivered, 0);
}

export function BrokerTable({ brokers }: BrokerTableProps) {
  return (
    <div className="card-hero rounded-xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Your Brokers</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {brokers.length} active &middot; {totalHooksDelivered(brokers)} hooks
            delivered
          </p>
        </div>
        <button
          type="button"
          className="bg-surface-raised border border-border rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground cursor-default hover:text-foreground transition-colors duration-200"
        >
          + Add Broker
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-border/60">
            <Th align="left">Broker</Th>
            <Th align="left">Brand</Th>
            <Th align="center">Hooks</Th>
            <Th align="center">Return Rate</Th>
            <Th align="center">Avg Views</Th>
            <Th align="right">{""}</Th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <BrokerRow key={broker.slug} broker={broker} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- Table header cell ---- */

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align: "left" | "center" | "right";
}) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <th
      className={`${alignClass} px-3 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium`}
    >
      {children}
    </th>
  );
}

/* ---- Table row ---- */

function BrokerRow({ broker }: { broker: Broker }) {
  const colors = broker.colors;
  const colorSwatches = [colors.primary, colors.secondary, colors.accent];

  return (
    <tr className="border-b border-border/40 hover:bg-[oklch(1_0_0/3%)] transition-all duration-200 group">
      {/* Broker name + logo letter */}
      <td className="px-3 py-3">
        <Link
          to="/broker/$slug"
          params={{ slug: broker.slug }}
          className="flex items-center gap-2.5"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold text-white shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: colors.primary }}
          >
            {broker.logoLetter}
          </div>
          <div>
            <div className="font-semibold text-xs text-foreground group-hover:text-brand transition-colors duration-200">
              {broker.name}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {broker.tagline}
            </div>
          </div>
        </Link>
      </td>

      {/* Brand color swatches */}
      <td className="px-3 py-3">
        <div className="flex gap-[3px]">
          {colorSwatches.map((color) => (
            <div
              key={color}
              className="w-3.5 h-3.5 rounded-[3px]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </td>

      {/* Hooks delivered */}
      <td className="text-center px-3 py-3 font-mono font-bold">
        {broker.productionSla.hooksDelivered}
      </td>

      {/* Return rate + trend */}
      <td className="text-center px-3 py-3 font-mono">
        <div
          className="font-bold"
          style={{ color: "var(--color-green)" }}
        >
          {broker.productionSla.returnRate}
        </div>
        <div
          className="text-[9px]"
          style={{ color: "var(--color-green)" }}
        >
          {broker.productionSla.returnRateTrend}
        </div>
      </td>

      {/* Avg views + trend */}
      <td className="text-center px-3 py-3 font-mono">
        <div className="font-bold">
          {broker.contentPerformance.avgViews}
        </div>
        <div
          className="text-[9px]"
          style={{ color: "var(--color-green)" }}
        >
          {broker.contentPerformance.avgViewsTrend}
        </div>
      </td>

      {/* Action */}
      <td className="text-right px-3 py-3">
        <Link
          to="/broker/$slug"
          params={{ slug: broker.slug }}
          className="inline-block bg-brand/10 text-brand text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-brand/20 hover:shadow-[0_0_12px_oklch(0.72_0.10_300/15%)] transition-all duration-200"
        >
          Generate Hook &rarr;
        </Link>
      </td>
    </tr>
  );
}
