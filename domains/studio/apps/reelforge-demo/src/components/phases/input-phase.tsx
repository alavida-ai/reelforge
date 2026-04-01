import { useState, useCallback } from "react";
import { Upload, Link, Cloud, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-12 pt-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Create a Hook
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload your property assets and brand — we'll generate an optimized hook in seconds.
        </p>
      </div>

      {/* Brand URL Input */}
      <div className="w-full space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Realtor Website
        </label>
        <div className="relative">
          <Link className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="hfrealestategroup.nl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-14 pl-12 text-lg bg-card border-border placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      {/* File Drop Zone */}
      <div className="w-full space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Property Assets
        </label>
        <Card
          className={cn(
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed bg-card/50 transition-colors",
            isDragging && "border-brand bg-brand-subtle",
            assets.length > 0 && "min-h-[120px]"
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
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drop property photos & videos here
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or click to browse
                </p>
              </div>
            </>
          ) : (
            <div className="grid w-full grid-cols-5 gap-2 p-4">
              {assets.map((asset, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-muted"
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
              <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border">
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </Card>

        {/* Optics: cloud storage buttons */}
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" disabled>
            <Cloud className="mr-1.5 h-3 w-3" />
            Google Drive
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" disabled>
            <FolderOpen className="mr-1.5 h-3 w-3" />
            Dropbox
          </Button>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        size="lg"
        disabled={!canGenerate}
        onClick={() => onGenerate(url, assets)}
        className="h-14 w-full max-w-md text-lg font-semibold bg-brand text-primary-foreground hover:bg-brand-bright transition-colors"
      >
        Generate Hook
      </Button>
    </div>
  );
}
