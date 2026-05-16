---
name: "Person D — Game / Content / Demo"
owner: Person D
role: Game Designer + Content + Dashboard
depends_on: Person A (schema, publish queries by h15), Person B (stabilize action by h14)
blocks: Judge narrative (demo script, seed data)
---

# Person D — Game, Content, Dashboard & Demo

**Mission:** All **seed data**, museum demo photos, global dashboard, stabilize game UX, publish/remix surfaces, player stats display, and **judge demo script**. You narrate; Person C drives UI.

**Master plan:** [altera_greenfield_plan_2f3c16dd.plan.md](./altera_greenfield_plan_2f3c16dd.plan.md)

## You work in parallel — content and game layer while others code

| Phase | You do | Others do at same time |
|-------|--------|------------------------|
| h1–4 | Write all seed JSON + demo photos | A = scaffold, B = AI stubs, C = mock UI |
| h5–9 | TEST_PROMPTS, dashboard wireframe | B = live AI, C = pages, A = upload API |
| h10–18 | Dashboard + chaotic seeds + DEMO.md | B = stabilize, C = editor, A = publish API |

**You are never “last.”** Seed + demo JSON must land by **h4** so B and C can use them.

---

## Your deliverables (Definition of Done)

- [x] `convex/seed/timelines.json` + `incidents.json` (4 timelines, 11 incidents incl. WWI)
- [x] `convex/seed/demoSimulation.json` + `demoMuseum.json` + `demoStabilizeWin.json`
- [x] `seed.run` inserts timelines + incidents (**chaotic published sims** still pending — needs full `simulations` schema)
- [x] `public/demo-museum/artifact.jpg` + `label.jpg` (pre-tested)
- [x] `public/seed/` images for timelines
- [ ] `/dashboard` — global feed with Chaos / Stabilize badges
- [x] Stabilize UI copy + WIN/LOSE states (with Person C) — `docs/STABILIZE_COPY.md` + `lib/stabilizeCopy.ts`
- [ ] `DEMO.md` — 2-minute judge script (3 beats)
- [ ] Backup screen recording of golden path
- [ ] Pre-generated relic images for seed cards (optional but recommended)

---

## Files you OWN

```txt
convex/seed/timelines.json
convex/seed/incidents.json
convex/seed/demoSimulation.json
convex/seed/demoMuseum.json
convex/seed/demoStabilizeWin.json
convex/seed/run.ts
public/seed/*
public/demo-museum/*
app/dashboard/page.tsx
components/PublishedTimelineCard.tsx
components/StabilizeChallenge.tsx
components/WinBanner.tsx
components/ChaosBadge.tsx
DEMO.md
docs/TEST_PROMPTS.md              # What-Ifs for Person B to test
docs/STABILIZE_COPY.md            # Stabilize UI strings for Person C
docs/DASHBOARD_WIREFRAME.md       # Feed + card + stabilize flow layout
lib/stabilizeCopy.ts              # Same copy as importable constants
```

**Coordinate:** `components/PublishButton.tsx` — you or Person C (decide at h0)

---

## Hour-by-hour schedule

### Hour 0

| Task | Output |
|------|--------|
| Find 1 real museum artifact pair for demo photos (or Wikimedia) | Files in `public/demo-museum/` |
| Outline Sri Lankan kingdom incidents in spreadsheet | Shared with team |
| Write 90-sec pitch opener | Slack pin |

### Hours 1–4

1. Finalize `timelines.json` + `incidents.json`
2. Write `demoSimulation.json` (Kandyan Convention 1815 curated path)
3. Write `demoMuseum.json` (vision + duration + timeline for demo photos)
4. Implement `seed.run` with Person A (they merge)
5. Run seed on dev — verify in Convex dashboard
6. **Checkpoint h4:** 3 timelines, 7 incidents visible

### Hours 5–9

1. `docs/TEST_PROMPTS.md` — 3 What-Ifs per incident for Person B
2. Draft dashboard layout (paper → code at h15) ✅ `docs/DASHBOARD_WIREFRAME.md`
3. Pre-write stabilize UI copy:
   - CTA: **Stabilize timeline**
   - Win: **History restored — Chaos below 40**
   - Lose: **Timeline still unstable — try other fixes**
4. Help test museum photos with Person B vision action

### Hours 10–14

