import { Link } from "@tanstack/react-router";
import { Wand2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import type { Broker } from "@/data/types";

function ReturnRateBadge({ rate, trend }: { rate: string; trend: string }) {
  const isDown = trend.includes("↓");
  const isUp = trend.includes("↑");
  const color = isDown
    ? "bg-[var(--color-green)]/10 text-[var(--color-green)] border-[var(--color-green)]/20"
    : isUp
      ? "bg-[var(--color-red)]/10 text-[var(--color-red)] border-[var(--color-red)]/20"
      : "bg-background text-foreground border-border";

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono border", color)}>
      <span>{rate}</span>
      {isDown ? <TrendingDown className="h-3 w-3" /> : isUp ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
    </div>
  );
}

export function BrokerTable({ brokers }: { brokers: Broker[] }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background relative">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="w-[300px]">Client / Broker</TableHead>
              <TableHead>Brand Palette</TableHead>
              <TableHead className="text-right">Hooks Delivered</TableHead>
              <TableHead>Return Rate</TableHead>
              <TableHead>Avg Views</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokers.map((broker) => {
              const viewsTrendUp = broker.contentPerformance.avgViewsTrend.includes("↑");

              return (
                <TableRow key={broker.slug} className="group hover:bg-accent/40 transition-colors">
                  <TableCell className="py-3">
                    <Link to="/broker/$slug" params={{ slug: broker.slug }} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {broker.logoLetter}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">{broker.name}</span>
                        <span className="text-xs text-muted-foreground truncate w-48">{broker.tagline}</span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {[broker.colors.primary, broker.colors.secondary, broker.colors.accent].map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-white/10"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-foreground">{broker.productionSla.hooksDelivered}</span>
                  </TableCell>
                  <TableCell>
                    <ReturnRateBadge rate={broker.productionSla.returnRate} trend={broker.productionSla.returnRateTrend} />
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-1.5 text-foreground text-xs font-mono">
                      <span>{broker.contentPerformance.avgViews}</span>
                      {viewsTrendUp ? (
                        <TrendingUp className="h-3 w-3 text-[var(--color-market)]" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-[var(--color-red)]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to="/broker/$slug/produce" params={{ slug: broker.slug }}>
                      <button className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-transparent border border-border text-xs text-foreground hover:bg-accent px-3 py-1.5 rounded flex items-center gap-1.5 ml-auto">
                        <Wand2 className="h-3 w-3" />
                        Generate
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
