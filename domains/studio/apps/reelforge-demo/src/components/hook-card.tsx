import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { DoorOpen, Tag, SplitSquareHorizontal, Camera, AlertCircle, XCircle, AlertTriangle } from "lucide-react";
import { getHookType } from "@/data/get-data";
import type { HookSelectionResult } from "@/data/types";

interface HookCardProps {
  result: HookSelectionResult;
  selected?: boolean;
  onSelect?: () => void;
}

const complexityConfig = {
  Low: { color: "text-[var(--color-green)] bg-[var(--color-green)]/10 border-[var(--color-green)]/20", label: "LOW" },
  Medium: { color: "text-[var(--color-orange)] bg-[var(--color-orange)]/10 border-[var(--color-orange)]/20", label: "MEDIUM" },
  High: { color: "text-[var(--color-red)] bg-[var(--color-red)]/10 border-[var(--color-red)]/20", label: "HIGH" },
};

const riskIcons = {
  Low: AlertCircle,
  Medium: AlertTriangle,
  High: XCircle,
};

function getIconForHook(hookTypeId: string) {
  if (hookTypeId.includes("door")) return DoorOpen;
  if (hookTypeId.includes("price")) return Tag;
  if (hookTypeId.includes("before") || hookTypeId.includes("after")) return SplitSquareHorizontal;
  return Camera;
}

function SourceTag({ source }: { source: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    MARKET: { bg: "bg-[var(--color-market-bg)]", text: "text-[var(--color-market)]", label: "MARKET" },
    BROKER: { bg: "bg-[var(--color-broker-bg)]", text: "text-[var(--color-broker)]", label: "BROKER" },
    GUARDRAIL: { bg: "bg-[var(--color-guardrail-bg)]", text: "text-[var(--color-guardrail)]", label: "GUARDRAIL" },
  };
  const c = config[source] ?? config.MARKET;
  return (
    <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[0.65rem] font-semibold tracking-wide mr-2 border shrink-0", c.bg, c.text, `border-${source === "MARKET" ? "[var(--color-market)]" : source === "BROKER" ? "[var(--color-broker)]" : "[var(--color-guardrail)]"}/20`)}>
      {c.label}
    </span>
  );
}

export function HookCard({ result, selected, onSelect }: HookCardProps) {
  const hookType = getHookType(result.hookTypeId);
  if (!hookType) return null;

  const isRecommended = result.status === "recommended";
  const isBlocked = result.status === "blocked";
  const isWeak = result.status === "weak";
  const Icon = getIconForHook(result.hookTypeId);
  const RiskIcon = riskIcons[result.hallucinationRisk.level];

  if (isBlocked) {
    return (
      <Card className="relative overflow-hidden opacity-50 bg-[oklch(0.10_0.005_270)]">
        {/* Blocked badge */}
        <div className="absolute top-4 right-4 bg-[var(--color-red)]/20 border border-[var(--color-red)]/30 text-[var(--color-red)] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider z-10">
          Rule Blocked
        </div>

        <CardContent className="p-5 flex flex-col gap-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-muted-foreground line-through">{hookType.name}</h3>
              <p className="text-sm text-muted-foreground/70 mt-0.5">{hookType.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground font-mono uppercase">Complexity:</span>
            <span className="text-xs font-mono text-[var(--color-red)] bg-[var(--color-red)]/10 px-1.5 py-0.5 rounded border border-[var(--color-red)]/20">BLOCKED</span>
          </div>

          <div className="bg-background border border-border rounded p-3 text-sm flex gap-3 items-start opacity-70">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider block mb-1">
                Hallucination Risk: {result.hallucinationRisk.level}
              </span>
              <span className="text-muted-foreground leading-relaxed text-[13px]">
                {result.hallucinationRisk.explanation}
              </span>
            </div>
          </div>
        </CardContent>

        {/* Blocked footer */}
        <div className="p-4 border-t border-border bg-[var(--color-red)]/5 relative z-10">
          <div className="flex items-start gap-2 text-sm">
            <XCircle className="h-4 w-4 text-[var(--color-red)] mt-0.5 shrink-0" />
            <div>
              <p className="text-[var(--color-red)] font-medium">{result.blockedReason}</p>
              <p className="text-[11px] text-[var(--color-red)]/70 mt-1 uppercase font-mono tracking-wide">
                Broker Rule: Blocked by system override
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden flex flex-col transition-all cursor-pointer",
        isRecommended && !selected && "border-[var(--color-green)]",
        selected && "ring-1 ring-foreground border-foreground bg-accent/30",
        !selected && "hover:bg-accent/20",
        isWeak && "opacity-80 hover:opacity-100",
      )}
      onClick={onSelect}
    >
      {/* Top accent bar for recommended */}
      {isRecommended && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-green)]" />}

      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4 bg-[var(--color-green)] text-background text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
          Recommended
        </div>
      )}

      {/* Weak badge */}
      {isWeak && (
        <div className="absolute top-4 right-4 text-[10px] font-mono border border-border px-1.5 rounded text-muted-foreground uppercase">
          Weak Match
        </div>
      )}

      <CardContent className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded border border-border bg-accent flex items-center justify-center">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{hookType.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{hookType.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground font-mono uppercase">Complexity:</span>
          <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded border", complexityConfig[result.complexity].color)}>
            {complexityConfig[result.complexity].label}
          </span>
        </div>

        {/* Hallucination Risk */}
        <div className="bg-background border border-border rounded p-3 text-sm flex gap-3 items-start">
          <RiskIcon className={cn("h-4 w-4 mt-0.5 shrink-0", result.hallucinationRisk.level === "Medium" ? "text-[var(--color-orange)]" : "text-muted-foreground")} />
          <div>
            <span className="font-semibold text-foreground text-xs uppercase tracking-wider block mb-1">
              Hallucination Risk: {result.hallucinationRisk.level}
            </span>
            <span className="text-muted-foreground leading-relaxed text-[13px]">
              {result.hallucinationRisk.explanation}
            </span>
          </div>
        </div>

        {/* Source-tagged insights */}
        <div className="flex flex-col gap-2 mt-2 text-sm">
          {result.insights.map((insight, i) => (
            <div key={i} className="flex items-start leading-snug">
              <SourceTag source={insight.source} />
              <span className="text-muted-foreground">{insight.text}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer: Assets matched */}
      <div className="p-4 border-t border-border flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Assets matched:{" "}
            <span className={cn(
              "font-mono font-medium",
              isRecommended ? "text-[var(--color-green)]" : isWeak ? "text-[var(--color-orange)]" : "text-foreground"
            )}>
              {result.assetsMatched.matched}/{result.assetsMatched.total}
            </span>
          </div>
          {result.assetsMatched.details.length > 0 && (
            <div className="text-[11px] font-mono text-muted-foreground text-right">
              {result.assetsMatched.details.map((d, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-border mx-1">/</span>}
                  {d.split(" (")[0].toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
        {result.assetsMatched.missingNote && (
          <div className="text-[11px] text-[var(--color-orange)] flex items-center gap-1.5 mt-1">
            <AlertTriangle className="h-3 w-3 shrink-0" /> {result.assetsMatched.missingNote}
          </div>
        )}
      </div>
    </Card>
  );
}
