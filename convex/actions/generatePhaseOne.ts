"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoPhase1 } from "../seed/demoData";

export const run = action({
  args: { simulationId: v.id("simulations") },
  returns: v.object({ ok: v.boolean() }),
  handler: async (ctx, args) => {
    const data = demoPhase1;
    await ctx.runMutation(internal.simulationsInternal.patchPhase1, {
      simulationId: args.simulationId,
      chaosScore: data.chaosScore,
      immediateRipple: data.immediateRipple,
      generationalShift: data.generationalShift,
      branchChoices: data.branchChoices,
    });
    return { ok: true };
  },
});
