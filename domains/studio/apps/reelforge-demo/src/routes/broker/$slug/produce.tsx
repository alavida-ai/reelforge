import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import { SourceTagLegend } from "@/components/source-tag";
import { UploadStage } from "@/components/upload-stage";
import { IntelligencePanels } from "@/components/intelligence-panels";
import { HookSelection } from "@/components/hook-selection";
import { getBroker, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce")({
  component: ProductionFlowPage,
});

function ProductionFlowPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const [stage, setStage] = useState(1);

  if (!broker) {
    return (
      <>
        <Nav />
        <div className="pt-14 max-w-[1200px] mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-[1200px] mx-auto px-5 py-5">
        {/* Screen header */}
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-1">
            Screen 3 of 4
          </div>
          <h1 className="text-lg font-bold">Production Flow</h1>
          <p className="text-[11px] text-muted-foreground">
            Upload listing → Creative Intelligence → Hook Selection
          </p>
        </div>

        {/* Stage 1: Upload — always visible */}
        <div className="rounded-xl bg-card border border-border p-4 mb-4">
          <UploadStage
            broker={broker}
            onStart={() => setStage(2)}
            started={stage >= 2}
          />
        </div>

        {/* Stage 2: Creative Intelligence — visible when stage >= 2 */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <SectionLabel className="mb-0">
                Stage 2 — Creative Intelligence
              </SectionLabel>
              <SourceTagLegend />
            </div>
            <IntelligencePanels
              property={broker.demoProperty}
              hookResults={broker.hookSelectionResults}
              marketData={marketData}
            />
          </motion.div>
        )}

        {/* Stage 3: Hook Selection — visible when stage >= 2 */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <SectionLabel className="mb-3">
              Stage 3 — Hook Selection
            </SectionLabel>
            <HookSelection
              results={broker.hookSelectionResults}
              brokerSlug={broker.slug}
            />
          </motion.div>
        )}
      </div>
    </>
  );
}
