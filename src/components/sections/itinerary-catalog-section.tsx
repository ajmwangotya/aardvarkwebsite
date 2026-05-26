"use client";

import { Link } from "@tanstack/react-router";
import { type ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { buildItineraryListItems, type ItineraryListItem } from "@/lib/itinerary-display";
import { OptimizedImage } from "@/components/media/optimized-image";
import type { ItineraryCategory } from "@/data/itinerary-catalog";

type FilterCategory = "All" | ItineraryCategory;

const FILTERS: { value: FilterCategory; labelKey: string }[] = [
  { value: "All", labelKey: "itinerariesPage.all" },
  { value: "Tanzania", labelKey: "itinerariesPage.tanzania" },
  { value: "Uganda", labelKey: "itinerariesPage.uganda" },
  { value: "Southern Africa", labelKey: "itinerariesPage.southernAfrica" },
  { value: "Zanzibar", labelKey: "itinerariesPage.zanzibar" },
];

function durationStyle(days: number) {
  if (days <= 3) return "border-gold/40 bg-gold/10 text-ink";
  if (days <= 7) return "border-coral/40 bg-coral/10 text-ink";
  return "border-primary/30 bg-primary/10 text-ink";
}

function itineraryKey(it: ItineraryListItem, index: number) {
  return it.safariSlug ?? it.packageSlug ?? it.extraKey ?? `${it.category}-${it.days}-${index}`;
}

function ItineraryRowLink({
  linkTo,
  className,
  children,
}: {
  linkTo: ItineraryListItem["linkTo"];
  className: string;
  children: ReactNode;
}) {
  if ("params" in linkTo) {
    return (
      <Link to={linkTo.to} params={linkTo.params} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to={linkTo.to} className={className}>
      {children}
    </Link>
  );
}

export function ItineraryCatalogSection() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<FilterCategory>("All");

  const itineraries = useMemo(() => buildItineraryListItems(t), [t, i18n.language]);

  const counts = useMemo(() => {
    const byCategory = (cat: ItineraryCategory) => itineraries.filter((i) => i.category === cat).length;
    return {
      All: itineraries.length,
      Tanzania: byCategory("Tanzania"),
      Uganda: byCategory("Uganda"),
      "Southern Africa": byCategory("Southern Africa"),
      Zanzibar: byCategory("Zanzibar"),
    };
  }, [itineraries]);

  const filtered = useMemo(
    () => (active === "All" ? itineraries : itineraries.filter((item) => item.category === active)),
    [active, itineraries],
  );

  return (
    <section
      id="itinerary-catalog"
      className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12 scroll-mt-28"
    >
      <div
        role="tablist"
        aria-label={t("itinerariesPage.eyebrow")}
        className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0"
      >
        {FILTERS.map(({ value, labelKey }) => {
          const isActive = active === value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(value)}
              className={`border px-3 py-2 sm:px-4 text-[0.65rem] sm:text-xs uppercase tracking-eyebrow transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? "border-gold bg-gold text-ink"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {t(labelKey)}
              <span className="ml-1.5 tabular-nums opacity-80">({counts[value]})</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {active === "All"
          ? `Showing all ${filtered.length} itineraries`
          : `Showing ${filtered.length} ${active} ${filtered.length === 1 ? "itinerary" : "itineraries"}`}
      </p>

      <div id="itinerary-list" role="tabpanel" className="mt-6">
        <h2 className="sr-only">{active === "All" ? "All itineraries" : `${active} itineraries`}</h2>
        {filtered.length === 0 ? (
          <p className="border border-border bg-card px-6 py-10 text-center text-muted-foreground">
            No itineraries in this category. Try another filter or{" "}
            <Link to="/plan-trip" className="text-gold underline-offset-4 hover:underline">
              request a custom trip
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-px bg-border list-none p-0 m-0">
            {filtered.map((it, i) => (
              <li key={itineraryKey(it, i)} className="bg-background">
                <ItineraryRowLink
                  linkTo={it.linkTo}
                  className="group grid gap-4 p-4 sm:gap-6 sm:p-6 transition-colors hover:bg-card md:grid-cols-12 md:items-center md:gap-10 md:p-8"
                >
                  <div className="md:col-span-3 overflow-hidden">
                    <OptimizedImage
                      src={it.img}
                      alt={it.title}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className={`inline-flex items-baseline gap-1 border px-3 py-1 ${durationStyle(it.days)}`}>
                      <span className="font-serif text-3xl md:text-4xl leading-none">{it.days}</span>
                      <span className="text-xs uppercase tracking-eyebrow">
                        {it.durationLabel ? it.durationLabel.replace(/\d+\s*/, "") : t("itinerariesPage.days")}
                      </span>
                    </div>
                    <div className="mt-3 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">{it.category}</div>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-serif text-xl sm:text-3xl group-hover:text-gold transition-colors">{it.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-eyebrow text-coral">{it.route}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                  <div className="md:col-span-2 text-right text-xs uppercase tracking-eyebrow transition-transform group-hover:translate-x-2">
                    {t("itinerariesPage.requestQuote")}
                  </div>
                </ItineraryRowLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
