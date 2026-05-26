import { SITE } from "@/lib/site-config";

function allowedOrigins(): string[] {
  const fromEnv = process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean) ?? [];
  const defaults = [
    SITE.url.replace(/\/$/, ""),
    "https://www.aardvarktanzania.com",
    "https://aardvarktanzania.com",
  ];
  const dev =
    process.env.NODE_ENV !== "production"
      ? ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"]
      : [];
  return [...new Set([...defaults, ...fromEnv, ...dev])];
}

export function isAllowedRequestOrigin(request: Request): boolean {
  const allowed = allowedOrigins();
  const origin = request.headers.get("Origin");
  if (origin) {
    return allowed.includes(origin);
  }

  const referer = request.headers.get("Referer");
  if (referer) {
    try {
      return allowed.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return process.env.NODE_ENV !== "production";
}
