import type { InsightCard, HookData, BrandData } from "./types";

export const DEMO_INSIGHTS: InsightCard[] = [
  {
    id: "property",
    icon: "Home",
    title: "Property Analysis",
    content: "Detected: Suburban family home, 4 bedrooms, modern renovation, large garden. South-facing terrace with natural light. Premium kitchen fixtures identified.",
    detail: "Scanned 8 images and 1 video — 12 property features extracted",
  },
  {
    id: "market",
    icon: "TrendingUp",
    title: "Market Context",
    content: "Dutch RE market Q1 2026: 47,619 homes sold (+11.1% YoY), avg price EUR 502K, avg selling time 28 days. Krapte-indicator 1.9 — tight market.",
    detail: "Brokers compete for listings, not buyers. Brand visibility is the differentiator.",
  },
  {
    id: "strategy",
    icon: "Zap",
    title: "Hook Strategy",
    content: "Recommended: Gift Reveal pattern — wraps the property in the broker's brand. 67% higher first-3-second retention vs standard property intros in NL market.",
    detail: "Curiosity-gap hooks outperform all other types consistently across TikTok, Reels, and Shorts.",
  },
  {
    id: "audience",
    icon: "Users",
    title: "Audience Insight",
    content: "85% of viewers watch without sound — text overlays are critical. Hook stacking (visual + text + audio) engages multiple cognitive systems simultaneously.",
    detail: "Dutch audiences prefer directness over hype. Aspirational but grounded tone selected.",
  },
];

export const DEMO_HOOK: HookData = {
  videoSrc: "/hooks/homi-gift-reveal.mp4",
  pattern: "Gift Reveal",
  patternReason: "The Gift Reveal pattern wraps the property in the broker's brand identity, creating an instant curiosity gap. Viewers want to see what's inside — driving 67% higher first-3-second retention compared to standard property intros in the Dutch market.",
  metrics: [
    { label: "Optimization Score", value: "94%" },
    { label: "Predicted Retention (3s)", value: "78%" },
    { label: "Pattern Effectiveness", value: "2.3x avg" },
    { label: "Brand Recall Lift", value: "+41%" },
  ],
  brandElements: [
    "Logo integrated into gift wrap design",
    "Primary brand color as ribbon accent",
    "Brand name revealed at unwrap moment",
  ],
  researchPoints: [
    "Curiosity-gap hooks outperform all other types across platforms",
    "Properties in this segment see 2.3x more engagement with reveal-style hooks",
    "Gift/surprise framing triggers dopamine response — proven scroll-stopper",
    "Dutch market data shows branded hooks drive 41% higher broker recall",
  ],
};

export const FALLBACK_BRAND: BrandData = {
  name: "Homi",
  logo: "/brand/homi-logo.png",
  colors: [
    { hex: "#4CAF50", name: "Primary Green" },
    { hex: "#2E7D32", name: "Dark Green" },
    { hex: "#1B1B1B", name: "Near Black" },
    { hex: "#FFFFFF", name: "White" },
  ],
  fonts: ["Montserrat", "Inter"],
  style: "Modern / Professional",
  description: "Contemporary real estate brand with clean, approachable identity",
  status: "ready",
};

export const PHASE_TIMINGS = {
  brandExtractionDelay: 3000,
  insightStagger: 1800,
  insightShimmerDuration: 1200,
  optimizationMeterDuration: 2000,
  hookRevealDelay: 1000,
} as const;
