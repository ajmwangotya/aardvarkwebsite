import { createFileRoute } from "@tanstack/react-router";
import { enquirySchema } from "@/lib/enquiry-schema";
import { SITE } from "@/lib/site-config";
import {
  MAX_ENQUIRY_BODY_BYTES,
  checkRateLimit,
  isAllowedRequestOrigin,
  isTurnstileBypassAllowed,
  isTurnstileRequired,
  sanitizeEnquiryFields,
  verifyTurnstileToken,
} from "@/lib/security";

function formatEmailBody(data: ReturnType<typeof enquirySchema.parse>): string {
  const rows: [string, string | undefined][] = [
    ["Form", data.formType],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Country", data.country],
    ["Subject", data.subject],
    ["Travel dates", data.travelDates],
    ["Travelers", data.travelers],
    ["Budget", data.budget],
    ["Lodging style", data.lodgingStyle],
    ["Children ages", data.childrenAges],
    ["Must see", data.mustSee],
    ["Flights booked", data.flightsBooked],
    ["Safari", data.safariTitle],
    ["Interests", data.interests?.join(", ")],
    ["Message", data.message],
  ];

  return rows
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function safeSubject(data: ReturnType<typeof enquirySchema.parse>): string {
  const label = data.subject ?? data.name;
  return `[${data.formType}] ${label} — Aardvark Safaris`.slice(0, 200);
}

async function resendSend(payload: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.ok;
}

function confirmationEmailText(name: string): string {
  return `Dear ${name},

Thank you for contacting Aardvark Safaris Tanzania. We have received your enquiry and will respond within 24 hours — often the same business day (Mon–Fri 8:00–20:00 EAT).

If your dates are urgent, you may also reach us on WhatsApp: ${SITE.phoneAfrica}
${SITE.whatsapp}

Warm regards,
The Aardvark Safaris Team
${SITE.emailAfrica}
${SITE.url}`;
}

async function sendViaResend(data: ReturnType<typeof enquirySchema.parse>): Promise<boolean> {
  const to = process.env.ENQUIRY_TO_EMAIL ?? SITE.formsEmail;
  const from =
    process.env.ENQUIRY_FROM_EMAIL ?? `Aardvark Safaris <${SITE.formsEmail}>`;

  const staffOk = await resendSend({
    from,
    to: [to],
    reply_to: data.email,
    subject: safeSubject(data),
    text: formatEmailBody(data),
  });

  if (!staffOk) return false;

  if (data.formType !== "newsletter") {
    await resendSend({
      from,
      to: [data.email],
      reply_to: SITE.formsEmail,
      subject: "We received your safari enquiry — Aardvark Safaris",
      text: confirmationEmailText(data.name),
    });
  }

  return true;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

async function readJsonBody(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("Content-Length") ?? "0");
  if (length > MAX_ENQUIRY_BODY_BYTES) {
    throw new Error("PAYLOAD_TOO_LARGE");
  }

  const raw = await request.text();
  if (raw.length > MAX_ENQUIRY_BODY_BYTES) {
    throw new Error("PAYLOAD_TOO_LARGE");
  }

  return JSON.parse(raw) as unknown;
}

export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!isAllowedRequestOrigin(request)) {
            return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
          }

          const rate = await checkRateLimit(request);
          if (!rate.allowed) {
            return Response.json(
              { ok: false, error: "Too many requests. Please wait an hour or contact us by phone." },
              { status: 429 },
            );
          }

          let json: unknown;
          try {
            json = await readJsonBody(request);
          } catch (e) {
            if (e instanceof Error && e.message === "PAYLOAD_TOO_LARGE") {
              return Response.json({ ok: false, error: "Request too large." }, { status: 413 });
            }
            return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
          }

          const parsed = enquirySchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "Invalid form data. Please check required fields." },
              { status: 400 },
            );
          }

          if (parsed.data.website) {
            return Response.json({ ok: true });
          }

          if (isTurnstileRequired()) {
            const valid = await verifyTurnstileToken(parsed.data.turnstileToken, clientIp(request));
            if (!valid) {
              return Response.json(
                { ok: false, error: "Security verification failed. Please refresh and try again." },
                { status: 403 },
              );
            }
          } else if (!isTurnstileBypassAllowed() && process.env.NODE_ENV === "production") {
            return Response.json(
              {
                ok: false,
                error: "Form security is not configured. Please contact us by phone or email.",
              },
              { status: 503 },
            );
          }

          const data = sanitizeEnquiryFields(parsed.data);
          const sent = await sendViaResend(data);

          if (!sent) {
            return Response.json(
              {
                ok: false,
                error:
                  "We could not deliver your message automatically. Please use the email link on the form or contact us by phone or WhatsApp.",
              },
              { status: 503 },
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("[enquiry] request failed");
          if (err instanceof Error) {
            console.error("[enquiry]", err.name, err.message);
          }
          return Response.json(
            { ok: false, error: "Server error. Please try again or contact us by phone." },
            { status: 500 },
          );
        }
      },
    },
  },
});
