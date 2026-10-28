"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { common, header, nav, site } from "@/content/site";
import { pad2, telHref } from "@/lib/format";
import { getLenis } from "@/lib/smooth-scroll";
import { CallPicker } from "../CallPicker";
import { LeadButton } from "../LeadButton";
import { Logo } from "../Logo";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // The header button turns accent once the second block reaches mid-screen
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
    // While the menu is open, the page underneath doesn't scroll.
    // Lock on html, not body: overflow on body would break the sticky header
    const root = document.documentElement;
    root.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Restore scrolling when the menu closes or the header unmounts with the menu open
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  // SmoothScroll restarts Lenis for anchor jumps; here we only close the menu
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
          <LeadButton size="sm" arrow className={`${styles.cta} ${pastHero ? "" : styles.ctaQuiet}`}>
            {header.cta}
          </LeadButton>
          {/* Narrow phones: the CTA above is hidden, so a call icon stays within reach */}
          <CallPicker variant="icon" className={styles.call} />
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
            {nav.map((item, i) => (
              // --i staggers the items as the menu opens
              <li key={item.href} style={{ "--i": i } as CSSProperties}>
                <a href={item.href} onClick={closeMenu}>
                  <span className={styles.menuIndex}>{pad2(i + 1)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot} style={{ "--i": nav.length } as CSSProperties}>
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
