import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const localesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../locales");
const REQUIRED_ARRAYS = ["items", "crafts", "cuisine", "seasons", "airports"] as const;
const EXPECTED_LENGTHS: Record<(typeof REQUIRED_ARRAYS)[number], number> = {
  items: 6,
  crafts: 4,
  cuisine: 4,
  seasons: 3,
  airports: 4,
};

describe("experiences locale content", () => {
  for (const file of ["en.json", "de.json", "fr.json", "es.json", "it.json"]) {
    it(`${file} has complete experiences sections`, () => {
      const locale = JSON.parse(readFileSync(path.join(localesDir, file), "utf8"));
      const exp = locale.experiences;
      assert.equal(typeof exp, "object", `experiences must be an object in ${file}`);
      assert.notEqual(exp, null);

      for (const key of REQUIRED_ARRAYS) {
        const arr = exp[key];
        assert.ok(Array.isArray(arr), `experiences.${key} must be an array in ${file}`);
        assert.equal(
          arr.length,
          EXPECTED_LENGTHS[key],
          `experiences.${key} length mismatch in ${file}`,
        );
      }

      for (const season of exp.seasons) {
        assert.ok(
          Array.isArray(season.items) && season.items.length > 0,
          `each season needs items in ${file}`,
        );
      }
    });
  }
});
