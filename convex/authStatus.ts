import { query } from "./_generated/server";
import { v } from "convex/values";

export const googleOAuthConfigured = query({
  args: {},
  returns: v.boolean(),
  handler: async () => {
    return Boolean(
      process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
    );
  },
});
