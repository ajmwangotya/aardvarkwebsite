import clientI18n, { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { parseLangParam } from "@/lib/i18n-instance";
import { switchLanguage } from "@/lib/switch-language";
import { useNavigate, useRouteContext, useRouterState } from "@tanstack/react-router";
import { Globe, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  it: "🇮🇹",
  es: "🇪🇸",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { t, i18n } = useTranslation(undefined, { i18n: clientI18n });
  const navigate = useNavigate();
  const listboxId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );

  const search = useRouterState({ select: (s) => s.location.search }) as { lang?: string };
  const { lang: routeLang } = useRouteContext({ from: "__root__", strict: false }) as {
    lang?: Lang;
  };
  const current = parseLangParam(search.lang ?? routeLang ?? i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  useEffect(() => {
    if (!open || !buttonRef.current) {
      setMenuStyle(null);
      return;
    }

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuStyle({
        top: rect.bottom + 8,
        left: Math.max(8, rect.right - 176),
        width: 176,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const close = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", close);
      document.addEventListener("keydown", onKey);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chooseLanguage = (lng: Lang) => {
    setOpen(false);
    void switchLanguage(lng, navigate);
  };

  const menu =
    open && menuStyle
      ? createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-label={t("lang.label")}
            style={{
              position: "fixed",
              top: menuStyle.top,
              left: menuStyle.left,
              width: menuStyle.width,
              zIndex: 100000,
            }}
            className="border border-border bg-card shadow-2xl"
          >
            {SUPPORTED_LANGS.map((lng) => (
              <button
                key={lng}
                type="button"
                role="option"
                aria-selected={current === lng}
                onClick={() => chooseLanguage(lng)}
                className={`flex min-h-11 w-full touch-manipulation items-center gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary active:bg-secondary ${
                  current === lng ? "text-gold" : "text-foreground/80"
                }`}
              >
                <span aria-hidden>{FLAGS[lng]}</span>
                <span>{t(`lang.${lng}`)}</span>
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div ref={rootRef} className="relative shrink-0">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("lang.label")}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          className={`flex min-h-11 min-w-11 touch-manipulation items-center justify-center gap-1.5 px-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
            light ? "text-bone hover:text-gold" : "text-foreground hover:text-gold"
          }`}
        >
          <Globe className="h-3.5 w-3.5" aria-hidden />
          <span>{current.toUpperCase()}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </div>
      {menu}
    </>
  );
}
