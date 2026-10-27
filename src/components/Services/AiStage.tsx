"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { isDesktopSafari, onLenisChange } from "@/lib/smooth-scroll";

type Props = {
  className?: string;
  children: ReactNode;
};

// Photo block wrapper: starts the AI animation once, when the block enters the viewport,
// and pauses its looping pulse while the block is off screen (data-offscreen, see globals.css).
// Without JS the attribute is absent, so text and photo show immediately; the effects live in CSS (desktop only).
export function AiStage({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.fx = "ready";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.fx = "on";
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "";
      },
      { rootMargin: "200px 0px" },
    );
    visibility.observe(el);

    return () => {
      io.disconnect();
      visibility.disconnect();
    };
  }, []);

  // Desktop Safari: CSS sticky lags a frame behind Lenis and the photo jitters.
  // There the stage is pinned with a transform set in the same frame Lenis scrolls.
  useEffect(() => {
    const el = ref.current;
    if (!el || !isDesktopSafari()) return;
    const desktop = matchMedia("(min-width: 1200px)");
    el.dataset.jsSticky = "";
    let shift = 0;

    const update = () => {
      let next = 0;
      if (desktop.matches) {
        const box = el.parentElement!.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        // same offset as the CSS sticky: header + section padding
        const top =
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) +
          parseFloat(getComputedStyle(el.closest("section")!).paddingTop);
        const naturalTop = r.top - shift;
        const room = box.bottom - (r.bottom - shift) - parseFloat(cs.marginBottom);
        next = Math.min(Math.max(top - naturalTop, 0), Math.max(room, 0));
      }
      if (next !== shift) {
        shift = next;
        el.style.transform = shift ? `translate3d(0, ${shift}px, 0)` : "";
      }
    };

    let offLenis: (() => void) | undefined;
    const unsubscribe = onLenisChange((lenis) => {
      offLenis?.();
      offLenis = lenis?.on("scroll", update);
      update();
    });
    // native scroll (Lenis paused, keyboard, scrollbar) and layout changes
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);

    return () => {
      unsubscribe();
      offLenis?.();
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      delete el.dataset.jsSticky;
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
