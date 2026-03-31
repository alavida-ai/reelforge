# ReelForge PRD — Real Estate Short-Form Video Branding Platform

## 1. Executive Summary

We're building a web app for a Dutch content production company (serving ~50% of Dutch real estate brokers) that enables their production team to take raw property advertisement videos, apply automated broker brand extraction and CI templates, add AI-generated hooks (script voiceover + pre-produced visual hooks), and export platform-optimized short-form video — ready to post on TikTok, Instagram Reels, and YouTube Shorts. The goal is to cut per-video turnaround from hours to minutes while hitting 99.9% first-time-right broker approval, enabling the client to scale output without scaling headcount, and lifting average video views from 3-6K to 10K+.

## 2. Problem Statement

### Who has this problem?
A large Dutch content production company that sends videographers and photographers to real estate properties, then manually edits and brands the footage for broker clients. They serve approximately 50% of the Dutch real estate market.

### What is the problem?
Post-production is split between two extremes:
- **Cheap but generic:** Raw footage is outsourced to editors in India (5 cents/minute) with no platform optimization, no hooks, and no broker branding
- **Expensive and custom:** A fully branded hook costs ~EUR 3,500 per broker — unaffordable for most

There is no middle ground. Brokers either get commodity footage that does nothing for their brand, or pay a premium for bespoke treatment.

### Why is it painful?
- Raw footage goes out without hooks or branding — missed brand-building opportunity for brokers
- No optimization for short-form platforms — videos underperform on TikTok/Reels/Shorts
- Manual branding process doesn't scale without proportionally scaling headcount
- Brokers aspire to Serhant-level personal branding (reference: serhant.com / Owning Manhattan) but can't afford custom creative for every listing
- The videos don't need to sell houses faster (houses sell regardless in the Dutch market) — they need to build the broker's brand to attract more listings

