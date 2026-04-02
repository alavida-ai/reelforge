---
description: Full implementation spec for the ReelForge demo app — 4 screens, data model, component architecture, demo data strategy
last-validated: 2026-04-02
confidence: high
validated-by: alexander-girardet
tags: [spec, studio, demo, implementation]
---

# ReelForge Demo App — Implementation Spec

**Version:** 1.0
**Date:** 2026-04-02
**Source:** PRD walkthrough (`workspace/reelforge-prd-walkthrough/index.html`) + Apr 1–2 sync decisions
**Stack:** TanStack Start + TanStack Router + Vite + React 19, flat JSON data, static demo — no backend, no auth, no database

---

## 1. Purpose & Constraints

### What this is
A click-through demo app that Thomas presents live to Bright River's contact. It simulates what a production version of ReelForge would look like — broker management, brand intelligence, hook generation, and delivery packaging — using hardcoded data for two brokers.

### What this is NOT
- Not a working product — no real AI generation, no live data pipeline
- Not something we send ahead — presented live only
- No auth, no user accounts, no multi-tenancy
- No Convex, no database — flat JSON/YAML data files only

### Key design principles
1. **Lead with return rate** — their SLA metric, not brand compliance or FTR
2. **Performance narrative is a value-add, not the lead** — don't imply BR takes responsibility for conversion
3. **Source attribution everywhere** — every insight tagged `MARKET` / `BROKER` / `GUARDRAIL`
4. **Honest KPI split** — production quality (defensible) vs expected performance (projected)
5. **Risk/hallucination is first-class** — creative ambition and rejection rate are directly proportional
6. **Rejection log IS the optimization loop** — each rejection feeds back into guardrails, each guardrail reduces future return rate. The story is told in their metric.
7. **Two brokers, different DNA** — Homey (modern/mid-market/green) and Van der Berg (traditional/premium/red) prove the system adapts

---

## 2. Information Architecture

TanStack Router file-based routing (auto-generated route tree):

```
src/routes/
  __root.tsx                    Root layout (nav, providers, dark theme)
  index.tsx                     Redirect → /dashboard
  dashboard.tsx                 Screen 1: Production Dashboard
  broker/
    $slug.tsx                   Screen 2: Broker Production Preset
    $slug/
      produce.tsx               Screen 3: Production Flow (3 stages)
      reveal.tsx                Screen 4: Hook Reveal + Delivery Package
```

**URL structure:**
```
/dashboard                     Screen 1
/broker/homey                  Screen 2
/broker/homey/produce          Screen 3
/broker/homey/reveal           Screen 4
```

### Navigation
- Fixed top bar: "Bright River / ReelForge" left, screen tabs right
- Tabs: 1. Dashboard → 2. Broker Preset → 3. Production Flow → 4. Hook Reveal
- Tabs are contextual — Screens 2–4 show the active broker name
- Breadcrumb on Screen 2: `← Brokers / Homey`
- TanStack Router `<Link>` for navigation, `useParams()` for slug

---

## 3. Data Model

All data lives in a single JSON file: `data/demo-data.json`. No API routes. Imported directly.

### Schema

