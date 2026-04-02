import { useState, useCallback } from "react";
import { Upload, Link, Cloud, FolderOpen, ArrowRight, Check, Clock, Shield, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyAsset } from "@/lib/types";

interface InputPhaseProps {
  onGenerate: (url: string, assets: PropertyAsset[]) => void;
}

export function InputPhase({ onGenerate }: InputPhaseProps) {
  const [url, setUrl] = useState("");
  const [assets, setAssets] = useState<PropertyAsset[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newAssets: PropertyAsset[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" as const : "image" as const,
      }));
    setAssets((prev) => [...prev, ...newAssets]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const canGenerate = url.trim().length > 0 && assets.length > 0;
  const hasUrl = url.trim().length > 0;
  const hasAssets = assets.length > 0;

  return (
    <div className="mx-auto max-w-5xl pt-6">
      {/* Two-column layout: left = context + value, right = form */}
      <div className="grid grid-cols-12 gap-12 items-start">

        {/* Left — value context */}
        <div className="col-span-5 pt-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Generate a branded
            <br />
            property hook
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Upload property assets and a broker website. Our AI analyzes the listing,
            extracts the brand, and generates a scroll-stopping hook — ready for
            TikTok, Reels, and Shorts.
          </p>

          {/* Value metrics — mirrors Bright River's operational language */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                <Clock className="h-4 w-4 text-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Under 60 seconds</p>
                <p className="text-xs text-muted-foreground">From upload to branded hook. No manual editing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                <Shield className="h-4 w-4 text-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Brand-accurate first time</p>
                <p className="text-xs text-muted-foreground">Automated CI extraction from the broker's website. No brand guides needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                <TrendingDown className="h-4 w-4 text-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Lower cost per listing</p>
                <p className="text-xs text-muted-foreground">Scale hook production without scaling headcount.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — the form card */}
        <div className="col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            {/* Brand URL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Broker Website
                </label>
                {hasUrl && (
                  <span className="flex items-center gap-1 text-[11px] text-brand font-medium">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="relative group">
                <Link className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-brand" />
                <input
                  type="text"
                  placeholder="e.g. hfrealestategroup.nl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-11 rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-glow)]"
                />
              </div>
            </div>

            {/* Property Assets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Property Assets
                </label>
                {hasAssets && (
                  <span className="flex items-center gap-1 text-[11px] text-brand font-medium">
                    <Check className="h-3 w-3" />
                    {assets.length} file{assets.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "relative rounded-lg border bg-background transition-all duration-200 cursor-pointer overflow-hidden",
                  isDragging
                    ? "border-brand bg-brand-subtle shadow-[0_0_0_3px_var(--brand-glow)]"
                    : "border-border hover:border-muted-foreground/20",
                  assets.length === 0 ? "min-h-[140px]" : ""
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.accept = "image/*,video/*";
                  input.onchange = () => handleFiles(input.files);
                  input.click();
                }}
              >
                {assets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-border">
                      <Upload className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground/60">
                        Drop photos & videos
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/40">
                        or click to browse
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-1 p-2">
                    {assets.map((asset, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded bg-surface">
                        {asset.type === "image" ? (
                          <img src={asset.preview} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <video src={asset.preview} className="h-full w-full object-cover" muted />
                        )}
                      </div>
                    ))}
                    <div className="flex aspect-square items-center justify-center rounded border border-dashed border-border">
                      <Upload className="h-3 w-3 text-muted-foreground/30" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 cursor-not-allowed" disabled>
                  <Cloud className="h-3 w-3" />
                  Google Drive
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 cursor-not-allowed" disabled>
                  <FolderOpen className="h-3 w-3" />
                  Dropbox
                </button>
              </div>
            </div>

            {/* Generate */}
            <button
              disabled={!canGenerate}
              onClick={() => onGenerate(url, assets)}
              className={cn(
                "group w-full flex items-center justify-center gap-2.5 rounded-lg h-11 text-sm font-semibold transition-all duration-200",
                canGenerate
                  ? "bg-brand text-white hover:bg-brand-bright shadow-sm cursor-pointer"
                  : "bg-surface text-muted-foreground/30 border border-border cursor-not-allowed"
              )}
            >
              Generate Hook
              <ArrowRight className={cn(
                "h-4 w-4 transition-transform duration-200",
                canGenerate && "group-hover:translate-x-0.5"
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
