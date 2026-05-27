import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { BLOG_SLUGS } from "./blog.js";

const localesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../locales");

describe("blog locale content", () => {
  for (const file of ["en.json", "de.json", "fr.json", "es.json", "it.json"]) {
    it(`${file} has every blog slug with a non-empty body`, () => {
      const locale = JSON.parse(readFileSync(path.join(localesDir, file), "utf8"));
      const posts = locale.blog?.posts;
      assert.ok(Array.isArray(posts), `blog.posts must be an array in ${file}`);

      const slugs = posts.map((p: { slug: string }) => p.slug);
      for (const slug of BLOG_SLUGS) {
        assert.ok(slugs.includes(slug), `Missing post "${slug}" in ${file}`);
      }

      for (const post of posts) {
        assert.ok(
          Array.isArray(post.body) && post.body.length > 0,
          `Post "${post.slug}" in ${file} must have a non-empty body array`,
        );
        const categories = locale.blog?.categories ?? {};
        assert.ok(
          Object.values(categories).includes(post.category),
          `Post "${post.slug}" category "${post.category}" must match blog.categories in ${file}`,
        );
      }
    });
  }
});
