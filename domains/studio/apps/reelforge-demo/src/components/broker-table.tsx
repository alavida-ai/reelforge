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
    <div>
      {/* Summary bar */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="font-semibold text-sm">Broker Clients</span>
          <span className="text-muted-foreground text-[11px]">
            {" "}
            &middot; {brokers.length} active &middot;{" "}
            {totalHooksDelivered(brokers)} hooks delivered
          </span>
        </div>
        <button
          type="button"
          className="bg-surface-raised border border-border rounded-md px-2.5 py-1.5 text-[11px] text-muted-foreground cursor-default"
        >
          + Add Broker
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-border">
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
      className={`${alignClass} px-2 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium`}
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
    <tr className="border-b border-border">
      {/* Broker name + logo letter */}
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ backgroundColor: colors.primary }}
          >
            {broker.logoLetter}
          </div>
          <div>
            <div className="font-semibold text-xs">{broker.name}</div>
            <div className="text-[10px] text-muted-foreground">
              {broker.tagline}
            </div>
          </div>
        </div>
      </td>

      {/* Brand color swatches */}
      <td className="px-2 py-2.5">
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
      <td className="text-center px-2 py-2.5 font-mono font-bold">
        {broker.productionSla.hooksDelivered}
      </td>

      {/* Return rate + trend */}
      <td className="text-center px-2 py-2.5 font-mono">
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
      <td className="text-center px-2 py-2.5 font-mono">
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
      <td className="text-right px-2 py-2.5">
        <Link
          to="/broker/$slug"
          params={{ slug: broker.slug }}
          className="inline-block bg-brand-subtle text-brand text-[11px] font-medium px-2.5 py-1 rounded-md hover:bg-brand-subtle/80 transition-colors"
        >
          Generate Hook &rarr;
        </Link>
      </td>
    </tr>
  );
}
