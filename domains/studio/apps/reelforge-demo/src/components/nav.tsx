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
      label: "Dashboard",
      to: "/dashboard",
      requiresBroker: false,
    },
  ];

  if (brokerSlug) {
    tabs.push(
      {
        label: brokerName ?? "Broker",
        to: "/broker/$slug",
        params: { slug: brokerSlug },
        requiresBroker: true,
      },
      {
        label: "Produce",
        to: "/broker/$slug/produce",
        params: { slug: brokerSlug },
        requiresBroker: true,
      },
      {
        label: "Deliver",
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
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-5">
      {/* Left: Brand identity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-foreground tracking-tight">
          Bright River
        </span>
        <div className="w-px h-5 bg-border/60" />
        <span className="text-sm font-medium text-brand tracking-tight">
          ReelForge
        </span>
      </div>

      {/* Right: Navigation tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.to;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              params={tab.params as any}
              className={cn(
                "relative px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200",
                isActive
                  ? "bg-brand/15 text-brand shadow-[0_0_12px_oklch(0.72_0.10_300/15%)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-[oklch(1_0_0/4%)]",
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-brand/60" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
