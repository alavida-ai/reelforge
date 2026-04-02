"use node";

import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const extractBrand = action({
  args: { url: v.string() },
  handler: async (ctx, { url }): Promise<string> => {
    const brandId = await ctx.runMutation(internal.brands.createBrand, {
      url,
      status: "extracting",
    });

    try {
      const apiKey = process.env.FIRECRAWL_API_KEY;
      if (!apiKey) throw new Error("FIRECRAWL_API_KEY not set");

      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

      const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          url: normalizedUrl,
          formats: ["extract"],
          extract: {
            prompt: "Extract the brand identity from this website. Find: the company name, logo URL, brand colors (as hex codes with names like 'primary', 'secondary', 'accent'), font families used, and overall brand style (e.g. 'Modern / Professional', 'Luxury / Boutique', 'Bold / Energetic').",
            schema: {
              type: "object",
              properties: {
                name: { type: "string", description: "Company or brand name" },
                logo: { type: "string", description: "URL to the logo image" },
                colors: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      hex: { type: "string" },
                      name: { type: "string" },
                    },
                  },
                },
                fonts: {
                  type: "array",
                  items: { type: "string" },
                },
                style: { type: "string", description: "Overall brand style classification" },
                description: { type: "string", description: "Brief brand description" },
              },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Firecrawl API error: ${response.status}`);
      }

      const data = await response.json();
      const extracted = data?.data?.extract;

      if (!extracted) {
        throw new Error("No brand data extracted");
      }

      await ctx.runMutation(internal.brands.updateBrand, {
        brandId,
        logo: extracted.logo ?? undefined,
        colors: (extracted.colors ?? []).map((c: { hex: string; name?: string }) => ({
          hex: c.hex,
          name: c.name,
        })),
        fonts: extracted.fonts ?? [],
        style: extracted.style ?? "Modern / Professional",
        name: extracted.name ?? undefined,
        description: extracted.description ?? undefined,
        status: "ready",
      });

      return brandId;
    } catch (error) {
      console.error("Brand extraction failed:", error);
      await ctx.runMutation(internal.brands.updateBrand, {
        brandId,
        status: "failed",
      });
      return brandId;
    }
  },
});

export const createBrand = internalMutation({
  args: {
    url: v.string(),
    status: v.union(v.literal("extracting"), v.literal("ready"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("brands", {
      url: args.url,
      colors: [],
      fonts: [],
      status: args.status,
      createdAt: Date.now(),
    });
  },
});

export const updateBrand = internalMutation({
  args: {
    brandId: v.id("brands"),
    logo: v.optional(v.string()),
    colors: v.optional(v.array(v.object({ hex: v.string(), name: v.optional(v.string()) }))),
    fonts: v.optional(v.array(v.string())),
    style: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(v.literal("extracting"), v.literal("ready"), v.literal("failed")),
  },
  handler: async (ctx, { brandId, ...fields }) => {
    const update: Record<string, unknown> = { status: fields.status };
    if (fields.logo !== undefined) update.logo = fields.logo;
    if (fields.colors !== undefined) update.colors = fields.colors;
    if (fields.fonts !== undefined) update.fonts = fields.fonts;
    if (fields.style !== undefined) update.style = fields.style;
    if (fields.name !== undefined) update.name = fields.name;
    if (fields.description !== undefined) update.description = fields.description;
    await ctx.db.patch(brandId, update);
  },
});

export const get = query({
  args: { brandId: v.id("brands") },
  handler: async (ctx, { brandId }) => {
    return await ctx.db.get(brandId);
  },
});
