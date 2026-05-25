"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const NAV_OFFSET = 96;

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // Expose for debugging + any external consumer
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Smoothly handle every in-page hash link
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest<HTMLAnchorElement>('a[href^="#"], a[href*="/#"]');
      if (!a) return;

      const href = a.getAttribute("href") || "";
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (!hash || hash === "#") {
        // Treat bare "#" as "scroll to top"
        if (hash === "#") {
          e.preventDefault();
          lenis.scrollTo(0, { offset: 0, duration: 1.6 });
        }
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -NAV_OFFSET,
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });

      if (history.pushState) {
        history.pushState(null, "", hash);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
