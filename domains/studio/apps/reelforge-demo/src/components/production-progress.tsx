// src/components/production-progress.tsx
import { cn } from "@/lib";
import { Check } from "lucide-react";

interface Step {
  label: string;
  path: string;
}

const STEPS: Step[] = [
  { label: "Upload", path: "/produce" },
  { label: "Analysis", path: "/produce/analysis" },
  { label: "Hooks", path: "/produce/hooks" },
  { label: "Risk", path: "/produce/risk" },
];

interface ProductionProgressProps {
  currentPath: string;
}

export function ProductionProgress({ currentPath }: ProductionProgressProps) {
  const currentIndex = STEPS.findIndex((step) => currentPath.endsWith(step.path));
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-center gap-0 w-full max-w-xl mx-auto">
      {STEPS.map((step, i) => {
        const isCompleted = i < activeIndex;
        const isCurrent = i === activeIndex;

        return (
          <div key={step.path} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors",
                  isCompleted && "bg-[var(--color-green)] border-[var(--color-green)] text-background",
                  isCurrent && "border-foreground text-foreground",
                  !isCompleted && !isCurrent && "border-border text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] whitespace-nowrap",
                  isCompleted && "text-muted-foreground",
                  isCurrent && "font-semibold text-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-3",
                  i < activeIndex ? "bg-[var(--color-green)]" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
