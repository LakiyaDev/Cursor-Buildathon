import path from "path";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

const repoRoot = path.join(__dirname, "..");

// Repo-root .env.local (from `npx convex dev` at project root)
loadEnvConfig(repoRoot);

const nextConfig: NextConfig = {
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
