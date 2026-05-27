/**
 * Download authentic Zanzibar photos for package / itinerary cards.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const destDir = path.join(root, "src", "assets", "destinations");
const UA =
  "AardvarkSafariDreams/1.0 (https://aardvarktanzania.com; contact@aardvarktanzania.com)";

/** @type {{ out: string; url: string }[]} */
const ASSETS = [
  {
    out: "dest-zanzibar-nungwi-beach.jpg",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Nungwi_Beach%2C_Zanzibar.jpg",
  },
  {
    out: "dest-zanzibar-stone-town-harbor.jpg",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Forodhani_Gardens%2C_Stone_Town%2C_Zanzibar.jpg",
  },
];

async function downloadOne({ out, url }) {
  const target = path.join(destDir, out);
  const tmp = `${target}.download`;
  console.log(`→ ${out}`);
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 20_000) {
    throw new Error(`${out}: too small (${buf.length} bytes) — likely not an image`);
  }
  if (buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error(`${out}: not JPEG`);
  }
  await fs.writeFile(tmp, buf);
  await fs.rename(tmp, target);
  console.log(`  ✓ ${(buf.length / 1024).toFixed(0)} KB`);
}

for (const asset of ASSETS) {
  await downloadOne(asset);
}

console.log("Done.");
