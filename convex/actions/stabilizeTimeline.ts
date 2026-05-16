"use node";

import { action } from "../_generated/server";
import { api, internal } from "../_generated/api";
import { v } from "convex/values";
import { demoStabilizeChoices } from "../seed/demoData";
import { CHAOS_WIN_THRESHOLD } from "../lib/constants";

export const startChallenge = action({
  args: { simulationId: v.id("simulations") },
  returns: v.object({
    correctiveChoices: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
      }),
    ),
  }),
  handler: async () => {
    return { correctiveChoices: demoStabilizeChoices };
  },
});

export const submitFixes = action({
  args: {
    simulationId: v.id("simulations"),
    selectedChoiceIds: v.array(v.string()),
    correctiveChoices: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
      }),
    ),
  },
  returns: v.object({
    resultingChaosScore: v.number(),
    won: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const resultingChaosScore = 32;
    const won = resultingChaosScore < CHAOS_WIN_THRESHOLD;

    const sim = await ctx.runQuery(api.simulations.getPublic, {
      simulationId: args.simulationId,
    });
    if (!sim) throw new Error("Simulation not found");

    await ctx.runMutation(internal.simulationsInternal.patchChaos, {
      simulationId: args.simulationId,
      chaosScore: resultingChaosScore,
      events: sim.events,
    });

    return { resultingChaosScore, won };
  },
});
