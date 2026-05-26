import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { buildItineraryListItems, type ItineraryListItem } from "@/lib/itinerary-display";
import { OptimizedImage } from "@/components/media/optimized-image";
import type { ItineraryCategory } from "@/data/itinerary-catalog";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/itineraries")({
  head: () =>
    buildPageHead({
      title: pageTitle("Itineraries"),
      description:
        "Signature itineraries from 1-day excursions to 12-day expeditions across Tanzania, Southern Africa, and Zanzibar.",
      path: "/itineraries",
    }),
  component: ItinerariesPage,
});

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

function ItinerariesPage() {
  const { t, i18n } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<FilterCategory>("All");

  const itineraries = useMemo(() => buildItineraryListItems(t), [t, i18n.language]);

  const filtered = useMemo(
    () => (active === "All" ? itineraries : itineraries.filter((i) => i.category === active)),
    [active, itineraries],
  );

  const selectFilter = useCallback((value: FilterCategory) => {
    setActive(value);
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-28 pb-8 sm:pt-40 sm:pb-10 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("itinerariesPage.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="itinerariesPage.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">{t("itinerariesPage.heroDesc")}</p>
        </Reveal>

        <FeaturedJourneys className="mt-14 border-t border-border pt-14 md:mt-20 md:pt-20" />
      </section>

      <section
        id="itinerary-catalog"
        className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12 scroll-mt-28"
      >
        <div
          role="tablist"
          aria-label={t("itinerariesPage.eyebrow")}
          className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
          {FILTERS.map(({ value, labelKey }) => {
            const isActive = active === value;
            const count =
              value === "All" ? itineraries.length : itineraries.filter((i) => i.category === value).length;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="itinerary-list"
                onClick={() => selectFilter(value)}
                className={`border px-3 py-2 sm:px-4 text-[0.65rem] sm:text-xs uppercase tracking-eyebrow transition-all whitespace-nowrap shrink-0 sm:shrink cursor-pointer ${
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {t(labelKey)}
                <span className="ml-1.5 tabular-nums opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {active === "All"
            ? `Showing all ${filtered.length} itineraries`
            : `Showing ${filtered.length} ${active} ${filtered.length === 1 ? "itinerary" : "itineraries"}`}
        </p>

        <div ref={listRef} id="itinerary-list" role="tabpanel" className="mt-6">
          <h2 className="sr-only">{active === "All" ? "All itineraries" : `${active} itineraries`}</h2>
          {filtered.length === 0 ? (
            <p className="border border-border bg-card px-6 py-10 text-center text-muted-foreground">
              No itineraries in this category yet. Try another filter or{" "}
              <Link to="/plan-trip" className="text-gold underline-offset-4 hover:underline">
                request a custom trip
              </Link>
              .
            </p>
          ) : (
            <div key={active} className="space-y-px bg-border">
              {filtered.map((it, i) => (
                <article key={itineraryKey(it, i)} className="bg-background">
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
                      <div className="mt-3 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">
                        {it.category}
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-xl sm:text-3xl group-hover:text-gold transition-colors">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-eyebrow text-coral">{it.route}</p>
                      <p className="mt-4 text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                    <div className="md:col-span-2 text-right text-xs uppercase tracking-eyebrow transition-transform group-hover:translate-x-2">
                      {t("itinerariesPage.requestQuote")}
                    </div>
                  </ItineraryRowLink>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
