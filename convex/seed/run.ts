import { internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { CHAOS_CHAOTIC_THRESHOLD } from "../lib/constants";
import { demoPhase1, demoPhase2 } from "./demoData";

export const seedAll = internalMutation({
  args: {},
  returns: v.object({
    timelineIds: v.array(v.id("predefinedTimelines")),
    publishedSimulationId: v.optional(v.id("simulations")),
  }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("predefinedTimelines").first();
    if (existing) {
      return { timelineIds: [], publishedSimulationId: undefined };
    }

    const now = Date.now();

    const wwiId = await ctx.db.insert("predefinedTimelines", {
      title: "World War I",
      slug: "world-war-i",
      summary:
        "The Great War reshaped nations, empires, and the modern world through industrial-scale conflict.",
      coverImageUrl: "/seed/wwi.jpg",
      startYear: 1914,
      endYear: 1918,
      createdAt: now,
    });

    const wwiiId = await ctx.db.insert("predefinedTimelines", {
      title: "World War II",
      slug: "world-war-ii",
      summary:
        "A global struggle that redefined borders, technology, and the moral stakes of total war.",
      coverImageUrl: "/seed/wwii.jpg",
      startYear: 1939,
      endYear: 1945,
      createdAt: now,
    });

    const ferdinandId = await ctx.db.insert("timelineIncidents", {
      timelineId: wwiId,
      year: "1914",
      title: "Assassination of Archduke Franz Ferdinand",
      description:
        "The heir to Austria-Hungary is shot in Sarajevo, triggering a chain of alliances and mobilizations.",
      location: "Sarajevo",
      realOutcome:
        "Austria-Hungary declared war on Serbia; Europe slid into World War I within weeks.",
      order: 1,
    });

    await ctx.db.insert("timelineIncidents", {
      timelineId: wwiId,
      year: "1915",
      title: "Sinking of the Lusitania",
      description:
        "A British liner is torpedoed by a German U-boat, killing civilians including Americans.",
      location: "Atlantic Ocean",
      realOutcome: "Anger grew in the United States; Germany later restricted submarine warfare.",
      order: 2,
    });

    await ctx.db.insert("timelineIncidents", {
      timelineId: wwiiId,
      year: "1939",
      title: "Invasion of Poland",
      description: "Germany launches a blitzkrieg invasion, drawing Britain and France into war.",
      location: "Poland",
      realOutcome: "World War II in Europe began; Poland was partitioned within weeks.",
      order: 1,
    });

    await ctx.db.insert("timelineIncidents", {
      timelineId: wwiiId,
      year: "1941",
      title: "Attack on Pearl Harbor",
      description: "Japan strikes the U.S. naval base, destroying much of the Pacific fleet.",
      location: "Pearl Harbor, Hawaii",
      realOutcome: "The United States entered World War II against Japan and its allies.",
      order: 2,
    });

    const demoUser = await ctx.db.query("users").first();
    let publishedSimulationId = undefined;

    if (demoUser) {
      const simId = await ctx.db.insert("simulations", {
        userId: demoUser._id,
        source: "curated",
        originalTimelineId: wwiId,
        changedIncidentId: ferdinandId,
        whatIfPrompt:
          "The assassin hesitates and the motorcade escapes Sarajevo.",
        events: [
          ...demoPhase1.immediateRipple,
          ...demoPhase1.generationalShift,
          ...demoPhase2.globalConsequence,
        ],
        chaosScore: 88,
        lostToHistory: demoPhase2.lostToHistory,
        gainedByHumanity: demoPhase2.gainedByHumanity,
        branchChoices: demoPhase1.branchChoices,
        selectedBranchId: "branch_1",
        relicPrompt: demoPhase2.relicPrompt,
        isChaotic: true,
        status: "published",
        visibility: "public",
        createdAt: now,
        updatedAt: now,
      });

      await ctx.db.insert("publishedTimelines", {
        simulationId: simId,
        authorId: demoUser._id,
        title: "The Sarajevo Escape",
        description:
          "What if Franz Ferdinand survived? A high-chaos timeline for the stabilize game.",
        chaosScore: 88,
        createdAt: now,
      });

      publishedSimulationId = simId;
    }

    void CHAOS_CHAOTIC_THRESHOLD;

    return {
      timelineIds: [wwiId, wwiiId],
      publishedSimulationId,
    };
  },
});
