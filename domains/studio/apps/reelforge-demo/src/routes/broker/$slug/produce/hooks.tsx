import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, TrendingUp, GitCompare } from "lucide-react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { SourceTagLegend } from "@/components/source-tag";
import { HookCard } from "@/components/hook-card";
import { getBroker, getHookType, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/hooks")({
  component: HooksPage,
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

function HooksPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const navigate = useNavigate();

  const [showRules, setShowRules] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [visibleHooks, setVisibleHooks] = useState(0);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);

  const hookResults = broker?.hookSelectionResults ?? [];

  const agentSteps: AgentStep[] = useMemo(
    () => [
      { label: "Loading broker brand rules...", duration: 600 },
      { label: "Pulling market data...", duration: 800 },
      ...hookResults.map((r) => ({
        label: `Matching assets to ${getHookType(r.hookTypeId)?.name ?? r.hookTypeId}...`,
        duration: 600,
      })),
    ],
    [hookResults],
  );

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      if (stepIndex === 0) setShowRules(true);
      if (stepIndex === 1) setShowMarket(true);
      if (stepIndex >= 2) setVisibleHooks(stepIndex - 1);
    },
    [],
  );

  const handleComplete = useCallback(() => {
    setVisibleHooks(hookResults.length);
    setMatchingComplete(true);
    const recommended = hookResults.find((r) => r.status === "recommended");
    if (recommended) setSelectedHook(recommended.hookTypeId);
  }, [hookResults]);

  if (!broker) {
    return <p className="text-muted-foreground">Broker not found.</p>;
  }

  const selectedHookName = selectedHook
    ? getHookType(selectedHook)?.name ?? "Hook"
    : null;

  return (
    <div>
      <AgentStatus
        steps={agentSteps}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {showRules && (
        <motion.div {...fadeSlide} className="mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Broker Brand Rules
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {broker.brandIntelligence.hookApproachRules.map((rule) => (
                  <span
                    key={rule.hookType}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded border",
                      rule.status === "approved" && "border-[var(--color-green)]/30 text-[var(--color-green)]",
                      rule.status === "blocked" && "border-[var(--color-red)]/30 text-[var(--color-red)]",
                      rule.status === "conditional" && "border-[var(--color-orange)]/30 text-[var(--color-orange)]",
                    )}
                  >
                    {rule.status === "approved" ? "+" : rule.status === "blocked" ? "x" : "~"}{" "}
                    {rule.hookType}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {broker.brandIntelligence.guardrails.map((g, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[9px] px-2 py-0.5 rounded",
                      g.severity === "hard"
                        ? "bg-[var(--color-guardrail-bg)] text-[var(--color-guardrail)]"
                        : "bg-[color:oklch(0.7_0.15_70/0.12)] text-[var(--color-orange)]",
                    )}
                  >
                    {g.rule}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {showMarket && (
        <motion.div {...fadeSlide} className="mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Market Data
                </span>
              </div>
              <div className="flex gap-4 text-[11px]">
                <span>
                  <span className="text-muted-foreground">Posts: </span>
                  <span className="font-mono font-semibold">{marketData.totalPosts}</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Geography: </span>
                  <span>{marketData.geography}</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Period: </span>
                  <span>{marketData.period}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {visibleHooks > 0 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitCompare className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Hook Matching Results
            </span>
          </div>
          <SourceTagLegend />
        </div>
      )}

      {visibleHooks > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {hookResults.slice(0, visibleHooks).map((result, i) => (
            <motion.div
              key={result.hookTypeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <HookCard
                result={result}
                selected={selectedHook === result.hookTypeId}
                onSelect={() => {
                  if (result.status !== "blocked") {
                    setSelectedHook(result.hookTypeId);
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {matchingComplete && (
        <motion.div {...fadeSlide}>
          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-4 text-[11px] text-muted-foreground">
            Hook selection considers brand compliance (return rate), asset
            coverage (production quality), and market performance (engagement).
          </div>
          <Button
            className="w-full"
            disabled={!selectedHook}
            onClick={() =>
              navigate({
                to: "/broker/$slug/produce/risk",
                params: { slug },
                search: { hook: selectedHook! },
              })
            }
          >
            {selectedHook
              ? `Continue with ${selectedHookName}`
              : "Select a hook to continue"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
