import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Play, Pause } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type CinematicVideoSectionProps = {
  src: string;
  eyebrowKey: string;
  titleKey: string;
  descKey: string;
  className?: string;
  dark?: boolean;
};

export function CinematicVideoSection({
  src,
  eyebrowKey,
  titleKey,
  descKey,
  className,
  dark = false,
}: CinematicVideoSectionProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <section className={cn(dark ? "bg-ink text-bone" : "bg-card", className)}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12 md:py-28">
        <Reveal className="max-w-2xl">
          <span className={cn("eyebrow", dark && "text-gold")}>{t(eyebrowKey)}</span>
          <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3rem)]">
            {t(titleKey)}
          </h2>
          <p className={cn("mt-4 text-sm leading-relaxed sm:text-base", dark ? "text-bone/75" : "text-muted-foreground")}>
            {t(descKey)}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 sm:mt-14">
          <div className="group relative overflow-hidden rounded-sm gold-border-glow">
            <video
              ref={videoRef}
              src={src}
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20 opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
            <button
              type="button"
              onClick={togglePlay}
              className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 bg-ink/50 text-bone backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/20 hover:shadow-[0_0_40px_rgba(196,155,70,0.35)] sm:h-20 sm:w-20"
              aria-label={playing ? t("video.pause") : t("video.play")}
            >
              {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 fill-current" />}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
