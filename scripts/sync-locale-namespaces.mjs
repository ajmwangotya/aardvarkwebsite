/**
 * Merges critical namespaces from en.json into de/fr/es/it when missing.
 * Run: node scripts/sync-locale-namespaces.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = join(root, "src", "locales");

const NAMESPACES_FROM_EN = [
  "video",
  "officeHours",
  "forms",
  "cookie",
  "whatsapp",
  "mobileCta",
  "trust",
  "booking",
  "faq",
  "migration",
  "safariDetail",
  "featuredJourneys",
  "guestNotes",
  "packagesPage",
  "notFound",
  "featuredPackages",
  "safarisContent",
];

const HOME_PARTIAL_KEYS = ["trustJourneys", "destAlt"];

const en = JSON.parse(readFileSync(join(localesDir, "en.json"), "utf8"));

for (const lang of ["de", "fr", "es", "it"]) {
  const path = join(localesDir, `${lang}.json`);
  const locale = JSON.parse(readFileSync(path, "utf8"));

  for (const ns of NAMESPACES_FROM_EN) {
    if (en[ns] !== undefined) {
      locale[ns] = en[ns];
    }
  }

  if (en.reviews?.items && locale.reviews) {
    locale.reviews.items = en.reviews.items;
    locale.reviews.subdesc = en.reviews.subdesc;
    locale.reviews.basedOn = en.reviews.basedOn;
    locale.reviews.ranking = en.reviews.ranking;
    delete locale.reviews.travellersChoice;
  }

  if (locale.home) {
    if (en.home?.trustJourneys) locale.home.trustJourneys = en.home.trustJourneys;
    if (en.home?.destAlt) locale.home.destAlt = en.home.destAlt;
  }
  if (locale.footer && en.footer) {
    for (const key of ["camps", "newsletterDone", "newsletterError", "regionAfrica", "regionNA", "taLine"]) {
      if (en.footer[key]) locale.footer[key] = en.footer[key];
    }
  }
  if (locale.destPage && en.destPage?.parksTitle) {
    locale.destPage.parksTitle = en.destPage.parksTitle;
  }

  if (en.itinerariesPage?.extra) {
    locale.itinerariesPage = locale.itinerariesPage ?? {};
    locale.itinerariesPage.extra = en.itinerariesPage.extra;
  }

  if (locale.nav && en.nav?.faq) {
    locale.nav.faq = locale.nav.faq ?? en.nav.faq;
  }

  writeFileSync(path, `${JSON.stringify(locale, null, 2)}\n`, "utf8");
  console.log(`Updated ${lang}.json`);
}

console.log("Done.");
