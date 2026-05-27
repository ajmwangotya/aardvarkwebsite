/**
 * Copy and compress selected images from the company profile PDF into src/assets.
 * Run after extracting with: node scripts/ingest-pdf-profile.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src", "assets", "profile-pdf");

const maxWidth = 1920;
const jpegQuality = 82;

/** source filename (in profile-pdf) → destination relative to src/assets */
const COPIES = [
  // Team — page 4 of profile (Walt, Augustine, Deborah)
  ["embedded-p4-i9.png", "team/team-walt.jpg"],
  ["embedded-p4-i10.png", "team/team-augustine.jpg"],
  ["embedded-p4-i11.png", "team/team-deborah.jpg"],
  // Day on safari / intro — page 3
  ["embedded-p3-i5.png", "editorial/day-on-safari.jpg"],
  // Itinerary heroes from profile spreads
  ["embedded-p7-i21.png", "destinations/dest-wildlife-wonders.jpg"],
  ["embedded-p10-i28.png", "destinations/dest-northern-migration.jpg"],
  ["embedded-p13-i33.png", "destinations/dest-classic-circuit.jpg"],
  ["embedded-p14-i35.png", "destinations/dest-iconic-tanzania.jpg"],
  ["embedded-p15-i38.png", "destinations/dest-southern-migration.jpg"],
  ["embedded-p16-i41.png", "destinations/dest-mkomazi-rhino.jpg"],
  ["embedded-p18-i45.png", "destinations/dest-uganda-extension.jpg"],
  ["embedded-p19-i49.png", "destinations/dest-uganda-chimps.jpg"],
  ["embedded-p21-i51.png", "destinations/dest-zanzibar-extension.jpg"],
  ["embedded-p25-i61.png", "destinations/dest-mount-meru.jpg"],
  ["embedded-p27-i68.png", "destinations/dest-kilimanjaro.jpg"],
  // Featured parks (section 7 spreads)
  ["embedded-p33-i115.png", "destinations/dest-serengeti-migration.jpg"],
  ["embedded-p33-i113.png", "destinations/dest-ngorongoro-crater.jpg"],
  ["embedded-p32-i108.png", "destinations/dest-tarangire-elephants.jpg"],
  ["embedded-p30-i86.png", "destinations/dest-arusha-park.jpg"],
];

async function compressToJpeg(inputPath, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const image = sharp(inputPath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  let pipeline = image;
  if ((meta.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true, progressive: true }).toFile(outputPath);
  const after = (await fs.stat(outputPath)).size;
  return after;
}

let ok = 0;
let skip = 0;
for (const [srcName, destRel] of COPIES) {
  const input = path.join(srcDir, srcName);
  const output = path.join(root, "src", "assets", destRel);
  try {
    await fs.access(input);
    const size = await compressToJpeg(input, output);
    console.log(`✓ ${destRel} (${Math.round(size / 1024)} KB)`);
    ok++;
  } catch {
    console.warn(`✗ missing ${srcName}`);
    skip++;
  }
}
console.log(`Done: ${ok} copied, ${skip} skipped.`);
