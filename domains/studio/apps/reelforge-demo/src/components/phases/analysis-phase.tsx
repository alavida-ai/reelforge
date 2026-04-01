import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, BarChart3, ImageIcon, LayoutGrid, Wand2 } from "lucide-react";
import { OptimizationMeter } from "@/components/optimization-meter";
import { ShimmerBlock } from "@/components/shimmer";
import {
  DETECTED_FEATURES,
  PROPERTY_CLASSIFICATION,
  PROPERTY_PHOTOS,
  HOOK_COMPARISONS,
  SELECTED_ASSETS,
  STORYBOARD,
  CREATIVE_PROMPT,
  PHASE_TIMINGS,
} from "@/lib/demo-data";
import type { BrandData, PropertyAsset } from "@/lib/types";

interface AnalysisPhaseProps {
  brandData: BrandData;
  assets: PropertyAsset[];
  onComplete: () => void;
}

const STAGES = [
  { id: "identify", icon: Home, label: "Identify Property" },
  { id: "angles", icon: BarChart3, label: "Market Angles" },
  { id: "assets", icon: ImageIcon, label: "Select Assets" },
  { id: "storyboard", icon: LayoutGrid, label: "Storyboard" },
  { id: "compose", icon: Wand2, label: "Compose Hook" },
] as const;

