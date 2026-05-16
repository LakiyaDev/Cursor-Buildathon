import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

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
