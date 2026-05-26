#!/usr/bin/env node
/**
 * Upload public/videos/*.mp4 to Cloudflare R2 (videos/ prefix).
 *
 * Requires: npx wrangler (from @cloudflare/vite-plugin), wrangler login
 * Env: R2_BUCKET_NAME (required), CLOUDFLARE_ACCOUNT_ID (optional)
 */
import { readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerBin = join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const videosDir = join(root, "public", "videos");
const bucket = process.env.R2_BUCKET_NAME?.trim();

if (!bucket) {
  console.error("Set R2_BUCKET_NAME in .env (e.g. R2_BUCKET_NAME=aardvark-media)");
  process.exit(1);
}

if (!existsSync(videosDir)) {
  console.error(`Missing folder: ${videosDir}`);
  process.exit(1);
}

const MAX_MB = 120;
const files = (await readdir(videosDir)).filter((f) => f.endsWith(".mp4"));
if (files.length === 0) {
  console.error("No .mp4 files in public/videos/. Add compressed films first.");
  process.exit(1);
}

const skipped = [];
const toUpload = [];
for (const name of files) {
  const localPath = join(videosDir, name);
  const sizeMb = (await stat(localPath)).size / (1024 * 1024);
  if (sizeMb > MAX_MB) {
    skipped.push({ name, sizeMb });
    continue;
  }
  toUpload.push(name);
}

if (skipped.length > 0) {
  console.warn(`Skipping ${skipped.length} file(s) over ${MAX_MB} MB (compress first):`);
  for (const { name, sizeMb } of skipped) {
    console.warn(`  - ${name} (${sizeMb.toFixed(1)} MB)`);
  }
  console.warn("");
}

if (toUpload.length === 0) {
  console.error("Nothing to upload. Compress large MP4s (see scripts/compress-videos.ps1).");
  process.exit(1);
}

// CLOUDFLARE_ACCOUNT_ID in .env is read by wrangler automatically when set.
console.log(`Uploading ${toUpload.length} file(s) to R2 bucket "${bucket}"...\n`);

for (const name of toUpload) {
  const localPath = join(videosDir, name);
  const remoteKey = `videos/${name}`;
  const args = [
    wranglerBin,
    "r2",
    "object",
    "put",
    `${bucket}/${remoteKey}`,
    "--file",
    localPath,
    "--content-type",
    "video/mp4",
    "--remote",
  ];
  console.log(`→ ${remoteKey}`);
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    cwd: root,
    shell: false,
    windowsHide: true,
  });
  if (result.status !== 0) {
    console.error(`\nFailed uploading ${name}. Run: npx.cmd wrangler login`);
    process.exit(result.status ?? 1);
  }
}

const base = process.env.VITE_VIDEO_CDN_BASE?.trim() || "https://YOUR-R2-PUBLIC-URL.r2.dev";
console.log(`
Done. Set in Vercel / Cloudflare (then redeploy):

  VITE_VIDEO_CDN_BASE=${base.replace(/\/$/, "")}

Then run: npm run untrack-videos
`);
