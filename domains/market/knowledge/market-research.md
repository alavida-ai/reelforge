# ReelForge Research Report

## Executive Summary

This report evaluates the market logic, platform assumptions, technical feasibility, competitive landscape, and compliance implications behind **ReelForge**, a proposed AI-assisted short-form video product for Dutch real estate brokers. The evidence supports the core strategic premise: **Dutch brokers operate in a supply-constrained housing market where brand visibility, listing acquisition, and differentiation matter materially**, and short-form video is an increasingly credible channel for that competition.[1][2] At the same time, several sharper claims in the originating brief require qualification. In particular, the idea that short-form success depends on an exact two-second attention window is **too precise to defend** from the current evidence base; a more rigorous statement is that the **first 3 to 6 seconds are strategically critical**, while longer educational or storytelling formats can still perform strongly if the opening is effective.[3][4][5]

The Dutch market appears large enough to justify a focused vertical product. NVM alone reports more than **5,500 affiliated property professionals**, while broader market structure signals point to roughly **11,000 active real-estate-related firms** in the Netherlands, with a large non-NVM segment represented by the newly merged Vastgoed Nederland organization.[2][6] This means a realistic go-to-market can begin with NVM-dense brokerages, but should not model the addressable market as NVM-only. In parallel, Dutch channel data and industry guidance indicate that **Instagram and TikTok are the most natural first channels for broker-facing short-form content**, with YouTube Shorts serving as a meaningful secondary distribution and brand-ecosystem layer rather than just an afterthought.[7][8][9]

From a product perspective, there is credible demand for AI-generated real estate video, but the market is already moving. AutoReel demonstrates that a category player can package AI property video as self-serve SaaS with clear volume pricing and broad role-based targeting across agents, photographers, and media companies.[10] ReelForge therefore should not position itself as a generic “AI video for listings” product. Its strongest defensible wedge is **Dutch-market specialization**, particularly around **brokerage-brand extraction, Dutch-language narration quality, social-native scripting, consistent CI application, and operational workflows that turn listing information plus brand assets into multiple tested video variants**.

On the technical side, the build-vs-buy decision is real. API-first rendering vendors such as Shotstack and Creatomate offer low-friction, credible starting economics, while Cloudinary is more compelling as supporting infrastructure than as the central rendering engine.[11][12][13] By contrast, Remotion offers substantially more flexibility for a differentiated product, especially if ReelForge wants brand-aware templating, future editing interfaces, localization logic, and experimentation workflows to become part of the core value proposition.[14] The evidence suggests a pragmatic conclusion: **a pilot can launch on a semi-bought stack, but long-term defensibility is stronger with a more custom rendering layer**.

The largest risks are not technical impossibility but **positioning, workflow fit, and compliance discipline**. Dutch and EU guidance suggests this product is unlikely to fall into the AI Act’s high-risk category, but it **does trigger transparency, labeling, and responsible-use obligations** when AI is used to generate or edit marketing content.[15] Platform risk also matters: TikTok remains strategically important, yet EU regulatory pressure on addictive design means ReelForge should avoid anchoring its value proposition to one platform’s current mechanics alone.[16] The recommended path is therefore to build ReelForge as a **broker-brand content operating system**, not merely a reel generator.

## Research Scope and Method

The task was to evaluate the claims and opportunity structure implied by the ReelForge concept using current, authoritative, and where possible official sources. The research focused on six dimensions: Dutch real estate market context, broker social-media behavior and channel relevance, short-form platform mechanics, AI voice and video tooling, competitor and pricing benchmarks, and compliance or platform-regulatory risks.

The strongest available evidence came from **official platform documentation**, **Dutch industry bodies**, **government guidance**, and **vendor pricing or capability pages**. These were supplemented where necessary by benchmark providers and secondary summaries when primary datasets were not directly accessible. Throughout the report, stronger claims are clearly distinguished from directional but less definitive evidence.

## Dutch Real Estate Market Context

The macro context is supportive of the original strategic intuition. NVM’s housing market information for the Dutch owner-occupied market in Q4 2025 reports **47,619 homes sold**, up **11.1% year over year**, with **29,764 homes for sale**, up **16.2%**, an average selling price of **EUR 502,000**, an average selling time of **28 days**, and a **krapte-indicator of 1.9**.[1] This remains a tight market by Dutch standards. A krapte-indicator below 2 indicates limited buyer choice and persistent scarcity pressure. In such an environment, brokers do not compete only on moving inventory; they compete for **mandates, local mindshare, trust, and visibility among potential sellers**.

