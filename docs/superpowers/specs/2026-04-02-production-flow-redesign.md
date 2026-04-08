# Production Flow Redesign — Agentic Multi-Stage Pipeline

**Date:** 2026-04-02
**Status:** Approved
**Context:** User feedback on Screen 3 (`/broker/$slug/produce`) — current implementation dumps three static panels on one page with no sense of an intelligent system working. Needs to feel like an immersive, agentic experience with human gates at each stage.

---

## Problem

The current production flow is a single page with three stacked sections (Upload, Creative Intelligence, Hook Selection). Clicking "Start Production" reveals everything at once as static data. There's no sense of progression, no agent activity, no KPI accountability at each step, and no human decision points.

## Design

Replace the single-page flow with a **4-stage pipeline** where each stage is its own route, shows simulated agent activity, surfaces relevant KPIs, and requires human approval to advance.

### Route Structure

```
/broker/$slug/produce                    Stage 1: Upload Listing (already built)
/broker/$slug/produce/analysis           Stage 2: Property Analysis
/broker/$slug/produce/hooks              Stage 3: Hook Matching
/broker/$slug/produce/risk               Stage 4: Risk & Recommendation
```

### Shared Layout: Production Pipeline

A new layout route at `/broker/$slug/produce` wraps all four stages with:

- **Progress bar** across the top showing: Upload > Analysis > Hook Matching > Risk — current stage highlighted, completed stages checked
- **Broker context strip** (compact): logo, name, tagline, return rate, hook count — carried from the current upload stage context bar
- **Content area** below for each stage's route

The current `produce.tsx` becomes a layout with `<Outlet />`. The upload stage content moves to `produce/index.tsx`.

### Stage 1: Upload Listing (`/broker/$slug/produce` → `produce/index.tsx`)

**Already built.** Property address + listing URL inputs, simulated asset upload with staggered thumbnails, "Start Production" button. On click, navigates to `/broker/$slug/produce/analysis`.

No changes needed except the navigation target.

### Stage 2: Property Analysis (`produce/analysis.tsx`)

**Purpose:** Show the system analyzing uploaded images and categorizing the property. The user should see features being "discovered" with confidence scores, and feel that the system understands what it's looking at.

**Agentic simulation:**
- On mount, a simulated analysis sequence runs:
  1. "Scanning uploaded assets..." (1s) — asset thumbnails shown in a row, each getting a scan animation (border highlight sweeping across)
  2. "Categorizing property..." (0.8s) — property type and subtype appear with a fade
  3. "Extracting features..." (staggered, 0.5s per feature) — each feature card appears one by one with confidence score counting up
- Each phase has a status line showing what the "agent" is doing

**Content (after animation completes):**
- **Property Classification** — type + subtype in a prominent card, with confidence badge
- **Detected Features** — each feature in its own card:
  - Feature name + confidence score (progress bar + percentage)
  - Source-tagged insights explaining WHY this feature matters for hook generation
  - Which uploaded asset this feature was detected in
- **KPI callout** — "Feature detection accuracy directly impacts return rate. Higher confidence = fewer hallucination-driven returns." Ties back to the metric they care about.

**Human gate:** "Confirm Property Profile" button. Disabled until analysis animation completes. On click, navigates to `/broker/$slug/produce/hooks`.

### Stage 3: Hook Matching (`produce/hooks.tsx`)

**Purpose:** Show which hooks are possible given the analyzed assets and broker rules. The system pulls market data and broker intelligence to score each hook type.

**Agentic simulation:**
- On mount:
  1. "Loading broker brand rules..." (0.6s) — broker guardrails/rules flash in
  2. "Pulling market data..." (0.8s) — market data card appears (2,400+ posts, Dutch RE, Q1 2026)
  3. "Matching assets to hook types..." (staggered, 0.6s per hook) — each hook card appears with its status

**Content:**
- **Hook cards** in a 2x2 grid (reuse/adapt existing `HookCard` component), each showing:
  - Hook type name + description
  - Status badge: Recommended (green) / Available / Weak (orange) / Blocked (red)
  - Asset coverage: X/Y matched, with specific asset-to-sequence mapping
  - Brand fit: approved/blocked/conditional per broker rules, with reasoning
  - Market signal: performance multiplier from market data
  - Source-tagged insights (MARKET, BROKER, GUARDRAIL)
