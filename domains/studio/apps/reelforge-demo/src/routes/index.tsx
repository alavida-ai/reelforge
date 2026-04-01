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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/bright-river-logo.svg" alt="Bright River" className="h-6" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            ReelForge
          </span>
        </div>
        {phase !== "input" && (
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.15em]">
            {(["brand", "analysis", "reveal"] as const).map((p, i) => (
              <span key={p} className="flex items-center gap-6">
                {i > 0 && <span className="h-px w-6 bg-border" />}
                <span className={
                  phase === p
                    ? "text-brand font-medium"
                    : phase === "reveal" || (phase === "analysis" && p === "brand")
                      ? "text-muted-foreground"
                      : "text-muted-foreground/30"
                }>
                  {p === "brand" ? "Extract" : p === "analysis" ? "Analyze" : "Hook"}
                </span>
              </span>
            ))}
          </div>
        )}
      </header>

      <main className="pt-24 px-10 pb-10">
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
