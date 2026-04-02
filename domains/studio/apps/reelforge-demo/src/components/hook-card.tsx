import { cn } from "@/lib";
import { InsightLine } from "@/components/source-tag";
import { getHookType } from "@/data/get-data";
import type { HookSelectionResult } from "@/data/types";

interface HookCardProps {
  result: HookSelectionResult;
}

const complexityColor: Record<string, string> = {
  Low: "text-[var(--color-green)] bg-[var(--color-green-subtle)]",
  Medium: "text-[var(--color-orange)] bg-[color:oklch(0.7_0.15_70/0.12)]",
  High: "text-[var(--color-red)] bg-[color:oklch(0.7_0.2_25/0.12)]",
};

export function HookCard({ result }: HookCardProps) {
  const hookType = getHookType(result.hookTypeId);
  if (!hookType) return null;

  const isRecommended = result.status === "recommended";
  const isBlocked = result.status === "blocked";
  const isWeak = result.status === "weak";

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden relative transition-all duration-200",
        isRecommended && "card-hero border-2 border-[var(--color-green)] shadow-[0_0_20px_oklch(0.48_0.14_150/10%)]",
        !isRecommended && "card-elevated",
        isBlocked && "opacity-50",
      )}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[var(--color-green)] text-background px-3 py-0.5 rounded-b-lg text-[9px] font-bold uppercase tracking-[0.06em]">
          Recommended
        </div>
      )}

      {/* Blocked badge */}
      {isBlocked && (
        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[var(--color-red)] text-background px-3 py-0.5 rounded-b-lg text-[9px] font-bold uppercase tracking-[0.06em]">
          Blocked
        </div>
      )}

      {/* Header */}
      <div className="px-3.5 pt-3.5 pb-2.5 flex justify-between items-start">
        <div className="flex gap-2.5 items-center">
          <div className="text-[22px]">{hookType.icon}</div>
          <div>
            <div className="font-bold text-[14px]">{hookType.name}</div>
            <div className="text-[10px] text-muted-foreground">
              {hookType.description}
            </div>
          </div>
        </div>
        <span
          className={cn(
            "text-[9px] font-semibold px-2 py-0.5 rounded whitespace-nowrap",
            isBlocked
              ? "text-[var(--color-red)] bg-[color:oklch(0.7_0.2_25/0.12)]"
              : complexityColor[result.complexity],
          )}
        >
          {isBlocked ? "Blocked" : `Complexity: ${result.complexity}`}
        </span>
      </div>

      {/* Body */}
      <div className="px-3.5 pb-3 flex flex-col gap-1.5 text-[11px]">
        {/* Hallucination risk */}
        <div
          className={cn(
            "rounded-md p-2",
            isBlocked
              ? "bg-[rgba(255,107,107,0.04)] border border-[rgba(255,107,107,0.1)]"
              : "bg-background",
          )}
        >
          <div
            className={cn(
              "font-semibold mb-0.5 text-[10px]",
              isBlocked
                ? "text-[var(--color-red)]"
                : "text-foreground",
            )}
          >
            Hallucination risk{isBlocked ? `: ${result.hallucinationRisk.level}` : ""}
          </div>
          <div className="text-muted-foreground">
            {!isBlocked && (
              <span className="font-semibold">
                {result.hallucinationRisk.level} —{" "}
              </span>
            )}
            {result.hallucinationRisk.explanation}
          </div>
        </div>

        {/* Source-tagged insights */}
        {result.insights.map((insight, i) => (
          <InsightLine key={i} insight={insight} />
        ))}

        {/* Assets matched footer */}
        <div className="border-t border-border pt-1.5 mt-0.5">
          {isBlocked && result.blockedReason ? (
            <div className="text-[10px] text-[var(--color-red)]">
              {result.blockedReason}
            </div>
          ) : (
            <>
              <div className="text-[10px] text-muted-foreground mb-0.5">
                Assets matched:{" "}
                <strong
                  className={cn(
                    isRecommended && "text-[var(--color-green)]",
                    isWeak && "text-[var(--color-orange)]",
                  )}
                >
                  {result.assetsMatched.matched}/{result.assetsMatched.total}
                </strong>
              </div>
              {result.assetsMatched.details.length > 0 && (
                <div className="text-[10px] text-muted-foreground">
                  {result.assetsMatched.details.join(" · ")}
                </div>
              )}
              {result.assetsMatched.missingNote && (
                <div className="text-[10px] text-[var(--color-orange)]">
                  {result.assetsMatched.missingNote}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
