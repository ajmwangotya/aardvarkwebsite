import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import en from "../locales/en.json" with { type: "json" };

const dataDir = path.dirname(fileURLToPath(import.meta.url));
const destinationImagesSource = readFileSync(
  path.join(dataDir, "destination-images.ts"),
  "utf8",
);

function extractRecordKeys(exportName: string): string[] {
  const match = destinationImagesSource.match(
    new RegExp(`export const ${exportName}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`),
  );
  if (!match) return [];
  const keys: string[] = [];
  for (const line of match[1].split("\n")) {
    const keyMatch = line.match(/^\s+"([^"]+)":/);
    if (keyMatch) keys.push(keyMatch[1]);
  }
  return keys;
}

describe("image slot policy", () => {
  it("maps every safari extension slug to a thumbnail image", () => {
    const thumbs = extractRecordKeys("safariThumbImages");
    const extensionSlugs = en.itinerariesPage.extensions.map((e: { slug: string }) => e.slug);

    for (const slug of extensionSlugs) {
      assert.ok(
        thumbs.includes(slug),
        `safariThumbImages missing extension slug "${slug}"`,
      );
    }
  });

  it("maps mkomazi and zanzibar extensions to distinct image bindings", () => {
    assert.match(destinationImagesSource, /"mkomazi-extension":\s*destMkomaziRhino/);
    assert.match(
      destinationImagesSource,
      /"zanzibar-extension-4-day":\s*destZanzibarHero/,
    );
    assert.doesNotMatch(destinationImagesSource, /"mkomazi-extension":\s*destZanzibar/);
  });

  it("uses the Zanzibar hero beach image for country zanzibar", () => {
    assert.match(destinationImagesSource, /zanzibar:\s*destZanzibarHero/);
  });

  it("uses client northern Tanzania lion photo for wildlife safari hero", () => {
    assert.match(
      destinationImagesSource,
      /"northern-tanzania-wildlife-safari":\s*destNorthernTanzaniaLion/,
    );
    assert.doesNotMatch(
      destinationImagesSource,
      /"northern-tanzania-wildlife-safari":\s*heroLion/,
    );
  });
});
