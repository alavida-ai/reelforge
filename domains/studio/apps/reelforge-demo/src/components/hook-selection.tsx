import { Link } from "@tanstack/react-router";
import { HookCard } from "@/components/hook-card";
import { getHookType } from "@/data/get-data";
import type { HookSelectionResult } from "@/data/types";

interface HookSelectionProps {
  results: HookSelectionResult[];
  brokerSlug: string;
}

export function HookSelection({ results, brokerSlug }: HookSelectionProps) {
  const recommended = results.find((r) => r.status === "recommended");
  const recommendedName = recommended
    ? getHookType(recommended.hookTypeId)?.name ?? "Hook"
    : "Hook";

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {results.map((result) => (
          <HookCard key={result.hookTypeId} result={result} />
        ))}
      </div>

      <div className="text-center mt-4">
        <Link
          to="/broker/$slug/reveal"
          params={{ slug: brokerSlug }}
          className="inline-block px-5 py-2.5 rounded-md bg-brand text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-opacity"
        >
          Generate {recommendedName} →
        </Link>
      </div>
    </div>
  );
}
