import { Link, useMatches } from "@tanstack/react-router";
import { cn } from "@/lib";

interface NavProps {
  brokerSlug?: string;
  brokerName?: string;
}

export function Nav({ brokerSlug, brokerName }: NavProps) {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  const tabs: { label: string; to: string; params?: Record<string, string> }[] = [
    { label: "Dashboard", to: "/dashboard" },
  ];

  if (brokerSlug) {
    tabs.push(
      { label: brokerName ?? "Broker", to: "/broker/$slug", params: { slug: brokerSlug } },
      { label: "Produce", to: "/broker/$slug/produce", params: { slug: brokerSlug } },
      { label: "Deliver", to: "/broker/$slug/reveal", params: { slug: brokerSlug } },
    );
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold">Bright River</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">ReelForge</span>
      </div>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              params={tab.params as any}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
