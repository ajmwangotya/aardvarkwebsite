import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ITINERARY_CATALOG } from "./itinerary-catalog.ts";
import { getSafari } from "./safaris.ts";
import { getPackage } from "./packages.ts";

describe("itinerary catalog links", () => {
  it("every safariSlug resolves to a safari with day-by-day content", () => {
    for (const row of ITINERARY_CATALOG) {
      if (!row.safariSlug) continue;
      const safari = getSafari(row.safariSlug);
      assert.ok(safari, `missing safari: ${row.safariSlug}`);
      assert.ok(safari.days.length > 0, `no days: ${row.safariSlug}`);
      assert.ok(safari.intro.trim(), `no intro: ${row.safariSlug}`);
    }
  });

  it("every packageSlug resolves when set", () => {
    for (const row of ITINERARY_CATALOG) {
      if (!row.packageSlug) continue;
      const pkg = getPackage(row.packageSlug);
      assert.ok(pkg, `missing package: ${row.packageSlug}`);
      if (pkg.safariSlug) {
        const safari = getSafari(pkg.safariSlug);
        assert.ok(safari?.days.length, `package ${row.packageSlug} → empty safari ${pkg.safariSlug}`);
      }
    }
  });
});
