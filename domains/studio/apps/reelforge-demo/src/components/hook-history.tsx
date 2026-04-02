import { useState } from "react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Broker, RejectionEntry } from "@/data/types";

interface HookHistoryProps {
  broker: Broker;
}

interface HistoryEntry {
  hookNumber: number;
  hookType: string;
  date: string;
  status: "accepted" | "returned";
  rejection?: RejectionEntry;
}

const HOOK_TYPES = [
  "Door Reveal",
  "Price Tag Reveal",
  "Before/After",
  "Door Reveal",
  "Price Tag Reveal",
  "Door Reveal",
  "Before/After",
  "Door Reveal",
  "Price Tag Reveal",
  "Door Reveal",
];

function generateDate(daysAgo: number): string {
  const d = new Date(2026, 3, 2); // 2026-04-02
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function buildHistory(broker: Broker): HistoryEntry[] {
  const rejectedNumbers = new Set(
    broker.rejectionLog.entries.map((e) => e.hookNumber),
  );
  const totalHooks = broker.rejectionLog.totalHooks;
  const history: HistoryEntry[] = [];

  for (let i = totalHooks; i > Math.max(0, totalHooks - 10); i--) {
    const rejection = broker.rejectionLog.entries.find(
      (e) => e.hookNumber === i,
    );
    const idx = totalHooks - i;
    history.push({
      hookNumber: i,
      hookType: rejection
        ? "Door Reveal"
        : HOOK_TYPES[idx % HOOK_TYPES.length],
      date: rejection ? rejection.date : generateDate(idx * 2),
      status: rejectedNumbers.has(i) ? "returned" : "accepted",
      rejection: rejection ?? undefined,
    });
  }

  return history;
}

export function HookHistory({ broker }: HookHistoryProps) {
  const history = buildHistory(broker);
  const [expandedHook, setExpandedHook] = useState<number | null>(null);

  const totalCount = broker.rejectionLog.totalHooks;

  return (
    <Card className="h-fit">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Hook History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {totalCount} hooks · {broker.rejectionLog.totalReturned} returned
          </p>
        </div>

        {/* Hook list */}
        <div className="flex flex-col">
          {history.map((entry) => {
            const isExpanded = expandedHook === entry.hookNumber;
            return (
              <div
                key={entry.hookNumber}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedHook(isExpanded ? null : entry.hookNumber)
                  }
                  className="w-full flex items-center gap-3 py-3 px-1 text-left hover:bg-muted/30 transition-colors rounded-sm"
                >
                  {/* Chevron */}
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  )}

                  {/* Hook number */}
                  <span className="text-xs font-mono text-muted-foreground w-8 shrink-0">
                    #{entry.hookNumber}
                  </span>

                  {/* Hook type */}
                  <span className="text-sm font-medium flex-1 truncate">
                    {entry.hookType}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-muted-foreground shrink-0 mr-2">
                    {entry.date}
                  </span>

                  {/* Status badge */}
                  {entry.status === "accepted" ? (
                    <Badge
                      variant="outline"
                      className="text-[var(--color-green)] border-[var(--color-green)]/30 shrink-0"
                    >
                      Accepted
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="shrink-0">
                      Returned
                    </Badge>
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="pl-9 pr-2 pb-3">
                    {entry.rejection ? (
                      <div className="rounded-md border border-border bg-muted/30 p-3 space-y-2">
                        <div>
                          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                            Reason
                          </div>
                          <p className="text-sm">{entry.rejection.reason}</p>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                            System Analysis
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {entry.rejection.systemAnalysis}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-semibold text-[var(--color-green)]">
                            Guardrail added:
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {entry.rejection.guardrailAdded}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground py-1">
                        Accepted — no issues detected. Delivered within SLA.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
