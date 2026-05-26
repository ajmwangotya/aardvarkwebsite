import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { SITE, OFFICE_HOURS } from "@/lib/site-config";

export function FormSlaNote() {
  const { t } = useTranslation();
  return (
    <p className="flex items-start gap-2 text-sm text-muted-foreground">
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
      <span>
        {t("forms.sla")}{" "}
        <a href={`mailto:${SITE.formsEmail}`} className="underline hover:text-gold">
          {SITE.formsEmail}
        </a>
        . {OFFICE_HOURS.whatsapp}
      </span>
    </p>
  );
}
