import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

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