```typescript
// data/types.ts

interface DemoData {
  org: Organization;
  brokers: Broker[];
  hookTypes: HookType[];
  marketData: MarketData;
}

interface Organization {
  name: string;           // "Bright River"
  product: string;        // "ReelForge"
  headerKpis: {
    hooksThisWeek: number;
    avgTurnaround: string;
    returnRate: string;
    avgCost: string;
  };
}

interface Broker {
  slug: string;                    // "homey" | "van-der-berg"
  name: string;                    // "Homey"
  tagline: string;                 // "Modern · Mid-market"
  colors: {
    primary: string;               // "#4CAF50"
    secondary: string;             // "#2E7D32"
    accent: string;                // "#1B1B1B"
    background: string;            // "#FFFFFF"
  };
  logoLetter: string;              // "H"
  fonts: string;                   // "Montserrat · Inter"
  websiteUrl: string;              // "homey.nl"

  // Brand intelligence (center column, Screen 2)
  brandIntelligence: {
    whoTheyAre: string;            // narrative paragraph
    targetAudience: {
      demographic: string;
      priceSegment: string;
      geographicFocus: string;
      socialPresence: string;
    };
    communicationStyle: {
      tags: string[];              // ["Warm", "Conversational", ...]
      voiceDescription: string;    // "Your friend who happens to know real estate."
    };
    hookApproachRules: HookApproachRule[];
    guardrails: Guardrail[];
  };

  // Rejection log
  rejectionLog: {
    totalHooks: number;
    totalReturned: number;
    returnRate: string;
    entries: RejectionEntry[];
    consecutiveAccepted: number;
    consecutiveAcceptedSince: string;  // ISO date
    returnRateTrend: { month1: string; month3: string };
  };

  // Production SLA (right column, Screen 2)
  productionSla: {
    returnRate: string;
    returnRateTrend: string;       // "↓ 0.3pp"
    turnaround: string;
    costPerHook: string;
    hooksDelivered: number;
  };

  // Content performance (right column, Screen 2)
  contentPerformance: {
    avgViews: string;
    avgViewsTrend: string;         // "↑ 23%"
    topHook: string;
    vsStandard: string;
  };

  // Data depth
  dataDepth: {
    market: { count: string; percent: number };
    crossIndustry: { count: string; percent: number };
    brokerSpecific: { count: string; percent: number };
  };

  // Demo property (Screen 3 — pre-loaded)
  demoProperty: DemoProperty;

  // Hook selection results (Screen 3 Stage 3)
  hookSelectionResults: HookSelectionResult[];

  // Reveal data (Screen 4)
  revealData: RevealData;
}

interface HookApproachRule {
  hookType: string;                // "AI Influencer"
  status: "approved" | "blocked" | "conditional";  // ✓ / ✗ / ~
  reasoning: string;
}

interface Guardrail {
  severity: "hard" | "warning";    // ⛔ or ⚠️
  rule: string;
}

interface RejectionEntry {
  hookNumber: number;
  date: string;                    // ISO date
  reason: string;                  // operator-facing
  systemAnalysis: string;          // AI analysis
  guardrailAdded: string;          // what constraint was added
}

interface DemoProperty {
  type: string;                    // "Suburban Family Home"
  subtype: string;                 // "Modern Renovation · Mid-to-High Range"
  address: string;                 // "Kerkstraat 42, Haarlem"
  assets: PropertyAsset[];
  features: PropertyFeature[];
}

interface PropertyAsset {
  label: string;                   // "exterior", "kitchen", etc.
  role: string;                    // "establishing shot", "hero reveal", etc.
}

interface PropertyFeature {
  name: string;                    // "Open-Plan Kitchen"
  confidence: number;              // 0.97
  insights: SourceTaggedInsight[];
}

interface SourceTaggedInsight {
  source: "MARKET" | "BROKER" | "GUARDRAIL";
  text: string;
}

interface HookType {
  id: string;                      // "door-reveal"
  name: string;                    // "Door Reveal"
  icon: string;                    // "🚪"
  description: string;
}

interface HookSelectionResult {
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

interface RevealData {
  // Production quality KPIs (left side — defensible)
  productionQuality: {
    returnRate: string;
    returnRateTrend: "↓" | "↑" | "→";
    turnaround: string;
    cost: string;
    guardrailViolations: number;
  };
  // Expected performance (right side — projected)
  expectedPerformance: {
    views: string;
    retention: string;
    brandRecall: string;
    dataPoints: string;
  };
  // Creative rationale
  creativeRationale: string;
  creativeTags: string[];
  // Adjustments
  adjustments: Adjustment[];
  // Branded overlay (corporate identity injection)
  brandedOverlay: {
    logoPosition: string;          // "bottom-left"
    accentStyle: string;           // "color-strip" | "frame-tint"
    endCard: {
      ctaText: string;             // "Visit homey.nl"
      ctaUrl: string;              // "https://homey.nl"
    };
  };
  // Delivery package
  deliveryPackage: {
    hookSummary: {
      hookType: string;
      property: string;
      platform: string;
    };
    whyThisHook: string;
    brandMatchChecklist: string[];
    propertyFeaturesHighlighted: string[];
    endCard: {
      ctaText: string;
      brokerUrl: string;
    };
    optimizationNote: string;
  };
}

interface Adjustment {
  name: string;
  risk: "Low" | "Medium" | "High";
  whatChanges: string;
  hallucinationRisk: string;
  insights: SourceTaggedInsight[];
  tradeoffs: {
    positive: string;
    negative: string;
  };
}

interface MarketData {
  totalPosts: string;              // "2,400+"
  geography: string;               // "Dutch real estate"
  period: string;                  // "Q1 2026"
  referencesPosts: ReferencePost[];
}

interface ReferencePost {
  description: string;
  views: string;
}
```

