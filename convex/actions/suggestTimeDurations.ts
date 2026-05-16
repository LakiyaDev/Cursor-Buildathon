"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { demoMuseum, isDemoMode } from "../lib/demo";

const durationOptionsResult = v.object({
  options: v.array(
    v.object({
      id: v.string(),
      label: v.string(),
      spanYears: v.number(),
      description: v.string(),
    }),
  ),
});

export const run = action({
  args: {
    scanId: v.id("museumScans"),
    demo: v.optional(v.boolean()),
  },
  returns: durationOptionsResult,
  handler: async (_ctx, args) => {
    if (isDemoMode(args.demo)) {
      return demoMuseum.durations;
    }
    return demoMuseum.durations;
  },
});
