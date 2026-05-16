import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { branchChoice, timelineEvent } from "./validators";
import { CHAOS_CHAOTIC_THRESHOLD } from "./lib/constants";

export const patchPhase1 = internalMutation({
  args: {
    simulationId: v.id("simulations"),
    chaosScore: v.number(),
    immediateRipple: v.array(timelineEvent),
    generationalShift: v.array(timelineEvent),
    branchChoices: v.array(branchChoice),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const events = [...args.immediateRipple, ...args.generationalShift];
    await ctx.db.patch(args.simulationId, {
      chaosScore: args.chaosScore,
      events,
      branchChoices: args.branchChoices,
      isChaotic: args.chaosScore >= CHAOS_CHAOTIC_THRESHOLD,
      status: "phase1",
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const patchPhase2 = internalMutation({
  args: {
    simulationId: v.id("simulations"),
    globalConsequence: v.array(timelineEvent),
    lostToHistory: v.array(v.string()),
    gainedByHumanity: v.array(v.string()),
    relicPrompt: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const sim = await ctx.db.get(args.simulationId);
    if (!sim) throw new Error("Simulation not found");

    await ctx.db.patch(args.simulationId, {
      events: [...sim.events, ...args.globalConsequence],
      lostToHistory: args.lostToHistory,
      gainedByHumanity: args.gainedByHumanity,
      relicPrompt: args.relicPrompt,
      status: "editable",
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const patchMuseumTimeline = internalMutation({
  args: {
    simulationId: v.id("simulations"),
    chaosScore: v.number(),
    events: v.array(timelineEvent),
    lostToHistory: v.array(v.string()),
    gainedByHumanity: v.array(v.string()),
    relicPrompt: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.simulationId, {
      chaosScore: args.chaosScore,
      events: args.events,
      lostToHistory: args.lostToHistory,
      gainedByHumanity: args.gainedByHumanity,
      relicPrompt: args.relicPrompt,
      isChaotic: args.chaosScore >= CHAOS_CHAOTIC_THRESHOLD,
      status: "editable",
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const patchRelicImage = internalMutation({
  args: {
    simulationId: v.id("simulations"),
    relicImageId: v.id("_storage"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.simulationId, {
      relicImageId: args.relicImageId,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const patchChaos = internalMutation({
  args: {
    simulationId: v.id("simulations"),
    chaosScore: v.number(),
    events: v.array(timelineEvent),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.simulationId, {
      chaosScore: args.chaosScore,
      events: args.events,
      isChaotic: args.chaosScore >= CHAOS_CHAOTIC_THRESHOLD,
      updatedAt: Date.now(),
    });
    return null;
  },
});
