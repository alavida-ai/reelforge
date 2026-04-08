import type { DemoData } from "./types";

export const DEMO_DATA: DemoData = {
  // ---------------------------------------------------------------------------
  // Organization
  // ---------------------------------------------------------------------------
  org: {
    name: "Bright River",
    product: "ReelForge",
    headerKpis: {
      hooksThisWeek: 47,
      avgTurnaround: "34s",
      returnRate: "0.8%",
      avgCost: "\u20AC2.30",
    },
  },

  // ---------------------------------------------------------------------------
  // Hook Types
  // ---------------------------------------------------------------------------
  hookTypes: [
    {
      id: "door-reveal",
      name: "Door Reveal",
      icon: "\uD83D\uDEAA",
      description:
        "AI influencer at branded door \u2192 opens \u2192 property interior revealed",
    },
    {
      id: "price-tag",
      name: "Price Tag Reveal",
      icon: "\uD83D\uDCB0",
      description:
        '"Guess the price" \u2014 sign in garden \u2192 listing price revealed',
    },
    {
      id: "before-after",
      name: "Before/After",
      icon: "\uD83D\uDD04",
      description:
        "Split-screen transformation \u2014 staging vs reality comparison",
    },
    {
      id: "cinematic",
      name: "Cinematic / Drone",
      icon: "\uD83C\uDFAC",
      description:
        "Slow-motion aerial or gimbal sweep of the property exterior",
    },
  ],

  // ---------------------------------------------------------------------------
  // Market Data
  // ---------------------------------------------------------------------------
  marketData: {
    totalPosts: "2,400+",
    geography: "Dutch real estate",
    period: "Q1 2026",
    referencePosts: [
      {
        description: "Door reveal \u00B7 suburban \u00B7 @homestyle_nl",
        views: "24.1K",
      },
      {
        description: "Door reveal \u00B7 family \u00B7 @makelaarsdam",
        views: "18.7K",
      },
      {
        description:
          "Cinematic \u00B7 canal house \u00B7 @amsterdam_living",
        views: "31.2K",
      },
      {
        description:
          "Price tag \u00B7 suburban \u00B7 @huizenveiling_nl",
        views: "15.3K",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Brokers
  // ---------------------------------------------------------------------------
  brokers: [
    // =========================================================================
    // BROKER 1: HOMEY
    // =========================================================================
    {
      slug: "homey",
      name: "Homey",
      tagline: "Modern \u00B7 Mid-market",
      colors: {
        primary: "#4CAF50",
        secondary: "#2E7D32",
        accent: "#1B1B1B",
        background: "#FFFFFF",
      },
      logoLetter: "H",
      fonts: "Montserrat \u00B7 Inter",
      websiteUrl: "homey.nl",

      // -- Brand Intelligence -------------------------------------------------
      brandIntelligence: {
        whoTheyAre:
          'Homey is a modern, approachable real estate platform targeting first-time buyers and young families in mid-market Dutch suburban areas. They compete on transparency and ease of use \u2014 not prestige. Brand language emphasizes "making it easy" and "feeling at home."',
        targetAudience: {
          demographic: "25\u201338, couples, first home",
          priceSegment: "\u20AC250K\u2013\u20AC500K listings",
          geographicFocus: "Suburban Netherlands",
          socialPresence: "Instagram (active) \u00B7 TikTok (new)",
        },
        communicationStyle: {
          tags: [
            "Warm",
            "Conversational",
            "Emoji-friendly",
            "Casual Dutch",
            "Question-led hooks",
          ],
          voiceDescription:
            '"Your friend who happens to know real estate." Not authoritative. Not salesy.',
        },
        hookApproachRules: [
          {
            hookType: "AI Influencer",
            status: "approved",
            reasoning:
              'Approachable persona, casual outfit, matches "friend" tone',
          },
          {
            hookType: "Door Reveal",
            status: "approved",
            reasoning:
              "Builds curiosity, works for suburban properties with clear front doors",
          },
          {
            hookType: "Price Tag Reveal",
            status: "approved",
            reasoning:
              '"Guess the price" fits their transparency positioning',
          },
          {
            hookType: "Cinematic / Drone",
            status: "blocked",
            reasoning:
              "Too premium for brand, creates expectation mismatch",
          },
          {
            hookType: "Luxury Reveal",
            status: "blocked",
            reasoning: "Contradicts mid-market identity",
          },
          {
            hookType: "Before/After",
            status: "conditional",
            reasoning: "Works for renovated properties only, conditional",
          },
        ],
        guardrails: [
          {
            severity: "hard",
            rule: "Never position as luxury or exclusive \u2014 undermines accessibility promise",
          },
          {
            severity: "hard",
            rule: "No high-fashion styling on influencer \u2014 keep casual, relatable",
          },
          {
            severity: "warning",
            rule: "Dutch language only for voiceover \u2014 English captions OK for reach",
          },
        ],
      },

      // -- Rejection Log ------------------------------------------------------
      rejectionLog: {
        totalHooks: 32,
        totalReturned: 2,
        returnRate: "0.6%",
        entries: [
          {
            hookNumber: 8,
            date: "2026-03-18",
            reason:
              'Influencer styling too formal \u2014 broker said "this doesn\'t look like us"',
            systemAnalysis:
              'Influencer was dressed in semi-formal blazer. Homey\'s tone is "friend who knows real estate" \u2014 formal styling contradicts approachable positioning. The broker\'s audience (25-38, first-time buyers) expects casual, relatable content.',
            guardrailAdded:
              "\u26D4 No formal/business attire on influencer",
          },
          {
            hookNumber: 3,
            date: "2026-03-04",
            reason:
              "Background hallucination \u2014 AI fabricated a garden fence that doesn't exist on the property",
            systemAnalysis:
              "Wide-angle shot gave the model too much background context to fill. AI hallucinated property details (fence, garden path) that don't match the actual listing. This is a known risk when the camera is positioned far from the subject \u2014 the model invents surrounding elements.",
            guardrailAdded:
              "\u26D4 Close framing only \u2014 minimal visible background",
          },
        ],
        consecutiveAccepted: 24,
        consecutiveAcceptedSince: "2026-03-18",
        returnRateTrend: { month1: "0.9%", month3: "0.6%" },
      },

      // -- Production SLA -----------------------------------------------------
      productionSla: {
        returnRate: "0.6%",
        returnRateTrend: "\u2193 0.3pp",
        turnaround: "34s",
        costPerHook: "\u20AC2.10",
        hooksDelivered: 32,
      },

      // -- Content Performance ------------------------------------------------
      contentPerformance: {
        avgViews: "8.4K",
        avgViewsTrend: "\u2191 23%",
        topHook: "Door Reveal",
        vsStandard: "3.2x",
      },

      // -- Data Depth ---------------------------------------------------------
      dataDepth: {
        market: { count: "2,400+", percent: 85 },
        crossIndustry: { count: "840", percent: 65 },
        brokerSpecific: { count: "32", percent: 25 },
      },

      // -- Demo Property ------------------------------------------------------
      demoProperty: {
        type: "Suburban Family Home",
        subtype: "Modern Renovation \u00B7 Mid-to-High Range",
        address: "Kerkstraat 42, Haarlem",
        assets: [
          { label: "exterior", role: "establishing shot" },
          { label: "living", role: "lifestyle context" },
          { label: "kitchen", role: "hero reveal" },
          { label: "hallway", role: "transition" },
          { label: "bath", role: "detail shot" },
          { label: "garden", role: "emotional payoff" },
        ],
        features: [
          {
            name: "Open-Plan Kitchen",
            confidence: 0.97,
            insights: [
              {
                source: "MARKET",
                text: "#1 engagement driver for suburban homes",
              },
              {
                source: "BROKER",
                text: "Homey kitchen-led hooks: 40% lower return rate",
              },
            ],
          },
          {
            name: "South-Facing Garden",
            confidence: 0.92,
            insights: [
              {
                source: "MARKET",
                text: "Garden reveals = emotional payoff in 78% of top posts",
              },
            ],
          },
          {
            name: "Clear Front Door",
            confidence: 0.95,
            insights: [
              {
                source: "GUARDRAIL",
                text: "Enables Door Reveal \u2014 close framing, low hallucination",
              },
              {
                source: "BROKER",
                text: "24 consecutive accepts on door-based hooks",
              },
            ],
          },
          {
            name: "Modern Renovation",
            confidence: 0.91,
            insights: [
              {
                source: "MARKET",
                text: "Renovated interiors outperform original by 1.8x in reveal hooks",
              },
            ],
          },
        ],
      },

      // -- Hook Selection Results ---------------------------------------------
      hookSelectionResults: [
        {
          hookTypeId: "door-reveal",
          status: "recommended",
          complexity: "Low",
          hallucinationRisk: {
            level: "Low",
            explanation:
              "Single subject (influencer) against a real door. Close framing means minimal background for AI to fabricate. No neighborhood, no street, no invented architectural elements.",
          },
          insights: [
            {
              source: "MARKET",
              text: "3.2x vs standard intro for Dutch suburban listings \u00B7 top performing hook format in this segment",
            },
            {
              source: "BROKER",
              text: "24/24 accepted for Homey \u00B7 zero returns \u00B7 confirmed top performer for this brand",
            },
            {
              source: "GUARDRAIL",
              text: "Close framing enforced \u00B7 casual influencer styling only \u00B7 no formal attire",
            },
          ],
          assetsMatched: {
            matched: 3,
            total: 3,
            details: [
              "Exterior (anchor)",
              "Kitchen (hero reveal)",
              "Garden (payoff)",
            ],
          },
        },
        {
          hookTypeId: "price-tag",
          status: "available",
          complexity: "Low",
          hallucinationRisk: {
            level: "Low",
            explanation:
              "Static price tag overlay on real garden photo. Text animation only \u2014 no generative video needed for the core hook. Interior sequence after reveal has standard risk.",
          },
          insights: [
            {
              source: "MARKET",
              text: '2.4x vs standard \u00B7 "guess the price" trending in NL RE TikTok \u00B7 gamification drives comments',
            },
            {
              source: "BROKER",
              text: 'Fits Homey\'s transparency positioning \u2014 "making it easy" \u00B7 not tested yet for this broker (no history)',
            },
          ],
          assetsMatched: {
            matched: 2,
            total: 3,
            details: [
              "Exterior (sign placement)",
              "Garden (background)",
            ],
            missingNote:
              "Interior sequence \u2014 no matched reveal asset",
          },
        },
        {
          hookTypeId: "before-after",
          status: "weak",
          complexity: "Medium",
          hallucinationRisk: {
            level: "Medium",
            explanation:
              'Split-screen requires AI to generate a plausible "before" state from the current property photos. AI must fabricate older fixtures, different paint, worn elements. Risk of unrealistic or inconsistent details across the split.',
          },
          insights: [
            {
              source: "MARKET",
              text: "2.1x vs standard \u00B7 works best for clearly renovated properties with dramatic contrast. This property is already modern \u2014 low contrast available.",
            },
            {
              source: "BROKER",
              text: "Never tested for Homey \u00B7 no acceptance/rejection data for this hook type",
            },
          ],
          assetsMatched: {
            matched: 0,
            total: 2,
            details: [],
            missingNote:
              "Needs pre-renovation photos \u2014 not available. Property is already modern, no contrast source.",
          },
        },
        {
          hookTypeId: "cinematic",
          status: "blocked",
          complexity: "High",
          hallucinationRisk: {
            level: "High",
            explanation:
              "Wide aerial/gimbal shots require AI to render the full property exterior, surrounding houses, street, landscaping. Every element beyond the actual property is fabricated. This is exactly the failure mode that caused Hook #3's rejection \u2014 AI invented a garden fence.",
          },
          insights: [
            {
              source: "MARKET",
              text: "1.8x vs standard \u00B7 performs well for luxury properties with real drone footage \u2014 but AI-generated cinematic has high rejection rates across the market",
            },
            {
              source: "GUARDRAIL",
              text: "Brand DNA: too premium for Homey's mid-market positioning \u00B7 close framing enforced after Hook #3 rejection \u00B7 wide shots violate both guardrails",
            },
          ],
          assetsMatched: {
            matched: 0,
            total: 0,
            details: [],
          },
          blockedReason:
            "This hook type is blocked for Homey \u2014 brand guardrail + hallucination risk. Would require real drone footage to be viable.",
        },
      ],

      // -- Reveal Data --------------------------------------------------------
      revealData: {
        productionQuality: {
          returnRate: "0.8%",
          returnRateTrend: "\u2193",
          turnaround: "34s",
          cost: "\u20AC2.10",
          guardrailViolations: 0,
        },
        expectedPerformance: {
          views: "3.2x",
          retention: "67%",
          brandRecall: "+41%",
          dataPoints: "2,400+",
        },
        creativeRationale:
          "Door Reveal for suburban family home with Homey's approachable, mid-market positioning. AI influencer dressed casually in Homey green. Kitchen as hero shot (#1 engagement driver). Garden as emotional payoff.",
        creativeTags: ["Brand-matched", "Property-optimized", "Data-backed"],
        adjustments: [
          {
            name: "More brand presence",
            risk: "Low",
            whatChanges:
              "Larger logo overlay, brand color tint on frames, brand name text in first 2 seconds",
            hallucinationRisk:
              "None \u2014 overlay only, no generative changes to the video content",
            insights: [
              {
                source: "MARKET",
                text: "Branded intros see higher recall but Dutch RE audience scrolls past heavy branding \u2014 top posts lead with property, not logo",
              },
              {
                source: "BROKER",
                text: 'Homey brand is subtle by design \u2014 "making it easy" tone doesn\'t lead with logo. Light touch recommended.',
              },
            ],
            tradeoffs: {
              positive: "Broker recognition on repeat views",
              negative: "May reduce scroll-stop rate if logo leads",
            },
          },
          {
            name: "Add voiceover narration",
            risk: "Medium",
            whatChanges:
              "Dutch AI voiceover (ElevenLabs) narrating property highlights over the visual hook. Adds ~\u20AC0.40 per hook.",
            hallucinationRisk:
              "Voice content could describe features that don't match the property if prompt isn't constrained to detected features only. Must be grounded in property analysis.",
            insights: [
              {
                source: "MARKET",
                text: "TikTok's algorithm surfaces voice-on content more than silent \u2014 but native captions currently outperforming voiceover in Dutch RE",
              },
              {
                source: "BROKER",
                text: "Homey hasn't used voiceover before \u2014 no broker-specific data. First use would be experimental.",
              },
              {
                source: "GUARDRAIL",
                text: 'Dutch only \u2014 English voiceover blocked for this broker. Voice must match "casual friend" tone.',
              },
            ],
            tradeoffs: {
              positive: "Algorithm boost + accessibility",
              negative:
                "+\u20AC0.40 cost \u00B7 voice mismatch risk \u00B7 no broker data yet",
            },
          },
          {
            name: "Wider framing \u2014 show more property",
            risk: "High",
            whatChanges:
              "Camera pulls back to show more of the property exterior \u2014 garden, street context, neighborhood feel.",
            hallucinationRisk:
              "High. AI will fabricate surrounding elements \u2014 neighboring houses, garden features, street details. This is exactly what caused Hook #3's rejection for Homey.",
            insights: [
              {
                source: "MARKET",
                text: "Wide establishing shots perform well for luxury properties \u2014 but require real footage, not AI-generated backgrounds",
              },
              {
                source: "GUARDRAIL",
                text: "Close framing enforced for Homey after Hook #3 rejection. Wider framing would violate this guardrail.",
              },
            ],
            tradeoffs: {
              positive: "More property context visible",
              negative:
                "Violates guardrail \u00B7 high hallucination \u00B7 likely rejection",
            },
          },
          {
            name: "Switch to Price Tag Reveal",
            risk: "Low",
            whatChanges:
              'Completely different hook \u2014 "guess the price" format with price tag sign in the garden, then reveals listing price. Different video, different assets used.',
            hallucinationRisk:
              "Low \u2014 static sign in a real garden photo. Minimal AI generation needed.",
            insights: [
              {
                source: "MARKET",
                text: '2.4x vs standard \u2014 strong but below Door Reveal (3.2x). "Guess the price" is trending in Dutch RE but lower retention than curiosity-gap formats.',
              },
              {
                source: "BROKER",
                text: 'Fits Homey\'s transparency positioning \u2014 "guess the price" aligns with "making it easy." Not tested yet for this broker.',
              },
            ],
            tradeoffs: {
              positive:
                "Brand-aligned \u00B7 low risk \u00B7 trending format",
              negative:
                "Lower market performance than Door Reveal \u00B7 no broker track record",
            },
          },
        ],
        brandedOverlay: {
          logoPosition: "bottom-left",
          accentStyle: "color-strip",
          endCard: {
            ctaText: "Visit homey.nl",
            ctaUrl: "https://homey.nl",
          },
        },
        deliveryPackage: {
          hookSummary: {
            hookType: "Door Reveal",
            property: "Suburban Family Home",
            platform: "TikTok \u00B7 Reels",
          },
          whyThisHook:
            'Door Reveal was selected for this suburban family home based on Homey\'s brand positioning (approachable, mid-market) and market performance data. This hook type averages 3.2x more views than standard property intros for Dutch suburban listings. The AI influencer is styled to match Homey\'s "your friend who knows real estate" tone \u2014 casual, relatable, dressed in brand-matching green.',
          brandMatchChecklist: [
            "Logo integrated into influencer styling (green accent clothing)",
            "Brand colors applied to door frame overlay and text elements",
            'Tone matches "approachable, casual" \u2014 influencer styled as relatable, not glamorous',
            "No luxury positioning \u2014 consistent with mid-market brand identity",
          ],
          propertyFeaturesHighlighted: [
            "Open-Plan Kitchen (hero shot)",
            "South-Facing Garden (reveal moment)",
            "Modern Renovation (positioning)",
          ],
          endCard: {
            ctaText: "Visit homey.nl",
            brokerUrl: "https://homey.nl",
          },
          optimizationNote:
            "This is hook #33 for Homey. Door Reveal has been confirmed as the top-performing hook type for this broker after 14 A/B comparisons. Average views have increased from 4,200 (month 1) to 8,400 (month 3) as the system optimized for Homey's audience. Performance is expected to continue improving with each published hook.",
        },
      },
    },

    // =========================================================================
    // BROKER 2: VAN DER BERG MAKELAARS
    // =========================================================================
    {
      slug: "van-der-berg",
      name: "Van der Berg Makelaars",
      tagline: "Traditional \u00B7 Premium",
      colors: {
        primary: "#C62828",
        secondary: "#8E0000",
        accent: "#212121",
        background: "#F5F5F5",
      },
      logoLetter: "V",
      fonts: "Playfair Display \u00B7 Lato",
      websiteUrl: "vanderbergmakelaars.nl",

      // -- Brand Intelligence -------------------------------------------------
      brandIntelligence: {
        whoTheyAre:
          "Van der Berg Makelaars is a traditional, premium brokerage serving high-net-worth clients in Amsterdam and the Randstad. They compete on heritage, discretion, and market access \u2014 not ease of use. Brand language emphasizes \u201Cexclusive access\u201D and \u201Ctrusted advisors since 1987.\u201D",
        targetAudience: {
          demographic: "40+, high-net-worth, upgraders & investors",
          priceSegment: "\u20AC750K+ listings",
          geographicFocus: "Urban Amsterdam \u00B7 Randstad heritage districts",
          socialPresence: "Instagram (curated) \u00B7 LinkedIn (active)",
        },
        communicationStyle: {
          tags: [
            "Authoritative",
            "Understated",
            "Professional Dutch",
            "No emoji",
            "Statement-led hooks",
          ],
          voiceDescription:
            '"The expert you trust with your most important decision." Confident, measured, never casual.',
        },
        hookApproachRules: [
          {
            hookType: "Cinematic / Drone",
            status: "approved",
            reasoning:
              "Premium positioning demands cinematic quality \u2014 sweeping shots match heritage property expectations",
          },
          {
            hookType: "Luxury Reveal",
            status: "approved",
            reasoning:
              "Aligns with high-end brand DNA \u2014 slow, dramatic reveal of architectural details",
          },
          {
            hookType: "AI Influencer",
            status: "conditional",
            reasoning:
              "Only if styled as professional presenter, never casual \u2014 must match authoritative tone",
          },
          {
            hookType: "Price Tag Reveal",
            status: "blocked",
            reasoning:
              'Undermines prestige \u2014 "guess the price" is gamification that contradicts exclusivity positioning',
          },
          {
            hookType: "Door Reveal",
            status: "conditional",
            reasoning:
              "Works for grand entrances only \u2014 canal house front doors are often narrow and do not support the format",
          },
          {
            hookType: "Before/After",
            status: "conditional",
            reasoning:
              "Only for heritage restoration projects with documented transformation",
          },
        ],
        guardrails: [
          {
            severity: "hard",
            rule: "Never use gamification or informal language \u2014 undermines professional authority",
          },
          {
            severity: "hard",
            rule: "No casual influencer styling \u2014 presenter must reflect premium positioning",
          },
          {
            severity: "warning",
            rule: "Avoid fast cuts and trending audio \u2014 pacing should be slow, deliberate, architectural",
          },
        ],
      },

      // -- Rejection Log ------------------------------------------------------
      rejectionLog: {
        totalHooks: 15,
        totalReturned: 2,
        returnRate: "1.2%",
        entries: [
          {
            hookNumber: 5,
            date: "2026-03-22",
            reason:
              "Music track too upbeat \u2014 broker said \"feels like an ad for a holiday resort, not a \u20AC1.2M canal house\"",
            systemAnalysis:
              "Background music was a trending TikTok audio track. Van der Berg's audience (40+, HNW) expects understated, architectural pacing. Upbeat music contradicts the deliberate, prestigious tone their clients associate with the brand.",
            guardrailAdded:
              "\u26D4 No trending/upbeat audio \u2014 classical or ambient only",
          },
          {
            hookNumber: 2,
            date: "2026-03-08",
            reason:
              "AI influencer looked too young and casual \u2014 broker said \"our clients wouldn't relate to this person\"",
            systemAnalysis:
              "Influencer was styled for a younger demographic (25\u201335 casual). Van der Berg's clients are 40+ professionals and investors. The presenter must project authority and expertise, not relatability. Age and styling mismatch erodes trust with the target audience.",
            guardrailAdded:
              "\u26D4 Presenter must appear 35+ with professional styling",
          },
        ],
        consecutiveAccepted: 10,
        consecutiveAcceptedSince: "2026-03-22",
        returnRateTrend: { month1: "1.7%", month3: "1.2%" },
      },

      // -- Production SLA -----------------------------------------------------
      productionSla: {
        returnRate: "1.2%",
        returnRateTrend: "\u2193 0.5pp",
        turnaround: "38s",
        costPerHook: "\u20AC2.80",
        hooksDelivered: 15,
      },

      // -- Content Performance ------------------------------------------------
      contentPerformance: {
        avgViews: "12.1K",
        avgViewsTrend: "\u2191 18%",
        topHook: "Cinematic / Drone",
        vsStandard: "2.8x",
      },

      // -- Data Depth ---------------------------------------------------------
      dataDepth: {
        market: { count: "2,400+", percent: 85 },
        crossIndustry: { count: "620", percent: 55 },
        brokerSpecific: { count: "15", percent: 12 },
      },

      // -- Demo Property ------------------------------------------------------
      demoProperty: {
        type: "Canal House",
        subtype: "Heritage Monument \u00B7 Premium Segment",
        address: "Herengracht 287, Amsterdam",
        assets: [
          { label: "exterior", role: "establishing shot" },
          { label: "canal-view", role: "heritage context" },
          { label: "living", role: "lifestyle reveal" },
          { label: "staircase", role: "architectural detail" },
          { label: "master-suite", role: "hero shot" },
          { label: "garden-courtyard", role: "emotional payoff" },
        ],
        features: [
          {
            name: "Original 17th-Century Facade",
            confidence: 0.98,
            insights: [
              {
                source: "MARKET",
                text: "Heritage facades are the #1 scroll-stop element in premium Dutch RE content",
              },
              {
                source: "BROKER",
                text: "Van der Berg's audience expects architectural detail \u2014 facade establishes prestige immediately",
              },
            ],
          },
          {
            name: "Double-Height Ceilings",
            confidence: 0.94,
            insights: [
              {
                source: "MARKET",
                text: "Volume and light are top engagement drivers for \u20AC750K+ listings",
              },
            ],
          },
          {
            name: "Canal Frontage",
            confidence: 0.96,
            insights: [
              {
                source: "MARKET",
                text: "Canal-facing properties generate 2.4x more saves than non-canal Amsterdam listings",
              },
              {
                source: "BROKER",
                text: "Canal views are Van der Berg's signature listing type \u2014 10 of 15 hooks feature canal properties",
              },
            ],
          },
          {
            name: "Private Garden Courtyard",
            confidence: 0.89,
            insights: [
              {
                source: "MARKET",
                text: "Hidden gardens in canal houses create surprise moments that drive 1.9x higher completion rates",
              },
            ],
          },
        ],
      },

      // -- Hook Selection Results ---------------------------------------------
      hookSelectionResults: [
        {
          hookTypeId: "cinematic",
          status: "recommended",
          complexity: "High",
          hallucinationRisk: {
            level: "Medium",
            explanation:
              "Gimbal sweep of a real facade and canal reduces fabrication needs compared to aerial. AI extends transitions between rooms but the core establishing shot uses the actual exterior. Heritage details (windows, brickwork) are high-frequency patterns AI handles well.",
          },
          insights: [
            {
              source: "MARKET",
              text: "2.8x vs standard for premium Amsterdam listings \u00B7 cinematic pacing matches luxury segment expectations",
            },
            {
              source: "BROKER",
              text: "10/10 accepted for Van der Berg since guardrail update \u00B7 confirmed top performer for heritage properties",
            },
            {
              source: "GUARDRAIL",
              text: "Slow, deliberate pacing enforced \u00B7 no fast cuts \u00B7 ambient audio only \u00B7 presenter styled 35+ professional",
            },
          ],
          assetsMatched: {
            matched: 4,
            total: 4,
            details: [
              "Exterior (facade establishing)",
              "Canal-view (heritage context)",
              "Living (interior reveal)",
              "Garden-courtyard (payoff)",
            ],
          },
        },
        {
          hookTypeId: "door-reveal",
          status: "available",
          complexity: "Low",
          hallucinationRisk: {
            level: "Low",
            explanation:
              "Single presenter at door, minimal background needed. However, canal house front doors are narrow and close to the street \u2014 framing is constrained and may not deliver the dramatic entrance the format requires.",
          },
          insights: [
            {
              source: "MARKET",
              text: "3.2x for suburban homes but only 1.6x for urban canal houses \u2014 format works best with standalone front doors",
            },
            {
              source: "BROKER",
              text: "Not tested for Van der Berg \u00B7 canal house doors may not support the format well",
            },
          ],
          assetsMatched: {
            matched: 2,
            total: 3,
            details: [
              "Exterior (anchor \u2014 narrow framing)",
              "Living (hero reveal)",
            ],
            missingNote:
              "No clear front-door-focused asset \u2014 canal house entrance is narrow",
          },
        },
        {
          hookTypeId: "before-after",
          status: "weak",
          complexity: "Medium",
          hallucinationRisk: {
            level: "Medium",
            explanation:
              'Heritage monument status limits renovation scope. AI would need to fabricate a plausible "before" state for a property that may not have undergone recent transformation. Risk of anachronistic or inconsistent details.',
          },
          insights: [
            {
              source: "MARKET",
              text: "2.1x for renovation properties \u2014 but heritage monuments typically have subtle updates, not dramatic transformations",
            },
            {
              source: "BROKER",
              text: "No before/after history for Van der Berg \u00B7 their properties emphasize preservation, not transformation",
            },
          ],
          assetsMatched: {
            matched: 0,
            total: 2,
            details: [],
            missingNote:
              "No pre-renovation photos available. Heritage monument \u2014 preservation focus, not transformation.",
          },
        },
        {
          hookTypeId: "price-tag",
          status: "blocked",
          complexity: "Low",
          hallucinationRisk: {
            level: "Low",
            explanation:
              "Low technical risk \u2014 static overlay on garden photo. But the format itself contradicts the brand positioning entirely.",
          },
          insights: [
            {
              source: "MARKET",
              text: '2.4x for mid-market but underperforms for premium segment \u2014 "guess the price" gamification reduces perceived exclusivity',
            },
            {
              source: "GUARDRAIL",
              text: "Brand DNA: gamification is explicitly forbidden for Van der Berg \u00B7 undermines professional authority and prestige positioning",
            },
          ],
          assetsMatched: {
            matched: 0,
            total: 0,
            details: [],
          },
          blockedReason:
            "This hook type is blocked for Van der Berg \u2014 gamification contradicts premium brand positioning. Price transparency is handled differently in the luxury segment.",
        },
      ],

      // -- Reveal Data --------------------------------------------------------
      revealData: {
        productionQuality: {
          returnRate: "1.2%",
          returnRateTrend: "\u2193",
          turnaround: "38s",
          cost: "\u20AC2.80",
          guardrailViolations: 0,
        },
        expectedPerformance: {
          views: "2.8x",
          retention: "72%",
          brandRecall: "+38%",
          dataPoints: "2,400+",
        },
        creativeRationale:
          "Cinematic sweep for heritage canal house with Van der Berg's premium, authoritative positioning. Professional presenter in understated formal styling. Facade as establishing shot (heritage prestige). Canal frontage for context. Courtyard garden as surprise payoff.",
        creativeTags: ["Brand-matched", "Property-optimized", "Data-backed"],
        adjustments: [
          {
            name: "Add architectural narration",
            risk: "Low",
            whatChanges:
              "Professional Dutch voiceover describing heritage details and architectural provenance. Adds ~\u20AC0.50 per hook.",
            hallucinationRisk:
              "Low \u2014 narration is scripted from property analysis and listing data. Voice is professional, measured tone matching brand.",
            insights: [
              {
                source: "MARKET",
                text: "Professional narration improves completion rate by 28% on premium property content \u2014 audience expects expert commentary",
              },
              {
                source: "BROKER",
                text: "Van der Berg's authoritative tone is well-suited to narration \u2014 matches their \u201Ctrusted advisor\u201D positioning",
              },
            ],
            tradeoffs: {
              positive: "Higher completion rate + brand authority",
              negative: "+\u20AC0.50 cost \u00B7 requires verified property details",
            },
          },
          {
            name: "Extended interior sequence",
            risk: "Medium",
            whatChanges:
              "Longer interior walkthrough showcasing room-by-room details. Extends video from 3s to 8s.",
            hallucinationRisk:
              "Medium \u2014 transitions between rooms require AI to generate connecting spaces (hallways, doorways) that may not match actual layout.",
            insights: [
              {
                source: "MARKET",
                text: "Longer premium property videos (6\u201310s) outperform short hooks in the \u20AC750K+ segment \u2014 audience is willing to invest attention",
              },
              {
                source: "BROKER",
                text: "No extended format history for Van der Berg yet \u2014 would be a first test",
              },
            ],
            tradeoffs: {
              positive: "More property detail visible \u00B7 higher perceived value",
              negative: "Longer production \u00B7 more AI-generated transitions \u00B7 untested format",
            },
          },
          {
            name: "Tighter framing \u2014 detail focus",
            risk: "Low",
            whatChanges:
              "Close-up shots of heritage architectural details \u2014 ornamental plasterwork, original fixtures, period tiles. Reduces AI fabrication by using actual property photos at higher zoom.",
            hallucinationRisk:
              "Low \u2014 tight framing on real elements minimizes fabrication. AI only needs to create smooth transitions between detail shots.",
            insights: [
              {
                source: "MARKET",
                text: "Architectural detail content has 2.1x save rate for heritage properties \u2014 buyers screenshot details for reference",
              },
              {
                source: "GUARDRAIL",
                text: "Tight framing aligns with Van der Berg's deliberate, architectural pacing requirement",
              },
            ],
            tradeoffs: {
              positive: "Low risk \u00B7 high save rate \u00B7 brand-aligned pacing",
              negative: "Less emotional impact than wide establishing shots",
            },
          },
          {
            name: "Switch to Door Reveal",
            risk: "Low",
            whatChanges:
              "Switch to Door Reveal format \u2014 presenter at canal house entrance, opens door to reveal interior. Lower market performance for this property type but lower hallucination risk.",
            hallucinationRisk:
              "Low \u2014 single subject at door with minimal background fabrication.",
            insights: [
              {
                source: "MARKET",
                text: "1.6x for urban canal houses vs 3.2x for suburban \u2014 format underperforms in premium urban segment",
              },
              {
                source: "BROKER",
                text: "Canal house front doors are narrow, close to street \u2014 may not deliver dramatic entrance the format requires",
              },
            ],
            tradeoffs: {
              positive: "Lower hallucination risk \u00B7 proven format mechanics",
              negative: "Lower market performance for this property type \u00B7 constrained framing",
            },
          },
        ],
        brandedOverlay: {
          logoPosition: "bottom-left",
          accentStyle: "frame-tint",
          endCard: {
            ctaText: "Visit vanderbergmakelaars.nl",
            ctaUrl: "https://vanderbergmakelaars.nl",
          },
        },
        deliveryPackage: {
          hookSummary: {
            hookType: "Cinematic / Drone",
            property: "Canal House",
            platform: "Instagram Reels \u00B7 TikTok",
          },
          whyThisHook:
            "Cinematic sweep was selected for this heritage canal house based on Van der Berg's premium, authoritative positioning and market performance data. This hook type averages 2.8x more views than standard property intros for premium Amsterdam listings. The slow, deliberate pacing and professional presenter match Van der Berg's \"trusted advisor\" tone \u2014 confident, measured, never casual.",
          brandMatchChecklist: [
            "Professional presenter styled for 40+ high-net-worth audience",
            "Brand colors applied as subtle frame tint and end card elements",
            "Pacing is slow and deliberate \u2014 matches architectural, premium tone",
            "No gamification or informal elements \u2014 consistent with professional authority",
          ],
          propertyFeaturesHighlighted: [
            "Original 17th-Century Facade (establishing shot)",
            "Canal Frontage (heritage context)",
            "Private Garden Courtyard (surprise moment)",
          ],
          endCard: {
            ctaText: "Visit vanderbergmakelaars.nl",
            brokerUrl: "https://vanderbergmakelaars.nl",
          },
          optimizationNote:
            "This is hook #16 for Van der Berg Makelaars. Cinematic sweep has been confirmed as the top-performing hook type for this broker after 8 comparisons. Average views have increased from 7,200 (month 1) to 12,100 (month 3) as the system optimized for Van der Berg's premium audience. Return rate has dropped from 1.7% to 1.2% as guardrails refined presenter styling and pacing.",
        },
      },
    },
  ],
};
