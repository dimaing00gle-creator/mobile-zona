"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

// Photo block wrapper: starts the AI animation once, when the block enters the viewport.
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
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
