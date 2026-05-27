import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CURATED_TRIP_SAFARI_SLUGS, getPackageBySafariSlug } from "@/data/curated-trips";
import { getLocalizedSafari } from "@/lib/localized-safari";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Reveal, fadeUp } from "@/components/motion";
import { SectionHeader } from "@/components/sections/section-header";
import { getFeaturedTripImage } from "@/data/destination-images";
import { i18nObject } from "@/lib/utils";

const regionStyle: Record<string, string> = {
  Tanzania: "border-gold/40 bg-gold/10 text-ink",
  Uganda: "border-coral/40 bg-coral/10 text-ink",
  Zanzibar: "border-primary/30 bg-primary/10 text-ink",
};

export function FeaturedTrips({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  const trips = CURATED_TRIP_SAFARI_SLUGS.map((safariSlug) => {
    const safari = getLocalizedSafari(safariSlug, t);
    if (!safari) return null;
    const pkg = getPackageBySafariSlug(safariSlug);
    const packageItem = pkg
      ? i18nObject<{ title: string; summary: string; pricingGuide?: string }>(
          t,
          `packagesPage.items.${pkg.i18nKey}`,
        )
      : null;
    return {
      safariSlug,
      safari,
      packageSlug: pkg?.slug,
      packageItem,
      image: getFeaturedTripImage(safariSlug),
    };
  }).filter(Boolean);

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <SectionHeader
            eyebrow={t("featuredTrips.eyebrow")}
            titleKey="featuredTrips.title"
            description={t("featuredTrips.desc")}
            action={
              <div className="flex shrink-0 flex-wrap gap-3 self-start md:self-auto">
                <Link to="/itineraries" className="btn-line">
                  {t("featuredTrips.allItineraries")}
                </Link>
                <Link to="/packages" className="btn-line">
                  {t("featuredTrips.allPackages")}
                </Link>
              </div>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {trips.map((trip) => {
            if (!trip) return null;
            const { safari, safariSlug, packageSlug, packageItem, image } = trip;
            const region = safari.region ?? "Tanzania";
            return (
              <motion.article
                key={safariSlug}
                initial={false}
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden border border-border bg-card transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="grid md:grid-cols-5">
                  <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[260px]">
                    <OptimizedImage
                      src={image.src}
                      alt={safari.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: image.objectPosition }}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span
                        className={`border px-2 py-0.5 text-[0.6rem] uppercase tracking-eyebrow ${regionStyle[region] ?? regionStyle.Tanzania}`}
                      >
                        {region}
                      </span>
                      <span className="border border-bone/30 bg-ink/50 px-2 py-0.5 text-[0.6rem] uppercase tracking-eyebrow text-bone backdrop-blur-sm">
                        {safari.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 md:col-span-3 md:p-8">
                    <div>
                      <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-eyebrow text-gold">
                        <Compass className="h-3.5 w-3.5" aria-hidden />
                        {safari.route}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl leading-snug md:text-[1.65rem]">{safari.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {packageItem?.summary ?? safari.intro}
                      </p>
                      {packageItem?.pricingGuide && (
                        <p className="mt-3 font-serif text-sm text-gold">{packageItem.pricingGuide}</p>
                      )}
                      {safari.highlights && safari.highlights.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {safari.highlights.slice(0, 3).map((h) => (
                            <li
                              key={h}
                              className="border border-border bg-background px-2.5 py-1 text-[0.6rem] uppercase tracking-wide text-muted-foreground"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                      {safari.fromPrice && (
                        <p className="font-serif text-xl text-ink sm:mr-auto">
                          {t("featuredTrips.from")} {safari.fromPrice}
                        </p>
                      )}
                      <Link
                        to="/safaris/$slug"
                        params={{ slug: safariSlug }}
                        className="btn-fill inline-flex items-center justify-center gap-2"
                      >
                        {t("featuredTrips.viewItinerary")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      {packageSlug && (
                        <Link
                          to="/packages/$slug"
                          params={{ slug: packageSlug }}
                          className="btn-line inline-flex items-center justify-center gap-2"
                        >
                          {t("featuredTrips.viewPackage")}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
