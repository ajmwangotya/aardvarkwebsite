import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FEATURED_BROCHURE_SLUGS } from "@/data/featured-brochures";
import { getLocalizedSafari } from "@/lib/localized-safari";
import { OptimizedImage } from "@/components/media/optimized-image";
import { Reveal, fadeUp } from "@/components/motion";
import { safariThumbImages } from "@/data/destination-images";
import migration from "@/assets/editorial/migration.jpg";

const regionStyle: Record<string, string> = {
  Tanzania: "border-gold/40 bg-gold/10 text-ink",
  Uganda: "border-coral/40 bg-coral/10 text-ink",
  Zanzibar: "border-primary/30 bg-primary/10 text-ink",
};

export function FeaturedJourneys({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const journeys = FEATURED_BROCHURE_SLUGS.map((slug) => getLocalizedSafari(slug, t)).filter(Boolean);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 48px, currentColor 48px, currentColor 49px)",
        }}
      />
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                {t("featuredJourneys.eyebrow")}
              </span>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-tight">
                {t("featuredJourneys.title")}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("featuredJourneys.desc")}</p>
            </div>
            <Link to="/itineraries" className="btn-line shrink-0 self-start md:self-auto">
              {t("featuredJourneys.allItineraries")}
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {journeys.map((safari) => {
            if (!safari) return null;
            const img = safariThumbImages[safari.slug] ?? migration;
            const region = safari.region ?? "Tanzania";
            return (
              <motion.article
                key={safari.slug}
                initial={false}
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden border border-border bg-card transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="grid md:grid-cols-5">
                  <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[280px]">
                    <OptimizedImage
                      src={img}
                      alt={safari.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                      <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">{safari.route}</p>
                      <h3 className="mt-2 font-serif text-2xl md:text-[1.65rem] leading-snug">{safari.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{safari.intro}</p>
                      {safari.highlights && safari.highlights.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {safari.highlights.map((h) => (
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

                    <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        {safari.fromPrice && (
                          <p className="font-serif text-2xl text-ink">
                            {t("featuredJourneys.from")} {safari.fromPrice}
                          </p>
                        )}
                        {safari.priceNote && (
                          <p className="mt-1 text-xs text-muted-foreground">{safari.priceNote}</p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to="/safaris/$slug"
                          params={{ slug: safari.slug }}
                          className="btn-fill inline-flex items-center gap-2"
                        >
                          {t("featuredJourneys.explore")}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
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
