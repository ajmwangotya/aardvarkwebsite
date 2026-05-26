import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Globe, ChevronDown } from "lucide-react";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { parseLangParam } from "@/lib/i18n-instance";

const FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  it: "🇮🇹",
  es: "🇪🇸",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const search = useRouterState({ select: (s) => s.location.search });
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = parseLangParam(
    (search as { lang?: string }).lang ?? i18n.resolvedLanguage ?? i18n.language,
  );

  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setLanguage = (lng: Lang) => {
    void i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lng);
    }
    navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        lang: lng === "en" ? undefined : lng,
      }),
      replace: true,
    });
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label={t("lang.label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="lang-listbox"
        className={`flex min-h-11 min-w-11 touch-manipulation items-center justify-center gap-1.5 px-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
          light ? "text-bone hover:text-gold" : "text-foreground hover:text-gold"
        }`}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden />
        <span>{current.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div
          id="lang-listbox"
          role="listbox"
          aria-label={t("lang.label")}
          className="absolute right-0 top-full z-[130] mt-2 w-44 border border-border bg-card shadow-2xl"
        >
          {SUPPORTED_LANGS.map((lng) => (
            <button
              key={lng}
              type="button"
              role="option"
              aria-selected={current === lng}
              onClick={() => setLanguage(lng)}
              className={`flex min-h-11 w-full touch-manipulation items-center gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary active:bg-secondary ${
                current === lng ? "text-gold" : "text-foreground/80"
              }`}
            >
              <span aria-hidden>{FLAGS[lng]}</span>
              <span>{t(`lang.${lng}`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
