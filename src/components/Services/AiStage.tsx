"use client";

import { useEffect, useRef, type ReactNode } from "react";

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

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
