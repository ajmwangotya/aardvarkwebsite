import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FormSlaNote } from "@/components/form-sla-note";
import { BookingSteps } from "@/components/booking-steps";
import { PlanTripForm } from "@/components/plan-trip-form";
import { Reveal } from "@/components/motion";
import { buildPageHead } from "@/lib/seo";
import { pageTitle, whatsappUrl } from "@/lib/site-config";

export const Route = createFileRoute("/plan-trip")({
  head: () =>
    buildPageHead({
      title: pageTitle("Plan a Trip"),
      description:
        "Tell us what you're dreaming of — get a free, no-obligation quote for a tailor-made Tanzanian safari.",
      path: "/plan-trip",
    }),
  component: PlanTripPage,
});

function PlanTripPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="eyebrow">{t("planTripPage.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="planTripPage.heroTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 max-w-2xl text-muted-foreground">{t("planTripPage.heroDesc")}</p>
          <div className="mt-6">
            <FormSlaNote />
          </div>
          <a
            href={whatsappUrl(
              t("whatsapp.prefill", { defaultValue: "Hello Aardvark Safaris — I'd like to plan a safari. " }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-6 inline-flex w-full justify-center border-[#25D366] text-[#1a7a42] lg:hidden"
          >
            {t("mobileCta.whatsappInstead", { defaultValue: "Or message us on WhatsApp" })}
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-10 sm:px-6 md:px-12">
        <Reveal>
          <h2 className="font-serif text-2xl">{t("booking.sectionTitle")}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t("booking.sectionDesc")}</p>
          <BookingSteps className="mt-8" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12">
        <Reveal>
          <PlanTripForm />
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
