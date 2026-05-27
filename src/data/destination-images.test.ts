import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "destination-images.ts");
const source = readFileSync(file, "utf8");

function getImportNames(src: string) {
  const names = new Set<string>();
  for (const match of src.matchAll(/^import (\w+) from/gm)) {
    names.add(match[1]);
  }
  return names;
}

function getMappedImageBindings(src: string) {
  const bindings = new Set<string>();
  for (const line of src.split("\n")) {
    const match = line.match(/^\s+[\w"-]+:\s+(\w+),?\s*$/);
    if (match) bindings.add(match[1]);
  }
  return bindings;
}

describe("destination-images", () => {
  it("maps only reference imported image bindings", () => {
    const imports = getImportNames(source);
    const bindings = getMappedImageBindings(source);

    for (const binding of bindings) {
      assert.ok(
        imports.has(binding),
        `Missing import for image binding "${binding}" in destination-images.ts`,
      );
    }
  });

  it("defines a non-empty fallback image binding", () => {
    assert.match(source, /export const imageFallback = migration;/);
  });
});
