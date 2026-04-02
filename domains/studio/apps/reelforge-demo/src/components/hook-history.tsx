import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, CheckCircle2, Quote } from "lucide-react";
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

/** Map hook type to a thumbnail image path */
function getThumbnailForType(hookType: string): string {
  if (hookType.includes("Door")) return "/property/exterior.jpg";
  if (hookType.includes("Price")) return "/property/kitchen.jpg";
  if (hookType.includes("Before") || hookType.includes("After"))
    return "/property/living.jpg";
  return "/property/exterior.jpg";
}

/** Map hook type to a video source path */
function getVideoForType(hookType: string): string {
  if (hookType.includes("Door")) return "/hooks/walk-through-door.mp4";
  return "/hooks/homi-gift-reveal.mp4";
}

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

function formatRejectionSource(date: string): string {
  const d = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `Rejection via email — broker@homey.nl \u00b7 ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function HookThumbnail({ hookType }: { hookType: string }) {
  const thumbnail = getThumbnailForType(hookType);
  return (
    <div className="w-[80px] h-[45px] rounded-md overflow-hidden bg-muted shrink-0 relative">
      <img
        src={thumbnail}
        alt={hookType}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <span className="text-white text-xs">&#9654;</span>
      </div>
    </div>
  );
}

function HookVideoPreview({ hookType }: { hookType: string }) {
  const videoSrc = getVideoForType(hookType);
  return (
    <div className="mb-3">
      <video
        className="w-[300px] aspect-video rounded-md bg-muted"
        controls
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

function RejectedHookDetail({ rejection, hookType }: { rejection: RejectionEntry; hookType: string }) {
  return (
    <div className="space-y-3">
      {/* Video preview */}
      <HookVideoPreview hookType={hookType} />

      {/* Broker Feedback */}
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Broker Feedback
        </div>
        <div className="border-l-2 border-muted-foreground/30 pl-3 py-1 bg-muted/20 rounded-r-md">
          <div className="flex items-start gap-2">
            <Quote className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm italic text-foreground leading-relaxed">
              {rejection.reason}
            </p>
          </div>
        </div>
      </div>

      {/* Source */}
      <div className="text-xs text-muted-foreground">
        {formatRejectionSource(rejection.date)}
      </div>

      {/* System Analysis */}
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          System Analysis
        </div>
        <div className="rounded-md border border-border bg-muted/20 px-3 py-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {rejection.systemAnalysis}
          </p>
        </div>
      </div>

      {/* Brand Update */}
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Brand Update
        </div>
        <div className="flex items-start gap-2 rounded-md border border-[var(--color-green)]/20 bg-[var(--color-green)]/5 px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-[var(--color-green)] shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-medium">Guardrail added</span>
            <span className="text-muted-foreground mx-1">&rarr;</span>
            <span>{rejection.guardrailAdded}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-xs text-muted-foreground pt-1 border-t border-border">
        Resolved — guardrail applied to all future hooks
      </div>
    </div>
  );
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

                  {/* Thumbnail */}
                  <HookThumbnail hookType={entry.hookType} />

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
                      <RejectedHookDetail rejection={entry.rejection} hookType={entry.hookType} />
                    ) : (
                      <div className="space-y-3">
                        <HookVideoPreview hookType={entry.hookType} />
                        <div className="text-sm text-muted-foreground py-1">
                          Delivered successfully &middot; No issues reported
                        </div>
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
