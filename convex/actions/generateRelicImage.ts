"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { generateRelicPng } from "../lib/gemini";

export const run = action({
  args: {
    simulationId: v.id("simulations"),
    demo: v.optional(v.boolean()),
  },
  returns: v.object({ ok: v.boolean(), skipped: v.boolean() }),
  handler: async (ctx, args) => {
    const sim = await ctx.runQuery(internal.simulationsInternal.getGenerationContext, {
      simulationId: args.simulationId,
    });
    if (!sim) throw new Error("Simulation not found");

    const prompt =
      "Alternate history museum relic photograph, archival lighting: " +
      (args.demo ? "Kandyan royal seal from a timeline where the Convention failed" : "historical artifact from divergent timeline");

    const png = await generateRelicPng(prompt);
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
