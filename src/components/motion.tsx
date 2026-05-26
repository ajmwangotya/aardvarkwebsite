import {
  motion,
  type Variants,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";
import { type ReactNode, useRef, useEffect, useState } from "react";

const smooth = [0.22, 1, 0.36, 1] as const;
const snappy = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [...smooth] } },
};

export const fadeUpBig: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [...smooth] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [...smooth] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [...smooth] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [...smooth] } },
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -30, y: 30 },
  show: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.9, ease: [...snappy] } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [...smooth] } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9, y: 40 },
  show: { opacity: 1, rotate: 0, scale: 1, y: 0, transition: { duration: 1, ease: [...smooth] } },
};

export const curtainUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1, ease: [...smooth] } },
};

export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-24px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mobile.matches || motion.matches);
    update();
    mobile.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

export function MagneticHover({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatCount(value: number): string {
  if (value >= 1000) return value.toLocaleString("en-US");
  return String(value);
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    setCount(0);
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        setHasAnimated(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatCount(count)}
      {suffix}
    </span>
  );
}

export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [...smooth] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
