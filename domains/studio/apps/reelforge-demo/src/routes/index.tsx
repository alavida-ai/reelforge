import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InputPhase } from "@/components/phases/input-phase";
import { BrandPhase } from "@/components/phases/brand-phase";
import { AnalysisPhase } from "@/components/phases/analysis-phase";
import { HookRevealPhase } from "@/components/phases/hook-reveal-phase";
import type { Phase, PropertyAsset, BrandData } from "@/lib/types";

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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-5">
        <span className="text-lg font-semibold tracking-tight text-foreground">
          ReelForge
        </span>
        {phase !== "input" && (
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <span className={phase === "brand" ? "text-brand font-medium" : ""}>Brand</span>
            <span className="text-muted-foreground/30">→</span>
            <span className={phase === "analysis" ? "text-brand font-medium" : ""}>Analysis</span>
            <span className="text-muted-foreground/30">→</span>
            <span className={phase === "reveal" ? "text-brand font-medium" : ""}>Hook</span>
          </div>
        )}
      </header>

      <main className="pt-20 px-8 pb-8">
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
              <BrandPhase
                url={brandUrl}
                assets={assets}
                onComplete={handleBrandComplete}
              />
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
              <AnalysisPhase
                brandData={brandData!}
                assets={assets}
                onComplete={handleAnalysisComplete}
              />
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <HookRevealPhase brandData={brandData!} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
