/**
 * Curated imagery — each slot uses a unique photo matched to its destination.
 * Source photos: see docs/content/RAW-PHOTOS.md and src/assets/{brand,heroes,destinations,editorial,team}/.
 */
import type { CountrySlug } from "@/data/countries";
import type { CircuitSlug } from "@/data/circuits";
import { getPackage, type PackageCategory, type SafariPackage } from "@/data/packages";

// Legacy hero / editorial assets (still used on homepage & blog)
import migration from "@/assets/editorial/migration.jpg";
import maasai from "@/assets/editorial/maasai.jpg";
import gorillaUganda from "@/assets/editorial/gorilla-uganda.jpg";
import gorillaRwanda from "@/assets/editorial/gorilla-rwanda.jpg";
import zanzibarBeach from "@/assets/editorial/zanzibar-beach.jpg";
import heroLion from "@/assets/heroes/hero-lion.jpg";
import heroNdutu1 from "@/assets/heroes/hero-ndutu-1.jpg";
import heroNdutu3 from "@/assets/heroes/hero-ndutu-3.jpg";
import heroNdutu6 from "@/assets/heroes/hero-ndutu-6.jpg";
import balloon from "@/assets/editorial/balloon.jpg";
import elephants from "@/assets/editorial/elephants.jpg";
import acacia from "@/assets/editorial/acacia.jpg";
import leopard from "@/assets/editorial/leopard.jpg";
import camp1 from "@/assets/editorial/camp-1.jpg";
import dining from "@/assets/editorial/dining.jpg";
import walking from "@/assets/editorial/walking.jpg";