---

## 4. Screen Specifications

### Screen 1: Production Dashboard (`/dashboard`)

**Purpose:** Operations hub. Broker list as home screen. Thomas clicks a broker and goes.

**Layout:**
- Header bar: org name left, 4 KPI badges right
- Broker table below

**Header KPIs (4 badges, horizontal):**

| KPI | Value | Why |
|-----|-------|-----|
| Hooks This Week | 47 | Volume — signals production system, not toy |
| Avg Turnaround | 34s | Contrast with BR's 24H promise |
| Return Rate | 0.8% (green) | Their SLA metric — recognition moment |
| Avg Cost / Hook | €2.30 | Margin math — €2.30 vs €3,500 |

**Broker Table columns:**

| Column | Content | Notes |
|--------|---------|-------|
| Broker | Logo letter + name + DNA tags | Tags like "Modern · Mid-market" |
| Brand | Color swatches (3–4 squares) | Visual proof of extraction |
| Hooks | Count (mono) | Production volume |
| Return Rate | Rate + trend arrow | Their metric, per-broker |
| Avg Views | Count + trend arrow | The Trojan horse — they don't track this |
| Action | "Generate Hook →" button | Navigates to Screen 2 |

**Interaction:** Click "Generate Hook →" → navigates to `/broker/[slug]`

---

### Screen 2: Broker Production Preset (`/broker/[slug]`)

**Purpose:** Intelligence brief. Shows the system has studied this broker. Set up once, runs automatically.

**Layout:** 3-column grid
- Left (narrow): Visual Identity card + Production stats card
- Center (wide): Brand Intelligence — the star
- Right (narrow): Production SLA card + Content Performance card + Data Depth card

**Left Column — Visual Identity:**
- Logo letter in brand color
- Name + website URL
- Color palette swatches
- Font names

**Left Column — Production:**
- Hooks delivered, Return Rate, Turnaround, Cost/Hook

**Center Column — Brand Intelligence:**
Sections, separated by dividers:

1. **Who they are** — narrative paragraph, not tags
2. **Target audience signal** — 2x2 grid: demographic, price segment, geographic focus, social presence
3. **Communication style** — pill tags + voice description quote
4. **Hook approach rules** — list with ✓/✗/~ status per hook type + reasoning
5. **Brand guardrails** — hard constraints (⛔) and warnings (⚠️) in red/orange cards
6. **Rejection log** — timeline showing returned hooks with:
   - Date + hook number
   - Operator-facing reason
   - System analysis (expandable card)
   - "Guardrail added" callout
   - Footer: consecutive accepts streak + return rate trend

**Right Column — Production SLA (top):**
- Return Rate with trend (↓ 0.3pp)
- Turnaround
- Cost/Hook
- Hooks Delivered
- Footer note: "Return rate improving — X rejections in Y hooks, both fed back into guardrails."