- **Blocked hooks** show the guardrail that blocks them — this proves the system respects their rules
- **KPI callout** — "Hook selection considers brand compliance (return rate), asset coverage (production quality), and market performance (engagement). The recommended hook optimizes across all three."

**Human gate:** Click a hook card to select it (not just the recommended one — Thomas should be able to choose). Selected hook gets a visible selected state. "Continue with [Hook Name]" button appears. Navigates to `/broker/$slug/produce/risk`.

### Stage 4: Risk & Recommendation (`produce/risk.tsx`)

**Purpose:** The system's final assessment before generation. Shows the risk/return-rate tradeoff explicitly. This is where the system says "I recommend this because your return rate matters."

**Agentic simulation:**
- On mount:
  1. "Calculating hallucination risk..." (0.8s) — risk meter appears
  2. "Evaluating brand compliance..." (0.6s) — brand fit score
  3. "Checking broker track record..." (0.6s) — acceptance history
  4. "Generating recommendation..." (0.5s) — final recommendation card

**Content:**
- **Selected hook** prominent at top — name, description, why it was selected
- **5 risk dimensions** as scored rows (reuse existing risk panel structure):
  1. Hallucination complexity — Low/Med/High with progress bar + guardrail tag
  2. Brand fit — dot rating + broker tag
  3. Asset coverage — X/Y matched
  4. Market signal — multiplier + market tag
  5. Broker track record — X/Y accepted + broker tag
- **Risk vs Return Rate callout** — explicit: "Creative ambition and return rate are directly proportional. This hook scores [Low] risk, protecting your [0.6%] return rate."
- **Reference posts** — market examples with view counts showing what similar hooks achieved
- **Recommendation summary** — "Recommended: [Hook]. Lowest risk. Best brand fit. Strongest market signal."

**Human gate:** "Generate [Hook Name]" button. Navigates to `/broker/$slug/reveal`.

### Progress Bar Component

A horizontal stepper at the top of the production layout:

```
[1 Upload] ——— [2 Analysis] ——— [3 Hooks] ——— [4 Risk]
   done          current          upcoming       upcoming
```

- Completed stages: check icon, muted text
- Current stage: highlighted with accent, bold text
- Upcoming stages: muted, no icon
- Thin connecting lines between steps
- Built as a reusable `ProductionProgress` component that reads the current route to determine active stage

### State Management

Each stage reads demo data directly (same pattern as current app — no global state needed). The "agentic simulation" is purely visual (timeouts + animations). Stage progression is handled by route navigation — if you're on `/produce/hooks`, you've passed analysis.

The selected hook from Stage 3 needs to reach Stage 4. Pass it as a URL search param: `/broker/$slug/produce/risk?hook=door-reveal`. Stage 4 reads this to show the right risk data.

### What Gets Deleted/Refactored

- `produce.tsx` — becomes a layout route (Outlet + progress bar + broker context)
- Upload stage content → `produce/index.tsx`
- `intelligence-panels.tsx` — broken apart:
  - `PropertyAnalysisPanel` → used in Stage 2
  - `HookAssetPanel` → used in Stage 3
  - `RiskRecommendationPanel` → used in Stage 4
- `hook-selection.tsx` — adapted for Stage 3 (add click-to-select behavior)
- `hook-card.tsx` — add selected state variant

### Animation Approach

All "agentic" animations use the same pattern:
1. A list of simulation steps, each with a label and duration
2. On mount, steps execute sequentially via `useEffect` + timeouts
3. Each step completion reveals the corresponding UI section with a framer-motion fade+slide
4. A status line at the top shows the current step with a spinner

This keeps the code simple (no complex state machines) while creating the feeling of intelligent work happening.

---

## Out of Scope

- Real AI/agent integration — all data is hardcoded demo data
- Persistent state between stages beyond URL params
- Back navigation (Thomas presents linearly)
- Mobile/responsive design