// Destination-specific photos from client library
import destSerengetiMigration from "@/assets/destinations/dest-serengeti-migration.jpg";
import destNgorongoroCrater from "@/assets/destinations/dest-ngorongoro-crater.jpg";
import destKilimanjaro from "@/assets/destinations/dest-kilimanjaro.jpg";
import destKenyaMara from "@/assets/destinations/dest-kenya-mara.jpg";
import destUgandaForest from "@/assets/destinations/dest-uganda-forest.jpg";
import destRwandaVolcanoes from "@/assets/destinations/dest-rwanda-volcanoes.jpg";
import destZanzibarCoast from "@/assets/destinations/dest-zanzibar-coast.jpg";
import destNorthernCircuit from "@/assets/destinations/dest-northern-circuit.jpg";
import destSouthernSerengeti from "@/assets/destinations/dest-southern-serengeti.jpg";
import destUgandaHoliday from "@/assets/destinations/dest-uganda-holiday.jpg";
import destDhowSunset from "@/assets/destinations/dest-dhow-sunset.jpg";
import destTarangireElephants from "@/assets/destinations/dest-tarangire-elephants.jpg";
import destArushaPark from "@/assets/destinations/dest-arusha-park.jpg";
import destLakeManyara from "@/assets/destinations/dest-lake-manyara.jpg";
import destRuahaPredators from "@/assets/destinations/dest-ruaha-predators.jpg";
import destSelousRiver from "@/assets/destinations/dest-selous-river.jpg";
import destMountMeru from "@/assets/destinations/dest-mount-meru.jpg";
import destPembaIsland from "@/assets/destinations/dest-pemba-island.jpg";
import destMafiaIsland from "@/assets/destinations/dest-mafia-island.jpg";
import destKenyaSavanna from "@/assets/destinations/dest-kenya-savanna.jpg";
import destBotswanaDelta from "@/assets/destinations/dest-botswana-delta.jpg";
import destVictoriaFalls from "@/assets/destinations/dest-victoria-falls.jpg";
import destCapeTown from "@/assets/destinations/dest-cape-town.jpg";
import destNorthernMigration from "@/assets/destinations/dest-northern-migration.jpg";
import destWildlifeWonders from "@/assets/destinations/dest-wildlife-wonders.jpg";
import destClassicCircuit from "@/assets/destinations/dest-classic-circuit.jpg";
import destExploringSouthernAfrica from "@/assets/destinations/dest-exploring-southern-africa.jpg";
import destNorthernCircuitRoute from "@/assets/destinations/dest-northern-circuit.jpg";
import destIconicTanzania from "@/assets/destinations/dest-iconic-tanzania.jpg";
import destCraterSavannah from "@/assets/destinations/dest-crater-landscape.jpg";
import destQuickSafari from "@/assets/destinations/dest-quick-safari.jpg";
import destDayTour from "@/assets/destinations/dest-day-tour.jpg";
import destSouthernMigration from "@/assets/destinations/dest-southern-migration.jpg";
import destMkomaziRhino from "@/assets/destinations/dest-mkomazi-rhino.jpg";
import destZanzibarHero from "@/assets/destinations/dest-zanzibar-hero.jpg";
import destUgandaExtension from "@/assets/destinations/dest-uganda-extension.jpg";
import destUgandaChimps from "@/assets/destinations/dest-uganda-chimps.jpg";
import destZanzibarExtension from "@/assets/destinations/dest-zanzibar-extension.jpg";
import destGorillaTrek from "@/assets/destinations/dest-gorilla-trek.jpg";
import destCalderaWildlife from "@/assets/destinations/dest-caldera-wildlife.jpg";
import destMaraRiver from "@/assets/destinations/dest-mara-river.jpg";
import destGiraffeNdutu from "@/assets/destinations/dest-giraffe-ndutu.jpg";
import destAcaciaSunset from "@/assets/destinations/dest-acacia-sunset.jpg";
import destBalloonSafari from "@/assets/destinations/dest-balloon-safari.jpg";
import destBushDining from "@/assets/destinations/dest-bush-dining.jpg";
import destTentedCamp from "@/assets/destinations/dest-tented-camp.jpg";
import destLeopardTree from "@/assets/destinations/dest-leopard-tree.jpg";
import destTanzaniaPlains from "@/assets/destinations/dest-tanzania-plains.jpg";
import destTurquoiseLagoon from "@/assets/destinations/dest-turquoise-lagoon.jpg";
import destBeachResort from "@/assets/destinations/dest-beach-resort.jpg";
import destZimbabweHwange from "@/assets/destinations/dest-zimbabwe-hwange.jpg";
import destChobeElephants from "@/assets/destinations/dest-chobe-elephants.jpg";
import destKrugerSafari from "@/assets/destinations/dest-kruger-safari.jpg";
import destEmpakaai from "@/assets/destinations/dest-empakaai.jpg";
import destBaobabSavanna from "@/assets/destinations/dest-baobab-savanna.jpg";
import destSafariLodge from "@/assets/destinations/dest-safari-lodge.jpg";
import destGameDrive from "@/assets/destinations/dest-game-drive.jpg";
import destWalkingSafari from "@/assets/editorial/walking.jpg";
import destMaasaiVillage from "@/assets/destinations/dest-maasai-village.jpg";
import destCulturalEncounter from "@/assets/destinations/dest-cultural-encounter.jpg";
import destNyerereWild from "@/assets/destinations/dest-nyerere-wild.jpg";
import destSelousBush from "@/assets/destinations/dest-selous-bush.jpg";
import destStoneTown from "@/assets/destinations/dest-stone-town.jpg";
import destZanzibarStoneTown from "@/assets/destinations/dest-zanzibar-stone-town.jpg";
import destPembaCircuit from "@/assets/destinations/dest-pemba-circuit.jpg";
import destFlamingoLake from "@/assets/destinations/dest-flamingo-lake.jpg";
import destTreeLion from "@/assets/destinations/dest-tree-lion.jpg";
import destKiliSummit from "@/assets/destinations/dest-kili-summit.jpg";
import destKilimanjaroUhuru from "@/assets/destinations/dest-kilimanjaro-uhuru.jpg";
import destMeruPeak from "@/assets/destinations/dest-meru-peak.jpg";
import destKenyaHighlights from "@/assets/destinations/dest-kenya-highlights.jpg";
import destHippoPool from "@/assets/destinations/dest-hippo-pool.jpg";
import destSouthAfricaCoast from "@/assets/destinations/dest-south-africa-coast.jpg";
import destSpiceIsland from "@/assets/destinations/dest-spice-island.jpg";
import destSnorkelling from "@/assets/destinations/dest-snorkelling.jpg";
import destRwandaNyungwe from "@/assets/destinations/dest-rwanda-nyungwe.jpg";
import destRwandaGoldenMonkey from "@/assets/destinations/dest-rwanda-golden-monkey.jpg";
import destRwandaVirungaGorilla from "@/assets/destinations/dest-rwanda-virunga-gorilla.jpg";
import destBwindiGorillas from "@/assets/destinations/dest-bwindi-gorillas.jpg";
import destCampLuxury from "@/assets/destinations/dest-camp-luxury.jpg";
import destCalvingSeason from "@/assets/destinations/dest-calving-season.jpg";
/** Package cards — Unsplash / Pexels (free licenses); see docs/content/PHOTO-SOURCES.md */
import destPackageGreatMigration from "@/assets/destinations/dest-package-great-migration.jpg";
import destPackageSouthernLion from "@/assets/destinations/dest-package-southern-lion.jpg";
import destPackageFamilyNorthern from "@/assets/destinations/dest-package-family-northern.jpg";
import destPackageCulturalMaasai from "@/assets/destinations/dest-package-cultural-maasai.jpg";
import destPackageHadzabe from "@/assets/destinations/dest-package-hadzabe.jpg";
import destPackageSafariBeachCombo from "@/assets/destinations/dest-package-safari-beach-combo.jpg";
import zanzibarBeach2 from "@/assets/destinations/zanzibar-beach-2.jpg";
import zanzibarBeach3 from "@/assets/destinations/zanzibar-beach-3.jpg";
/** Client safari photo (_DSC8482) — young male lions, golden hour */
import destNorthernTanzaniaLion from "@/assets/destinations/dest-northern-tanzania-lion.jpg";
import campKichuguu from "@/assets/camps/camp-kichuguu.jpg";
import campLionsPaw from "@/assets/camps/camp-lions-paw.jpg";
import campPamoja from "@/assets/camps/camp-pamoja.jpg";
import campMaraMaraKatiKati from "@/assets/camps/camp-mara-mara-kati-kati.jpg";
import campMountMeruHotel from "@/assets/camps/camp-mount-meru-hotel.jpg";
import campSandriverLodge from "@/assets/camps/camp-sandriver-lodge.jpg";

