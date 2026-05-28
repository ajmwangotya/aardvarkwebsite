import { type RefObject, useCallback, useEffect, useState } from "react";

type UseMutedAutoplayOptions = {
  /** When true, skip play attempts (e.g. prefers-reduced-motion fallback). */
  paused?: boolean;
  /** When false, hook is inert. */
  enabled?: boolean;
};

/** Muted autoplay with iOS/Safari-friendly retries (gesture, visibility, in-view). */
export function useMutedAutoplay(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string,
  { paused = false, enabled = true }: UseMutedAutoplayOptions = {},
) {
  const [needsTap, setNeedsTap] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !enabled || paused) return;
    el.defaultMuted = true;
    el.muted = true;
    try {
      if (el.readyState < HTMLMediaElement.HAVE_METADATA) {
        el.load();
      }
      await el.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  }, [videoRef, enabled, paused]);

  useEffect(() => {
    setNeedsTap(false);
  }, [src]);

  useEffect(() => {
    if (!enabled || paused) return;
    const el = videoRef.current;
    if (!el) return;

    void tryPlay();

    const onGesture = () => void tryPlay();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });

    const onVisible = () => {
      if (document.visibilityState === "visible") void tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible) void tryPlay();
        else el.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
      observer.disconnect();
    };
  }, [enabled, paused, src, tryPlay, videoRef]);

  return { tryPlay, needsTap };
}
