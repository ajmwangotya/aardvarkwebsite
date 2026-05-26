import { z } from "zod";
import { hasHeaderInjectionChars } from "@/lib/security/sanitize";

const safeLine = (max: number) =>
  z
    .string()
    .max(max)
    .refine((s) => !hasHeaderInjectionChars(s), "Invalid characters in field");

export const enquirySchema = z.object({
  formType: z.enum(["contact", "plan-trip", "safari-quote", "newsletter"]),
  name: safeLine(120).pipe(z.string().min(2)),
  email: z
    .string()
    .email()
    .max(200)
    .refine((s) => !hasHeaderInjectionChars(s), "Invalid email"),
  phone: safeLine(40).optional(),
  country: safeLine(80).optional(),
  subject: safeLine(200).optional(),
  message: safeLine(4000).pipe(z.string().min(3)),
  travelDates: safeLine(120).optional(),
  travelers: safeLine(80).optional(),
  budget: safeLine(80).optional(),
  lodgingStyle: safeLine(80).optional(),
  childrenAges: safeLine(120).optional(),
  mustSee: safeLine(500).optional(),
  flightsBooked: safeLine(20).optional(),
  interests: z.array(safeLine(80)).max(20).optional(),
  safariTitle: safeLine(200).optional(),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional(),
  /** Cloudflare Turnstile response token */
  turnstileToken: z.string().max(2048).optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;