/** Normalise a destination label to a lookup slug (matches `destPage` item names). */
export function destinationImageSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Hero / card image per country — unique per country */
export const countryImages: Record<CountrySlug, string> = {
  tanzania: destIconicTanzania,
  kenya: destKenyaSavanna,
  uganda: gorillaUganda,
  rwanda: destRwandaVirungaGorilla,
  zanzibar: destZanzibarHero,
};

/** Safari circuit imagery (Tanzania) — unique per circuit */
export const circuitImages: Record<CircuitSlug, string> = {
  northern: destNorthernMigration,
  southern: destNyerereWild,
  western: destHippoPool,
  coastal: destPembaCircuit,
};

/** Signature parks on /destinations — one unique photo per park name */
export const featuredParkImageBySlug: Record<string, string> = {
  "serengeti-national-park": destSerengetiMigration,
  "ngorongoro-crater": destNgorongoroCrater,
  "mount-kilimanjaro": destKilimanjaroUhuru,
  "masai-mara-national-reserve": destKenyaMara,
  "bwindi-impenetrable-national-park": destBwindiGorillas,
  "volcanoes-national-park": gorillaRwanda,
};

/** Park & region cards on /destinations — keyed by `destPage.groups` item names */
export const destinationParkImageBySlug: Record<string, string> = {
  serengeti: destMaraRiver,
  ngorongoro: destCalderaWildlife,
  tarangire: destTarangireElephants,
  "arusha-np": destFlamingoLake,
  "lake-manyara": destLakeManyara,
  ruaha: destRuahaPredators,
  selous: destSelousBush,
  kilimanjaro: destKilimanjaroUhuru,
  meru: destMeruPeak,
  zanzibar: destZanzibarHero,
  pemba: destPembaIsland,
  mafia: destMafiaIsland,
  kenya: destKenyaHighlights,
  uganda: destUgandaHoliday,
  rwanda: destRwandaVirungaGorilla,
  botswana: destBotswanaDelta,
  zimbabwe: destVictoriaFalls,
  "south-africa": destSouthAfricaCoast,
};

