"use client";

import { useEffect, useState } from "react";
import { common, header, nav, site } from "@/content/site";
import { pad2, telHref } from "@/lib/format";
import { getLenis } from "@/lib/smooth-scroll";
import { LeadButton } from "../LeadButton";
import { Logo } from "../Logo";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Кнопка в хедері стає акцентною, коли другий блок доходить до середини екрана
    const second = document.getElementById("catalog");
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPastHero(second ? second.getBoundingClientRect().top <= window.innerHeight / 2 : true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    // Поки відкрите меню, сторінка під ним не прокручується
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Прокрутку повертаємо і при закритті меню, і якщо хедер зникне з відкритим меню
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  // Lenis для переходу за якорем вмикає SmoothScroll, тут лише закриваємо меню
  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label={header.navLabel}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LeadButton size="sm" className={`${styles.cta} ${pastHero ? "" : styles.ctaQuiet}`}>
            {header.cta}
          </LeadButton>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.menuClose : header.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        hidden={!open}
        data-lenis-prevent
      >
        <nav aria-label={header.mobileNavLabel} className="container">
          <ul>
            {[...nav, header.mobileExtra].map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  <span className={styles.menuIndex}>{pad2(i + 1)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot}>
            <a href={telHref(site.phone)} className="h3">
              {site.phone}
            </a>
            <p className="caps muted">{site.hotlineHours}</p>
            <LeadButton onClick={closeMenu}>{common.cta}</LeadButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
