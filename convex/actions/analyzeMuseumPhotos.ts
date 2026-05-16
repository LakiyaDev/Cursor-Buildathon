"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoVisionAnalyze } from "../seed/demoData";

const visionResult = v.object({
  artifactName: v.string(),
  artifactType: v.string(),
  labelText: v.string(),
  estimatedEra: v.string(),
  historicalContext: v.string(),
  confidence: v.number(),
});

export const run = action({
  args: { scanId: v.id("museumScans") },
  returns: visionResult,
  handler: async (ctx, args) => {
    const data = demoVisionAnalyze;
    await ctx.runMutation(internal.museumScansInternal.patchAnalyzed, {
      scanId: args.scanId,
      extractedArtifactName: data.artifactName,
      extractedLabelText: data.labelText,
      extractedEra: data.estimatedEra,
    });
    return {
      artifactName: data.artifactName,
      artifactType: data.artifactType,
      labelText: data.labelText,
      estimatedEra: data.estimatedEra,
      historicalContext: data.historicalContext,
      confidence: data.confidence,
    };
  },
});
