import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./lib/auth";
import { branchChoice } from "./validators";
import { CHAOS_WIN_THRESHOLD } from "./lib/constants";

export const recordAttempt = mutation({
  args: {
    targetSimulationId: v.id("simulations"),
    correctiveChoices: v.array(branchChoice),
    selectedChoiceIds: v.array(v.string()),
    resultingChaosScore: v.number(),
  },
  returns: v.object({
    won: v.boolean(),
    attemptId: v.id("stabilizationAttempts"),
  }),
  handler: async (ctx, args) => {
    const playerId = await requireUserId(ctx);
    const target = await ctx.db.get(args.targetSimulationId);
    if (!target || target.visibility !== "public") {
      throw new Error("Target simulation not available");
    }

    const won = args.resultingChaosScore < CHAOS_WIN_THRESHOLD;

    const attemptId = await ctx.db.insert("stabilizationAttempts", {
      playerId,
      targetSimulationId: args.targetSimulationId,
      correctiveChoices: args.correctiveChoices,
      selectedChoiceIds: args.selectedChoiceIds,
      resultingChaosScore: args.resultingChaosScore,
      won,
      createdAt: Date.now(),
    });

    if (won) {
      const stats = await ctx.db
        .query("playerStats")
        .withIndex("by_user", (q) => q.eq("userId", playerId))
        .unique();

      if (stats) {
        await ctx.db.patch(stats._id, {
          stabilizeWins: stats.stabilizeWins + 1,
        });
      } else {
        await ctx.db.insert("playerStats", {
          userId: playerId,
          stabilizeWins: 1,
          chaosPublished: 0,
          totalSimulations: 0,
        });
      }
    }

    return { won, attemptId };
  },
});