**Right Column — Content Performance (bottom):**
- Avg Views with trend
- Top Hook type
- vs Standard multiplier
- Footer note: "Downstream data BR has never tracked."

**Right Column — Data Depth:**
- Three progress bars: Market (high), Cross-industry (medium), Broker-specific (building)
- Footer: "At 100+ hooks → shifts to broker-optimized predictions"

**Interaction:** CTA button "Generate Hook for [Broker] →" → navigates to `/broker/[slug]/produce`

---

### Screen 3: Production Flow (`/broker/[slug]/produce`)

**Purpose:** 3-stage production pipeline. Upload → Intelligence → Selection.

**Layout:** Single-column, stages stacked vertically. Each stage has a header label.

#### Stage 1: Upload Listing

**Context bar (top):** Shows active broker preset — logo, name, DNA tags, return rate, hook count.

**Upload area:**
- Centered, max-width ~500px
- Headline: "Add listing assets"
- Subtitle: "Property photos and video for hook generation"
- Drag-and-drop zone (dashed border)
- 6 thumbnail slots below (labeled: exterior, living, kitchen, hallway, bath, garden) — pre-filled for demo
- CTA: "Start Production →"

**For demo:** Assets are pre-loaded. Thomas clicks "Start Production" and Stage 2 appears.

#### Stage 2: Creative Intelligence

**Source tag legend** at top: `MARKET` (blue) / `BROKER` (green) / `GUARDRAIL` (red) with counts.

**3-column grid of intelligence panels:**

**Panel 1 — Property Analysis:**
- Property type + subtype at top
- Feature list, each with:
  - Feature name + confidence score (mono, %)
  - Source-tagged insights explaining WHY this feature matters

**Panel 2 — Hook-Asset Matching:**
- Question heading: "Which hooks are possible with these assets?"
- Per hook type:
  - Icon + name + assets matched count
  - Asset-to-sequence mapping (which photo → which moment)
  - Source-tagged insights (market + broker signals)
  - Blocked hooks are greyed out with guardrail tag
- Visual hierarchy: recommended hook gets green border, blocked gets 45% opacity

**Panel 3 — Risk + Recommendation:**
- Recommended hook name + reasoning summary
- 5 risk dimensions as labeled rows:
  1. Hallucination complexity — Low/Med/High with progress bar + guardrail tag
  2. Brand fit — dot rating (●●●●○) + broker tag
  3. Asset coverage — X/Y matched
  4. Market signal — multiplier + market tag
  5. Broker track record — X/Y accepted + broker tag
- Reference posts section at bottom (post description + view count)

#### Stage 3: Hook Selection

**Layout:** 2x2 grid of hook type cards.

**Each card contains:**
- Header: icon + name + description + complexity badge
- Hallucination risk section (bg card): level + detailed explanation — **this is the lead metric** because creative ambition and rejection rate are directly proportional
- Source-tagged insights: MARKET, BROKER, GUARDRAIL lines
- Assets matched footer: X/Y + detail list

**Card states:**
- **Recommended:** green border, "Recommended" badge, full opacity
- **Available:** default border, full opacity
- **Weak match:** default border, orange asset count
- **Blocked:** red badge, 50% opacity, guardrail explanation

**For Homey demo data:**
| Hook | Status | Complexity | Assets |
|------|--------|-----------|--------|
| Door Reveal | Recommended | Low | 3/3 |
| Price Tag | Available | Low | 2/3 |
| Before/After | Weak | Medium | 0/2 |
| Cinematic | Blocked | — | — |

**Important context (Thomas, Apr 2):** Door Reveal only works reliably for standalone houses with a clear front entrance — roughly 5% of Dutch residential inventory. Apartments and connected houses don't have isolated doors for the AI to frame. This is why additional hook types (Price Tag, slideshows) matter for scale, even if Door Reveal is the safest for the demo. The spec includes multiple hook types to show the system can recommend different formats for different property types.

