import type { TFunction } from "i18next";
import { ITINERARY_CATALOG, type ItineraryCatalogRow } from "@/data/itinerary-catalog";
import { getPackage } from "@/data/packages";
import { getLocalizedSafari } from "@/lib/localized-safari";
import { getPackageImage, safariThumbImages, zanzibarBeach, destChobeElephants } from "@/data/destination-images";
import migration from "@/assets/editorial/migration.jpg";

export type ItineraryListItem = ItineraryCatalogRow & {
  title: string;
  route: string;
  desc: string;
  img: string;
  linkTo: { to: "/safaris/$slug"; params: { slug: string } } | { to: "/packages/$slug"; params: { slug: string } } | { to: "/plan-trip" };
};

function catalogImage(row: ItineraryCatalogRow): string {
  if (row.safariSlug && safariThumbImages[row.safariSlug]) return safariThumbImages[row.safariSlug];
  if (row.packageSlug) {
    const pkg = getPackage(row.packageSlug);
    if (pkg) return getPackageImage(pkg);
  }
  if (row.extraKey === "okavangoDelta") return destChobeElephants;
  if (row.category === "Zanzibar") return zanzibarBeach;
  return migration;
}

export function buildItineraryListItems(t: TFunction): ItineraryListItem[] {
  return ITINERARY_CATALOG.map((row) => {
    let title = "";
    let route = "";
    let desc = "";
    let linkTo: ItineraryListItem["linkTo"] = { to: "/plan-trip" };

    if (row.safariSlug) {
      const safari = getLocalizedSafari(row.safariSlug, t);
      if (safari) {
        title = safari.title;
        route = safari.route;
        const intro = safari.intro.trim();
        desc =
          intro.length > 200
            ? `${intro.slice(0, 197)}…`
            : intro.length > 0
              ? intro
              : `${safari.route} — ${safari.duration}`;
        linkTo = { to: "/safaris/$slug", params: { slug: row.safariSlug } };
      }
    } else if (row.packageSlug) {
      const pkg = getPackage(row.packageSlug);
      if (pkg) {
        const item = t(`packagesPage.items.${pkg.i18nKey}`, { returnObjects: true }) as {
          title: string;
          summary: string;
          duration: string;
        };
        title = item.title;
        route = item.duration;
        desc = item.summary;
        linkTo = { to: "/packages/$slug", params: { slug: row.packageSlug } };
      }
    } else if (row.extraKey) {
      const extra = t(`itinerariesPage.extra.${row.extraKey}`, { returnObjects: true }) as {
        title: string;
        route: string;
        desc: string;
      };
      title = extra.title;
      route = extra.route;
      desc = extra.desc;
    }

    return {
      ...row,
      title,
      route,
      desc,
      img: catalogImage(row),
      linkTo,
    };
  });
}
