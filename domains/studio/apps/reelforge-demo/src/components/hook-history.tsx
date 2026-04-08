import { useState } from "react";
import { cn } from "@/lib";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, CheckCircle2, MessageCircle, Cpu, History, Filter } from "lucide-react";
import type { Broker, RejectionEntry } from "@/data/types";

interface HistoryEntry {
  hookNumber: number;
  hookType: string;
  date: string;
  status: "accepted" | "returned";
  rejection?: RejectionEntry;
}

const HOOK_TYPES = [
  "Door Reveal", "Price Tag Reveal", "Before/After", "Door Reveal",
  "Price Tag Reveal", "Door Reveal", "Before/After", "Door Reveal",
  "Price Tag Reveal", "Door Reveal",
];

function getThumbnailForType(hookType: string): string {
  if (hookType.includes("Door")) return "/property/exterior.jpg";
  if (hookType.includes("Price")) return "/property/kitchen.jpg";
  return "/property/living.jpg";
}

function getVideoForType(hookType: string): string {
  if (hookType.includes("Door")) return "/hooks/walk-through-door.mp4";
  return "/hooks/homi-gift-reveal.mp4";
}

function generateDate(daysAgo: number): string {
  const d = new Date(2026, 3, 2);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function buildHistory(broker: Broker): HistoryEntry[] {
  const rejectedNumbers = new Set(broker.rejectionLog.entries.map((e) => e.hookNumber));
  const totalHooks = broker.rejectionLog.totalHooks;
  const history: HistoryEntry[] = [];

  for (let i = totalHooks; i > Math.max(0, totalHooks - 8); i--) {
    const rejection = broker.rejectionLog.entries.find((e) => e.hookNumber === i);
    const idx = totalHooks - i;
    history.push({
      hookNumber: i,
      hookType: rejection ? "AI Influencer" : HOOK_TYPES[idx % HOOK_TYPES.length],
      date: rejection ? rejection.date : generateDate(idx * 2),
      status: rejectedNumbers.has(i) ? "returned" : "accepted",
      rejection: rejection ?? undefined,
    });
  }

  return history;
}

export function HookHistory({ broker }: { broker: Broker }) {
  const history = buildHistory(broker);
  const [expandedHook, setExpandedHook] = useState<number | null>(null);

  return (
    <Card className="sticky top-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-medium text-foreground uppercase tracking-wide text-xs">
            Correction History
          </h2>
        </div>
        <button className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground border border-border px-2 py-1 rounded bg-background">
          <Filter className="h-3 w-3" /> Filter
        </button>
      </div>

      {/* Summary Stats */}
      <div className="p-4 border-b border-border grid grid-cols-4 gap-4 bg-background/30">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.65rem] text-muted-foreground uppercase">Total</span>
          <span className="font-mono text-sm text-foreground">{broker.rejectionLog.totalHooks}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.65rem] text-muted-foreground uppercase">Returns</span>
          <span className="font-mono text-sm text-[var(--color-red)]">{broker.rejectionLog.totalReturned}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.65rem] text-muted-foreground uppercase">Consecutive</span>
          <span className="font-mono text-sm text-[var(--color-green)]">
            {broker.rejectionLog.consecutiveAccepted} <span className="text-[0.6rem] text-muted-foreground">streak</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.65rem] text-muted-foreground uppercase">Trend</span>
          <span className="font-mono text-sm text-foreground">
            {broker.rejectionLog.returnRateTrend.month1} <span className="text-muted-foreground">{"\u2192"}</span> {broker.rejectionLog.returnRateTrend.month3}
          </span>
        </div>
      </div>

      {/* History List */}
      <div className="flex flex-col">
        {history.map((entry) => {
          const isExpanded = expandedHook === entry.hookNumber;
          const isReturned = entry.status === "returned";

          return (
            <div key={entry.hookNumber} className={cn(isExpanded && isReturned && "bg-accent/20")}>
              {/* Row */}
              <button
                type="button"
                onClick={() => setExpandedHook(isExpanded ? null : entry.hookNumber)}
                className="w-full p-3 border-b border-border flex items-center gap-3 hover:bg-accent/50 group cursor-pointer transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
                )}

                {/* Thumbnail */}
                <div className={cn(
                  "w-12 h-7 rounded border shrink-0 overflow-hidden",
                  isReturned ? "border-[var(--color-red)]/50" : "border-border"
                )}>
                  <img
                    src={getThumbnailForType(entry.hookType)}
                    alt={entry.hookType}
                    className="w-full h-full object-cover opacity-80 grayscale"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="flex flex-col gap-0.5 truncate pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">#{entry.hookNumber}</span>
                      <span className="text-sm text-foreground font-medium truncate">{entry.hookType}</span>
                    </div>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      {formatDisplayDate(entry.date)}
                    </span>
                  </div>

                  {isReturned ? (
                    <span className="px-2 py-0.5 rounded text-[0.65rem] font-mono bg-[var(--color-red)]/10 text-[var(--color-red)] border border-[var(--color-red)]/20 uppercase tracking-wider shrink-0">
                      Returned
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[var(--color-green)] shadow-[0_0_8px_rgba(122,186,122,0.4)] shrink-0" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && entry.rejection && (
                <div className="pl-[3.25rem] pr-4 pb-4 pt-3 flex flex-col gap-4">
                  {/* Video */}
                  <div className="aspect-video w-full max-w-[240px] rounded border border-border bg-background relative overflow-hidden group">
                    <video className="w-full h-full object-cover opacity-50" preload="metadata">
                      <source src={getVideoForType(entry.hookType)} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl text-foreground opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer">&#9654;</span>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.65rem] text-muted-foreground uppercase flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" /> Broker Feedback
                    </span>
                    <blockquote className="pl-2 border-l-2 border-[var(--color-red)] text-sm text-foreground bg-[var(--color-red)]/5 py-1 pr-2 rounded-r">
                      &ldquo;{entry.rejection.reason}&rdquo;
                    </blockquote>
                  </div>

                  {/* Analysis */}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.65rem] text-[var(--color-market)] uppercase flex items-center gap-1">
                      <Cpu className="h-3 w-3" /> System Analysis
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {entry.rejection.systemAnalysis}
                    </p>
                  </div>

                  {/* Brand Update */}
                  <div className="border border-[var(--color-green)]/30 bg-[var(--color-green)]/5 rounded p-2.5 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-green)] mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-mono text-[0.65rem] text-[var(--color-green)] uppercase font-medium">
                        Brand Model Updated
                      </span>
                      <span className="text-xs text-[var(--color-green)]/90">
                        Guardrail added: {entry.rejection.guardrailAdded}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {isExpanded && !entry.rejection && (
                <div className="pl-[3.25rem] pr-4 pb-4 pt-3">
                  <div className="aspect-video w-full max-w-[240px] rounded border border-border bg-background relative overflow-hidden mb-2">
                    <video className="w-full h-full object-cover opacity-50" preload="metadata">
                      <source src={getVideoForType(entry.hookType)} type="video/mp4" />
                    </video>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Delivered successfully &middot; No issues reported
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Load more */}
        <div className="p-3 flex justify-center">
          <button className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
            Load older history...
          </button>
        </div>
      </div>
    </Card>
  );
}
