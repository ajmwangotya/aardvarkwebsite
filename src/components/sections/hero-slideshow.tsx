import { useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/media/optimized-image";

export type HeroSlide = {
  img: string;
  alt: string;
};

const AUTO_ADVANCE_MS = 5000;
const CROSSFADE_MS = 1200;

type HeroSlideshowProps = {
  slides: HeroSlide[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  reduceMotion?: boolean;
};

/**
 * Full-bleed crossfading hero background. Class + inline opacity so global
 * reduced-motion resets do not block slide changes.
 */
export function HeroSlideshow({
  slides,
  activeIndex,
  onActiveIndexChange,
  reduceMotion = false,
}: HeroSlideshowProps) {
  const count = slides.length;
  const onChangeRef = useRef(onActiveIndexChange);
  const activeRef = useRef(activeIndex);
  onChangeRef.current = onActiveIndexChange;
  activeRef.current = activeIndex;

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      onChangeRef.current((activeRef.current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      {slides.map((slide, i) => {
        const active = i === activeIndex;
        return (
          <div
            key={slide.img}
            className={`hero-slideshow__slide absolute inset-0 ${active && !reduceMotion ? "hero-slideshow__slide--active" : ""}`}
            style={{
              opacity: active ? 1 : 0,
              zIndex: active ? 1 : 0,
              transition: reduceMotion
                ? "opacity 400ms ease-in-out"
                : `opacity ${CROSSFADE_MS}ms ease-in-out`,
            }}
          >
            <OptimizedImage
              src={slide.img}
              alt=""
              className="h-full w-full object-cover object-[center_38%] md:object-center"
              priority={i === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
