# Production Flow Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-page production flow with a 4-stage agentic pipeline where each stage is its own route with simulated agent activity, KPI accountability, and a human gate.

**Architecture:** Convert `produce.tsx` into a layout route with a shared progress stepper and broker context bar. Each stage (Upload, Analysis, Hook Matching, Risk) is a child route under `/broker/$slug/produce/`. Each stage runs a simulated agent sequence on mount (timeouts + framer-motion) before revealing content. Stage progression via TanStack Router navigation. Selected hook passed between stages 3→4 via URL search params.

**Tech Stack:** TanStack Router (file-based routing), React 19, framer-motion, Lucide icons, shadcn/ui (Card, Button, Badge, Input), existing source-tag/insight-line/thin-progress/risk-badge components.

---

### File Structure

```
src/
  routes/broker/$slug/
    produce.tsx                    MODIFY → layout route (Outlet + progress stepper + broker context)
    produce/
      index.tsx                    CREATE → Stage 1: Upload Listing (moved from produce.tsx)
      analysis.tsx                 CREATE → Stage 2: Property Analysis
      hooks.tsx                    CREATE → Stage 3: Hook Matching
      risk.tsx                     CREATE → Stage 4: Risk & Recommendation
  components/
    production-progress.tsx        CREATE → Shared progress stepper component
    agent-status.tsx               CREATE → Shared "agent working" status line with spinner
    upload-stage.tsx               EXISTS → Already rebuilt, no changes needed
    hook-card.tsx                  MODIFY → Add selected/selectable state
    intelligence-panels.tsx        EXISTS → Will reuse PropertyAnalysisPanel internals
    source-tag.tsx                 EXISTS → Reuse SourceTag, InsightLine, SourceTagLegend
    thin-progress.tsx              EXISTS → Reuse in risk dimensions
    risk-badge.tsx                 EXISTS → Reuse in hook cards
```

---

### Task 1: Production Progress Stepper Component

**Files:**
- Create: `src/components/production-progress.tsx`

- [ ] **Step 1: Create the progress stepper component**

```tsx
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
  // Determine which step index we're on by matching the end of the current path
  const currentIndex = STEPS.findIndex((step) => currentPath.endsWith(step.path));
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-center gap-0 w-full max-w-xl mx-auto">
      {STEPS.map((step, i) => {
        const isCompleted = i < activeIndex;
        const isCurrent = i === activeIndex;

        return (
          <div key={step.path} className="flex items-center flex-1 last:flex-none">
            {/* Step indicator */}
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

            {/* Connector line */}
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v "globals.css"`
Expected: No new errors

- [ ] **Step 3: Commit**

```bash
git add src/components/production-progress.tsx
git commit -m "feat: add production progress stepper component"
```

---

### Task 2: Agent Status Component

**Files:**
- Create: `src/components/agent-status.tsx`

- [ ] **Step 1: Create the agent status line component**

This is the shared "agent working" animation pattern used by stages 2, 3, and 4. It manages a sequence of labeled steps, running them on mount with configurable delays, and exposes the current step index so the parent can show/hide content sections.

```tsx
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
  /** Called each time a step completes, with the 0-based index of the step that just finished */
  onStepComplete?: (stepIndex: number) => void;
}

export function useAgentSequence(steps: AgentStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  // Track which steps have finished (for staggered content reveals)
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v "globals.css"`
Expected: No new errors

- [ ] **Step 3: Commit**

```bash
git add src/components/agent-status.tsx
git commit -m "feat: add agent status sequence component for agentic simulation"
```

---

### Task 3: Convert produce.tsx to Layout Route + Create Upload Stage Route

**Files:**
- Modify: `src/routes/broker/$slug/produce.tsx`
- Create: `src/routes/broker/$slug/produce/index.tsx`

- [ ] **Step 1: Create the upload stage route**

Move the current produce page content into `produce/index.tsx`, changing navigation on "Start Production" to go to the analysis page:

