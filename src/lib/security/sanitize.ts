/** Remove characters that can break email headers or inject control sequences. */
export function stripControlChars(value: string): string {
  return value
    .replace(/[\r\n\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hasHeaderInjectionChars(value: string): boolean {
  return /[\r\n]/.test(value);
}

/** Normalize enquiry fields after Zod parse. */
export function sanitizeEnquiryFields<T extends Record<string, unknown>>(data: T): T {
  const out = { ...data };
  for (const key of [
    "name",
    "email",
    "phone",
    "country",
    "subject",
    "message",
    "travelDates",
    "travelers",
    "budget",
    "lodgingStyle",
    "childrenAges",
    "mustSee",
    "flightsBooked",
    "safariTitle",
  ] as const) {
    const v = out[key as keyof T];
    if (typeof v === "string") {
      (out as Record<string, unknown>)[key] = stripControlChars(v);
    }
  }
  if (typeof out.email === "string") {
    (out as Record<string, unknown>).email = out.email.toLowerCase();
  }
  if (Array.isArray(out.interests)) {
    (out as Record<string, unknown>).interests = out.interests.map((i) =>
      typeof i === "string" ? stripControlChars(i) : i,
    );
  }
  return out;
}
