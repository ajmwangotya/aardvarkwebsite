import type { TFunction } from "i18next";
import { asObjectArray } from "@/lib/utils";
import { BLOG_EN_POSTS, BLOG_SLUGS, type BlogPostCopy, type BlogSlug } from "./blog";

export type { BlogPostCopy };

function mergeBody(local: string[] | undefined, fallback: string[]): string[] {
  if (Array.isArray(local) && local.length > 0) return local;
  return Array.isArray(fallback) ? fallback : [];
}

function mergePost(slug: BlogSlug, localized: BlogPostCopy | undefined, fallback: BlogPostCopy): BlogPostCopy {
  if (!localized) return fallback;
  return {
    slug,
    title: localized.title?.trim() || fallback.title,
    read: localized.read?.trim() || fallback.read,
    category: localized.category?.trim() || fallback.category,
    excerpt: localized.excerpt?.trim() || fallback.excerpt,
    body: mergeBody(localized.body, fallback.body),
  };
}

/** Blog posts from i18n, keyed by slug with English fallback for missing or partial locale data. */
export function getBlogPosts(t: TFunction): BlogPostCopy[] {
  const localePosts = asObjectArray<BlogPostCopy>(t("blog.posts", { returnObjects: true }));
  const bySlug = new Map(localePosts.map((p) => [p.slug, p]));

  return BLOG_SLUGS.map((slug) => {
    const fallback = BLOG_EN_POSTS.find((p) => p.slug === slug);
    if (!fallback) return null;
    return mergePost(slug, bySlug.get(slug), fallback);
  }).filter((p): p is BlogPostCopy => p !== null);
}

export function getBlogPost(t: TFunction, slug: BlogSlug): BlogPostCopy | undefined {
  return getBlogPosts(t).find((p) => p.slug === slug);
}

export function blogPostMatchesQuery(post: BlogPostCopy, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [post.title, post.excerpt, post.category, ...post.body].join(" ").toLowerCase();
  return haystack.includes(q);
}
