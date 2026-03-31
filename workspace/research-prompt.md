# Research Prompt: ReelForge — Real Estate Short-Form Video Branding Platform

## Your Role

You are a senior product researcher. Your job is to conduct deep, comprehensive research that will inform the development of a web application called "ReelForge" — a platform that helps Dutch real estate brokers build their personal brand through short-form video on TikTok, Instagram Reels, and YouTube Shorts.

This research will directly feed into a Product Requirements Document (PRD), creative briefs for freelancers, and architectural decisions for the technical build. Be thorough, cite sources, and separate facts from assumptions. When you find conflicting information, present both sides.

---

## Full Project Context

### What We're Building

A web app for a Dutch content production company that serves approximately 50% of all real estate brokers in the Netherlands. This company currently sends videographers to properties, shoots listing videos, and outsources editing to low-cost editors in India (at 5 cents per minute). The edited footage has no branding, no hooks, and is not optimized for short-form social platforms.

Our app sits in the post-production layer. It takes the raw property video that's already been shot and does three things:

1. **Brand extraction and application:** The operator pastes the broker's website URL. The app scrapes the site (using Firecrawl's branding extraction v2 — https://www.firecrawl.dev/blog/branding-format-v2) to pull the broker's logo, colors, fonts, imagery, and classifies their brand style. It then shows 5 CI (Corporate Identity) template options rendered with that broker's actual brand, and the operator picks one. This branded template overlays the entire property video — think lower thirds, corner logos, end cards, branded transitions.

2. **Hook generation and selection:** The app generates 3-5 script hooks in Dutch with AI voiceover (via ElevenLabs). These are aspirational, Serhant-style opening lines designed to stop the scroll. Additionally, the operator can browse a library of pre-produced visual hooks (short cinematic clips created by an AI video motion graphic freelancer). The operator selects one hook per target platform.

3. **Platform-optimized export:** The final video (hook + branded property footage) is exported in platform-specific formats for TikTok, Instagram Reels, and YouTube Shorts, respecting each platform's specs, safe zones, and best practices.

### Critical Context

- **The goal is broker branding, NOT selling houses.** The houses sell regardless in the Dutch market — the m2 price is pretty set. These videos exist so brokers get more LISTINGS. Homeowners see a broker's social media content, think "I want my property marketed like that," and choose that broker. The property is the stage, the broker is the star.

- **The aspirational reference is Ryan Serhant** (serhant.com, Owning Manhattan on Netflix). He's the gold standard for real estate personal branding. The client's brokers want that same energy adapted for the Dutch market.

