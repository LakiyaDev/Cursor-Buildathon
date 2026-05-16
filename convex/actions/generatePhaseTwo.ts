"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoPhase2 } from "../seed/demoData";
import { isDemoMode } from "../lib/demo";
import { generateJson } from "../lib/gemini";

const phase2Schema = `Return JSON: {
  "globalConsequence": [{ "year": string, "title": string, "description": string, "impactLevel": "low"|"medium"|"high" }],
  "lostToHistory": string[],
  "gainedByHumanity": string[],
  "relicPrompt": string
}`;

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({ ok: v.boolean() }),
  handler: async (ctx, args) => {
    if (isDemoMode(args.demo)) {
      await ctx.runMutation(internal.simulationsInternal.patchPhase2, {
        simulationId: args.simulationId,
        ...demoPhase2,
      });
      return { ok: true };
    }

    const context = await ctx.runQuery(internal.simulationsInternal.getGenerationContext, {
      simulationId: args.simulationId,
    });
    if (!context) throw new Error("Simulation context not found");

    const data = await generateJson<typeof demoPhase2>(
      `You are an alternate-history engine. ${phase2Schema}. relicPrompt describes a museum artifact photo.`,
      `Incident: ${context.incidentTitle}
What if: ${context.whatIfPrompt}
Chosen branch: ${context.selectedBranchTitle ?? context.selectedBranchId}
Prior chaos: ${context.chaosScore ?? "unknown"}`,
    );

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
