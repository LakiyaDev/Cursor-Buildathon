import { query } from "./_generated/server";
import { v } from "convex/values";

export const listByTimelineSlug = query({
  args: { slug: v.string() },
  returns: v.array(
    v.object({
      _id: v.id("timelineIncidents"),
      year: v.string(),
      title: v.string(),
      description: v.string(),
      location: v.optional(v.string()),
      relatedImageUrl: v.optional(v.string()),
      realOutcome: v.string(),
      order: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const timeline = await ctx.db
      .query("predefinedTimelines")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!timeline) {
      return [];
    }
    const incidents = await ctx.db
      .query("timelineIncidents")
      .withIndex("by_timeline_order", (q) => q.eq("timelineId", timeline._id))
      .collect();
    return incidents
      .map(({ _id, year, title, description, location, relatedImageUrl, realOutcome, order }) => ({
        _id,
        year,
        title,
        description,
        location,
        relatedImageUrl,
        realOutcome,
        order,
      }))
      .sort((a, b) => a.order - b.order);
  },
});

export const countAll = query({
  args: {},
  returns: v.object({
    timelineCount: v.number(),
    incidentCount: v.number(),
  }),
  handler: async (ctx) => {
    const timelineCount = (await ctx.db.query("predefinedTimelines").collect()).length;
    const incidentCount = (await ctx.db.query("timelineIncidents").collect()).length;
    return { timelineCount, incidentCount };
  },
});