That supports a key ReelForge assumption. If selling a home in many local markets is still relatively feasible due to structural scarcity, the broker’s commercial challenge shifts toward **winning the listing in the first place** and reinforcing a recognizable, trusted brand. Short-form video can plausibly serve that need because it sits at the intersection of familiarity-building, local authority signaling, and repetitive market presence.

The addressable market is also broader than a superficial reading might suggest. NVM states that it has **more than 5,500 affiliated property professionals**, including approximately **4,500 sworn registermakelaars and taxateurs**, around **2,900 registertaxateurs**, and roughly **1,000 KRMT members**.[2] The same NVM source states that **16,841 companies** are registered under the broad KvK SBI code 68310, with an estimated roughly **11,000 active vastgoedondernemingen**, about half of which are members of NVM, while NVM-affiliated brokers account for around **70% of all Dutch residential market transactions**.[2]

This should shape market sizing. If ReelForge targets “brokers” too narrowly, it may undercount the practical market. If it targets all registered real-estate firms too broadly, it may overstate near-term demand. The most useful interpretation is shown below.

| Market signal | Evidence | Strategic implication |
|---|---:|---|
| NVM affiliated professionals | 5,500+ | Strong initial entry point and credibility anchor |
| Estimated active vastgoedondernemingen | ~11,000 | TAM is meaningfully larger than NVM alone |
| NVM share of residential transactions | ~70% | NVM segment is commercially dense and high priority |
| Vastgoed Nederland affiliates | 2,000+ | Significant non-NVM expansion path remains |

The non-NVM side also matters. Following the merger of VBO and Vastgoedpro, Vastgoed Nederland states that it represents **more than 2,000 affiliated makelaars, taxateurs, and vastgoedprofessionals**.[6] This reinforces the idea that Dutch brokerage is not synonymous with NVM, even if NVM remains the most commercially concentrated segment.

## Dutch Broker Social-Media Context

The available Dutch evidence suggests that social content is no longer peripheral for brokers. Funda’s makelaar-facing article summarizing Newcom’s 2024 social-media research emphasizes that **Instagram and TikTok remain important channels for makelaars**, especially among younger demographics, and recommends focusing effort on **one or two platforms** and posting consistently rather than spreading attention too thinly.[7] Funda notes that Instagram is used daily by around **60% of people in their twenties**, while about **half of twentysomethings use TikTok daily**.[7]

That advice is strategically important because it aligns with a product design centered on **repeatable, operator-driven publishing** rather than “campaign mode” video production. If brokers should focus on one or two channels and publish consistently, a winning tool must reduce the cost of **consistent output**, not just the cost of one polished reel.

Secondary Dutch reporting on Newcom 2025 points in the same direction, even if its precise figures should be treated with caution. A summary from MondoMarketing reports that **LinkedIn, YouTube, Instagram, and TikTok all continued to grow**, with TikTok and Snapchat showing especially strong relative growth in daily use.[8] While the exact numbers come from a secondary source, the directional finding is strong: Dutch daily attention is not collapsing into a single network, but **Instagram and TikTok remain core social-video environments**, and **YouTube is more relevant than many social-first teams assume**.

This creates a clear first-channel logic for ReelForge.

| Channel | Evidence quality | Role for ReelForge |
|---|---|---|
| Instagram Reels | High | Primary discovery and local brand-building channel |
| TikTok | High | Primary experimentation and reach channel |
| YouTube Shorts | Medium-high | Secondary distribution plus bridge to broader YouTube presence |
| LinkedIn | Medium | Possibly relevant for luxury, B2B, or personal-brand brokers, but not first priority |

A smaller but still useful signal comes from the existence of social-media ranking behavior among Dutch brokers. An Instagram post from Van der Sande Makelaars references a “Social Media Makelaars Top 50” and reports its own placement on Facebook and TikTok.[17] This is not high-grade performance evidence, but it suggests that broker social status is already being tracked and compared, which is exactly the kind of environment in which a reputation-enhancing content product can resonate.

## Video Pricing and Current Spending Logic in Dutch Real Estate Media