**CTA:** "Generate [Recommended Hook] →" → navigates to `/broker/[slug]/reveal`

---

### Screen 4: Hook Reveal + Delivery Package (`/broker/[slug]/reveal`)

**Purpose:** The climax. Video preview + honest metrics + data-backed adjustments + exportable delivery package.

**Layout:** 2-column — video left, intelligence right.

#### Left Column — Video Preview
- 9:16 aspect ratio video placeholder (dark bg, play button)
- **Branded overlay elements visible on the video preview:**
  - Broker logo badge bottom-left (brand color bg + logo letter)
  - Brand color accent strip or frame tint (subtle, not dominant)
  - Duration badge bottom-right
  - **End card visible in scrub bar / final frame:** broker logo + CTA ("Visit homey.nl") + brand colors
- The branded overlay is the corporate identity injection Thomas described: *"He asked for corporate identities — a tool that injects the branded hook plus the corporate identity across the whole video."*
- Below: two buttons — "↓ Export Package" (primary) + "↻ New Variation" (secondary)

#### Right Column — Intelligence Stack

**1. Split KPI Panel (card):**
Two sections divided by a visible 1px separator. **Left side dominates visually — larger type, full opacity. Right side is secondary — smaller type, muted.**

| Left: Production Quality (lead, large) | Right: Expected Performance (secondary, muted) |
|---|---|
| Return Rate: 0.8% ↓ (green, 20px bold, lead metric) | Views: 3.2x (14px, muted) |
| Turnaround: 34s (18px bold) | Retention: 67% (14px, muted) |
| Production Cost: €2.10 (18px bold) | Brand Recall: +41% (14px, muted) |
| Guardrail Violations: 0 (18px bold) | Data Points: 2,400+ (14px, muted) |

Right side has label: "Based on market benchmarks" (muted, small). **The visual weight difference is intentional** — per sync decision: "Remove 'expected views' as a headline metric. Keep it as quiet secondary." Production quality should feel like the dashboard; expected performance should feel like a footnote.

**2. Creative Rationale (card):**
- Paragraph explaining why this hook for this property and broker
- Pill tags: Brand-matched, Property-optimized, Data-backed

**3. Adjustments (card):**
- Subtitle explaining what adjustments show
- Stack of adjustment cards, each containing:
  - Header row: name + risk badge (Low/Medium/High in green/orange/red)
  - "What changes" — concrete description
  - "Hallucination risk" — explanation
  - Source-tagged lines: MARKET, BROKER, GUARDRAIL
  - Trade-off footer: green (+) and orange/red (−)

**Demo adjustments for Homey:**

| Adjustment | Risk | Key signal |
|-----------|------|-----------|
| More brand presence | Low | Overlay only, no generative changes |
| Add voiceover | Medium | Voice could describe wrong features |
| Wider framing | High | References Hook #3 rejection, violates guardrail |
| Switch to Price Tag | Low | Lower market performance than Door Reveal |

**4. Delivery Package (green-bordered card):**
- Header: "Delivery Package" + "What the broker receives"
- Description: export includes hook video + performance brief
- Three items in a row: Hook Video (MP4) / Performance Brief (PDF) / Selected Assets (ZIP)

#### Delivery Package Deep Dive (below the main grid)

Full mockup of what the broker receives when the operator clicks "Export Package":

**Package header:** Broker logo + "Hook Delivery — [Broker]" + property address + date + "Produced by Bright River / Powered by ReelForge"

**2-column layout:**

Left: Video thumbnail + package contents list (3 files with sizes)

Right: Performance Brief preview (styled as a document):
1. **Hook Summary** — 3-column grid: Hook Type, Property, Platform
2. **Production Quality** — 3 metrics: Return Rate ↓, Turnaround, Cost
3. **Expected Performance** — 3 metrics: views multiplier, retention lift, brand recall + "Based on market benchmarks" label + data source line
4. **Brand Match** — checklist with ✓ items (logo, colors, tone, positioning)
5. **Property Features Highlighted** — pill tags for key features used
6. **End Card / CTA** — mockup of the video's final frame: broker logo centered, "Visit [broker website]" CTA, brand colors. Thomas (Apr 1): *"Make the final slide with a call to action... the conversion is a website visit."*
7. **Optimization Note** — green card with paragraph about performance trajectory

