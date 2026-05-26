import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion";
import { getSafari, safaris } from "@/data/safaris";
import { getLocalizedSafari } from "@/lib/localized-safari";
import { buildPageHead } from "@/lib/seo";
import { SITE, pageTitle } from "@/lib/site-config";
import { tFromContext } from "@/lib/route-i18n";
import { OptimizedImage } from "@/components/media/optimized-image";
import { FormSecurity, isSubmitBlockedByTurnstile } from "@/components/forms/form-security";
import { submitEnquiry } from "@/lib/submit-enquiry";
import type { EnquiryPayload } from "@/lib/enquiry-schema";
import { FormSlaNote } from "@/components/forms/form-sla-note";
import { SafariMap } from "@/components/maps/safari-map";
import { safariThumbImages } from "@/data/destination-images";
import migration from "@/assets/editorial/migration.jpg";
import acacia from "@/assets/editorial/acacia.jpg";
import maasai from "@/assets/editorial/maasai.jpg";

export const Route = createFileRoute("/safaris/$slug")({
  loader: ({ params, context }) => {
    if (!getSafari(params.slug)) throw notFound();
    const baseKey = `safarisContent.${params.slug}`;
    const seoTitle = tFromContext(context.i18n, `${baseKey}.title`);
    const seoRoute = tFromContext(context.i18n, `${baseKey}.route`, "");
    const seoDuration = tFromContext(context.i18n, `${baseKey}.duration`, "");
    const seoIntro = tFromContext(context.i18n, `${baseKey}.intro`, "");
    return { slug: params.slug, seoTitle, seoRoute, seoDuration, seoIntro };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: pageTitle("Safari") }] };
    const path = `/safaris/${params.slug}`;
    const description = `${loaderData.seoDuration ? loaderData.seoDuration + ". " : ""}${loaderData.seoRoute}. Day-by-day itinerary, request a free quote.`;
    const title = pageTitle(loaderData.seoTitle);
    const base = buildPageHead({
      title,
      description,
      path,
      ogType: "article",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: loaderData.seoTitle,
            description: loaderData.seoIntro || loaderData.seoRoute,
            touristType: "Safari",
            url: base.links?.[0]?.href,
            provider: {
              "@type": "TravelAgency",
              name: SITE.name,
            },
            itinerary: ((en.safarisContent as Record<string, { days: { title: string }[] }>)[params.slug]?.days ?? []).map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.title,
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFoundSafari,
  errorComponent: ({ error }) => (
    <div className="p-12 text-center">
      <p className="text-destructive">{error.message}</p>
      <Link to="/itineraries" className="mt-4 inline-block btn-line">Back to itineraries</Link>
    </div>
  ),
  component: SafariDetail,
});

function NotFoundSafari() {
  const { t } = useTranslation();
  return (
    <div className="bg-background min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="font-serif text-5xl">{t("safariDetail.notFoundTitle")}</h1>
        <p className="mt-4 text-muted-foreground">{t("safariDetail.notFoundDesc")}</p>
        <Link to="/itineraries" className="mt-6 inline-block btn-line">{t("safariDetail.viewAll")}</Link>
      </div>
    </div>
  );
}

function SafariError({ error }: { error: Error }) {
  const { t } = useTranslation();
  return (
    <div className="p-12 text-center">
      <p className="text-destructive">{error.message}</p>
      <Link to="/itineraries" className="mt-4 inline-block btn-line">{t("safariDetail.backToItineraries")}</Link>
    </div>
  );
}

