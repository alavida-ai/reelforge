import { Button } from "@/components/ui/button";
import type { Broker } from "@/data/types";

interface VideoPreviewProps {
  broker: Broker;
}

export function VideoPreview({ broker }: VideoPreviewProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* 9:16 video placeholder */}
      <div
        className="relative rounded-xl overflow-hidden border border-border"
        style={{ aspectRatio: "9/16", background: "#0a0a0a" }}
      >
        {/* Brand accent strip */}
        <div
          className="absolute top-0 inset-x-0 h-[3px]"
          style={{ background: broker.colors.primary }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              className="ml-0.5"
            >
              <path d="M0 0L14 8L0 16V0Z" fill="white" fillOpacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-end justify-between">
          {/* Broker logo badge */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: broker.colors.primary }}
            >
              {broker.logoLetter}
            </div>
            <span className="text-[10px] font-medium text-white/80">
              {broker.name}
            </span>
          </div>
          {/* Duration */}
          <span className="text-[10px] font-mono text-white/60">0:03</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 text-[11px]"
          style={{
            color: broker.colors.primary,
          }}
        >
          <span>&#8595;</span> Export Package
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-[11px]"
        >
          <span>&#8635;</span> New Variation
        </Button>
      </div>
    </div>
  );
}
