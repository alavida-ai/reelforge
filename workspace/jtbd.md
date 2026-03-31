# ReelForge — Jobs to Be Done Analysis

Context: This JTBD analysis covers two distinct personas with interconnected but different jobs. The Production Team Operator is the direct user of ReelForge. The Real Estate Broker is the indirect beneficiary whose satisfaction determines whether the operator's job is done.

---

## Persona 1: Production Team Operator

### Context
Works at a large Dutch content production company serving ~50% of Dutch real estate brokers. Coordinates videographer shoots (4 properties/day), manages editing briefs to India-based editors (5c/min), and delivers final video assets to broker clients. Skilled in production workflow but not in short-form social strategy or AI tooling.

### Current Solutions
- Outsourced editing to India (cheap, no branding, no platform optimization)
- Manual branding applied on top by in-house team (slow, inconsistent)
- Market-trend playbooks sent as written briefs to editors (e.g., "zoom into copper taps")
- No hook creation — videos go out without scroll-stopping openers
- No platform-specific formatting — same video for all channels

---

### Functional Jobs

| # | Job | Frequency | Current solution |
|---|-----|-----------|-----------------|
| F1 | Turn raw property footage into branded short-form video ready for social media posting | Per listing (hundreds/month) | Manual editing pipeline: India editors + in-house branding overlay |
| F2 | Apply a broker's corporate identity (logo, colors, fonts) consistently across all their property videos | Per broker onboarding + per video | Manual: gather brand assets from broker, apply in editing software |
| F3 | Create scroll-stopping hooks that make viewers watch past the first 3 seconds | Per video | Not done at all — videos go out without hooks |
| F4 | Generate Dutch-language voiceover scripts that match an aspirational tone | Per video | Not done — no voiceover on current videos |
| F5 | Export videos in the correct format, aspect ratio, and specs for each platform (TikTok, Reels, Shorts) | Per video per platform | Not done — one generic export for all platforms |
| F6 | Incorporate current real estate market trends into the video edit (trending features, popular styles) | Per editing cycle | Manual playbook sent as written brief to India editors |
| F7 | Process multiple broker videos simultaneously without bottlenecking | Daily (10+ concurrent) | Sequential manual workflow — one at a time or limited parallel |
| F8 | Onboard a new broker's brand into the production workflow | Per new broker | Manual: request brand guidelines, collect assets, set up project files |
| F9 | Preview the final video before delivering to the broker for approval | Per video | Limited — editors send drafts, back-and-forth revision cycles |
| F10 | Maintain consistent output quality across different operators working on different brokers | Ongoing | Reliant on individual skill and the playbook brief system |

### Social Jobs

| # | Job | Who they want to impress |
|---|-----|------------------------|
| S1 | Be seen as a modern, tech-forward production partner by broker clients | Broker clients |
| S2 | Demonstrate that the company delivers premium quality at competitive prices | Broker clients + management |
| S3 | Be recognized internally as an efficient, high-output operator | Management, peers |
| S4 | Show brokers that their brand is understood and respected in every piece of content | Broker clients |
| S5 | Position the company as the obvious choice for real estate video — not just "the cheap option" | Market / competitors |

### Emotional Jobs

| # | Job | Seek or avoid |
|---|-----|---------------|
| E1 | Feel confident that what I'm delivering will be approved on first review | Seek confidence |
| E2 | Avoid the stress of manual back-and-forth revision cycles with brokers who aren't happy with the branding | Avoid frustration |
| E3 | Feel pride in the creative quality of the output, not just the volume | Seek pride |
| E4 | Avoid the anxiety of keeping up with platform-specific trends I don't fully understand (TikTok algorithms, trending hooks, viral formats) | Avoid inadequacy |
| E5 | Feel in control of the production pipeline even when handling high volume | Seek control |
| E6 | Avoid the fear that cheaper AI tools will make my role obsolete | Avoid existential worry |

---

### Pains

