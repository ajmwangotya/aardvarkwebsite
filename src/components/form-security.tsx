import { useEffect, useRef, useId } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

export const turnstileSiteKeyConfigured = Boolean(SITE_KEY?.trim());

let scriptLoading: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-turnstile="1"]');
    if (existing) {
      window.onTurnstileLoad = () => resolve();
      return;
    }

    window.onTurnstileLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "1";
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

type FormSecurityProps = {
  onToken: (token: string | null) => void;
  className?: string;
};

/** Honeypot + optional Cloudflare Turnstile widget for enquiry forms. */
export function FormSecurity({ onToken, className = "mt-2" }: FormSecurityProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const honeypotId = useId();

  useEffect(() => {
    if (!turnstileSiteKeyConfigured) {
      onToken(null);
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        await loadTurnstileScript();
        if (cancelled || !containerRef.current || !window.turnstile || !SITE_KEY) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: "auto",
          callback: (token) => {
            if (!cancelled) onToken(token);
          },
          "expired-callback": () => {
            if (!cancelled) onToken(null);
          },
          "error-callback": () => {
            if (!cancelled) onToken(null);
          },
        });
      } catch {
        if (!cancelled) onToken(null);
      }
    })();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      onToken(null);
    };
  }, [onToken]);

  return (
    <>
      <input
        type="text"
        id={honeypotId}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      {turnstileSiteKeyConfigured ? (
        <div className={className}>
          <div ref={containerRef} className="min-h-[65px]" aria-label={t("forms.turnstileAria", { defaultValue: "Security check" })} />
        </div>
      ) : null}
    </>
  );
}

export function isSubmitBlockedByTurnstile(token: string | null): boolean {
  return turnstileSiteKeyConfigured && !token;
}
