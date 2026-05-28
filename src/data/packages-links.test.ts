import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { PACKAGES } from "./packages.ts";
import { safaris } from "./safaris.ts";
import en from "../locales/en.json" with { type: "json" };

const routeTreeSource = readFileSync(new URL("../routeTree.gen.ts", import.meta.url), "utf8");

describe("package links", () => {
  it("registers /packages/$slug as a flat route (not nested under /packages)", () => {
    assert.match(
      routeTreeSource,
      /PackagesSlugRoute[\s\S]*getParentRoute:\s*\(\)\s*=>\s*rootRouteImport/,
      "packages/$slug must be a root child route so detail pages render (parent /packages has no Outlet)",
    );
    assert.match(
      routeTreeSource,
      /fullPath:\s*'\/packages\/\$slug'/,
      "routeTree must expose dynamic package detail path /packages/$slug",
    );
    assert.doesNotMatch(
      routeTreeSource,
      /PackagesSlugRoute[\s\S]*getParentRoute:\s*\(\)\s*=>\s*PackagesRoute/,
      "packages/$slug must not nest under PackagesRoute (no Outlet on listing page)",
    );
  });

  it("every package has copy and a valid safari slug when linked", () => {
    const safariSlugs = new Set(safaris.map((s) => s.slug));
    const items = en.packagesPage.items;

    for (const pkg of PACKAGES) {
      assert.ok(items[pkg.i18nKey]?.title, `missing en title for ${pkg.slug}`);
      if (pkg.safariSlug) {
        assert.ok(safariSlugs.has(pkg.safariSlug), `${pkg.slug} → unknown safari ${pkg.safariSlug}`);
      }
    }
  });
});
