"use client";

import { useEffect, useState } from "react";
import { common } from "@/content/site";
import { LeadButton } from "../LeadButton";
import styles from "./MobileCta.module.css";

/** Sticky lead button on mobile: appears after the first screen and hides near the form */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contacts = document.getElementById("contacts");
    let nearForm = false;
    const io = new IntersectionObserver(([entry]) => {
      nearForm = entry.isIntersecting;
      update();
    });
    if (contacts) io.observe(contacts);

    function update() {
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearForm);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    // inert: the hidden button can't be focused or read by screen readers
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} inert={!visible}>
      <LeadButton className={styles.btn}>{common.cta}</LeadButton>
    </div>
  );
}
