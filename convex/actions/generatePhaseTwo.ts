"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoPhase2 } from "../seed/demoData";

export const run = action({
  args: { simulationId: v.id("simulations") },
  returns: v.object({ ok: v.boolean() }),
  handler: async (ctx, args) => {
    const data = demoPhase2;
    await ctx.runMutation(internal.simulationsInternal.patchPhase2, {
      simulationId: args.simulationId,
      globalConsequence: data.globalConsequence,
      lostToHistory: data.lostToHistory,
      gainedByHumanity: data.gainedByHumanity,
      relicPrompt: data.relicPrompt,
    });
    return { ok: true };
  },
});
