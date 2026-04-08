# ReelForge Demo App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the ReelForge demo as a 4-screen click-through app with two broker profiles, flat JSON data, and no backend — ready for Thomas to present live to Bright River.

**Architecture:** TanStack Start + TanStack Router file-based routing. All data in a single JSON import (no API, no Convex). Dark theme. Screens: Dashboard → Broker Preset → Production Flow → Hook Reveal. Two complete broker profiles (Homey + Van der Berg) prove brand translation.

**Tech Stack:** React 19, TanStack Start/Router, Vite 7, Tailwind CSS v4 (oklch), Framer Motion, Lucide React, shadcn/ui components (existing)

**Spec:** `domains/studio/knowledge/reelforge-demo-spec.md`
**PRD Walkthrough:** `workspace/reelforge-prd-walkthrough/index.html`
**Existing App:** `domains/studio/apps/reelforge-demo/` (carries over: Vite config, Tailwind, shadcn/ui, Framer Motion, fonts, cn() utility)

---

## File Map

```
domains/studio/apps/reelforge-demo/
├── src/
│   ├── routes/
│   │   ├── __root.tsx              (MODIFY — strip Convex, add dark class, add Nav)
│   │   ├── index.tsx               (MODIFY — redirect to /dashboard)
│   │   ├── dashboard.tsx           (CREATE — Screen 1)
│   │   └── broker/
│   │       ├── $slug.tsx           (CREATE — Screen 2)
│   │       └── $slug/
│   │           ├── produce.tsx     (CREATE — Screen 3)
│   │           └── reveal.tsx      (CREATE — Screen 4)
│   ├── components/
│   │   ├── ui/                     (KEEP — existing shadcn components)
│   │   ├── nav.tsx                 (CREATE — fixed top navigation)
│   │   ├── kpi-badge.tsx           (CREATE — single metric display)
│   │   ├── source-tag.tsx          (CREATE — MARKET/BROKER/GUARDRAIL pill)
│   │   ├── insight-line.tsx        (CREATE — source tag + text)
│   │   ├── risk-badge.tsx          (CREATE — Low/Medium/High/Blocked)
│   │   ├── section-label.tsx       (CREATE — uppercase muted header)
│   │   ├── thin-progress.tsx       (CREATE — colored thin bar)
│   │   ├── broker-table.tsx        (CREATE — Screen 1 table)
│   │   ├── visual-identity-card.tsx    (CREATE — Screen 2 left)
│   │   ├── brand-intelligence.tsx      (CREATE — Screen 2 center)
│   │   ├── rejection-log.tsx           (CREATE — Screen 2 timeline)
│   │   ├── sla-card.tsx                (CREATE — Screen 2 right top)
│   │   ├── performance-card.tsx        (CREATE — Screen 2 right mid)
│   │   ├── data-depth-card.tsx         (CREATE — Screen 2 right bottom)
│   │   ├── upload-stage.tsx            (CREATE — Screen 3 stage 1)
│   │   ├── intelligence-panels.tsx     (CREATE — Screen 3 stage 2, 3 panels)
│   │   ├── hook-selection.tsx          (CREATE — Screen 3 stage 3, 2x2 grid)
│   │   ├── hook-card.tsx               (CREATE — single hook card)
│   │   ├── video-preview.tsx           (CREATE — Screen 4 left)
│   │   ├── split-kpi-panel.tsx         (CREATE — Screen 4 metrics)
│   │   ├── adjustment-card.tsx         (CREATE — Screen 4 adjustment)
│   │   ├── delivery-package.tsx        (CREATE — Screen 4 package card)
│   │   └── performance-brief.tsx       (CREATE — Screen 4 brief preview)
│   ├── data/
│   │   ├── types.ts                (CREATE — all TypeScript interfaces)
│   │   ├── demo-data.ts            (CREATE — inline JSON data for both brokers)
│   │   └── get-data.ts             (CREATE — lookup helpers)
│   ├── lib/
│   │   ├── utils.ts                (KEEP)
│   │   └── index.ts                (MODIFY — remove Convex re-export)
│   └── styles/
│       └── globals.css             (MODIFY — update theme tokens for spec colors)
├── package.json                    (MODIFY — remove convex, remove firecrawl)
├── vite.config.ts                  (KEEP)
└── tsconfig.json                   (MODIFY — remove convex path)
```

**Files to DELETE:**
- `src/lib/convex.ts`
- `src/components/phases/` (entire directory — old wizard flow)
- `src/components/brand-card.tsx`
- `src/components/insight-card.tsx`
- `src/components/video-player.tsx`
- `src/components/optimization-meter.tsx`
- `src/components/shimmer.tsx`
- `src/lib/types.ts` (replaced by `data/types.ts`)
- `src/lib/demo-data.ts` (replaced by `data/demo-data.ts`)
- `convex/` (entire directory)

---

## Task 1: Project Reset

Strip Convex, clean old files, update routing skeleton, verify dev server.

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `src/routes/__root.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/lib/index.ts`
- Modify: `src/styles/globals.css`
- Delete: `src/lib/convex.ts`, `convex/`, `src/components/phases/`, `src/components/brand-card.tsx`, `src/components/insight-card.tsx`, `src/components/video-player.tsx`, `src/components/optimization-meter.tsx`, `src/components/shimmer.tsx`, `src/lib/types.ts`, `src/lib/demo-data.ts`
- Create: `src/routes/dashboard.tsx`, `src/routes/broker/$slug.tsx`, `src/routes/broker/$slug/produce.tsx`, `src/routes/broker/$slug/reveal.tsx`

- [ ] **Step 1: Remove Convex and old component files**

```bash
cd domains/studio/apps/reelforge-demo
rm -rf convex/
rm -f src/lib/convex.ts src/lib/types.ts src/lib/demo-data.ts
rm -rf src/components/phases/
rm -f src/components/brand-card.tsx src/components/insight-card.tsx src/components/video-player.tsx src/components/optimization-meter.tsx src/components/shimmer.tsx
```

- [ ] **Step 2: Update package.json — remove Convex dependency**

Remove `"convex"` from dependencies in `package.json`. Keep everything else. Run:

```bash
cd domains/studio/apps/reelforge-demo
npm uninstall convex
```

- [ ] **Step 3: Update tsconfig.json — remove Convex path**

Remove the `"convex/_generated/*"` path entry from `tsconfig.json`. Keep the `@/*` alias.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 4: Update src/lib/index.ts — remove Convex re-export**

```typescript
export { cn } from "./utils";
```

- [ ] **Step 5: Update globals.css — set dark theme colors to match spec**

Replace the `:root` light theme variables and `.dark` theme with a single set that matches the spec's dark mode tokens. The spec defines specific hex colors (not oklch), so add custom properties that map to those. Keep the existing Tailwind/shadcn structure but override the color values.

Add these custom properties at the top of the `:root` block (after the shadcn vars):

