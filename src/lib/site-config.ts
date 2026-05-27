import { SUPPORTED_LANGS } from "@/lib/i18n";

/** Production site URL — set VITE_SITE_URL in env when deploying. */
export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://www.aardvarktanzania.com";

/** Shared contact, trust, and company facts — single source for header, footer, schema, and contact page. */
export const SITE = {
  /** Display name (header, titles) */
  name: "Aardvark Safaris Tanzania",
  /** Legal entity (footer, terms) */
  legalName: "Aardvark Safaris Tanzania Ltd",
  url: SITE_URL.replace(/\/$/, ""),
  tagline: "Tailor-made northern Tanzania safaris from Arusha",
  servicesLine: "Trekking · Safari · Beach Holidays",
  currencies: ["USD", "EUR", "GBP"] as const,
  phoneAfrica: "+255 785 957 611",
  phoneAfricaTel: "+255785957611",
  phoneNA: "(928) 308-9017",
  phoneNATel: "+19283089017",
  /** Primary inbox — all website forms deliver here */
  formsEmail: "info@aardvarktanzania.com",
  emailAfrica: "info@aardvarktanzania.com",
  /** US representative (Walt Anderson) */
  emailNA: "waltandersonafc@gmail.com",
  emailNAPersonal: "waltandersonafc@gmail.com",
  emailNALabel: "Walt Anderson — US Representative",
  enquiryEmail: "info@aardvarktanzania.com",
  addressAfrica: "P.O. Box 11342, Arusha, Tanzania",
  addressNA: "2911 E. Granite Gardens Drive, Prescott AZ 86301-8457",
  whatsapp: "https://wa.me/255785957611",
  tripAdvisor:
    "https://www.tripadvisor.com/Attraction_Review-g6940195-d12600680-Reviews-Aardvark_Safaris-Arusha_National_Park_Arusha_Region.html",
  /** Top bar — keep lines short so the header strip does not wrap awkwardly */
  hoursWeekdays: "Mon–Fri 8:00–20:00 EAT · US 8:00–17:00 MST",
  hoursWeekends: "Sat–Sun 9:00–17:00 EAT · WhatsApp daily",
  locationLabel: "Arusha · Tanzania",
  responseSla: "Same business day during office hours — always within 24 hours.",
  ogImage: "/og-default.jpg",
} as const;

/**
 * Office hours tuned for international guests (US, UK, EU).
 * EAT = East Africa Time (UTC+3). MST = US representative, Arizona (no DST).
 */
/** @deprecated Use i18n `officeHours` — kept for non-React consumers */
export const OFFICE_HOURS = {
  arusha: {
    label: "Arusha, Tanzania (EAT)",
    weekday: "Monday–Friday · 8:00 AM – 8:00 PM",
    weekend: "Saturday–Sunday · 9:00 AM – 5:00 PM",
  },
  us: {
    label: "United States — Walt Anderson (MST)",
    weekday: "Monday–Friday · 8:00 AM – 5:00 PM",
    weekend: null as string | null,
  },
  whatsapp: "WhatsApp & email · 7 days — typically answered within a few hours during office times",
} as const;

/** TripAdvisor — verified May 2026 (content master). Do not claim Travellers' Choice until confirmed on listing. */
export const TRIPADVISOR = {
  rating: 5.0,
  reviewCount: 21,
  ranking: "#5 of 19 Tours & Activities in Arusha National Park",
} as const;

export const BOOKING = {
  steps: [
    { titleKey: "booking.step1Title", descKey: "booking.step1Desc" },
    { titleKey: "booking.step2Title", descKey: "booking.step2Desc" },
    { titleKey: "booking.step3Title", descKey: "booking.step3Desc" },
  ],
  depositGroup: "20%",
  depositCustom: "30%",
  balanceDueDays: 90,
} as const;

export const TRUST_CREDENTIALS = [
  {
    id: "license",
    nameKey: "trust.licenseName",
    tagKey: "trust.licenseTag",
    descKey: "trust.licenseDesc",
    href: "/about",
  },
  {
    id: "tato",
    nameKey: "trust.tatoName",
    tagKey: "trust.tatoTag",
    descKey: "trust.tatoDesc",
    href: "https://www.tato.co.tz/",
  },
  {
    id: "insured",
    nameKey: "trust.insuredName",
    tagKey: "trust.insuredTag",
    descKey: "trust.insuredDesc",
    href: "/faq",
  },
  {
    id: "tripadvisor",
    nameKey: "trust.taName",
    tagKey: "trust.taTag",
    descKey: "trust.taDesc",
    href: SITE.tripAdvisor,
  },
] as const;

export const COMPANY_STATS = [
  { end: 27, suffix: "+", labelKey: "about.stats.years" },
  { end: 21, suffix: "", labelKey: "about.stats.reviews" },
  { end: 5, suffix: "", labelKey: "about.stats.countries" },
  { end: 50, suffix: "+", labelKey: "about.stats.routes" },
] as const;

export function formatStatValue(value: number): string {
  if (value >= 1000) return value.toLocaleString("en-US");
  return String(value);
}

export function currentYear(): number {
  return new Date().getFullYear();
}

export function absoluteUrl(path = ""): string {
  const base = SITE.url;
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl(path?: string): string {
  const img = path ?? SITE.ogImage;
  return img.startsWith("http") ? img : absoluteUrl(img);
}

/** WhatsApp deep link with optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = SITE.whatsapp;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Browser tab / SEO title suffix, e.g. `pageTitle("About")` → "About — Aardvark Safaris Tanzania" */
export function pageTitle(page: string): string {
  return `${page} — ${SITE.name}`;
}

export function hreflangLinks(pathname: string): { rel: string; hrefLang: string; href: string }[] {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return SUPPORTED_LANGS.map((lang) => ({
    rel: "alternate",
    hrefLang: lang,
    href: lang === "en" ? absoluteUrl(path) : `${absoluteUrl(path)}?lang=${lang}`,
  }));
}
