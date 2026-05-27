import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { parseLangParam } from "@/lib/i18n-instance";
import { buildLanguagePath, switchLanguage } from "@/lib/switch-language";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Globe, ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

const FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  it: "🇮🇹",
  es: "🇪🇸",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>;
  const current = parseLangParam(
    (search.lang as string | undefined) ?? i18n.resolvedLanguage ?? i18n.language,
  );

  const onPickLanguage = (event: MouseEvent<HTMLAnchorElement>, lng: Lang) => {
    event.preventDefault();
    void switchLanguage(lng, navigate);
  };

  return (
    <details className="language-switcher group relative shrink-0">
      <summary
        className={`language-switcher__trigger flex min-h-11 min-w-11 touch-manipulation cursor-pointer list-none items-center justify-center gap-1.5 px-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors marker:content-none ${
          light ? "text-bone hover:text-gold" : "text-foreground hover:text-gold"
        }`}
        aria-label={t("lang.label")}
      >
        <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>{current.toUpperCase()}</span>
        <ChevronDown
          className="h-3 w-3 shrink-0 transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>

      <div
        role="listbox"
        aria-label={t("lang.label")}
        className="language-switcher__menu absolute right-0 top-full z-[200] mt-2 w-44 border border-border bg-card shadow-2xl"
      >
        {SUPPORTED_LANGS.map((lng) => (
          <a
            key={lng}
            href={buildLanguagePath(pathname, search, lng)}
            role="option"
            aria-selected={current === lng}
            hrefLang={lng}
            onClick={(event) => onPickLanguage(event, lng)}
            className={`flex min-h-11 w-full touch-manipulation items-center gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary active:bg-secondary ${
              current === lng ? "text-gold" : "text-foreground/80"
            }`}
          >
            <span aria-hidden>{FLAGS[lng]}</span>
            <span>{t(`lang.${lng}`)}</span>
          </a>
        ))}
      </div>
    </details>
  );
}
