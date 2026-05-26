import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/brand/aardvark-logo.svg";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SITE, TRIPADVISOR, currentYear } from "@/lib/site-config";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aardvark_safaris/",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8.1a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.3-8.3a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z",
  },
  {
    name: "Facebook",
    href: "https://web.facebook.com/aardvarktanzanialtd",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8h3.3z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/aardvarktanzania",
    path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z",
  },
  {
    name: "TripAdvisor",
    href: "https://www.tripadvisor.com/Attraction_Review-g6940195-d12600680-Reviews-Aardvark_Safaris-Arusha_National_Park_Arusha_Region.html",
    path: "M12 8.6c-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9S13.6 8.6 12 8.6zm0 4.4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM23.6 9.6l1.4-1.5h-3.1A12.5 12.5 0 0012 5.7a12.5 12.5 0 00-9.9 2.4H-1l1.4 1.5a4.4 4.4 0 105.9 6.4l1.4 1.6 1.4-1.5a4.4 4.4 0 006.5 0l1.4 1.5 1.4-1.6a4.4 4.4 0 105.6-6.4zM5.4 15.5a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm6.6.5c-1.7 0-3.1-1.3-3.4-3 .4-1.7 1.7-3 3.4-3s3 1.3 3.4 3c-.4 1.7-1.7 3-3.4 3zm6.6-.5a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/255785957611",
    path: "M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.4 3.3 1.2 4.7l-1.3 4.7 4.8-1.3a9.7 9.7 0 005.1 1.4h.1c5.4 0 9.8-4.4 9.8-9.8s-4.4-9.5-9.9-9.5zm0 17.7c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.1 8.1 0 011.2-9.5 8.1 8.1 0 0114 5.7c0 4.5-3.7 7.8-8.1 7.8z",
  },
];

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
        {/* CTA strip */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.6rem] uppercase tracking-[0.25em] text-bone/60 sm:mb-10"
        >
          <span>{t("footer.trustLicensed")}</span>
          <span className="hidden sm:inline text-bone/30">·</span>
          <span>{t("footer.trustInsured")}</span>
          <span className="hidden sm:inline text-bone/30">·</span>
          <span>{t("footer.trustFamily")}</span>
          <span className="hidden sm:inline text-bone/30">·</span>
          <a href={SITE.tripAdvisor} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            {t("footer.taLine", { rating: TRIPADVISOR.rating, count: TRIPADVISOR.reviewCount })}
          </a>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start justify-between gap-5 border-y border-bone/10 py-8 sm:mb-20 sm:gap-6 sm:py-12 md:flex-row md:items-center"
        >
          <div>
            <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold sm:text-[0.65rem] sm:tracking-[0.5em]">{t("footer.beginStory")}</div>
            <h3 className="mt-3 font-serif text-[clamp(1.5rem,4vw,3rem)]">{t("footer.ready")}</h3>
          </div>
          <Link to="/plan-trip" className="btn-fill">
            {t("footer.planSafari")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-12 md:gap-16"
        >
          <div className="md:col-span-4">
            <img src={logoUrl} alt={SITE.name} className="h-16 w-auto" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-bone/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 sm:h-11 sm:w-11 items-center justify-center border border-bone/20 text-bone/70 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">{t("footer.explore")}</div>
            <ul className="mt-6 space-y-3 text-sm">
              <li><Link to="/about" className="text-bone/80 hover:text-gold">{t("nav.about")}</Link></li>
              <li><Link to="/packages" className="text-bone/80 hover:text-gold">{t("nav.packages")}</Link></li>
              <li><Link to="/destinations" className="text-bone/80 hover:text-gold">{t("nav.destinations")}</Link></li>
              <li><Link to="/itineraries" className="text-bone/80 hover:text-gold">{t("planMenu.itineraries")}</Link></li>
              <li><Link to="/experiences" className="text-bone/80 hover:text-gold">{t("planMenu.experiences")}</Link></li>
              <li><Link to="/camps" className="text-bone/80 hover:text-gold">{t("footer.camps")}</Link></li>
              <li><Link to="/blog" className="text-bone/80 hover:text-gold">{t("footer.journal")}</Link></li>
              <li><Link to="/faq" className="text-bone/80 hover:text-gold">{t("nav.faq")}</Link></li>
              <li><Link to="/contact" className="text-bone/80 hover:text-gold">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">{t("footer.contact")}</div>
            <ul className="mt-6 space-y-4 text-sm text-bone/80">
              <li>
                <div className="text-[0.6rem] uppercase tracking-[0.3em] text-gold/80">{t("footer.regionAfrica")}</div>
                <div className="mt-2 flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href={`tel:${SITE.phoneAfricaTel}`} className="hover:text-gold">{SITE.phoneAfrica}</a></div>
                <div className="mt-2 flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-gold" /><a href={`mailto:${SITE.emailAfrica}`} className="hover:text-gold">{SITE.emailAfrica}</a></div>
                <div className="mt-2 flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>{SITE.addressAfrica}</span></div>
              </li>
              <li className="pt-3 border-t border-bone/10">
                <div className="text-[0.6rem] uppercase tracking-[0.3em] text-gold/80">{t("footer.regionNA")}</div>
                <div className="mt-2 flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href={`tel:${SITE.phoneNATel}`} className="hover:text-gold">{SITE.phoneNA}</a></div>
                <div className="mt-2 flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-gold" /><a href={`mailto:${SITE.emailNA}`} className="hover:text-gold break-all">{SITE.emailNA}</a></div>
                <div className="mt-2 flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>{SITE.addressNA}</span></div>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">{t("footer.dispatch")}</div>
            <p className="mt-6 text-sm text-bone/70">{t("footer.dispatchDesc")}</p>
            <NewsletterForm source="footer" className="mt-6 flex border border-bone/20" />
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 text-[0.65rem] uppercase tracking-eyebrow text-bone/50 md:flex-row">
          <div>{t("footer.rights", { year: currentYear(), legalName: SITE.legalName })}</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-gold">{t("footer.terms")}</Link>
            <span>{t("footer.purpose")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
