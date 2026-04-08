import { useState } from "react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  ChevronDown,
  Bot,
  DoorOpen,
  SplitSquareHorizontal,
  Film,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import type { Broker, HookApproachRule } from "@/data/types";

export function BrandIntelligence({ broker }: { broker: Broker }) {
  const bi = broker.brandIntelligence;

  return (
    <Card>
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Brain className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-medium text-foreground uppercase tracking-wide text-xs">
          Brand Intelligence
        </h2>
      </div>

      <div className="flex flex-col">
        {/* Brand DNA */}
        <div className="p-5 border-b border-border flex flex-col gap-4">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            System Understanding
          </h3>
          <p className="text-foreground leading-relaxed">{bi.whoTheyAre}</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {bi.communicationStyle.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full border border-border bg-background text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <blockquote className="mt-2 pl-3 border-l-2 border-border text-muted-foreground italic text-sm">
            {bi.communicationStyle.voiceDescription}
          </blockquote>
        </div>

        {/* Target Audience */}
        <div className="p-5 border-b border-border grid grid-cols-2 gap-y-4 gap-x-8 bg-accent/30">
          {[
            { label: "Primary Demo", value: bi.targetAudience.demographic },
            { label: "Price Segment", value: bi.targetAudience.priceSegment },
            { label: "Geography", value: bi.targetAudience.geographicFocus },
            { label: "Social Channels", value: bi.targetAudience.socialPresence },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Hook Approach Rules */}
        <HookRulesSection rules={bi.hookApproachRules} />

        {/* Guardrails */}
        <div className="p-5 flex flex-col gap-3">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Active Guardrails
          </span>
          {bi.guardrails.map((g, i) => (
            <div key={i} className="flex items-start gap-3 bg-background border border-border p-3 rounded-lg">
              {g.severity === "hard" ? (
                <XCircle className="h-4 w-4 text-[var(--color-red)] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-[var(--color-orange)] shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "font-mono text-xs font-medium",
                    g.severity === "hard" ? "text-[var(--color-red)]" : "text-[var(--color-orange)]"
                  )}
                >
                  {g.severity === "hard" ? "HARD CONSTRAINT" : "WARNING"}
                </span>
                <span className="text-foreground text-sm">{g.rule}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function getHookIcon(hookType: string) {
  if (hookType.includes("Influencer")) return Bot;
  if (hookType.includes("Door")) return DoorOpen;
  if (hookType.includes("Before") || hookType.includes("After")) return SplitSquareHorizontal;
  if (hookType.includes("Cinematic") || hookType.includes("Drone")) return Film;
  if (hookType.includes("Price")) return DoorOpen;
  if (hookType.includes("Luxury")) return Film;
  return Bot;
}

function HookRulesSection({ rules }: { rules: HookApproachRule[] }) {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const statusConfig = {
    approved: {
      color: "bg-[var(--color-green)]/10 text-[var(--color-green)] border-[var(--color-green)]/20",
      borderColor: "bg-[var(--color-green)]",
      label: "Approved",
    },
    blocked: {
      color: "bg-[var(--color-red)]/10 text-[var(--color-red)] border-[var(--color-red)]/20",
      borderColor: "bg-[var(--color-red)]",
      label: "Blocked",
    },
    conditional: {
      color: "bg-[var(--color-orange)]/10 text-[var(--color-orange)] border-[var(--color-orange)]/20",
      borderColor: "bg-[var(--color-orange)]",
      label: "Conditional",
    },
  };

  return (
    <div className="border-b border-border">
      <div className="px-5 py-3 border-b border-border bg-background/50">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Template Logic Engine
        </span>
      </div>
      <ul className="flex flex-col">
        {rules.map((rule) => {
          const config = statusConfig[rule.status];
          const Icon = getHookIcon(rule.hookType);
          const isExpanded = expandedRule === rule.hookType;
          const isBlocked = rule.status === "blocked";

          return (
            <li key={rule.hookType} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => setExpandedRule(isExpanded ? null : rule.hookType)}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-accent/50 cursor-pointer transition-colors relative"
              >
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.borderColor)} />
                <div className="flex items-center gap-3">
                  <div className="bg-accent p-1.5 rounded border border-border">
                    <Icon className={cn("h-4 w-4", isBlocked ? "text-muted-foreground" : "text-foreground")} />
                  </div>
                  <span className={cn("font-medium", isBlocked && "text-muted-foreground line-through")}>
                    {rule.hookType}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("px-2 py-0.5 rounded text-xs border", config.color)}>
                    {config.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>
              </button>
              {isExpanded && (
                <div className="px-5 pb-3 pl-[4.5rem]">
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {rule.reasoning}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
