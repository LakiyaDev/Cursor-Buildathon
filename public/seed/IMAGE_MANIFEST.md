# Seed image manifest — Sri Lankan kingdoms + World War I

Place image files in `public/seed/`. Paths below are served from the site root (e.g. `/seed/anuradhapura-cover.jpg`).

## Timeline cover images

| File | Used by |
|------|---------|
| `anuradhapura-cover.jpg` | `timelines.json` → Anuradhapura Kingdom |
| `polonnaruwa-cover.jpg` | `timelines.json` → Polonnaruwa Kingdom |
| `kandy-cover.jpg` | `timelines.json` → Kandyan Kingdom (Mahanuwara) |
| `wwi-cover.jpg` | `timelines.json` → World War I |

## Incident images

Map each incident (`incidents.json` `order`) to `relatedImageUrl` when seeding (e.g. `/seed/arahat-mahinda.jpg`).

| order | Incident | Image file | Timeline slug |
|-------|----------|------------|---------------|
| 1 | Arrival of Arahat Mahinda | `arahat-mahinda.jpg` | `anuradhapura` |
| 2 | Battle of Vijithapura | `battle-vijithapura.jpg` | `anuradhapura` |
| 3 | The Chola Invasion | `chola-invasion.jpg` | `anuradhapura` |
| 4 | Reign of Parakramabahu the Great | `parakramabahu.jpg` | `polonnaruwa` |
| 5 | Invasion of Kalinga Magha | `kalinga-magha.jpg` | `polonnaruwa` |
| 6 | Battle of Danture | `battle-danture.jpg` | `mahanuwara` |
| 7 | The Kandyan Convention | `kandyan-convention.jpg` | `mahanuwara` |
| 8 | Assassination of Archduke Franz Ferdinand | `franz-ferdinand.jpg` | `wwi` |
| 9 | Sinking of the Lusitania | `lusitania.jpg` | `wwi` |
| 10 | The Zimmermann Telegram | `zimmermann-telegram.jpg` | `wwi` |
| 11 | Treaty of Versailles | `treaty-versailles.jpg` | `wwi` |

## Suggested sources

Use Wikimedia Commons or museum-licensed photos. Document source URLs in your team sheet for attribution.

## Checklist

- [x] `anuradhapura-cover.jpg`
- [x] `polonnaruwa-cover.jpg`
- [x] `kandy-cover.jpg`
- [x] `arahat-mahinda.jpg`
- [x] `battle-vijithapura.jpg`
- [x] `chola-invasion.jpg`
- [x] `parakramabahu.jpg`
- [x] `kalinga-magha.jpg`
- [x] `battle-danture.jpg`
- [x] `kandyan-convention.jpg`
- [x] `wwi-cover.jpg`
- [x] `franz-ferdinand.jpg`
- [x] `lusitania.jpg`
- [x] `zimmermann-telegram.jpg`
- [x] `treaty-versailles.jpg`

## Demo museum

- [x] `../demo-museum/artifact.jpg` (Colombo National Museum sculpture)
- [x] `../demo-museum/label.jpg` (generated placard — OCR-friendly)

See `ATTRIBUTION.md` for Wikimedia sources. Re-fetch: `node scripts/download-seed-images.mjs`
