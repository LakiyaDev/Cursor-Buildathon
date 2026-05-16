import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

/** Run once after deploy to populate timelines. Safe if data exists. */
export const run = mutation({
  args: { force: v.optional(v.boolean()) },
  returns: v.object({
    timelineIds: v.array(v.id("predefinedTimelines")),
    publishedSimulationIds: v.array(v.id("simulations")),
    skipped: v.boolean(),
  }),
  handler: async (
    ctx,
    args,
  ): Promise<{
    timelineIds: import("./_generated/dataModel").Id<"predefinedTimelines">[];
    publishedSimulationIds: import("./_generated/dataModel").Id<"simulations">[];
    skipped: boolean;
  }> => {
    return await ctx.runMutation(internal.seed.run.seedAll, {
      force: args.force,
    });
  },
});
