import { useEffect, useState } from "react";

/** Responsive map height: shorter on phones, full height from md up. */
export function useMapHeight(desktop = 520) {
  const [height, setHeight] = useState(360);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setHeight(
        mobile ? Math.min(Math.round(window.innerHeight * 0.48), 400) : desktop,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktop]);

  return height;
}
