import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getScanUrls = internalQuery({
  args: { scanId: v.id("museumScans") },
  returns: v.union(
    v.object({
      artifactUrl: v.string(),
      labelUrl: v.string(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const scan = await ctx.db.get(args.scanId);
    if (!scan) return null;
    const artifactUrl = await ctx.storage.getUrl(scan.artifactImageId);
    const labelUrl = await ctx.storage.getUrl(scan.labelImageId);
    if (!artifactUrl || !labelUrl) return null;
    return { artifactUrl, labelUrl };
  },
});

export const patchAnalyzed = internalMutation({
  args: {
    scanId: v.id("museumScans"),
    extractedArtifactName: v.string(),
    extractedLabelText: v.string(),
    extractedEra: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.scanId, {
      extractedArtifactName: args.extractedArtifactName,
      extractedLabelText: args.extractedLabelText,
      extractedEra: args.extractedEra,
      status: "analyzed",
    });
    return null;
  },
});
