import { useTranslation } from "react-i18next";
import { TRIPADVISOR } from "@/lib/site-config";

/** Repeated spine line — northern Tanzania specialist from Arusha. */
export function BrandPromiseBar({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <p
      className={`text-center text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em] ${className}`}
    >
      <span className="text-ink/90">{t("home.brandPromise")}</span>
      <span className="mx-2 text-gold" aria-hidden>
        ·
      </span>
      <span>{t("home.brandPromiseProof", { rating: TRIPADVISOR.rating, count: TRIPADVISOR.reviewCount })}</span>
    </p>
  );
}
