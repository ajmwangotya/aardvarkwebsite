#!/usr/bin/env node
/**
 * Stop tracking MP4s in Git / LFS (files stay on disk).
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const attrs = join(root, ".gitattributes");
if (existsSync(attrs)) {
  run("git", ["lfs", "untrack", "public/videos/*.mp4"]);
}

run("git", ["rm", "--cached", "-f", "public/videos/aardvark-film.mp4"]);
run("git", ["rm", "--cached", "-f", "public/videos/aardvark-wild.mp4"]);
run("git", ["rm", "--cached", "-f", "public/videos/gorilla-uganda.mp4"]);

console.log(`
Videos are no longer tracked by Git (still in public/videos/ on disk).
Next: set VITE_VIDEO_CDN_BASE, commit, and push.
`);
