"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoPhase1 } from "../seed/demoData";
import { isDemoMode } from "../lib/demo";
import { pickDemoPhase1 } from "../lib/demoFixtures";
import { generateJson } from "../lib/gemini";
import { isGeminiQuotaError } from "../lib/geminiErrors";

const phase1Schema = `Return JSON: {
  "chaosScore": number 0-100,
  "immediateRipple": [{ "year": string, "title": string, "description": string, "impactLevel": "low"|"medium"|"high" }],
  "generationalShift": [{ "year": string, "title": string, "description": string, "impactLevel": "low"|"medium"|"high" }],
  "branchChoices": [{ "id": string, "title": string, "description": string }]
}`;

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({ ok: v.boolean(), usedDemoFallback: v.optional(v.boolean()) }),
  handler: async (ctx, args) => {
    const context = await ctx.runQuery(internal.simulationsInternal.getGenerationContext, {
      simulationId: args.simulationId,
    });
    if (!context) throw new Error("Simulation context not found");

    const fixtureCtx = {
      timelineSlug: context.timelineSlug,
      incidentTitle: context.incidentTitle,
      incidentYear: context.incidentYear,
    };

    const applyDemo = async () => {
      const fixtures = pickDemoPhase1(fixtureCtx);
      await ctx.runMutation(internal.simulationsInternal.patchPhase1, {
        simulationId: args.simulationId,
        chaosScore: fixtures.chaosScore,
        immediateRipple: fixtures.immediateRipple,
        generationalShift: fixtures.generationalShift,
        branchChoices: fixtures.branchChoices,
      });
    };

    if (isDemoMode(args.demo)) {
      await applyDemo();
      return { ok: true };
    }

    try {
      const data = await generateJson<{
        chaosScore: number;
        immediateRipple: typeof demoPhase1.immediateRipple;
        generationalShift: typeof demoPhase1.generationalShift;
        branchChoices: typeof demoPhase1.branchChoices;
      }>(
        `You are an alternate-history engine. ${phase1Schema}. Be specific to the incident and what-if.`,
        `Incident (${context.incidentYear}): ${context.incidentTitle}
${context.incidentDescription}
Real outcome: ${context.realOutcome}
What if: ${context.whatIfPrompt}`,
      );

      await ctx.runMutation(internal.simulationsInternal.patchPhase1, {
        simulationId: args.simulationId,
        chaosScore: Math.min(100, Math.max(0, data.chaosScore)),
        immediateRipple: data.immediateRipple,
        generationalShift: data.generationalShift,
        branchChoices: data.branchChoices,
      });
      return { ok: true };
    } catch (err) {
      if (isGeminiQuotaError(err)) {
        console.warn(
          `[AltEra] Gemini quota exceeded — using timeline demo fixtures (${fixtureCtx.timelineSlug ?? "inferred"})`,
        );
        await applyDemo();
        return { ok: true, usedDemoFallback: true };
      }
      throw err;
    }
  },
});
