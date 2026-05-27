import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BookingSteps } from "@/components/sections/booking-steps";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/motion";
import { getFaqItems } from "@/data/faq-i18n";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildPageHead({
      title: pageTitle("Safari FAQ"),
      description:
        "When to see the Great Migration, gorilla permits, visas, packing, tipping, cancellation policy, and more — from our Arusha team.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useTranslation();
  const items = getFaqItems(t);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />

      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("faq.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="faq.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">{t("faq.heroDesc")}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[900px] px-5 pb-28 sm:px-6 sm:pb-16 md:px-12">
        <Reveal>
          <h2 className="font-serif text-2xl">{t("faq.bookingTitle")}</h2>
          <BookingSteps className="mt-8" />
        </Reveal>

        <section className="mt-16" aria-labelledby="faq-questions-heading">
          <h2 id="faq-questions-heading" className="font-serif text-2xl">
            {t("faq.questionsTitle")}
          </h2>
          <FaqAccordion items={items} />
        </section>

        <Reveal className="mt-16 border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">{t("faq.ctaDesc")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/plan-trip" className="btn-fill">
              {t("nav.planTrip")}
            </Link>
            <Link to="/contact" className="btn-line">
              {t("nav.contact")}
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