```css
:root {
  /* Spec-aligned dark mode (always dark for demo) */
  --background: oklch(0.11 0.035 275);      /* #0d0e14 */
  --foreground: oklch(0.93 0.008 280);      /* #e8e8ec */
  --card: oklch(0.14 0.035 275);            /* #151720 */
  --card-foreground: oklch(0.93 0.008 280);
  --surface: oklch(0.16 0.035 275);         /* #151720 */
  --surface-raised: oklch(0.19 0.035 275);  /* #1c1e2a */
  --muted-foreground: oklch(0.55 0.015 280); /* #8b8d9a */
  --border: oklch(1 0 0 / 8%);             /* #2a2d3a */
  --brand: oklch(0.72 0.10 300);            /* #b8a0d0 */

  /* Spec source-tag colors */
  --color-market: #5ba0d0;
  --color-market-bg: rgba(46, 134, 222, 0.12);
  --color-broker: #7aba7a;
  --color-broker-bg: rgba(122, 186, 122, 0.12);
  --color-guardrail: #ff6b6b;
  --color-guardrail-bg: rgba(255, 107, 107, 0.12);
  --color-green: #7aba7a;
  --color-orange: #ff9800;
  --color-red: #ff6b6b;
}
```

Remove the `.dark` block — the app is always dark. Remove the light-mode `:root` values (replace, don't duplicate).

- [ ] **Step 6: Update __root.tsx — strip Convex, always dark**

```tsx
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ReelForge — Bright River" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Create route shells**

Create empty route files so TanStack Router generates the route tree.

`src/routes/index.tsx`:
```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});
```

`src/routes/dashboard.tsx`:
```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return <div className="p-6">Dashboard — coming soon</div>;
}
```

`src/routes/broker/$slug.tsx`:
```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/broker/$slug")({
  component: BrokerPresetPage,
});

function BrokerPresetPage() {
  const { slug } = Route.useParams();
  return <div className="p-6">Broker Preset — {slug}</div>;
}
```

`src/routes/broker/$slug/produce.tsx`:
```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/broker/$slug/produce")({
  component: ProductionFlowPage,
});

function ProductionFlowPage() {
  const { slug } = Route.useParams();
  return <div className="p-6">Production Flow — {slug}</div>;
}
```

`src/routes/broker/$slug/reveal.tsx`:
```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/broker/$slug/reveal")({
  component: HookRevealPage,
});

function HookRevealPage() {
  const { slug } = Route.useParams();
  return <div className="p-6">Hook Reveal — {slug}</div>;
}
```

- [ ] **Step 8: Install dependencies and verify dev server**

```bash
cd domains/studio/apps/reelforge-demo
npm install
npm run dev
```

Expected: Dev server starts, visiting `/` redirects to `/dashboard`, all 4 route shells render text. No Convex errors.

- [ ] **Step 9: Commit**

```bash
git add -A domains/studio/apps/reelforge-demo/
git commit -m "refactor: strip Convex, reset routes for 4-screen demo"
```

---

## Task 2: Data Layer

Create TypeScript types, full demo data for both brokers, and lookup helpers.

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/demo-data.ts`
- Create: `src/data/get-data.ts`

- [ ] **Step 1: Create src/data/types.ts**

Copy all interfaces exactly from spec Section 3. This is the single source of truth for data shapes. File path: `domains/studio/apps/reelforge-demo/src/data/types.ts`.

```typescript
export interface DemoData {
  org: Organization;
  brokers: Broker[];
  hookTypes: HookType[];
  marketData: MarketData;
}

export interface Organization {
  name: string;
  product: string;
  headerKpis: {
    hooksThisWeek: number;
    avgTurnaround: string;
    returnRate: string;
    avgCost: string;
  };
}

export interface Broker {
  slug: string;
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  logoLetter: string;
  fonts: string;
  websiteUrl: string;
  brandIntelligence: BrandIntelligence;
  rejectionLog: RejectionLog;
  productionSla: ProductionSla;
  contentPerformance: ContentPerformance;
  dataDepth: DataDepth;
  demoProperty: DemoProperty;
  hookSelectionResults: HookSelectionResult[];
  revealData: RevealData;
}

export interface BrandIntelligence {
  whoTheyAre: string;
  targetAudience: {
    demographic: string;
    priceSegment: string;
    geographicFocus: string;
    socialPresence: string;
  };
  communicationStyle: {
    tags: string[];
    voiceDescription: string;
  };
  hookApproachRules: HookApproachRule[];
  guardrails: Guardrail[];
}

export interface HookApproachRule {
  hookType: string;
  status: "approved" | "blocked" | "conditional";
  reasoning: string;
}

export interface Guardrail {
  severity: "hard" | "warning";
  rule: string;
}

export interface RejectionLog {
  totalHooks: number;
  totalReturned: number;
  returnRate: string;
  entries: RejectionEntry[];
  consecutiveAccepted: number;
  consecutiveAcceptedSince: string;
  returnRateTrend: { month1: string; month3: string };
}

export interface RejectionEntry {
  hookNumber: number;
  date: string;
  reason: string;
  systemAnalysis: string;
  guardrailAdded: string;
}

export interface ProductionSla {
  returnRate: string;
  returnRateTrend: string;
  turnaround: string;
  costPerHook: string;
  hooksDelivered: number;
}

export interface ContentPerformance {
  avgViews: string;
  avgViewsTrend: string;
  topHook: string;
  vsStandard: string;
}

export interface DataDepth {
  market: { count: string; percent: number };
  crossIndustry: { count: string; percent: number };
  brokerSpecific: { count: string; percent: number };
}

export interface DemoProperty {
  type: string;
  subtype: string;
  address: string;
  assets: PropertyAsset[];
  features: PropertyFeature[];
}

export interface PropertyAsset {
  label: string;
  role: string;
}

export interface PropertyFeature {
  name: string;
  confidence: number;
  insights: SourceTaggedInsight[];
}

export interface SourceTaggedInsight {
  source: "MARKET" | "BROKER" | "GUARDRAIL";
  text: string;
}

export interface HookType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface HookSelectionResult {
  hookTypeId: string;
  status: "recommended" | "available" | "weak" | "blocked";
  complexity: "Low" | "Medium" | "High";
  hallucinationRisk: {
    level: "Low" | "Medium" | "High";
    explanation: string;
  };
  insights: SourceTaggedInsight[];
  assetsMatched: {
    matched: number;
    total: number;
    details: string[];
    missingNote?: string;
  };
  blockedReason?: string;
}

export interface RevealData {
  productionQuality: {
    returnRate: string;
    returnRateTrend: "↓" | "↑" | "→";
    turnaround: string;
    cost: string;
    guardrailViolations: number;
  };
  expectedPerformance: {
    views: string;
    retention: string;
    brandRecall: string;
    dataPoints: string;
  };
  creativeRationale: string;
  creativeTags: string[];
  adjustments: Adjustment[];
  brandedOverlay: {
    logoPosition: string;
    accentStyle: string;
    endCard: { ctaText: string; ctaUrl: string };
  };
  deliveryPackage: {
    hookSummary: { hookType: string; property: string; platform: string };
    whyThisHook: string;
    brandMatchChecklist: string[];
    propertyFeaturesHighlighted: string[];
    endCard: { ctaText: string; brokerUrl: string };
    optimizationNote: string;
  };
}

export interface Adjustment {
  name: string;
  risk: "Low" | "Medium" | "High";
  whatChanges: string;
  hallucinationRisk: string;
  insights: SourceTaggedInsight[];
  tradeoffs: { positive: string; negative: string };
}

export interface MarketData {
  totalPosts: string;
  geography: string;
  period: string;
  referencePosts: ReferencePost[];
}

export interface ReferencePost {
  description: string;
  views: string;
}
```

