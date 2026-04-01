# ReelForge Demo Platform Wrapper — Design Spec

**Date:** 2026-04-01
**Author:** Alex (Alavida)
**Linear:** ALA-534
**Status:** Draft

---

## 1. Purpose

Build a demo UI that Thomas presents live to Bright River (bright-river.com) on Apr 2. The goal is to sell the end-state product experience: a realtor uploads property assets and their brand URL, the platform extracts their brand, analyzes the property, pulls in market research, and generates an optimized branded hook video.

The UI is the product for this meeting. Every step must feel alive and intelligent. Behind the curtain, brand extraction is live via Firecrawl; everything else is orchestrated with pre-baked data and timed animations.

## 2. Audience & Delivery

- **Presenter:** Thomas
- **Audience:** Bright River team (Dutch content production company, Haarlem)
- **Format:** Live demo, Thomas clicks through the app on a screen share
- **Implication:** Must be bulletproof — no broken states, smooth transitions, no API calls that could fail mid-demo (except Firecrawl, which has a fallback)

## 3. User Flow (4 Phases)

### Phase 1 — Input

Clean, minimal screen. ReelForge logo top-left.

Two input areas:
1. **Realtor brand URL** — text input. Thomas pastes a broker website URL (e.g., `hfrealestategroup.nl`). Big, prominent.
2. **Property assets** — drag-and-drop zone for photos and videos. Accepts files directly. Shows a non-functional "Connect Google Drive / Dropbox" button for optics.

One button: **"Generate Hook"** — kicks off the entire sequence.

### Phase 2 — Brand Extraction (LIVE)

The screen transitions into a processing view. This is the first wow moment.

The Firecrawl brand extraction API runs live against the pasted URL. As results come back:
- Logo fades in from blurry to crisp
- Color palette builds out swatch by swatch
- Font names appear
- Brand style classification shows (e.g., "Modern / Professional")
- A brand card assembles itself on screen — like watching a design system get built in 5 seconds

Uploaded property thumbnails appear in a grid alongside the brand card.

**Fallback:** If Firecrawl fails or is slow, pre-scraped brand data (Homi) renders with the same animations after a 3-second simulated delay.

### Phase 3 — Analysis & Optimization (ORCHESTRATED)

Intelligence theatre. A vertical feed of insight cards that appear one by one with staggered timing (1.5-2 seconds apart):

1. **Property analysis card:** "Detected: Suburban family home, 4 bedrooms, modern renovation, large garden. South-facing terrace with natural light."
2. **Market context card:** "Dutch RE market Q1 2026: avg selling time 28 days, krapte-indicator 1.9. Properties in this segment see 2.3x more engagement with curiosity-gap hooks."
3. **Hook strategy card:** "Recommended pattern: Gift Reveal — wraps the property in the broker's brand. 67% higher first-3-second retention vs standard property intros in NL market."
4. **Optimization confidence:** A meter fills up — "Hook optimization: 94%"

Each card has a shimmer loading state before it reveals. The brand kit from Phase 2 stays visible in a sidebar so the brand identity persists through the whole flow.

All data in this phase is pre-baked in `lib/demo-data.ts` / Convex seed data. Timings are controlled client-side.

### Phase 4 — Hook Reveal (THE PAYOFF)

The hook video player appears with a cinematic reveal (blur-to-sharp, subtle scale-up).

Layout:
- **Center:** Large 9:16 video player showing the pre-produced branded hook (e.g., the Homi gift-wrap video). Premium feel — rounded corners, subtle shadow, custom controls.
- **Right panel:** Optimization Breakdown card:
  - Hook pattern used and why
  - Market data that informed the choice
  - Predicted performance metrics (retention, engagement lift)
  - Brand elements applied (logo, colors)
- **Bottom:** Download/Export button (functional — downloads the actual video file)

## 4. Visual Design

- **Dark theme, cinematic feel.** This is a creative tool, not a SaaS dashboard.
- **Background:** Near-black (`oklch(0.10 0.008 270)`)
- **Cards/panels:** Dark gray with soft borders, subtle glow on active elements
- **Accent:** ReelForge brand color for active states and highlights
- **Typography:** Inter (sans-serif), large headings, generous whitespace
- **Animations:** Smooth, intentional — fade-ins, slide-ups, shimmer loaders. Vibe is "sophisticated AI system working"
- **Key visual moments:**
  - Brand extraction: swatches animate in, logo fades from blurry to crisp
  - Insight cards: appear with subtle glow edge
  - Hook reveal: blur-to-sharp transition with scale-up
- **Desktop only.** Optimized for 1440px+ widescreen.
- **shadcn/ui** with CSS variable theming — easy to retheme if needed before demo

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (Vite) |
| Backend | Convex (reactive queries, mutations, actions) |
| UI Components | shadcn/ui (base-nova style, dark theme) |
| Styling | Tailwind CSS v4, CSS variables |
| Animation | Framer Motion |
| Routing | TanStack Router (file-based) |
| Brand Extraction | Firecrawl API (called via Convex action) |
| Video Playback | Native HTML5 video with custom controls |

**Matches existing Alavida patterns:**
- React 19, TanStack Router ~1.167.x, Convex ^1.33
- `useQuery` / `useMutation` directly in components (no route loaders)
- `__root.tsx` wraps ConvexProvider
- `lib/convex.ts` for client initialization
- Path aliases via `@/*`

## 6. Architecture

