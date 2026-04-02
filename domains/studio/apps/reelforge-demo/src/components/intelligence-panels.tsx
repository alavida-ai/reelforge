import { cn } from "@/lib";
import { SectionLabel } from "@/components/section-label";
import { SourceTag, InsightLine } from "@/components/source-tag";
import { ThinProgress } from "@/components/thin-progress";
import { getHookType, getMarketData } from "@/data/get-data";
import type {
  DemoProperty,
  HookSelectionResult,
  MarketData,
} from "@/data/types";

interface IntelligencePanelsProps {
  property: DemoProperty;
  hookResults: HookSelectionResult[];
  marketData: MarketData;
}

/* -------------------------------------------------------------------------- */
/* Panel 1 — Property Analysis                                                */
/* -------------------------------------------------------------------------- */

function PropertyAnalysisPanel({ property }: { property: DemoProperty }) {
  return (
    <div className="rounded-xl bg-card border border-border p-3.5">
      <SectionLabel>1. Property Analysis</SectionLabel>
      <div className="text-[15px] font-bold mb-0.5">{property.type}</div>
      <div className="text-[11px] text-muted-foreground mb-2.5">
        {property.subtype}
      </div>

      <div className="flex flex-col gap-2">
        {property.features.map((feature) => (
          <div
            key={feature.name}
            className="bg-background rounded-md p-2"
          >
            <div className="flex justify-between mb-0.5">
              <span className="font-semibold text-[11px]">{feature.name}</span>
              <span className="font-mono text-[var(--color-green)] text-[10px]">
                {Math.round(feature.confidence * 100)}%
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {feature.insights.map((insight, i) => (
                <InsightLine key={i} insight={insight} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel 2 — Hook-Asset Matching                                              */
/* -------------------------------------------------------------------------- */

function HookAssetPanel({
  hookResults,
}: {
  hookResults: HookSelectionResult[];
}) {
  return (
    <div className="rounded-xl bg-card border border-border p-3.5">
      <SectionLabel>2. Hook-Asset Matching</SectionLabel>
      <div className="text-[13px] font-semibold mb-2">
        Which hooks are possible with these assets?
      </div>

      <div className="flex flex-col gap-1.5">
        {hookResults.map((result) => {
          const hookType = getHookType(result.hookTypeId);
          if (!hookType) return null;

          const isRecommended = result.status === "recommended";
          const isBlocked = result.status === "blocked";
          const isWeak = result.status === "weak";

          return (
            <div
              key={result.hookTypeId}
              className={cn(
                "rounded-md p-2",
                isRecommended
                  ? "bg-[rgba(122,186,122,0.06)] border border-[rgba(122,186,122,0.15)]"
                  : "border border-border",
                isBlocked && "opacity-45",
              )}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-1">
                <span
                  className={cn(
                    "font-semibold text-[12px]",
                    isRecommended && "text-[var(--color-green)]",
                  )}
                >
                  {hookType.icon} {hookType.name}
                </span>
                {isBlocked ? (
                  <span className="text-[10px] text-[var(--color-red)] font-semibold">
                    Blocked
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[10px] font-semibold",
                      isRecommended && "text-[var(--color-green)]",
                      isWeak && "text-[var(--color-orange)]",
                      !isRecommended && !isWeak && "text-muted-foreground",
                    )}
                  >
                    {result.assetsMatched.matched}/{result.assetsMatched.total}{" "}
                    assets matched
                  </span>
                )}
              </div>

              {/* Asset mapping details */}
              {result.assetsMatched.details.length > 0 && (
                <div className="flex flex-col gap-0.5 text-[10px] text-muted-foreground mb-1">
                  {result.assetsMatched.details.map((detail, i) => (
                    <div key={i}>{detail}</div>
                  ))}
                </div>
              )}

              {/* Missing note */}
              {result.assetsMatched.missingNote && (
                <div className="text-[10px] text-[var(--color-orange)] mb-1">
                  {result.assetsMatched.missingNote}
                </div>
              )}

              {/* Source-tagged insights */}
              <div className="flex flex-col gap-0.5">
                {result.insights.map((insight, i) => (
                  <InsightLine key={i} insight={insight} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel 3 — Risk + Recommendation                                            */
/* -------------------------------------------------------------------------- */

function RiskRecommendationPanel({
  hookResults,
  marketData,
}: {
  hookResults: HookSelectionResult[];
  marketData: MarketData;
}) {
  const recommended = hookResults.find((r) => r.status === "recommended");
  const recommendedHookType = recommended
    ? getHookType(recommended.hookTypeId)
    : undefined;

  return (
    <div className="rounded-xl bg-card border border-border p-3.5">
      <SectionLabel>3. Risk + Recommendation</SectionLabel>

      {recommendedHookType && (
        <>
          <div className="text-[13px] font-semibold text-[var(--color-green)] mb-0.5">
            → {recommendedHookType.name}
          </div>
          <div className="text-[11px] text-muted-foreground mb-3">
            Lowest complexity · highest brand fit · best market signal
          </div>
        </>
      )}

      {/* Risk dimensions */}
      <div className="flex flex-col gap-2 mb-3">
        {/* 1. Hallucination complexity */}
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span>Hallucination complexity</span>
            <span className="text-[var(--color-green)] font-semibold">Low</span>
          </div>
          <ThinProgress percent={15} />
          <div className="flex items-center gap-1 mt-0.5">
            <SourceTag type="GUARDRAIL" />
            <span className="text-[9px] text-muted-foreground">
              Close framing enforced — minimal fabrication needed
            </span>
          </div>
        </div>

        {/* 2. Brand fit */}
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span>Brand fit</span>
            <span className="text-[var(--color-green)]">●●●●○</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <SourceTag type="BROKER" />
            <span className="text-[9px] text-muted-foreground">
              Approachable persona matches "friend" tone
            </span>
          </div>
        </div>

        {/* 3. Asset coverage */}
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span>Asset coverage</span>
            <span className="text-[var(--color-green)] font-semibold">
              {recommended?.assetsMatched.matched}/{recommended?.assetsMatched.total}
            </span>
          </div>
          <div className="text-[9px] text-muted-foreground mt-0.5">
            All required assets available — no gaps to fill
          </div>
        </div>

        {/* 4. Market signal */}
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span>Market signal</span>
            <span className="font-mono font-semibold">3.2x</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <SourceTag type="MARKET" />
            <span className="text-[9px] text-muted-foreground">
              Top performer for Dutch suburban RE
            </span>
          </div>
        </div>

        {/* 5. Broker track record */}
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span>Broker track record</span>
            <span className="text-[var(--color-green)] font-semibold">
              24/24
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <SourceTag type="BROKER" />
            <span className="text-[9px] text-muted-foreground">
              Zero returns on this hook type for Homey
            </span>
          </div>
        </div>
      </div>

      {/* Reference posts */}
      <div className="pt-2 border-t border-border">
        <div className="text-[10px] text-muted-foreground mb-1.5">
          Reference posts
        </div>
        <div className="flex flex-col gap-1">
          {marketData.referencePosts.slice(0, 2).map((post, i) => (
            <div
              key={i}
              className="flex justify-between bg-background rounded px-2 py-1 text-[10px]"
            >
              <span className="text-muted-foreground">{post.description}</span>
              <span className="font-mono font-semibold">{post.views}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Exported Composition                                                       */
/* -------------------------------------------------------------------------- */

export function IntelligencePanels({
  property,
  hookResults,
  marketData,
}: IntelligencePanelsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <PropertyAnalysisPanel property={property} />
      <HookAssetPanel hookResults={hookResults} />
      <RiskRecommendationPanel
        hookResults={hookResults}
        marketData={marketData}
      />
    </div>
  );
}