- [ ] **Step 2: Create src/data/demo-data.ts — Homey broker (full data)**

This is the complete dataset for the Homey broker. File: `domains/studio/apps/reelforge-demo/src/data/demo-data.ts`.

**This is a large file.** Build it by populating every field from the spec Section 7 and the PRD walkthrough mockups. The data should match exactly what appears in the PRD walkthrough HTML — every metric, every insight, every rejection log entry.

Key data points to include for Homey:
- All values from the PRD walkthrough mockup (lines 137–183 for dashboard, 296–477 for broker preset, 547–1014 for production flow, 1041–1545 for reveal)
- `slug: "homey"`, `name: "Homey"`, `tagline: "Modern · Mid-market"`, `colors.primary: "#4CAF50"`
- `rejectionLog.entries`: 2 entries — Hook #8 (formal styling) and Hook #3 (garden hallucination)
- `hookSelectionResults`: 4 entries — Door Reveal (recommended), Price Tag (available), Before/After (weak), Cinematic (blocked)
- `revealData.adjustments`: 4 entries — More brand presence (Low), Add voiceover (Medium), Wider framing (High), Switch to Price Tag (Low)
- `revealData.deliveryPackage`: full performance brief content

Also include the Van der Berg broker with contrasting data:
- `slug: "van-der-berg"`, `name: "Van der Berg Makelaars"`, `tagline: "Traditional · Premium"`, `colors.primary: "#C62828"`
- Cinematic hook recommended (opposite of Homey)
- Price Tag blocked (undermines prestige)
- Return rate 1.2% (higher but improving)
- Tone: authoritative, understated, professional

Export as `export const DEMO_DATA: DemoData = { ... }`.

Reference the PRD walkthrough mockups at `workspace/reelforge-prd-walkthrough/index.html` for exact text values. Every string that appears in the UI should come from this data file, not be hardcoded in components.

- [ ] **Step 3: Create src/data/get-data.ts — lookup helpers**

```typescript
import { DEMO_DATA } from "./demo-data";
import type { Broker } from "./types";

export function getOrg() {
  return DEMO_DATA.org;
}

export function getBrokers() {
  return DEMO_DATA.brokers;
}

export function getBroker(slug: string): Broker | undefined {
  return DEMO_DATA.brokers.find((b) => b.slug === slug);
}

export function getHookTypes() {
  return DEMO_DATA.hookTypes;
}

export function getHookType(id: string) {
  return DEMO_DATA.hookTypes.find((h) => h.id === id);
}

export function getMarketData() {
  return DEMO_DATA.marketData;
}
```

- [ ] **Step 4: Verify types compile**

```bash
cd domains/studio/apps/reelforge-demo
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add data layer — types, demo data, helpers"
```

---

## Task 3: Shared Components

Small, reusable primitives used across multiple screens.

**Files:**
- Create: `src/components/nav.tsx`
- Create: `src/components/kpi-badge.tsx`
- Create: `src/components/source-tag.tsx`
- Create: `src/components/insight-line.tsx`
- Create: `src/components/risk-badge.tsx`
- Create: `src/components/section-label.tsx`
- Create: `src/components/thin-progress.tsx`

- [ ] **Step 1: Create nav.tsx — fixed top navigation**