function SafariDetail() {
  const { t } = useTranslation();
  const { slug } = Route.useLoaderData();
  const safari = getLocalizedSafari(slug, t);
  if (!safari) throw notFound();
  const heroImg = safariThumbImages[safari.slug] ?? migration;

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light />
      <section className="relative h-[55vh] min-h-[380px] sm:h-[70vh] sm:min-h-[480px] w-full overflow-hidden">
        <OptimizedImage
          src={heroImg}
          alt={safari.title}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-10 sm:px-6 sm:pb-16 md:px-12 md:pb-24">
          <Reveal>
            <span className="eyebrow text-gold">{safari.duration || t("safariDetail.tailorMadeItinerary")}</span>
            {safari.bestSeason && (
              <p className="mt-3 inline-block border border-gold/40 bg-ink/50 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft backdrop-blur-sm">
                {t("safariDetail.bestSeason")}: {safari.bestSeason}
              </p>
            )}
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2rem,6vw,4.5rem)] text-bone">{safari.title}</h1>
            <p className="mt-4 text-xs uppercase tracking-eyebrow text-coral">{safari.route}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-24">
        {safari.intro && (
          <Reveal>
            <p className="font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl md:text-3xl">{safari.intro}</p>
          </Reveal>
        )}

        {(safari.fromPrice || safari.highlights?.length) && (
          <Reveal>
            <div className="mt-10 grid gap-8 border border-border bg-card p-6 md:grid-cols-12 md:p-10">
              <div className="md:col-span-4">
                {safari.fromPrice && (
                  <>
                    <span className="eyebrow">{t("safariDetail.indicativePrice")}</span>
                    <p className="mt-2 font-serif text-3xl text-gold">{safari.fromPrice}</p>
                    {safari.priceNote && <p className="mt-2 text-sm text-muted-foreground">{safari.priceNote}</p>}
                  </>
                )}
              </div>
              {safari.highlights && safari.highlights.length > 0 && (
                <div className="md:col-span-8">
                  <span className="eyebrow">{t("safariDetail.tripHighlights")}</span>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {safari.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {safari.waypoints && safari.waypoints.length > 0 && (
          <Reveal>
            <div className="mt-16">
              <span className="eyebrow">{t("safariDetail.routeMap")}</span>
              <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">
                <Trans i18nKey="safariDetail.yourJourney" components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">{t("safariDetail.mapDesc")}</p>
              <div className="mt-8">
                <SafariMap waypoints={safari.waypoints} height={460} />
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <h2 className="mt-16 font-serif text-[clamp(1.5rem,4vw,3rem)]">
            <Trans i18nKey="safariDetail.dayByDay" components={{ i: <span className="gradient-text italic" /> }} />
          </h2>
        </Reveal>

        <div className="mt-10 space-y-px bg-border">
          {safari.days.map((d: { title: string; body: string }, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-background p-6 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-3">
                  <div className="font-serif text-[clamp(1.75rem,5vw,3.75rem)] text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-eyebrow text-muted-foreground">{t("safariDetail.dayLabel", { num: i + 1 })}</div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl md:text-3xl">{d.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{d.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {(safari.included?.length || safari.excluded?.length) && (
          <Reveal>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {safari.included && safari.included.length > 0 && (
                <div className="border border-border bg-card p-6 md:p-8">
                  <span className="eyebrow">{t("safariDetail.included")}</span>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {safari.included.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-gold" aria-hidden>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {safari.excluded && safari.excluded.length > 0 && (
                <div className="border border-border bg-card p-6 md:p-8">
                  <span className="eyebrow">{t("safariDetail.excluded")}</span>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {safari.excluded.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-16 border border-border bg-card p-8 md:p-12">
            <span className="eyebrow">{t("safariDetail.bookingTips")}</span>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li><strong className="text-ink">{t("safariDetail.tipAdvanceTitle")}</strong> {t("safariDetail.tipAdvance")}</li>
              <li><strong className="text-ink">{t("safariDetail.tipCustomizeTitle")}</strong> {t("safariDetail.tipCustomize")}</li>
              <li><strong className="text-ink">{t("safariDetail.tipInsuranceTitle")}</strong> {t("safariDetail.tipInsurance")}</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <span className="eyebrow">{t("safariDetail.tailorTour")}</span>
            <h2 className="mt-6 font-serif text-[clamp(1.75rem,5vw,3.75rem)]">
              <Trans i18nKey="safariDetail.requestQuote" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              {t("safariDetail.quoteDesc", { safari: safari.title })}
            </p>
            <div className="mt-4">
              <FormSlaNote />
            </div>
          </Reveal>

          <BookingForm safariTitle={safari.title} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function BookingForm({ safariTitle }: { safariTitle: string }) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const optionalActivities = t("safariDetail.activities", { returnObjects: true }) as string[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMailto(null);
    const fd = new FormData(e.currentTarget);
    const payload: EnquiryPayload = {
      formType: "safari-quote",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      country: String(fd.get("country") ?? "") || undefined,
      travelDates: String(fd.get("travel_date") ?? "") || undefined,
      travelers: `Adults: ${fd.get("adults") ?? "—"}, Kids: ${fd.get("kids") ?? "0"}`,
      message: String(fd.get("message") ?? "") || `Quote request for ${safariTitle}`,
      safariTitle,
      interests: picked,
      website: String(fd.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    };
    const result = await submitEnquiry(payload);
    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else {
      setError(result.error);
      if (result.mailto) setMailto(result.mailto);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-12 grid gap-6 border border-border bg-background p-6 md:p-10"
    >
      <FormSecurity onToken={setTurnstileToken} />
      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t("safariDetail.formName")} name="name" required />
        <Field label={t("safariDetail.formMobile")} name="phone" type="tel" />
        <Field label={t("safariDetail.formEmail")} name="email" type="email" required />
        <Field label={t("safariDetail.formCountry")} name="country" />
        <Field label={t("safariDetail.formTravelDate")} name="travel_date" type="date" />
        <Field label={t("safariDetail.formDepartureDate")} name="departure_date" type="date" />
        <Field label={t("safariDetail.formAdults")} name="adults" type="number" placeholder="2" />
        <Field label={t("safariDetail.formKids")} name="kids" type="number" placeholder="0" />
      </div>

      <div>
        <label className="text-xs uppercase tracking-eyebrow text-muted-foreground">{t("safariDetail.optionalActivities")}</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {optionalActivities.map((a) => {
            const active = picked.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => setPicked((p) => (active ? p.filter((x) => x !== a) : [...p, a]))}
                className={`border px-3 py-1.5 text-xs uppercase tracking-eyebrow transition-all ${
                  active ? "border-gold bg-gold text-ink" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-eyebrow text-muted-foreground" htmlFor="message">{t("safariDetail.formMessage")}</label>
        <textarea id="message" name="message" rows={5} className="mt-2 w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-gold" />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
          {mailto && (
            <a href={mailto} className="mt-2 block underline">
              {t("forms.emailFallback")}
            </a>
          )}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting || submitted || isSubmitBlockedByTurnstile(turnstileToken)}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-fill self-start disabled:opacity-60"
      >
        {submitting ? t("forms.sending") : submitted ? t("safariDetail.submitted") : t("safariDetail.submit")}
      </motion.button>
    </form>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        {label}{required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

export const _allSafaris = safaris;
