"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Smooth inertial scrolling on desktop.
 * Touch screens keep native scrolling (syncTouch is off),
 * and with "reduce motion" Lenis turns smoothing off itself.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    setLenis(lenis);

    // We handle anchors ourselves: cancel the native browser jump, otherwise it
    // fights the animation. Lenis takes the header offset from scroll-padding-top.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      // keep the skip link native so focus moves to the content
      if (!link || link.classList.contains("skip-link")) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#" || hash === "#top" ? 0 : document.getElementById(hash.slice(1));
      if (target === null) return;
      e.preventDefault();
      // If Lenis is paused (mobile menu open), start it before scrolling:
      // start() resets state and would cancel an animation already in progress
      lenis.start();
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
