import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

/** Run once after deploy to populate timelines. Safe if data exists. */
export const run = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await ctx.runMutation(internal.seed.run.seedAll, {});
    return null;
  },
});
