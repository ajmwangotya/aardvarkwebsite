import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PACKAGES } from "./packages.ts";
import { getPackageImage } from "./destination-images.ts";

describe("package images", () => {
  it("assigns a unique photo to every package on /packages", () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const pkg of PACKAGES) {
      const src = getPackageImage(pkg);
      assert.ok(src, `missing image for package "${pkg.slug}"`);

      const other = seen.get(src);
      if (other) {
        duplicates.push(`${pkg.slug} and ${other} share the same image`);
      } else {
        seen.set(src, pkg.slug);
      }
    }

    assert.equal(
      duplicates.length,
      0,
      `Duplicate package photos:\n${duplicates.join("\n")}`,
    );
  });
});