export function getFeaturedParkImage(name: string): string {
  return featuredParkImageBySlug[destinationImageSlug(name)] ?? imageFallback;
}

export function getDestinationParkImage(name: string): string {
  return destinationParkImageBySlug[destinationImageSlug(name)] ?? imageFallback;
}

export function getCountryImage(slug: CountrySlug): string {
  return countryImages[slug] ?? imageFallback;
}

export function getCircuitImage(slug: CircuitSlug): string {
  return circuitImages[slug] ?? imageFallback;
}

/** @deprecated Use `getFeaturedParkImage` — kept for index-order callers */
export const featuredParkImages = [
  destSerengetiMigration,
  destNgorongoroCrater,
  destKilimanjaro,
  destKenyaMara,
  gorillaUganda,
  destRwandaVirungaGorilla,
] as const;

/** Homepage iconic grid — unique per tile (Serengeti separate from Tanzania card) */
export const iconicDestinationImages = {
  tanzania: destTanzaniaPlains,
  kenya: destKenyaSavanna,
  uganda: gorillaUganda,
  rwanda: destRwandaVirungaGorilla,
  zanzibar: destZanzibarHero,
  serengeti: destMaraRiver,
} as const;

/** Brochure / itinerary thumbnails by safari slug — unique per itinerary */
export const safariThumbImages: Record<string, string> = {
  "serengeti-northern-migration": destNorthernMigration,
  "wildlife-wonders-of-tanzania": destWildlifeWonders,
  "classic-northern-circuit-safari": destClassicCircuit,
  "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit": destVictoriaFalls,
  "northern-circuit-route": destMountMeru,
  "mkomazi-extension": destMkomaziRhino,
  "quick-escape": destQuickSafari,
  "iconic-tanzania": destIconicTanzania,
  "crater-savannah": destCraterSavannah,
  "serengeti-southern-migration-zanzibar": destTurquoiseLagoon,
  "day-tour": destDayTour,
  "uganda-extension": destUgandaExtension,
  "northern-tanzania-wildlife-safari": destNorthernTanzaniaLion,
  "uganda-gorillas-chimps-7-day": destTreeLion,
  "uganda-holiday-8-day": destBwindiGorillas,
  "zanzibar-extension-4-day": zanzibarBeach,
  "rwanda-gorilla-golden-5-day": destRwandaGoldenMonkey,
  "rwanda-double-gorilla-golden-8-day": destRwandaVirungaGorilla,
  "rwanda-nyungwe-double-gorilla-golden-10-day": destRwandaNyungwe,
};

/** Homepage featured trips — HD landscape crops (16:10 cards) with focal points */
export const featuredTripImageMeta: Record<
  string,
  { src: string; objectPosition: string }
