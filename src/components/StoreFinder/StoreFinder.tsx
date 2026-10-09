"use client";

import { useState } from "react";
import { cities, storeFinder, stores } from "@/content/site";
import { telHref } from "@/lib/format";
import { LeadButton } from "../LeadButton";
import { SectionHead } from "../SectionHead";
import { ArrowUpRight } from "../icons";
import styles from "./StoreFinder.module.css";

const query = (s: (typeof stores)[number]) => encodeURIComponent(`${s.address}, ${s.city}, ${storeFinder.country}`);

export function StoreFinder() {
  const [city, setCity] = useState<string>(cities[0]);
  const [activeId, setActiveId] = useState(stores[0].id);
  const visible = stores.filter((s) => s.city === city);
  const active = stores.find((s) => s.id === activeId) ?? visible[0];

  return (
    <section id="stores" className="section" aria-labelledby="stores-title">
      <div className="container">
        <SectionHead id="stores-title" title={storeFinder.title} />

        <div className={styles.tabs} role="group" aria-label={storeFinder.citiesLabel}>
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === city}
              className={styles.tab}
              onClick={() => {
                setCity(c);
                setActiveId(stores.find((s) => s.city === c)!.id);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          <ul className={styles.list}>
            {visible.map((s) => (
              <li key={s.id}>
                <article className={`${styles.store} ${s.id === active.id ? styles.active : ""}`}>
                  <button
                    type="button"
                    className={styles.select}
                    aria-pressed={s.id === active.id}
                    onClick={() => setActiveId(s.id)}
                  >
                    <h3 className="h3">{s.address}</h3>
                    <span className="muted">
                      {s.city} · {s.hours}
                    </span>
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
            <li className={styles.note}>
              <p className="muted">{storeFinder.reserveText}</p>
              <LeadButton
                variant="link"
                topic={storeFinder.reserveTopic}
                interest={storeFinder.reserveInterest(active.address)}
              >
                {storeFinder.reserveCta}
              </LeadButton>
            </li>
          </ul>

          <div className={styles.map}>
            <iframe
              key={active.id}
              title={storeFinder.mapTitle(active.name, active.address)}
              src={`https://www.google.com/maps?q=${query(active)}&z=16&hl=uk&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
