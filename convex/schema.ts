import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  predefinedTimelines: defineTable({
    title: v.string(),
    slug: v.string(),
    summary: v.string(),
    coverImageUrl: v.string(),
    startYear: v.number(),
    endYear: v.number(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  timelineIncidents: defineTable({
    timelineId: v.id("predefinedTimelines"),
    year: v.string(),
    title: v.string(),
    description: v.string(),
    location: v.optional(v.string()),
    relatedImageUrl: v.optional(v.string()),
    realOutcome: v.string(),
    order: v.number(),
  }).index("by_timeline_order", ["timelineId", "order"]),
});
