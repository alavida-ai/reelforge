import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import type { Broker } from "@/data/types";

interface UploadStageProps {
  broker: Broker;
  onStart: () => void;
  started: boolean;
}

export function UploadStage({ broker, onStart, started }: UploadStageProps) {
  return (
    <div>
      {/* Context bar */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: broker.colors.primary }}
          >
            {broker.logoLetter}
          </div>
          <div>
            <span className="font-semibold text-[12px]">
              Producing for {broker.name}
            </span>{" "}
            <span className="text-muted-foreground text-[11px]">
              {broker.tagline}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Return Rate{" "}
          <span className="font-mono text-[var(--color-green)] font-semibold">
            {broker.productionSla.returnRate}
          </span>{" "}
          · Hooks{" "}
          <span className="font-mono font-semibold">
            {broker.productionSla.hooksDelivered}
          </span>
        </div>
      </div>

      {/* Upload area */}
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-bold text-[16px] mb-1">Add listing assets</h2>
        <p className="text-[11px] text-muted-foreground mb-4">
          Property photos and video for hook generation
        </p>

        {/* Drop zone */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 mb-3 hover:border-muted-foreground/30 transition-colors">
          <div className="text-[20px] mb-1.5">📁</div>
          <div className="text-[12px]">Drop property photos & videos</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">
            or click to browse
          </div>
        </div>

        {/* Asset thumbnails */}
        <div className="grid grid-cols-6 gap-1 mb-3.5">
          {broker.demoProperty.assets.map((asset) => (
            <div
              key={asset.label}
              className="aspect-square bg-muted rounded flex items-center justify-center text-[8px] text-muted-foreground"
            >
              {asset.label}
            </div>
          ))}
        </div>

        {/* Start button */}
        <Button
          onClick={onStart}
          disabled={started}
          variant={started ? "secondary" : "default"}
          className="px-5 py-2.5"
        >
          {started ? "Production Started ✓" : "Start Production →"}
        </Button>
      </div>
    </div>
  );
}