One of the strongest validations of the business model comes from the **gap between commodity property media pricing and bespoke branding retainers**. Woning Media Nederland’s 2024/2025 price list offers useful benchmarks. A standard woningvideo is listed from **EUR 175** for smaller homes, rising to **EUR 400** for larger properties; premium woningvideo ranges from **EUR 500 to EUR 1,250**, while a social-media teaser is listed at **EUR 50** and drone video at **EUR 250**, all excluding VAT.[18]

These prices matter because they calibrate what Dutch brokers and their media partners already recognize as normal operational spend. The ReelForge brief reportedly contrasts this with bespoke branding packages in the multi-thousand-euro range. The benchmark data supports that contrast. ReelForge likely cannot scale as a market-wide tool if it behaves like an agency retainer. It must instead sit closer to **repeat-use operational software spend** or at least a highly repeatable media utility with visible ROI.

This does not mean ReelForge must be cheap in absolute terms. It means the pricing logic should feel more like **workflow infrastructure** than like **creative consulting**. The strongest commercial message is likely not “replace your videographer,” but rather “turn the same listing and brand inputs into many more social-native outputs at a cost structure closer to software than bespoke production.”

## Platform Dynamics and Claim Verification

A major part of this research was testing whether the brief’s platform assumptions can be stated rigorously. The evidence supports the broad thesis that **early attention capture matters enormously**, but it does **not** support rigid claims like “the user decides in exactly two seconds.”

TikTok’s official Business Help Center states that creators and advertisers should **prioritize the hook in the first 6 seconds** to increase watch time and engagement, and should introduce the core proposition in the **first 3 seconds** for better recall and awareness.[4] It also recommends native-feeling execution, sound, vertical 9:16 format, captions or text overlays, and continuous testing of multiple creative variants.[4] This is strong platform-authored evidence that the opening seconds are highly consequential.

YouTube’s official Shorts guidance likewise says creators need to **capture attention in the first few seconds** to avoid scroll-away, while also confirming that Shorts can run up to **3 minutes** in vertical format and benefit from consistent publishing and analytics feedback loops.[9]

Instagram’s official creator guidance points in a similar direction but adds a more important strategic layer: **discovery distribution**. Instagram states that reels up to **3 minutes** are eligible for recommendation to non-followers in surfaces such as Explore and the Reels tab, and that **Trial Reels** can be shown to non-followers first so creators can test performance before wider distribution.[3][5] It also claims that creators of all sizes can now break through recommendations if they publish original content consistently.[5]

Taken together, these official sources support a much more defensible formulation of the short-form strategy:

> **The first 3 to 6 seconds are strategically critical, but success is not limited to ultra-short videos. Platforms increasingly support longer short-form storytelling when the opening is strong and the content remains relevant.**

This interpretation is reinforced by Socialinsider’s 2025 benchmark report, which finds that **Instagram Reels between 60 and 90 seconds** achieved the highest engagement rates in its dataset and that **TikTok videos longer than 60 seconds** substantially outperformed shorter ones on average views.[19] Because Socialinsider is an industry benchmark provider rather than a platform or academic source, the exact numbers should be treated as directional rather than universal. Still, it strongly challenges simplistic dogma such as “everything must be 10 seconds long.”

The practical consequence for ReelForge is important. The product should not optimize solely for one micro-format. It should support at least three useful content archetypes:

| Format archetype | Likely length | Purpose |
|---|---:|---|
| Hook-first quick reel | 10–20s | Fast awareness, trial content, listing teasers |
| Mid-length branded explainer | 30–60s | Local authority, tips, neighborhood highlights |
| Long short-form story | 60–90s+ | Educational market content, trust-building, richer storytelling |

That flexibility is a strategic advantage if implemented well. Many category tools appear strongest in photo-to-video automation, but fewer seem optimized for **content strategy variation** across hooks, story depth, and channel-specific experimentation.

## AI Voice, Brand Ingestion, and Rendering Stack

The technical components envisioned in the brief are feasible with currently available tools, though not all tools play the same role.

For voice generation, ElevenLabs is a credible starting point. Its documentation states that Dutch is supported in both **Multilingual v2** and **Flash v2.5**, with the former prioritizing quality and expression and the latter latency.[20] This supports the practicality of Dutch-language narration. However, no authoritative source found here proves ElevenLabs is categorically best for Dutch real estate content; that remains a testable implementation question rather than a settled research conclusion.

