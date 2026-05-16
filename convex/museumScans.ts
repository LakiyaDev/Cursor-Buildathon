import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./lib/auth";

export const create = mutation({
  args: {
    artifactImageId: v.id("_storage"),
    labelImageId: v.id("_storage"),
  },
  returns: v.id("museumScans"),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    return await ctx.db.insert("museumScans", {
      userId,
      artifactImageId: args.artifactImageId,
      labelImageId: args.labelImageId,
      status: "uploaded",
      createdAt: Date.now(),
    });
  },
});

export const get = query({
  args: { scanId: v.id("museumScans") },
  returns: v.union(
    v.object({
      _id: v.id("museumScans"),
      artifactImageId: v.id("_storage"),
      labelImageId: v.id("_storage"),
      extractedArtifactName: v.optional(v.string()),
      extractedLabelText: v.optional(v.string()),
      extractedEra: v.optional(v.string()),
      status: v.string(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const scan = await ctx.db.get(args.scanId);
    if (!scan || scan.userId !== userId) return null;
    return { ...scan, status: scan.status as string };
  },
});

export const confirmExtracted = mutation({
  args: {
    scanId: v.id("museumScans"),
    extractedArtifactName: v.string(),
    extractedLabelText: v.string(),
    extractedEra: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const scan = await ctx.db.get(args.scanId);
    if (!scan || scan.userId !== userId) throw new Error("Not found");

    await ctx.db.patch(args.scanId, {
      extractedArtifactName: args.extractedArtifactName,
      extractedLabelText: args.extractedLabelText,
      extractedEra: args.extractedEra,
      status: "confirmed",
    });
    return null;
  },
});

export const patchAnalyzed = mutation({
  args: {
    scanId: v.id("museumScans"),
    extractedArtifactName: v.string(),
    extractedLabelText: v.string(),
    extractedEra: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const scan = await ctx.db.get(args.scanId);
    if (!scan || scan.userId !== userId) throw new Error("Not found");

    await ctx.db.patch(args.scanId, {
      extractedArtifactName: args.extractedArtifactName,
      extractedLabelText: args.extractedLabelText,
      extractedEra: args.extractedEra,
      status: "analyzed",
    });
    return null;
  },
});
