/**
 * Downloads seed + demo-museum images from Wikimedia Commons (Special:FilePath).
 * Regenerates demo-museum/label.jpg as a typed placard (vision/OCR friendly).
 * Run: node scripts/download-seed-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seedDir = join(root, "public", "seed");
const museumDir = join(root, "public", "demo-museum");

/** @type {{ out: string; wikiFile: string; width?: number }[]} */
const FILES = [
  { out: join(seedDir, "anuradhapura-cover.jpg"), wikiFile: "Ruwanwelisaya.jpg" },
  { out: join(seedDir, "polonnaruwa-cover.jpg"), wikiFile: "Gal Vihara Polonnaruwa 1.jpg" },
  { out: join(seedDir, "kandy-cover.jpg"), wikiFile: "Sri Dalada Maligawa.jpg" },
  { out: join(seedDir, "wwi-cover.jpg"), wikiFile: "Cheshire Regiment trench Somme 1916.jpg" },
  { out: join(seedDir, "arahat-mahinda.jpg"), wikiFile: "Mihintale Peak Sri Lanka.jpg" },
  { out: join(seedDir, "battle-vijithapura.jpg"), wikiFile: "King Dutugemunu.jpg" },
  { out: join(seedDir, "chola-invasion.jpg"), wikiFile: "Brihadisvara Temple, Thanjavur.jpg" },
  { out: join(seedDir, "parakramabahu.jpg"), wikiFile: "Parakrama Samudra.jpg" },
  { out: join(seedDir, "kalinga-magha.jpg"), wikiFile: "Polonnaruwa Vatadage.jpg" },
  { out: join(seedDir, "battle-danture.jpg"), wikiFile: "Island of Kandy lake.JPG" },
  { out: join(seedDir, "kandyan-convention.jpg"), wikiFile: "Magul Maduwa, Kandy.jpg" },
  { out: join(seedDir, "franz-ferdinand.jpg"), wikiFile: "DC-1914-27-d-Sarajevo-cropped.jpg" },
  { out: join(seedDir, "lusitania.jpg"), wikiFile: "RMS Lusitania coming into port, possibly in New York, 1907-13-crop.jpg" },
  { out: join(seedDir, "zimmermann-telegram.jpg"), wikiFile: "The Zimmermann Telegram.jpg" },
  { out: join(seedDir, "treaty-versailles.jpg"), wikiFile: "Treaty of Versailles, English version.jpg" },
  { out: join(museumDir, "artifact.jpg"), wikiFile: "Sculpture of Buddha at Colombo National Museum.jpg" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function filePathUrl(wikiFile, width = 1280) {
  const encoded = encodeURIComponent(wikiFile.replace(/ /g, "_"));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${width}`;
}

async function downloadOne({ out, wikiFile, width = 1280 }) {
  const res = await fetch(filePathUrl(wikiFile, width), {
    redirect: "follow",
    headers: { "User-Agent": "AltEra-Hackathon/1.0 (educational)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${wikiFile}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
  await writeFile(out, buf);
  return buf.length;
}

function generateMuseumLabel() {
  const ps = `
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 900, 700
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(245, 240, 230))
$titleFont = New-Object System.Drawing.Font('Segoe UI', 28, [System.Drawing.FontStyle]::Bold)
$bodyFont = New-Object System.Drawing.Font('Segoe UI', 20)
$g.DrawString('National Museum of Colombo', $titleFont, [System.Drawing.Brushes]::Black, 40, 40)
$text = @'
Artifact: Standing Buddha sculpture
Period: c. 2nd-3rd century CE
Material: Stone
Kingdom: Anuradhapura era
Location: Colombo, Sri Lanka

Description:
Ancient Sri Lankan stone sculpture
displayed in the archaeology gallery.
'@
$g.DrawString($text, $bodyFont, [System.Drawing.Brushes]::Black, 40, 110)
$g.Dispose()
$bmp.Save('${join(museumDir, "label.jpg").replace(/\\/g, "\\\\")}', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
`;
  execSync(`powershell -NoProfile -Command ${JSON.stringify(ps)}`, { stdio: "inherit" });
}

async function main() {
  await mkdir(seedDir, { recursive: true });
  await mkdir(museumDir, { recursive: true });

  const failed = [];
  for (const item of FILES) {
    const name = item.out.split(/[/\\]/).pop();
    try {
      const bytes = await downloadOne(item);
      console.log(`OK ${name} (${Math.round(bytes / 1024)} KB)`);
    } catch (e) {
      console.error(`FAIL ${name}: ${e.message}`);
      failed.push(name);
    }
    await sleep(2500);
  }

  try {
    generateMuseumLabel();
    console.log("OK label.jpg (generated placard for vision/OCR)");
  } catch (e) {
    console.error(`FAIL label.jpg: ${e.message}`);
    failed.push("label.jpg");
  }

  if (failed.length) {
    console.error("Failed:", failed);
    process.exit(1);
  }
  console.log("\nAll 17 images ready.");
}

main();