#### Challenges
| # | Pain | Intensity |
|---|------|-----------|
| PC1 | No middle ground between 5c/min commodity editing and EUR 3,500 bespoke branding — can't offer affordable branded content | Acute |
| PC2 | India-based editors follow written playbooks but can't make creative decisions about hooks, branding placement, or platform optimization | Acute |
| PC3 | Every new broker requires manual collection of brand assets (logo files, color codes, font names) — slow onboarding | Moderate |
| PC4 | No systematic way to know what hooks or formats are performing well on TikTok/Reels/Shorts in the Dutch real estate space | Acute |
| PC5 | Platform specs keep changing — what works on TikTok today may not work next month | Moderate |
| PC6 | Brokers all want to look like Serhant but have no idea what that means in terms of concrete deliverables | Moderate |
| PC7 | Can't A/B test different hooks or styles without doubling the production effort | Moderate |

#### Costliness
| # | Pain | Current cost |
|---|------|-------------|
| PK1 | Manual branding overlay per video takes significant operator time | Hours per video (manual editing) |
| PK2 | Revision cycles when broker rejects the output — re-edit, re-export, re-deliver | 1-3 additional cycles per rejection |
| PK3 | Gathering brand assets from brokers who don't have organized brand guidelines | 30-60 min per new broker |
| PK4 | Training editors on each broker's brand preferences and tone | Ongoing per editor per broker |
| PK5 | Producing separate versions for each platform (different crops, lengths, formats) | Multiplied effort per platform |

#### Common Mistakes
| # | Mistake | Consequence |
|---|---------|------------|
| PM1 | Applying branding that doesn't match the broker's actual tone (e.g., energetic template on a luxury boutique broker) | Broker rejects, revision cycle, trust erosion |
| PM2 | Using the same generic edit style across all platforms instead of optimizing per platform | Videos underperform, brokers don't see ROI |
| PM3 | Missing trending real estate features in the edit because the playbook wasn't updated | Content feels dated, misses market relevance |
| PM4 | Exporting in wrong specs (aspect ratio, file size, duration) for a specific platform | Video gets cropped, compressed, or rejected by platform |
| PM5 | Forgetting to include a hook — video starts with a slow pan that gets instantly scrolled past | Near-zero views, wasted production effort |

#### Unresolved Problems
| # | Problem | Why current solutions fail |
|---|---------|--------------------------|
| PU1 | No way to generate Dutch voiceover hooks at scale — would require hiring Dutch voice talent per video | Too expensive at volume, ElevenLabs not yet integrated |
| PU2 | No data-driven feedback loop — no way to know which hooks, templates, or styles actually perform on social | Zero analytics integration in current workflow |
| PU3 | Can't automatically extract a broker's brand identity from their website | Doesn't exist in current tooling |
| PU4 | No visual hook library — every hook would need to be custom-produced | EUR 3,500 per broker makes this impossible at scale |
| PU5 | No way to enforce consistency across operators — output quality depends on individual skill | Playbook system is manual and subjective |

---

### Gains

#### Expectations
| # | Gain | Impact |
|---|------|--------|
| GE1 | Paste a broker's website URL and get their full brand identity extracted automatically (logo, colors, fonts, style classification) | Eliminates onboarding friction entirely |
| GE2 | See 5 CI templates rendered with the broker's actual brand, pick one, and it's applied consistently to every future video | Brand consistency without manual effort |
| GE3 | Get 3-5 Dutch voiceover hooks generated instantly, preview them, and attach the best one to the video | Adds creative value that was previously impossible at this price point |
| GE4 | One-click export in platform-ready formats for TikTok, Reels, and Shorts simultaneously | Eliminates per-platform manual work |
| GE5 | Full preview of the final video (hook + branding + footage) before delivering to broker | Catches issues before they become revision cycles |

