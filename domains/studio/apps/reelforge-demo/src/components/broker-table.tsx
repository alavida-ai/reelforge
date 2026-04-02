import { Link } from "@tanstack/react-router";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Broker } from "@/data/types";

export function BrokerTable({ brokers }: { brokers: Broker[] }) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Broker</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead className="text-center">Hooks</TableHead>
            <TableHead className="text-center">Return Rate</TableHead>
            <TableHead className="text-center">Avg Views</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {brokers.map((broker) => (
            <TableRow key={broker.slug} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: broker.colors.primary }}
                  >
                    {broker.logoLetter}
                  </div>
                  <div>
                    <div className="font-medium">{broker.name}</div>
                    <div className="text-xs text-muted-foreground">{broker.tagline}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {[broker.colors.primary, broker.colors.secondary, broker.colors.accent].map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center font-mono font-medium">
                {broker.productionSla.hooksDelivered}
              </TableCell>
              <TableCell className="text-center">
                <span className="font-mono font-medium text-[var(--color-green)]">
                  {broker.productionSla.returnRate}
                </span>
                <span className="text-xs text-[var(--color-green)] ml-1">
                  {broker.productionSla.returnRateTrend}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-mono font-medium">{broker.contentPerformance.avgViews}</span>
                <span className="text-xs text-[var(--color-green)] ml-1">
                  {broker.contentPerformance.avgViewsTrend}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Link to="/broker/$slug" params={{ slug: broker.slug }}>
                  <Button variant="outline" size="sm">
                    Generate Hook →
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
