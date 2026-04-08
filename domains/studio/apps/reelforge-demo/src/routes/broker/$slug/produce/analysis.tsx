import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Image, Scan, Tag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { InsightLine } from "@/components/source-tag";
import { ThinProgress } from "@/components/thin-progress";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/analysis")({
  component: AnalysisPage,
});

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

function AnalysisPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const navigate = useNavigate();

  const [showAssets, setShowAssets] = useState(false);
  const [showClassification, setShowClassification] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const property = broker?.demoProperty;

  const agentSteps: AgentStep[] = useMemo(
    () => [
      { label: "Scanning uploaded assets...", duration: 1000 },
      { label: "Categorizing property...", duration: 800 },
      ...(property?.features.map((f) => ({
        label: `Extracting feature: ${f.name}...`,
        duration: 500,
      })) ?? []),
    ],
    [property],
  );

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      if (stepIndex === 0) setShowAssets(true);
      if (stepIndex === 1) setShowClassification(true);
      if (stepIndex >= 2) setVisibleFeatures(stepIndex - 1);
    },
    [],
  );

  const handleComplete = useCallback(() => {
    setVisibleFeatures(property?.features.length ?? 0);
    setAnalysisComplete(true);
  }, [property]);

  if (!broker || !property) {
    return <p className="text-muted-foreground">Broker not found.</p>;
  }

  return (
    <div>
      {/* Agent status — compact */}
      <AgentStatus
        steps={agentSteps}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Assets + Classification side by side */}
      {(showAssets || showClassification) && (
        <div className="grid grid-cols-[1fr_1fr] gap-3 mb-4">
          {/* Scanned assets */}
          {showAssets && (
            <motion.div {...fade}>
              <Card className="h-full">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Scan className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      {property.assets.length} Assets Scanned
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {property.assets.map((asset, i) => (
                      <motion.div
                        key={asset.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="aspect-[4/3] rounded border border-border bg-muted/50 flex flex-col items-center justify-center gap-0.5"
                      >
                        <Image className="h-2.5 w-2.5 text-muted-foreground" />
                        <span className="text-[7px] text-muted-foreground">{asset.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Property classification */}
          {showClassification && (
            <motion.div {...fade}>
              <Card className="h-full">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      Property Classification
                    </span>
                  </div>
                  <div className="text-[15px] font-bold">{property.type}</div>
                  <div className="text-[11px] text-muted-foreground">{property.subtype}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{property.address}</div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Detected features — compact rows */}
      {visibleFeatures > 0 && (
        <motion.div {...fade} className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Detected Features
            </span>
          </div>
          <div className="space-y-1.5">
            {property.features.slice(0, visibleFeatures).map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-md border border-border p-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[11px]">{feature.name}</span>
                  <span className="font-mono text-[var(--color-green)] text-[10px] font-semibold">
                    {Math.round(feature.confidence * 100)}%
                  </span>
                </div>
                <ThinProgress percent={feature.confidence * 100} className="mb-1.5" />
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {feature.insights.map((insight, j) => (
                    <InsightLine key={j} insight={insight} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* KPI callout + human gate */}
      {analysisComplete && (
        <motion.div {...fade}>
          <div className="rounded-md border border-border bg-muted/30 p-2.5 mb-3 text-[10px] text-muted-foreground">
            Feature detection accuracy directly impacts return rate. Higher
            confidence scores mean fewer hallucination-driven returns.
          </div>
          <Button
            className="w-full"
            onClick={() =>
              navigate({
                to: "/broker/$slug/produce/hooks",
                params: { slug },
              })
            }
          >
            Confirm Property Profile
          </Button>
        </motion.div>
      )}
    </div>
  );
}
