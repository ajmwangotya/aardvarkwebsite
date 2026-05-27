import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandPromiseBar } from "@/components/sections/brand-promise-bar";
import { DayOnSafariSection } from "@/components/sections/day-on-safari-section";
import { PackagesCategoryGrid } from "@/components/sections/packages-category-grid";
import { Reveal } from "@/components/motion";
import { PACKAGE_PAGE_SECTIONS } from "@/data/packages";
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

      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-28 sm:px-6 sm:pt-40 sm:pb-14 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("packagesPage.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="packagesPage.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">{t("packagesPage.heroDesc")}</p>
          <BrandPromiseBar className="mt-6 max-w-2xl" />
        </Reveal>

        <nav
          aria-label={t("packagesPage.jumpNav")}
          className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {PACKAGE_PAGE_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              className="shrink-0 border border-border px-3 py-2 text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
            >
              {t(`packagesPage.sections.${section.id}.nav`)}
            </a>
          ))}
        </nav>
      </section>

      <div className="mx-auto max-w-[1400px] space-y-16 px-5 pb-20 sm:px-6 md:space-y-20 md:px-12 md:pb-28">
        {PACKAGE_PAGE_SECTIONS.map((section) => (
          <section key={section.id} id={`section-${section.id}`} className="scroll-mt-28">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)]">
                {t(`packagesPage.sections.${section.id}.title`)}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                {t(`packagesPage.sections.${section.id}.desc`)}
              </p>
            </Reveal>

            <div className="mt-10 space-y-14 md:space-y-16">
              {section.categories.map((cat) => (
                <PackagesCategoryGrid key={cat} category={cat} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <DayOnSafariSection showCta={false} />

      <section className="border-t border-border bg-card">
        <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <h2 className="font-serif text-3xl">
            <Trans i18nKey="packagesPage.ctaTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
          <p className="mt-4 text-muted-foreground">{t("packagesPage.ctaDesc")}</p>
          <Link to="/plan-trip" className="btn-fill mt-8">
            {t("packagesPage.ctaButton")}
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
