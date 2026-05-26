/** Blog post slugs — content lives in i18n `blog.posts`. */
export const BLOG_SLUGS = [
  "great-migration-timing",
  "tarangire-tuskers",
  "first-timer-guide",
  "kilimanjaro-routes",
  "balloon-serengeti",
  "maasai-encounters",
  "seronera-leopards",
  "northern-camp",
  "safari-food",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(slug);
}

export const BLOG_POST_META: Record<
  BlogSlug,
  { imageIndex: number; date: string; author: string; featured?: boolean }
> = {
  "great-migration-timing": { imageIndex: 0, date: "May 12, 2026", author: "Augustine Mwangotya", featured: true },
  "tarangire-tuskers": { imageIndex: 1, date: "Apr 28, 2026", author: "Lucy Mollel" },
  "first-timer-guide": { imageIndex: 2, date: "Apr 14, 2026", author: "James Kimaro" },
  "kilimanjaro-routes": { imageIndex: 3, date: "Mar 30, 2026", author: "Hassan Mwakyusa" },
  "balloon-serengeti": { imageIndex: 4, date: "Mar 16, 2026", author: "Lucy Mollel" },
  "maasai-encounters": { imageIndex: 5, date: "Feb 22, 2026", author: "Naserian Lemomo" },
  "seronera-leopards": { imageIndex: 6, date: "Feb 08, 2026", author: "Hassan Mwakyusa" },
  "northern-camp": { imageIndex: 7, date: "Jan 25, 2026", author: "Lucy Mollel" },
  "safari-food": { imageIndex: 8, date: "Jan 11, 2026", author: "James Kimaro" },
};
