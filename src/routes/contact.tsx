import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FormSlaNote } from "@/components/forms/form-sla-note";
import { Reveal, blurIn, slideRight } from "@/components/motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { OfficeHoursDisplay } from "@/components/sections/office-hours-display";
import { buildPageHead } from "@/lib/seo";
import { pageTitle } from "@/lib/site-config";
import { FormSecurity, isSubmitBlockedByTurnstile } from "@/components/forms/form-security";
import { submitEnquiry } from "@/lib/submit-enquiry";
import type { EnquiryPayload } from "@/lib/enquiry-schema";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildPageHead({
      title: pageTitle("Contact"),
      description: "Get in touch with our Arusha-based team to plan your perfect Tanzanian safari.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMailto(null);

    const fd = new FormData(e.currentTarget);
    const payload: EnquiryPayload = {
      formType: "contact",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    };

    const result = await submitEnquiry(payload);
    setSubmitting(false);

    if (result.ok) {
      setSent(true);
      e.currentTarget.reset();
    } else {
      setError(result.error);
      if (result.mailto) setMailto(result.mailto);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <SiteHeader light={false} />

      <section className="pt-28 pb-12 sm:pt-40 sm:pb-16 mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
        <Reveal variants={blurIn}>
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,7vw,4.5rem)]">
            <Trans i18nKey="contact.heroTitle" components={{ i: <span className="shimmer-text italic" /> }} />
          </h1>
          <div className="mt-6">
            <FormSlaNote />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-6 sm:pb-32 md:px-12">
        <div className="grid gap-10 sm:gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="space-y-10">
              <div className="border border-border bg-card p-5 sm:p-6">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold">{t("contact.hoursTitle")}</h3>
                <OfficeHoursDisplay className="mt-4" />
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold">{t("contact.africa")}</h3>
                <div className="mt-4 space-y-5">
                  {[
                    { icon: Phone, label: t("contact.phone"), value: SITE.phoneAfrica, href: `tel:${SITE.phoneAfricaTel}` },
                    { icon: Mail, label: t("contact.email"), value: SITE.emailAfrica, href: `mailto:${SITE.emailAfrica}` },
                    { icon: MapPin, label: t("contact.office"), value: SITE.addressAfrica },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-4 sm:gap-5 group">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center bg-gradient-to-br from-gold to-coral text-ink transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(196,155,70,0.3)] group-hover:scale-110">
                        <c.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <div className="text-[0.65rem] sm:text-xs uppercase tracking-eyebrow text-muted-foreground">{c.label}</div>
                        <p className="mt-1 font-serif text-base sm:text-xl transition-colors duration-300 group-hover:text-[var(--gold)]">
                          {"href" in c && c.href ? <a href={c.href}>{c.value}</a> : c.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-8">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold">{t("contact.usRep")}</h3>
                <div className="mt-4 space-y-5">
                  {[
                    { icon: Phone, label: t("contact.phone"), value: SITE.phoneNA, href: `tel:${SITE.phoneNATel}` },
                    {
                      icon: Mail,
                      label: SITE.emailNALabel,
                      value: SITE.emailNA,
                      href: `mailto:${SITE.emailNA}`,
                    },
                    { icon: MapPin, label: t("contact.office"), value: SITE.addressNA },
                  ].map((c) => (
                    <div key={c.label + "us"} className="flex items-start gap-4 sm:gap-5 group">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center bg-gradient-to-br from-gold to-coral text-ink transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(196,155,70,0.3)] group-hover:scale-110">
                        <c.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <div className="text-[0.65rem] sm:text-xs uppercase tracking-eyebrow text-muted-foreground">{c.label}</div>
                        <p className="mt-1 font-serif text-base sm:text-xl">
                          {"href" in c && c.href ? <a href={c.href}>{c.value}</a> : c.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                <a href={SITE.url} className="hover:text-gold">
                  {SITE.url.replace(/^https?:\/\//, "")}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal variants={slideRight} delay={0.2} className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 sm:gap-6 border border-border bg-card p-5 sm:p-8 md:p-10 gold-border-glow"
            >
              <FormSecurity onToken={setTurnstileToken} />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="sr-only">{t("contact.formName")}</label>
                  <input id="contact-name" name="name" required placeholder={t("contact.formName")} className="w-full border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_15px_rgba(196,155,70,0.1)]" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">{t("contact.formEmail")}</label>
                  <input id="contact-email" name="email" required type="email" placeholder={t("contact.formEmail")} className="w-full border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_15px_rgba(196,155,70,0.1)]" />
                </div>
              </div>
              <label htmlFor="contact-subject" className="sr-only">{t("contact.formSubject")}</label>
              <input id="contact-subject" name="subject" placeholder={t("contact.formSubject")} className="border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_15px_rgba(196,155,70,0.1)]" />
              <label htmlFor="contact-message" className="sr-only">{t("contact.formMessage")}</label>
              <textarea id="contact-message" name="message" required rows={6} placeholder={t("contact.formMessage")} className="border border-border bg-background px-4 py-3 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_15px_rgba(196,155,70,0.1)]" />

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
                whileHover={{ scale: submitting ? 1 : 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitting || sent || isSubmitBlockedByTurnstile(turnstileToken)}
                className="btn-fill self-start disabled:opacity-60"
              >
                {submitting ? t("forms.sending") : sent ? t("contact.sent") : t("contact.sendMessage")}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
