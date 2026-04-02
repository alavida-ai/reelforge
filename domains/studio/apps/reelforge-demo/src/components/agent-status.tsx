// src/components/agent-status.tsx
import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib";

export interface AgentStep {
  label: string;
  duration: number; // ms
}

interface AgentStatusProps {
  steps: AgentStep[];
  onComplete: () => void;
  onStepComplete?: (stepIndex: number) => void;
}

export function useAgentSequence(steps: AgentStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setCompleted(true);
      return;
    }
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((s) => s + 1);
    }, steps[currentStep].duration);
    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  return { currentStep, completed, completedSteps };
}

export function AgentStatus({ steps, onComplete, onStepComplete }: AgentStatusProps) {
  const { currentStep, completed, completedSteps } = useAgentSequence(steps);

  useEffect(() => {
    if (completed) onComplete();
  }, [completed, onComplete]);

  useEffect(() => {
    if (completedSteps.length > 0) {
      onStepComplete?.(completedSteps[completedSteps.length - 1]);
    }
  }, [completedSteps, onStepComplete]);

  return (
    <div className="space-y-1.5 mb-5">
      {steps.map((step, i) => {
        const isDone = completedSteps.includes(i);
        const isActive = i === currentStep && !completed;
        const isPending = i > currentStep;

        return (
          <div
            key={step.label}
            className={cn(
              "flex items-center gap-2 text-[11px] transition-opacity",
              isPending && "opacity-30",
            )}
          >
            {isDone && <Check className="h-3 w-3 text-[var(--color-green)]" />}
            {isActive && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            {isPending && <div className="h-3 w-3" />}
            <span className={cn(isDone && "text-muted-foreground", isActive && "text-foreground")}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
