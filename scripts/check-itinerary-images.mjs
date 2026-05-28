import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogSrc = fs.readFileSync(path.join(root, "src/data/itinerary-catalog.ts"), "utf8");
const imgSrc = fs.readFileSync(path.join(root, "src/data/destination-images.ts"), "utf8");

function parseRecord(name) {
  const m = imgSrc.match(new RegExp(`export const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!m) return {};
  const o = {};
  for (const line of m[1].split("\n")) {
    const km = line.match(/^\s+"?([\w-]+)"?:\s+(\w+)/);
    if (km) o[km[1]] = km[2];
  }
  return o;
}

const safariThumb = parseRecord("safariThumbImages");
const itinerarySafari = parseRecord("itinerarySafariImages");
const itineraryPkg = parseRecord("itineraryPackageImages");
const itineraryRow = parseRecord("itineraryRowImages");
const itineraryExtra = parseRecord("itineraryExtraImages");
const packageBySlug = parseRecord("packageImageBySlug");

function resolve(row) {
  if (row.imageKey && itineraryRow[row.imageKey]) return itineraryRow[row.imageKey];
  if (row.imageKey && itineraryExtra[row.imageKey]) return itineraryExtra[row.imageKey];
  if (row.safariSlug && itinerarySafari[row.safariSlug]) return itinerarySafari[row.safariSlug];
  if (row.packageSlug && itineraryPkg[row.packageSlug]) return itineraryPkg[row.packageSlug];
  if (row.extraKey && itineraryExtra[row.extraKey]) return itineraryExtra[row.extraKey];
  if (row.safariSlug && safariThumb[row.safariSlug]) return safariThumb[row.safariSlug];
  if (row.packageSlug && packageBySlug[row.packageSlug]) return packageBySlug[row.packageSlug];
  if (row.category === "Zanzibar") return "zanzibarBeach";
  return "migration";
}

const block = catalogSrc.slice(catalogSrc.indexOf("ITINERARY_CATALOG"));
const rows = [];
const re = /\{\s*days:\s*(\d+)[\s\S]*?\}/g;
let m;
while ((m = re.exec(block))) {
  const chunk = m[0];
  const row = { days: Number(m[1]) };
  const sm = chunk.match(/safariSlug:\s*"([^"]+)"/);
  const pm = chunk.match(/packageSlug:\s*"([^"]+)"/);
  const ek = chunk.match(/extraKey:\s*"([^"]+)"/);
  const ik = chunk.match(/imageKey:\s*"([^"]+)"/);
  if (sm) row.safariSlug = sm[1];
  if (pm) row.packageSlug = pm[1];
  if (ek) row.extraKey = ek[1];
  if (ik) row.imageKey = ik[1];
  const cat = chunk.match(/category:\s*"([^"]+)"/);
  row.category = cat ? cat[1] : "";
  row.binding = resolve(row);
  row.label =
    row.safariSlug ??
    (row.packageSlug ? `${row.packageSlug}${row.imageKey ? `:${row.imageKey}` : ""}` : null) ??
    row.extraKey ??
    row.imageKey;
  rows.push(row);
}

const by = new Map();
for (const r of rows) {
  const list = by.get(r.binding) ?? [];
  list.push(`${r.label} (${r.days}d)`);
  by.set(r.binding, list);
}

console.log(`rows: ${rows.length}, unique bindings: ${by.size}`);
for (const r of rows) console.log(r.binding.padEnd(28), r.label);
for (const [b, list] of by) {
  if (list.length > 1) console.log(`DUP ${b}: ${list.join(" | ")}`);
}
