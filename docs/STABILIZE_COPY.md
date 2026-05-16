# Stabilize game — UI copy for Person C

**From:** Person D  
**Use in:** `StabilizeChallenge`, dashboard cards, `WinBanner`, simulation detail when `chaosScore >= 70`

**Win rule:** `resultingChaosScore < 40` → show win state. Do **not** promise “restore real history.”

**Demo fixture:** `convex/seed/demoStabilizeWin.json` (`?demo=1` → chaos 88 → 32, picks `fix_2` + `fix_4`)

---

## Screen intro (top of stabilize flow)

**Heading:** Stabilize this timeline

**Body:**

> Another historian broke this timeline. Pick corrective decisions to **lower the Chaos Score below 40** and restore stability. You win when chaos drops under 40.

---

## Buttons & labels

| Key | English copy |
|-----|----------------|
| `ctaDashboard` | Stabilize |
| `ctaFull` | Stabilize timeline |
| `submit` | Apply fixes |
| `retry` | Try other fixes |
| `backToFeed` | Back to dashboard |
| `viewTimeline` | View timeline |

---

## States

### Loading

**Title:** Calculating stability…  
**Subtitle:** Reweaving consequences from your choices.

### Win (`won === true`, chaos &lt; 40)

**Title:** History restored — Chaos below 40  
**Subtitle:** This timeline is stable enough to archive.  
**Badge:** WIN

### Lose (`won === false`, chaos ≥ 40)

**Title:** Timeline still unstable — try other fixes  
**Subtitle:** Chaos is still **{chaosScore}**. Pick different corrective decisions.  
**Badge:** UNSTABLE

### Error

**Title:** Stabilization failed  
**Subtitle:** Could not reach the server. Use `?demo=1` or try again.

---

## Chaos meter labels (optional on same screen)

| Range | Label |
|-------|--------|
| 0–30 | Stable |
| 31–60 | Unsettled |
| 61–85 | Chaotic |
| 86–100 | Timeline fracture |

**Threshold line:** Win when chaos **&lt; 40**

---

## Dashboard card (chaotic published timelines)

| Element | Copy |
|---------|------|
| Badge | Chaos {score} |
| Primary action | View |
| Secondary action | Stabilize |

Show **Stabilize** only when `isChaotic` or `chaosScore >= 70`.

---

## TypeScript import (recommended)

```ts
import { stabilizeCopy } from "@/lib/stabilizeCopy";
```

See `lib/stabilizeCopy.ts` for the same strings as constants.

---

## Judge one-liner (Person D narrates)

“This timeline has Chaos 88. I’ll stabilize it — pick fixes — chaos drops below 40 — we win.”
