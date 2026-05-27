/**
 * Reassign hero slideshow frames from legacy WeTransfer photos spaced apart in time
 * (avoids burst sequences of the same animal appearing back-to-back).
 * Run: node scripts/reassign-hero-slideshow.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const wetransferDir = path.join(root, "wetransfer__dsc1010-jpeg_2026-05-17_1737");
const SKIP_DIR = "wetransfer_pictures_2026-05-26_1335";
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const HERO_SLIDES = [
  "hero-ndutu-1.jpg",
  "hero-ndutu-2.jpg",
  "hero-ndutu-3.jpg",
  "hero-ndutu-4.jpg",
  "hero-ndutu-5.jpg",
  "hero-ndutu-6.jpg",
  "hero-ndutu-7.jpg",
];

function extractNum(filePath) {
  const m = path.basename(filePath).match(/(\d+)/);
  return m ? Number.parseInt(m[1], 10) : 0;
}

async function walkLegacyImages(dir) {
  const out = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === SKIP_DIR) continue;
        await walk(full);
      } else if (RASTER.has(path.extname(e.name).toLowerCase())) out.push(full);
    }
  }
  await walk(dir);
  return out;
}

/** Pick `count` files spread across the sorted timeline (maximises gap between burst shots). */
function pickSpaced(sorted, count) {
  const n = sorted.length;
  if (count >= n) return sorted.slice(0, count);
  const picked = [];
  const used = new Set();
  for (let i = 0; i < count; i++) {
    let idx = Math.min(Math.floor((i + 0.5) * (n / count)), n - 1);
    while (used.has(idx) && idx < n - 1) idx++;
    if (used.has(idx)) {
      idx = sorted.findIndex((_, j) => !used.has(j));
    }
    used.add(idx);
    picked.push(sorted[idx]);
  }
  return picked;
}

async function writeJpeg(source, dest) {
  await sharp(source, { failOn: "none" })
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
}

async function main() {
  const sources = (await walkLegacyImages(wetransferDir)).sort(
    (a, b) => extractNum(a) - extractNum(b),
  );
  const picks = pickSpaced(sources, HERO_SLIDES.length);
  const heroesDir = path.join(root, "src", "assets", "heroes");

  for (let i = 0; i < HERO_SLIDES.length; i++) {
    const dest = path.join(heroesDir, HERO_SLIDES[i]);
    await writeJpeg(picks[i], dest);
    console.log(`${HERO_SLIDES[i]} ← ${path.basename(picks[i])}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