For brand extraction, Firecrawl’s Branding Format v2 appears highly aligned with ReelForge’s use case. Firecrawl says its branding output can extract **logo, color palette, typography, spacing scale, and UI component styles** in a structured format, with improved performance even on modern site-builder websites.[21] If this works reliably in practice, it is exactly the kind of automation that can turn a brokerage website into CI-ready video templates. But because the source is vendor-authored, the prudent interpretation is that Firecrawl is **promising**, not yet fully validated.

The rendering layer deserves careful strategic treatment. Official pricing and positioning pages suggest a meaningful three-way distinction.

| Tool | Best role | Why it matters |
|---|---|---|
| Shotstack | API-first rendering vendor | Low-friction launch, predictable usage pricing |
| Creatomate | Template automation vendor | Fast templated workflows, API + no-code access |
| Cloudinary | Media infrastructure layer | Transformation, delivery, CDN, optimization |
| Remotion | Custom programmable engine | Maximum control, custom UX, deeper defensibility |

Shotstack lists pricing at **USD 0.30 per rendered minute** on pay-as-you-go and **USD 0.20 per minute** on subscription, with 1080p support and white-label tooling.[11] Creatomate lists plans starting at **USD 45/month**, explains credit consumption transparently, and is clearly oriented toward automated video generation via API or no-code workflows.[12] Cloudinary emphasizes upload, transformation, transcoding, streaming, and CDN delivery; it is less naturally framed as the main template engine for a brand-first short-form product.[13]

Remotion, by contrast, is not just a renderer but a **programmable video application framework**. It positions itself around building video with React, parameterizing content, and rendering server-side or serverless, with an Editor Starter product for custom video editing applications.[14] For a differentiated product, this is compelling. If ReelForge wants to become a workflow system that understands broker brand kits, listing data, multiple templates, localized narration, and hook-variant generation, a custom engine has significant appeal.

The trade-off is clear.

> **Bought infrastructure lowers time-to-market; custom infrastructure raises long-term control and differentiation.**

A practical recommendation is to use **bought components where they are commodity**, and reserve custom engineering for the pieces that define the wedge: brand logic, content generation logic, language quality, testing workflow, and editor UX.

## Competitive Landscape

AutoReel is the clearest directly relevant competitor identified in this research. It positions itself as a specialized AI real estate video platform for **realtors, brokers, photographers, and real estate media companies**, with features spanning photo-to-video conversion, captions, branding, AI voiceovers, AI avatars, social-media captions, virtual staging, and one-click import from major property portals.[10] Its packaging is also instructive: a free entry tier, volume-based paid plans, and an enterprise/API offer.

Its annualized pricing page lists:

| Plan | Price | Included volume | Notes |
|---|---:|---:|---|
| Free | USD 0 | 2 videos/month | Watermarked, limited images, 15s max |
| Essential | USD 30/month | 25 videos/year | 1080p, no watermark |
| Growth | USD 90/month | 100 videos/year | Higher volume, priority support |
| Pro | USD 165/month | 200 videos/year | Team/agency scale |
| Enterprise/API | Custom | 100+ videos/month | API access |

This tells us several things. First, the category already has a **self-serve SaaS reference price**. Second, the product is not priced like a creative agency. Third, the market is broad enough that one product can target individual agents, photographers, and media businesses at once. That validates demand, but also raises the bar for differentiation.

ReelForge therefore needs to answer a harder question than “can AI generate real-estate videos?” The answer to that is already yes. The sharper question is: **why would a Dutch brokerage choose ReelForge over a generic or US-centric category tool?**

The strongest possible answers are likely the following:

| Potential ReelForge differentiator | Why it matters |
|---|---|
| Dutch-language narration quality | Weakness in many global tools becomes local advantage |
| Brokerage CI extraction from website | Reduces onboarding friction and increases brand fit |
| Social-native scripting for makelaars | Better than generic slideshow automation |
| Multi-variant testing workflow | Aligns with Instagram Trial Reels and TikTok testing behavior |
| Dutch market templates | Neighborhood explainers, local market updates, listing-win content |
| Broker/operator workflow | Supports weekly consistency, not just per-listing exports |

