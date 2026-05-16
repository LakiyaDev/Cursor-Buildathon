"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoMuseum, isDemoMode } from "../lib/demo";
import { generateJson } from "../lib/gemini";
import type { TimelineEvent } from "../types/contracts";

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    durationId: v.string(),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({ ok: v.boolean() }),
  handler: async (ctx, args) => {
    if (isDemoMode(args.demo)) {
      const t = demoMuseum.timeline;
      await ctx.runMutation(internal.simulationsInternal.patchMuseumTimeline, {
        simulationId: args.simulationId,
        chaosScore: t.chaosScore,
        events: t.events as TimelineEvent[],
        lostToHistory: t.lostToHistory,
        gainedByHumanity: t.gainedByHumanity,
        relicPrompt: t.relicPrompt,
      });
      return { ok: true };
    }

    const duration = demoMuseum.durations.options.find((o) => o.id === args.durationId);

    const data = await generateJson<{
      chaosScore: number;
      events: typeof demoMuseum.timeline.events;
      lostToHistory: string[];
      gainedByHumanity: string[];
      relicPrompt: string;
    }>(
      `Generate alternate timeline JSON: { chaosScore, events[], lostToHistory[], gainedByHumanity[], relicPrompt }`,
      `Museum artifact timeline span: ${duration?.label ?? args.durationId} (${duration?.description ?? ""})`,
    );

    await ctx.runMutation(internal.simulationsInternal.patchMuseumTimeline, {
      simulationId: args.simulationId,
      chaosScore: data.chaosScore,
      events: data.events as TimelineEvent[],
      lostToHistory: data.lostToHistory,
      gainedByHumanity: data.gainedByHumanity,
      relicPrompt: data.relicPrompt,
    });
    return { ok: true };
  },
});
