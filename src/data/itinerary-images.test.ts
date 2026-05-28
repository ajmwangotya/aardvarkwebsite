import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const dataDir = path.dirname(fileURLToPath(import.meta.url));
const catalogSrc = readFileSync(path.join(dataDir, "itinerary-catalog.ts"), "utf8");
const imgSrc = readFileSync(path.join(dataDir, "destination-images.ts"), "utf8");

function parseRecord(name: string): Record<string, string> {
  const match = imgSrc.match(new RegExp(`export const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!match) return {};
  const record: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const keyMatch = line.match(/^\s+"?([\w-]+)"?:\s+(\w+)/);
    if (keyMatch) record[keyMatch[1]] = keyMatch[2];
  }
  return record;
}

const safariThumb = parseRecord("safariThumbImages");
const itinerarySafari = parseRecord("itinerarySafariImages");
const itineraryPkg = parseRecord("itineraryPackageImages");
const itineraryRow = parseRecord("itineraryRowImages");
const itineraryExtra = parseRecord("itineraryExtraImages");
const packageBySlug = parseRecord("packageImageBySlug");

function resolveCatalogImage(row: {
  safariSlug?: string;
  packageSlug?: string;
  extraKey?: string;
  imageKey?: string;
  category: string;
}): string {
  if (row.imageKey) {
    if (itineraryRow[row.imageKey]) return itineraryRow[row.imageKey];
    if (itineraryExtra[row.imageKey]) return itineraryExtra[row.imageKey];
  }
  if (row.safariSlug && itinerarySafari[row.safariSlug]) return itinerarySafari[row.safariSlug];
  if (row.packageSlug && itineraryPkg[row.packageSlug]) return itineraryPkg[row.packageSlug];
  if (row.extraKey && itineraryExtra[row.extraKey]) return itineraryExtra[row.extraKey];
  if (row.safariSlug && safariThumb[row.safariSlug]) return safariThumb[row.safariSlug];
  if (row.packageSlug && packageBySlug[row.packageSlug]) return packageBySlug[row.packageSlug];
  if (row.category === "Zanzibar") return "zanzibarBeach";
  return "migration";
}

function parseCatalogRows(): Array<{
  safariSlug?: string;
  packageSlug?: string;
  extraKey?: string;
  imageKey?: string;
  category: string;
  label: string;
}> {
  const block = catalogSrc.slice(catalogSrc.indexOf("ITINERARY_CATALOG"));
  const rows: Array<{
    safariSlug?: string;
    packageSlug?: string;
    extraKey?: string;
    imageKey?: string;
    category: string;
    label: string;
  }> = [];
  const re = /\{\s*days:\s*\d+[\s\S]*?\}/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(block))) {
    const chunk = match[0];
    const row: {
      safariSlug?: string;
      packageSlug?: string;
      extraKey?: string;
      imageKey?: string;
      category: string;
      label: string;
    } = { category: "", label: "" };
    const safariMatch = chunk.match(/safariSlug:\s*"([^"]+)"/);
    const packageMatch = chunk.match(/packageSlug:\s*"([^"]+)"/);
    const extraMatch = chunk.match(/extraKey:\s*"([^"]+)"/);
    const imageMatch = chunk.match(/imageKey:\s*"([^"]+)"/);
    const categoryMatch = chunk.match(/category:\s*"([^"]+)"/);
    if (safariMatch) row.safariSlug = safariMatch[1];
    if (packageMatch) row.packageSlug = packageMatch[1];
    if (extraMatch) row.extraKey = extraMatch[1];
    if (imageMatch) row.imageKey = imageMatch[1];
    row.category = categoryMatch?.[1] ?? "";
    row.label =
      row.safariSlug ??
      (row.packageSlug ? `${row.packageSlug}${row.imageKey ? `:${row.imageKey}` : ""}` : "") ??
      row.extraKey ??
      row.imageKey ??
      "unknown";
    rows.push(row);
  }
  return rows;
}

describe("itinerary catalog images", () => {
  it("assigns a unique photo to every itinerary on /itineraries", () => {
    const rows = parseCatalogRows();
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const row of rows) {
      const binding = resolveCatalogImage(row);
      assert.ok(binding, `missing image for ${row.label}`);

      const other = seen.get(binding);
      if (other) {
        duplicates.push(`${row.label} and ${other} share the same image (${binding})`);
      } else {
        seen.set(binding, row.label);
      }
    }

    assert.equal(
      duplicates.length,
      0,
      `Duplicate itinerary photos:\n${duplicates.join("\n")}`,
    );
  });

  it("uses distinct Southern Africa catalog photos (Victoria Falls vs Okavango wildlife)", () => {
    assert.match(imgSrc, /victoriaFalls:\s*destVictoriaFalls/);
    assert.match(imgSrc, /okavangoDelta:\s*destSouthernAfrica/);
    assert.match(imgSrc, /"zanzibar-essentials-3n":\s*zanzibarBeach3/);
    assert.doesNotMatch(imgSrc, /"zanzibar-essentials-3n":\s*destZanzibarHero/);

    const rows = parseCatalogRows().filter((r) => r.category === "Southern Africa");
    assert.equal(rows.length, 2);
    const bindings = rows.map((r) => resolveCatalogImage(r));
    assert.notEqual(bindings[0], bindings[1], "Southern Africa rows must not share the same image");
    assert.ok(
      bindings.some((b) => b === "destVictoriaFalls"),
      "one Southern Africa row must use Victoria Falls",
    );
  });
});
