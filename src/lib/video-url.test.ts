import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("videoUrl", () => {
  it("resolves same-origin proxy paths for known filenames", async () => {
    const { videoUrl } = await import("./video-url");
    const url = videoUrl("aardvark-wild.mp4");
    assert.equal(url, "/videos/aardvark-wild.mp4");
  });

  it("exposes a non-empty upstream CDN base in production builds", async () => {
    const { getVideoUpstreamBase } = await import("./video-url");
    const base = getVideoUpstreamBase();
    assert.match(base, /^https:\/\//);
    assert.ok(!base.endsWith("/"));
  });
});
