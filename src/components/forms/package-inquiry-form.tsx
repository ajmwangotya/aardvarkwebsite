import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FormSecurity, isSubmitBlockedByTurnstile } from "@/components/forms/form-security";
import { submitEnquiry } from "@/lib/submit-enquiry";
import type { EnquiryPayload } from "@/lib/enquiry-schema";
import { FormSlaNote } from "@/components/forms/form-sla-note";

type PackageInquiryFormProps = {
  packageTitle: string;
  className?: string;
};

export function PackageInquiryForm({ packageTitle, className = "" }: PackageInquiryFormProps) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMailto(null);

    const fd = new FormData(e.currentTarget);
    const payload: EnquiryPayload = {
      formType: "safari-quote",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      travelDates: String(fd.get("dates") ?? "") || undefined,
      travelers: String(fd.get("travelers") ?? "") || undefined,
      message:
        String(fd.get("message") ?? "").trim() ||
        `Inquiry about: ${packageTitle}`,
      safariTitle: packageTitle,
      website: String(fd.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    };

    const result = await submitEnquiry(payload);
    setSubmitting(false);

    if (result.ok) {
      setSent(true);
      e.currentTarget.reset();
    } else {
      setError(result.error);
      if (result.mailto) setMailto(result.mailto);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <FormSecurity onToken={setTurnstileToken} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("packagesPage.formName")} name="name" required />
        <Field label={t("packagesPage.formEmail")} name="email" type="email" required />
        <Field label={t("planTripPage.phone")} name="phone" />
        <Field label={t("planTripPage.travelDates")} name="dates" placeholder={t("planTripPage.travelDatesPlaceholder")} />
        <Field label={t("planTripPage.travelers")} name="travelers" placeholder={t("planTripPage.travelersPlaceholder")} className="sm:col-span-2" />
      </div>

      <Field label={t("packagesPage.formMessage")} name="message" rows={4} />

      <FormSlaNote />

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
          {mailto && (
            <a href={mailto} className="mt-2 block underline">
              {t("forms.emailFallback")}
            </a>
          )}
        </p>
      )}

      {sent && (
        <p className="text-sm text-gold" role="status">
          {t("packagesPage.formSent")}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting || sent || isSubmitBlockedByTurnstile(turnstileToken)}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-fill w-full justify-center disabled:opacity-60"
      >
        {submitting ? t("forms.sending") : sent ? t("packagesPage.formSent") : t("packagesPage.formSubmit")}
      </motion.button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  rows,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  const id = `pkg-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm focus:border-gold outline-none"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm focus:border-gold outline-none"
        />
      )}
    </div>
  );
}
