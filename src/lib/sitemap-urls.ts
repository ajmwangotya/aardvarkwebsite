import { SITE } from "@/lib/site-config";
import { safaris } from "@/data/safaris";
import { PACKAGES } from "@/data/packages";
import { COUNTRY_SLUGS } from "@/data/countries";
import { BLOG_SLUGS } from "@/data/blog";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/destinations",
  "/packages",
  "/itineraries",
  "/experiences",
  "/camps",
  "/blog",
  "/contact",
  "/plan-trip",
  "/faq",
  "/privacy",
  "/terms",
] as const;

export function getAllSitemapPaths(): string[] {
  return [
    ...STATIC_ROUTES,
    ...COUNTRY_SLUGS.map((s) => `/destinations/${s}`),
    ...safaris.map((s) => `/safaris/${s.slug}`),
    ...PACKAGES.map((p) => `/packages/${p.slug}`),
    ...BLOG_SLUGS.map((s) => `/blog/${s}`),
  ];
}

export function buildSitemapXml(): string {
  const base = SITE.url;
  const urls = getAllSitemapPaths()
    .map(
      (path) =>
        `  <url><loc>${base}${path === "/" ? "/" : path}</loc><changefreq>${path === "/" || path.startsWith("/blog") ? "weekly" : "monthly"}</changefreq></url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