---

## 5. Component Architecture

```
src/
  routes/
    __root.tsx                  # Root layout, dark theme, system fonts, Framer Motion
    index.tsx                   # Redirect to /dashboard
    dashboard.tsx               # Screen 1
    broker/
      $slug.tsx                 # Screen 2
      $slug/
        produce.tsx             # Screen 3
        reveal.tsx              # Screen 4
  routeTree.gen.ts              # Auto-generated by TanStack Router

  components/
  nav.tsx                       # Fixed top navigation with tabs
  kpi-badge.tsx                 # Single KPI metric (value + label)
  kpi-bar.tsx                   # Horizontal row of KPI badges
  broker-table.tsx              # Dashboard broker list
  broker-row.tsx                # Single broker row with colors + metrics
  source-tag.tsx                # MARKET / BROKER / GUARDRAIL pill
  source-tag-legend.tsx         # Horizontal legend bar with all 3 tags + counts
  insight-line.tsx              # Source tag + text on one line
  risk-badge.tsx                # Low/Medium/High/Blocked badge
  card.tsx                      # Base card with surface bg + border
  section-label.tsx             # Uppercase muted section header
  progress-bar.tsx              # Thin colored progress bar

  # Screen 2 components
  visual-identity-card.tsx      # Logo, colors, fonts
  brand-intelligence.tsx        # Full center column
  hook-approach-rules.tsx       # ✓/✗/~ list
  guardrail-list.tsx            # ⛔/⚠️ constraint cards
  rejection-log.tsx             # Timeline with entries
  production-sla-card.tsx       # SLA metrics
  content-performance-card.tsx  # Views + top hook
  data-depth-card.tsx           # Progress bars

  # Screen 3 components
  upload-stage.tsx              # Upload area with context bar
  property-analysis.tsx         # Panel 1: features + confidence
  feature-item.tsx              # Single feature with confidence + insights
  hook-asset-matching.tsx       # Panel 2: hook → asset mapping
  risk-recommendation.tsx       # Panel 3: risk breakdown
  reference-posts.tsx           # Market reference posts list
  hook-selection-grid.tsx       # 2x2 hook cards
  hook-card.tsx                 # Single hook selection card

  # Screen 4 components
  video-preview.tsx             # 9:16 placeholder
  split-kpi-panel.tsx           # Production Quality | Expected Performance
  creative-rationale.tsx        # Paragraph + tags
  adjustment-card.tsx           # Single adjustment with risk + trade-offs
  adjustments-stack.tsx         # Stack of adjustment cards
  delivery-package-card.tsx     # Export summary (3 items)
  delivery-package-preview.tsx  # Full brief mockup
  performance-brief.tsx         # The document-style brief

data/
  demo-data.json                # All demo data
  types.ts                      # TypeScript interfaces
  get-data.ts                   # Helper: getBroker(slug), getOrg(), etc.
```

---

## 6. Visual Design

### Theme
- Dark mode (dark bg, light text)
- Follows the PRD walkthrough's design system

### Color tokens

```css
--bg: #0d0e14;
--surface: #151720;
--surface-raised: #1c1e2a;
--border: #2a2d3a;
--fg: #e8e8ec;
--muted: #8b8d9a;
--brand: #b8a0d0;            /* Alavida purple — UI accents only */
--brand-subtle: rgba(184,160,208,0.1);
--green: #7aba7a;
--green-subtle: rgba(76,175,80,0.12);
--orange: #ff9800;
--red: #ff6b6b;
```

