// data/types.ts — All TypeScript interfaces for the ReelForge demo data layer

export interface DemoData {
  org: Organization;
  brokers: Broker[];
  hookTypes: HookType[];
  marketData: MarketData;
}

export interface Organization {
  name: string;
  product: string;
  headerKpis: {
    hooksThisWeek: number;
    avgTurnaround: string;
    returnRate: string;
    avgCost: string;
  };
}

export interface Broker {
  slug: string;
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  logoLetter: string;
  fonts: string;
  websiteUrl: string;

  // Brand intelligence (center column, Screen 2)
  brandIntelligence: {
    whoTheyAre: string;
    targetAudience: {
      demographic: string;
      priceSegment: string;
      geographicFocus: string;
      socialPresence: string;
    };
    communicationStyle: {
      tags: string[];
      voiceDescription: string;
    };
    hookApproachRules: HookApproachRule[];
    guardrails: Guardrail[];
  };

  // Rejection log
  rejectionLog: {
    totalHooks: number;
    totalReturned: number;
    returnRate: string;
    entries: RejectionEntry[];
    consecutiveAccepted: number;
    consecutiveAcceptedSince: string;
    returnRateTrend: { month1: string; month3: string };
  };

  // Production SLA (right column, Screen 2)
  productionSla: {
    returnRate: string;
    returnRateTrend: string;
    turnaround: string;
    costPerHook: string;
    hooksDelivered: number;
  };

  // Content performance (right column, Screen 2)
  contentPerformance: {
    avgViews: string;
    avgViewsTrend: string;
    topHook: string;
    vsStandard: string;
  };

  // Data depth
  dataDepth: {
    market: { count: string; percent: number };
    crossIndustry: { count: string; percent: number };
    brokerSpecific: { count: string; percent: number };
  };

  // Demo property (Screen 3 -- pre-loaded)
  demoProperty: DemoProperty;

  // Hook selection results (Screen 3 Stage 3)
  hookSelectionResults: HookSelectionResult[];

  // Reveal data (Screen 4)
  revealData: RevealData;
}

export interface HookApproachRule {
  hookType: string;
  status: "approved" | "blocked" | "conditional";
  reasoning: string;
}

export interface Guardrail {
  severity: "hard" | "warning";
  rule: string;
}

export interface RejectionEntry {
  hookNumber: number;
  date: string;
  reason: string;
  systemAnalysis: string;
  guardrailAdded: string;
}

export interface DemoProperty {
  type: string;
  subtype: string;
  address: string;
  assets: PropertyAsset[];
  features: PropertyFeature[];
}

export interface PropertyAsset {
  label: string;
  role: string;
}

export interface PropertyFeature {
  name: string;
  confidence: number;
  insights: SourceTaggedInsight[];
}

export interface SourceTaggedInsight {
  source: "MARKET" | "BROKER" | "GUARDRAIL";
  text: string;
}

export interface HookType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface HookSelectionResult {
  hookTypeId: string;
  status: "recommended" | "available" | "weak" | "blocked";
  complexity: "Low" | "Medium" | "High";
  hallucinationRisk: {
    level: "Low" | "Medium" | "High";
    explanation: string;
  };
  insights: SourceTaggedInsight[];
  assetsMatched: {
    matched: number;
    total: number;
    details: string[];
    missingNote?: string;
  };
  blockedReason?: string;
}

export interface RevealData {
  // Production quality KPIs (left side -- defensible)
  productionQuality: {
    returnRate: string;
    returnRateTrend: "\u2193" | "\u2191" | "\u2192";
    turnaround: string;
    cost: string;
    guardrailViolations: number;
  };
  // Expected performance (right side -- projected)
  expectedPerformance: {
    views: string;
    retention: string;
    brandRecall: string;
    dataPoints: string;
  };
  // Creative rationale
  creativeRationale: string;
  creativeTags: string[];
  // Adjustments
  adjustments: Adjustment[];
  // Branded overlay (corporate identity injection)
  brandedOverlay: {
    logoPosition: string;
    accentStyle: string;
    endCard: {
      ctaText: string;
      ctaUrl: string;
    };
  };
  // Delivery package
  deliveryPackage: {
    hookSummary: {
      hookType: string;
      property: string;
      platform: string;
    };
    whyThisHook: string;
    brandMatchChecklist: string[];
    propertyFeaturesHighlighted: string[];
    endCard: {
      ctaText: string;
      brokerUrl: string;
    };
    optimizationNote: string;
  };
}

export interface Adjustment {
  name: string;
  risk: "Low" | "Medium" | "High";
  whatChanges: string;
  hallucinationRisk: string;
  insights: SourceTaggedInsight[];
  tradeoffs: {
    positive: string;
    negative: string;
  };
}

export interface MarketData {
  totalPosts: string;
  geography: string;
  period: string;
  referencePosts: ReferencePost[];
}

export interface ReferencePost {
  description: string;
  views: string;
}
