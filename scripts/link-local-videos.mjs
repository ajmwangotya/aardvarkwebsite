#!/usr/bin/env node
/**
 * Copy brand MP4s from the download folder into public/videos/ with the names the site expects.
 * Run from project root: node scripts/link-local-videos.mjs
 */
import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const parent = join(root, "..");
const outDir = join(root, "public", "videos");

/** Source filename (case-insensitive match) → destination in public/videos */
const MAP = [
  { match: /aadv?ark\s*wild/i, dest: "aardvark-wild.mp4" },
  { match: /gorilla.*uganda|uganda.*gorilla/i, dest: "gorilla-uganda.mp4" },
  { match: /aadv?ark\s*film/i, dest: "aardvark-film.mp4" },
  { match: /raw\s*footage/i, dest: "aardvark-film.mp4" },
];

async function main() {
  await mkdir(outDir, { recursive: true });

  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(parent, { withFileTypes: true }).catch(() => []);
  const mp4s = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".mp4"));

  if (mp4s.length === 0) {
    console.log("No .mp4 files found in:", parent);
    console.log("Place AADVARK WILD.mp4 and gorilla Uganda.mp4 there, then run again.");
    process.exit(1);
  }

  let copied = 0;
  for (const { match, dest } of MAP) {
    const source = mp4s.find((f) => match.test(f.name));
    if (!source) continue;
    const from = join(parent, source.name);
    const to = join(outDir, dest);
    console.log(`→ ${source.name}  →  public/videos/${dest}`);
    await copyFile(from, to);
    copied++;
  }

  if (copied === 0) {
    console.log("Found MP4s but none matched expected names:", mp4s.map((f) => f.name).join(", "));
    process.exit(1);
  }

  console.log(`
Copied ${copied} file(s). Next for production:
  1. npm run upload-videos   (needs R2_BUCKET_NAME in .env)
  2. Set VITE_VIDEO_CDN_BASE in Cloudflare → redeploy
  See docs/EXTERNAL-VIDEOS.md
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
