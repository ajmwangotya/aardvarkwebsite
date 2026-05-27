import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("videoUrl", () => {
  it("resolves CDN paths for known filenames", async () => {
    const { videoUrl } = await import("./video-url");
    const url = videoUrl("aardvark-wild.mp4");
    assert.equal(url, "/videos/aardvark-wild.mp4");
  });
});
