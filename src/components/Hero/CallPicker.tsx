"use client";

import { useEffect, useId, useRef } from "react";
import { hero, site } from "@/content/site";
import { telHref } from "@/lib/format";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
import styles from "./CallPicker.module.css";

const { call } = hero;

/** "Call" button: opens a modal where the visitor picks the number of their mobile operator */
export function CallPicker() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    // Light dismiss (backdrop click) + Esc; not in React's types yet, so set it directly
    el.setAttribute("closedby", "any");

    // Fallback for browsers without closedby (Safari): close on a click outside the dialog box
    const onClick = (e: MouseEvent) => {
      if ("closedBy" in HTMLDialogElement.prototype || e.target !== el) return;
      const r = el.getBoundingClientRect();
      const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
      if (!inside) el.close();
    };
    // Page scrolling keeps running under a modal otherwise
    const onClose = () => startScroll();

    el.addEventListener("click", onClick);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("close", onClose);
    };
  }, []);

  const open = () => {
    stopScroll();
    dialog.current?.showModal();
  };

  return (
    <>
      <button type="button" className="btn btn--accent" aria-haspopup="dialog" onClick={open}>
        {call.label}
      </button>

      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.head}>
          {/* Not a heading: keeps the page outline as one h1 + section h2s */}
          <p id={titleId} className={styles.title}>
            {call.title}
          </p>
          <button
            type="button"
            className={styles.close}
            aria-label={call.close}
            onClick={() => dialog.current?.close()}
          >
            <span aria-hidden="true" />
          </button>
        </div>
        <p className={styles.note}>
          {call.note} {site.hotlineHours}.
        </p>

        <ul className={styles.list}>
          {call.operators.map((op) => (
            <li key={op.name}>
              <a
                href={telHref(op.phone)}
                className={styles.operator}
                onClick={() =>
                  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
                    event: "click_call",
                    call_operator: op.name,
                  })
                }
              >
                <span className={styles.name}>{op.name}</span>
                <span className={styles.phone}>{op.phone}</span>
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
