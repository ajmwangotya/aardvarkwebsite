import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE, TRIPADVISOR, whatsappUrl } from "@/lib/site-config";

export function MobileCtaBar() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isPackageDetail =
    pathname.startsWith("/packages/") && pathname !== "/packages" && pathname.length > "/packages/".length;

  const waMessage = t("whatsapp.prefill", {
    defaultValue: "Hello Aardvark Safaris — I'd like to plan a safari. ",
  });

  const scrollToInquiry = () => {
    document.getElementById("package-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={t("mobileCta.aria", { defaultValue: "Quick actions" })}
      className="mobile-cta-bar fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/98 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-stretch gap-1.5 px-2 py-2">
        {isPackageDetail ? (
          <button
            type="button"
            onClick={scrollToInquiry}
            className="btn-fill flex min-h-11 flex-1 items-center justify-center gap-1.5 px-2 text-[0.62rem] tracking-[0.12em] sm:text-[0.65rem]"
          >
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {t("mobileCta.getQuote", { defaultValue: "Get quote" })}
          </button>
        ) : (
          <Link
            to="/plan-trip"
            className="btn-fill flex min-h-11 flex-1 items-center justify-center gap-1.5 px-2 text-[0.62rem] tracking-[0.12em] sm:text-[0.65rem]"
          >
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {t("nav.bookNow", { defaultValue: "Book now" })}
          </Link>
        )}
        <a
          href={`tel:${SITE.phoneAfricaTel}`}
          className="btn-line flex min-h-11 flex-1 items-center justify-center gap-1.5 border-border px-2 text-[0.62rem] tracking-[0.12em] sm:text-[0.65rem]"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {t("mobileCta.call", { defaultValue: "Call" })}
        </a>
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm bg-[#25D366] px-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity active:opacity-90 sm:text-[0.65rem]"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          {t("mobileCta.whatsapp", { defaultValue: "WhatsApp" })}
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
