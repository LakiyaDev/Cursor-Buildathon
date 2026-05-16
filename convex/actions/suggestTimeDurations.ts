"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { demoDurationOptions } from "../seed/demoData";

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
  args: { scanId: v.id("museumScans") },
  returns: durationOptionsResult,
  handler: async () => {
    return demoDurationOptions;
  },
});
