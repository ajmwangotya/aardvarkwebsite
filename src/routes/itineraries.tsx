import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { ItineraryCatalogSection } from "@/components/sections/itinerary-catalog-section";
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

function ItinerariesPage() {
  const { t } = useTranslation();

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

      <ItineraryCatalogSection />

      <SiteFooter />
    </div>
  );
}
