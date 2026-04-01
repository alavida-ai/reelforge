import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizationMeterProps {
  score: number;
  className?: string;
}

export function OptimizationMeter({ score, className }: OptimizationMeterProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Hook Optimization
        </span>
        <motion.span
          className="text-3xl font-bold text-brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}%
        </motion.span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
