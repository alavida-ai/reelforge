import { Link, useMatches } from "@tanstack/react-router";
import { cn } from "@/lib";

interface NavProps {
  brokerSlug?: string;
  brokerName?: string;
}

interface TabDef {
  label: string;
  to: string;
  params?: Record<string, string>;
  requiresBroker: boolean;
}

function buildTabs(
  brokerSlug: string | undefined,
  brokerName: string | undefined,
): TabDef[] {
  const tabs: TabDef[] = [
    {
      label: "1. Dashboard",
      to: "/dashboard",
      requiresBroker: false,
    },
  ];

  if (brokerSlug) {
    tabs.push(
      {
        label: `2. ${brokerName ?? "Broker Preset"}`,
        to: "/broker/$slug",
        params: { slug: brokerSlug },
        requiresBroker: true,
      },
      {
        label: "3. Production Flow",
        to: "/broker/$slug/produce",
        params: { slug: brokerSlug },
        requiresBroker: true,
      },
      {
        label: "4. Hook Reveal",
        to: "/broker/$slug/reveal",
        params: { slug: brokerSlug },
        requiresBroker: true,
      },
    );
  }

  return tabs;
}

export function Nav({ brokerSlug, brokerName }: NavProps) {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  const tabs = buildTabs(brokerSlug, brokerName);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-12 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4">
      <span className="text-sm font-semibold text-foreground tracking-tight">
        Bright River{" "}
        <span className="text-muted-foreground font-normal">/</span>{" "}
        <span className="text-brand">ReelForge</span>
      </span>

      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.to;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              params={tab.params as any}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors",
                isActive
                  ? "bg-brand-subtle text-brand"
                  : "text-muted-foreground hover:text-foreground hover:bg-brand-subtle/50",
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
