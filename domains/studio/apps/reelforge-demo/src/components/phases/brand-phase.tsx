import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAction, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { BrandCard } from "@/components/brand-card";
import { ShimmerBlock } from "@/components/shimmer";
import { FALLBACK_BRAND, PHASE_TIMINGS } from "@/lib/demo-data";
import type { PropertyAsset, BrandData } from "@/lib/types";

interface BrandPhaseProps {
  url: string;
  assets: PropertyAsset[];
  onComplete: (brand: BrandData) => void;
}

export function BrandPhase({ url, assets, onComplete }: BrandPhaseProps) {
  const extractBrand = useAction(api.brandActions.extractBrand);
  const [brandId, setBrandId] = useState<Id<"brands"> | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const brand = useQuery(
    api.brands.get,
    brandId ? { brandId } : "skip"
  );

  // Kick off extraction on mount
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    extractBrand({ url })
      .then((id) => setBrandId(id as Id<"brands">))
      .catch(() => setUseFallback(true));

    // Fallback timeout: if Firecrawl takes too long, use demo data
    timeout = setTimeout(() => {
      if (!brand || brand.status === "extracting") {
        setUseFallback(true);
      }
    }, PHASE_TIMINGS.brandExtractionDelay + 5000);

    return () => clearTimeout(timeout);
  }, [url, extractBrand]);

  // Determine which brand data to show
  const brandData: BrandData | null = useFallback
    ? FALLBACK_BRAND
    : brand && brand.status === "ready"
      ? {
          name: brand.name,
          logo: brand.logo,
          colors: brand.colors,
          fonts: brand.fonts,
          style: brand.style,
          description: brand.description,
          status: brand.status,
        }
      : brand && brand.status === "failed"
        ? FALLBACK_BRAND
        : null;

  // Auto-advance when brand is ready
  useEffect(() => {
    if (brandData && brandData.status === "ready") {
      const timer = setTimeout(() => {
        onComplete(brandData);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [brandData, onComplete]);

  return (
    <div className="mx-auto max-w-5xl pt-8">
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-foreground">
          Extracting brand identity
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Scanning <span className="font-mono text-xs text-brand bg-brand-subtle px-2 py-0.5 rounded">{url}</span>
        </p>
        <div className="mt-4 h-px glow-line" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Brand Card / Shimmer */}
        <div>
          {brandData ? (
            <BrandCard brand={brandData} />
          ) : (
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-brand" />
                <span className="text-sm text-muted-foreground">
                  Scraping brand assets...
                </span>
              </div>
              <ShimmerBlock className="h-14 w-14" />
              <div className="flex gap-2">
                <ShimmerBlock className="h-10 w-10" />
                <ShimmerBlock className="h-10 w-10" />
                <ShimmerBlock className="h-10 w-10" />
                <ShimmerBlock className="h-10 w-10" />
              </div>
              <ShimmerBlock className="h-4 w-32" />
            </div>
          )}
        </div>

        {/* Property Thumbnails */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Property Assets ({assets.length})
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {assets.map((asset, i) => (
              <motion.div
                key={i}
                className="aspect-square overflow-hidden rounded-lg bg-muted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {asset.type === "image" ? (
                  <img
                    src={asset.preview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={asset.preview}
                    className="h-full w-full object-cover"
                    muted
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
