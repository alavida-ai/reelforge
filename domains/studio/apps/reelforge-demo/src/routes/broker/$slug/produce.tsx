import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Nav } from "@/components/nav";
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
        <div className="pt-14 max-w-5xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hook Production</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload listing assets, analyze creative intelligence, select the best hook.
          </p>
        </div>

        {/* Stage 1: Upload */}
        <Card className="mb-5">
          <CardContent className="p-5">
            <UploadStage
              broker={broker}
              onStart={() => setStage(2)}
              started={stage >= 2}
            />
          </CardContent>
        </Card>

        {/* Stage 2: Creative Intelligence */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                Creative Intelligence
              </h2>
              <SourceTagLegend />
            </div>
            <IntelligencePanels
              property={broker.demoProperty}
              hookResults={broker.hookSelectionResults}
              marketData={marketData}
            />
          </motion.div>
        )}

        {/* Stage 3: Hook Selection */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="text-lg font-bold mb-4">
              Hook Selection
            </h2>
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
