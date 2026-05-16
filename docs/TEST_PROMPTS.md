# TEST_PROMPTS — What-If prompts for Person B

One-sentence **What if** prompts for AI testing (`generatePhaseOne` / curated path).  
**Rules:** max ~200 characters, single sentence (one `.` or `?` at the end), grounded in the incident.

**Golden demo:** order **7** — The Kandyan Convention (1815).

---

## Anuradhapura (`anuradhapura`)

### 1. Arrival of Arahat Mahinda (-247)

1. What if King Devanampiya Tissa refused to meet Mahinda at Mihintale and Buddhism never became state religion?
2. What if Mahinda converted the king but was assassinated before establishing the monastic order?
3. What if a rival faith from South India became the official religion of Anuradhapura instead?

### 2. Battle of Vijithapura (-161)

1. What if King Elara defeated Dutugemunu and the island remained divided under a Tamil king?
2. What if Dutugemunu died in battle before unifying Sri Lanka under one crown?
3. What if both kings agreed to partition the island permanently after Vijithapura?

### 3. The Chola Invasion (1017)

1. What if Mahinda V repelled Raja Raja Chola and Anuradhapura never fell?
2. What if the Cholas were driven out within a decade and the capital never moved to Polonnaruwa?
3. What if the invasion triggered a mass Sinhalese migration to Southeast Asia instead of inland?

---

## Polonnaruwa (`polonnaruwa`)

### 4. Reign of Parakramabahu the Great (1153)

1. What if Parakramabahu never built the Parakrama Samudra and the golden age of irrigation failed?
2. What if he unified the island but was overthrown before completing the tank system?
3. What if his agricultural reforms spread famine instead of prosperity across Polonnaruwa?

### 5. Invasion of Kalinga Magha (1215)

1. What if Kalinga Magha was defeated at the gates of Polonnaruwa and the kingdom survived intact?
2. What if Magha's invasion united the Sinhalese against him and expelled him within five years?
3. What if Polonnaruwa was abandoned peacefully before Magha destroyed its temples?

---

## Kandyan Kingdom / Mahanuwara (`mahanuwara`)

### 6. Battle of Danture (1594)

1. What if the Portuguese army crushed Vimaladharmasuriya I and captured Kandy in 1594?
2. What if Danture ended in a stalemate and Portugal annexed the entire coastal belt?
3. What if the Kandyan king fled to the Dutch for protection instead of fighting alone?

### 7. The Kandyan Convention (1815) — **GOLDEN DEMO**

1. What if the Kandyan chieftains refused to sign and rallied behind King Sri Vikrama Rajasinha?
2. What if the British were expelled at Magul Maduwa and the monarchy survived another century?
3. What if the convention was signed but the king kept real power as a constitutional monarch?

---

## World War I (`wwi`)

### 8. Assassination of Archduke Franz Ferdinand (1914)

1. What if Gavrilo Princip missed and the Sarajevo motorcade escaped unharmed?
2. What if Austria-Hungary punished Serbia without triggering a general European war?
3. What if the archduke survived and pursued a separate peace with Russia?

### 9. Sinking of the Lusitania (1915)

1. What if Germany apologized immediately and the Lusitania was never torpedoed?
2. What if the United States declared war on Germany the day after the sinking?
3. What if the ship was warned in time and evaded the U-boat in the Celtic Sea?

### 10. The Zimmermann Telegram (1917)

1. What if the telegram was never intercepted and the United States stayed neutral through 1918?
2. What if Germany revoked the proposal before Washington decoded it?
3. What if Mexico accepted the alliance and opened a second front against the United States?

### 11. Treaty of Versailles (1919)

1. What if the Allies offered Germany lenient terms and avoided crushing reparations?
2. What if Germany refused to sign and the war continued into the 1920s?
3. What if the treaty created a stable democratic Germany without territorial humiliation?

---

## Quick test order (suggested for Person B)

| Priority | Order | Incident | Why |
|----------|-------|----------|-----|
| 1 | 7 | Kandyan Convention | Judge curated demo |
| 2 | 8 | Franz Ferdinand | WWI fallback / familiar to judges |
| 3 | 1 | Arahat Mahinda | Short ancient timeline |
| 4 | 4 | Parakramabahu | Polonnaruwa golden age |
| 5 | 3 | Chola Invasion | High-impact alternate empire |

---

## Demo mode fixtures (no live AI)

| Path | File |
|------|------|
| Museum | `convex/seed/demoMuseum.json` |
| Curated (Kandyan) | `convex/seed/demoSimulation.json` |
| Stabilize win | `convex/seed/demoStabilizeWin.json` |

Use `?demo=1` when live generation fails on stage.
