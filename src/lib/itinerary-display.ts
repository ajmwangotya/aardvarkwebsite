import type { TFunction } from "i18next";
import { ITINERARY_CATALOG, type ItineraryCatalogRow } from "@/data/itinerary-catalog";
import { getPackage } from "@/data/packages";
import { getSafari } from "@/data/safaris";
import { getLocalizedSafari } from "@/lib/localized-safari";
import { getPackageImage, safariThumbImages, zanzibarBeach, destChobeElephants } from "@/data/destination-images";
import migration from "@/assets/editorial/migration.jpg";
import en from "@/locales/en.json";

export type ItineraryListItem = ItineraryCatalogRow & {
  title: string;
  route: string;
  desc: string;
  img: string;
  linkTo: { to: "/safaris/$slug"; params: { slug: string } } | { to: "/packages/$slug"; params: { slug: string } } | { to: "/plan-trip" };
};

type ItineraryCopy = { title: string; route: string; desc: string };

function isCopyObject(value: unknown): value is ItineraryCopy {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "title" in value &&
    typeof (value as ItineraryCopy).title === "string"
  );
}

const EN_COPIES: ItineraryCopy[] = Array.isArray(en.itinerariesPage?.items)
  ? en.itinerariesPage.items.filter(isCopyObject)
  : [];

function itineraryCopies(t: TFunction): ItineraryCopy[] {
  const raw = t("itinerariesPage.items", { returnObjects: true });
  const fromLocale = Array.isArray(raw) ? raw.filter(isCopyObject) : [];
  return fromLocale.length >= ITINERARY_CATALOG.length ? fromLocale : EN_COPIES;
}

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
  const copies = itineraryCopies(t);

  return ITINERARY_CATALOG.map((row, index) => {
    const fallback = copies[index];
    let title = fallback?.title?.trim() ?? "";
    let route = fallback?.route?.trim() ?? "";
    let desc = fallback?.desc?.trim() ?? "";
    let linkTo: ItineraryListItem["linkTo"] = { to: "/plan-trip" };

    if (row.safariSlug) {
      const safari = getLocalizedSafari(row.safariSlug, t);
      if (safari) {
        title = safari.title || title;
        route = safari.route || route;
        const intro = safari.intro.trim();
        desc =
          intro.length > 200
            ? `${intro.slice(0, 197)}…`
            : intro.length > 0
              ? intro
              : desc || `${safari.route} — ${safari.duration}`;
        linkTo = { to: "/safaris/$slug", params: { slug: row.safariSlug } };
      }
    } else if (row.packageSlug) {
      const pkg = getPackage(row.packageSlug);
      if (pkg) {
        if (pkg.safariSlug) {
          const safari = getLocalizedSafari(pkg.safariSlug, t) ?? getSafari(pkg.safariSlug);
          if (safari) {
            title = safari.title || title;
            route = safari.route || route;
            const intro = safari.intro.trim();
            desc =
              intro.length > 200
                ? `${intro.slice(0, 197)}…`
                : intro.length > 0
                  ? intro
                  : desc || `${safari.route} — ${safari.duration}`;
          }
        }
        const item = t(`packagesPage.items.${pkg.i18nKey}`, { returnObjects: true });
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const pkgItem = item as { title?: string; summary?: string; duration?: string };
          title = pkgItem.title?.trim() || title;
          route = pkgItem.duration?.trim() || route;
          desc = pkgItem.summary?.trim() || desc;
        }
        linkTo = { to: "/packages/$slug", params: { slug: row.packageSlug } };
      }
    } else if (row.extraKey) {
      const extra = t(`itinerariesPage.extra.${row.extraKey}`, { returnObjects: true });
      if (extra && typeof extra === "object" && !Array.isArray(extra)) {
        const e = extra as { title?: string; route?: string; desc?: string };
        title = e.title?.trim() || title;
        route = e.route?.trim() || route;
        desc = e.desc?.trim() || desc;
      }
    }

    return {
      ...row,
      title,
      route,
      desc,
      img: catalogImage(row),
      linkTo,
    };
  }).filter((item) => item.title.trim().length > 0);
}
