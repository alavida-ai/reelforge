import { Link, useMatches } from "@tanstack/react-router";
import { Video, ChevronRight } from "lucide-react";
import { cn } from "@/lib";

interface NavProps {
  brokerSlug?: string;
  brokerName?: string;
}

export function Nav({ brokerSlug, brokerName }: NavProps) {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-1.5 font-semibold tracking-tight text-foreground">
          <Video className="h-4 w-4" />
          ReelForge
        </Link>

        <div className="h-4 w-px bg-border" />

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-pointer">Bright River Ops</span>
          <ChevronRight className="h-3 w-3" />
          {brokerSlug ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-foreground transition-colors"
              >
                Brokers
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium bg-accent px-2 py-0.5 rounded border border-border flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
                {brokerName ?? "Broker"}
              </span>
            </>
          ) : (
            <span className="text-foreground font-medium bg-accent px-2 py-0.5 rounded border border-border">
              Dashboard
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {/* System status */}
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-green)]" />
          </div>
          Platform Operational
        </div>

        <div className="h-4 w-px bg-border" />

        {/* User avatar */}
        <div className="h-7 w-7 rounded-full bg-accent border border-border flex items-center justify-center hover:border-muted-foreground transition-colors">
          <span className="font-mono text-xs text-foreground">BR</span>
        </div>
      </div>
    </nav>
  );
}
