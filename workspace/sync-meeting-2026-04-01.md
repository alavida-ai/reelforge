# Sync Meeting — April 1, 2026 6:00 PM

**Participants:** Alexander Girardet, Thomas Schouten, Alexander Garcia (Chicote)

---

## Summary

### Bright River POC — Product Vision

Three-domain pitch framework agreed for tomorrow's meeting:

1. Cold-start data layer — market research, TikTok benchmarks, cross-industry insights
2. AI hook generation — visual hooks with brand-matched influencer
3. Self-optimising engine — performance data feeds back to improve future hooks

Core positioning: Bright River sells fast, consistent, low-cost real estate visuals — the app must reflect that (speed, automation, insight-driven decisions, not a production studio)

Key product insight: AI's strength is synthesising large data sets and removing human bias from hook selection — the app should make decisions for the operator, with optionality to override

### Hook Generation — Scope & Constraints

Scope for tomorrow: visual hook only (opening sequence), not full video

- Bright River's team handles the rest of the video; hook gets "slapped on"
- Hook = thumb-stopper; goal is to stop the scroll, not narrate the listing

Current hook: AI influencer (woman) opening a door in front of the property

- Limitation: works for standalone houses, covers ~5% of inventory
- Apartments and connected houses still unproven — Thomas to test tonight

Higgs field identified as the prototyping tool; production path is via Replicate API (cheapest, most scalable) once prompts are validated

Key creative constraint: hallucination risk is high when rendering varied environments — safer to keep the model in a controlled, single-location scene

### App Flow — Agreed Structure

Separation of broker onboarding from property upload is critical:

- Broker page (one-time setup): scrape brand identity via Firecrawl, add DNA/constraints (luxury vs. budget, tone, rules), store previous performance data
- Property upload (per hook): upload footage, AI categorises property type, selects best assets, generates storyboard and hook

If broker already exists in DB → skip scraping, pull existing profile. Brand identity should inform hook *approach*, not just visual styling (e.g. luxury brand → no influencer, different hook type)

Hook optionality: show 4–5 hook types, recommend one based on brand DNA + market data, allow operator to override

- Recommendation displayed like a pricing table ("Recommended" badge)

### Demo Plan for Tomorrow

Two dummy brokers in the app:

- Homey (green brand) — door hook with branded influencer
- Second broker (red brand) — same hook, different property, to show brand translation

Goal: show the hook adapts to brand colour/identity dynamically across brokers

Storyboard step may be removed — only valuable if interactive (e.g. swap elements); otherwise the hook result speaks for itself

### Data & Optimisation Engine

Cold-start approach: use public TikTok performance data + cross-industry benchmarks (fashion, e-commerce) to inform initial hook recommendations

- Only 5% of Dutch real estate brokers are active on TikTok — low baseline, but useful signal
- Individual real estate personalities (not company accounts) tend to outperform listing videos

Optimisation loop: once hooks are published, capture performance data per broker → feed back into future hook generation

- Attribution is hard (property quality vs. hook quality vs. brand) — acknowledged as a long-term problem
- Framing for client: "we solve the cold start problem now; the system gets smarter with every hook you publish"

TikTok data access: public likes/views are accessible; programmatic scraping costs ~$49/month (cheap at scale, expensive for a free POC)

### Pricing & Expectations

Bright River context: charges €3,500 per custom hook per broker — signals high willingness to pay

- If they have millions in revenue and push millions of visual ads per year, a €80k build is plausible
- Longer-term play: go direct to brokers, charge ~€3k/month × thousands of brokers

Tomorrow's ask options (Thomas to decide framing):

1. Light pilot fee (few thousand €) — green light to build, skin-in-the-game commitment
2. Full build proposal — only if enough open questions are resolved

Risk flagged: don't over-promise on AI video quality — Higgs field hallucination on complex scenes is a real delivery risk; be transparent about what's possible today vs. roadmap

### Next Steps

**Alexander:**
- Push current branch to Thomas tonight for UI/product feedback
- Second iteration of the Bright River app tomorrow morning (pre-standup)
  - Separate broker page from property upload in the flow
  - Add broker database view with 2 dummy brokers (Homey + one other)
  - Improve market angle identification step
  - Improve reveal/decision page (data-backed adjustment options)
- Ship Asterisk landing page to Julian tonight

**Thomas:**
- Generate second hook tonight: same door hook, different property (apartment)
- Generate at least one alternative hook type (e.g. price-tag reveal in front garden)
- Review Alexander's branch and provide product feedback
- Prepare cost estimates for hook generation (per hook, per variant, API pricing via Replicate)
- Build 3-domain pitch slide for tomorrow's meeting
- Create lead scoring card for evaluating future opportunities

**Alexander Garcia (Chicote):**
- Build proper TikTok/Instagram data pipeline (replace vibe-coded one-shot)
- Assess feasibility of programmatic access to TikTok Shorts and Instagram Reels data
- Send market research report to the team
- Surface data insights visually in the app (e.g. similar viral posts with breakdown of why they worked)

**All:**
- 9am standup tomorrow — Linear fully updated beforehand

---

## Key Design Decisions for App Iteration

1. **Broker page is separate from property upload** — broker onboarding is one-time, property upload is per-hook
2. **Broker page should show more than brand kit** — DNA, constraints, previous performance, how the brand likes to operate (luxury vs fast/cheap)
3. **Two dummy brokers for demo** — Homey (green) + second broker (red) to show brand translation
4. **Market angle step needs improvement** — should pull insights from TikTok research, cross-industry benchmarks
5. **Storyboard step might be removed** — unless interactive, the proof is in the final hook
6. **Reveal page needs data-backed adjustments** — when operator changes "more brand presence" or "add influencer energy", show trade-off data
7. **Hook optionality** — show 4-5 hook types like a pricing table with "Recommended" badge
8. **Optimization engine preview** — show that we capture performance data and the system self-improves
9. **Export capability** — if AI can't deliver 100%, export the design brief + selected images for manual finishing
