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
    }),
  ),
  handler: async (ctx) => {
    const timelines = await ctx.db.query("predefinedTimelines").collect();
    return timelines.map((t) => ({
      _id: t._id,
      title: t.title,
      slug: t.slug,
      summary: t.summary,
      coverImageUrl: t.coverImageUrl,
      startYear: t.startYear,
      endYear: t.endYear,
    }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(
    v.object({
      timeline: v.object({
        _id: v.id("predefinedTimelines"),
        title: v.string(),
        slug: v.string(),
        summary: v.string(),
        coverImageUrl: v.string(),
        startYear: v.number(),
        endYear: v.number(),
      }),
      incidents: v.array(
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
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const timeline = await ctx.db
      .query("predefinedTimelines")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!timeline) return null;

    const incidents = await ctx.db
      .query("timelineIncidents")
      .withIndex("by_timeline_order", (q) => q.eq("timelineId", timeline._id))
      .collect();

    const mappedIncidents = incidents.map((inc) => ({
      _id: inc._id,
      year: inc.year,
      title: inc.title,
      description: inc.description,
      location: inc.location,
      relatedImageUrl: inc.relatedImageUrl,
      realOutcome: inc.realOutcome,
      order: inc.order,
    }));

    return {
      timeline: {
        _id: timeline._id,
        title: timeline.title,
        slug: timeline.slug,
        summary: timeline.summary,
        coverImageUrl: timeline.coverImageUrl,
        startYear: timeline.startYear,
        endYear: timeline.endYear,
      },
      incidents: mappedIncidents,
    };
  },
});
