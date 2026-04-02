import type { ReactNode } from "react";
import { cn } from "@/lib";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <h3
      className={cn(
        "text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-2.5",
        className,
      )}
    >
      {children}
    </h3>
  );
}