#### Savings
| # | Gain | Current → Target |
|---|------|-----------------|
| GS1 | Reduce per-video turnaround from hours to minutes | Hours → Minutes |
| GS2 | Eliminate manual brand asset collection for new brokers | 30-60 min → Seconds (URL paste) |
| GS3 | Remove per-platform reformatting effort | 3x manual export → 1-click multi-platform |
| GS4 | Cut revision cycles by hitting 99.9% first-time-right | 1-3 revision rounds → Near-zero |
| GS5 | Reduce cost per branded video from EUR 3,500 (bespoke) to software-level marginal cost | EUR 3,500 → API costs only |

#### Adoption Factors
| # | Factor | Why it matters |
|---|--------|---------------|
| GA1 | Works with existing raw footage — no change to the videographer workflow | Zero disruption to upstream process |
| GA2 | English UI — no Dutch localization needed for the app itself | Team is international/English-proficient |
| GA3 | Broker profiles persist — set up once, reuse forever | Investment compounds over time |
| GA4 | Supports 10 simultaneous operators | Matches current team scale |
| GA5 | Pilot-first model — prove value before committing to full build | Low-risk entry |

#### Life Improvement
| # | Improvement |
|---|------------|
| GL1 | Operators can focus on creative decisions (which hook? which template?) instead of mechanical tasks (cropping, exporting, reformatting) |
| GL2 | The company can take on more broker clients without hiring more editors or operators |
| GL3 | Operators feel empowered by AI tooling rather than threatened by it — the app augments their work, doesn't replace them |
| GL4 | Consistent, high-quality output builds team pride and client trust |

---

## Persona 2: Real Estate Broker (Indirect User)

### Context
Dutch real estate broker (makelaar) operating in a tight housing market (krapte-indicator 1.9). Houses sell regardless — the broker's commercial challenge is winning new listings. Aspires to Serhant-level personal branding but lacks the budget, creative resources, or social media expertise to achieve it. Never touches ReelForge — receives finished videos from the production company.

