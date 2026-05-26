import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { enquirySchema } from "./enquiry-schema";

describe("enquirySchema", () => {
  it("accepts a valid contact enquiry", () => {
    const result = enquirySchema.safeParse({
      formType: "contact",
      name: "Jane Safari",
      email: "jane@example.com",
      message: "We would like a Serengeti trip in July.",
    });
    assert.equal(result.success, true);
  });

  it("rejects header injection in the name field", () => {
    const result = enquirySchema.safeParse({
      formType: "contact",
      name: "Jane\r\nBcc: spam@evil.com",
      email: "jane@example.com",
      message: "Hello",
    });
    assert.equal(result.success, false);
  });

  it("rejects non-empty honeypot", () => {
    const result = enquirySchema.safeParse({
      formType: "contact",
      name: "Bot",
      email: "bot@example.com",
      message: "spam",
      website: "filled",
    });
    assert.equal(result.success, false);
  });
});