1. Seed **published** simulations:
   - `chaosScore: 88`, title "The Convention Reversed"
   - `chaosScore: 91`, title "Magha's Eternal Reign"
2. Pre-generate 2 relic PNGs → upload to Convex storage (with Person A) for thumbnails
3. Update `DEMO.md` with auth + 3 beats

### Hours 15–18

1. Build `/dashboard`:
   - `useQuery(api.dashboard.listPublic)`
   - Card: thumbnail, title, author, **ChaosBadge**, button **View** / **Stabilize**
2. `StabilizeChallenge` component — wire to Person B action (with Person C on page)
3. `playerStats` display on profile or header: `🏆 Wins: N`
4. Publish button placement on simulation page (if you own it)
5. Remix entry from dashboard card
6. **Checkpoint h18:** Feed shows seeded chaotic cards; stabilize wins on seed

### Hours 19–20

1. Record **60s backup video** of full demo on prod
2. Finalize `DEMO.md` — timing per beat (40s + 40s + 40s)
3. Print one-page cheat sheet for Person C

### Hours 21–24

- **Narrate** dress rehearsal ×2
- Do not change seed data after h20
- Handle judges Q&A (game rules, museum, Google Cloud)

---

## Seed content requirements

### Anuradhapura (orders 1–3)

1. Arrival of Arahat Mahinda, -247
2. Battle of Vijithapura, -161
3. The Chola Invasion, 1017

### Polonnaruwa (orders 4–5)

4. Reign of Parakramabahu the Great, 1153
5. Invasion of Kalinga Magha, 1215

### Kandyan Kingdom / Mahanuwara (orders 6–7)

6. Battle of Danture, 1594
7. **The Kandyan Convention, 1815** — **golden demo**

Each incident fields: `year`, `title`, `description`, `location`, `realOutcome`, `order`. Add `relatedImageUrl` in `seed.run` per `public/seed/IMAGE_MANIFEST.md`.

### Chaotic published simulations (for game demo)

| Field | Value |
|-------|-------|
| `chaosScore` | 85–95 |
| `isChaotic` | true |
| `visibility` | public |
| Stabilize win | Person B fixture drops chaos to 32 |

---

## Game rules (user-facing copy)

Put this on Stabilize screen:

> Another historian broke this timeline. Pick corrective decisions to **lower the Chaos Score below 40** and restore stability. You win when chaos drops under 40.

**Do not promise** “restore real history” — only chaos threshold.

---

## Handoffs you RECEIVE

| From | When | What |
|------|------|------|
| Person A | h4 | `seed.run` merged |
| Person B | h14 | `stabilizeTimeline` API |
| Person C | h12 | `PublishedTimelineCard` if C builds it |
| Person A | h18 | `publishSimulation` working |

## Handoffs you GIVE

| To | When | What |
|----|------|------|
| Person B | h4 | All demo JSON fixtures |
| Person B | h5 | TEST_PROMPTS.md ✅ (`docs/TEST_PROMPTS.md`) |
| Person C | h15 | Stabilize strings + DEMO.md ✅ (`docs/STABILIZE_COPY.md`, `lib/stabilizeCopy.ts`) |
| Everyone | h20 | Backup video + cheat sheet |

---

## Judge demo script (you narrate)

**Beat 1 — Museum (40s)**  
“Scan the artifact and its museum label. AltEra reads both with Google Gemini, you pick how far to simulate, and history rewires.”

**Beat 2 — Curated (40s)**  
“We are looking at 1815. What if the Kandyan Convention was never signed? One What If, three branches, consequences and a relic.”

**Beat 3 — Game (40s)**  
“This timeline has Chaos 88. I’ll stabilize it — pick fixes — chaos drops below 40 — we win.”

**If live fails:** “We have offline demo data” → `?demo=1`

---

## Do NOT do

- Vertex / Gemini code (Person B)
- Schema design (Person A)
- Museum upload API (Person A)
- Curated simulate pages (Person C)

---

## Integration checkpoints (you verify)

| Hour | Check |
|------|-------|
| 4 | Seed data in Convex |
| 18 | Dashboard shows chaotic cards |
| 18 | Stabilize win once on prod |
| 21 | Narration matches C’s clicks |

---

## Optional if ahead

- Second pre-published remix example on dashboard
- Simple `leaderboard` query top 5 `stabilizeWins` — only if hours 17–18 free
