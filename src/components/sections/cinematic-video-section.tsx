import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { cn } from "@/lib/utils";
import { isYouTubeSource } from "@/lib/youtube";

type CinematicVideoSectionProps = {
  src: string;
  poster?: string;
  eyebrowKey: string;
  titleKey: string;
  descKey: string;
  className?: string;
  dark?: boolean;
  /** Muted autoplay when scrolled into view (destination clips). Default: user presses play with sound. */
  autoPlayMuted?: boolean;
};

export function CinematicVideoSection({
  src,
  poster,
  eyebrowKey,
  titleKey,
  descKey,
  className,
  dark = false,
  autoPlayMuted = false,
}: CinematicVideoSectionProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const useYouTube = isYouTubeSource(src);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || failed) return;
    if (autoPlayMuted) {
      el.defaultMuted = true;
      el.muted = true;
    }
    try {
      if (el.readyState < HTMLMediaElement.HAVE_METADATA) {
        el.load();
      }
      await el.play();
      setNeedsTap(false);
    } catch {
      if (autoPlayMuted) setNeedsTap(true);
    }
  }, [autoPlayMuted, failed]);

  useEffect(() => {
    setFailed(false);
    setNeedsTap(false);
  }, [src]);

  useEffect(() => {
    if (!autoPlayMuted || failed || useYouTube) return;
    const el = videoRef.current;
    if (!el) return;

    void tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void tryPlay();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [autoPlayMuted, failed, src, tryPlay, useYouTube]);

  return (
    <section className={cn(dark ? "bg-ink text-bone" : "bg-card", className)}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12 md:py-28">
        <Reveal className="max-w-2xl">
          <span className={cn("eyebrow", dark && "text-gold")}>{t(eyebrowKey)}</span>
          <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3rem)]">{t(titleKey)}</h2>
          <p className={cn("mt-4 text-sm leading-relaxed sm:text-base", dark ? "text-bone/75" : "text-muted-foreground")}>
            {t(descKey)}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 sm:mt-14">
          <div className="group relative aspect-video overflow-hidden rounded-sm gold-border-glow bg-ink">
            {useYouTube ? (
              <YouTubeEmbed src={src} title={t(titleKey)} controls className="aspect-video w-full" />
            ) : failed ? (
              <div className="flex aspect-video flex-col items-center justify-center gap-3 px-6 text-center">
                {poster ? (
                  <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                ) : null}
                <p className="relative z-[1] text-sm text-bone/80">{t("home.filmUnsupported")}</p>
                <p className="relative z-[1] text-xs text-bone/50">
                  {import.meta.env.DEV
                    ? "Place aardvark-wild.mp4 in public/videos/ and restart the dev server."
                    : "Video is temporarily unavailable. Please try again later."}
                </p>
              </div>
            ) : (
              <div className="relative aspect-video h-full w-full">
                <video
                  ref={videoRef}
                  key={src}
                  src={src}
                  poster={poster}
                  playsInline
                  preload="auto"
                  controls
                  muted={autoPlayMuted}
                  loop={autoPlayMuted}
                  autoPlay={autoPlayMuted}
                  className="relative z-0 h-full w-full object-cover"
                  onLoadedData={() => {
                    if (autoPlayMuted) void tryPlay();
                  }}
                  onCanPlay={() => {
                    if (autoPlayMuted) void tryPlay();
                  }}
                  onPlaying={() => setNeedsTap(false)}
                  onError={() => setFailed(true)}
                >
                  {t("home.filmUnsupported")}
                </video>
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" />
                {needsTap && autoPlayMuted && (
                  <button
                    type="button"
                    onClick={() => void tryPlay()}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-ink/45 text-bone backdrop-blur-[2px] transition-colors hover:bg-ink/55"
                    aria-label={t("home.watchFilm")}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/60 bg-ink/50 sm:h-20 sm:w-20">
                      <Play className="h-7 w-7 fill-current" aria-hidden />
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs">{t("home.watchFilm")}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
