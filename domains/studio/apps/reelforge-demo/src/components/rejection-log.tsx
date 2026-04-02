import type { Broker } from "@/data/types";

interface RejectionLogProps {
  log: Broker["rejectionLog"];
}

export function RejectionLog({ log }: RejectionLogProps) {
  return (
    <div className="border-t border-border pt-3.5 mt-3.5">
      <div className="flex justify-between items-center mb-2.5">
        <h3 className="text-[13px] font-semibold">Rejection Log</h3>
        <div className="text-[9px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {log.totalReturned} of {log.totalHooks} hooks returned ·{" "}
          {log.returnRate} return rate
        </div>
      </div>

      <div className="flex flex-col">
        {/* Rejection entries */}
        {log.entries.map((entry) => (
          <div
            key={entry.hookNumber}
            className="relative ml-2 border-l-2 border-[var(--color-red)] py-2.5 px-3.5"
          >
            {/* Red dot */}
            <div className="absolute -left-[5px] top-3.5 w-2 h-2 rounded-full bg-[var(--color-red)]" />

            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <div className="text-[10px] font-semibold text-[var(--color-red)]">
                RETURNED
              </div>
              <div className="text-[10px] text-muted-foreground">
                Hook #{entry.hookNumber} · {entry.date}
              </div>
            </div>

            {/* Reason */}
            <div className="text-xs mb-1.5">{entry.reason}</div>

            {/* System analysis card */}
            <div className="rounded-lg border border-border p-3 bg-muted/50">
              <div className="text-[10px] font-semibold text-foreground mb-0.5">
                System analysis
              </div>
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                {entry.systemAnalysis}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-semibold text-[var(--color-green)]">
                  → Guardrail added:
                </span>
                <span className="text-[10px] bg-[rgba(255,107,107,0.08)] text-foreground px-2 py-0.5 rounded border border-[rgba(255,107,107,0.15)]">
                  {entry.guardrailAdded}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Green footer -- no returns since */}
        <div className="relative ml-2 border-l-2 border-[var(--color-green)] py-2.5 px-3.5">
          <div className="absolute -left-[5px] top-3.5 w-2 h-2 rounded-full bg-[var(--color-green)]" />
          <div className="text-[10px] font-semibold text-[var(--color-green)] mb-0.5">
            NO RETURNS SINCE
          </div>
          <div className="text-[11px] text-muted-foreground">
            {log.consecutiveAccepted} consecutive hooks accepted ·{" "}
            {log.consecutiveAcceptedSince} → present
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Return rate:{" "}
            <strong className="text-foreground">
              {log.returnRateTrend.month1}
            </strong>{" "}
            (month 1) →{" "}
            <strong className="text-[var(--color-green)]">
              {log.returnRateTrend.month3}
            </strong>{" "}
            (month 3)
          </div>
        </div>
      </div>
    </div>
  );
}
