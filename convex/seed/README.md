# Seed data — Sri Lankan kingdoms + World War I

JSON files in this folder are loaded by `convex/seed/run.ts`. Image files live in `public/seed/` — see `public/seed/IMAGE_MANIFEST.md`.

### Run seed (dev)

```bash
npx convex dev          # or: npx convex dev --once
npx convex run seed/run:run '{"reset": true}'
npx convex run incidents:countAll
npx convex run timelines:list
```

Expected: **4 timelines**, **11 incidents** (3 + 2 + 2 + 4 by slug). Verify in the [Convex dashboard](https://dashboard.convex.dev) → **Data** → `predefinedTimelines`, `timelineIncidents`.

## Timeline ↔ incident mapping

When inserting `timelineIncidents`, attach each row by `order` (from `incidents.json`):

| `order` | `timelineId` slug |
|---------|-------------------|
| 1–3 | `anuradhapura` |
| 4–5 | `polonnaruwa` |
| 6–7 | `mahanuwara` |
| 8–11 | `wwi` |

Set `relatedImageUrl` to `/seed/<filename>.jpg` per IMAGE_MANIFEST.

## Golden demo

- **Curated:** `demoSimulation.json` — Kandyan Convention alternate (chaos 78)
- **Museum (`?demo=1`):** `demoMuseum.json` — vision + durations + timeline for `public/demo-museum/*` (pick **75 years** / `dur_3` on stage)
- **Stabilize (`?demo=1`):** `demoStabilizeWin.json` — chaos 88 → 32, `won: true` (choices `fix_2` + `fix_4`)
- **Judge script:** `DEMO.md` at repo root