In other words, ReelForge should not aim to be “AutoReel for the Netherlands” in a narrow sense. It should aim to be the **best Dutch broker branding engine for short-form social video**.

## Regulatory and Compliance Implications

The Dutch government’s business guidance on the EU AI Act is highly relevant here. It explains that providers and deployers of AI systems must comply with transparency obligations, and specifically states that when AI is used to create or edit content such as text or images, it must be **clearly indicated that the content was created using AI**.[15] It also notes that high-risk AI obligations from August 2026 apply to categories such as biometrics, education, employment, essential services, law enforcement, migration, and judicial processes.[15]

Based on that guidance, a ReelForge-style product does **not** appear to fall into the AI Act’s high-risk system category. The nearer-term obligations are different: transparency, labeling, and responsible deployment.

The most relevant compliance issues are therefore operational rather than existential.

| Compliance issue | Risk | Mitigation |
|---|---|---|
| AI-generated content disclosure | Deceptive or non-compliant publishing | Add clear optional labeling and audit logs |
| Voice cloning or likeness misuse | Rights, consent, brand, and trust problems | Require explicit consent and maintain consent records |
| Property misrepresentation | Marketing liability if visuals overstate reality | Keep staging/editing disclosures and review flows |
| Platform misuse or spam behavior | Account performance or moderation problems | Encourage controlled cadence and platform-native best practices |
| Client misunderstanding of AI outputs | Incorrect claims or errors in public content | Human review before publish by default |

This is especially important because the real-estate context carries trust sensitivity. A broker is not just publishing entertainment; they are representing properties, neighborhoods, and professional credibility. ReelForge therefore benefits from product choices that make it obviously professional and reviewable: editable scripts, clear asset provenance, disclosure controls, and strong approval workflows.

## Platform Risk and Concentration Risk

A separate but important risk comes from platform dependence. The European Commission stated in February 2026 that it had preliminarily found TikTok’s addictive design in breach of the Digital Services Act, with potential consequences including corrective measures and major fines.[16] Even without predicting dramatic disruption, this is a reminder that TikTok’s European operating environment is politically and regulatorily unstable compared with a neutral assumption of continuity.

That does not make TikTok unusable. It means ReelForge should design for **cross-platform resilience**. The strategic value proposition should be: “create better broker-branded short-form content that works across Reels, TikTok, and Shorts,” not “beat the TikTok algorithm.” The former is durable; the latter can become obsolete quickly.

## Strategic Assessment

After reviewing the evidence, the ReelForge concept appears **strategically plausible and commercially interesting**, but only if framed correctly.

The strongest validated beliefs are these:

1. **Dutch brokers compete heavily on brand and listing acquisition**, not just transaction execution, because the market remains structurally tight.[1][2]
2. **Instagram and TikTok are relevant channels for broker attention**, while YouTube Shorts deserves secondary but real consideration.[7][8][9]
3. **Early attention capture matters**, but strong hook strategy should not be reduced to an oversimplified “2-second rule.”[3][4][5][19]
4. **AI-assisted real estate video has demonstrated buyer demand**, as shown by specialized category players such as AutoReel.[10]
5. **A technical stack for ReelForge is feasible today**, though long-term defensibility depends on owning more of the differentiated logic.[11][12][13][14]
6. **Compliance is manageable but non-trivial**, centering on transparency, disclosure, consent, and review rather than high-risk AI classification.[15]

The weakest or least defensible beliefs are these:

1. That a single hook-length formula governs all successful short-form content.
2. That Dutch brokers will adopt because “video is hot” without workflow alignment and repeat-use value.
3. That generic AI media capabilities alone are sufficient differentiation.
4. That a product built entirely around one platform’s current recommendation dynamics will remain robust.

## Recommendations

The evidence suggests a specific direction for product and go-to-market.

First, ReelForge should position itself as a **brokerage brand content system**, not merely as a listing-video generator. Listing videos are useful, but they are already a contested category. The more defensible opportunity is turning broker identity, listing inputs, and market knowledge into a repeatable stream of platform-native social content.

Second, the MVP should emphasize a **small number of high-value outputs** rather than broad creative freedom. A strong starting set might include branded listing teasers, neighborhood spotlights, market-update explainers, and seller-focused authority reels. Those formats align with the Dutch market’s seller-side competition logic.

