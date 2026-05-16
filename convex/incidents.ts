import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { incidentId: v.id("timelineIncidents") },
  returns: v.union(
    v.object({
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
    v.null(),
  ),
  handler: async (ctx, args) => {
    const inc = await ctx.db.get(args.incidentId);
    if (!inc) return null;
    return {
      _id: inc._id,
      timelineId: inc.timelineId,
      year: inc.year,
      title: inc.title,
      description: inc.description,
      location: inc.location,
      relatedImageUrl: inc.relatedImageUrl,
      realOutcome: inc.realOutcome,
      order: inc.order,
    };
  },
});
