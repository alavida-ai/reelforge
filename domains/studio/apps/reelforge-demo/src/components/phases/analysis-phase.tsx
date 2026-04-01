import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@/lib/demo-data";
import type { BrandData, PropertyAsset } from "@/lib/types";

interface AnalysisPhaseProps {
  brandData: BrandData;
  assets: PropertyAsset[];
  onComplete: () => void;
}

const STAGES = [
  { id: "identify", icon: Home, label: "Identify Property", duration: 3500 },
  { id: "angles", icon: BarChart3, label: "Market Angles", duration: 3500 },
  { id: "assets", icon: ImageIcon, label: "Select Assets", duration: 3000 },
  { id: "storyboard", icon: LayoutGrid, label: "Storyboard", duration: 3500 },
  { id: "compose", icon: Wand2, label: "Compose Hook", duration: 4000 },
] as const;

export function AnalysisPhase({ brandData, assets, onComplete }: AnalysisPhaseProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [stageRevealed, setStageRevealed] = useState(false);

  // Advance through stages
  useEffect(() => {
    if (activeStage >= STAGES.length) {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    // Shimmer phase
    setStageRevealed(false);
    const shimmerTimer = setTimeout(() => setStageRevealed(true), 1000);

    // Auto-advance after stage duration
    const advanceTimer = setTimeout(() => {
      setActiveStage((s) => s + 1);
    }, STAGES[activeStage].duration);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(advanceTimer);
    };
  }, [activeStage, onComplete]);

  if (activeStage >= STAGES.length) return null;

  const currentStage = STAGES[activeStage];

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col">
      {/* Stage progress strip */}
      <div className="flex items-center justify-center gap-1 py-4">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === activeStage;
          const isDone = i < activeStage;
          return (
            <div key={stage.id} className="flex items-center gap-1">
              {i > 0 && (
                <div className={`h-px w-5 transition-colors duration-500 ${
                  isDone ? "bg-brand" : "bg-border"
                }`} />
              )}
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] transition-all duration-500 ${
                isActive
                  ? "bg-brand text-primary-foreground"
                  : isDone
                    ? "bg-brand-subtle text-brand border border-brand/20"
                    : "text-muted-foreground/40"
              }`}>
                <Icon className="h-3 w-3" />
                <span className="font-medium hidden sm:inline">{stage.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage content — full viewport, transitions like slides */}
      <div className="flex flex-1 items-center justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            {!stageRevealed ? (
              <StageShimmer label={currentStage.label} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {currentStage.id === "identify" && <IdentifyStage assets={assets} />}
                {currentStage.id === "angles" && <AnglesStage />}
                {currentStage.id === "assets" && <AssetsStage />}
                {currentStage.id === "storyboard" && <StoryboardStage />}
                {currentStage.id === "compose" && <ComposeStage brandData={brandData} />}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Stage shimmer ---
function StageShimmer({ label }: { label: string }) {
  return (
    <div className="space-y-6 text-center">
      <h3 className="font-display text-2xl text-foreground/30">{label}</h3>
      <div className="mx-auto max-w-lg space-y-3">
        <ShimmerBlock className="h-40 w-full" />
        <ShimmerBlock className="h-4 w-2/3 mx-auto" />
        <ShimmerBlock className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

// --- Stage 1: Identify Property ---
function IdentifyStage({ assets }: { assets: PropertyAsset[] }) {
  const photos = assets.length > 0 ? assets.slice(0, 4) : PROPERTY_PHOTOS.slice(0, 4);
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl text-foreground">
          {PROPERTY_CLASSIFICATION.type}
        </h3>
        <p className="text-sm text-muted-foreground">
          {PROPERTY_CLASSIFICATION.style} · {PROPERTY_CLASSIFICATION.segment}
        </p>
      </div>

      {/* Photo grid with feature tags */}
      <div className="grid grid-cols-4 gap-3">
        {photos.map((item, i) => {
          const src = "preview" in item ? item.preview : item.src;
          return (
            <motion.div
              key={i}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              {DETECTED_FEATURES[i] && (
                <motion.div
                  className="absolute bottom-2 left-2 right-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[11px] text-white">
                    {DETECTED_FEATURES[i].label}
                    <span className="font-mono text-brand text-[10px]">
                      {Math.round(DETECTED_FEATURES[i].confidence * 100)}%
                    </span>
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* All features */}
      <div className="flex flex-wrap justify-center gap-2">
        {DETECTED_FEATURES.map((f, i) => (
          <motion.span
            key={i}
            className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.08 }}
          >
            {f.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// --- Stage 2: Market Angles ---
function AnglesStage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl text-foreground">
          Best hook for this property
        </h3>
        <p className="text-sm text-muted-foreground">
          Compared against 2,400+ Dutch RE social posts
        </p>
      </div>

      <div className="mx-auto max-w-xl space-y-3">
        {HOOK_COMPARISONS.map((comp, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className={`w-32 text-right text-sm ${
              comp.highlight ? "text-brand font-semibold" : "text-muted-foreground"
            }`}>
              {comp.label}
            </span>
            <div className="flex-1 h-8 rounded-lg bg-surface overflow-hidden">
              <motion.div
                className={`h-full rounded-lg ${comp.highlight ? "bg-brand" : "bg-muted-foreground/15"}`}
                initial={{ width: 0 }}
                animate={{ width: `${(comp.value / 3.5) * 100}%` }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
              />
            </div>
            <span className={`font-mono text-base w-12 ${
              comp.highlight ? "text-brand font-bold" : "text-muted-foreground"
            }`}>
              {comp.value}x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Stage 3: Asset Selection ---
function AssetsStage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl text-foreground">
          Selected for the hook
        </h3>
        <p className="text-sm text-muted-foreground">
          {SELECTED_ASSETS.length} assets matched to the Gift Reveal sequence
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mx-auto max-w-2xl">
        {SELECTED_ASSETS.map((asset, i) => (
          <motion.div
            key={i}
            className="space-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted border-2 border-brand/20">
              <img
                src={PROPERTY_PHOTOS[i]?.src ?? "/property/exterior.jpg"}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-foreground/60 text-center">
              {asset.reason}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Stage 4: Storyboard ---
function StoryboardStage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl text-foreground">
          Hook sequence
        </h3>
        <p className="text-sm text-muted-foreground">
          3-frame storyboard for the Gift Reveal
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mx-auto max-w-3xl">
        {STORYBOARD.map((frame, i) => (
          <motion.div
            key={i}
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.5 }}
          >
            {/* Frame label */}
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded border border-brand/30 font-mono text-[10px] font-bold text-brand">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-foreground">
                {frame.label}
              </span>
              {i < STORYBOARD.length - 1 && (
                <div className="flex-1 h-px bg-border" />
              )}
            </div>
            {/* Frame image */}
            <div className="aspect-[9/16] overflow-hidden rounded-xl border border-border">
              <img
                src={frame.image}
                alt={frame.label}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[11px] leading-snug text-muted-foreground">
              {frame.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Stage 5: Compose ---
function ComposeStage({ brandData }: { brandData: BrandData }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl text-foreground">
          Composing your hook
        </h3>
        <p className="text-sm text-muted-foreground">
          Generating for {brandData.name}
        </p>
      </div>

      {/* Creative prompt */}
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-surface p-5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
          Creative Brief
        </p>
        <pre className="font-mono text-xs leading-relaxed text-foreground/70 whitespace-pre-wrap">
          {CREATIVE_PROMPT}
        </pre>
      </div>

      {/* Brand colors being applied */}
      <div className="flex justify-center gap-3">
        {brandData.colors.slice(0, 4).map((color, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div
              className="h-5 w-5 rounded border border-border"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-[10px] text-muted-foreground">{color.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Optimization meter */}
      <div className="mx-auto max-w-sm">
        <OptimizationMeter score={94} />
      </div>
    </div>
  );
}
