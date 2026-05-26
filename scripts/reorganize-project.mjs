/**
 * One-time project layout: assets subfolders + component groups + import rewrites.
 * Run: node scripts/reorganize-project.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");
const assetsDir = path.join(src, "assets");

const ASSET_DIRS = ["brand", "heroes", "destinations", "editorial", "team"];

const COMPONENT_MOVES = {
  "site-header.tsx": "layout",
  "site-footer.tsx": "layout",
  "mobile-nav-menu.tsx": "layout",
  "mobile-cta-bar.tsx": "layout",
  "section-divider.tsx": "layout",
  "cookie-consent.tsx": "layout",
  "whatsapp-float.tsx": "layout",
  "language-switcher.tsx": "layout",
  "featured-journeys.tsx": "sections",
  "featured-packages.tsx": "sections",
  "reviews-section.tsx": "sections",
  "trust-credentials.tsx": "sections",
  "migration-calendar.tsx": "sections",
  "guest-notes-section.tsx": "sections",
  "cinematic-video-section.tsx": "sections",
  "legal-sections.tsx": "sections",
  "booking-steps.tsx": "sections",
  "office-hours-display.tsx": "sections",
  "plan-trip-form.tsx": "forms",
  "package-inquiry-form.tsx": "forms",
  "newsletter-form.tsx": "forms",
  "form-security.tsx": "forms",
  "form-sla-note.tsx": "forms",
  "film-modal.tsx": "media",
  "optimized-image.tsx": "media",
  "safari-map.tsx": "maps",
  "tanzania-map.tsx": "maps",
};

function assetBucket(filename) {
  if (filename.startsWith("aardvark-logo")) return "brand";
  if (filename.startsWith("hero-")) return "heroes";
  if (filename.startsWith("dest-")) return "destinations";
  if (filename.startsWith("team-")) return "team";
  return "editorial";
}

async function ensureDirs() {
  for (const d of ASSET_DIRS) {
    await fs.mkdir(path.join(assetsDir, d), { recursive: true });
  }
  for (const group of new Set(Object.values(COMPONENT_MOVES))) {
    await fs.mkdir(path.join(src, "components", group), { recursive: true });
  }
}

async function moveAssets() {
  const files = await fs.readdir(assetsDir);
  for (const name of files) {
    const full = path.join(assetsDir, name);
    const stat = await fs.stat(full);
    if (!stat.isFile()) continue;
    const bucket = assetBucket(name);
    const dest = path.join(assetsDir, bucket, name);
    await fs.rename(full, dest);
  }
}

async function moveComponents() {
  const compDir = path.join(src, "components");
  for (const [file, group] of Object.entries(COMPONENT_MOVES)) {
    const from = path.join(compDir, file);
    const to = path.join(compDir, group, file);
    try {
      await fs.access(from);
      await fs.rename(from, to);
    } catch {
      /* already moved */
    }
  }
}

async function walk(dir, acc = []) {
  for (const name of await fs.readdir(dir)) {
    const full = path.join(dir, name);
    const stat = await fs.stat(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "ui") continue;
      await walk(full, acc);
    } else if (/\.(tsx?|css)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

function rewriteImports(content) {
  let next = content;

  next = next.replace(/@\/assets\/dest-/g, "@/assets/destinations/dest-");
  next = next.replace(/@\/assets\/hero-/g, "@/assets/heroes/hero-");
  next = next.replace(/@\/assets\/team-/g, "@/assets/team/team-");
  next = next.replace(/@\/assets\/aardvark-logo/g, "@/assets/brand/aardvark-logo");

  const editorialNames = [
    "migration",
    "maasai",
    "gorilla-uganda",
    "gorilla-rwanda",
    "gorilla-rwanda-new",
    "zanzibar-beach",
    "balloon",
    "elephants",
    "acacia",
    "leopard",
    "camp-1",
    "dining",
    "walking",
    "elephant-silhouette",
  ];
  for (const base of editorialNames) {
    next = next.replaceAll(`@/assets/${base}.`, `@/assets/editorial/${base}.`);
    next = next.replaceAll(`@/assets/${base}"`, `@/assets/editorial/${base}"`);
  }

  for (const [file, group] of Object.entries(COMPONENT_MOVES)) {
    const base = file.replace(/\.tsx$/, "");
    next = next.replaceAll(`@/components/${base}"`, `@/components/${group}/${base}"`);
    next = next.replaceAll(`@/components/${base}'`, `@/components/${group}/${base}'`);
  }

  return next;
}

async function rewriteSourceFiles() {
  const files = await walk(src);
  let changed = 0;
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const updated = rewriteImports(raw);
    if (updated !== raw) {
      await fs.writeFile(file, updated);
      changed += 1;
    }
  }
  return changed;
}

async function main() {
  console.log("Creating folders…");
  await ensureDirs();
  console.log("Moving assets…");
  await moveAssets();
  console.log("Moving components…");
  await moveComponents();
  console.log("Rewriting imports…");
  const n = await rewriteSourceFiles();
  console.log(`Done. Updated ${n} source file(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
