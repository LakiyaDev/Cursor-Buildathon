"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { demoMuseum, isDemoMode } from "../lib/demo";
import { generateJsonWithImages } from "../lib/gemini";

const visionResult = v.object({
  artifactName: v.string(),
  artifactType: v.string(),
  labelText: v.string(),
  estimatedEra: v.string(),
  historicalContext: v.string(),
  confidence: v.number(),
});

export const run = action({
  args: {
    scanId: v.id("museumScans"),
    demo: v.optional(v.boolean()),
  },
  returns: visionResult,
  handler: async (ctx, args): Promise<{
    artifactName: string;
    artifactType: string;
    labelText: string;
    estimatedEra: string;
    historicalContext: string;
    confidence: number;
  }> => {
    if (isDemoMode(args.demo)) {
      const data = demoMuseum.vision;
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
    }

    const scan = await ctx.runQuery(internal.museumScansInternal.getScanUrls, {
      scanId: args.scanId,
    });
    if (!scan) throw new Error("Scan not found");

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    const data = await generateJsonWithImages<{
      artifactName: string;
      artifactType: string;
      labelText: string;
      estimatedEra: string;
      historicalContext: string;
      confidence: number;
    }>(
      `Analyze museum artifact and label photos. Return JSON: { artifactName, artifactType, labelText, estimatedEra, historicalContext, confidence 0-1 }`,
      [
        { text: "Artifact photo:" },
        { imageUrl: scan.artifactUrl.startsWith("http") ? scan.artifactUrl : `${siteUrl}${scan.artifactUrl}` },
        { text: "Museum label photo:" },
        { imageUrl: scan.labelUrl.startsWith("http") ? scan.labelUrl : `${siteUrl}${scan.labelUrl}` },
      ],
    );

    await ctx.runMutation(internal.museumScansInternal.patchAnalyzed, {
      scanId: args.scanId,
      extractedArtifactName: data.artifactName,
      extractedLabelText: data.labelText,
      extractedEra: data.estimatedEra,
    });

    return data;
  },
});
