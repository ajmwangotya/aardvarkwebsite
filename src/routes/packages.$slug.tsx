import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PackageInquiryForm } from "@/components/forms/package-inquiry-form";
import { FormSlaNote } from "@/components/forms/form-sla-note";
import { Reveal } from "@/components/motion";
import { asObjectArray, i18nObject } from "@/lib/utils";
import { getPackage } from "@/data/packages";
import { getSafari } from "@/data/safaris";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import { getPackageImage } from "@/data/destination-images";
import { OptimizedImage } from "@/components/media/optimized-image";
import { tFromContext } from "@/lib/route-i18n";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params, context }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    const safari = pkg.safariSlug ? getSafari(pkg.safariSlug) : undefined;
    const baseKey = `packagesPage.items.${pkg.i18nKey}`;
    const seoTitle = tFromContext(context.i18n, `${baseKey}.title`, "Safari Package");
    const seoDesc = tFromContext(context.i18n, `${baseKey}.summary`, "");
    return { pkg, safari, seoTitle, seoDesc };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: pageTitle("Safari Package") }] };
    return buildPageHead({
      title: pageTitle(loaderData.seoTitle),
      description: `${loaderData.seoDesc} Pricing guide and free quote from Aardvark Safaris Tanzania.`,
      path: `/packages/${params.slug}`,
    });
  },
  component: PackageDetailPage,
});

function PackageDetailPage() {
  const { pkg, safari } = Route.useLoaderData();
  const { t } = useTranslation();
  const key = pkg.i18nKey;
  const detail = i18nObject<{
    title: string;
    summary: string;
    duration: string;
    itinerary: string;
    accommodation: string;
    activities: string[];
    inclusions: string[];
    exclusions: string[];
    pricingGuide: string;
  }>(t, `packagesPage.items.${key}`);
  const activities = asObjectArray<string>(detail.activities);
  const inclusions = asObjectArray<string>(detail.inclusions);
  const exclusions = asObjectArray<string>(detail.exclusions);

  const hero = getPackageImage(pkg);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh]">
        <OptimizedImage
          src={hero}
          alt={detail.title}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/85" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-end px-5 pb-10 sm:px-6 md:px-12 md:pb-16">
          <Reveal>
            <Link to="/packages" className="eyebrow text-gold">← {t("packagesPage.back")}</Link>
            <span className="mt-4 block text-xs uppercase tracking-eyebrow text-coral">{detail.duration}</span>
            <h1 className="mt-2 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] text-bone">{detail.title}</h1>
            <p className="mt-4 max-w-2xl text-bone/80">{detail.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-6 lg:hidden sm:px-6">
        <div className="border border-gold/30 bg-card p-5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.2)]">
          <h2 className="font-serif text-xl">
            <Trans i18nKey="packagesPage.inquiryTitle" components={{ i: <span className="italic text-gold" /> }} />
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("packagesPage.inquiryDesc")}</p>
          <div className="mt-3">
            <FormSlaNote />
          </div>
          <button
            type="button"
            onClick={() =>
              document.getElementById("package-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="btn-fill mt-5 w-full justify-center"
          >
            {t("mobileCta.getQuote", { defaultValue: "Get a free quote" })}
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-12 sm:px-6 md:px-12 md:py-20 max-lg:pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-12">
            <Reveal>
              <span className="eyebrow">{t("packagesPage.itineraryLabel")}</span>
              <p className="mt-4 leading-relaxed text-muted-foreground">{detail.itinerary}</p>
              {safari && (
                <Link
                  to="/safaris/$slug"
                  params={{ slug: safari.slug }}
                  className="btn-line mt-6 inline-flex"
                >
                  {t("packagesPage.fullItinerary")} →
                </Link>
              )}
            </Reveal>

            <Reveal>
              <span className="eyebrow">{t("packagesPage.accommodationLabel")}</span>
              <p className="mt-4 leading-relaxed text-muted-foreground">{detail.accommodation}</p>
            </Reveal>

            <Reveal>
              <span className="eyebrow">{t("packagesPage.activitiesLabel")}</span>
              <ul className="mt-4 space-y-2">
                {activities.map((a) => (
                  <li key={a} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2">
              <Reveal>
                <span className="eyebrow">{t("packagesPage.inclusionsLabel")}</span>
                <ul className="mt-4 space-y-2">
                  {inclusions.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">✓ {item}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <span className="eyebrow">{t("packagesPage.exclusionsLabel")}</span>
                <ul className="mt-4 space-y-2">
                  {exclusions.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">— {item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal>
              <div className="border border-border bg-card p-6 md:p-8">
                <span className="eyebrow">{t("packagesPage.pricingLabel")}</span>
                <p className="mt-4 leading-relaxed text-muted-foreground">{detail.pricingGuide}</p>
              </div>
            </Reveal>
          </div>

          <aside id="package-inquiry" className="lg:col-span-4 scroll-mt-24">
            <div className="border border-border bg-card p-6 md:sticky md:top-28 md:p-8">
              <h2 className="font-serif text-2xl">
                <Trans i18nKey="packagesPage.inquiryTitle" components={{ i: <span className="italic text-gold" /> }} />
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("packagesPage.inquiryDesc")}</p>
              <PackageInquiryForm packageTitle={detail.title} className="mt-6" />
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
