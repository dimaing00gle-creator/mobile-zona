"use client";

import type { ReactNode } from "react";
import { LEAD_PREFILL_EVENT, type LeadPrefill } from "@/lib/lead";
import { ArrowRight } from "../icons";

type Props = LeadPrefill & {
  children: ReactNode;
  variant?: "accent" | "ghost" | "link";
  size?: "sm";
  className?: string;
  /** Accessible name when the visible text alone is ambiguous, e.g. repeated card buttons */
  ariaLabel?: string;
  /** Extra action after the click, e.g. closing the mobile menu */
  onClick?: () => void;
  /** Show the trailing arrow; buttons hide it (only the header CTA keeps it), text links show it */
  arrow?: boolean;
};

/** Link to the lead form that also prefills the topic and interest */
export function LeadButton({
  topic,
  interest,
  children,
  variant = "accent",
  size,
  className,
  ariaLabel,
  onClick,
  arrow = variant === "link",
}: Props) {
  const cls =
    variant === "link"
      ? "link-arrow"
      : ["btn", `btn--${variant}`, size && `btn--${size}`].filter(Boolean).join(" ");

  return (
    <a
      href="#request"
      className={[cls, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      onClick={() => {
        if (topic || interest) {
          window.dispatchEvent(new CustomEvent<LeadPrefill>(LEAD_PREFILL_EVENT, { detail: { topic, interest } }));
        }
        onClick?.();
      }}
    >
      {children}
      {arrow && <ArrowRight />}
    </a>
  );
}