```tsx
import { Link, useMatches } from "@tanstack/react-router";
import { cn } from "@/lib";

interface NavProps {
  brokerSlug?: string;
  brokerName?: string;
}

const tabs = [
  { label: "1. Dashboard", to: "/dashboard" as const },
  { label: "2. Broker Preset", toFn: (s: string) => `/broker/${s}` },
  { label: "3. Production Flow", toFn: (s: string) => `/broker/${s}/produce` },
  { label: "4. Hook Reveal", toFn: (s: string) => `/broker/${s}/reveal` },
];

export function Nav({ brokerSlug, brokerName }: NavProps) {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 h-12">
      <div className="text-sm font-bold">
        Bright River <span className="font-normal text-muted-foreground">/ ReelForge</span>
      </div>
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const href = tab.to ?? (brokerSlug ? tab.toFn!(brokerSlug) : null);
          if (!href) return null;

          const isActive = currentPath === href || currentPath.startsWith(href + "/");
          const label = tab.label.includes("Broker") && brokerName
            ? tab.label.replace("Broker Preset", brokerName)
            : tab.label;

          return (
            <Link
              key={tab.label}
              to={href}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors",
                isActive
                  ? "bg-[var(--brand-subtle)] text-[var(--brand)] font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create kpi-badge.tsx**

```tsx
import { cn } from "@/lib";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function KpiBadge({ value, label, highlight, size = "md", className }: KpiBadgeProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };
  return (
    <div className={cn("text-center", className)}>
      <div className={cn("font-mono font-bold", sizeClasses[size], highlight && "text-[var(--color-green)]")}>
        {value}
      </div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create source-tag.tsx**

```tsx
import { cn } from "@/lib";
import type { SourceTaggedInsight } from "@/data/types";

type TagType = "MARKET" | "BROKER" | "GUARDRAIL";

const tagStyles: Record<TagType, string> = {
  MARKET: "bg-[var(--color-market-bg)] text-[var(--color-market)]",
  BROKER: "bg-[var(--color-broker-bg)] text-[var(--color-broker)]",
  GUARDRAIL: "bg-[var(--color-guardrail-bg)] text-[var(--color-guardrail)]",
};

export function SourceTag({ type }: { type: TagType }) {
  return (
    <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-semibold", tagStyles[type])}>
      {type}
    </span>
  );
}

export function InsightLine({ insight }: { insight: SourceTaggedInsight }) {
  return (
    <div className="flex gap-1 flex-wrap items-start">
      <SourceTag type={insight.source} />
      <span className="text-[10px] text-muted-foreground">{insight.text}</span>
    </div>
  );
}

export function SourceTagLegend() {
  return (
    <div className="flex gap-3 items-center text-[10px] text-muted-foreground">
      <span>Source tags:</span>
      <SourceTag type="MARKET" /> <span>2,400+ posts dataset</span>
      <SourceTag type="BROKER" /> <span>Broker history</span>
      <SourceTag type="GUARDRAIL" /> <span>From rejection log</span>
    </div>
  );
}
```

- [ ] **Step 4: Create risk-badge.tsx**

```tsx
import { cn } from "@/lib";

type RiskLevel = "Low" | "Medium" | "High" | "Blocked";

const styles: Record<RiskLevel, string> = {
  Low: "bg-[rgba(122,186,122,0.1)] text-[var(--color-green)]",
  Medium: "bg-[rgba(255,152,0,0.1)] text-[var(--color-orange)]",
  High: "bg-[rgba(255,107,107,0.1)] text-[var(--color-red)]",
  Blocked: "bg-[rgba(255,107,107,0.1)] text-[var(--color-red)]",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const label = level === "Blocked" ? "Blocked" : `Risk: ${level}`;
  return (
    <span className={cn("text-[9px] font-semibold px-2 py-0.5 rounded", styles[level])}>
      {label}
    </span>
  );
}
```

- [ ] **Step 5: Create section-label.tsx and thin-progress.tsx**

`section-label.tsx`:
```tsx
import { cn } from "@/lib";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-2.5", className)}>
      {children}
    </div>
  );
}
```

`thin-progress.tsx`:
```tsx
import { cn } from "@/lib";

interface ThinProgressProps {
  percent: number;
  color?: string;
  className?: string;
}

export function ThinProgress({ percent, color = "var(--color-green)", className }: ThinProgressProps) {
  return (
    <div className={cn("h-1 rounded-full bg-border overflow-hidden", className)}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  );
}
```

- [ ] **Step 6: Wire Nav into __root.tsx**

Update `__root.tsx` to include the Nav. For now, it doesn't know the broker context — that'll come from route params.

```tsx
// In RootLayout, wrap Outlet with the Nav
import { Nav } from "@/components/nav";

function RootLayout() {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

**Note:** The Nav component will be rendered in each page route (not __root) so it can receive broker context from route params. This avoids prop drilling through the root layout.

- [ ] **Step 7: Verify all components render**

Create a quick test in `dashboard.tsx`:

```tsx
import { KpiBadge } from "@/components/kpi-badge";
import { SourceTag } from "@/components/source-tag";
import { RiskBadge } from "@/components/risk-badge";
import { SectionLabel } from "@/components/section-label";

function DashboardPage() {
  return (
    <div className="p-12 space-y-6">
      <KpiBadge value="47" label="Hooks This Week" />
      <SourceTag type="MARKET" />
      <SourceTag type="BROKER" />
      <SourceTag type="GUARDRAIL" />
      <RiskBadge level="Low" />
      <RiskBadge level="High" />
      <RiskBadge level="Blocked" />
      <SectionLabel>Production SLA</SectionLabel>
    </div>
  );
}
```

Run dev server, visit `/dashboard`. Verify all primitives render with correct colors.

- [ ] **Step 8: Commit**

```bash
git add src/components/nav.tsx src/components/kpi-badge.tsx src/components/source-tag.tsx src/components/risk-badge.tsx src/components/section-label.tsx src/components/thin-progress.tsx
git commit -m "feat: add shared UI primitives — nav, KPI badge, source tags, risk badge"
```

---

## Task 4: Screen 1 — Production Dashboard

**Files:**
- Create: `src/components/broker-table.tsx`
- Modify: `src/routes/dashboard.tsx`

- [ ] **Step 1: Create broker-table.tsx**

This renders the broker list with columns: Broker (logo + name + tags), Brand (color swatches), Hooks (count), Return Rate (rate + trend), Avg Views (count + trend), Action (Generate Hook button).

Reference: PRD walkthrough lines 148–183 for exact HTML structure.

```tsx
import { Link } from "@tanstack/react-router";
import type { Broker } from "@/data/types";
import { cn } from "@/lib";

export function BrokerTable({ brokers }: { brokers: Broker[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="font-semibold text-sm">Broker Clients</span>
          <span className="text-muted-foreground text-[11px] ml-2">
            · {brokers.length} active · {brokers.reduce((s, b) => s + b.productionSla.hooksDelivered, 0)} hooks delivered
          </span>
        </div>
        <div className="bg-card border border-border rounded-md px-2.5 py-1 text-[11px] text-muted-foreground">
          + Add Broker
        </div>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            {["Broker", "Brand", "Hooks", "Return Rate", "Avg Views", ""].map((h) => (
              <th key={h} className={cn(
                "py-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium",
                ["Hooks", "Return Rate", "Avg Views"].includes(h) ? "text-center" : "text-left",
                h === "" && "text-right"
              )}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr key={broker.slug} className="border-b border-border">
              {/* Broker */}
              <td className="py-2.5 px-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: broker.colors.primary }}
                  >
                    {broker.logoLetter}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{broker.name}</div>
                    <div className="text-[10px] text-muted-foreground">{broker.tagline}</div>
                  </div>
                </div>
              </td>
              {/* Brand colors */}
              <td className="py-2.5 px-2">
                <div className="flex gap-1">
                  {Object.values(broker.colors).slice(0, 3).map((c, i) => (
                    <div key={i} className="w-3.5 h-3.5 rounded" style={{ background: c }} />
                  ))}
                </div>
              </td>
              {/* Hooks */}
              <td className="text-center py-2.5 px-2 font-mono font-semibold">
                {broker.productionSla.hooksDelivered}
              </td>
              {/* Return Rate */}
              <td className="text-center py-2.5 px-2">
                <div className="font-mono font-semibold text-[var(--color-green)]">
                  {broker.productionSla.returnRate}
                </div>
                <div className="text-[9px] text-[var(--color-green)]">
                  {broker.productionSla.returnRateTrend}
                </div>
              </td>
              {/* Avg Views */}
              <td className="text-center py-2.5 px-2">
                <div className="font-mono font-semibold">{broker.contentPerformance.avgViews}</div>
                <div className="text-[9px] text-[var(--color-green)]">
                  {broker.contentPerformance.avgViewsTrend}
                </div>
              </td>
              {/* Action */}
              <td className="text-right py-2.5 px-2">
                <Link
                  to="/broker/$slug"
                  params={{ slug: broker.slug }}
                  className="inline-block bg-[var(--brand-subtle)] text-[var(--brand)] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[var(--brand-glow)] transition-colors"
                >
                  Generate Hook →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Build dashboard.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { KpiBadge } from "@/components/kpi-badge";
import { BrokerTable } from "@/components/broker-table";
import { getOrg, getBrokers } from "@/data/get-data";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const org = getOrg();
  const brokers = getBrokers();
  const kpis = org.headerKpis;

  return (
    <>
      <Nav />
      <div className="pt-12 max-w-[1200px] mx-auto px-6 py-8">
        {/* Header KPIs */}
        <div className="flex justify-between items-center pb-4 border-b border-border mb-4">
          <div className="font-bold text-[15px]">
            {org.name} <span className="font-normal text-muted-foreground">/ {org.product}</span>
          </div>
          <div className="flex gap-5">
            <KpiBadge value={kpis.hooksThisWeek} label="Hooks This Week" />
            <KpiBadge value={kpis.avgTurnaround} label="Avg Turnaround" />
            <KpiBadge value={kpis.returnRate} label="Return Rate" highlight />
            <KpiBadge value={kpis.avgCost} label="Avg Cost / Hook" />
          </div>
        </div>

        {/* Broker Table */}
        <BrokerTable brokers={brokers} />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify Screen 1**

Run dev server. Visit `/dashboard`. Verify:
- Header KPIs show (47, 34s, 0.8% in green, €2.30)
- Two broker rows with colors, metrics, trend arrows
- "Generate Hook →" buttons link to `/broker/homey` and `/broker/van-der-berg`

- [ ] **Step 4: Commit**

```bash
git add src/routes/dashboard.tsx src/components/broker-table.tsx
git commit -m "feat: Screen 1 — production dashboard with header KPIs and broker table"
```

---

## Task 5: Screen 2 — Broker Production Preset

The most component-dense screen. 3-column layout with brand intelligence center.

**Files:**
- Create: `src/components/visual-identity-card.tsx`
- Create: `src/components/brand-intelligence.tsx`
- Create: `src/components/rejection-log.tsx`
- Create: `src/components/sla-card.tsx`
- Create: `src/components/performance-card.tsx`
- Create: `src/components/data-depth-card.tsx`
- Modify: `src/routes/broker/$slug.tsx`

- [ ] **Step 1: Create left-column components**

`visual-identity-card.tsx` — logo letter, colors, fonts:
```tsx
import type { Broker } from "@/data/types";
import { SectionLabel } from "@/components/section-label";

export function VisualIdentityCard({ broker }: { broker: Broker }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <SectionLabel>Visual Identity</SectionLabel>
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[15px] font-bold text-white"
          style={{ background: broker.colors.primary }}
        >
          {broker.logoLetter}
        </div>
        <div>
          <div className="font-bold text-sm">{broker.name}</div>
          <div className="text-[10px] text-muted-foreground">{broker.websiteUrl}</div>
        </div>
      </div>
      <div className="flex gap-1.5 mb-2">
        {Object.values(broker.colors).map((c, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded"
            style={{ background: c, border: c === "#FFFFFF" ? "1px solid var(--border)" : undefined }}
          />
        ))}
      </div>
      <div className="text-[11px] text-muted-foreground">{broker.fonts}</div>
    </div>
  );
}
```

`sla-card.tsx`:
```tsx
import type { ProductionSla } from "@/data/types";
import { SectionLabel } from "@/components/section-label";

export function SlaCard({ sla }: { sla: ProductionSla }) {
  const rows = [
    { label: "Return Rate", value: sla.returnRate, trend: sla.returnRateTrend, highlight: true },
    { label: "Turnaround", value: sla.turnaround },
    { label: "Cost / Hook", value: sla.costPerHook },
    { label: "Hooks Delivered", value: sla.hooksDelivered },
  ];
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <SectionLabel>Production SLA</SectionLabel>
      <div className="flex flex-col gap-1.5 text-xs">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-muted-foreground">{r.label}</span>
            <div>
              <span className={`font-mono font-semibold ${r.highlight ? "text-[var(--color-green)]" : ""}`}>
                {r.value}
              </span>
              {r.trend && (
                <span className="text-[9px] text-[var(--color-green)] ml-1">{r.trend}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground mt-2 pt-1.5 border-t border-border">
        Return rate improving — rejections fed back into guardrails.
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create brand-intelligence.tsx — the star center column**

This is the largest component. It renders: Who they are, Target audience, Communication style, Hook approach rules, Brand guardrails, and Rejection log.

Build this as a single component that takes a `Broker` and renders all 6 sections as divider-separated blocks inside a `bg-card` container. Reference PRD walkthrough lines 333–439 for the exact content structure.

Each section is a simple div — no need for sub-components. The hook approach rules use ✓/✗/~ icons. The guardrails use ⛔/⚠️. The rejection log is its own component imported from `rejection-log.tsx`.

- [ ] **Step 3: Create rejection-log.tsx — timeline component**

Build the rejection timeline with:
- Red left-border for returned entries (dot markers)
- Each entry: date, hook number, reason, system analysis card, guardrail-added callout
- Green footer: "NO RETURNS SINCE" with consecutive streak + return rate trend

Reference PRD walkthrough lines 384–437 for exact structure.

- [ ] **Step 4: Create right-column components**

`performance-card.tsx` — avg views, top hook, vs standard (the quiet Trojan horse):
```tsx
import type { ContentPerformance } from "@/data/types";
import { SectionLabel } from "@/components/section-label";

export function PerformanceCard({ perf }: { perf: ContentPerformance }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <SectionLabel>Content Performance</SectionLabel>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Avg Views</span>
          <div>
            <span className="font-mono font-semibold">{perf.avgViews}</span>
            <span className="text-[9px] text-[var(--color-green)] ml-1">{perf.avgViewsTrend}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Top Hook</span>
          <span className="font-medium">{perf.topHook}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">vs Standard</span>
          <span className="font-mono font-semibold text-[var(--color-green)]">{perf.vsStandard}</span>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground mt-2 pt-1.5 border-t border-border">
        Downstream data BR has never tracked.
      </div>
    </div>
  );
}
```

`data-depth-card.tsx`:
```tsx
import type { DataDepth } from "@/data/types";
import { SectionLabel } from "@/components/section-label";
import { ThinProgress } from "@/components/thin-progress";

export function DataDepthCard({ depth }: { depth: DataDepth }) {
  const items = [
    { label: "Market", ...depth.market, color: "var(--color-green)" },
    { label: "Cross-industry", ...depth.crossIndustry, color: "var(--color-green)" },
    { label: "Broker-specific", ...depth.brokerSpecific, color: "var(--color-orange)" },
  ];
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <SectionLabel>Data Depth</SectionLabel>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono text-[10px]" style={{ color: item.color }}>{item.count}</span>
            </div>
            <ThinProgress percent={item.percent} color={item.color} />
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">
        At 100+ hooks → shifts to broker-optimized predictions
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Assemble broker/$slug.tsx**

Wire all components into the 3-column grid layout. The page gets the broker via `Route.useParams()` + `getBroker(slug)`.

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { getBroker } from "@/data/get-data";
import { VisualIdentityCard } from "@/components/visual-identity-card";
import { BrandIntelligence } from "@/components/brand-intelligence";
import { SlaCard } from "@/components/sla-card";
import { PerformanceCard } from "@/components/performance-card";
import { DataDepthCard } from "@/components/data-depth-card";

export const Route = createFileRoute("/broker/$slug")({
  component: BrokerPresetPage,
});

function BrokerPresetPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  if (!broker) return <div className="p-12">Broker not found</div>;

  return (
    <>
      <Nav brokerSlug={slug} brokerName={broker.name} />
      <div className="pt-12 max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumb + CTA */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-foreground">
            ← Brokers <span className="mx-1">/</span>
            <span className="font-semibold text-foreground">{broker.name}</span>
          </Link>
          <Link
            to="/broker/$slug/produce"
            params={{ slug }}
            className="bg-[var(--brand-subtle)] text-[var(--brand)] px-5 py-2 rounded-lg text-xs font-semibold"
          >
            Generate Hook for {broker.name} →
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-[220px_1fr_260px] gap-3.5">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <VisualIdentityCard broker={broker} />
            <SlaCard sla={broker.productionSla} />
          </div>
          {/* Center */}
          <BrandIntelligence broker={broker} />
          {/* Right */}
          <div className="flex flex-col gap-3">
            <SlaCard sla={broker.productionSla} />
            <PerformanceCard perf={broker.contentPerformance} />
            <DataDepthCard depth={broker.dataDepth} />
          </div>
        </div>
      </div>
    </>
  );
}
```

**Note:** The left column shows a compact "Production" stats card (hooks, return rate, turnaround, cost). The right column shows the full SLA card. Adjust which component goes where — left column gets a simplified version, right column gets the full `SlaCard`. Alternatively, create a `ProductionStatsCard` for the left column that's more compact.

- [ ] **Step 6: Verify Screen 2**

Run dev server. Click "Generate Hook →" on Homey from the dashboard. Verify:
- 3-column layout renders
- Visual identity shows green logo + colors
- Brand intelligence center column shows all 6 sections
- Rejection log timeline renders with 2 entries
- Right column shows SLA + Performance + Data Depth
- "Generate Hook for Homey →" button links to `/broker/homey/produce`

- [ ] **Step 7: Commit**

```bash
git add src/routes/broker/ src/components/visual-identity-card.tsx src/components/brand-intelligence.tsx src/components/rejection-log.tsx src/components/sla-card.tsx src/components/performance-card.tsx src/components/data-depth-card.tsx
git commit -m "feat: Screen 2 — broker preset with brand intelligence, rejection log, SLA metrics"
```

---

## Task 6: Screen 3 — Production Flow

3 stages stacked vertically: Upload → Creative Intelligence → Hook Selection.

**Files:**
- Create: `src/components/upload-stage.tsx`
- Create: `src/components/intelligence-panels.tsx`
- Create: `src/components/hook-selection.tsx`
- Create: `src/components/hook-card.tsx`
- Modify: `src/routes/broker/$slug/produce.tsx`

- [ ] **Step 1: Create upload-stage.tsx**

Context bar at top showing active broker. Upload area with pre-filled thumbnails. "Start Production →" button.

Reference PRD walkthrough lines 547–576 for layout. The upload area is centered (max-w-lg). The context bar spans full width showing: broker logo, name, DNA tags, return rate, hook count.

The "Start Production →" button triggers showing Stage 2 (use React state: `const [stage, setStage] = useState(1)`).

- [ ] **Step 2: Create intelligence-panels.tsx — Stage 2**

Three-column grid with panels:
1. **Property Analysis** — property type, features with confidence + source-tagged insights
2. **Hook-Asset Matching** — which hooks are possible, asset mapping, source tags. Recommended gets green border, blocked gets opacity-45.
3. **Risk + Recommendation** — recommended hook, 5 risk dimensions (hallucination, brand fit, asset coverage, market signal, broker track record), reference posts.

Reference PRD walkthrough lines 614–826 for exact content.

Build as a single component that takes `broker.demoProperty`, `broker.hookSelectionResults`, and `marketData` as props. Three panels side-by-side, each in a `bg-card` container.

The source tag legend goes above the 3-column grid.

- [ ] **Step 3: Create hook-card.tsx — single hook type card**

Each card shows: icon + name + description + complexity badge, hallucination risk section, source-tagged insights, assets matched footer.

Card states control border and opacity:
- `recommended`: `border-2 border-[var(--color-green)]` + "Recommended" badge
- `available`: default border
- `weak`: default border, orange asset count
- `blocked`: `opacity-50`, red "Blocked" badge

Reference PRD walkthrough lines 863–1012 for Homey's 4 cards.

```tsx
import type { HookSelectionResult } from "@/data/types";
import { InsightLine } from "@/components/source-tag";
import { RiskBadge } from "@/components/risk-badge";
import { getHookType } from "@/data/get-data";
import { cn } from "@/lib";

export function HookCard({ result }: { result: HookSelectionResult }) {
  const hookType = getHookType(result.hookTypeId);
  if (!hookType) return null;

  const isRecommended = result.status === "recommended";
  const isBlocked = result.status === "blocked";

  return (
    <div className={cn(
      "rounded-xl border overflow-hidden relative",
      isRecommended && "border-2 border-[var(--color-green)]",
      isBlocked && "opacity-50 border-border",
      !isRecommended && !isBlocked && "border-border"
    )}>
      {isRecommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--color-green)] text-background px-3 py-0.5 rounded-b-lg text-[9px] font-bold uppercase tracking-wider">
          Recommended
        </div>
      )}

      {/* Header */}
      <div className="p-3.5 pb-2.5 flex justify-between items-start">
        <div className="flex gap-2.5 items-center">
          <span className="text-[22px]">{hookType.icon}</span>
          <div>
            <div className="font-bold text-sm">{hookType.name}</div>
            <div className="text-[10px] text-muted-foreground">{hookType.description}</div>
          </div>
        </div>
        {isBlocked ? (
          <RiskBadge level="Blocked" />
        ) : (
          <span className={cn(
            "text-[9px] font-semibold px-2 py-0.5 rounded",
            result.complexity === "Low" && "bg-[rgba(122,186,122,0.1)] text-[var(--color-green)]",
            result.complexity === "Medium" && "bg-[rgba(255,152,0,0.1)] text-[var(--color-orange)]",
            result.complexity === "High" && "bg-[rgba(255,107,107,0.1)] text-[var(--color-red)]"
          )}>
            Complexity: {result.complexity}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3.5 pb-3 flex flex-col gap-1.5 text-[11px]">
        {/* Hallucination risk */}
        <div className="bg-background rounded-md p-2">
          <div className="font-semibold text-foreground text-[10px] mb-1">Hallucination risk</div>
          <div className="text-muted-foreground">{result.hallucinationRisk.explanation}</div>
        </div>

        {/* Source-tagged insights */}
        {result.insights.map((insight, i) => (
          <InsightLine key={i} insight={insight} />
        ))}

        {/* Assets matched */}
        {!isBlocked && (
          <div className="border-t border-border pt-1.5 mt-0.5">
            <div className="text-[10px] text-muted-foreground mb-1">
              Assets matched: <strong className={cn(
                result.assetsMatched.matched === result.assetsMatched.total ? "text-[var(--color-green)]" : "",
                result.assetsMatched.matched === 0 && "text-[var(--color-orange)]"
              )}>
                {result.assetsMatched.matched}/{result.assetsMatched.total}
              </strong>
            </div>
            <div className="text-[10px] text-muted-foreground">
              {result.assetsMatched.details.join(" · ")}
            </div>
            {result.assetsMatched.missingNote && (
              <div className="text-[10px] text-[var(--color-orange)] mt-0.5">
                {result.assetsMatched.missingNote}
              </div>
            )}
          </div>
        )}

        {isBlocked && result.blockedReason && (
          <div className="border-t border-border pt-1.5 mt-0.5 text-[10px] text-[var(--color-red)]">
            {result.blockedReason}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create hook-selection.tsx — 2x2 grid**

```tsx
import { Link } from "@tanstack/react-router";
import type { HookSelectionResult } from "@/data/types";
import { HookCard } from "@/components/hook-card";
import { getHookType } from "@/data/get-data";

interface Props {
  results: HookSelectionResult[];
  brokerSlug: string;
}

export function HookSelection({ results, brokerSlug }: Props) {
  const recommended = results.find((r) => r.status === "recommended");
  const recommendedName = recommended ? getHookType(recommended.hookTypeId)?.name : "Hook";

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {results.map((result) => (
          <HookCard key={result.hookTypeId} result={result} />
        ))}
      </div>
      <div className="text-center">
        <Link
          to="/broker/$slug/reveal"
          params={{ slug: brokerSlug }}
          className="inline-block bg-[var(--brand-subtle)] text-[var(--brand)] px-6 py-2.5 rounded-lg text-xs font-semibold"
        >
          Generate {recommendedName} →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Assemble produce.tsx**

Wire all 3 stages into the page. Use state to control stage visibility: `stage >= 2` shows intelligence panels, `stage >= 3` shows hook selection.

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { getBroker, getMarketData } from "@/data/get-data";
import { UploadStage } from "@/components/upload-stage";
import { IntelligencePanels } from "@/components/intelligence-panels";
import { HookSelection } from "@/components/hook-selection";
import { SourceTagLegend } from "@/components/source-tag";

export const Route = createFileRoute("/broker/$slug/produce")({
  component: ProductionFlowPage,
});

function ProductionFlowPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const marketData = getMarketData();
  const [stage, setStage] = useState(1);

  if (!broker) return <div className="p-12">Broker not found</div>;

  return (
    <>
      <Nav brokerSlug={slug} brokerName={broker.name} />
      <div className="pt-12 max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-[var(--brand)]">
          Screen 3 of 4
        </div>
        <h2 className="text-xl font-bold mb-1">Production Flow</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Three stages: Upload Listing → Creative Intelligence → Hook Selection.
        </p>

        {/* Stage 1 */}
        <h3 className="text-sm font-semibold mb-3">Stage 1: Upload Listing</h3>
        <UploadStage broker={broker} onStartProduction={() => setStage(2)} started={stage >= 2} />

        {/* Stage 2 */}
        {stage >= 2 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Stage 2: Creative Intelligence</h3>
            <SourceTagLegend />
            <div className="mt-3">
              <IntelligencePanels
                property={broker.demoProperty}
                hookResults={broker.hookSelectionResults}
                marketData={marketData}
              />
            </div>
          </div>
        )}

        {/* Stage 3 */}
        {stage >= 2 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Stage 3: Hook Selection</h3>
            <HookSelection results={broker.hookSelectionResults} brokerSlug={slug} />
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 6: Verify Screen 3**

Run dev server. Navigate to `/broker/homey/produce`. Verify:
- Stage 1: context bar shows Homey, upload area with 6 thumbnails
- Click "Start Production →": Stage 2 appears with 3 intelligence panels
- Stage 3: 2x2 hook cards — Door Reveal (green recommended), Price Tag, Before/After (orange), Cinematic (blocked, dimmed)
- "Generate Door Reveal →" links to `/broker/homey/reveal`

- [ ] **Step 7: Commit**

```bash
git add src/routes/broker/\$slug/produce.tsx src/components/upload-stage.tsx src/components/intelligence-panels.tsx src/components/hook-selection.tsx src/components/hook-card.tsx
git commit -m "feat: Screen 3 — production flow with upload, intelligence panels, hook selection"
```

---

## Task 7: Screen 4 — Hook Reveal + Delivery Package

The climax. Video left, intelligence stack right, delivery package below.

**Files:**
- Create: `src/components/video-preview.tsx`
- Create: `src/components/split-kpi-panel.tsx`
- Create: `src/components/adjustment-card.tsx`
- Create: `src/components/delivery-package.tsx`
- Create: `src/components/performance-brief.tsx`
- Modify: `src/routes/broker/$slug/reveal.tsx`

- [ ] **Step 1: Create video-preview.tsx**

9:16 aspect ratio placeholder with branded overlay elements. Broker logo bottom-left, duration bottom-right, end card reference.

```tsx
import type { Broker } from "@/data/types";

export function VideoPreview({ broker }: { broker: Broker }) {
  return (
    <div>
      <div className="aspect-[9/16] bg-[#0a0a0a] rounded-xl border border-border flex items-center justify-center mb-2.5 relative">
        <div className="text-3xl">▶</div>
        {/* Branded overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: broker.colors.primary }}
            />
            <span className="text-[9px] font-semibold">{broker.name}</span>
          </div>
          <div className="bg-black/70 px-2 py-1 rounded text-[9px] text-muted-foreground">
            0:03
          </div>
        </div>
        {/* Brand accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
          style={{ background: broker.colors.primary }}
        />
      </div>
      <div className="flex gap-1.5">
        <button className="flex-1 bg-[var(--brand-subtle)] text-[var(--brand)] py-2 rounded-lg text-[11px] font-semibold text-center">
          ↓ Export Package
        </button>
        <button className="flex-1 border border-border py-2 rounded-lg text-[11px] font-medium text-center">
          ↻ New Variation
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create split-kpi-panel.tsx**

The honest KPI split. Left side (Production Quality) is large and bold. Right side (Expected Performance) is smaller and muted. Separated by a 1px divider.

```tsx
import type { RevealData } from "@/data/types";
import { SectionLabel } from "@/components/section-label";

export function SplitKpiPanel({ data }: { data: RevealData }) {
  const pq = data.productionQuality;
  const ep = data.expectedPerformance;

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="grid grid-cols-[1fr_1px_1fr] gap-4">
        {/* LEFT: Production Quality — lead, large */}
        <div>
          <SectionLabel>Production Quality</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-[var(--color-green)]">
                {pq.returnRate} <span className="text-sm">{pq.returnRateTrend}</span>
              </div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Return Rate</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg font-bold">{pq.turnaround}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Turnaround</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg font-bold">{pq.cost}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Production Cost</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-lg font-bold">{pq.guardrailViolations}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Guardrail Violations</div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="bg-border" />

        {/* RIGHT: Expected Performance — secondary, muted */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <SectionLabel className="mb-0">Expected Performance</SectionLabel>
            <div className="text-[8px] text-muted-foreground bg-background px-1.5 py-0.5 rounded">
              Based on market benchmarks
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { value: ep.views, label: "Expected Views" },
              { value: ep.retention, label: "3s Retention Lift" },
              { value: ep.brandRecall, label: "Brand Recall" },
              { value: ep.dataPoints, label: "Data Points" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-mono text-sm text-muted-foreground">{item.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create adjustment-card.tsx**

Each adjustment card shows: name + risk badge, what changes, hallucination risk, source-tagged insights, trade-off footer.

```tsx
import type { Adjustment } from "@/data/types";
import { InsightLine } from "@/components/source-tag";
import { RiskBadge } from "@/components/risk-badge";

export function AdjustmentCard({ adj }: { adj: Adjustment }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-3 py-2.5 bg-background">
        <div className="text-xs font-semibold">{adj.name}</div>
        <RiskBadge level={adj.risk} />
      </div>
      <div className="px-3 py-2.5 flex flex-col gap-1.5 text-[11px]">
        <div className="text-muted-foreground">
          <strong className="text-foreground">What changes:</strong> {adj.whatChanges}
        </div>
        <div className="text-muted-foreground">
          <strong className="text-foreground">Hallucination risk:</strong> {adj.hallucinationRisk}
        </div>
        {adj.insights.map((insight, i) => (
          <InsightLine key={i} insight={insight} />
        ))}
        <div className="flex gap-2 pt-1.5 border-t border-border">
          <div className="text-[10px]">
            <span className="text-[var(--color-green)]">+</span>{" "}
            <span className="text-muted-foreground">{adj.tradeoffs.positive}</span>
          </div>
          <div className="text-[10px]">
            <span className={adj.risk === "High" ? "text-[var(--color-red)]" : "text-[var(--color-orange)]"}>−</span>{" "}
            <span className="text-muted-foreground">{adj.tradeoffs.negative}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create delivery-package.tsx and performance-brief.tsx**

`delivery-package.tsx` — the green-bordered card with 3 items (Hook Video, Performance Brief, Selected Assets). Reference PRD lines 1300–1324.

`performance-brief.tsx` — the full document-style brief that appears below the main grid. Contains: package header, video thumbnail + file list, and the brief with 7 sections (Hook Summary, Production Quality, Expected Performance, Brand Match, Property Features, End Card/CTA, Optimization Note). Reference PRD lines 1370–1507.

These are large but straightforward components — mostly static layout with data from `broker.revealData.deliveryPackage`.

- [ ] **Step 5: Assemble reveal.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { getBroker } from "@/data/get-data";
import { VideoPreview } from "@/components/video-preview";
import { SplitKpiPanel } from "@/components/split-kpi-panel";
import { AdjustmentCard } from "@/components/adjustment-card";
import { DeliveryPackageCard } from "@/components/delivery-package";
import { PerformanceBrief } from "@/components/performance-brief";
import { SectionLabel } from "@/components/section-label";

export const Route = createFileRoute("/broker/$slug/reveal")({
  component: HookRevealPage,
});

function HookRevealPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  if (!broker) return <div className="p-12">Broker not found</div>;

  const reveal = broker.revealData;

  return (
    <>
      <Nav brokerSlug={slug} brokerName={broker.name} />
      <div className="pt-12 max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-[var(--brand)]">
          Screen 4 of 4
        </div>
        <h2 className="text-xl font-bold mb-1">Hook Reveal + Delivery Package</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Video + honest metrics + data-backed adjustments + exportable delivery package.
        </p>

        {/* Main 2-column grid */}
        <div className="grid grid-cols-[300px_1fr] gap-5">
          {/* Left: Video */}
          <VideoPreview broker={broker} />

          {/* Right: Intelligence stack */}
          <div className="flex flex-col gap-3.5">
            <SplitKpiPanel data={reveal} />

            {/* Creative rationale */}
            <div className="bg-card rounded-xl border border-border p-4">
              <SectionLabel>Creative Rationale</SectionLabel>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {reveal.creativeRationale}
              </p>
              <div className="flex gap-1.5 mt-1.5">
                {reveal.creativeTags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[rgba(76,175,80,0.12)] text-[var(--color-green)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Adjustments */}
            <div className="bg-card rounded-xl border border-border p-4">
              <SectionLabel>Adjustments</SectionLabel>
              <p className="text-[11px] text-muted-foreground mb-3">
                Each adjustment shows what changes in production, the risk, and what market + broker data says.
              </p>
              <div className="flex flex-col gap-2.5">
                {reveal.adjustments.map((adj) => (
                  <AdjustmentCard key={adj.name} adj={adj} />
                ))}
              </div>
            </div>

            {/* Delivery package summary */}
            <DeliveryPackageCard broker={broker} />
          </div>
        </div>

        {/* Delivery Package Deep Dive */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-3">
            The Delivery Package — What the Broker Actually Receives
          </h3>
          <PerformanceBrief broker={broker} />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 6: Verify Screen 4**

Run dev server. Navigate through the full flow: Dashboard → Homey → Produce → Reveal. Verify:
- Video placeholder with branded overlay (green stripe, Homey badge)
- Split KPI panel — left side (return rate 0.8% ↓) is visually dominant, right side (3.2x, 67%) is muted/smaller
- Creative rationale with green tags
- 4 adjustment cards with correct risk levels
- Delivery package card with 3 items
- Full performance brief below with all 7 sections

- [ ] **Step 7: Test both brokers**

Navigate to `/broker/van-der-berg` and verify:
- Red color scheme throughout
- Different brand intelligence (traditional, premium)
- Cinematic hook recommended (opposite of Homey)
- Price Tag blocked
- Different return rate, different metrics

- [ ] **Step 8: Commit**

```bash
git add src/routes/broker/\$slug/reveal.tsx src/components/video-preview.tsx src/components/split-kpi-panel.tsx src/components/adjustment-card.tsx src/components/delivery-package.tsx src/components/performance-brief.tsx
git commit -m "feat: Screen 4 — hook reveal with split KPIs, adjustments, delivery package"
```

---

## Task 8: Polish & Final Verification

**Files:**
- Possibly modify: various components for spacing/alignment tweaks

- [ ] **Step 1: Full walkthrough — Homey flow**

Navigate the complete demo as Thomas would:
1. `/dashboard` — see both brokers, header KPIs
2. Click "Generate Hook →" on Homey
3. `/broker/homey` — see brand intelligence, rejection log, SLA metrics
4. Click "Generate Hook for Homey →"
5. `/broker/homey/produce` — see upload area, click "Start Production →", see 3 intelligence panels, see 4 hook cards
6. Click "Generate Door Reveal →"
7. `/broker/homey/reveal` — see video, KPIs, adjustments, delivery package

Check every metric matches the PRD walkthrough. Check source tags render with correct colors. Check return rate leads everywhere.

- [ ] **Step 2: Full walkthrough — Van der Berg flow**

Repeat the same flow for Van der Berg. Verify brand translation — different colors, different recommended hook, different metrics.

- [ ] **Step 3: Fix any visual issues**

Compare each screen against the PRD walkthrough (`workspace/reelforge-prd-walkthrough/index.html`) and adjust spacing, font sizes, colors as needed.

- [ ] **Step 4: Final commit**

```bash
git add -A domains/studio/apps/reelforge-demo/
git commit -m "polish: final visual alignment pass across all 4 screens"
```

---

## Spec Coverage Checklist

| Spec Requirement | Task |
|-----------------|------|
| TanStack Start + Router + Vite | Task 1 |
| Flat JSON data, no Convex | Task 1 (strip) + Task 2 (data) |
| Dark mode always | Task 1 (globals.css) |
| Screen 1: Dashboard with header KPIs + broker table | Task 4 |
| Screen 2: 3-column broker preset | Task 5 |
| Screen 2: Brand intelligence center column | Task 5 |
| Screen 2: Rejection log timeline | Task 5 |
| Screen 3: Upload → Intelligence → Selection (3 stages) | Task 6 |
| Screen 3: Source tag system (MARKET/BROKER/GUARDRAIL) | Task 3 + Task 6 |
| Screen 3: Hook cards with hallucination risk as lead metric | Task 6 |
| Screen 4: Split KPI panel (production quality dominant) | Task 7 |
| Screen 4: Expected performance as quiet secondary | Task 7 |
| Screen 4: Adjustment cards with risk + trade-offs | Task 7 |
| Screen 4: Delivery package with performance brief | Task 7 |
| Screen 4: Branded overlay + end card CTA | Task 7 |
| Two broker profiles (Homey + Van der Berg) | Task 2 |
| Return rate leads everywhere | Task 2 (data) + all screens |
| Navigation between all screens | Task 3 (nav) + all routes |
| No tests (demo code) | N/A — visual verification only |
