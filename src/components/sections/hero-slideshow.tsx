import { useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/media/optimized-image";
import { preloadImage } from "@/lib/preload-image";

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

  const nextIndex = count > 0 ? (activeIndex + 1) % count : 0;

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      onChangeRef.current((activeRef.current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  useEffect(() => {
    if (count === 0) return;
    preloadImage(slides[activeIndex].img);
    preloadImage(slides[nextIndex].img);
  }, [activeIndex, nextIndex, count, slides]);

  if (count === 0) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      {slides.map((slide, i) => {
        const active = i === activeIndex;
        const shouldLoad = i === activeIndex || i === nextIndex;
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
              hidden={!shouldLoad}
              priority={i === 0}
              className="h-full w-full object-cover object-[center_38%] md:object-center"
            />
          </div>
        );
      })}
    </div>
  );
}