export function AnalysisPhase({ brandData, assets, onComplete }: AnalysisPhaseProps) {
  const [revealedStages, setRevealedStages] = useState<Set<string>>(new Set());

  // Stagger stage reveals
  useEffect(() => {
    const timers = STAGES.map((stage, i) => {
      const delay = i * PHASE_TIMINGS.stageDelay + PHASE_TIMINGS.stageShimmerDuration;
      return setTimeout(() => {
        setRevealedStages((prev) => new Set([...prev, stage.id]));
      }, delay);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-advance after all stages + compose meter
  useEffect(() => {
    if (revealedStages.size < STAGES.length) return;
    const timer = setTimeout(
      () => onComplete(),
      PHASE_TIMINGS.optimizationMeterDuration + PHASE_TIMINGS.hookRevealDelay
    );
    return () => clearTimeout(timer);
  }, [revealedStages.size, onComplete]);

  const isRevealed = (id: string) => revealedStages.has(id);
  const isActive = (i: number) => {
    const stageDelay = i * PHASE_TIMINGS.stageDelay;
    return revealedStages.size >= i; // shimmer shows before reveal
  };

  return (
    <div className="mx-auto max-w-5xl pt-8">
      <div className="mb-8">
        <h2 className="font-display text-4xl italic text-foreground">
          Creative development
        </h2>
        <div className="mt-4 h-px glow-line" />
      </div>

      {/* Pipeline progress strip */}
      <div className="flex items-center gap-1 mb-10">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const revealed = isRevealed(stage.id);
          const active = isActive(i);
          return (
            <motion.div
              key={stage.id}
              className="flex items-center gap-1"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: active ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            >
              {i > 0 && (
                <div className={`h-px w-6 transition-colors duration-500 ${revealed ? "bg-brand" : "bg-border"}`} />
              )}
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] transition-all duration-500 ${
                revealed
                  ? "bg-brand-subtle text-brand border border-brand/20"
                  : "bg-surface text-muted-foreground border border-border"
              }`}>
                <Icon className="h-3 w-3" />
                <span className="font-medium">{stage.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pipeline stages */}
      <div className="space-y-6">
        {/* Stage 1: Property Intelligence */}
        <PipelineStage
          index={0}
          revealed={isRevealed("identify")}
          stageDelay={PHASE_TIMINGS.stageDelay}
        >
          <div className="space-y-4">
            {/* Property classification */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-lg font-semibold text-foreground">
                {PROPERTY_CLASSIFICATION.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {PROPERTY_CLASSIFICATION.style} · {PROPERTY_CLASSIFICATION.segment}
              </span>
            </div>

            {/* Asset grid with feature tags — uses real property photos */}
            <div className="grid grid-cols-4 gap-2">
              {(assets.length > 0 ? assets.slice(0, 4) : PROPERTY_PHOTOS.slice(0, 4)).map((item, i) => {
                const src = "preview" in item ? item.preview : item.src;
                return (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    {DETECTED_FEATURES[i] && (
                      <div className="absolute bottom-1.5 left-1.5 right-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[10px] text-white">
                          {DETECTED_FEATURES[i].label}
                          <span className="text-brand font-mono">
                            {Math.round(DETECTED_FEATURES[i].confidence * 100)}%
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detected features strip */}
            <div className="flex flex-wrap gap-1.5">
              {DETECTED_FEATURES.map((f, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-foreground/70"
                >
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </PipelineStage>

        {/* Stage 2: Market Angles */}
        <PipelineStage
          index={1}
          revealed={isRevealed("angles")}
          stageDelay={PHASE_TIMINGS.stageDelay}
        >
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Hook performance for <span className="text-foreground">{PROPERTY_CLASSIFICATION.type}</span> in the Dutch market
            </p>
            <div className="space-y-2.5">
              {HOOK_COMPARISONS.map((comp, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-28 text-xs text-right ${comp.highlight ? "text-brand font-medium" : "text-muted-foreground"}`}>
                    {comp.label}
                  </span>
                  <div className="flex-1 h-7 rounded bg-surface overflow-hidden">
                    <motion.div
                      className={`h-full rounded ${comp.highlight ? "bg-brand" : "bg-muted-foreground/20"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(comp.value / 3.5) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                  <span className={`font-mono text-sm w-10 ${comp.highlight ? "text-brand font-semibold" : "text-muted-foreground"}`}>
                    {comp.value}x
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Based on 2,400+ Dutch RE social posts analyzed Q1 2026
            </p>
          </div>
        </PipelineStage>

        {/* Stage 3: Asset Selection */}
        <PipelineStage
          index={2}
          revealed={isRevealed("assets")}
          stageDelay={PHASE_TIMINGS.stageDelay}
        >
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Selected <span className="text-foreground">{SELECTED_ASSETS.length} assets</span> for the Gift Reveal hook
            </p>
            <div className="grid grid-cols-3 gap-3">
              {SELECTED_ASSETS.map((asset, i) => (
                <div key={i} className="space-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted border border-brand/20">
                    <img
                      src={PROPERTY_PHOTOS[i]?.src ?? "/property/exterior.jpg"}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] leading-snug text-foreground/70">
                    {asset.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PipelineStage>

        {/* Stage 4: Storyboard */}
        <PipelineStage
          index={3}
          revealed={isRevealed("storyboard")}
          stageDelay={PHASE_TIMINGS.stageDelay}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              {STORYBOARD.map((frame, i) => (
                <div key={i} className="space-y-2">
                  {/* Frame number + connector */}
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded border border-brand/30 text-[10px] font-mono font-semibold text-brand">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {frame.label}
                    </span>
                    {i < STORYBOARD.length - 1 && (
                      <div className="flex-1 h-px bg-border" />
                    )}
                  </div>
                  {/* Frame with real photo */}
                  <div className="aspect-[9/16] rounded-lg border border-border bg-surface overflow-hidden">
                    <img
                      src={frame.image}
                      alt={frame.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] leading-snug text-muted-foreground">
                    {frame.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PipelineStage>

        {/* Stage 5: Compose */}
        <PipelineStage
          index={4}
          revealed={isRevealed("compose")}
          stageDelay={PHASE_TIMINGS.stageDelay}
        >
          <div className="space-y-5">
            {/* Creative prompt */}
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                Creative Brief
              </p>
              <pre className="font-mono text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {CREATIVE_PROMPT}
              </pre>
            </div>
            {/* Optimization meter */}
            <OptimizationMeter score={94} />
          </div>
        </PipelineStage>
      </div>
    </div>
  );
}

// --- Pipeline Stage wrapper ---

function PipelineStage({
  index,
  revealed,
  stageDelay,
  children,
}: {
  index: number;
  revealed: boolean;
  stageDelay: number;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * stageDelay);
    return () => clearTimeout(timer);
  }, [index, stageDelay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      {!revealed ? (
        <div className="space-y-3">
          <ShimmerBlock className="h-4 w-40" />
          <ShimmerBlock className="h-20 w-full" />
          <ShimmerBlock className="h-3 w-24" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
