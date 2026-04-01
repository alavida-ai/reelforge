import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { DEMO_HOOK } from "@/lib/demo-data";
import type { BrandData } from "@/lib/types";

interface HookRevealPhaseProps {
  brandData: BrandData;
}

export function HookRevealPhase({ brandData }: HookRevealPhaseProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = DEMO_HOOK.videoSrc;
    a.download = `hook-${brandData.name?.toLowerCase().replace(/\s+/g, "-") ?? "branded"}.mp4`;
    a.click();
  };

  return (
    <div className="mx-auto max-w-6xl pt-8">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-5xl italic text-foreground">
          Your hook is ready
        </h2>
        <div className="mt-4 h-px glow-line" />
      </motion.div>

      <div className="grid grid-cols-12 gap-10">
        {/* Video Player — hero size */}
        <motion.div
          className="col-span-5 flex flex-col gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <VideoPlayer
            src={DEMO_HOOK.videoSrc}
            className="aspect-[9/16] w-full"
          />
          <button
            onClick={handleDownload}
            className="group flex w-full items-center justify-between rounded-lg bg-brand px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-bright"
          >
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Hook
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Creative Brief — reads like a director's note, not a dashboard */}
        <div className="col-span-7 space-y-8">
          {/* Why this hook */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-brand">
              Why this hook
            </h3>
            <p className="text-base leading-relaxed text-foreground/90">
              {DEMO_HOOK.patternReason}
            </p>
          </motion.div>

          {/* Key numbers — inline, not cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex gap-8 border-y border-border py-5">
              {DEMO_HOOK.metrics.map((metric, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-mono text-xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What the data says */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Supporting research
            </h3>
            <ul className="space-y-2.5">
              {DEMO_HOOK.researchPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brand integration */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Brand integration
            </h3>
            <div className="flex items-center gap-3">
              {brandData.colors.slice(0, 4).map((color, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-sm border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-muted-foreground">{color.name}</span>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5 pt-1">
              {DEMO_HOOK.brandElements.map((element, i) => (
                <li key={i} className="text-sm text-foreground/70">
                  {element}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
