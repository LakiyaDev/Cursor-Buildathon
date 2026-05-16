import { internalMutation } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { v } from "convex/values";
import { CHAOS_CHAOTIC_THRESHOLD } from "../lib/constants";
import { demoPhase1, demoPhase2 } from "./demoData";
import timelinesData from "./timelines.json";
import incidentsData from "./incidents.json";

const INCIDENT_IMAGES: Record<number, string> = {
  1: "/seed/arahat-mahinda.jpg",
  2: "/seed/battle-vijithapura.jpg",
  3: "/seed/chola-invasion.jpg",
  4: "/seed/parakramabahu.jpg",
  5: "/seed/kalinga-magha.jpg",
  6: "/seed/battle-danture.jpg",
  7: "/seed/kandyan-convention.jpg",
  8: "/seed/franz-ferdinand.jpg",
  9: "/seed/lusitania.jpg",
  10: "/seed/zimmermann-telegram.jpg",
  11: "/seed/treaty-versailles.jpg",
  12: "/seed/julius-caesar.jpg",
  13: "/seed/edict-milan.jpg",
  14: "/seed/fall-of-rome.jpg",
};

function timelineSlugForOrder(order: number): string {
  if (order <= 3) return "anuradhapura";
  if (order <= 5) return "polonnaruwa";
  if (order <= 7) return "mahanuwara";
  if (order <= 11) return "wwi";
  return "roman-empire";
}

type TimelineRow = (typeof timelinesData)[number];
type IncidentRow = (typeof incidentsData)[number];

export const seedAll = internalMutation({
  args: { force: v.optional(v.boolean()) },
  returns: v.object({
    timelineIds: v.array(v.id("predefinedTimelines")),
    publishedSimulationIds: v.array(v.id("simulations")),
    skipped: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("predefinedTimelines").collect();
    if (existing.length >= 5 && !args.force) {
      return { timelineIds: [], publishedSimulationIds: [], skipped: true };
    }

    if (args.force && existing.length > 0) {
      for (const t of existing) {
        const incidents = await ctx.db
          .query("timelineIncidents")
          .withIndex("by_timeline_order", (q) => q.eq("timelineId", t._id))
          .collect();
        for (const inc of incidents) {
          await ctx.db.delete(inc._id);
        }
        await ctx.db.delete(t._id);
      }
      const published = await ctx.db.query("publishedTimelines").collect();
      for (const p of published) {
        const sim = await ctx.db.get(p.simulationId);
        await ctx.db.delete(p._id);
        if (sim) await ctx.db.delete(sim._id);
      }
    }

    const now = Date.now();
    const slugToId = new Map<string, Id<"predefinedTimelines">>();

    for (const row of timelinesData as TimelineRow[]) {
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

    const incidentIds = new Map<number, Id<"timelineIncidents">>();

    for (const row of incidentsData as IncidentRow[]) {
      const slug = timelineSlugForOrder(row.order);
      const timelineId = slugToId.get(slug);
      if (!timelineId) continue;

      const id = await ctx.db.insert("timelineIncidents", {
        timelineId,
        year: row.year,
        title: row.title,
        description: row.description,
        location: row.location,
        relatedImageUrl: INCIDENT_IMAGES[row.order],
        realOutcome: row.realOutcome,
        order: row.order,
      });
      incidentIds.set(row.order, id);
    }

    const publishedSimulationIds: Id<"simulations">[] = [];
    const demoUser = await ctx.db.query("users").first();

    if (demoUser) {
      const wwiId = slugToId.get("wwi")!;
      const mahanuwaraId = slugToId.get("mahanuwara")!;
      const polonnaruwaId = slugToId.get("polonnaruwa")!;
      const ferdinandId = incidentIds.get(8)!;
      const conventionId = incidentIds.get(7)!;
      const maghaId = incidentIds.get(5)!;

      const publishes = [
        {
          title: "The Convention Reversed",
          description:
            "What if Kandyan chieftains refused the 1815 treaty? A chaotic alternate Sri Lanka.",
          chaosScore: 88,
          timelineId: mahanuwaraId,
          incidentId: conventionId,
          whatIf:
            "The chieftains tear up the Kandyan Convention and rally behind the king against the British.",
        },
        {
          title: "Magha's Eternal Reign",
          description:
            "Polonnaruwa never recovers from Kalinga Magha — the kingdom fractures for generations.",
          chaosScore: 91,
          timelineId: polonnaruwaId,
          incidentId: maghaId,
          whatIf:
            "Kalinga Magha consolidates rule instead of triggering migration, halting Sinhalese revival.",
        },
        {
          title: "The Sarajevo Escape",
          description:
            "Franz Ferdinand survives 1914 — Europe stumbles toward a different catastrophe.",
          chaosScore: 88,
          timelineId: wwiId,
          incidentId: ferdinandId,
          whatIf: "The assassin hesitates and the motorcade escapes Sarajevo.",
        },
      ];

      for (const pub of publishes) {
        const simId = await ctx.db.insert("simulations", {
          userId: demoUser._id,
          source: "curated",
          originalTimelineId: pub.timelineId,
          changedIncidentId: pub.incidentId,
          whatIfPrompt: pub.whatIf,
          events: [
            ...demoPhase1.immediateRipple,
            ...demoPhase1.generationalShift,
            ...demoPhase2.globalConsequence,
          ],
          immediateRipple: demoPhase1.immediateRipple,
          generationalShift: demoPhase1.generationalShift,
          globalConsequence: demoPhase2.globalConsequence,
          chaosScore: pub.chaosScore,
          lostToHistory: demoPhase2.lostToHistory,
          gainedByHumanity: demoPhase2.gainedByHumanity,
          branchChoices: demoPhase1.branchChoices,
          selectedBranchId: "branch_1",
          relicPrompt: demoPhase2.relicPrompt,
          isChaotic: pub.chaosScore >= CHAOS_CHAOTIC_THRESHOLD,
          status: "published",
          visibility: "public",
          createdAt: now,
          updatedAt: now,
        });

        await ctx.db.insert("publishedTimelines", {
          simulationId: simId,
          authorId: demoUser._id,
          title: pub.title,
          description: pub.description,
          chaosScore: pub.chaosScore,
          createdAt: now,
        });

        publishedSimulationIds.push(simId);
      }
    }

    return {
      timelineIds: [...slugToId.values()],
      publishedSimulationIds,
      skipped: false,
    };
  },
});
