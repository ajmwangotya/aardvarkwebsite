/**
 * Curated imagery — each slot uses a unique photo matched to its destination.
 * Source photos: wetransfer__dsc1010-jpeg_2026-05-17_1737 (copied into src/assets).
 */
import type { CountrySlug } from "@/data/countries";
import type { CircuitSlug } from "@/data/circuits";
import type { PackageCategory, SafariPackage } from "@/data/packages";

// Legacy hero / editorial assets (still used on homepage & blog)
import migration from "@/assets/migration.jpg";
import maasai from "@/assets/maasai.jpg";
import gorillaUganda from "@/assets/gorilla-uganda.jpg";
import gorillaRwanda from "@/assets/gorilla-rwanda.jpg";
import zanzibarBeach from "@/assets/zanzibar-beach.jpg";
import heroLion from "@/assets/hero-lion.jpg";
import heroNdutu1 from "@/assets/hero-ndutu-1.jpg";
import heroNdutu3 from "@/assets/hero-ndutu-3.jpg";
import heroNdutu6 from "@/assets/hero-ndutu-6.jpg";
import balloon from "@/assets/balloon.jpg";
import elephants from "@/assets/elephants.jpg";
import acacia from "@/assets/acacia.jpg";
import leopard from "@/assets/leopard.jpg";
import camp1 from "@/assets/camp-1.jpg";
import dining from "@/assets/dining.jpg";
import walking from "@/assets/walking.jpg";

// Destination-specific photos from client library
import destSerengetiMigration from "@/assets/dest-serengeti-migration.jpg";
import destNgorongoroCrater from "@/assets/dest-ngorongoro-crater.jpg";
import destKilimanjaro from "@/assets/dest-kilimanjaro.jpg";
import destKenyaMara from "@/assets/dest-kenya-mara.jpg";
import destUgandaForest from "@/assets/dest-uganda-forest.jpg";
import destRwandaVolcanoes from "@/assets/dest-rwanda-volcanoes.jpg";
import destZanzibarCoast from "@/assets/dest-zanzibar-coast.jpg";
import destNorthernCircuit from "@/assets/dest-northern-circuit.jpg";
import destSouthernSerengeti from "@/assets/dest-southern-serengeti.jpg";
import destUgandaHoliday from "@/assets/dest-uganda-holiday.jpg";
import destDhowSunset from "@/assets/dest-dhow-sunset.jpg";
import destTarangireElephants from "@/assets/dest-tarangire-elephants.jpg";
import destArushaPark from "@/assets/dest-arusha-park.jpg";
import destLakeManyara from "@/assets/dest-lake-manyara.jpg";
import destRuahaPredators from "@/assets/dest-ruaha-predators.jpg";
import destSelousRiver from "@/assets/dest-selous-river.jpg";
import destMountMeru from "@/assets/dest-mount-meru.jpg";
import destPembaIsland from "@/assets/dest-pemba-island.jpg";
import destMafiaIsland from "@/assets/dest-mafia-island.jpg";
import destKenyaSavanna from "@/assets/dest-kenya-savanna.jpg";
import destBotswanaDelta from "@/assets/dest-botswana-delta.jpg";
import destVictoriaFalls from "@/assets/dest-victoria-falls.jpg";
import destCapeTown from "@/assets/dest-cape-town.jpg";
import destNorthernMigration from "@/assets/dest-northern-migration.jpg";
import destWildlifeWonders from "@/assets/dest-wildlife-wonders.jpg";
import destClassicCircuit from "@/assets/dest-classic-circuit.jpg";
import destExploringSouthernAfrica from "@/assets/dest-exploring-southern-africa.jpg";
import destNorthernCircuitRoute from "@/assets/dest-northern-circuit.jpg";
import destIconicTanzania from "@/assets/dest-iconic-tanzania.jpg";
import destCraterSavannah from "@/assets/dest-crater-landscape.jpg";
import destQuickSafari from "@/assets/dest-quick-safari.jpg";
import destDayTour from "@/assets/dest-day-tour.jpg";
import destSouthernMigration from "@/assets/dest-southern-migration.jpg";
import destMkomaziRhino from "@/assets/dest-mkomazi-rhino.jpg";
import destUgandaExtension from "@/assets/dest-uganda-extension.jpg";
import destUgandaChimps from "@/assets/dest-uganda-chimps.jpg";
import destZanzibarExtension from "@/assets/dest-zanzibar-extension.jpg";
import destGorillaTrek from "@/assets/dest-gorilla-trek.jpg";
import destCalderaWildlife from "@/assets/dest-caldera-wildlife.jpg";
import destMaraRiver from "@/assets/dest-mara-river.jpg";
import destGiraffeNdutu from "@/assets/dest-giraffe-ndutu.jpg";
import destAcaciaSunset from "@/assets/dest-acacia-sunset.jpg";
import destBalloonSafari from "@/assets/dest-balloon-safari.jpg";
import destBushDining from "@/assets/dest-bush-dining.jpg";
import destTentedCamp from "@/assets/dest-tented-camp.jpg";
import destLeopardTree from "@/assets/dest-leopard-tree.jpg";
import destTanzaniaPlains from "@/assets/dest-tanzania-plains.jpg";
import destTurquoiseLagoon from "@/assets/dest-turquoise-lagoon.jpg";
import destBeachResort from "@/assets/dest-beach-resort.jpg";
import destZimbabweHwange from "@/assets/dest-zimbabwe-hwange.jpg";
import destChobeElephants from "@/assets/dest-chobe-elephants.jpg";
import destKrugerSafari from "@/assets/dest-kruger-safari.jpg";
import destEmpakaai from "@/assets/dest-empakaai.jpg";
import destBaobabSavanna from "@/assets/dest-baobab-savanna.jpg";
import destSafariLodge from "@/assets/dest-safari-lodge.jpg";
import destGameDrive from "@/assets/dest-game-drive.jpg";
import destWalkingSafari from "@/assets/walking.jpg";
import destMaasaiVillage from "@/assets/dest-maasai-village.jpg";
import destCulturalEncounter from "@/assets/dest-cultural-encounter.jpg";

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
