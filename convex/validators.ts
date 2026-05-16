import { v } from "convex/values";

export const impactLevel = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
);

export const timelineEvent = v.object({
  year: v.string(),
  title: v.string(),
  description: v.string(),
  impactLevel,
});

export const branchChoice = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
});

export const simulationSource = v.union(
  v.literal("museum"),
  v.literal("curated"),
);

export const simulationStatus = v.union(
  v.literal("draft"),
  v.literal("analyzing"),
  v.literal("generating"),
  v.literal("phase1"),
  v.literal("phase2"),
  v.literal("editable"),
  v.literal("saved"),
  v.literal("published"),
);

export const visibility = v.union(v.literal("private"), v.literal("public"));

export const museumScanStatus = v.union(
  v.literal("uploaded"),
  v.literal("analyzed"),
  v.literal("confirmed"),
);