> = {
  "northern-tanzania-wildlife-safari": {
    src: destNorthernTanzaniaLion,
    objectPosition: "center 42%",
  },
  "uganda-gorillas-chimps-7-day": {
    src: destTreeLion,
    objectPosition: "center 35%",
  },
  "uganda-holiday-8-day": {
    src: destBwindiGorillas,
    objectPosition: "center 28%",
  },
  "zanzibar-extension-4-day": {
    src: zanzibarBeach,
    objectPosition: "center 55%",
  },
};

export function getFeaturedTripImage(safariSlug: string): {
  src: string;
  objectPosition: string;
} {
  return (
    featuredTripImageMeta[safariSlug] ?? {
      src: safariThumbImages[safariSlug] ?? imageFallback,
      objectPosition: "center center",
    }
  );
}

/**
 * @deprecated Use `getDestinationParkImage` — index arrays caused duplicate photos across sections.
 */
export const destinationGroupImages: string[][] = [
  [
    destMaraRiver,
    destCalderaWildlife,
    destTarangireElephants,
    destFlamingoLake,
    destLakeManyara,
    destRuahaPredators,
    destSelousBush,
  ],
  [destKiliSummit, destMountMeru],
  [destStoneTown, destPembaIsland, destMafiaIsland],
  [
    destKenyaHighlights,
    destUgandaHoliday,
    gorillaRwanda,
    destBotswanaDelta,
    destVictoriaFalls,
    destSouthAfricaCoast,
  ],
];

/** Camps & lodges page — order matches `camps.items` in en.json */
export const campImages = [
  // Kichuguu Camp
  campKichuguu,
  // Lion's Paw Camp
  campLionsPaw,
  // Pamoja Tented Lodge
  campPamoja,
  // Mara Mara Kati Kati Tented Camp
  campMaraMaraKatiKati,
  // Mount Meru Hotel
  campMountMeruHotel,
  // Sandriver Lodge
  campSandriverLodge,
] as const;

/** Experiences page — order matches `experiences.items` in en.json */
export const experienceImages = [
  destNorthernMigration,
  destGameDrive,
  destWalkingSafari,
  destBalloonSafari,
  destBushDining,
  destCulturalEncounter,
] as const;

/** Re-export common editorial assets used outside destination cards */
export {
  migration,
  maasai,
  gorillaUganda,
  gorillaRwanda,
  zanzibarBeach,
  heroLion,
  heroNdutu1,
  heroNdutu3,
  heroNdutu6,
  balloon,
  elephants,
  acacia,
  leopard,
  camp1,
  dining,
  walking,
  destBalloonSafari,
  destBushDining,
  destTentedCamp,
  destLeopardTree,
  destGiraffeNdutu,
  destAcaciaSunset,
  destBeachResort,
  destTurquoiseLagoon,
  destZanzibarExtension,
  destKrugerSafari,
  destChobeElephants,
  destZimbabweHwange,
  destEmpakaai,
  destBaobabSavanna,
  destGorillaTrek,
};

/** Fallback when a package has no slug-specific image */
export const packageCategoryImages: Record<PackageCategory, string> = {
  "luxury-safaris": destCampLuxury,
  "mid-range-safaris": destBalloonSafari,
  "honeymoon-safaris": destDhowSunset,
  "family-adventures": destTarangireElephants,
  "migration-safaris": destSerengetiMigration,
  "gorilla-trekking": destBwindiGorillas,
  "beach-safari-combos": destZanzibarCoast,
  "kilimanjaro-climbs": destKilimanjaroUhuru,
  "cultural-tours": destMaasaiVillage,
};

