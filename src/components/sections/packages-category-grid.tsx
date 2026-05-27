import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeUp } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import { getPackagesByCategory, type PackageCategory } from "@/data/packages";
import { getPackageImage } from "@/data/destination-images";
import { i18nObject } from "@/lib/utils";

type PackageCardCopy = {
  title: string;
  summary: string;
  duration: string;
  pricingGuide?: string;
};

export function PackagesCategoryGrid({ category }: { category: PackageCategory }) {
  const { t } = useTranslation();
  const items = getPackagesByCategory(category);

  if (items.length === 0) return null;

  return (
    <article id={category} className="scroll-mt-28 border-t border-border pt-12 first:border-t-0 first:pt-0">
      <header className="max-w-2xl">
        <span className="eyebrow">{t(`packagesPage.categories.${category}.eyebrow`)}</span>
        <h3 className="mt-2 font-serif text-2xl md:text-3xl">{t(`packagesPage.categories.${category}.title`)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {t(`packagesPage.categories.${category}.desc`)}
        </p>
      </header>

      <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 lg:gap-6">
        {items.map((pkg, i) => {
          const item = i18nObject<PackageCardCopy>(t, `packagesPage.items.${pkg.i18nKey}`);
          if (!item.title) return null;

          return (
            <motion.li
              key={pkg.slug}
              variants={fadeUp}
              initial={false}
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              className="min-w-0"
            >
              <Link
                to="/packages/$slug"
                params={{ slug: pkg.slug }}
                className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-gold/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <OptimizedImage
                    src={getPackageImage(pkg)}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="text-[0.65rem] uppercase tracking-eyebrow text-gold">{item.duration}</span>
                  <h4 className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-gold md:text-xl">
                    {item.title}
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {item.summary}
                  </p>
                  {item.pricingGuide && (
                    <p className="mt-3 font-serif text-sm text-gold line-clamp-2">{item.pricingGuide}</p>
                  )}
                  <span className="mt-4 inline-flex text-xs uppercase tracking-eyebrow text-muted-foreground group-hover:text-gold">
                    {t("packagesPage.viewDetails")} →
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </article>
  );
}
