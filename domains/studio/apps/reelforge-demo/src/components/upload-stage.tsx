import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, MapPin, Home, Image, Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Broker } from "@/data/types";

interface UploadStageProps {
  broker: Broker;
  onStart: () => void;
  started: boolean;
}

interface UploadedFile {
  name: string;
  preview: string | null;
  size: string;
}

export function UploadStage({ broker, onStart, started }: UploadStageProps) {
  const [address, setAddress] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const property = broker.demoProperty;
  const hasAssets = uploadedFiles.length > 0;

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      size: file.size < 1024 * 1024
        ? `${Math.round(file.size / 1024)}KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(index: number) {
    setUploadedFiles((prev) => {
      const file = prev[index];
      if (file.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  return (
    <div>
      {/* Context bar */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: broker.colors.primary }}
          >
            {broker.logoLetter}
          </div>
          <div>
            <span className="font-semibold text-[12px]">
              Producing for {broker.name}
            </span>{" "}
            <span className="text-muted-foreground text-[11px]">
              {broker.tagline}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Return Rate{" "}
          <span className="font-mono text-[var(--color-green)] font-semibold">
            {broker.productionSla.returnRate}
          </span>{" "}
          · Hooks{" "}
          <span className="font-mono font-semibold">
            {broker.productionSla.hooksDelivered}
          </span>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Property Details (optional) */}
        <div className="mb-5">
          <h2 className="font-bold text-[16px] mb-1">Upload Listing</h2>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add property details and assets for hook generation
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-muted-foreground mb-1 block">
                Property address <span className="text-muted-foreground/50">(optional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Kerkstraat 42, Haarlem"
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-muted-foreground mb-1 block">
                Listing URL <span className="text-muted-foreground/50">(optional)</span>
              </label>
              <div className="relative">
                <Home className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                  placeholder="https://funda.nl/koop/haarlem/..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Asset Upload */}
        <div className="mb-5">
          <h3 className="font-semibold text-[13px] mb-1">Property Assets</h3>
          <p className="text-[11px] text-muted-foreground mb-3">
            Photos and video for hook generation
          </p>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "w-full border-2 border-dashed rounded-xl p-6 mb-3 transition-colors text-center cursor-pointer",
              isDragging
                ? "border-foreground bg-muted/30"
                : "border-border hover:border-muted-foreground/40 hover:bg-muted/20",
            )}
          >
            <Upload className="h-5 w-5 mx-auto mb-1.5 text-muted-foreground" />
            <div className="text-[12px]">Drop property photos & videos</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              or click to browse
            </div>
          </div>

          {/* Uploaded files grid */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-6 gap-1.5 mb-4"
              >
                {uploadedFiles.map((file, i) => (
                  <motion.div
                    key={`${file.name}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square rounded-md border border-border overflow-hidden relative group"
                  >
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 bg-muted/50">
                        <Image className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[7px] text-muted-foreground leading-tight truncate px-0.5 w-full text-center">
                          {file.name}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* File count */}
          {uploadedFiles.length > 0 && (
            <div className="text-[10px] text-muted-foreground mb-4">
              {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} selected
            </div>
          )}
        </div>

        {/* Start Production */}
        <Button
          onClick={onStart}
          disabled={!hasAssets || started}
          variant={started ? "secondary" : "default"}
          className="w-full"
        >
          {started ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5" />
              Production Started
            </>
          ) : hasAssets ? (
            "Start Production"
          ) : (
            "Upload assets to continue"
          )}
        </Button>
      </div>
    </div>
  );
}
