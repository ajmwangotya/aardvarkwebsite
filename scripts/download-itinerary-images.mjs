/**
 * Fetch topic-matched itinerary hero images from Wikimedia Commons.
 * Usage: node scripts/download-itinerary-images.mjs
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
    out: "dest-itinerary-ngorongoro.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Ngorongoro_crater_panorama.jpg",
  },
  {
    out: "dest-shoebill-lake-victoria.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Shoebill_stork_%28Balaeniceps_rex%29.jpg",
  },
  {
    out: "dest-zanzibar-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Nungwi_Beach%2C_Zanzibar.jpg",
  },
  {
    out: "dest-mkomazi-rhino.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/BlackRhino-USFWS.jpg",
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
  if (buf.length < 10_000) throw new Error(`${out}: file too small (${buf.length} bytes)`);
  if (buf[0] !== 0xff || buf[1] !== 0xd8) {
    const head = buf.slice(0, 80).toString("utf8");
    throw new Error(`${out}: not a JPEG (magic ${buf.slice(0, 4).toString("hex")}) — ${head}`);
  }
  await fs.writeFile(tmp, buf);
  try {
    await fs.unlink(target);
  } catch (err) {
    if (err.code !== "ENOENT") {
      await fs.rename(tmp, target);
      console.log(`  wrote ${out} (${(buf.length / 1024).toFixed(0)} KB) — previous file locked`);
      return;
    }
  }
  await fs.rename(tmp, target);
  console.log(`  ✓ ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
}

for (const asset of ASSETS) {
  await downloadOne(asset);
}

console.log("Done.");
