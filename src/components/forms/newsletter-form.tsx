import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormSecurity, isSubmitBlockedByTurnstile } from "@/components/forms/form-security";
import { submitEnquiry } from "@/lib/submit-enquiry";

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  source?: string;
};

export function NewsletterForm({
  className = "flex border border-bone/20",
  inputClassName = "flex-1 bg-transparent px-3 py-3 text-sm placeholder:text-bone/40 outline-none",
  buttonClassName = "min-h-11 shrink-0 bg-gold px-5 text-xs uppercase tracking-[0.28em] text-ink transition hover:bg-bone",
  source = "footer",
}: NewsletterFormProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setStatus("error");
      return;
    }

    const result = await submitEnquiry({
      formType: "newsletter",
      name: "Newsletter subscriber",
      email,
      message: `Newsletter signup (${source})`,
      website: String(fd.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    });

    if (result.ok) {
      setStatus("done");
      e.currentTarget.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FormSecurity onToken={setTurnstileToken} className="mb-2" />
      <label htmlFor={`newsletter-email-${source}`} className="sr-only">
        {t("footer.emailPlaceholder")}
      </label>
      <input
        id={`newsletter-email-${source}`}
        name="email"
        type="email"
        required
        disabled={status === "done"}
        placeholder={t("footer.emailPlaceholder")}
        className={inputClassName}
      />
      <button
        type="submit"
        disabled={status === "sending" || status === "done" || isSubmitBlockedByTurnstile(turnstileToken)}
        className={buttonClassName}
      >
        {status === "done" ? "✓" : status === "sending" ? "…" : t("footer.join")}
      </button>
    </form>
  );
}
