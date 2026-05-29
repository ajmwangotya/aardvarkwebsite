import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const STORAGE_KEY = "aardvark-cookie-consent";

export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, visible);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
      const script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
    }
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const acceptBtn = dialogRef.current?.querySelector<HTMLButtonElement>("[data-cookie-accept]");
    acceptBtn?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") decline();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, decline]);

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="cookie-consent-banner fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card/98 p-3 shadow-2xl backdrop-blur-md sm:p-5 lg:pb-[max(1rem,env(safe-area-inset-bottom))]"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="pointer-events-none mx-auto flex max-w-[1400px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p id="cookie-consent-title" className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("cookie.message")}{" "}
          <Link to="/privacy" className="pointer-events-auto underline hover:text-gold">
            {t("footer.privacy")}
          </Link>
        </p>
        <div className="pointer-events-auto flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={decline} className="btn-line min-h-11 cursor-pointer text-sm">
            {t("cookie.essential")}
          </button>
          <button type="button" data-cookie-accept onClick={accept} className="btn-fill min-h-11 cursor-pointer text-sm">
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
