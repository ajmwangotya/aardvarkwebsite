export function isTurnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export function isTurnstileBypassAllowed(): boolean {
  return (
    process.env.ALLOW_INSECURE_FORMS === "true" && process.env.NODE_ENV !== "production"
  );
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return isTurnstileBypassAllowed();
  }

  if (!token?.trim()) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
