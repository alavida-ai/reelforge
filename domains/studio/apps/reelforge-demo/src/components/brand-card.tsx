import { motion } from "framer-motion";
import { Palette, Type, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BrandData } from "@/lib/types";

interface BrandCardProps {
  brand: BrandData;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card className="overflow-hidden border-border bg-card p-6 space-y-6">
      {/* Logo + Name */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
      >
        {brand.logo && (
          <img
            src={brand.logo}
            alt={brand.name ?? "Brand logo"}
            className="h-14 w-14 rounded-lg object-contain bg-white p-1"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {brand.name ?? "Brand"}
          </h3>
          {brand.description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {brand.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Color Palette */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Palette className="h-3.5 w-3.5" />
          <span>Color Palette</span>
        </div>
        <div className="flex gap-2">
          {brand.colors.map((color, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
            >
              <div
                className="h-10 w-10 rounded-lg border border-border shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[10px] text-muted-foreground">
                {color.name ?? color.hex}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fonts */}
      {brand.fonts.length > 0 && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Type className="h-3.5 w-3.5" />
            <span>Typography</span>
          </div>
          <div className="flex gap-2">
            {brand.fonts.map((font, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {font}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Style Classification */}
      {brand.style && (
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          <span className="text-sm font-medium text-brand">
            {brand.style}
          </span>
        </motion.div>
      )}
    </Card>
  );
}
