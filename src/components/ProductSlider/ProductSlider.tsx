"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { catalog, categories } from "@/content/site";
import { pad2 } from "@/lib/format";
import { SectionHead } from "../SectionHead";
import { ArrowLeft, ArrowRight } from "../icons";
import styles from "./ProductSlider.module.css";

/** Scroll step: card width plus the gap */
function stepOf(track: HTMLElement) {
  const card = track.firstElementChild as HTMLElement | null;
  return card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0") : 0;
}

export function ProductSlider() {
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // Primitives only: React re-renders the slider only when a value actually changes
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Progress changes every frame — write it to a CSS variable, no React render
    barRef.current?.style.setProperty("--progress", String(max > 0 ? el.scrollLeft / max : 0));
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft > max - 4);
    const step = stepOf(el);
    if (step) setCurrent(Math.min(categories.length, Math.round(el.scrollLeft / step) + 1));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * stepOf(el), behavior: "smooth" });
  };

  return (
    <section id="catalog" className="section" aria-labelledby="catalog-title">
      <div className="container">
        <SectionHead id="catalog-title" title={catalog.title} />
      </div>

      <div
        className={styles.viewport}
        role="region"
        aria-roledescription={catalog.roleDescription}
        aria-label={catalog.regionLabel}
      >
        <ul ref={trackRef} className={styles.track} onScroll={update} tabIndex={0}>
          {categories.map((c, i) => (
            <li key={c.id} className={styles.card} aria-label={catalog.slideLabel(i + 1, categories.length, c.title)}>
              <div className={styles.media}>
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 767px) 82vw, (max-width: 1199px) 44vw, 400px"
                  className={styles.img}
                  loading={i < 4 ? "eager" : "lazy"}
                />
                <span className={`caps ${styles.num}`}>{pad2(i + 1)}</span>
              </div>
              <div className={styles.body}>
                <h3 className={`caps ${styles.title}`}>{c.title}</h3>
                <p className={`muted ${styles.caption}`}>{c.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.controls}`}>
        {/* The counter is visual only: cards already have "1 of 9" labels, so no aria-live */}
        <p className={styles.counter}>
          {pad2(current)} <span className="muted">/ {pad2(categories.length)}</span>
        </p>
        <div ref={barRef} className={styles.bar} aria-hidden="true">
          <span />
        </div>
        <div className={styles.arrows}>
          <button type="button" onClick={() => scrollBy(-1)} disabled={atStart} aria-label={catalog.prev}>
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={atEnd} aria-label={catalog.next}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
