import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
        >
          <Button>
            Generate {recommendedName} →
          </Button>
        </Link>
      </div>
    </div>
  );
}
