"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/**
 * A div that pauses looping CSS animations inside it while it is off screen
 * (sets data-offscreen; the rule lives in globals.css). The element's own animation
 * is untouched — only descendants are paused, so scroll-driven effects on it keep working.
 */
export function OffscreenPause(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "";
      },
      // resume a little before the block scrolls into view
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} {...props} />;
}
