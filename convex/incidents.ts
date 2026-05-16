import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { incidentId: v.id("timelineIncidents") },
  returns: v.union(
    v.object({
      incident: v.object({
        _id: v.id("timelineIncidents"),
        timelineId: v.id("predefinedTimelines"),
        year: v.string(),
        title: v.string(),
        description: v.string(),
        location: v.optional(v.string()),
        relatedImageUrl: v.optional(v.string()),
        realOutcome: v.string(),
        order: v.number(),
      }),
      timeline: v.object({
        _id: v.id("predefinedTimelines"),
        title: v.string(),
        slug: v.string(),
        summary: v.string(),
        coverImageUrl: v.string(),
        startYear: v.number(),
        endYear: v.number(),
      }),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const inc = await ctx.db.get(args.incidentId);
    if (!inc) return null;
    const timeline = await ctx.db.get(inc.timelineId);
    if (!timeline) return null;
    return {
      incident: {
        _id: inc._id,
        timelineId: inc.timelineId,
        year: inc.year,
        title: inc.title,
        description: inc.description,
        location: inc.location,
        relatedImageUrl: inc.relatedImageUrl,
        realOutcome: inc.realOutcome,
        order: inc.order,
      },
      timeline: {
        _id: timeline._id,
        title: timeline.title,
        slug: timeline.slug,
        summary: timeline.summary,
        coverImageUrl: timeline.coverImageUrl,
        startYear: timeline.startYear,
        endYear: timeline.endYear,
      },
    };
  },
});
