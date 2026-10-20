"use client";

import { useEffect, useState } from "react";
import { storeFinder, stores } from "@/content/site";
import { telHref } from "@/lib/format";
import { LeadButton } from "../LeadButton";
import { ArrowUpRight } from "../icons";
import styles from "./StoreFinder.module.css";

const query = (s: (typeof stores)[number]) => encodeURIComponent(`${s.address}, ${s.city}, ${storeFinder.country}`);

export function StoreFinder() {
  const [activeId, setActiveId] = useState(stores[0].id);
  // while a new map loads it stays transparent, then fades in instead of popping
  const [switching, setSwitching] = useState(false);
  const active = stores.find((s) => s.id === activeId) ?? stores[0];

  // fallback: show the map even if the iframe load event never arrives
  useEffect(() => {
    if (!switching) return;
    const t = window.setTimeout(() => setSwitching(false), 1500);
    return () => window.clearTimeout(t);
  }, [switching]);

  const selectStore = (id: string) => {
    if (id === activeId) return;
    setSwitching(true);
    setActiveId(id);
  };

  return (
    <section id="stores" className={`section theme-dark ${styles.section}`} aria-labelledby="stores-title">
      <div className="container">
        {/* Heading kept for SEO and screen readers, hidden visually */}
        <h2 id="stores-title" className="visually-hidden">
          {storeFinder.title}
        </h2>

        <ul className={`reveal-stagger ${styles.list}`}>
          {stores.map((s) => (
            <li key={s.id}>
              <article className={`${styles.store} ${s.id === active.id ? styles.active : ""}`}>
                <button
                  type="button"
                  className={styles.select}
                  aria-pressed={s.id === active.id}
                  onClick={() => selectStore(s.id)}
                >
                  <h3 className="h3">{s.address}</h3>
                  <span className="muted">{[s.city, s.place, s.hours].filter(Boolean).join(" · ")}</span>
                </button>
                <div className={styles.links}>
                  <a href={telHref(s.phone)}>{s.phone}</a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${query(s)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {storeFinder.route}
                    <ArrowUpRight />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={`reveal ${styles.map} ${switching ? styles.switching : ""}`}>
          <iframe
            key={active.id}
            title={storeFinder.mapTitle(active.name, active.address)}
            src={`https://www.google.com/maps?q=${query(active)}&z=16&hl=uk&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setSwitching(false)}
          />
        </div>

        <div className={`reveal ${styles.note}`}>
          <p className="muted">{storeFinder.reserveText}</p>
          <LeadButton
            variant="link"
            topic={storeFinder.reserveTopic}
            interest={storeFinder.reserveInterest(active.address)}
          >
            {storeFinder.reserveCta}
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
