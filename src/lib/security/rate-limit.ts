const MAX_REQUESTS = 8;
const WINDOW_SECONDS = 3600;

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Per-IP rate limit using the Workers Cache API (shared across isolates in a zone).
 */
export async function checkRateLimit(request: Request): Promise<{ allowed: true } | { allowed: false }> {
  const ip = clientIp(request);
  const cacheKey = new Request(`https://enquiry-rate-limit.internal/${encodeURIComponent(ip)}`);

  try {
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    const count = cached ? Number.parseInt(await cached.text(), 10) || 0 : 0;

    if (count >= MAX_REQUESTS) {
      return { allowed: false };
    }

    await cache.put(cacheKey, new Response(String(count + 1)), {
      expirationTtl: WINDOW_SECONDS,
    });

    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}
