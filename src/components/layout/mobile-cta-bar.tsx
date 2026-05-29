import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, TRIPADVISOR, whatsappUrl } from "@/lib/site-config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.4 3.3 1.2 4.7l-1.3 4.7 4.8-1.3a9.7 9.7 0 005.1 1.4h.1c5.4 0 9.8-4.4 9.8-9.8s-4.4-9.5-9.9-9.5zm0 17.7c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.1 8.1 0 011.2-9.5 8.1 8.1 0 0114 5.7c0 4.5-3.7 7.8-8.1 7.8z" />
    </svg>
  );
}

export function MobileCtaBar() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  const isPackageDetail =
    pathname.startsWith("/packages/") && pathname !== "/packages" && pathname.length > "/packages/".length;

  if (isBlogPage) return null;

  const waMessage = t("whatsapp.prefill", {
    defaultValue: "Hello Aardvark Safaris — I'd like to plan a safari. ",
  });

  const scrollToInquiry = () => {
    document.getElementById("package-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const planLabel = isPackageDetail ? (
    <span className="mobile-cta-btn-label mobile-cta-btn-label--plan">
      <span>{t("mobileCta.quoteLine1", { defaultValue: "Get" })}</span>
      <span>{t("mobileCta.quoteLine2", { defaultValue: "quote" })}</span>
    </span>
  ) : (
    <span className="mobile-cta-btn-label mobile-cta-btn-label--plan">
      <span>{t("mobileCta.planWord1", { defaultValue: "Plan" })}</span>
      <span>{t("mobileCta.planWord2", { defaultValue: "My" })}</span>
      <span>{t("mobileCta.planWord3", { defaultValue: "Safari" })}</span>
    </span>
  );

  return (
    <nav
      aria-label={t("mobileCta.aria", { defaultValue: "Quick actions" })}
      className="mobile-cta-bar fixed inset-x-0 bottom-0 z-[60] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mobile-cta-bar-inner mx-auto max-w-[1600px]">
        {isPackageDetail ? (
          <button type="button" onClick={scrollToInquiry} className="mobile-cta-btn mobile-cta-btn--plan">
            <Calendar className="mobile-cta-btn-icon" strokeWidth={2} aria-hidden />
            {planLabel}
          </button>
        ) : (
          <Link to="/plan-trip" className="mobile-cta-btn mobile-cta-btn--plan" aria-label={t("nav.bookNow")}>
            <Calendar className="mobile-cta-btn-icon" strokeWidth={2} aria-hidden />
            {planLabel}
          </Link>
        )}
        <a href={`tel:${SITE.phoneAfricaTel}`} className="mobile-cta-btn mobile-cta-btn--call">
          <Phone className="mobile-cta-btn-icon" strokeWidth={2} aria-hidden />
          <span className="mobile-cta-btn-label">{t("mobileCta.call", { defaultValue: "Call" })}</span>
        </a>
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-btn mobile-cta-btn--whatsapp"
        >
          <WhatsAppIcon className="mobile-cta-btn-icon mobile-cta-btn-icon--svg" />
          <span className="mobile-cta-btn-label">{t("mobileCta.whatsapp", { defaultValue: "WhatsApp" })}</span>
        </a>
      </div>
      <p className="sr-only">
        {t("mobileCta.trust", {
          rating: TRIPADVISOR.rating,
          defaultValue: `TripAdvisor ${TRIPADVISOR.rating} — reply within 24 hours`,
        })}
      </p>
    </nav>
  );
}