### Evidence
- **Market data (NVM Q4 2025):** 47,619 homes sold (+11.1% YoY), average price EUR 502,000, average selling time 28 days, krapte-indicator 1.9 (tight market). Brokers compete for listings, not buyers. ([source](https://www.nvm.nl/wonen/marktinformatie/))
- **Market size:** ~11,000 active real estate firms in NL. NVM has 5,500+ affiliated professionals handling ~70% of residential transactions. Vastgoed Nederland adds 2,000+ non-NVM professionals. ([source](https://www.nvm.nl/nieuws/2025/nvm-beedigde-185-registermakelaars-en-taxateurs-in-het-jaar-2025/), [source](https://vastgoednederland.nl/fusie-officieel-vbo-en-vastgoedpro-verder-als-vastgoed-nederland/))
- **Dutch video pricing benchmarks (Woning Media NL 2024/2025):** Standard property video EUR 175-400, premium EUR 500-1,250, social media teaser EUR 50, drone EUR 250. ([source](https://www.woningmedia.nl/userdata/file/Woning%20Media%20-%20Prijslijst%202024%202025%20-%20DEF.pdf))
- **Pricing gap confirmed:** Commodity editing at 5c/min vs bespoke branding at EUR 3,500 per broker. Standard video market sits at EUR 175-400 per property. ReelForge fills the gap between commodity and bespoke.
- Reference benchmark: District Real Estate Amsterdam TikTok averages 3-6K views per listing, high performers hit 20K
- Client currently uses India-based editors following manual playbooks (market trend scripts)
- **Social media adoption:** Instagram used daily by ~60% of Dutch twentysomethings, TikTok by ~50%. Funda recommends makelaars focus on 1-2 platforms and post consistently. ([source](https://www.funda.nl/voormakelaars/artikel-makelaar/de-belangrijkste-socialmediatrends-voor-makelaars/))
- **Existing "Social Media Makelaars Top 50" ranking** indicates Dutch brokers already track and compare social media performance ([source](https://www.instagram.com/p/DRRhFIPj8NN/))

## 3. Target Users & Personas

### Primary Persona: Production Team Operator
- **Role:** Part of a large content production company serving ~50% of Dutch real estate brokers
- **Skill level:** Skilled in video/content production, but not AI-native and not deeply creative on short-form social
- **Day-to-day:** Coordinates shoots, manages editor briefs (playbooks to India), delivers final assets to brokers
- **Goal:** Process more broker videos faster without compromising quality
- **Gap:** Lacks creative short-form expertise and AI tooling knowledge — knows how to produce, not how to make content go viral
- **Team size:** Assumed large given market share; app must support 10 simultaneous operators

### Secondary Persona: The Real Estate Broker (indirect user)
- Never touches the app
- Cares about: "Does my brand look premium? Am I getting more listing inquiries?"
- Provides: Their website URL (for brand scraping) and property footage via their content production partner
- Judges output by: Whether it makes them look like the Serhant of the Netherlands
- Goal: More listings, not faster sales — the property is the stage, the broker is the star

## 4. Strategic Context

### Business Model
- **Pilot fee:** Prove the concept works with a limited scope
- **Full build fee:** Complete platform development after pilot validation
- **Recurring maintenance:** Ongoing platform upkeep, updates, and support

### Competitive Advantage
1. **Vertical specialization:** Generic tools (Opus Clip, Vizard, etc.) don't understand real estate market trends, broker branding requirements, or the playbook-driven editing approach. This app encodes domain expertise.
2. **Zero internal risk for client:** No hires, no technical debt, easy to walk away. Client stays asset-light; we absorb the build risk.
3. **Dutch-market moat vs. AutoReel:** AutoReel (autoreelapp.com) is the closest direct competitor — a purpose-built AI real estate video platform with 50K+ users and $30-165/mo pricing. However, it's US-centric (Zillow/Realtor.com imports), photo-to-video focused, and has no Dutch language specialization, no brokerage CI extraction, and no social-native scripting for the Dutch market. ReelForge differentiates through Dutch-language narration quality, automated brand extraction from broker websites, market-aware playbook integration, and operator workflows designed for consistent output, not one-off video generation.

### Why Now?
- AI video/voice tooling (ElevenLabs, Runway, etc.) has matured to the quality threshold that makes this buildable at reasonable cost
- Client has recognized AI can reduce cost price and increase speed — they're competing on price in the market
- Dutch real estate TikTok is not yet saturated — early movers have outsized opportunity
- Introduction through personal connection created the opening

### Scale Opportunity
Client serves ~50% of Dutch real estate market. If pilot succeeds, volume potential is massive.

**Market sizing (research-backed):**

| Segment | Size | Notes |
|---------|------|-------|
| NVM-affiliated professionals | 5,500+ | ~70% of residential transactions. Best initial entry point |
| Estimated active real estate firms (NL) | ~11,000 | Full TAM including non-NVM |
| Vastgoed Nederland affiliates | 2,000+ | Non-NVM expansion path |

International expansion (English-speaking markets) is a future possibility.

### Positioning
ReelForge should position as a **broker brand content system**, not merely a listing-video generator. Listing video is a contested commodity category. The defensible opportunity is turning broker identity + listing inputs + market knowledge into a repeatable stream of platform-native social content. The commercial message: "turn the same listing and brand inputs into many more social-native outputs at a cost structure closer to software than bespoke production."

## 5. Solution Overview

### What the App Does (Three Layers)
1. **Brands** — Auto-extracts broker CI from their website, applies branded overlays via selectable templates
2. **Hooks** — Generates AI script hooks (Dutch voiceover via ElevenLabs) + offers pre-produced visual hooks from a curated library
3. **Optimizes** — Exports in platform-specific formats for TikTok, Instagram Reels, YouTube Shorts (full video re-editing deferred to full build)

### User Workflow (Pilot)

**Step 1 — Create Project**
Operator creates a new project, enters broker name, pastes broker website URL. If broker profile already exists, reuses saved brand assets.

**Step 2 — Brand Extraction**
App scrapes the broker's website using Firecrawl branding extraction v2: pulls logo, colors, fonts, imagery. Classifies brand style (luxury/boutique, modern/minimal, traditional). Operator reviews and can adjust. If extraction fails, operator manually uploads brand assets.

**Step 3 — CI Template Selection**
5 distinct CI templates render with the broker's extracted brand. Operator selects the best fit. Templates respect brand tone — a boutique Amsterdam broker won't get guerrilla-style treatment.

**Step 4 — Upload Property Media**
Operator uploads raw property video (max 5 minutes, MP4/MOV) and photos (JPG/PNG) from the property advertisement.

**Step 5 — Playbook Context**
Operator uploads/selects the current market playbook — trending real estate features to emphasize (e.g., copper water taps, specific kitchen styles). AI can suggest additions but operator input is leading.

**Step 6 — Hook Selection**
App generates 3-5 script hooks in Dutch (aspirational, Serhant-style tone). Voiceover rendered via ElevenLabs. Operator also browses pre-produced visual hook library. Selects one hook (script, visual, or combined) per target platform.

**Step 7 — Platform Selection & Preview**
Operator selects target platforms (TikTok, Instagram Reels, YouTube Shorts). Full preview: hook at start, CI branding overlaid throughout video, platform-specific formatting.

**Step 8 — Export**
Export in platform-ready formats. Operator downloads and posts manually (no direct API posting in v1).

### Key Design Principles
- Hook is not always branded — optimize for scroll-stopping first, branding comes in later in the video (platform-dependent)
- App UI is entirely in English; only final output (voiceover, text overlays) is in Dutch
- Broker profiles are persistent — brand assets saved and reusable across videos
- One operator per listing, never two

### Technical Stack (Pilot)
The pilot requires a straightforward web app stack, not a complex rendering engine:

- **Web app:** Next.js or equivalent
- **Brand scraping:** Firecrawl API (branding extraction v2)
- **Hook script generation:** LLM (Claude/GPT)
- **Voiceover:** ElevenLabs API (Dutch, Multilingual v2 model for quality)
- **Video stitching & overlay:** Two options for dev team to evaluate:
  - **Option A — Remotion:** React-based programmable video composition. $0.01/render + $100/mo. Maximum control for brand-aware templating, custom preview UI, future editing interfaces. Higher engineering effort upfront. ([remotion.dev](https://www.remotion.dev/))
  - **Option B — FFmpeg or cloud API (Shotstack/Creatomate):** Simpler stitching — concatenate hook clip to property video, overlay CI template. Shotstack: $0.20-0.30/rendered minute. Creatomate: $45-274/mo. Lower engineering effort, less flexibility long-term. ([shotstack.io](https://shotstack.io/pricing/), [creatomate.com](https://creatomate.com/pricing))
- **Visual hooks:** Pre-produced library (5 clips from freelancer), stored as static assets
- **Storage/CDN:** Cloudinary or equivalent for media management and delivery

The core operation is simple: concatenate a hook clip to the front of a video, overlay a branded template (logo, lower third, end card) on top, export in platform-specific formats.

### Content Archetypes
Research indicates the app should support multiple content lengths, not just ultra-short reels. Platforms increasingly reward longer short-form content when the opening is strong:

| Format | Length | Purpose | Priority |
|--------|--------|---------|----------|
| Quick reel / listing teaser | 10-20s | Fast awareness, scroll-stopping hooks | Pilot (v1) |
| Mid-length branded explainer | 30-60s | Local authority, tips, neighborhood highlights | Full build |
| Long short-form story | 60-90s+ | Educational market content, richer storytelling | Full build |

Socialinsider 2025 data shows Instagram Reels of 60-90 seconds achieve highest engagement rates, and TikTok videos over 60 seconds substantially outperform shorter ones on average views. The key is the opening, not the length.

### Future (Full Build)
- Video re-editing / optimization (pacing, beat-syncing, cutting to trending audio)
- Performance tracking feedback loop — platform analytics tied back to hook/template choices, self-learning recommendations
- On-the-fly visual hook generation
- Direct posting to platforms via API
- A/B testing of hooks
- Multi-language output (English, French)
- Mid-length and long-form content archetypes (neighborhood spotlights, market updates, seller-focused authority reels)

## 6. Success Metrics

### Primary Metric
**Average views per video** — social media performance across platforms
- **Current benchmark:** 3-6K views per listing (District Real Estate Amsterdam TikTok)
- **High performers:** 20K views
- **Target:** 10K+ average (consistent five figures)
- **Timeline:** Measure after 30 days of posting

### Secondary Metrics

| Metric | Current | Target |
|--------|---------|--------|
| First-time-right (broker approval without revisions) | Unknown | 99.9% |
| Brand compliance | Manual QA | Automated via CI templates |
| Cost per video | 5c/min editing + manual branding | Lower (TBD) |
| Time per video (upload to export) | Hours (manual process) | Minutes |

### Guardrail Metrics
- Brand tone accuracy — output must match broker positioning (no mismatched styles)
- No degradation in video quality compared to manual editing

## 7. User Stories & Requirements

### Epic Hypothesis
We believe that giving production operators a tool to auto-extract broker branding and generate platform-optimized hooks will increase average video views from 3-6K to 10K+ while maintaining 99.9% first-time-right approval, because brokers currently lack consistent branding and scroll-stopping hooks on their short-form content.

### User Stories

**Story 1: Create broker profile via website URL**
As an operator, I want to paste a broker's website URL and have the app extract their brand identity (logo, colors, fonts, imagery, style), so I don't have to manually gather brand assets.

Acceptance criteria:
- [ ] Uses Firecrawl branding extraction v2
- [ ] Extracts: logo, primary/secondary colors, fonts, imagery samples
- [ ] Classifies brand style (e.g. luxury/boutique, modern/minimal, traditional)
- [ ] Operator can review and adjust extracted brand before saving
- [ ] Broker profile is saved and reusable for future videos

**Story 2: Manual brand upload fallback**
As an operator, I want to manually upload brand assets (logo, colors, fonts) when automated extraction fails or is inaccurate, so I can still create branded videos.

Acceptance criteria:
- [ ] Upload fields for: logo (PNG/SVG), primary color, secondary colors, font files or names
- [ ] Manual uploads override scraped values
- [ ] Saved to broker profile like auto-extracted assets

**Story 3: Preview and select CI templates**
As an operator, I want to see 5 CI template options applied with the broker's extracted brand, so I can pick the best fit for this broker.

Acceptance criteria:
- [ ] 5 distinct CI templates available (e.g. lower-third, full-frame intro, corner watermark, etc.)
- [ ] Each template renders with the broker's actual colors, logo, fonts
- [ ] Operator selects one template per project
- [ ] Templates respect brand tone (boutique broker doesn't get guerrilla-style treatment)

**Story 4: Upload property media**
As an operator, I want to upload the raw property video and photos, so the app has the source material to work with.

Acceptance criteria:
- [ ] Supports video formats: MP4, MOV (max 5 minutes)
- [ ] Supports image formats: JPG, PNG
- [ ] Upload progress indicator
- [ ] Basic validation (file size limits, format checks, duration check)

**Story 5: Manage market playbook**
As an operator, I want to upload and manage the current market playbook (trending features, style preferences), so hook generation takes real estate trends into account.

Acceptance criteria:
- [ ] Operator can upload/edit a playbook document
- [ ] Playbook feeds into hook generation prompts
- [ ] AI can suggest trending additions (operator confirms/rejects)
- [ ] Playbook persists across projects, can be updated anytime

**Story 6: Generate and select script hooks**
As an operator, I want the app to generate 3-5 script hooks with Dutch voiceover, so I can pick the most compelling opener.

Acceptance criteria:
- [ ] Generates 3-5 script hooks in Dutch (aspirational Serhant-style tone)
- [ ] Voiceover generated via ElevenLabs in Dutch
- [ ] Operator can preview each hook with audio playback
- [ ] Hook generation informed by playbook + platform best practices
- [ ] Operator selects one hook per target platform

**Story 7: Browse and select visual hooks**
As an operator, I want to browse a library of pre-produced visual hooks, so I can add a compelling visual opener to the video.

Acceptance criteria:
- [ ] Library of pre-produced visual hook clips
- [ ] Hooks tagged by style/mood (luxury, energetic, cinematic, etc.)
- [ ] Preview playback before selection
- [ ] Can combine visual hook with script hook or use standalone
- [ ] Admin can upload new visual hooks to the library

**Story 8: Select platforms and export**
As an operator, I want to select target platforms and export the final video with hook + branding applied, so it's ready to post.

Acceptance criteria:
- [ ] Platform options: TikTok, Instagram Reels, YouTube Shorts
- [ ] Export respects platform specs (aspect ratio, max length, file size)
- [ ] Hook placed at video start (branded or unbranded depending on platform strategy)
- [ ] CI branding overlaid throughout video
- [ ] Full preview before export
- [ ] Download in platform-ready format

### Constraints

| Constraint | Decision |
|-----------|----------|
| App UI language | English |
| Output language | Dutch only (v1) |
| Max raw footage | 5 minutes |
| Brand fallback | Manual upload if Firecrawl extraction fails |
| Broker profiles | Persistent — brand assets saved per broker, reusable |
| Concurrency | 10 simultaneous operators |
| Operator-to-listing | 1:1 (one operator per listing, never shared) |
| Data privacy | Not a concern for v1 (public website data only) |

### Edge Cases
- Broker website has minimal branding (single-page, no clear logo) — fallback to manual upload
- Raw video shorter than 15 seconds — may not need a hook, operator decides
- Raw video longer than 5 minutes — rejected at upload with clear error message
- Operator wants different hooks per platform for the same property — supported (one hook selection per platform)

## 8. Out of Scope

**Not included in pilot:**
- Video re-editing / optimization (pacing, beat-syncing, cutting to trending audio) — full build
- Performance tracking / feedback loop (self-learning recommendations) — full build
- On-the-fly AI visual hook generation — pilot uses pre-produced library; automated generation in full build
- Multi-language output (English, French) — future international expansion
- Mobile app — web only
- Direct posting to platforms via API — operator downloads and posts manually
- A/B testing of hooks — future
- Broker self-serve access — operators only for v1

## 9. Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Blocker? |
|-----------|-------|--------|----------|
| Firecrawl API access (branding extraction v2) | Thomas | Available | No |
| ElevenLabs API access (Dutch voiceover) | Thomas | Available | No |
| 5 CI template designs | Freelancer (hired by Thomas) | To be created | Yes |
| Pre-produced visual hook library | Freelancer (hired by Thomas) | To be created | Yes |
| Sample broker website for testing | Client | To be requested | Soft |
| Sample raw property video for testing | Client | To be requested | Soft |

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Firecrawl brand extraction quality varies across broker websites | Inconsistent CI output | Manual upload fallback + operator review/adjust step. Firecrawl v2 claims improved handling of Wix/Framer sites, but reliability is vendor-claimed, not independently validated |
| ElevenLabs Dutch voiceover quality may not sound natural enough | Broker rejects hook | Dutch is supported in Multilingual v2 and Flash v2.5. Test with multiple voice profiles; compare against Azure/Google TTS for Dutch quality. Get client feedback early |
| Pre-produced visual hooks feel generic across different broker brands | Lower engagement | Tag hooks by style/mood; expand library based on feedback |
| Client won't share sample assets or broker names for testing | Can't validate during development | Use publicly available Dutch broker websites as test cases (DSTRCT, Van der Sande, etc.) |
| 99.9% first-time-right is an extremely high bar | Missed KPI | Build robust preview step; let operator fine-tune before export |
| Hook style that works on TikTok may not work on Instagram/YouTube | Platform underperformance | Allow different hook per platform. TikTok guidance: hook in first 3-6 seconds. YouTube Shorts: tightest window. Reels: discovery-focused |
| **AutoReel or similar tool enters Dutch market** | Competitive threat | Differentiate on Dutch language quality, brand extraction, and operator workflow — not on generic video generation |
| **TikTok EU regulatory risk** | Platform disruption | EC found TikTok in breach of Digital Services Act (Feb 2026). Build cross-platform — never anchor value proposition to one platform's mechanics |
| **EU AI Act compliance** | Legal/reputational | Not high-risk category, but must label AI-generated content and maintain consent records for voice generation. Build disclosure controls and audit logs into the product |
| **Property misrepresentation via AI-enhanced visuals** | Marketing liability | Keep staging/editing disclosures. Human review before publish by default |

## 10. Open Questions

- [ ] What voice profile/tone for ElevenLabs? (Male/female, age, energy level) — test Multilingual v2 vs Flash v2.5 for Dutch quality
- [ ] Does the client want to provide their existing playbook as a starting template?
- [ ] What are the client's current turnaround time expectations? (Hours? Same day? Next day?)
- [ ] Should hooks reference the property at all, or stay fully generic/aspirational?
- [ ] What is the client's budget range for the pilot vs full build?
- [ ] What's the desired go-live date for the pilot?
- [ ] Music/audio: Should the app suggest trending audio tracks per platform? (Currently out of scope but important for performance)
- [ ] How does the client want to handle AI content disclosure? (EU AI Act requires labeling AI-generated content)
- [ ] Does the client's current contract with brokers cover AI-generated content, or do terms need updating?
- [ ] Rendering stack decision: Remotion (more control, React-based) vs Shotstack/Creatomate (faster to ship) vs FFmpeg (simplest) — dev team to evaluate

## 11. Competitive Landscape

### Direct Competitor: AutoReel
- **What:** Purpose-built AI real estate video platform
- **Users:** 50,000+ real estate professionals, 100,000+ videos generated
- **Core feature:** Turns property photos into cinematic videos in minutes
- **Integrations:** One-click import from Zillow, Realtor.com
- **Pricing:** Free (2 videos/mo, watermarked) → $30/mo (25 videos/yr) → $90/mo (100 videos/yr) → $165/mo (200 videos/yr) → Enterprise/API
- **Weakness for Dutch market:** US-centric, no Dutch language support, no Funda integration, no brokerage CI extraction, photo-to-video focus (not video-to-branded-reel)
- **Source:** [autoreelapp.com](https://www.autoreelapp.com/)

### Adjacent Tools (Not Direct Competitors)
- **Opus Clip, Vizard, Descript:** Generic short-form video tools. No real estate specialization, no brand extraction
- **CapCut (for Business), Canva Video:** Template-based video editing. Could be used manually but no automation or brand-aware workflow
- **Luxury Presence, Rechat:** Real estate marketing platforms. Focus on websites and CRM, not short-form video content

### ReelForge Differentiation Matrix

| Capability | AutoReel | Generic tools | ReelForge |
|-----------|----------|---------------|-----------|
| Dutch language voiceover | No | No | Yes (ElevenLabs) |
| Automated brand extraction from website | No | No | Yes (Firecrawl) |
| CI template system | Basic | Generic templates | 5 broker-archetype templates |
| Market-aware playbook | No | No | Yes (operator-managed) |
| Operator workflow for teams | Limited | No | Yes (10 concurrent) |
| Pre-produced visual hook library | No | No | Yes |
| Platform-specific export | Limited | Yes | Yes |
| Dutch real estate market context | No | No | Yes |

## 12. Regulatory & Compliance

### EU AI Act (Effective August 2026)
- ReelForge does NOT fall into high-risk AI categories (biometrics, employment, law enforcement, etc.)
- **Transparency obligation applies:** AI-generated content (voiceover, text) must be labeled as AI-created
- **Deployer obligation:** Must clearly indicate when content was created or edited using AI
- **Source:** [Dutch government AI Act guidance](https://business.gov.nl/regulations/ai-act/)

### Compliance Requirements for ReelForge

| Requirement | Implementation |
|-------------|---------------|
| AI content labeling | Add metadata/watermark option indicating AI-generated voiceover and text |
| Voice consent | Maintain consent records if using custom voice cloning (not applicable for stock ElevenLabs voices) |
| Property representation accuracy | Human review step before export (already in workflow via operator preview) |
| Platform compliance | Follow each platform's AI content disclosure guidelines |
| Audit trail | Log which AI services were used per video export (LLM, ElevenLabs, etc.) |

### TikTok EU Risk
The European Commission found TikTok's addictive design in breach of the Digital Services Act (February 2026). Potential fines up to 6% of global turnover. ReelForge must build for cross-platform resilience — the value proposition is "better broker-branded short-form content across platforms," not "beat the TikTok algorithm."

## 13. Research Sources

This PRD is informed by two research efforts conducted on 2026-03-16:

1. **Internal hook research** — Platform-specific hook formats, timing, Dutch cultural considerations, reference accounts. See `hook-research.md`
2. **Manus deep research** — Dutch market sizing, pricing benchmarks, competitor analysis, platform algorithm verification, compliance analysis, tech stack evaluation. See `manus_reelforge_full_research_report.md` and `manus_reelforge_market_notes.md`

Key sources:
- NVM housing market data Q4 2025 ([nvm.nl](https://www.nvm.nl/wonen/marktinformatie/))
- NVM membership and market sizing ([nvm.nl](https://www.nvm.nl/nieuws/2025/nvm-beedigde-185-registermakelaars-en-taxateurs-in-het-jaar-2025/))
- Vastgoed Nederland merger ([vastgoednederland.nl](https://vastgoednederland.nl/fusie-officieel-vbo-en-vastgoedpro-verder-als-vastgoed-nederland/))
- Funda social media trends for makelaars ([funda.nl](https://www.funda.nl/voormakelaars/artikel-makelaar/de-belangrijkste-socialmediatrends-voor-makelaars/))
- Woning Media NL pricing 2024/2025 ([woningmedia.nl](https://www.woningmedia.nl/userdata/file/Woning%20Media%20-%20Prijslijst%202024%202025%20-%20DEF.pdf))
- AutoReel competitor ([autoreelapp.com](https://www.autoreelapp.com/))
- TikTok creative best practices ([ads.tiktok.com](https://ads.tiktok.com/help/article/creative-best-practices))
- Instagram Reels/Trial Reels guidance ([creators.instagram.com](https://creators.instagram.com/blog/instagram-trial-reels))
- YouTube Shorts guidance ([blog.youtube](https://blog.youtube/creator-and-artist-stories/your-guide-to-getting-started-with-youtube-shorts/))
- Dutch government AI Act ([business.gov.nl](https://business.gov.nl/regulations/ai-act/))
- Socialinsider 2025 video benchmarks ([socialinsider.io](https://www.socialinsider.io/social-media-benchmarks/social-media-video-statistics))
- Rendering stack: [Remotion](https://www.remotion.dev/), [Shotstack](https://shotstack.io/pricing/), [Creatomate](https://creatomate.com/pricing), [Cloudinary](https://cloudinary.com/pricing)
- ElevenLabs Dutch support ([elevenlabs.io](https://elevenlabs.io/docs/overview/capabilities/text-to-speech))
- Firecrawl branding v2 ([firecrawl.dev](https://www.firecrawl.dev/blog/branding-format-v2))

---

*Working title: ReelForge*
*PRD version: 0.2 (research-validated)*
*Date: 2026-03-16*
*Author: Thomas (Alavida)*
*Research: Internal hook research + Manus deep research*
