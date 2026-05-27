import { Trans } from "react-i18next";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  titleKey: string;
  titleItalic?: boolean;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  titleKey,
  titleItalic = true,
  description,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-tight">
          {titleItalic ? (
            <Trans i18nKey={titleKey} components={{ i: <span className="gradient-text italic" /> }} />
          ) : (
            <Trans i18nKey={titleKey} />
          )}
        </h2>
        {description && <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {action}
    </div>
  );
}
