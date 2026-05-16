import { mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";
import timelinesData from "./timelines.json";
import incidentsData from "./incidents.json";
import { imageForOrder, slugForOrder } from "./incidentImages";

type TimelineSeed = {
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  startYear: number;
  endYear: number;
};

type IncidentSeed = {
  year: string;
  title: string;
  description: string;
  location?: string;
  realOutcome: string;
  order: number;
};

export const run = mutation({
  args: {
    reset: v.optional(v.boolean()),
  },
  returns: v.object({
    skipped: v.boolean(),
    message: v.string(),
    timelineCount: v.number(),
    incidentCount: v.number(),
    timelines: v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        incidentCount: v.number(),
      }),
    ),
  }),
  handler: async (ctx, args) => {
    if (args.reset) {
      for (const incident of await ctx.db.query("timelineIncidents").collect()) {
        await ctx.db.delete(incident._id);
      }
      for (const timeline of await ctx.db.query("predefinedTimelines").collect()) {
        await ctx.db.delete(timeline._id);
      }
    } else {
      const existing = await ctx.db.query("predefinedTimelines").first();
      if (existing) {
        const timelineCount = (
          await ctx.db.query("predefinedTimelines").collect()
        ).length;
        const incidentCount = (
          await ctx.db.query("timelineIncidents").collect()
        ).length;
        return {
          skipped: true,
          message:
            "Already seeded. Run with { reset: true } to clear and re-seed.",
          timelineCount,
          incidentCount,
          timelines: [],
        };
      }
    }

    const now = Date.now();
    const slugToId = new Map<string, Id<"predefinedTimelines">>();

    for (const row of timelinesData as TimelineSeed[]) {
      const id = await ctx.db.insert("predefinedTimelines", {
        title: row.title,
        slug: row.slug,
        summary: row.summary,
        coverImageUrl: row.coverImageUrl,
        startYear: row.startYear,
        endYear: row.endYear,
        createdAt: now,
      });
      slugToId.set(row.slug, id);
    }

    const incidentCounts = new Map<string, number>();

    for (const row of incidentsData as IncidentSeed[]) {
      const slug = slugForOrder(row.order);
      const timelineId = slugToId.get(slug);
      if (!timelineId) {
        throw new Error(`Unknown timeline slug "${slug}" for order ${row.order}`);
      }

      await ctx.db.insert("timelineIncidents", {
        timelineId,
        year: row.year,
        title: row.title,
        description: row.description,
        location: row.location,
        relatedImageUrl: imageForOrder(row.order),
        realOutcome: row.realOutcome,
        order: row.order,
      });

      incidentCounts.set(slug, (incidentCounts.get(slug) ?? 0) + 1);
    }

    const timelines = (timelinesData as TimelineSeed[]).map((t) => ({
      slug: t.slug,
      title: t.title,
      incidentCount: incidentCounts.get(t.slug) ?? 0,
    }));

    return {
      skipped: false,
      message: `Seeded ${timelines.length} timelines and ${(incidentsData as IncidentSeed[]).length} incidents.`,
      timelineCount: timelines.length,
      incidentCount: (incidentsData as IncidentSeed[]).length,
      timelines,
    };
  },
});
