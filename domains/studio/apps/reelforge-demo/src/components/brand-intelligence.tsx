import { cn } from "@/lib";
import { SectionLabel } from "@/components/section-label";
import { RejectionLog } from "@/components/rejection-log";
import type { Broker, HookApproachRule, Guardrail } from "@/data/types";

interface BrandIntelligenceProps {
  broker: Broker;
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function statusIcon(status: HookApproachRule["status"]) {
  switch (status) {
    case "approved":
      return (
        <span className="text-[var(--color-green)] shrink-0">✓</span>
      );
    case "blocked":
      return (
        <span className="text-[var(--color-red)] shrink-0">✗</span>
      );
    case "conditional":
      return (
        <span className="text-[var(--color-orange)] shrink-0">~</span>
      );
  }
}

function guardrailStyle(severity: Guardrail["severity"]) {
  if (severity === "hard") {
    return "bg-[rgba(255,107,107,0.06)] border-[rgba(255,107,107,0.12)] text-[var(--color-red)]";
  }
  return "bg-[rgba(255,152,0,0.06)] border-[rgba(255,152,0,0.12)] text-[var(--color-orange)]";
}

function guardrailIcon(severity: Guardrail["severity"]) {
  return severity === "hard" ? "⛔" : "⚠️";
}

/* ── Component ───────────────────────────────────────────────────────── */

export function BrandIntelligence({ broker }: BrandIntelligenceProps) {
  const bi = broker.brandIntelligence;

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3.5">
        <SectionLabel className="mb-0">Brand Intelligence</SectionLabel>
        <div className="text-[9px] text-muted-foreground bg-background px-2 py-0.5 rounded">
          Extracted from website + social + market data
        </div>
      </div>

      {/* Section 1: Who they are */}
      <div className="border-b border-border pb-3 mb-3">
        <h3 className="text-[13px] font-semibold mb-1">Who they are</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <WhoTheyAreText text={bi.whoTheyAre} />
        </p>
      </div>

      {/* Section 2: Target audience signal */}
      <div className="border-b border-border pb-3 mb-3">
        <h3 className="text-[13px] font-semibold mb-2">
          Target audience signal
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          <AudienceMiniCard
            label="Primary demographic"
            value={bi.targetAudience.demographic}
          />
          <AudienceMiniCard
            label="Price segment"
            value={bi.targetAudience.priceSegment}
          />
          <AudienceMiniCard
            label="Geographic focus"
            value={bi.targetAudience.geographicFocus}
          />
          <AudienceMiniCard
            label="Social presence"
            value={bi.targetAudience.socialPresence}
          />
        </div>
      </div>

      {/* Section 3: Communication style */}
      <div className="border-b border-border pb-3 mb-3">
        <h3 className="text-[13px] font-semibold mb-2">
          Communication style
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {bi.communicationStyle.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-green-subtle)] text-[var(--color-green)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Voice:{" "}
          <strong className="text-foreground">
            {bi.communicationStyle.voiceDescription}
          </strong>
        </p>
      </div>

      {/* Section 4: Hook approach rules */}
      <div className="border-b border-border pb-3 mb-3">
        <h3 className="text-[13px] font-semibold mb-2">
          Hook approach rules
        </h3>
        <div className="flex flex-col gap-1.5">
          {bi.hookApproachRules.map((rule) => (
            <div
              key={rule.hookType}
              className="flex items-center gap-2 text-xs"
            >
              {statusIcon(rule.status)}
              <span
                className={cn(
                  rule.status === "blocked" && "text-muted-foreground",
                )}
              >
                <strong>{rule.hookType}</strong> — {rule.reasoning}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Brand guardrails */}
      <div>
        <h3 className="text-[13px] font-semibold mb-2">Brand guardrails</h3>
        <div className="flex flex-col gap-1.5">
          {bi.guardrails.map((g) => (
            <div
              key={g.rule}
              className={cn(
                "flex items-start gap-2 text-xs px-2.5 py-2 rounded-md border",
                guardrailStyle(g.severity),
              )}
            >
              <span>{guardrailIcon(g.severity)}</span>
              <span className="text-foreground">{g.rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Rejection log */}
      <RejectionLog log={broker.rejectionLog} />
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function AudienceMiniCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-border rounded-md px-2 py-1.5">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="text-xs font-medium">{value}</div>
    </div>
  );
}

/**
 * Renders the "who they are" paragraph with key phrases bolded.
 * Bolds text within double-asterisks or known key phrases.
 */
function WhoTheyAreText({ text }: { text: string }) {
  // Bold key phrases that match the mockup emphasis
  const keyPhrases = [
    "modern, approachable real estate platform",
    "making it easy",
    "feeling at home",
  ];

  const parts: Array<{ text: string; bold: boolean }> = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedPhrase = "";

    for (const phrase of keyPhrases) {
      const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedPhrase = phrase;
      }
    }

    if (matchedPhrase && earliestIndex < remaining.length) {
      if (earliestIndex > 0) {
        parts.push({ text: remaining.slice(0, earliestIndex), bold: false });
      }
      parts.push({
        text: remaining.slice(earliestIndex, earliestIndex + matchedPhrase.length),
        bold: true,
      });
      remaining = remaining.slice(earliestIndex + matchedPhrase.length);
    } else {
      parts.push({ text: remaining, bold: false });
      remaining = "";
    }
  }

  return (
    <>
      {parts.map((part, i) =>
        part.bold ? (
          <strong key={i} className="text-foreground">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