```tsx
// src/routes/broker/$slug/produce/index.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { UploadStage } from "@/components/upload-stage";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/")({
  component: UploadIndexPage,
});

function UploadIndexPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const navigate = useNavigate();

  if (!broker) {
    return <p className="text-muted-foreground p-6">Broker not found.</p>;
  }

  return (
    <Card>
      <CardContent className="p-5">
        <UploadStage
          broker={broker}
          onStart={() =>
            navigate({
              to: "/broker/$slug/produce/analysis",
              params: { slug },
            })
          }
          started={false}
        />
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Convert produce.tsx to a layout route**

Replace `produce.tsx` with a layout that renders the progress stepper, broker context bar, and an Outlet:

```tsx
// src/routes/broker/$slug/produce.tsx
import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { ProductionProgress } from "@/components/production-progress";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce")({
  component: ProduceLayout,
});

function ProduceLayout() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  if (!broker) {
    return (
      <>
        <Nav />
        <div className="pt-14 max-w-5xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-6">
        {/* Progress stepper */}
        <div className="mb-6">
          <ProductionProgress currentPath={currentPath} />
        </div>

        {/* Page header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Hook Production</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Agentic pipeline — upload, analyze, match, assess risk.
          </p>
        </div>

        {/* Stage content */}
        <Outlet />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Regenerate TanStack Router route tree**

Run: `npx tsr generate`
Expected: Route tree regenerated with new nested routes

- [ ] **Step 4: Verify it compiles and builds**

Run: `npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/routes/broker/\$slug/produce.tsx src/routes/broker/\$slug/produce/index.tsx src/routeTree.gen.ts
git commit -m "feat: convert produce to layout route, move upload to produce/index"
```

---

### Task 4: Stage 2 — Property Analysis Page

**Files:**
- Create: `src/routes/broker/$slug/produce/analysis.tsx`

- [ ] **Step 1: Create the property analysis page**

```tsx
// src/routes/broker/$slug/produce/analysis.tsx
import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Image, Scan, Tag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { InsightLine } from "@/components/source-tag";
import { ThinProgress } from "@/components/thin-progress";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/analysis")({
  component: AnalysisPage,
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

function AnalysisPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const navigate = useNavigate();

  const [showAssets, setShowAssets] = useState(false);
  const [showClassification, setShowClassification] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const property = broker?.demoProperty;

  const agentSteps: AgentStep[] = useMemo(
    () => [
      { label: "Scanning uploaded assets...", duration: 1000 },
      { label: "Categorizing property...", duration: 800 },
      ...(property?.features.map((f) => ({
        label: `Extracting feature: ${f.name}...`,
        duration: 500,
      })) ?? []),
    ],
    [property],
  );

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      if (stepIndex === 0) setShowAssets(true);
      if (stepIndex === 1) setShowClassification(true);
      if (stepIndex >= 2) setVisibleFeatures(stepIndex - 1);
    },
    [],
  );

  const handleComplete = useCallback(() => {
    setVisibleFeatures(property?.features.length ?? 0);
    setAnalysisComplete(true);
  }, [property]);

  if (!broker || !property) {
    return <p className="text-muted-foreground">Broker not found.</p>;
  }

  return (
    <div>
      {/* Agent status */}
      <AgentStatus
        steps={agentSteps}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Scanned assets row */}
      {showAssets && (
        <motion.div {...fadeSlide} className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Scan className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">
              {property.assets.length} assets scanned
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {property.assets.map((asset, i) => (
              <motion.div
                key={asset.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="aspect-square rounded-md border border-border bg-muted/50 flex flex-col items-center justify-center gap-0.5"
              >
                <Image className="h-3 w-3 text-muted-foreground" />
                <span className="text-[8px] text-muted-foreground">{asset.label}</span>
                <span className="text-[7px] text-muted-foreground/60">{asset.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Property classification */}
      {showClassification && (
        <motion.div {...fadeSlide} className="mb-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Property Classification
                </span>
              </div>
              <div className="text-[18px] font-bold">{property.type}</div>
              <div className="text-[12px] text-muted-foreground">{property.subtype}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{property.address}</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detected features */}
      {visibleFeatures > 0 && (
        <motion.div {...fadeSlide} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Detected Features
            </span>
          </div>
          <div className="space-y-2">
            {property.features.slice(0, visibleFeatures).map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-[12px]">{feature.name}</span>
                      <span className="font-mono text-[var(--color-green)] text-[11px] font-semibold">
                        {Math.round(feature.confidence * 100)}%
                      </span>
                    </div>
                    <ThinProgress
                      percent={feature.confidence * 100}
                      className="mb-2"
                    />
                    <div className="space-y-0.5">
                      {feature.insights.map((insight, j) => (
                        <InsightLine key={j} insight={insight} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* KPI callout + human gate */}
      {analysisComplete && (
        <motion.div {...fadeSlide}>
          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-4 text-[11px] text-muted-foreground">
            Feature detection accuracy directly impacts return rate. Higher
            confidence scores mean fewer hallucination-driven returns.
          </div>
          <Button
            className="w-full"
            onClick={() =>
              navigate({
                to: "/broker/$slug/produce/hooks",
                params: { slug },
              })
            }
          >
            Confirm Property Profile
          </Button>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Regenerate route tree and verify build**

Run: `npx tsr generate && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/routes/broker/\$slug/produce/analysis.tsx src/routeTree.gen.ts
git commit -m "feat: add Stage 2 — Property Analysis with agentic simulation"
```

---

### Task 5: Add Selectable State to HookCard

**Files:**
- Modify: `src/components/hook-card.tsx`

- [ ] **Step 1: Add selected and onSelect props to HookCard**

Add `selected?: boolean` and `onSelect?: () => void` props. When `onSelect` is provided, the card is clickable. When `selected`, show a selected ring:

In `hook-card.tsx`, change the interface and the Card wrapper:

```tsx
// At the top, update the interface:
interface HookCardProps {
  result: HookSelectionResult;
  selected?: boolean;
  onSelect?: () => void;
}

// Update the function signature:
export function HookCard({ result, selected, onSelect }: HookCardProps) {

// Update the Card element (replace the existing <Card> opening tag):
    <Card
      className={cn(
        "relative transition-colors",
        isRecommended && !selected && "border-[var(--color-green)]",
        isBlocked && "opacity-50",
        selected && "border-foreground ring-1 ring-foreground",
        onSelect && !isBlocked && "cursor-pointer hover:border-muted-foreground",
      )}
      onClick={!isBlocked && onSelect ? onSelect : undefined}
    >
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v "globals.css"`
Expected: No new errors (existing usages don't pass the new optional props, so they work unchanged)

- [ ] **Step 3: Commit**

```bash
git add src/components/hook-card.tsx
git commit -m "feat: add selected/selectable state to HookCard"
```

---

### Task 6: Stage 3 — Hook Matching Page

**Files:**
- Create: `src/routes/broker/$slug/produce/hooks.tsx`

- [ ] **Step 1: Create the hook matching page**

```tsx
// src/routes/broker/$slug/produce/hooks.tsx
import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, TrendingUp, GitCompare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { SourceTagLegend } from "@/components/source-tag";
import { HookCard } from "@/components/hook-card";
import { getBroker, getHookType, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/hooks")({
  component: HooksPage,
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

function HooksPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const navigate = useNavigate();

  const [showRules, setShowRules] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [visibleHooks, setVisibleHooks] = useState(0);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);

  const hookResults = broker?.hookSelectionResults ?? [];

  const agentSteps: AgentStep[] = useMemo(
    () => [
      { label: "Loading broker brand rules...", duration: 600 },
      { label: "Pulling market data...", duration: 800 },
      ...hookResults.map((r) => ({
        label: `Matching assets to ${getHookType(r.hookTypeId)?.name ?? r.hookTypeId}...`,
        duration: 600,
      })),
    ],
    [hookResults],
  );

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      if (stepIndex === 0) setShowRules(true);
      if (stepIndex === 1) setShowMarket(true);
      if (stepIndex >= 2) setVisibleHooks(stepIndex - 1);
    },
    [],
  );

  const handleComplete = useCallback(() => {
    setVisibleHooks(hookResults.length);
    setMatchingComplete(true);
    // Pre-select recommended hook
    const recommended = hookResults.find((r) => r.status === "recommended");
    if (recommended) setSelectedHook(recommended.hookTypeId);
  }, [hookResults]);

  if (!broker) {
    return <p className="text-muted-foreground">Broker not found.</p>;
  }

  const selectedHookName = selectedHook
    ? getHookType(selectedHook)?.name ?? "Hook"
    : null;

  return (
    <div>
      {/* Agent status */}
      <AgentStatus
        steps={agentSteps}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Broker rules flash */}
      {showRules && (
        <motion.div {...fadeSlide} className="mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Broker Brand Rules
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {broker.brandIntelligence.hookApproachRules.map((rule) => (
                  <span
                    key={rule.hookType}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded border",
                      rule.status === "approved" && "border-[var(--color-green)]/30 text-[var(--color-green)]",
                      rule.status === "blocked" && "border-[var(--color-red)]/30 text-[var(--color-red)]",
                      rule.status === "conditional" && "border-[var(--color-orange)]/30 text-[var(--color-orange)]",
                    )}
                  >
                    {rule.status === "approved" ? "+" : rule.status === "blocked" ? "x" : "~"}{" "}
                    {rule.hookType}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {broker.brandIntelligence.guardrails.map((g, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[9px] px-2 py-0.5 rounded",
                      g.severity === "hard"
                        ? "bg-[var(--color-guardrail-bg)] text-[var(--color-guardrail)]"
                        : "bg-[color:oklch(0.7_0.15_70/0.12)] text-[var(--color-orange)]",
                    )}
                  >
                    {g.rule}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Market data */}
      {showMarket && (
        <motion.div {...fadeSlide} className="mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Market Data
                </span>
              </div>
              <div className="flex gap-4 text-[11px]">
                <span>
                  <span className="text-muted-foreground">Posts: </span>
                  <span className="font-mono font-semibold">{marketData.totalPosts}</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Geography: </span>
                  <span>{marketData.geography}</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Period: </span>
                  <span>{marketData.period}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Source tag legend */}
      {visibleHooks > 0 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitCompare className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Hook Matching Results
            </span>
          </div>
          <SourceTagLegend />
        </div>
      )}

      {/* Hook cards grid */}
      {visibleHooks > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {hookResults.slice(0, visibleHooks).map((result, i) => (
            <motion.div
              key={result.hookTypeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <HookCard
                result={result}
                selected={selectedHook === result.hookTypeId}
                onSelect={() => {
                  if (result.status !== "blocked") {
                    setSelectedHook(result.hookTypeId);
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* KPI callout + human gate */}
      {matchingComplete && (
        <motion.div {...fadeSlide}>
          <div className="rounded-lg border border-border bg-muted/30 p-3 mb-4 text-[11px] text-muted-foreground">
            Hook selection considers brand compliance (return rate), asset
            coverage (production quality), and market performance (engagement).
          </div>
          <Button
            className="w-full"
            disabled={!selectedHook}
            onClick={() =>
              navigate({
                to: "/broker/$slug/produce/risk",
                params: { slug },
                search: { hook: selectedHook! },
              })
            }
          >
            {selectedHook
              ? `Continue with ${selectedHookName}`
              : "Select a hook to continue"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Need cn import for the rules
import { cn } from "@/lib";
```

**Note:** The `cn` import should be at the top with the other imports. Move it there during implementation.

- [ ] **Step 2: Regenerate route tree and verify build**

Run: `npx tsr generate && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/routes/broker/\$slug/produce/hooks.tsx src/routeTree.gen.ts
git commit -m "feat: add Stage 3 — Hook Matching with agentic simulation"
```

---

### Task 7: Stage 4 — Risk & Recommendation Page

**Files:**
- Create: `src/routes/broker/$slug/produce/risk.tsx`

- [ ] **Step 1: Create the risk & recommendation page**

```tsx
// src/routes/broker/$slug/produce/risk.tsx
import { useState, useCallback, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Target, BarChart3 } from "lucide-react";
import { cn } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentStatus, type AgentStep } from "@/components/agent-status";
import { SourceTag } from "@/components/source-tag";
import { ThinProgress } from "@/components/thin-progress";
import { getBroker, getHookType, getMarketData } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/risk")({
  component: RiskPage,
  validateSearch: (search: Record<string, unknown>) => ({
    hook: (search.hook as string) ?? "",
  }),
});

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const AGENT_STEPS: AgentStep[] = [
  { label: "Calculating hallucination risk...", duration: 800 },
  { label: "Evaluating brand compliance...", duration: 600 },
  { label: "Checking broker track record...", duration: 600 },
  { label: "Generating recommendation...", duration: 500 },
];

function RiskPage() {
  const { slug } = Route.useParams();
  const { hook: hookId } = Route.useSearch();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const hookResult = broker?.hookSelectionResults.find(
    (r) => r.hookTypeId === hookId,
  );
  const hookType = getHookType(hookId);

  const handleStepComplete = useCallback((stepIndex: number) => {
    setVisibleSections(stepIndex + 1);
  }, []);

  const handleComplete = useCallback(() => {
    setAssessmentComplete(true);
  }, []);

  if (!broker || !hookResult || !hookType) {
    return <p className="text-muted-foreground">Hook not found.</p>;
  }

  // Risk dimension data (hardcoded for demo, derived from existing data)
  const riskDimensions = [
    {
      label: "Hallucination complexity",
      value: hookResult.hallucinationRisk.level,
      percent: hookResult.hallucinationRisk.level === "Low" ? 15 : hookResult.hallucinationRisk.level === "Medium" ? 50 : 85,
      color: hookResult.hallucinationRisk.level === "Low" ? "var(--color-green)" : hookResult.hallucinationRisk.level === "Medium" ? "var(--color-orange)" : "var(--color-red)",
      source: "GUARDRAIL" as const,
      detail: hookResult.hallucinationRisk.explanation,
    },
    {
      label: "Brand fit",
      value: hookResult.status === "recommended" ? "Strong" : hookResult.status === "available" ? "Good" : "Weak",
      percent: hookResult.status === "recommended" ? 85 : hookResult.status === "available" ? 65 : 30,
      color: hookResult.status === "recommended" ? "var(--color-green)" : "var(--color-orange)",
      source: "BROKER" as const,
      detail: broker.brandIntelligence.hookApproachRules.find((r) => r.hookType === hookType.name)?.reasoning ?? "Matches broker brand profile",
    },
    {
      label: "Asset coverage",
      value: `${hookResult.assetsMatched.matched}/${hookResult.assetsMatched.total}`,
      percent: (hookResult.assetsMatched.matched / hookResult.assetsMatched.total) * 100,
      color: hookResult.assetsMatched.matched === hookResult.assetsMatched.total ? "var(--color-green)" : "var(--color-orange)",
      source: undefined,
      detail: hookResult.assetsMatched.missingNote ?? "All required assets available",
    },
    {
      label: "Market signal",
      value: "3.2x",
      percent: 78,
      color: "var(--color-green)",
      source: "MARKET" as const,
      detail: "Top performer for Dutch suburban real estate",
    },
  ];

  return (
    <div>
      {/* Selected hook header */}
      <Card className="mb-4">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="text-[22px]">{hookType.icon}</div>
          <div>
            <div className="font-bold text-[14px]">{hookType.name}</div>
            <div className="text-[11px] text-muted-foreground">{hookType.description}</div>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-green-subtle)] text-[var(--color-green)] font-semibold">
              Complexity: {hookResult.complexity}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Agent status */}
      <AgentStatus
        steps={AGENT_STEPS}
        onComplete={handleComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Risk dimensions — appear one by one */}
      {visibleSections >= 1 && (
        <motion.div {...fadeSlide} className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Risk Assessment
            </span>
          </div>
          <div className="space-y-3">
            {riskDimensions.slice(0, Math.min(visibleSections, riskDimensions.length)).map((dim, i) => (
              <motion.div
                key={dim.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold">{dim.label}</span>
                      <span
                        className="font-mono text-[11px] font-semibold"
                        style={{ color: dim.color }}
                      >
                        {dim.value}
                      </span>
                    </div>
                    <ThinProgress percent={dim.percent} color={dim.color} className="mb-1.5" />
                    <div className="flex items-center gap-1">
                      {dim.source && <SourceTag type={dim.source} />}
                      <span className="text-[10px] text-muted-foreground">{dim.detail}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendation + reference posts */}
      {assessmentComplete && (
        <motion.div {...fadeSlide}>
          {/* Risk vs return rate callout */}
          <Card className="mb-4 border-[var(--color-green)]/30">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-3.5 w-3.5 text-[var(--color-green)]" />
                <span className="text-[12px] font-bold text-[var(--color-green)]">
                  Recommendation: {hookType.name}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">
                Creative ambition and return rate are directly proportional. This
                hook scores <strong className="text-foreground">{hookResult.hallucinationRisk.level}</strong> risk,
                protecting {broker.name}'s{" "}
                <strong className="text-[var(--color-green)]">{broker.rejectionLog.returnRate}</strong> return rate.
              </p>
              <p className="text-[11px] text-muted-foreground">
                Lowest complexity. Best brand fit. Strongest market signal.{" "}
                {broker.rejectionLog.consecutiveAccepted} consecutive accepts on this hook type.
              </p>
            </CardContent>
          </Card>

          {/* Reference posts */}
          <Card className="mb-4">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Market Reference
                </span>
              </div>
              <div className="space-y-1">
                {marketData.referencePosts.map((post, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-muted rounded px-2 py-1.5 text-[10px]"
                  >
                    <span className="text-muted-foreground">{post.description}</span>
                    <span className="font-mono font-semibold">{post.views}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Human gate */}
          <Button
            className="w-full"
            onClick={() =>
              navigate({
                to: "/broker/$slug/reveal",
                params: { slug },
              })
            }
          >
            Generate {hookType.name}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Regenerate route tree and verify build**

Run: `npx tsr generate && npx vite build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/routes/broker/\$slug/produce/risk.tsx src/routeTree.gen.ts
git commit -m "feat: add Stage 4 — Risk & Recommendation with agentic simulation"
```

---

### Task 8: Clean Up — Remove Old Produce Inline Stages

**Files:**
- Verify: `src/routes/broker/$slug/produce.tsx` no longer imports old components
- Delete unused code from `intelligence-panels.tsx` if no longer used elsewhere

- [ ] **Step 1: Verify produce.tsx is clean**

The layout route from Task 3 should not import `IntelligencePanels`, `HookSelection`, or `UploadStage`. Confirm this is the case.

- [ ] **Step 2: Check if intelligence-panels.tsx is used anywhere else**

Run: `grep -r "IntelligencePanels" src/ --include="*.tsx" --include="*.ts"`
Expected: No imports remain (the old produce.tsx was the only consumer)

- [ ] **Step 3: Full build verification**

Run: `npx vite build 2>&1 | tail -10`
Expected: Clean build with all routes included

- [ ] **Step 4: Commit cleanup if anything was changed**

```bash
git add -A
git commit -m "chore: clean up old production flow references"
```