```
domains/studio/apps/reelforge-demo/
├── src/
│   ├── client.tsx                    # Client hydration entry
│   ├── router.tsx                    # Router config
│   ├── routeTree.gen.ts              # Auto-generated
│   ├── routes/
│   │   ├── __root.tsx                # Root layout (ConvexProvider, dark theme)
│   │   └── index.tsx                 # Single page — orchestrates 4 phases
│   ├── components/
│   │   ├── ui/                       # shadcn components
│   │   ├── phases/
│   │   │   ├── input-phase.tsx       # URL + asset upload
│   │   │   ├── brand-phase.tsx       # Brand extraction display
│   │   │   ├── analysis-phase.tsx    # Insight cards feed
│   │   │   └── hook-reveal-phase.tsx # Video player + optimization breakdown
│   │   ├── brand-card.tsx            # Assembled brand kit display
│   │   ├── insight-card.tsx          # Single analysis/market insight card
│   │   ├── video-player.tsx          # Custom 9:16 video player
│   │   └── shimmer.tsx               # Loading shimmer animation
│   ├── lib/
│   │   ├── convex.ts                 # ConvexReactClient setup
│   │   ├── demo-data.ts             # All pre-baked demo content
│   │   ├── utils.ts                  # cn helper
│   │   └── types.ts                  # TypeScript interfaces
│   └── styles/
│       └── globals.css               # Tailwind + dark theme variables
├── public/
│   └── hooks/                        # Pre-produced hook video files
├── convex.json                       # Points to root convex/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── components.json                   # shadcn config
```

**Convex functions (root convex/ directory):**

```
convex/
├── demo/
│   ├── brands.ts        # Action: Firecrawl brand extraction
│   │                    #   extractBrand(url) → { logo, colors, fonts, style }
│   │                    # Query: get pre-scraped fallback brand
│   ├── projects.ts      # Mutation: create demo project (stores URL + asset refs)
│   │                    # Query: get project state
│   └── schema.ts        # Tables: projects, brands
```

## 7. What's Real vs Orchestrated

| Step | Real | Orchestrated |
|------|------|-------------|
| Brand URL input | Yes | — |
| Firecrawl brand scrape | Yes (Convex action) | Fallback to pre-scraped data if API fails |
| Property media upload | Yes (files in React state, thumbnails displayed) | — |
| Property analysis | — | Pre-baked text, timed shimmer → reveal |
| Market research insights | — | Pre-baked from PRD research, timed reveals |
| Hook optimization reasoning | — | Pre-baked, timed reveal |
| Hook video playback | Yes (real pre-produced video file) | Video is pre-produced, not generated live |
| Download/Export | Yes (downloads the actual file) | — |

## 8. Demo Data

All orchestrated content lives in `lib/demo-data.ts`. Easy to edit before the demo.

**Property analysis (pre-baked):**
```
Detected: Suburban family home, 4 bedrooms, modern renovation, large garden.
South-facing terrace with natural light. Premium kitchen fixtures identified.
```

**Market insights (pre-baked, sourced from PRD research):**
- "Dutch RE market Q1 2026: 47,619 homes sold (+11.1% YoY), avg price EUR 502K, avg selling time 28 days"
- "Krapte-indicator 1.9 — tight market. Brokers compete for listings, not buyers"
- "Properties in this segment see 2.3x more engagement with curiosity-gap hooks"
- "85% of viewers watch without sound — text overlays are critical"

**Hook strategy (pre-baked):**
- "Recommended: Gift Reveal pattern"
- "67% higher first-3-second retention vs standard property intros in NL market"
- "Curiosity-gap hooks outperform all other types consistently across platforms"
- "Hook stacking (visual + text + audio) engages multiple cognitive systems"

**Optimization score:** 94%

**Fallback brand data (Homi):**
- Logo: `domains/branding/assets/brand/homi/Homi_Logo_RGB_Primary.png`
- Primary color: Homi green
- Style: "Modern / Professional"

## 9. Hook Videos

2-4 pre-produced hook videos from the design freelancer (ALA-586). Stored in `public/hooks/`.

Example: The Homi gift-wrap reveal — house wrapped as a branded gift with the Homi logo, unwraps to reveal the property. This is the hero video for the demo.

The video player displays whichever hook is "selected" by the optimization engine (in reality, we show the best one from the pre-produced set).

## 10. Scope Boundaries

**In scope:**
- Single-page app with 4-phase flow
- Live Firecrawl brand extraction with fallback
- Timed intelligence theatre animations
- Pre-produced hook video playback
- Download/export button
- Dark theme, cinematic design
- Desktop-optimized (1440px+)

**Out of scope:**
- Authentication / user accounts
- Persistent storage of projects
- Actual AI analysis of property media
- Actual hook video generation
- Mobile responsiveness
- Multiple routes / navigation
- Database-backed project history

## 11. Deployment

Local development server for the demo. Thomas runs it on his machine or Alex screen-shares. No deployment to production needed for Apr 2.

If remote demo is needed: deploy to Cloudflare Pages (matching existing Alavida pattern from vite.config.ts).

## 12. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Firecrawl API down during demo | Fallback to pre-scraped Homi brand data with same animations |
| Video file too large to load quickly | Pre-load in React state during Phase 2-3 while user watches brand extraction |
| Thomas pastes wrong URL | Any URL triggers Firecrawl; worst case falls back to demo data |
| Bright River asks "try with our brand" | Firecrawl is live — it will actually scrape their URL. Analysis/hook phases still show demo data but that's fine |
