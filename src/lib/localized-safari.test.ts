import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ITINERARY_CATALOG } from "@/data/itinerary-catalog";
import i18n from "@/lib/i18n";
import { getLocalizedSafari } from "@/lib/localized-safari";

describe("getLocalizedSafari", () => {
  it("returns day-by-day content for every catalog safari slug", () => {
    for (const row of ITINERARY_CATALOG) {
      if (!row.safariSlug) continue;
      const safari = getLocalizedSafari(row.safariSlug, i18n.t.bind(i18n));
      assert.ok(safari, `missing safari: ${row.safariSlug}`);
      assert.ok(safari.days.length > 0, `no days for ${row.safariSlug}`);
      assert.ok(safari.intro.trim(), `no intro for ${row.safariSlug}`);
    }
  });
});
