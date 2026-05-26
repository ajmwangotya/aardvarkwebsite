import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITE_URL = process.env.VITE_SITE_URL ?? "https://www.aardvarktanzania.com";

const STATIC = [
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
];

const COUNTRIES = ["tanzania", "kenya", "uganda", "rwanda", "zanzibar"];

const BLOG = [
  "great-migration-timing",
  "tarangire-tuskers",
  "first-timer-guide",
  "kilimanjaro-routes",
  "balloon-serengeti",
  "maasai-encounters",
  "seronera-leopards",
  "northern-camp",
  "safari-food",
];

const SAFARI_SLUGS = [
  "serengeti-northern-migration",
  "wildlife-wonders-of-tanzania",
  "classic-northern-circuit-safari",
  "northern-circuit-route",
  "iconic-tanzania",
  "crater-savannah",
  "quick-escape",
  "day-tour",
  "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit",
  "serengeti-southern-migration-zanzibar",
  "mkomazi-extension",
  "uganda-extension",
  "northern-tanzania-wildlife-safari",
  "uganda-gorillas-chimps-7-day",
  "uganda-holiday-8-day",
  "zanzibar-extension-4-day",
];

const PACKAGE_SLUGS = [
  "serengeti-luxury-migration",
  "wildlife-wonders-luxury",
  "classic-northern-mid",
  "iconic-tanzania-mid",
  "serengeti-zanzibar-honeymoon",
  "crater-romance",
  "family-northern-circuit",
  "quick-family-escape",
  "northern-migration",
  "southern-calving",
  "uganda-gorilla",
  "northern-tanzania-wildlife",
  "uganda-gorillas-chimps-7",
  "uganda-holiday-8",
  "zanzibar-extension-4",
  "rwanda-gorilla",
  "safari-beach-combo",
  "kili-northern-circuit",
  "cultural-northern",
  "maasai-hadzabe",
];

const paths = [
  ...STATIC,
  ...COUNTRIES.map((s) => `/destinations/${s}`),
  ...SAFARI_SLUGS.map((s) => `/safaris/${s}`),
  ...PACKAGE_SLUGS.map((s) => `/packages/${s}`),
  ...BLOG.map((s) => `/blog/${s}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => {
    const loc = `${SITE_URL.replace(/\/$/, "")}${p === "/" ? "/" : p}`;
    const freq = p === "/" || p.startsWith("/blog") ? "weekly" : "monthly";
    const priority = p === "/" ? "1.0" : p === "/plan-trip" ? "0.9" : "0.7";
    return `  <url><loc>${loc}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
writeFileSync(
  join(root, "public", "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL.replace(/\/$/, "")}/sitemap.xml
`,
);
console.log(`Wrote ${paths.length} URLs to public/sitemap.xml`);
