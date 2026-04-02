import { useState } from "react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import type { Broker, HookApproachRule } from "@/data/types";

interface BrandIntelligenceProps {
  broker: Broker;
}

/* -- Component ---------------------------------------------------------- */

export function BrandIntelligence({ broker }: BrandIntelligenceProps) {
  const bi = broker.brandIntelligence;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-1">Brand Intelligence</h2>
        <p className="text-xs text-muted-foreground mb-5">
          Extracted from website, social, and market data
        </p>

        {/* Section 1: Brand DNA */}
        <BrandDnaSection
          whoTheyAre={bi.whoTheyAre}
          tags={bi.communicationStyle.tags}
          voice={bi.communicationStyle.voiceDescription}
        />

        <Separator className="my-5" />

        {/* Section 2: Audience */}
        <AudienceSection audience={bi.targetAudience} />

        <Separator className="my-5" />

        {/* Section 3: Hook Rules */}
        <HookRulesSection rules={bi.hookApproachRules} />

        <Separator className="my-5" />

        {/* Section 4: Guardrails */}
        <GuardrailsSection guardrails={bi.guardrails} />
      </CardContent>
    </Card>
  );
}

/* -- Section 1: Brand DNA ----------------------------------------------- */

function BrandDnaSection({
  whoTheyAre,
  tags,
  voice,
}: {
  whoTheyAre: string;
  tags: string[];
  voice: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Brand DNA</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {whoTheyAre}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <blockquote className="border-l-2 border-border pl-3 text-sm text-muted-foreground italic">
        {voice}
      </blockquote>
    </div>
  );
}

/* -- Section 2: Audience ------------------------------------------------ */

function AudienceSection({
  audience,
}: {
  audience: Broker["brandIntelligence"]["targetAudience"];
}) {
  const items = [
    { label: "Primary demographic", value: audience.demographic },
    { label: "Price segment", value: audience.priceSegment },
    { label: "Geographic focus", value: audience.geographicFocus },
    { label: "Social presence", value: audience.socialPresence },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Audience</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="text-[11px] text-muted-foreground mb-0.5">
              {item.label}
            </div>
            <div className="text-sm font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -- Section 3: Hook Rules ---------------------------------------------- */

function statusBadge(status: HookApproachRule["status"]) {
  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          className="text-[var(--color-green)] border-[var(--color-green)]/30 gap-1"
        >
          <Check className="w-3 h-3" />
          Approved
        </Badge>
      );
    case "blocked":
      return (
        <Badge variant="destructive" className="gap-1">
          <X className="w-3 h-3" />
          Blocked
        </Badge>
      );
    case "conditional":
      return (
        <Badge
          variant="outline"
          className="text-[var(--color-orange)] border-[var(--color-orange)]/30 gap-1"
        >
          <AlertTriangle className="w-3 h-3" />
          Conditional
        </Badge>
      );
  }
}

function statusBorderColor(status: HookApproachRule["status"]) {
  switch (status) {
    case "approved":
      return "border-l-[var(--color-green)]";
    case "blocked":
      return "border-l-destructive";
    case "conditional":
      return "border-l-[var(--color-orange)]";
  }
}

function HookRulesSection({ rules }: { rules: HookApproachRule[] }) {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Hook Approach Rules</h3>
      <div className="flex flex-col gap-2">
        {rules.map((rule) => {
          const isExpanded = expandedRule === rule.hookType;
          return (
            <button
              key={rule.hookType}
              type="button"
              onClick={() =>
                setExpandedRule(isExpanded ? null : rule.hookType)
              }
              className={cn(
                "text-left rounded-md border border-border border-l-2 px-3 py-2.5 transition-colors hover:bg-muted/50",
                statusBorderColor(rule.status),
                isExpanded && "bg-muted/50",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold truncate">
                    {rule.hookType}
                  </span>
                  {statusBadge(rule.status)}
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
              {isExpanded && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-2 pt-2 border-t border-border">
                  {rule.reasoning}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -- Section 4: Guardrails ---------------------------------------------- */

function GuardrailsSection({
  guardrails,
}: {
  guardrails: Broker["brandIntelligence"]["guardrails"];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Guardrails</h3>
      <div className="flex flex-col divide-y divide-border">
        {guardrails.map((g) => (
          <div
            key={g.rule}
            className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0"
          >
            {g.severity === "hard" ? (
              <ShieldAlert className="w-4 h-4 shrink-0 text-destructive mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-[var(--color-orange)] mt-0.5" />
            )}
            <span
              className={cn(
                "text-sm leading-relaxed",
                g.severity === "hard"
                  ? "text-destructive"
                  : "text-[var(--color-orange)]",
              )}
            >
              {g.rule}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
