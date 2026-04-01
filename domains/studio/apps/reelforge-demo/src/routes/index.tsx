import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InputPhase } from "@/components/phases/input-phase";
import type { Phase, PropertyAsset, BrandData } from "@/lib/types";

const BrandPhase = lazy(() => import("@/components/phases/brand-phase").then(m => ({ default: m.BrandPhase })));
const AnalysisPhase = lazy(() => import("@/components/phases/analysis-phase").then(m => ({ default: m.AnalysisPhase })));
const HookRevealPhase = lazy(() => import("@/components/phases/hook-reveal-phase").then(m => ({ default: m.HookRevealPhase })));

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [brandUrl, setBrandUrl] = useState("");
  const [assets, setAssets] = useState<PropertyAsset[]>([]);
  const [brandData, setBrandData] = useState<BrandData | null>(null);

  const handleGenerate = useCallback((url: string, files: PropertyAsset[]) => {
    setBrandUrl(url);
    setAssets(files);
    setPhase("brand");
  }, []);

  const handleBrandComplete = useCallback((brand: BrandData) => {
    setBrandData(brand);
    setPhase("analysis");
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setPhase("reveal");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
        <img src="/bright-river-logo.svg" alt="Bright River" className="h-4" />

        {/* Step ladder — always visible */}
        <nav className="flex items-center gap-0.5">
          {([
            { key: "input", label: "Upload", num: 1 },
            { key: "brand", label: "Brand", num: 2 },
            { key: "analysis", label: "Analyze", num: 3 },
            { key: "reveal", label: "Hook", num: 4 },
          ] as const).map((step, i) => {
            const phases: Phase[] = ["input", "brand", "analysis", "reveal"];
            const currentIdx = phases.indexOf(phase);
            const stepIdx = phases.indexOf(step.key);
            const isActive = step.key === phase;
            const isDone = stepIdx < currentIdx;

            return (
              <div key={step.key} className="flex items-center">
                {i > 0 && (
                  <div className={`w-6 h-px mx-1 transition-colors ${isDone ? "bg-brand" : "bg-border"}`} />
                )}
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all text-[11px] ${
                  isActive
                    ? "bg-foreground text-background font-semibold"
                    : isDone
                      ? "text-brand font-medium"
                      : "text-muted-foreground/40"
                }`}>
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                    isActive
                      ? "bg-background text-foreground"
                      : isDone
                        ? "bg-brand-subtle text-brand"
                        : "bg-surface text-muted-foreground/40"
                  }`}>
                    {isDone ? "✓" : step.num}
                  </span>
                  {step.label}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="w-16" /> {/* Spacer for balance */}
      </header>

      <main className="pt-16 px-6 pb-8">
        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <InputPhase onGenerate={handleGenerate} />
            </motion.div>
          )}

          {phase === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Suspense fallback={null}>
                <BrandPhase
                  url={brandUrl}
                  assets={assets}
                  onComplete={handleBrandComplete}
                />
              </Suspense>
            </motion.div>
          )}

          {phase === "analysis" && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Suspense fallback={null}>
                <AnalysisPhase
                  brandData={brandData!}
                  assets={assets}
                  onComplete={handleAnalysisComplete}
                />
              </Suspense>
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Suspense fallback={null}>
                <HookRevealPhase brandData={brandData!} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
