import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { safaris } from "@/data/safaris";
import { waypointsForMap } from "@/lib/safari-waypoints";

describe("safari waypoints", () => {
  it("every safari has at least two map stops", () => {
    for (const safari of safaris) {
      assert.ok(safari.waypoints?.length, `missing waypoints: ${safari.slug}`);
      assert.ok(safari.waypoints!.length >= 2, `too few waypoints: ${safari.slug}`);
    }
  });

  it("waypointsForMap removes consecutive duplicate coordinates", () => {
    const deduped = waypointsForMap([
      { name: "Kigali", lat: -1.94, lng: 30.06 },
      { name: "Kigali (airport)", lat: -1.94, lng: 30.06 },
      { name: "Volcanoes", lat: -1.47, lng: 29.53 },
    ]);
    assert.equal(deduped.length, 2);
  });
});
