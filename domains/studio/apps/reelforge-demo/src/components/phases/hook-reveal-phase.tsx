import { motion } from "framer-motion";
import { Download, Sparkles, BarChart3, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="mx-auto max-w-6xl pt-12">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-foreground">
          Your Optimized Hook
        </h2>
        <p className="mt-2 text-muted-foreground">
          Branded for{" "}
          <span className="font-medium text-foreground">{brandData.name}</span>
          {" "}— optimized for maximum reach
        </p>
      </motion.div>

      <div className="grid grid-cols-5 gap-8">
        {/* Video Player — 9:16 */}
        <div className="col-span-2 flex flex-col items-center gap-4">
          <VideoPlayer
            src={DEMO_HOOK.videoSrc}
            className="aspect-[9/16] w-full max-w-[320px]"
          />
          <Button
            size="lg"
            onClick={handleDownload}
            className="w-full max-w-[320px] bg-brand text-primary-foreground hover:bg-brand-bright"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Hook
          </Button>
        </div>

        {/* Optimization Breakdown */}
        <div className="col-span-3 space-y-4">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {DEMO_HOOK.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <Card className="border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Hook Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <Card className="border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                <h3 className="text-sm font-semibold text-foreground">
                  Hook Pattern: {DEMO_HOOK.pattern}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                {DEMO_HOOK.patternReason}
              </p>
            </Card>
          </motion.div>

          {/* Research Points */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <Card className="border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-brand" />
                <h3 className="text-sm font-semibold text-foreground">
                  Market Research
                </h3>
              </div>
              <ul className="space-y-2">
                {DEMO_HOOK.researchPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Brand Elements Applied */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <Card className="border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-brand" />
                <h3 className="text-sm font-semibold text-foreground">
                  Brand Elements Applied
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEMO_HOOK.brandElements.map((element, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {element}
                  </Badge>
                ))}
              </div>
              {/* Show actual brand colors */}
              <div className="flex items-center gap-2 pt-1">
                {brandData.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {brandData.name} palette
                </span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
