import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrandCard } from "@/components/brand-card";
import { InsightCard } from "@/components/insight-card";
import { OptimizationMeter } from "@/components/optimization-meter";
import { DEMO_INSIGHTS, PHASE_TIMINGS } from "@/lib/demo-data";
import type { BrandData, PropertyAsset } from "@/lib/types";

interface AnalysisPhaseProps {
  brandData: BrandData;
  assets: PropertyAsset[];
  onComplete: () => void;
}

export function AnalysisPhase({ brandData, assets, onComplete }: AnalysisPhaseProps) {
  const [showMeter, setShowMeter] = useState(false);

  const totalInsightTime =
    DEMO_INSIGHTS.length * PHASE_TIMINGS.insightStagger +
    PHASE_TIMINGS.insightShimmerDuration;

  // Show optimization meter after all insights are revealed
  useEffect(() => {
    const timer = setTimeout(() => setShowMeter(true), totalInsightTime);
    return () => clearTimeout(timer);
  }, [totalInsightTime]);

  // Auto-advance after meter animation completes
  useEffect(() => {
    if (!showMeter) return;
    const timer = setTimeout(
      () => onComplete(),
      PHASE_TIMINGS.optimizationMeterDuration + PHASE_TIMINGS.hookRevealDelay
    );
    return () => clearTimeout(timer);
  }, [showMeter, onComplete]);

  return (
    <div className="mx-auto max-w-5xl pt-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          Analyzing & Optimizing
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pulling market research and identifying the best hook strategy
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Insight Cards Feed */}
        <div className="col-span-2 space-y-4">
          {DEMO_INSIGHTS.map((insight, i) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              delay={i * PHASE_TIMINGS.insightStagger}
            />
          ))}

          {/* Optimization Meter */}
          {showMeter && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-brand/30 bg-card p-5"
            >
              <OptimizationMeter score={94} />
            </motion.div>
          )}
        </div>

        {/* Persistent Brand Sidebar */}
        <div className="space-y-4">
          <BrandCard brand={brandData} />
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Assets ({assets.length})
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {assets.slice(0, 6).map((asset, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded bg-muted"
                >
                  {asset.type === "image" ? (
                    <img
                      src={asset.preview}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={asset.preview}
                      className="h-full w-full object-cover"
                      muted
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