### Source tag colors
- `MARKET`: `bg: rgba(46,134,222,0.12)`, `text: #5ba0d0`
- `BROKER`: `bg: rgba(122,186,122,0.12)`, `text: var(--green)`
- `GUARDRAIL`: `bg: rgba(255,107,107,0.12)`, `text: var(--red)`

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Monospace for numbers/metrics: `'SF Mono', 'Fira Code', monospace`
- Base size: 13px, line-height: 1.5
- Section labels: 10px, uppercase, letter-spacing: 0.1em

### Spacing & radii
- Card padding: 16px
- Card border-radius: 10px
- Grid gaps: 12–14px
- Pill border-radius: 20px

---

## 7. Demo Data — Two Brokers

The demo ships with two complete broker profiles. The purpose is to show the same system producing different results for different brands.

### Broker 1: Homey
- **DNA:** Modern · Mid-market · Green (#4CAF50)
- **Audience:** 25–38, couples, first home, €250K–€500K suburban
- **Tone:** "Your friend who knows real estate" — warm, casual, emoji-friendly
- **Approved hooks:** AI Influencer ✓, Door Reveal ✓, Price Tag ✓
- **Blocked hooks:** Cinematic ✗ (too premium), Luxury Reveal ✗
- **Conditional:** Before/After ~ (renovated only)
- **Demo property:** Suburban family home, Kerkstraat 42, Haarlem
- **Generated hook:** Door Reveal (recommended, 3/3 assets, 24/24 accepted)
- **Return rate:** 0.6% ↓ (2 of 32 returned)

### Broker 2: Van der Berg Makelaars
- **DNA:** Traditional · Premium · Red (#C62828)
- **Audience:** 40+, high-net-worth, €750K+ urban/heritage
- **Tone:** Authoritative, understated, professional Dutch
- **Approved hooks:** Cinematic ✓ (premium fits), Luxury Reveal ✓
- **Blocked hooks:** Price Tag ✗ (undermines prestige)
- **Demo property:** Canal house, Herengracht, Amsterdam (or similar premium)
- **Generated hook:** Cinematic (recommended for this brand — the opposite of Homey)
- **Return rate:** 1.2% ↓ (higher but improving)

The contrast is the proof: same system, different intelligence, different output.

---

## 8. Interaction Model

This is a linear walkthrough — Thomas clicks through screens 1 → 2 → 3 → 4 in order.

**Transitions:**
- Dashboard → Broker Preset: Click "Generate Hook →" on a broker row
- Broker Preset → Production Flow: Click "Generate Hook for [Broker] →"
- Production Flow Stage 1 → Stage 2: Click "Start Production →" (shimmer animation, panels appear progressively)
- Production Flow Stage 2 → Stage 3: Auto-transition or scroll (stages are stacked)
- Production Flow Stage 3 → Reveal: Click "Generate [Hook Type] →"
- Reveal: No forward navigation. "Export Package" is the terminal action.

**Animations (nice-to-have, not critical for POC):**
- Stage 2 panels: shimmer loading → reveal, left to right, 300ms stagger
- KPI numbers: count-up animation on mount
- Progress bars: animate width on mount

**No animations required for v1 — static is fine. Thomas's narration does the work.**

---

## 9. What's NOT in Scope

- No real video playback — just a placeholder
- No real AI generation — all data is hardcoded
- No property upload functionality — assets are pre-loaded
- No export functionality — "Export Package" button is non-functional (or shows a toast)
- No responsive/mobile design — desktop only, presented on Thomas's screen
- No accessibility beyond semantic HTML — not a production product
- No tests — demo code, not production code
- No i18n — English UI (property data can reference Dutch locations)
- No analytics, no error tracking
- No deployment pipeline — local dev or simple Vercel deploy

### Carried over from existing app
- Tailwind CSS v4 + oklch color space design tokens
- Framer Motion for transitions (shimmer loading, panel reveals, page transitions)
- shadcn/ui-style component patterns (Button, Card, Badge, Progress)
- Lucide React icons
- `cn()` utility (clsx + tailwind-merge)
