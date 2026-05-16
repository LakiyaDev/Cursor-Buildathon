import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./lib/auth";

export const start = mutation({
  args: {
    originalSimulationId: v.id("simulations"),
    changedIncidentId: v.optional(v.id("timelineIncidents")),
    newWhatIfPrompt: v.optional(v.string()),
    source: v.union(v.literal("museum"), v.literal("curated")),
  },
  returns: v.id("simulations"),
  handler: async (ctx, args) => {
    const remixAuthorId = await requireUserId(ctx);
    const original = await ctx.db.get(args.originalSimulationId);
    if (!original || original.visibility !== "public") {
      throw new Error("Original simulation not found or not public");
    }

    const now = Date.now();
    const remixedSimulationId = await ctx.db.insert("simulations", {
      userId: remixAuthorId,
      source: args.source,
      originalTimelineId: original.originalTimelineId,
      changedIncidentId: args.changedIncidentId ?? original.changedIncidentId,
      whatIfPrompt: args.newWhatIfPrompt,
      museumScanId: original.museumScanId,
      events: [],
      status: "draft",
      visibility: "private",
      remixOfSimulationId: args.originalSimulationId,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("remixes", {
      originalSimulationId: args.originalSimulationId,
      remixedSimulationId,
      originalAuthorId: original.userId,
      remixAuthorId,
      changedIncidentId: args.changedIncidentId,
      newWhatIfPrompt: args.newWhatIfPrompt,
      createdAt: now,
    });

    return remixedSimulationId;
  },
});
