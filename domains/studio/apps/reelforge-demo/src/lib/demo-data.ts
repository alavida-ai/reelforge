import type { InsightCard, HookData, BrandData, DetectedFeature, StoryboardFrame, PerformanceComparison } from "./types";

// --- Analysis Pipeline Data ---

export const DETECTED_FEATURES: DetectedFeature[] = [
  { label: "Open-Plan Kitchen", confidence: 0.97 },
  { label: "Herringbone Flooring", confidence: 0.94 },
  { label: "South-Facing Garden", confidence: 0.92 },
  { label: "Modern Renovation", confidence: 0.91 },
  { label: "Double-Height Windows", confidence: 0.88 },
  { label: "Integrated Appliances", confidence: 0.85 },
];

export const PROPERTY_CLASSIFICATION = {
  type: "Suburban Family Home",
  style: "Modern Renovation",
  segment: "Mid-to-High Range",
  strengths: ["Kitchen", "Garden", "Natural Light"],
};

export const HOOK_COMPARISONS: PerformanceComparison[] = [
  { label: "Standard Intro", value: 1.0 },
  { label: "Walk-Through POV", value: 1.8 },
  { label: "Detail Zoom", value: 2.1 },
  { label: "Gift Reveal", value: 3.2, highlight: true },
];

export const SELECTED_ASSETS = [
  { reason: "Hero shot — kitchen is the #1 engagement driver in this segment" },
  { reason: "Reveal moment — garden creates the emotional payoff" },
  { reason: "Exterior — establishes the property for the wrap effect" },
];

export const STORYBOARD: (StoryboardFrame & { image: string })[] = [
  {
    label: "Brand Wrap",
    description: "Property exterior wrapped in Homi brand — gift box effect with logo ribbon",
    image: "/property/exterior.jpg",
  },
  {
    label: "Curiosity Build",
    description: "Camera pushes in through hallway — wrapping peels away to reveal interior",
    image: "/property/living.jpg",
  },
  {
    label: "Property Reveal",
    description: "Unwrap reveals the hero kitchen — brand name appears at the reveal moment",
    image: "/property/kitchen.jpg",
  },
];

export const PROPERTY_PHOTOS = [
  { src: "/property/exterior.jpg", feature: "Exterior" },
  { src: "/property/living.jpg", feature: "Living Room" },
  { src: "/property/kitchen.jpg", feature: "Kitchen" },
  { src: "/property/hallway.jpg", feature: "Hallway" },
  { src: "/property/bathroom.jpg", feature: "Bathroom" },
  { src: "/property/staircase.jpg", feature: "Staircase" },
];

export const CREATIVE_PROMPT = `Gift Reveal hook for suburban modern renovation.
Brand: Homi (green palette, modern/professional tone).
Hero assets: kitchen (highest engagement), garden (emotional payoff).
Pattern: property wrapped in brand → curiosity build → reveal.
Optimize for: first 3-second retention, sound-off viewing, Dutch market.`;

// --- Existing data ---

export const DEMO_INSIGHTS: InsightCard[] = [
  {
    id: "property",
    icon: "Home",
    title: "Property Scan",
    content: "Modern family home with open-plan kitchen, herringbone flooring, south-facing garden. The kitchen and garden are your strongest visual assets — these drive the most engagement in this property segment.",
    detail: "9 photos, 1 video analyzed — 8 high-value features identified",
  },
  {
    id: "strategy",
    icon: "Zap",
    title: "Hook Selection",
    content: "Gift Reveal — the property is wrapped in the broker's brand, then unwrapped to reveal the listing. This pattern creates a curiosity gap that forces viewers to watch through the reveal.",
    detail: "Selected from 12 hook patterns based on property type + brand style match",
  },
  {
    id: "market",
    icon: "TrendingUp",
    title: "Performance Signal",
    content: "Gift Reveal hooks on Dutch suburban listings average 3.2x more views than standard property intros. The opening 3 seconds determine whether viewers stay — this pattern hooks 67% more effectively.",
    detail: "Based on 2,400+ Dutch RE social posts analyzed Q1 2026",
  },
];

export const DEMO_HOOK: HookData = {
  videoSrc: "/hooks/homi-gift-reveal.mp4",
  pattern: "Gift Reveal",
  patternReason: "This property's modern renovation and large garden are perfect for the Gift Reveal pattern. The broker's brand wraps the home like a gift — creating a curiosity gap that forces the viewer to watch the unwrap. The Homi green works as the ribbon accent, making the brand feel integral to the reveal rather than slapped on afterward.",
  metrics: [
    { label: "Hook Pattern", value: "Gift Reveal" },
    { label: "First 3s Retention", value: "67% lift" },
    { label: "Avg Views (segment)", value: "3.2x" },
    { label: "Brand Recall", value: "+41%" },
  ],
  brandElements: [
    "Logo integrated into gift wrap design",
    "Primary brand color as ribbon accent",
    "Brand name revealed at unwrap moment",
  ],
  researchPoints: [
    "This property type + this hook pattern = 3.2x average views in the Dutch market",
    "Curiosity-gap openings outperform all other hook types on TikTok and Reels",
    "Branded reveals drive 41% higher broker recall vs logo-first intros",
    "The garden and kitchen features are highlighted in the reveal sequence for maximum impact",
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
  // Analysis pipeline — each stage delay from phase start
  stageDelay: 2500,
  stageShimmerDuration: 1200,
  optimizationMeterDuration: 2500,
  hookRevealDelay: 2000,
  // Legacy
  insightStagger: 2800,
  insightShimmerDuration: 1800,
} as const;
