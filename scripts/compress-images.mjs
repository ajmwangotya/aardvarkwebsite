/**
 * Compress raster images for web + smaller Git pushes.
 * Targets src/assets (in-place). Skips SVG. Backs up only on first run via .bak (optional).
 *
 * Usage: node scripts/compress-images.mjs [--dry-run] [--max-width=1920] [--quality=80]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "src", "assets");
const ASSET_SUBDIRS = ["", "brand", "heroes", "destinations", "editorial", "team"];

const dryRun = process.argv.includes("--dry-run");
const maxWidth = Number(process.argv.find((a) => a.startsWith("--max-width="))?.split("=")[1] ?? 1920);
const quality = Number(process.argv.find((a) => a.startsWith("--quality="))?.split("=")[1] ?? 80);

const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!RASTER.has(ext)) return null;

  const before = (await fs.stat(filePath)).size;
  if (before < 80_000) return { filePath, before, after: before, skipped: "already-small" };

  const image = sharp(filePath, { failOn: "none" });
  const meta = await image.metadata();
  const needsResize = (meta.width ?? 0) > maxWidth;

  let pipeline = image.rotate(); // respect EXIF orientation
  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: meta.hasAlpha });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality, effort: 4 });
  } else {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true, progressive: true });
  }

  const buffer = await pipeline.toBuffer();
  const after = buffer.length;

  // Keep original if compression would grow the file
  if (after >= before) {
    return { filePath, before, after: before, skipped: "no-gain" };
  }

  if (!dryRun) {
    const tmp = `${filePath}.compress-tmp`;
    await fs.writeFile(tmp, buffer);
    await fs.rm(filePath, { force: true });
    await fs.rename(tmp, filePath);
  }

  return { filePath, before, after, skipped: null };
}

async function main() {
  const files = [];
  for (const sub of ASSET_SUBDIRS) {
    const dir = sub ? path.join(assetsDir, sub) : assetsDir;
    try {
      files.push(...(await walk(dir)));
    } catch {
      /* optional subfolder */
    }
  }
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  console.log(`Compressing images in src/assets (max width ${maxWidth}, quality ${quality})${dryRun ? " [DRY RUN]" : ""}…\n`);

  for (const file of files) {
    const result = await compressFile(file);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;

    if (result.skipped) continue;

    changed += 1;
    const rel = path.relative(root, result.filePath);
    const pct = Math.round((1 - result.after / result.before) * 100);
    console.log(`${rel}: ${formatMb(result.before)} → ${formatMb(result.after)} (−${pct}%)`);
  }

  console.log(`\n${changed} file(s) optimized.`);
  console.log(`Total: ${formatMb(totalBefore)} → ${formatMb(totalAfter)} (−${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
