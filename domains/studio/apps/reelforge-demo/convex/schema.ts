import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  brands: defineTable({
    url: v.string(),
    logo: v.optional(v.string()),
    colors: v.array(v.object({
      hex: v.string(),
      name: v.optional(v.string()),
    })),
    fonts: v.array(v.string()),
    style: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("extracting"),
      v.literal("ready"),
      v.literal("failed")
    ),
    createdAt: v.number(),
  }).index("by_url", ["url"]),
});
