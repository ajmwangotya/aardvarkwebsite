import { useTranslation } from "react-i18next";

export function OfficeHoursDisplay({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const blocks = t("officeHours.blocks", { returnObjects: true }) as {
    label: string;
    weekday: string;
    weekend?: string;
  }[];

  return (
    <div className={`space-y-4 text-sm ${className}`}>
      {blocks.map((block) => (
        <div key={block.label}>
          <p className="font-medium text-ink">{block.label}</p>
          <p className="mt-1 text-muted-foreground">{block.weekday}</p>
          {block.weekend ? <p className="text-muted-foreground">{block.weekend}</p> : null}
        </div>
      ))}
      <p className="text-muted-foreground border-t border-border pt-3">{t("officeHours.whatsapp")}</p>
      <p className="text-xs text-muted-foreground italic">{t("officeHours.note")}</p>
    </div>
  );
}