/** One distinct photo per package card on /packages */
export const packageImageBySlug: Record<string, string> = {
  "serengeti-luxury-migration": destNorthernMigration,
  "wildlife-wonders-luxury": destSafariLodge,
  "classic-northern-mid": destClassicCircuit,
  "iconic-tanzania-mid": destIconicTanzania,
  "serengeti-zanzibar-honeymoon": zanzibarBeach2,
  "crater-romance": destCraterSavannah,
  "family-northern-circuit": destPackageFamilyNorthern,
  "quick-family-escape": destQuickSafari,
  "northern-migration": destPackageGreatMigration,
  "southern-calving": destPackageSouthernLion,
  "uganda-gorilla": gorillaUganda,
  "northern-tanzania-wildlife": destNorthernTanzaniaLion,
  "uganda-gorillas-chimps-7": destTreeLion,
  "uganda-holiday-8": destBwindiGorillas,
  "zanzibar-extension-4": zanzibarBeach,
  "rwanda-gorilla-golden-5": destRwandaGoldenMonkey,
  "rwanda-gorilla": destRwandaGoldenMonkey,
  "safari-beach-combo": destPackageSafariBeachCombo,
  "kili-northern-circuit": destKiliSummit,
  "cultural-northern": destPackageCulturalMaasai,
  "maasai-hadzabe": destPackageHadzabe,
};

export function getPackageImage(pkg: Pick<SafariPackage, "slug" | "safariSlug" | "category">): string {
  if (packageImageBySlug[pkg.slug]) return packageImageBySlug[pkg.slug];
  if (pkg.safariSlug && safariThumbImages[pkg.safariSlug]) return safariThumbImages[pkg.safariSlug];
  return packageCategoryImages[pkg.category];
}

/** /itineraries catalog — safari rows that need a distinct hero from brochure thumbs */
export const itinerarySafariImages: Record<string, string> = {
  "northern-tanzania-wildlife-safari": destNorthernTanzaniaLion,
  "uganda-gorillas-chimps-7-day": destTreeLion,
  "uganda-holiday-8-day": destBwindiGorillas,
  "northern-circuit-route": destKilimanjaroUhuru,
  "serengeti-southern-migration-zanzibar": destCalvingSeason,
  "uganda-extension": destUgandaExtension,
};

/** /itineraries catalog — package rows */
export const itineraryPackageImages: Record<string, string> = {
  "zanzibar-extension-4": destZanzibarHero,
  "safari-beach-combo": destStoneTown,
  "serengeti-zanzibar-honeymoon": zanzibarBeach2,
};

/** /itineraries catalog — per-row keys when package slug is shared */
export const itineraryRowImages: Record<string, string> = {
  "zanzibar-essentials-3n": zanzibarBeach3,
  victoriaFalls: destVictoriaFalls,
  okavangoDelta: destSouthernAfrica,
  southernWildlife: destExploringSouthernAfrica,
};

export const itineraryExtraImages: Record<string, string> = {
  okavangoDelta: destSouthernAfrica,
};

export function getItineraryCatalogImage(row: {
  safariSlug?: string;
  packageSlug?: string;
  extraKey?: string;
  imageKey?: string;
  category: string;
}): string {
  if (row.imageKey) {
    if (itineraryRowImages[row.imageKey]) return itineraryRowImages[row.imageKey];
    if (itineraryExtraImages[row.imageKey]) return itineraryExtraImages[row.imageKey];
  }
  if (row.safariSlug && itinerarySafariImages[row.safariSlug]) {
    return itinerarySafariImages[row.safariSlug];
  }
  if (row.packageSlug && itineraryPackageImages[row.packageSlug]) {
    return itineraryPackageImages[row.packageSlug];
  }
  if (row.extraKey && itineraryExtraImages[row.extraKey]) {
    return itineraryExtraImages[row.extraKey];
  }
  if (row.safariSlug && safariThumbImages[row.safariSlug]) {
    return safariThumbImages[row.safariSlug];
  }
  if (row.packageSlug) {
    const pkg = getPackage(row.packageSlug);
    if (pkg) return getPackageImage(pkg);
  }
  if (row.category === "Zanzibar") return zanzibarBeach;
  return migration;
}

/** Used when an image fails to load or a slot has no mapped asset. */
export const imageFallback = migration;
