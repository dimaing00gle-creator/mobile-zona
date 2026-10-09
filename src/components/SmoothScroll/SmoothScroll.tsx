"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Плавна інерційна прокрутка на десктопі.
 * На сенсорних екранах лишається рідна прокрутка (syncTouch вимкнено),
 * а при «зменшити рух» Lenis сам вимикає згладжування.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    setLenis(lenis);

    // Якорі обробляємо самі: скасовуємо рідний стрибок браузера, інакше він
    // конфліктує з анімацією. Відступ під шапку Lenis бере з scroll-padding-top.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      // skip-link лишаємо рідним, щоб фокус переходив до змісту
      if (!link || link.classList.contains("skip-link")) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#" || hash === "#top" ? 0 : document.getElementById(hash.slice(1));
      if (target === null) return;
      e.preventDefault();
      // Якщо Lenis на паузі (відкрите мобільне меню), вмикаємо його до прокрутки:
      // start() скидає стан і зупинив би вже запущену анімацію
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
