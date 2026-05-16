import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("predefinedTimelines"),
      title: v.string(),
      slug: v.string(),
      summary: v.string(),
      coverImageUrl: v.string(),
      startYear: v.number(),
      endYear: v.number(),
      incidentCount: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const timelines = await ctx.db.query("predefinedTimelines").collect();
    const result = [];
    for (const timeline of timelines) {
      const incidents = await ctx.db
        .query("timelineIncidents")
        .withIndex("by_timeline_order", (q) => q.eq("timelineId", timeline._id))
        .collect();
      result.push({
        _id: timeline._id,
        title: timeline.title,
        slug: timeline.slug,
        summary: timeline.summary,
        coverImageUrl: timeline.coverImageUrl,
        startYear: timeline.startYear,
        endYear: timeline.endYear,
        incidentCount: incidents.length,
      });
    }
    return result.sort((a, b) => a.startYear - b.startYear);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("predefinedTimelines"),
      title: v.string(),
      slug: v.string(),
      summary: v.string(),
      coverImageUrl: v.string(),
      startYear: v.number(),
      endYear: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("predefinedTimelines")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});
