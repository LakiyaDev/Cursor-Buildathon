"use node";

import { action } from "../_generated/server";
import { api, internal } from "../_generated/api";
import { v } from "convex/values";
import { demoStabilizeWin, isDemoMode } from "../lib/demo";
import { CHAOS_WIN_THRESHOLD } from "../lib/constants";
import { generateJson } from "../lib/gemini";
import type { TimelineEvent } from "../types/contracts";

export const startChallenge = action({
  args: {
    simulationId: v.id("simulations"),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({
    correctiveChoices: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
      }),
    ),
  }),
  handler: async (
    ctx,
    args,
  ): Promise<{
    correctiveChoices: { id: string; title: string; description: string }[];
  }> => {
    if (isDemoMode(args.demo)) {
      return { correctiveChoices: demoStabilizeWin.challengeStart.correctiveChoices };
    }

    const sim = await ctx.runQuery(api.simulations.getPublic, {
      simulationId: args.simulationId,
    });
    if (!sim) throw new Error("Simulation not found");

    const data = await generateJson<{ correctiveChoices: typeof demoStabilizeWin.challengeStart.correctiveChoices }>(
      `Return JSON with 5 correctiveChoices: { id, title, description } to reduce chaos on this timeline.`,
      `Chaotic timeline chaos ${sim.chaosScore}. Events: ${sim.events.map((e: { title: string }) => e.title).join("; ")}`,
    );

    return { correctiveChoices: data.correctiveChoices };
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
    demo: v.optional(v.boolean()),
  },
  returns: v.object({
    resultingChaosScore: v.number(),
    won: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const sim = await ctx.runQuery(api.simulations.getPublic, {
      simulationId: args.simulationId,
    });
    if (!sim) throw new Error("Simulation not found");

    let resultingChaosScore: number;
    let events = sim.events;

    if (isDemoMode(args.demo)) {
      resultingChaosScore = demoStabilizeWin.result.resultingChaosScore;
      if (demoStabilizeWin.result.eventsPatch) {
        events = [
          ...sim.events,
          ...(demoStabilizeWin.result.eventsPatch as TimelineEvent[]),
        ];
      }
    } else {
      const selected = args.correctiveChoices.filter((c) =>
        args.selectedChoiceIds.includes(c.id),
      );
      const data = await generateJson<{ resultingChaosScore: number }>(
        `Given chaotic timeline and fixes, return JSON { resultingChaosScore: number 0-100 }. Good fixes lower score.`,
        `Current chaos: ${sim.chaosScore}. Fixes applied: ${selected.map((c) => c.title).join(", ")}`,
      );
      resultingChaosScore = Math.min(100, Math.max(0, data.resultingChaosScore));
    }

    const won = resultingChaosScore < CHAOS_WIN_THRESHOLD;

    await ctx.runMutation(internal.simulationsInternal.patchChaos, {
      simulationId: args.simulationId,
      chaosScore: resultingChaosScore,
      events,
    });

    return { resultingChaosScore, won };
  },
});