- **Dutch cultural tone matters.** Dutch audiences prefer directness over hype. They reject "American influencer" energy. The tone should be aspirational but grounded — elevated, not exaggerated. Dry, observational humor works (see Korne Pot's viral makelaar content). Keep it conversational, avoid jargon.

- **The client uses market-aware editing playbooks.** They send scripts to their India editors — for example, if copper water taps are trending in real estate right now, the editors zoom into that element more. This "taste layer" reflecting current market trends needs to be replicated in the app.

- **Pricing context:** The client currently pays 5 cents/minute for basic editing (India). A fully custom branded hook costs approximately EUR 3,500 per broker — too expensive for most. Our app fills the gap between commodity editing and premium bespoke branding.

- **Performance benchmarks:** District Real Estate Amsterdam (DSTRCT, https://www.dstrct.com/properties/, TikTok: https://www.tiktok.com/@dstrctrealestate) averages 3-6K views per listing on TikTok. High performers hit 20K. The target is to get average views above 10K (consistent five figures).

- **KPI: 99.9% first-time-right.** When the broker sees the final video, they approve it on first review. No revision rounds. This means the CI templates and hooks must be so on-brand and high-quality that there's no back-and-forth.

- **Pilot scope:** Brand extraction + CI templates + hook generation/selection + platform export. Video re-editing (pacing, beat-syncing, cutting) and performance tracking/feedback loops are deferred to the full build.

- **End user is the client's production team** (operators), not the brokers themselves. The operators are skilled in video production but not AI-native and not deeply creative on short-form social. The app must support 10 simultaneous operators.

### The App Workflow (Pilot)

1. Operator creates project, enters broker name, pastes broker website URL
2. App scrapes broker website via Firecrawl → extracts brand → classifies style
3. Operator reviews/adjusts brand extraction (manual upload fallback if scraping fails)
4. 5 CI templates render with broker's brand → operator picks one
5. Operator uploads raw property video (max 5 min) + photos
6. Operator uploads/selects current market playbook (trending features to emphasize)
7. App generates 3-5 Dutch script hooks (ElevenLabs voiceover) → operator picks
8. Operator browses pre-produced visual hook library → optionally picks visual hook
9. Operator selects target platforms (TikTok, Reels, Shorts)
10. Full preview (hook + branded video) → operator approves → export

### What We've Already Researched (Verify, Deepen, and Challenge This)

We conducted initial research on short-form video hooks for real estate. Below are the key claims we found. YOUR JOB IS TO VERIFY THESE, FIND ADDITIONAL DATA, CHALLENGE ANYTHING THAT'S WRONG, AND FILL THE GAPS WE MISSED.

**Hook timing claims:**
- 71% of viewers decide within the first 3 seconds whether to keep watching
- TikTok attention capture window: 1.5-3 seconds
- Instagram Reels: 1.5-3 seconds (text hook should appear in first 1.5s)
- YouTube Shorts: ~2 seconds (tightest window)

**Hook format claims:**
- Curiosity gaps outperform all other hook types consistently
- "Hook stacking" (layering visual + text + audio simultaneously) is the most powerful technique
- Drone content generates 53% higher CTR than still photos
- Indoor drone flythroughs are "nearly impossible to scroll past"
- Content mix recommendation: 50% curiosity / 30% aspirational / 20% authority-educational

**Platform-specific claims:**
- TikTok: Rewards humor, trend participation, casual energy. Trending audio can multiply reach 200-300%. Dutch real estate TikTok is not yet saturated.
- Instagram Reels: Favors polished aesthetics. Trending audio sweet spot is 5K-20K uses. Authority positioning works best.
- YouTube Shorts: Most compressed attention window. Weights re-watches heavily. 15-30 second videos optimal for engagement. Algorithm is less audio-dependent.

**Optimal video length claims:**
- TikTok viral: 11-18 seconds. Storytelling: 21-34 seconds. Educational: 60-180 seconds.
- Instagram Reels: Best completion at 7-15 seconds. Best reach at 15-30 seconds.
- YouTube Shorts: Engagement sweet spot at 15-30 seconds.

**Dutch-specific claims:**
- Dutch audiences prefer directness over hype
- Dry, observational humor works (Korne Pot example)
- 85% of users watch without sound → subtitles essential
- "American influencer" energy is a turnoff for Dutch viewers
- 20% higher energy than normal conversation is ideal for delivery
- Dutch real estate TikTok is an unsaturated opportunity

**Script hook patterns claimed to work:**
- Curiosity gap: "Dit huis heeft een geheim dat de meeste kopers missen"
- Bold claim: "Dit is het beste huis onder 4 ton in Amsterdam"
- Problem-question: "Word je nog steeds overboden op elk huis?"
- Shock stat: "Slechts 1 op de 10 kopers doet dit — en het bespaart duizenden euros"
- Pattern interrupt: "Koop geen huis in 2026" (then nuance)
- Micro story: "Vorige week liep ik een huis binnen en zei meteen: koop dit niet"

**Anti-pattern claims:**
- Polite introductions ("Hi, I'm [name]...") kill watch time
- Logo/branding first wastes precious hook seconds
- Generic openers ("Check dit uit!") are instant skips
- Slow visual pacing = instant scroll
- Information overload in the hook overwhelms

**Branding timing claims:**
- Never lead with branding
- Agent's face IS the brand in short-form
- Small corner watermark only during footage
- End card with logo is acceptable
- The hook should optimize for virality first, branding comes later in the video

**Reference accounts we identified:**
- US: Ryan Serhant / SERHANT Studios, Daniel Heider, Anya Etinger (Toronto)
- Dutch: Uw Makelaar Official (@uwmakelaar_official), DSTRCT Real Estate (@dstrct.realestate), Korne Pot / Libero Aankoop, Reinders Makelaars, Moreno Joosten, Melvin de Makelaar
- Belgian: ImmoFrancois (@aishavervaeke95)
- UK: @grantjbates, @thatahmedkhan, @propertywithsimon

**Audio/music claims:**
- Trending audio multiplies reach 200-300% on TikTok
- Instagram trending audio sweet spot: 5K-20K uses
- YouTube Shorts is less audio-dependent
- Beat-synced cuts every 2-3 seconds match natural rhythm of trending tracks
- Silence-to-sound technique effective for property tours
- Cinematic instrumentals work for luxury; trending audio for reach; original voiceover for authority

---

## What I Need You To Research

### PART 1: Verify and Deepen Our Existing Research

Go through every claim listed above and:
1. **Confirm or deny** with current sources (2025-2026 data preferred)
2. **Add specific numbers** where we have vague claims
3. **Find contradicting evidence** if any exists
4. **Update anything that's outdated** — social media platforms change fast

### PART 2: Dutch Real Estate Market Deep Dive

This is the area where we have the LEAST data and need the MOST.

Research questions:
1. **How big is the Dutch real estate brokerage market?** How many active makelaars/brokerages are there in the Netherlands? What's the market structure (chains vs independents, NVM vs non-NVM)?
2. **What is the current state of social media adoption among Dutch makelaars?** What percentage are active on TikTok? Instagram? YouTube? What's typical vs best-in-class?
3. **Analyze the top 10-20 Dutch real estate TikTok/Instagram accounts.** For each: follower count, average views, posting frequency, hook styles used, branding approach, content types. Be specific with numbers.
4. **What does a typical Dutch property advertisement video look like today?** Length, style, production quality, platforms used. Find examples.
5. **What are the current trends in the Dutch housing market that affect marketing?** (e.g., housing shortage, bidding wars, specific property features that are trending, regional differences between Amsterdam/Randstad vs rest of NL)
6. **What are Dutch real estate brokers currently paying for video marketing services?** Price ranges for different service levels. What does the competitive landscape look like for real estate video production in NL?
7. **Are there any Dutch companies already doing what ReelForge would do?** Competitors, adjacent players, anyone using AI for real estate video in the Dutch market specifically.
8. **What NVM (Nederlandse Vereniging van Makelaars) or industry guidelines exist around marketing/advertising for real estate?** Any regulations or best practices that could affect the app?

### PART 3: Platform Algorithm Deep Dive (2025-2026 Specifics)

1. **TikTok algorithm changes in 2025-2026.** What's changed? How does the algorithm currently work for real estate content specifically? Any de-prioritization of certain content types? Effect of TikTok's potential ban/regulations in Europe?
2. **Instagram Reels algorithm 2025-2026.** How has Reels distribution changed? What does the algorithm favor now versus a year ago? Trial Reels feature — what is it and how does it affect strategy?
3. **YouTube Shorts algorithm 2025-2026.** How does the recommendation engine work for Shorts specifically? How does Shorts content interact with long-form YouTube channels?
4. **Cross-posting strategy.** Is it still effective to post the same content across all three platforms? Or do algorithms now penalize cross-posted content? What adaptations are needed per platform?
5. **Posting cadence and timing for the Dutch market.** Best times to post (NL timezone), optimal posting frequency, day-of-week patterns. Any platform-specific differences?

### PART 4: AI Video and Voice Technology Landscape

1. **ElevenLabs Dutch language quality assessment.** How good is ElevenLabs for Dutch voiceover specifically? Any known issues with Dutch pronunciation, intonation, or regional accents? What are the best voice models for Dutch? Are there alternatives (Azure, Google, Amazon Polly, Play.ht) that might be better for Dutch?
2. **AI video generation tools comparison (March 2026).** Compare Runway Gen-3/Gen-4, Kling, Luma Dream Machine, Pika, Sora, Veo, and any other relevant tools. Which produces the most realistic real estate-style footage? Which handles architectural/interior content best? Pricing, quality, speed, API availability.
3. **Firecrawl branding extraction v2.** What are the actual capabilities and limitations? How reliable is it for extracting brand elements from diverse websites? Any known issues? Are there alternatives for brand scraping?
4. **Programmatic video template tools.** Compare Remotion, Creatomate, Shotstack, Bannerbear, and any other tools for dynamically generating branded video overlays at scale. Which is best suited for our use case (applying CI templates to video with dynamic brand elements)?
5. **Video processing and rendering at scale.** What infrastructure is needed to process 10 simultaneous video exports? FFmpeg-based solutions vs cloud rendering services (AWS MediaConvert, Mux, Cloudinary, etc.). Cost per video render.

### PART 5: Hook Psychology and Copywriting Research

1. **The science of scroll-stopping.** What does the neuroscience/psychology research say about why certain hooks work? Curiosity gap theory, pattern interrupts, cognitive dissonance, open loops — get into the science, not just the tips.
2. **Real estate-specific hook analysis.** Find and analyze 50+ real estate video hooks that went viral (>100K views). Categorize them by type, platform, and what made them work. Include the actual text/script of the hooks where possible.
3. **Dutch copywriting for social media.** Are there any studies or guides on what copy styles perform best with Dutch audiences on social media? Differences from English-language markets? Cultural copywriting considerations?
4. **Aspirational vs. informational content for real estate.** What does the data say about which type drives more follower growth (brand building) vs. immediate engagement? Remember: the goal is broker brand-building, not property sales.
5. **The role of the broker's face/personality in hooks.** How important is it for the broker to appear in frame? Can branded hooks WITHOUT the broker's face still build the broker's brand effectively? This is relevant because the app creates hooks for brokers who may not be comfortable on camera.

### PART 6: Competitive and Market Intelligence

1. **Existing real estate video tools.** Deep analysis of: Opus Clip, Vizard, Descript, CapCut (for business), Canva Video, InVideo, FlexClip, Lumen5, Pictory, and any others. What do they offer for real estate? What are their limitations? Pricing? Do any of them do what ReelForge proposes?
2. **Real estate marketing platforms.** Analyze: Luxury Presence, Rechat, Inside Real Estate, BoldTrail, Matterport, and others. Do any of them include short-form video creation? How do they handle branding?
3. **AI-powered real estate marketing startups.** Find any startups (2024-2026) specifically using AI for real estate video content creation or real estate social media marketing. What do they do? How are they funded? What's their positioning?
4. **The SERHANT model specifically.** How does SERHANT Studios actually work? What's their process? What tools do they use? How do they scale content creation across agents? What can we learn from their approach? Any published case studies or behind-the-scenes content?

### PART 7: Business Model and Pricing Research

1. **SaaS pricing for video creation tools.** What do competitors charge? Per-seat, per-video, flat monthly? What's the market standard?
2. **Value-based pricing for real estate marketing services.** If a broker gets even one additional listing from better social media presence, what's that worth in EUR? (Average Dutch broker commission, average property price, etc.)
3. **Cost structure analysis.** What would it cost to run ReelForge per video? (API calls to Firecrawl, ElevenLabs, cloud rendering, storage, etc.) Rough estimates are fine.

### PART 8: Gaps and Risks We Haven't Thought Of

Based on everything you research, identify:
1. **Risks we haven't considered** — technical, market, legal, cultural, operational
2. **Features we should consider** that we haven't thought of
3. **Assumptions we're making that might be wrong**
4. **Questions we should be asking the client** that we haven't listed
5. **Any regulatory considerations** — GDPR for scraping broker websites, music licensing for trending audio, copyright issues with AI-generated content, Dutch advertising standards for real estate

---

## Output Format

Structure your research as a comprehensive document with:

1. **Executive summary** (1 page) — top 10 findings that should change or inform our decisions
2. **Detailed findings per section** (Parts 1-8) — with sources, data points, and your analysis
3. **Recommendations** — what this research means for the product, prioritized by impact
4. **Source list** — every source you used, with URLs and access dates
5. **Confidence ratings** — for each major finding, rate your confidence: HIGH (multiple corroborating sources), MEDIUM (single source or limited data), LOW (inference or extrapolation)

Be specific with numbers. "Views increased significantly" is useless. "Average views increased from 3.2K to 8.7K after implementing hook stacking (source: X, 2025)" is useful.

Prioritize recency. A 2026 source beats a 2024 source. Platform algorithms change fast.

When you find conflicting information between sources, present both and explain which you find more credible and why.

---

## Key URLs for Reference

- Serhant: https://serhant.com/
- DSTRCT Real Estate: https://www.dstrct.com/properties/
- DSTRCT TikTok: https://www.tiktok.com/@dstrctrealestate
- Firecrawl branding extraction: https://www.firecrawl.dev/blog/branding-format-v2
- ElevenLabs: https://elevenlabs.io/
- Runway: https://runwayml.com/
- Kling: https://klingai.com/
- Remotion: https://www.remotion.dev/
- Creatomate: https://creatomate.com/

---

*This prompt was generated on 2026-03-16 as part of the ReelForge PRD development process.*
