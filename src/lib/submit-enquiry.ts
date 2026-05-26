import type { EnquiryPayload } from "@/lib/enquiry-schema";
import { SITE } from "@/lib/site-config";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; mailto?: string };

function buildMailtoFallback(payload: EnquiryPayload): string {
  const lines = [
    `Form: ${payload.formType}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone && `Phone: ${payload.phone}`,
    payload.country && `Country: ${payload.country}`,
    payload.travelDates && `Dates: ${payload.travelDates}`,
    payload.travelers && `Travelers: ${payload.travelers}`,
    payload.budget && `Budget: ${payload.budget}`,
    payload.lodgingStyle && `Lodging: ${payload.lodgingStyle}`,
    payload.childrenAges && `Children: ${payload.childrenAges}`,
    payload.mustSee && `Must see: ${payload.mustSee}`,
    payload.flightsBooked && `Flights booked: ${payload.flightsBooked}`,
    payload.safariTitle && `Safari: ${payload.safariTitle}`,
    payload.interests?.length && `Interests: ${payload.interests.join(", ")}`,
    "",
    payload.message,
  ].filter(Boolean);

  const subject = encodeURIComponent(
    payload.subject ?? `Safari inquiry — ${payload.name}`,
  );
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${SITE.formsEmail}?subject=${subject}&body=${body}`;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

    if (res.ok && data.ok) {
      return { ok: true };
    }

    if (res.status === 429) {
      return {
        ok: false,
        error: data.error ?? "Too many attempts. Please wait a while or call us directly.",
        mailto: buildMailtoFallback(payload),
      };
    }

    if (res.status === 403) {
      return {
        ok: false,
        error: data.error ?? "Security verification failed. Please refresh the page and try again.",
      };
    }

    const error = data.error ?? "Unable to send your message. Please try again or email us directly.";
    return { ok: false, error, mailto: buildMailtoFallback(payload) };
  } catch {
    return {
      ok: false,
      error: "Network error. You can email us directly using the button below.",
      mailto: buildMailtoFallback(payload),
    };
  }
}
