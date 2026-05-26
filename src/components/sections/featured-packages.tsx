import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { FEATURED_PACKAGE_SLUGS } from "@/data/featured-packages";
import { getPackage } from "@/data/packages";
import { getPackageImage } from "@/data/destination-images";
import { Reveal, fadeUp } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";

export function FeaturedPackages({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  const cards = FEATURED_PACKAGE_SLUGS.map((slug) => {
    const pkg = getPackage(slug);
    if (!pkg) return null;
    const item = t(`packagesPage.items.${pkg.i18nKey}`, { returnObjects: true }) as {
      title: string;
      summary: string;
      duration: string;
      pricingGuide?: string;
    };
    return { slug, pkg, item, img: getPackageImage(pkg) };
  }).filter(Boolean);

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow flex items-center gap-2">
                <Compass className="h-3.5 w-3.5" aria-hidden />
                {t("featuredPackages.eyebrow")}
              </span>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-tight">
                <Trans i18nKey="featuredPackages.title" components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("featuredPackages.desc")}</p>
            </div>
            <Link to="/packages" className="btn-line shrink-0 self-start md:self-auto">
              {t("featuredPackages.viewAll")}
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cards.map((card) => {
            if (!card) return null;
            return (
              <motion.article
                key={card.slug}
                initial={false}
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group overflow-hidden border border-border bg-card transition-colors hover:border-gold/50"
              >
                <Link to="/packages/$slug" params={{ slug: card.slug }} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <OptimizedImage
                      src={card.img}
                      alt={card.item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">{card.item.duration}</span>
                    <h3 className="mt-2 font-serif text-xl group-hover:text-gold transition-colors">{card.item.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{card.item.summary}</p>
                    {card.item.pricingGuide && (
                      <div className="mt-4 border-t border-border/80 pt-3">
                        <p className="text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                          {t("featuredPackages.pricingLabel")}
                        </p>
                        <p className="mt-1 font-serif text-sm leading-snug text-gold">{card.item.pricingGuide}</p>
                      </div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground group-hover:text-gold">
                      {t("featuredPackages.viewPackage")} <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
