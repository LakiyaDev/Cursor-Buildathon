"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";

/** Stub — Person B wires Gemini image generation. */
export const run = action({
  args: { simulationId: v.id("simulations") },
  returns: v.object({ ok: v.boolean(), skipped: v.boolean() }),
  handler: async () => {
    return { ok: true, skipped: true };
  },
});
