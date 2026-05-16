import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, ".env.local");
const dest = path.join(root, "frontend", ".env.local");

if (!fs.existsSync(src)) {
  console.warn("sync-env: no .env.local at repo root — run npx convex dev first");
  process.exit(0);
}

fs.copyFileSync(src, dest);
console.log("sync-env: copied .env.local → frontend/.env.local");
