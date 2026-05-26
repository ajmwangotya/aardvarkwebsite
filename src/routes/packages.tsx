import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, fadeUp } from "@/components/motion";
import { PACKAGE_CATEGORIES, getPackagesByCategory } from "@/data/packages";
import { getPackageImage, packageCategoryImages } from "@/data/destination-images";
import { OptimizedImage } from "@/components/optimized-image";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/packages")({
  head: () =>
    buildPageHead({
      title: pageTitle("Safari Packages"),
      description:
        "Luxury and mid-range safaris, honeymoon escapes, migration journeys, gorilla trekking, Kilimanjaro climbs, and beach combos — tailored to you.",
      path: "/packages",
    }),
  component: PackagesPage,
});

function PackagesPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("packagesPage.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="packagesPage.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">{t("packagesPage.heroDesc")}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-6 md:px-12 md:pb-32 space-y-20">
        {PACKAGE_CATEGORIES.map((cat) => {
          const items = getPackagesByCategory(cat);
          const hero = packageCategoryImages[cat];
          return (
            <div key={cat} id={cat}>
              <Reveal>
                <div className="grid gap-8 md:grid-cols-12 md:items-end">
                  <div className="md:col-span-7">
                    <span className="eyebrow">{t(`packagesPage.categories.${cat}.eyebrow`)}</span>
                    <h2 className="mt-3 font-serif text-3xl md:text-4xl">{t(`packagesPage.categories.${cat}.title`)}</h2>
                    <p className="mt-4 max-w-xl text-muted-foreground">{t(`packagesPage.categories.${cat}.desc`)}</p>
                  </div>
                  <div className="md:col-span-5">
                    <div className="aspect-[16/9] overflow-hidden">
                      <OptimizedImage
                        src={hero}
                        alt={t(`packagesPage.categories.${cat}.title`)}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {items.map((pkg, i) => {
                  const item = t(`packagesPage.items.${pkg.i18nKey}`, { returnObjects: true }) as {
                    title: string;
                    summary: string;
                    duration: string;
                    pricingGuide?: string;
                  };
                  return (
                    <motion.div
                      key={pkg.slug}
                      variants={fadeUp}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to="/packages/$slug"
                        params={{ slug: pkg.slug }}
                        className="group block overflow-hidden border border-border transition-colors hover:border-gold/50 gold-border-glow"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <OptimizedImage
                            src={getPackageImage(pkg)}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-6">
                        <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">{item.duration}</span>
                        <h3 className="mt-2 font-serif text-xl group-hover:text-[var(--gold)] transition-colors">{item.title}</h3>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                        {item.pricingGuide && (
                          <p className="mt-3 font-serif text-sm text-gold line-clamp-2">{item.pricingGuide}</p>
                        )}
                        <span className="mt-4 inline-flex text-xs uppercase tracking-eyebrow text-muted-foreground group-hover:text-gold">
                          {t("packagesPage.viewDetails")} →
                        </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <section className="border-t border-border bg-card">
        <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <h2 className="font-serif text-3xl">
            <Trans i18nKey="packagesPage.ctaTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-4 text-muted-foreground">{t("packagesPage.ctaDesc")}</p>
          <Link to="/plan-trip" className="btn-fill mt-8">{t("packagesPage.ctaButton")}</Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
