"use client";

import type { ReactNode } from "react";
import { LEAD_PREFILL_EVENT, type LeadPrefill } from "@/lib/lead";
import { ArrowRight } from "../icons";

type Props = LeadPrefill & {
  children: ReactNode;
  variant?: "accent" | "ghost" | "link";
  size?: "sm";
  className?: string;
  /** Додаткова дія після кліку, наприклад закрити мобільне меню */
  onClick?: () => void;
};

/** Посилання на форму заявки, яке заодно передзаповнює тему та інтерес */
export function LeadButton({ topic, interest, children, variant = "accent", size, className, onClick }: Props) {
  const cls =
    variant === "link"
      ? "link-arrow"
      : ["btn", `btn--${variant}`, size && `btn--${size}`].filter(Boolean).join(" ");

  return (
    <a
      href="#request"
      className={[cls, className].filter(Boolean).join(" ")}
      onClick={() => {
        if (topic || interest) {
          window.dispatchEvent(new CustomEvent<LeadPrefill>(LEAD_PREFILL_EVENT, { detail: { topic, interest } }));
        }
        onClick?.();
      }}
    >
      {children}
      <ArrowRight />
    </a>
  );
}
