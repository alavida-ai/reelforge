export type Phase = "input" | "brand" | "analysis" | "reveal";

export interface BrandColor {
  hex: string;
  name?: string;
}

export interface BrandData {
  name?: string;
  logo?: string;
  colors: BrandColor[];
  fonts: string[];
  style?: string;
  description?: string;
  status: "extracting" | "ready" | "failed";
}

export interface PropertyAsset {
  file: File;
  preview: string;
  type: "image" | "video";
}

export interface InsightCard {
  id: string;
  icon: string;
  title: string;
  content: string;
  detail?: string;
}

export interface DetectedFeature {
  label: string;
  confidence: number;
}

export interface StoryboardFrame {
  label: string;
  description: string;
}

export interface PerformanceComparison {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface HookData {
  videoSrc: string;
  pattern: string;
  patternReason: string;
  metrics: {
    label: string;
    value: string;
  }[];
  brandElements: string[];
  researchPoints: string[];
}
