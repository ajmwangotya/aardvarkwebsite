import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BookingSteps } from "@/components/sections/booking-steps";
import { Reveal } from "@/components/motion";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const items = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

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

      <section className="mx-auto max-w-[900px] px-5 pb-16 sm:px-6 md:px-12">
        <Reveal>
          <h2 className="font-serif text-2xl">{t("faq.bookingTitle")}</h2>
          <BookingSteps className="mt-8" />
        </Reveal>

        <Reveal className="mt-16">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger className="font-serif text-left text-lg hover:text-gold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

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
