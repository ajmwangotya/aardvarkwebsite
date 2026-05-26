import { motion, useReducedMotion } from "framer-motion";
import { useId, useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { FormSecurity, isSubmitBlockedByTurnstile } from "@/components/form-security";
import { submitEnquiry } from "@/lib/submit-enquiry";
import type { EnquiryPayload } from "@/lib/enquiry-schema";
import { useIsMobile } from "@/hooks/use-mobile";

const STEP_KEYS = ["contact", "trip", "details"] as const;

export function PlanTripForm() {
  const { t } = useTranslation();
  const isCompact = useIsMobile();
  const reduceMotion = useReducedMotion();
  const errorId = useId();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const interests = t("planTripPage.interestOptions", { returnObjects: true }) as string[];
  const budgetOptions = t("planTripPage.budgetOptions", { returnObjects: true }) as string[];
  const lodgingOptions = t("planTripPage.lodgingOptions", { returnObjects: true }) as string[];

  const stepLabels = [
    t("planTripPage.stepContact", { defaultValue: "Contact" }),
    t("planTripPage.stepTrip", { defaultValue: "Your trip" }),
    t("planTripPage.stepDetails", { defaultValue: "Details" }),
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCompact && step < STEP_KEYS.length - 1) {
      const form = e.currentTarget;
      if (step === 0) {
        for (const name of ["name", "email"] as const) {
          const el = form.elements.namedItem(name);
          if (el instanceof HTMLInputElement && !el.reportValidity()) return;
        }
      }
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setError(null);
    setMailto(null);

    const fd = new FormData(e.currentTarget);
    const payload: EnquiryPayload = {
      formType: "plan-trip",
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      country: String(fd.get("country") ?? "") || undefined,
      travelDates: String(fd.get("dates") ?? "") || undefined,
      travelers: String(fd.get("travelers") ?? "") || undefined,
      budget: String(fd.get("budget") ?? "") || undefined,
      lodgingStyle: String(fd.get("lodging") ?? "") || undefined,
      childrenAges: String(fd.get("childrenAges") ?? "") || undefined,
      mustSee: String(fd.get("mustSee") ?? "") || undefined,
      flightsBooked: String(fd.get("flightsBooked") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      interests: picked,
      website: String(fd.get("website") ?? ""),
      turnstileToken: turnstileToken ?? undefined,
    };

    const result = await submitEnquiry(payload);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      e.currentTarget.reset();
      setPicked([]);
      setStep(0);
    } else {
      setError(result.error);
      if (result.mailto) setMailto(result.mailto);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 border border-border bg-card p-5 max-lg:pb-36 sm:gap-8 sm:p-8 lg:p-12"
    >
      {isCompact && (
        <ol className="flex list-none gap-2 p-0" aria-label={t("planTripPage.formProgress", { defaultValue: "Form progress" })}>
          {STEP_KEYS.map((_, i) => (
            <li key={STEP_KEYS[i]} className="flex flex-1 flex-col gap-1" aria-current={i === step ? "step" : undefined}>
              <div
                className={`h-1 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-border"}`}
                aria-hidden
              />
              <span className={`text-[0.65rem] uppercase tracking-[0.18em] ${i === step ? "text-gold" : "text-muted-foreground"}`}>
                {stepLabels[i]}
              </span>
            </li>
          ))}
        </ol>
      )}

      <FormSecurity onToken={setTurnstileToken} />

      {isCompact ? (
        <>
          {step === 0 && (
            <div className="grid gap-6">
              <Field label={t("planTripPage.fullName")} name="name" required autoComplete="name" />
              <Field label={t("planTripPage.email")} name="email" type="email" required autoComplete="email" />
              <Field label={t("planTripPage.phone")} name="phone" type="tel" autoComplete="tel" />
              <Field label={t("planTripPage.country")} name="country" autoComplete="country-name" />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-6">
              <Field
                label={t("planTripPage.travelDates")}
                name="dates"
                type="date"
                placeholder={t("planTripPage.travelDatesPlaceholder")}
              />
              <Field label={t("planTripPage.travelers")} name="travelers" placeholder={t("planTripPage.travelersPlaceholder")} />
              <SelectField label={t("planTripPage.budget")} name="budget" options={budgetOptions} placeholder={t("planTripPage.budgetPlaceholder")} />
              <SelectField label={t("planTripPage.lodging")} name="lodging" options={lodgingOptions} placeholder={t("planTripPage.lodgingPlaceholder")} />
              <Field label={t("planTripPage.childrenAges")} name="childrenAges" placeholder={t("planTripPage.childrenAgesPlaceholder")} />
              <Field label={t("planTripPage.mustSee")} name="mustSee" placeholder={t("planTripPage.mustSeePlaceholder")} />
              <SelectField
                label={t("planTripPage.flightsBooked")}
                name="flightsBooked"
                options={[t("planTripPage.flightsYes"), t("planTripPage.flightsNo"), t("planTripPage.flightsUnsure")]}
              />
            </div>
          )}
          {step === 2 && (
            <>
              <InterestsPicker interests={interests} picked={picked} setPicked={setPicked} label={t("planTripPage.interests")} />
              <MessageField label={t("planTripPage.tellUsMore")} placeholder={t("planTripPage.tellUsMorePlaceholder")} />
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label={t("planTripPage.fullName")} name="name" required autoComplete="name" />
            <Field label={t("planTripPage.email")} name="email" type="email" required autoComplete="email" />
            <Field label={t("planTripPage.phone")} name="phone" type="tel" autoComplete="tel" />
            <Field label={t("planTripPage.country")} name="country" autoComplete="country-name" />
            <Field
              label={t("planTripPage.travelDates")}
              name="dates"
              type="date"
              placeholder={t("planTripPage.travelDatesPlaceholder")}
            />
            <Field label={t("planTripPage.travelers")} name="travelers" placeholder={t("planTripPage.travelersPlaceholder")} />
            <SelectField label={t("planTripPage.budget")} name="budget" options={budgetOptions} placeholder={t("planTripPage.budgetPlaceholder")} />
            <SelectField label={t("planTripPage.lodging")} name="lodging" options={lodgingOptions} placeholder={t("planTripPage.lodgingPlaceholder")} />
            <Field label={t("planTripPage.childrenAges")} name="childrenAges" placeholder={t("planTripPage.childrenAgesPlaceholder")} />
            <Field label={t("planTripPage.mustSee")} name="mustSee" placeholder={t("planTripPage.mustSeePlaceholder")} />
            <SelectField
              label={t("planTripPage.flightsBooked")}
              name="flightsBooked"
              options={[t("planTripPage.flightsYes"), t("planTripPage.flightsNo"), t("planTripPage.flightsUnsure")]}
            />
          </div>
          <InterestsPicker interests={interests} picked={picked} setPicked={setPicked} label={t("planTripPage.interests")} />
          <MessageField label={t("planTripPage.tellUsMore")} placeholder={t("planTripPage.tellUsMorePlaceholder")} />
        </>
      )}

      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
          {mailto && (
            <a href={mailto} className="mt-2 block underline">
              {t("forms.emailFallback")}
            </a>
          )}
        </p>
      )}

      {submitted && (
        <p className="text-sm text-gold" role="status">
          {t("planTripPage.submitted")}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {isCompact && step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="btn-line w-full justify-center sm:w-auto"
          >
            {t("planTripPage.back", { defaultValue: "Back" })}
          </button>
        )}
        <motion.button
          type="submit"
          disabled={
            submitting ||
            submitted ||
            (!isCompact && isSubmitBlockedByTurnstile(turnstileToken)) ||
            (isCompact && step === STEP_KEYS.length - 1 && isSubmitBlockedByTurnstile(turnstileToken))
          }
          whileHover={reduceMotion || submitting ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          aria-describedby={error ? errorId : undefined}
          className="btn-fill plan-trip-submit-sticky w-full justify-center disabled:opacity-60 max-lg:fixed max-lg:inset-x-4 max-lg:z-[68] max-lg:shadow-xl lg:w-auto lg:self-start"
        >
          {submitting
            ? t("forms.sending")
            : submitted
              ? t("planTripPage.submitted")
              : isCompact && step < STEP_KEYS.length - 1
                ? t("planTripPage.next", { defaultValue: "Continue" })
                : t("planTripPage.submit")}
        </motion.button>
      </div>
    </form>
  );
}

function InterestsPicker({
  interests,
  picked,
  setPicked,
  label,
}: {
  interests: string[];
  picked: string[];
  setPicked: Dispatch<SetStateAction<string[]>>;
  label: string;
}) {
  const groupId = useId();

  return (
    <fieldset className="border-0 p-0">
      <legend className="text-xs uppercase tracking-eyebrow text-muted-foreground">{label}</legend>
      <div id={groupId} className="mt-4 flex flex-wrap gap-2" role="group" aria-label={label}>
        {interests.map((i) => {
          const active = picked.includes(i);
          return (
            <motion.button
              key={i}
              type="button"
              aria-pressed={active}
              onClick={() => setPicked((p) => (active ? p.filter((x) => x !== i) : [...p, i]))}
              className={`flex min-h-11 items-center gap-2 border px-4 py-3 text-xs uppercase tracking-eyebrow transition-all ${
                active ? "border-gold bg-gold text-ink" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {active && <Check className="h-3 w-3" aria-hidden />}
              {i}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MessageField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor="plan-message" className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        {label}
      </label>
      <textarea
        id="plan-message"
        name="message"
        rows={5}
        required
        className="mt-2 w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
        placeholder={placeholder}
      />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={type === "date" ? undefined : placeholder}
        autoComplete={autoComplete}
        min={type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
        className="mt-2 w-full min-h-11 border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-eyebrow text-muted-foreground">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-2 w-full min-h-11 border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-gold"
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