Third, ReelForge should adopt a **variant mindset**. Instagram Trial Reels and TikTok testing logic both support experimentation.[3][4] The product should make it easy to generate multiple hooks, captions, or voiceovers from the same base input, rather than produce a single fixed asset.

Fourth, the product should implement **human review by default** and make disclosures, approvals, and source traceability easy. This is not just legal hygiene; it is also a trust feature in a professional vertical.

Fifth, the technical roadmap should likely separate **commodity infrastructure** from **differentiated infrastructure**. Voice generation, CDN delivery, and some rendering tasks can be purchased. Brand interpretation, script logic, Dutch-market template logic, and experimentation workflow are more likely to be worth owning.

Finally, pricing should be benchmarked against both **software spend** and **property-media operational budgets**, not against bespoke agency packages alone. AutoReel’s price ladder and Dutch media pricing both indicate that the market expects repeatability and efficiency, not premium-strategy consultancy packaging.[10][18]

## Final Conclusion

The ReelForge thesis survives research, but in a more refined form than the original strongest claims might suggest. There is a **real market opportunity** at the intersection of Dutch broker branding, short-form social distribution, and AI-assisted media automation. The Dutch housing market structure, broker competitive environment, and current social-platform dynamics all support the idea that **consistent, branded short-form video could become a meaningful commercial lever for brokers**.[1][2][7]

However, the success of ReelForge will likely depend less on raw generation capability and more on **workflow design, local specialization, and disciplined positioning**. A generic photo-to-video tool is not enough. A Dutch broker-brand operating system that turns existing assets into consistent, testable, market-aware social content is much closer to a strong opportunity.

If built with that framing, ReelForge has a plausible path to differentiate in a category that is already validated but not yet locally won.

## References

[1] [NVM housing market information](https://www.nvm.nl/wonen/marktinformatie/)
[2] [NVM member and market sizing news item](https://www.nvm.nl/nieuws/2025/nvm-beedigde-185-registermakelaars-en-taxateurs-in-het-jaar-2025/)
[3] [Instagram Trial Reels guidance](https://creators.instagram.com/blog/instagram-trial-reels)
[4] [TikTok creative best practices for performance ads](https://ads.tiktok.com/help/article/creative-best-practices)
[5] [Instagram creator guidance on Reels in 2025](https://creators.instagram.com/blog/the-latest-with-instagram?locale=en_GB)
[6] [Vastgoed Nederland merger and membership](https://vastgoednederland.nl/fusie-officieel-vbo-en-vastgoedpro-verder-als-vastgoed-nederland/)
[7] [Funda social media trends for makelaars](https://www.funda.nl/voormakelaars/artikel-makelaar/de-belangrijkste-socialmediatrends-voor-makelaars/)
[8] [MondoMarketing summary of Newcom 2025](https://www.mondomarketing.nl/het-nationale-social-media-onderzoek-2025/)
[9] [YouTube Shorts official getting started guide](https://blog.youtube/creator-and-artist-stories/your-guide-to-getting-started-with-youtube-shorts/)
[10] [AutoReel overview](https://www.autoreelapp.com/) and [pricing](https://www.autoreelapp.com/pricing)
[11] [Shotstack pricing](https://shotstack.io/pricing/)
[12] [Creatomate pricing](https://creatomate.com/pricing)
[13] [Cloudinary pricing](https://cloudinary.com/pricing)
[14] [Remotion official site](https://www.remotion.dev/)
[15] [Dutch government AI Act guidance](https://business.gov.nl/regulations/ai-act/)
[16] [European Commission Digital Services Act update mentioning TikTok](https://commission.europa.eu/news-and-media/news/two-years-digital-services-act-ensuring-safer-online-spaces-2026-02-17_en)
[17] [Van der Sande Makelaars Instagram ranking post](https://www.instagram.com/p/DRRhFIPj8NN/)
[18] [Woning Media Nederland 2024/2025 price list PDF](https://www.woningmedia.nl/userdata/file/Woning%20Media%20-%20Prijslijst%202024%202025%20-%20DEF.pdf)
[19] [Socialinsider 2025 social media video statistics](https://www.socialinsider.io/social-media-benchmarks/social-media-video-statistics)
[20] [ElevenLabs text-to-speech capabilities](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
[21] [Firecrawl Branding Format v2](https://www.firecrawl.dev/blog/branding-format-v2)
