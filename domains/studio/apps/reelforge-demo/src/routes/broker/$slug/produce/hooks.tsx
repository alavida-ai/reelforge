import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, TrendingUp, GitCompare, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { HookCard } from "@/components/hook-card";
import { getBroker, getHookType, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/hooks")({
  component: HooksPage,
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
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
    <div className="flex flex-col gap-6">
      {/* Agent Status */}
      <AgentStatus
        steps={agentSteps}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Context Cards */}
      {(showRules || showMarket) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Broker Brand Rules */}
          {showRules && (
            <motion.div {...fadeSlide}>
              <Card className="h-full">
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4 text-foreground" />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Broker Brand Rules
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    {broker.brandIntelligence.hookApproachRules.map((rule) => (
                      <span
                        key={rule.hookType}
                        className={cn(
                          "px-2 py-1 rounded border",
                          rule.status === "approved" && "border-[var(--color-green)] text-foreground",
                          rule.status === "blocked" && "border-[var(--color-red)] text-muted-foreground opacity-60",
                          rule.status === "conditional" && "border-[var(--color-orange)] text-muted-foreground",
                        )}
                      >
                        {rule.status === "approved" ? "+" : rule.status === "blocked" ? "x" : "~"}{" "}
                        {rule.hookType}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {broker.brandIntelligence.guardrails.map((g, i) => (
                      <span
                        key={i}
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
                          g.severity === "hard"
                            ? "bg-[var(--color-red)]/10 text-[var(--color-red)] border-[var(--color-red)]/20"
                            : "bg-[var(--color-orange)]/10 text-[var(--color-orange)] border-[var(--color-orange)]/20",
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

          {/* Market Data */}
          {showMarket && (
            <motion.div {...fadeSlide}>
              <Card className="h-full">
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-foreground" />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Market Data Context
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-4">
                    <div className="flex items-baseline justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted-foreground">Dataset Density</span>
                      <span className="font-mono text-lg font-medium text-foreground">
                        {marketData.totalPosts}{" "}
                        <span className="text-[10px] text-muted-foreground ml-1 uppercase tracking-widest">Posts</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-muted-foreground mb-1 tracking-wider">
                          Geography
                        </span>
                        <span className="text-sm text-foreground font-medium">{marketData.geography}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono text-muted-foreground mb-1 tracking-wider">
                          Period
                        </span>
                        <span className="text-sm text-foreground font-medium">{marketData.period}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Source Tag Legend + Results Header */}
      {visibleHooks > 0 && (
        <div className="flex items-center justify-between py-2 border-y border-border text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GitCompare className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground uppercase tracking-wider">
                Hook Matching Results
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded bg-[var(--color-market)]" /> Market Data
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded bg-[var(--color-broker)]" /> Broker History
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded bg-[var(--color-guardrail)]" /> Guardrail Overlay
            </span>
          </div>
        </div>
      )}

      {/* Hook Cards Grid */}
      {visibleHooks > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      {/* Bottom CTA */}
      {matchingComplete && (
        <motion.div {...fadeSlide} className="flex flex-col items-center gap-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground max-w-2xl text-center leading-relaxed">
            Hook selection considers brand compliance (return rate), asset coverage (production quality),
            and market performance (engagement). Risk assessment is performed in the final stage.
          </p>
          <button
            className={cn(
              "w-full bg-foreground text-background font-semibold text-lg py-4 rounded-lg flex items-center justify-center gap-3 transition-all",
              selectedHook
                ? "hover:bg-white shadow-[0_0_20px_rgba(242,242,245,0.15)] active:scale-[0.99]"
                : "opacity-50 cursor-not-allowed",
            )}
            disabled={!selectedHook}
            onClick={() =>
              navigate({
                to: "/broker/$slug/produce/risk",
                params: { slug },
                search: { hook: selectedHook! },
              })
            }
          >
            <span>
              {selectedHook
                ? `Continue with ${selectedHookName}`
                : "Select a hook to continue"}
            </span>
            {selectedHook && <ArrowRight className="h-5 w-5" />}
          </button>
        </motion.div>
      )}
    </div>
  );
}
