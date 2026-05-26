import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal, blurIn } from "@/components/motion";
import { LegalSections } from "@/components/sections/legal-sections";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildPageHead({
      title: pageTitle("Privacy Policy"),
      description: "How Aardvark Safaris Tanzania Ltd collects, uses, and protects your personal information.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-40 md:px-12">
        <Reveal variants={blurIn}>
          <span className="eyebrow">{t("legal.privacyEyebrow")}</span>
          <h1 className="mt-6 font-serif text-[clamp(2rem,6vw,3.5rem)]">
            <Trans i18nKey="legal.privacyTitle" components={{ i: <span className="gradient-text italic" /> }} />
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t("legal.privacyIntro")}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t("legal.privacyBody")}</p>
          <LegalSections
            sections={t("legal.privacySections", { returnObjects: true }) as { heading: string; body: string }[]}
          />
        </Reveal>
      </section>
      <SiteFooter />
    </div>
  );
}
