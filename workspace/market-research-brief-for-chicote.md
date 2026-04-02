# Market Research Brief — What We Need for the POC

**For:** Alexander Garcia (Chicote)
**From:** Alex
**Date:** 2026-04-02
**Purpose:** Define exactly what data we need to fake convincingly in the POC, and what to actually research.

---

## What the data feeds in the app

The Creative Intelligence stage shows three panels. Each needs market research to feel real:

1. **Property Analysis** — "which features of this property matter most for engagement"
2. **Hook-Asset Matching** — "which hook types work for this property type"
3. **Risk + Recommendation** — "why this hook is the best choice"

All data is hardcoded for the POC. But it needs to be **realistic and defensible** — the BR contact has 2 AI PhDs on staff. They'll know if we're bullshitting.

---

## What we need, organized by category

### Category 1: Hook types — performance by property type

For each property type, which hook formats perform best on TikTok/Reels in the Dutch RE market (or comparable markets if Dutch data is thin)?

**Property types to cover (minimum 3-4):**
- Suburban family home (our primary demo property)
- Apartment (Thomas wants to show this works for apartments too)
- Premium/luxury property (for the second broker — Van der Berg)
- Townhouse / connected house (if data exists)

**Hook types to compare:**
- Door Reveal (AI influencer at front door → opens → property revealed)
- Price Tag Reveal ("guess the price" — sign/text reveals listing price)
- Before/After (renovation comparison, split screen)
- Cinematic / Drone (slow-mo aerial or gimbal through property)
- Slideshow with captions (native TikTok format — Thomas noted these are currently outperforming)
- Personality-led (broker/influencer narrates, walks through)

**Per hook type, we need:**
- Avg views (or view range) for this property type
- Relative performance vs "standard intro" (e.g., 3.2x, 2.4x)
- 2-3 example posts (account handle, view count, link to video if possible)
- Any notes on why it works (e.g., "curiosity gap", "emotional payoff", "gamification")

**Format:** A table or JSON, something like:

```
{
  "property_type": "Suburban Family Home",
  "hooks": [
    {
      "type": "Door Reveal",
      "avg_views": "18K-24K",
      "vs_standard": "3.2x",
      "examples": [
        { "account": "@homestyle_nl", "views": "24.1K", "link": "..." },
        { "account": "@makelaarsdam", "views": "18.7K", "link": "..." }
      ],
      "why_it_works": "Curiosity gap — door creates anticipation. Close framing limits hallucination risk."
    }
  ]
}
```

### Category 2: Feature engagement — which property elements drive the most engagement

For Dutch RE social content, which property features (kitchen, garden, bathroom, exterior, etc.) get the most engagement when featured as the hook anchor?

**What we need:**
- Ranked list of property features by engagement (views, likes, shares)
- Ideally split by property type (kitchen matters more for family homes, terrace matters more for apartments)
- Any data on which features appear in the first 3 seconds of top-performing posts

**This feeds:** Panel 1 (Property Analysis) — so when we say "kitchen is the #1 engagement driver for suburban homes" we have something behind it.

### Category 3: Cross-industry hook patterns that apply to RE

From fashion, e-commerce, fitness, travel TikTok — which hook formats could translate to real estate?

**What we need:**
- 3-5 hook patterns from other industries that have proven viral mechanics
- For each: what the pattern is, why it works (psychology), how it could apply to RE
- Example posts with view counts

**This feeds:** The "cross-industry signals" data depth bar on the broker page, and enriches our hook catalog beyond just RE-specific data.

### Category 4: Dutch RE social landscape — baseline stats

General stats about the state of Dutch RE on social media:

**What we need:**
- How many Dutch RE brokers are active on TikTok (you already found ~5%)
- Top performing Dutch RE TikTok accounts (the ones Chicote already researched)
- Individual personalities vs company accounts — performance difference
- Any data on posting frequency vs performance
- What BR's brokers (Homey etc.) are currently doing on social (if anything)

**This feeds:** The "2,400+ Dutch RE social posts" claim — we need to know what's realistic. If we can cite a real number, even if approximate, it's stronger.

### Category 5: Rejection/hallucination risk patterns

What types of AI-generated real estate content get rejected or flagged?

**What we need:**
- Common hallucination issues in AI video for RE (fabricated architectural elements, wrong neighborhood, impossible layouts)
- Which framing/composition choices minimize hallucination (close-up vs wide, single subject vs environment)
- Any data on rejection rates for AI-generated content in production settings

**This feeds:** Panel 3 (Risk + Recommendation) — the hallucination complexity scoring.

---

## Deliverable format

For the POC, we need this as a **flat data file** (JSON or YAML) that I can hardcode into the app. No pipeline needed.

**Ideal structure:**

```
data/
  hooks-by-property-type.json    # Category 1
  feature-engagement.json        # Category 2
  cross-industry-patterns.json   # Category 3
  dutch-re-landscape.json        # Category 4
  risk-patterns.json             # Category 5
```

But honestly, even a single structured document or spreadsheet works. I'll format it for the app.

**Priority order:**
1. Hooks by property type (Category 1) — most critical, directly visible in the app
2. Feature engagement (Category 2) — needed for Property Analysis panel
3. Dutch RE landscape (Category 4) — grounds our "2,400+ posts" claim
4. Risk patterns (Category 5) — useful but can be faked from Thomas's experience
5. Cross-industry (Category 3) — nice to have, lowest priority

---

## Timeline

Need this by end of day so I can wire it into the POC tonight/tomorrow morning. Even partial data for Categories 1-2 is enough to start.

Upload video links to Google Drive and share. Claude Code can break videos into frames for analysis if needed.
