/**
 * Assign unique WeTransfer photos to site asset slots (no duplicate sources per target).
 * Run: node scripts/ingest-wetransfer-unique.mjs
 * Then: npm run compress-images
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const wetransferDir = path.join(root, "wetransfer__dsc1010-jpeg_2026-05-17_1737");
const assetsDir = path.join(root, "src", "assets");
/** New batch folder — left untouched on disk; not used for the site */
const SKIP_DIR = "wetransfer_pictures_2026-05-26_1335";

const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function walkImages(dir) {
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

async function listTargets() {
  const targets = [];
  for (const sub of ["heroes", "editorial", "destinations", "team"]) {
    const dir = path.join(assetsDir, sub);
    try {
      const files = await fs.readdir(dir);
      for (const f of files.sort()) {
        const ext = path.extname(f).toLowerCase();
        if (ext === ".png") continue;
        if (RASTER.has(ext)) targets.push(path.join(dir, f));
      }
    } catch {
      /* optional folder */
    }
  }
  return targets;
}

function extractNum(filePath) {
  const m = path.basename(filePath).match(/(\d+)/);
  return m ? Number.parseInt(m[1], 10) : 0;
}

/** Spread picks across the timeline so burst shots are not assigned to consecutive heroes. */
function pickSpaced(sorted, count) {
  const n = sorted.length;
  if (count >= n) return sorted.slice(0, count);
  const picked = [];
  const used = new Set();
  for (let i = 0; i < count; i++) {
    let idx = Math.min(Math.floor((i + 0.5) * (n / count)), n - 1);
    while (used.has(idx) && idx < n - 1) idx++;
    if (used.has(idx)) idx = sorted.findIndex((_, j) => !used.has(j));
    used.add(idx);
    picked.push(sorted[idx]);
  }
  return picked;
}

async function writeJpeg(source, dest) {
  await sharp(source, { failOn: "none" })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(dest.replace(/\.(png|webp|jpeg)$/i, ".jpg"));
}

async function main() {
  const sourcesSorted = (await walkImages(wetransferDir)).sort(
    (a, b) => extractNum(a) - extractNum(b),
  );

  const targets = await listTargets();
  if (sourcesSorted.length === 0) {
    console.error("No WeTransfer images found.");
    process.exit(1);
  }
  if (targets.length === 0) {
    console.error("No asset targets found.");
    process.exit(1);
  }

  const heroTargets = targets.filter((t) => t.includes(`${path.sep}heroes${path.sep}`));
  const otherTargets = targets.filter((t) => !t.includes(`${path.sep}heroes${path.sep}`));
  const heroPicks = pickSpaced(sourcesSorted, heroTargets.length);
  const usedSources = new Set(heroPicks);
  const remaining = sourcesSorted.filter((s) => !usedSources.has(s));

  const manifest = [];

  for (let h = 0; h < heroTargets.length; h++) {
    const target = heroTargets[h];
    const source = heroPicks[h];
    const outPath = target.replace(/\.(png|webp|jpeg)$/i, ".jpg");
    await writeJpeg(source, outPath);
    manifest.push({ target: path.relative(root, outPath), source: path.relative(root, source) });
  }

  let i = 0;
  for (const target of otherTargets) {
    const source = remaining[i % remaining.length];
    i++;
    usedSources.add(source);
    const outPath = target.replace(/\.(png|webp|jpeg)$/i, ".jpg");
    await writeJpeg(source, outPath);
    manifest.push({ target: path.relative(root, outPath), source: path.relative(root, source) });
  }

  const manifestPath = path.join(root, "docs", "content", "image-assignments.json");
  await fs.writeFile(
    manifestPath,
    JSON.stringify({ assigned: manifest.length, sources: sourcesSorted.length, items: manifest }, null, 2),
  );

  console.log(
    `Assigned ${manifest.length} targets from ${sourcesSorted.length} legacy photos (heroes spaced; skipped ${SKIP_DIR}).`,
  );
  console.log(`Manifest: ${path.relative(root, manifestPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
