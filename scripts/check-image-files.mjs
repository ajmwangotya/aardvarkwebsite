import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/data/destination-images.ts"), "utf8");

function isValidImage(filePath) {
  if (!fs.existsSync(filePath)) return { ok: false, reason: "missing" };
  const stat = fs.statSync(filePath);
  if (stat.size < 1024) return { ok: false, reason: `too small (${stat.size} bytes)` };
  const buf = fs.readFileSync(filePath, { start: 0, end: 12 });
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isWebp = buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP";
  if (!isJpeg && !isPng && !isWebp) {
    const preview = buf.toString("utf8", 0, 20).replace(/\s+/g, " ");
    return { ok: false, reason: `invalid header (${preview})` };
  }
  return { ok: true, size: stat.size };
}

const imports = [...src.matchAll(/import (\w+) from "@\/assets\/([^"]+)"/g)];
const usedBindings = new Set();
for (const line of src.split("\n")) {
  const m = line.match(/^\s+[\w"-]+:\s+(\w+),?\s*$/);
  if (m) usedBindings.add(m[1]);
}
for (const line of src.split("\n")) {
  const m = line.match(/^\s+(\w+),?\s*$/);
  if (m && imports.some(([, name]) => name === m[1])) usedBindings.add(m[1]);
}

const importMap = new Map(imports.map(([, name, rel]) => [name, rel]));
let bad = 0;

console.log("Checking destination image assets...\n");
for (const binding of [...usedBindings].sort()) {
  const rel = importMap.get(binding);
  if (!rel) continue;
  const filePath = path.join(root, "src/assets", rel);
  const result = isValidImage(filePath);
  if (!result.ok) {
    bad++;
    console.log(`BAD: ${binding} -> ${rel} (${result.reason})`);
  }
}

console.log(`\nChecked ${usedBindings.size} bindings, ${bad} invalid.`);
process.exit(bad > 0 ? 1 : 0);
