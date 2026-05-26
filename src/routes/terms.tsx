import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal, blurIn } from "@/components/motion";
import { LegalSections } from "@/components/legal-sections";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildPageHead({
      title: pageTitle("Terms & Conditions"),
      description: "Terms and conditions for booking safaris with Aardvark Safaris Tanzania Ltd.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-40 md:px-12">
        <Reveal variants={blurIn}>
          <span className="eyebrow">{t("legal.termsEyebrow")}</span>
          <h1 className="mt-6 font-serif text-[clamp(2rem,6vw,3.5rem)]">
            <Trans i18nKey="legal.termsTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t("legal.termsIntro")}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t("legal.termsBody")}</p>
          <LegalSections
            sections={t("legal.termsSections", { returnObjects: true }) as { heading: string; body: string }[]}
          />
        </Reveal>
      </section>
      <SiteFooter />
    </div>
  );
}
