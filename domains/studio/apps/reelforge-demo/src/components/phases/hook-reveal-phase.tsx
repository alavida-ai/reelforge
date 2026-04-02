import { motion } from "framer-motion";
import { Download, ArrowRight, Sparkles, TrendingUp, MessageSquare } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { DEMO_HOOK } from "@/lib/demo-data";
import type { BrandData } from "@/lib/types";

const VARIATION_PROMPTS = [
  { label: "More brand presence", icon: "brand" },
  { label: "Harder on product", icon: "product" },
  { label: "Add influencer energy", icon: "influencer" },
  { label: "Slower reveal", icon: "pacing" },
  { label: "Different hook style", icon: "style" },
];

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
    <div className="flex min-h-[calc(100vh-6rem)] flex-col">
      {/* Video — front and center, dominant */}
      <div className="flex flex-1 items-center justify-center gap-12 px-4">
        {/* The video — hero */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VideoPlayer
            src={DEMO_HOOK.videoSrc}
            className="aspect-[9/16] w-[340px]"
          />
        </motion.div>

        {/* Right side — insight + feedback, minimal */}
        <motion.div
          className="flex w-[320px] flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Quick insight */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-brand">
                {DEMO_HOOK.pattern}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {DEMO_HOOK.patternReason}
            </p>
          </div>

          {/* Key metrics — compact */}
          <div className="flex gap-5 border-y border-border py-4">
            {DEMO_HOOK.metrics.slice(1, 4).map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <p className="font-mono text-base font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Variation / feedback area */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Adjust
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {VARIATION_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-foreground/70 transition-all hover:border-brand/40 hover:text-foreground hover:bg-brand-subtle cursor-pointer"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Or describe what you'd change..."
              className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/20 h-16"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-bright"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised">
              <TrendingUp className="h-3.5 w-3.5" />
              New Variation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
