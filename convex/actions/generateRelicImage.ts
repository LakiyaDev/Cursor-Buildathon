"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { isDemoMode } from "../lib/demo";
import { demoPhase2 } from "../seed/demoData";
import { generateRelicPng } from "../lib/gemini";
import { isGeminiQuotaError } from "../lib/geminiErrors";

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({ ok: v.boolean(), skipped: v.boolean() }),
  handler: async (ctx, args) => {
    const relicPrompt = await ctx.runQuery(internal.simulationsInternal.getRelicPrompt, {
      simulationId: args.simulationId,
    });
    if (!relicPrompt && !isDemoMode(args.demo)) {
      throw new Error("Simulation not ready for relic generation");
    }

    const prompt =
      "Alternate history museum relic photograph, archival lighting: " +
      (relicPrompt ?? demoPhase2.relicPrompt);

    let png: Uint8Array | null = null;
    try {
      png = await generateRelicPng(prompt);
    } catch (err) {
      if (!isGeminiQuotaError(err)) throw err;
    }
    if (!png) {
      return { ok: true, skipped: true };
    }

    const blob = new Blob([Buffer.from(png)], { type: "image/png" });
    const storageId = await ctx.storage.store(blob);

    await ctx.runMutation(internal.simulationsInternal.patchRelicImage, {
      simulationId: args.simulationId,
      relicImageId: storageId,
    });

    return { ok: true, skipped: false };
  },
});
