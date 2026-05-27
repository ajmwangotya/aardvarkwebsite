/**
 * Same-origin /videos/* proxy → R2 public URL (fixes mobile Safari cross-origin playback).
 */

const DEFAULT_UPSTREAM = "https://media.aardvarktanzania.com";

const MP4_NAME = /^[a-z0-9][a-z0-9-]*\.mp4$/i;

function upstreamBase(): string {
  const fromEnv = (import.meta.env?.VITE_VIDEO_CDN_BASE as string | undefined)?.trim();
  return (fromEnv || DEFAULT_UPSTREAM).replace(/\/$/, "");
}

export async function proxyVideoRequest(request: Request): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  const { pathname } = new URL(request.url);
  if (!pathname.startsWith("/videos/")) return null;

  const name = pathname.slice("/videos/".length);
  if (!name || !MP4_NAME.test(name)) {
    return new Response("Not found", { status: 404 });
  }

  const remote = `${upstreamBase()}/videos/${name}`;
  const forward = new Headers();
  const range = request.headers.get("Range");
  if (range) forward.set("Range", range);

  const upstream = await fetch(remote, { method: request.method, headers: forward });
  if (!upstream.ok && upstream.status !== 206) {
    return new Response(upstream.body, { status: upstream.status });
  }

  const headers = new Headers();
  for (const key of ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified"] as const) {
    const value = upstream.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers,
  });
}
