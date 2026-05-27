import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/data/destination-images.ts"), "utf8");
const en = JSON.parse(fs.readFileSync(path.join(root, "src/locales/en.json"), "utf8"));

const imports = [...src.matchAll(/import (\w+) from "@\/assets\/([^"]+)"/g)];
const missing = [];
for (const [, name, rel] of imports) {
  const p = path.join(root, "src/assets", rel);
  if (!fs.existsSync(p)) missing.push({ name, p });
}

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function getMapKeys(blockName) {
  const match = src.match(new RegExp(`${blockName}: Record<string, string> = \\{([\\s\\S]*?)\\};`));
  if (!match) return [];
  const keys = [];
  for (const line of match[1].split("\n")) {
    const quoted = line.match(/^\s+"([^"]+)":/);
    if (quoted) keys.push(quoted[1]);
    const bare = line.match(/^\s+([\w-]+):/);
    if (bare) keys.push(bare[1]);
  }
  return keys;
}

const parkKeys = getMapKeys("destinationParkImageBySlug");
const featuredKeys = getMapKeys("featuredParkImageBySlug");
const unmapped = [];
const unmappedFeatured = [];

for (const g of en.destPage.groups) {
  for (const item of g.items) {
    const s = slug(item.name);
    if (!parkKeys.includes(s)) unmapped.push({ name: item.name, slug: s });
  }
}

for (const p of en.destPage.featuredParks) {
  const s = slug(p.name);
  if (!featuredKeys.includes(s)) unmappedFeatured.push({ name: p.name, slug: s });
}

console.log(`Imports: ${imports.length}, missing files: ${missing.length}`);
missing.forEach((m) => console.log(`MISSING FILE: ${m.name} -> ${m.p}`));
console.log(`Unmapped parks: ${unmapped.length}`);
unmapped.forEach((m) => console.log(`UNMAPPED: ${m.name} (${m.slug})`));
console.log(`Unmapped featured: ${unmappedFeatured.length}`);
unmappedFeatured.forEach((m) => console.log(`UNMAPPED FEATURED: ${m.name} (${m.slug})`));

process.exit(missing.length + unmapped.length + unmappedFeatured.length > 0 ? 1 : 0);
