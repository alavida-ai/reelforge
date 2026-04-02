import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Shimmer } from "@/components/shimmer";
import { PHASE_TIMINGS } from "@/lib/demo-data";
import type { InsightCard as InsightCardType } from "@/lib/types";

const ICONS: Record<string, React.ElementType> = {
  Home,
  TrendingUp,
  Zap,
  Users,
};

interface InsightCardProps {
  insight: InsightCardType;
  delay: number;
}

export function InsightCard({ insight, delay }: InsightCardProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setRevealed(true),
      delay + PHASE_TIMINGS.insightShimmerDuration
    );
    return () => clearTimeout(timer);
  }, [delay]);

  const Icon = ICONS[insight.icon] ?? Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
    >
      <Card className="border-border bg-card p-5 transition-all duration-500">
        {!revealed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 shimmer rounded-lg bg-muted" />
              <div className="h-4 w-32 shimmer rounded bg-muted" />
            </div>
            <Shimmer lines={2} />
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-subtle">
                <Icon className="h-4 w-4 text-brand" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                {insight.title}
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {insight.content}
            </p>
            {insight.detail && (
              <p className="text-xs text-muted-foreground">
                {insight.detail}
              </p>
            )}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
