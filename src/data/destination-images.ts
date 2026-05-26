/**
 * Curated imagery — each slot uses a unique photo matched to its destination.
 * Source photos: see docs/content/RAW-PHOTOS.md and src/assets/{brand,heroes,destinations,editorial,team}/.
 */
import type { CountrySlug } from "@/data/countries";
import type { CircuitSlug } from "@/data/circuits";
import type { PackageCategory, SafariPackage } from "@/data/packages";

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

/** Hero / card image per country — unique per country */
export const countryImages: Record<CountrySlug, string> = {
  tanzania: destSerengetiMigration,
  kenya: destKenyaMara,
  uganda: gorillaUganda,
  rwanda: destRwandaVolcanoes,
  zanzibar: zanzibarBeach,
};

/** Safari circuit imagery (Tanzania) — unique per circuit */
export const circuitImages: Record<CircuitSlug, string> = {
  northern: destNorthernCircuit,
  southern: destSouthernSerengeti,
  western: destUgandaForest,
  coastal: zanzibarBeach,
};

/** Featured signature parks — order matches `destPage.featuredParks` in en.json */
export const featuredParkImages = [
  destSerengetiMigration,
  destNgorongoroCrater,
  destKilimanjaro,
  destKenyaMara,
  gorillaUganda,
  destRwandaVolcanoes,
] as const;

/** Homepage iconic grid — unique per tile (Serengeti separate from Tanzania card) */
export const iconicDestinationImages = {
  tanzania: destTanzaniaPlains,
  kenya: destKenyaSavanna,
  uganda: gorillaUganda,
  rwanda: destRwandaVolcanoes,
  zanzibar: zanzibarBeach,
  serengeti: destMaraRiver,
} as const;

/** Brochure / itinerary thumbnails by safari slug — unique per itinerary */
export const safariThumbImages: Record<string, string> = {
  "serengeti-northern-migration": destNorthernMigration,
  "wildlife-wonders-of-tanzania": destWildlifeWonders,
  "classic-northern-circuit-safari": destClassicCircuit,
  "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit": destExploringSouthernAfrica,
  "northern-circuit-route": destMountMeru,
  "mkomazi-extension": destMkomaziRhino,
  "quick-escape": destQuickSafari,
  "iconic-tanzania": destIconicTanzania,
  "crater-savannah": destCraterSavannah,
  "serengeti-southern-migration-zanzibar": destSouthernMigration,
  "day-tour": destDayTour,
  "uganda-extension": destUgandaExtension,
  "northern-tanzania-wildlife-safari": destGiraffeNdutu,
  "uganda-gorillas-chimps-7-day": destUgandaChimps,
  "uganda-holiday-8-day": destUgandaHoliday,
  "zanzibar-extension-4-day": zanzibarBeach,
};

/**
 * Park & region cards on /destinations — grouped by `destPage.groups` order.
 * Group 0: Tanzania national parks (7)
 * Group 1: Mountains (2)
 * Group 2: Islands (3)
 * Group 3: Other countries (6)
 */
export const destinationGroupImages: string[][] = [
  [
    destSerengetiMigration,
    destCalderaWildlife,
    destTarangireElephants,
    destArushaPark,
    destLakeManyara,
    destRuahaPredators,
    destSelousRiver,
  ],
  [destKilimanjaro, destMountMeru],
  [zanzibarBeach, destPembaIsland, destMafiaIsland],
  [
    destKenyaMara,
    destUgandaForest,
    destRwandaVolcanoes,
    destBotswanaDelta,
    destVictoriaFalls,
    destCapeTown,
  ],
];

/** Camps & lodges page — order matches `camps.items` in en.json */
export const campImages = [
  destTentedCamp,
  destSafariLodge,
  destBaobabSavanna,
  destLakeManyara,
  destSelousRiver,
  destArushaPark,
] as const;

/** Experiences page — order matches `experiences.items` in en.json */
export const experienceImages = [
  destGameDrive,
  destWalkingSafari,
  destBalloonSafari,
  destBushDining,
  destMaasaiVillage,
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

/** Category banner on /packages — one unique photo per category */
export const packageCategoryImages: Record<PackageCategory, string> = {
  "luxury-safaris": destTentedCamp,
  "mid-range-safaris": destGameDrive,
  "honeymoon-safaris": destBushDining,
  "family-adventures": destGiraffeNdutu,
  "migration-safaris": destNorthernMigration,
  "gorilla-trekking": destGorillaTrek,
  "beach-safari-combos": zanzibarBeach,
  "kilimanjaro-climbs": destKilimanjaro,
  "cultural-tours": destMaasaiVillage,
};

/** Unique hero/card image per package slug (overrides shared safari thumbnails) */
export const packageImageBySlug: Record<string, string> = {
  "serengeti-luxury-migration": destNorthernMigration,
  "wildlife-wonders-luxury": destWildlifeWonders,
  "classic-northern-mid": destClassicCircuit,
  "iconic-tanzania-mid": destIconicTanzania,
  "serengeti-zanzibar-honeymoon": destSouthernMigration,
  "crater-romance": destCraterSavannah,
  "family-northern-circuit": destEmpakaai,
  "quick-family-escape": destQuickSafari,
  "northern-migration": destMaraRiver,
  "southern-calving": destGiraffeNdutu,
  "uganda-gorilla": destUgandaExtension,
  "northern-tanzania-wildlife": destTarangireElephants,
  "uganda-gorillas-chimps-7": destUgandaChimps,
  "uganda-holiday-8": destUgandaHoliday,
  "zanzibar-extension-4": zanzibarBeach,
  "rwanda-gorilla": destRwandaVolcanoes,
  "safari-beach-combo": zanzibarBeach,
  "kili-northern-circuit": destMountMeru,
  "cultural-northern": destBaobabSavanna,
  "maasai-hadzabe": destCulturalEncounter,
};

export function getPackageImage(pkg: Pick<SafariPackage, "slug" | "safariSlug" | "category">): string {
  if (packageImageBySlug[pkg.slug]) return packageImageBySlug[pkg.slug];
  if (pkg.safariSlug && safariThumbImages[pkg.safariSlug]) return safariThumbImages[pkg.safariSlug];
  return packageCategoryImages[pkg.category];
}
