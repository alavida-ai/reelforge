import { useState, useCallback } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Target, BarChart3 } from "lucide-react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { SourceTag } from "@/components/source-tag";
import { ThinProgress } from "@/components/thin-progress";
import { getBroker, getHookType, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/risk")({
  component: RiskPage,
  validateSearch: (search: Record<string, unknown>) => ({
    hook: (search.hook as string) ?? "",
  }),
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const AGENT_STEPS: AgentStep[] = [
  { label: "Calculating hallucination risk...", duration: 800 },
  { label: "Evaluating brand compliance...", duration: 600 },
  { label: "Checking broker track record...", duration: 600 },
  { label: "Generating recommendation...", duration: 500 },
];

function RiskPage() {
  const { slug } = Route.useParams();
  const { hook: hookId } = Route.useSearch();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const hookResult = broker?.hookSelectionResults.find(
    (r) => r.hookTypeId === hookId,
  );
  const hookType = getHookType(hookId);

  const handleStepComplete = useCallback((stepIndex: number) => {
    setVisibleSections(stepIndex + 1);
  }, []);

  const handleComplete = useCallback(() => {
    setAssessmentComplete(true);
  }, []);

  if (!broker || !hookResult || !hookType) {
    return <p className="text-muted-foreground">Hook not found.</p>;
  }

  const riskDimensions = [
    {
      label: "Hallucination complexity",
      value: hookResult.hallucinationRisk.level,
      percent: hookResult.hallucinationRisk.level === "Low" ? 15 : hookResult.hallucinationRisk.level === "Medium" ? 50 : 85,
      color: hookResult.hallucinationRisk.level === "Low" ? "var(--color-green)" : hookResult.hallucinationRisk.level === "Medium" ? "var(--color-orange)" : "var(--color-red)",
      source: "GUARDRAIL" as const,
      detail: hookResult.hallucinationRisk.explanation,
    },
    {
      label: "Brand fit",
      value: hookResult.status === "recommended" ? "Strong" : hookResult.status === "available" ? "Good" : "Weak",
      percent: hookResult.status === "recommended" ? 85 : hookResult.status === "available" ? 65 : 30,
      color: hookResult.status === "recommended" ? "var(--color-green)" : "var(--color-orange)",
      source: "BROKER" as const,
      detail: broker.brandIntelligence.hookApproachRules.find((r) => r.hookType === hookType.name)?.reasoning ?? "Matches broker brand profile",
    },
    {
      label: "Asset coverage",
      value: `${hookResult.assetsMatched.matched}/${hookResult.assetsMatched.total}`,
      percent: (hookResult.assetsMatched.matched / hookResult.assetsMatched.total) * 100,
      color: hookResult.assetsMatched.matched === hookResult.assetsMatched.total ? "var(--color-green)" : "var(--color-orange)",
      source: undefined,
      detail: hookResult.assetsMatched.missingNote ?? "All required assets available",
    },
    {
      label: "Market signal",
      value: "3.2x",
      percent: 78,
      color: "var(--color-green)",
      source: "MARKET" as const,
      detail: "Top performer for Dutch suburban real estate",
    },
  ];

  return (
    <div>
      <Card className="mb-4">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="text-[22px]">{hookType.icon}</div>
          <div>
            <div className="font-bold text-[14px]">{hookType.name}</div>
            <div className="text-[11px] text-muted-foreground">{hookType.description}</div>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-green-subtle)] text-[var(--color-green)] font-semibold">
              Complexity: {hookResult.complexity}
            </span>
          </div>
        </CardContent>
      </Card>

      <AgentStatus
        steps={AGENT_STEPS}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {visibleSections >= 1 && (
        <motion.div {...fadeSlide} className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Risk Assessment
            </span>
          </div>
          <div className="space-y-3">
            {riskDimensions.slice(0, Math.min(visibleSections, riskDimensions.length)).map((dim, i) => (
              <motion.div
                key={dim.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold">{dim.label}</span>
                      <span
                        className="font-mono text-[11px] font-semibold"
                        style={{ color: dim.color }}
                      >
                        {dim.value}
                      </span>
                    </div>
                    <ThinProgress percent={dim.percent} color={dim.color} className="mb-1.5" />
                    <div className="flex items-center gap-1">
                      {dim.source && <SourceTag type={dim.source} />}
                      <span className="text-[10px] text-muted-foreground">{dim.detail}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {assessmentComplete && (
        <motion.div {...fadeSlide}>
          <Card className="mb-4 border-[var(--color-green)]/30">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-3.5 w-3.5 text-[var(--color-green)]" />
                <span className="text-[12px] font-bold text-[var(--color-green)]">
                  Recommendation: {hookType.name}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">
                Creative ambition and return rate are directly proportional. This
                hook scores <strong className="text-foreground">{hookResult.hallucinationRisk.level}</strong> risk,
                protecting {broker.name}'s{" "}
                <strong className="text-[var(--color-green)]">{broker.rejectionLog.returnRate}</strong> return rate.
              </p>
              <p className="text-[11px] text-muted-foreground">
                Lowest complexity. Best brand fit. Strongest market signal.{" "}
                {broker.rejectionLog.consecutiveAccepted} consecutive accepts on this hook type.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Market Reference
                </span>
              </div>
              <div className="space-y-1">
                {marketData.referencePosts.map((post, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-muted rounded px-2 py-1.5 text-[10px]"
                  >
                    <span className="text-muted-foreground">{post.description}</span>
                    <span className="font-mono font-semibold">{post.views}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            onClick={() =>
              navigate({
                to: "/broker/$slug/reveal",
                params: { slug },
              })
            }
          >
            Generate {hookType.name}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
