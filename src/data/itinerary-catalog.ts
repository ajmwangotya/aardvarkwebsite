/** Listing rows for /itineraries — slug/packageSlug/extraKey drive copy (not array index). */
export type ItineraryCategory = "Tanzania" | "Uganda" | "Southern Africa" | "Zanzibar";

export type ItineraryCatalogRow = {
  days: number;
  category: ItineraryCategory;
  durationLabel?: string;
  safariSlug?: string;
  packageSlug?: string;
  /** i18n: itinerariesPage.extra.{extraKey} */
  extraKey?: string;
  /** Optional image override key — see `itineraryRowImages` in destination-images.ts */
  imageKey?: string;
};

export const ITINERARY_CATALOG: ItineraryCatalogRow[] = [
  { days: 9, category: "Tanzania", safariSlug: "northern-tanzania-wildlife-safari" },
  { days: 7, category: "Uganda", safariSlug: "uganda-gorillas-chimps-7-day" },
  { days: 8, category: "Uganda", safariSlug: "uganda-holiday-8-day" },
  { days: 4, category: "Zanzibar", packageSlug: "zanzibar-extension-4" },
  { days: 12, category: "Tanzania", safariSlug: "serengeti-northern-migration" },
  { days: 11, category: "Tanzania", safariSlug: "wildlife-wonders-of-tanzania" },
  { days: 10, category: "Tanzania", safariSlug: "classic-northern-circuit-safari" },
  { days: 10, category: "Tanzania", safariSlug: "northern-circuit-route" },
  { days: 4, category: "Tanzania", safariSlug: "iconic-tanzania" },
  { days: 3, category: "Tanzania", safariSlug: "crater-savannah" },
  { days: 2, category: "Tanzania", safariSlug: "quick-escape" },
  { days: 1, category: "Tanzania", safariSlug: "day-tour" },
  { days: 8, category: "Tanzania", safariSlug: "serengeti-southern-migration-zanzibar" },
  { days: 4, category: "Tanzania", safariSlug: "mkomazi-extension" },
  { days: 6, category: "Tanzania", safariSlug: "uganda-extension" },
  { days: 11, category: "Southern Africa", safariSlug: "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit" },
  { days: 8, category: "Southern Africa", extraKey: "okavangoDelta" },
  { days: 5, durationLabel: "5 Nights", category: "Zanzibar", packageSlug: "safari-beach-combo" },
  { days: 5, category: "Zanzibar", packageSlug: "serengeti-zanzibar-honeymoon" },
  { days: 3, durationLabel: "3 Nights", category: "Zanzibar", packageSlug: "zanzibar-extension-4", imageKey: "zanzibar-essentials-3n" },
];
