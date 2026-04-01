import { useState, useCallback } from "react";
import { Upload, Link, Cloud, FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="relative mx-auto max-w-4xl pt-16">
      {/* Ambient glow behind hero */}
      <div className="ambient-glow" />

      {/* Hero — just the headline, nothing else */}
      <div className="relative mb-20">
        <h1 className="font-display text-8xl leading-[1] tracking-tight text-foreground italic">
          Craft your next
          <br />
          <span className="text-brand">property hook</span>
        </h1>
      </div>

      {/* Two-column input layout */}
      <div className="grid grid-cols-5 gap-10">
        {/* Left column — inputs */}
        <div className="col-span-3 space-y-8">
          {/* Brand URL */}
          <div className="space-y-3">
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Realtor Website
            </label>
            <div className="relative group">
              <Link className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand" />
              <input
                type="text"
                placeholder="hfrealestategroup.nl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full h-14 rounded-lg border border-border bg-surface pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-brand/40 focus:ring-1 focus:ring-brand/20"
              />
            </div>
          </div>

          {/* File Drop Zone */}
          <div className="space-y-3">
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Property Assets
            </label>
            <div
              className={cn(
                "relative rounded-lg border border-dashed border-border bg-surface/50 transition-all duration-200 cursor-pointer",
                isDragging && "border-brand bg-brand-subtle scale-[1.01]",
                assets.length === 0 ? "min-h-[180px]" : "min-h-[100px]"
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
                <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground/80">
                      Drop photos & videos here
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      or click to browse
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-1.5 p-3">
                  {assets.map((asset, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded bg-muted"
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
                    </div>
                  ))}
                  <div className="flex aspect-square items-center justify-center rounded border border-dashed border-border/50">
                    <Upload className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </div>
                </div>
              )}
            </div>

            {/* Cloud storage optics */}
            <div className="flex gap-3 pt-1">
              <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 cursor-not-allowed" disabled>
                <Cloud className="h-3 w-3" />
                Google Drive
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 cursor-not-allowed" disabled>
                <FolderOpen className="h-3 w-3" />
                Dropbox
              </button>
            </div>
          </div>
        </div>

        {/* Right column — generate CTA */}
        <div className="col-span-2 flex flex-col justify-end">
          <div className="space-y-4">
            {/* Status indicators */}
            <div className="space-y-2.5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  url.trim() ? "bg-brand" : "bg-muted-foreground/20"
                )} />
                <span className={cn(
                  "text-xs transition-colors",
                  url.trim() ? "text-foreground" : "text-muted-foreground/40"
                )}>
                  Brand URL
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  assets.length > 0 ? "bg-brand" : "bg-muted-foreground/20"
                )} />
                <span className={cn(
                  "text-xs transition-colors",
                  assets.length > 0 ? "text-foreground" : "text-muted-foreground/40"
                )}>
                  {assets.length > 0 ? `${assets.length} asset${assets.length > 1 ? "s" : ""} loaded` : "Property assets"}
                </span>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-px bg-border" />

            {/* Generate button */}
            <button
              disabled={!canGenerate}
              onClick={() => onGenerate(url, assets)}
              className={cn(
                "group w-full flex items-center justify-between rounded-lg px-6 py-4 text-sm font-medium transition-all duration-300",
                canGenerate
                  ? "bg-brand text-primary-foreground hover:bg-brand-bright cursor-pointer"
                  : "bg-surface-raised text-muted-foreground border border-border cursor-not-allowed"
              )}
            >
              <span>Generate Hook</span>
              <ArrowRight className={cn(
                "h-4 w-4 transition-transform duration-300",
                canGenerate && "group-hover:translate-x-1"
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
