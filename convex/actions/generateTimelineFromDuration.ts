"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoPhase1, demoPhase2 } from "../seed/demoData";

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    durationId: v.string(),
  },
  returns: v.object({ ok: v.boolean() }),
  handler: async (ctx, args) => {
    const events = [
      ...demoPhase1.immediateRipple,
      ...demoPhase1.generationalShift,
      ...demoPhase2.globalConsequence,
    ];
    await ctx.runMutation(internal.simulationsInternal.patchMuseumTimeline, {
      simulationId: args.simulationId,
      chaosScore: demoPhase1.chaosScore,
      events,
      lostToHistory: demoPhase2.lostToHistory,
      gainedByHumanity: demoPhase2.gainedByHumanity,
      relicPrompt: demoPhase2.relicPrompt,
    });
    return { ok: true };
  },
});