### Current Solutions
- Receives generic property videos from production partner (no branding, no hooks)
- Optional: pays EUR 3,500 for a custom branded hook (most can't justify the cost)
- Posts videos to social media sporadically, inconsistently, without strategy
- Relies on Funda listing, word-of-mouth, and local reputation for new listings
- Some track competitor social media presence via "Social Media Makelaars Top 50" rankings

---

### Functional Jobs

| # | Job | Frequency |
|---|-----|-----------|
| F1 | Win more property listing mandates from homeowners who are choosing between brokers | Ongoing — the core commercial job |
| F2 | Build a recognizable personal brand that homeowners associate with premium property marketing | Ongoing |
| F3 | Maintain a consistent, professional social media presence across TikTok, Instagram, and YouTube | Weekly (ideally 2-4 posts/week) |
| F4 | Showcase each property listing in a way that reflects well on the broker's brand (not just the property) | Per listing |
| F5 | Stay visible and top-of-mind in the local market | Ongoing |
| F6 | Differentiate from other brokers competing for the same listings in the same area | Ongoing |
| F7 | Demonstrate to potential sellers that "if you list with me, THIS is how your property will be marketed" | Per pitch / per listing |

### Social Jobs

| # | Job | Who they want to impress |
|---|-----|------------------------|
| S1 | Be perceived as the go-to local broker with the best marketing — "the Serhant of [their city]" | Homeowners considering selling |
| S2 | Look premium and established, not cheap or generic | Potential seller clients |
| S3 | Be admired by peers and competitors for social media presence | Other brokers, industry |
| S4 | Be seen as modern and tech-savvy by younger homeowners entering the market | Millennial/Gen-Z sellers |
| S5 | Have homeowners share the broker's content and say "look how they marketed that property" | Homeowners, their social networks |
| S6 | Rank well in industry social media rankings (Social Media Makelaars Top 50) | Industry, potential clients who see rankings |

### Emotional Jobs

| # | Job | Seek or avoid |
|---|-----|---------------|
| E1 | Feel confident that my brand is being represented accurately and professionally in every video | Seek confidence |
| E2 | Feel proud when seeing my branded content on social media — "that looks like ME" | Seek pride |
| E3 | Avoid the embarrassment of generic, unbranded content that makes me look like every other broker | Avoid embarrassment |
| E4 | Feel reassured that my marketing investment is actually building my brand, not just producing forgettable content | Seek reassurance |
| E5 | Avoid the frustration of approving content that doesn't match my brand tone and having to send it back for revisions | Avoid frustration |
| E6 | Feel like a market leader, not a market follower | Seek status |

---

### Pains

#### Challenges
| # | Pain | Intensity |
|---|------|-----------|
| PC1 | Can't afford custom branding (EUR 3,500) for every listing, so most listings go out generic | Acute |
| PC2 | Don't know what makes content perform on TikTok/Reels — not a social media expert | Acute |
| PC3 | Inconsistent social presence — posting sporadically doesn't build a brand | Moderate |
| PC4 | Current videos are property-focused, not broker-brand-focused — they sell houses (which sell anyway) instead of selling the broker | Acute |
| PC5 | No scroll-stopping hooks — videos get <3K views because people swipe past in the first second | Acute |
| PC6 | Can't articulate what "my brand" actually looks like in video format — know it when I see it, but can't brief it | Moderate |
| PC7 | Competitors who invest in social are gaining visibility while I'm standing still | Moderate |

#### Costliness
| # | Pain | Current cost |
|---|------|-------------|
| PK1 | Custom branding per listing is financially impossible at scale | EUR 3,500 per broker for bespoke hook |
| PK2 | Time spent reviewing and requesting revisions on off-brand content | Hours per revision cycle |
| PK3 | Hiring a social media manager or agency to handle posting and strategy | EUR 2,000-5,000/month |
| PK4 | Lost listings because competitors had stronger social presence | Unquantified but real — one listing = thousands in commission |

#### Common Mistakes
| # | Mistake | Consequence |
|---|---------|------------|
| PM1 | Accepting generic unbranded video because "it's good enough" | Missed brand-building opportunity on every listing |
| PM2 | Posting the same video across all platforms without optimization | Underperformance, algorithm doesn't push the content |
| PM3 | Inconsistent posting cadence — going viral once then silent for weeks | Audience doesn't grow, algorithm forgets you |
| PM4 | Using branding that doesn't match actual positioning (luxury broker with casual/generic overlay) | Confuses the brand, damages perception |

#### Unresolved Problems
| # | Problem | Why it persists |
|---|---------|----------------|
| PU1 | No way to get affordable, on-brand short-form video content at scale | Gap between commodity (5c/min) and premium (EUR 3,500) |
| PU2 | No feedback on what's working — which hooks, styles, or formats drive views? | No analytics integration, no data-driven iteration |
| PU3 | No Dutch-language voiceover hooks that sound natural and aspirational | ElevenLabs exists but isn't integrated into the production workflow |
| PU4 | Property videos exist but don't serve the brand-building job — they're listing ads, not brand content | Current workflow optimizes for property, not broker |

---

### Gains

#### Expectations
| # | Gain |
|---|------|
| GE1 | Every listing video automatically carries my brand — logo, colors, fonts, tone — without me having to brief it each time |
| GE2 | Videos that get 10K+ views instead of 3-6K because they have proper hooks and platform optimization |
| GE3 | Content that makes homeowners think "I want MY property marketed like that" |
| GE4 | Approve on first review — the content looks right because the system already knows my brand |
| GE5 | Consistent posting cadence without me having to manage it — production partner handles it |

#### Savings
| # | Gain |
|---|------|
| GS1 | Get branded content at a fraction of EUR 3,500 — affordable per listing, not per broker |
| GS2 | Zero time spent collecting and re-sending brand assets — it's already in the system |
| GS3 | No revision cycles — 99.9% first-time-right means one review, one approval, done |
| GS4 | Multi-platform content from a single production effort — TikTok, Reels, Shorts all covered |

#### Adoption Factors
| # | Factor |
|---|--------|
| GA1 | No behavior change required — broker still just provides footage and approves the final video |
| GA2 | Can see a preview of how the 5 CI templates look with their actual brand before committing |
| GA3 | Same production partner they already trust — just better output |
| GA4 | Results visible within 30 days (view count improvement) |

#### Life Improvement
| # | Improvement |
|---|------------|
| GL1 | Social media presence runs on autopilot — brand grows with every listing, not just the ones worth a special investment |
| GL2 | Feels like having an in-house creative team without the overhead |
| GL3 | Every listing becomes a brand-building moment, not just a marketing obligation |
| GL4 | Confidence in client pitches: "Here's what your property marketing will look like" — with actual branded samples |

---

## Priority Matrix

### Highest-Intensity Jobs (Build for These First)

| # | Job | Persona | Why it's highest priority |
|---|-----|---------|--------------------------|
| F1 (Op) | Turn raw footage into branded short-form video | Operator | The core production job — everything else is a sub-job |
| F1 (Br) | Win more listing mandates | Broker | The reason any of this exists — the ultimate outcome |
| F3 (Op) | Create scroll-stopping hooks | Operator | Biggest gap in current workflow, highest performance impact |
| PC1 (Br) | Can't afford custom branding per listing | Broker | The price gap IS the market opportunity |
| E1 (Br) | Feel confident brand is represented accurately | Broker | Drives the 99.9% first-time-right KPI |

### Highest-Intensity Pains (Solve These to Win)

| # | Pain | Persona | Intensity |
|---|------|---------|-----------|
| PC1 (Op) | No middle ground between commodity and bespoke | Operator | Acute — defines the market gap |
| PC5 (Br) | No hooks = <3K views = invisible | Broker | Acute — measurable failure |
| PC4 (Br) | Videos sell houses, not the broker's brand | Broker | Acute — fundamental misalignment with the actual goal |
| PK1 (Br) | EUR 3,500 per broker is unscalable | Broker | Acute — price barrier blocks adoption |
| PU3 (Op/Br) | No Dutch voiceover hooks at scale | Both | Acute — core differentiator, currently impossible |

### Must-Have Gains (Table Stakes for Adoption)

| # | Gain | Persona |
|---|------|---------|
| GE1 (Op) | Auto-extract brand from URL | Operator |
| GE3 (Op) | Dutch voiceover hooks generated instantly | Operator |
| GE5 (Op) | Full preview before delivery | Operator |
| GE1 (Br) | Every video carries my brand automatically | Broker |
| GE4 (Br) | Approve on first review | Broker |

---

## Cross-Reference: JTBD → User Stories

| JTBD | Maps to PRD User Story |
|------|----------------------|
| F2 (Op): Apply broker CI consistently | Story 1 (brand extraction) + Story 2 (manual fallback) + Story 3 (CI templates) |
| F3 (Op): Create scroll-stopping hooks | Story 6 (script hooks) + Story 7 (visual hooks) |
| F5 (Op): Export in platform-specific formats | Story 8 (platform export) |
| F6 (Op): Incorporate market trends | Story 5 (playbook management) |
| F8 (Op): Onboard new broker's brand | Story 1 (brand extraction) + Story 2 (manual fallback) |
| PC1 (Br): Can't afford branding per listing | Entire product — the pricing model resolves this |
| E1 (Br): Brand represented accurately | Story 3 (CI templates) + Story 8 (preview before export) |

---

*Analysis date: 2026-03-17*
*Source: ReelForge PRD v0.2 + PRD session context*
*Confidence: Medium (pre-engagement — based on client conversations and market research, not direct user interviews)*
*Validation needed: Interview 3-5 production operators and 3-5 brokers to confirm job priorities and pain intensities*
