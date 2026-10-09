"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { cities, common, leadForm as t, leadTopics, stores, type LeadTopic } from "@/content/site";
import {
  contactMethods,
  LEAD_PREFILL_EVENT,
  validateLead,
  type ContactMethod,
  type LeadErrors,
  type LeadPrefill,
} from "@/lib/lead";
import { ArrowRight, Check } from "../icons";
import styles from "./LeadForm.module.css";

type Status = "idle" | "sending" | "success" | "error";

/** Маска +380 XX XXX XX XX */
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0")) d = "38" + d;
  if (d && !d.startsWith("380")) d = "380" + d.replace(/^3?8?0?/, "");
  d = d.slice(0, 12);
  if (!d) return "";
  const parts = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean);
  return "+" + parts.join(" ");
}

export function LeadForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [store, setStore] = useState("");
  const [topic, setTopic] = useState<LeadTopic>(leadTopics[0]);
  const [contactMethod, setContactMethod] = useState<ContactMethod>(contactMethods[0]);
  const [interest, setInterest] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { topic, interest } = (e as CustomEvent<LeadPrefill>).detail ?? {};
      if (topic) setTopic(topic);
      if (interest) setInterest(interest);
      setStatus((s) => (s === "success" ? "idle" : s));
    };
    window.addEventListener(LEAD_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(LEAD_PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateLead({ name, phone, consent });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, store, topic, contactMethod, interest, comment, consent, company }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      // Подія конверсії для GA4 / GTM, якщо їх підключено
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "generate_lead", lead_topic: topic });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Check size={28} />
        </span>
        <h3 className="h2">{t.success.title(name.trim().split(" ")[0])}</h3>
        <p className="lead">{t.success.text(contactMethod)}</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setStatus("idle");
            setComment("");
            setInterest("");
          }}
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-note`}>
      <div className={styles.row}>
        <Field id={`${uid}-name`} label={t.name.label} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            placeholder={t.name.placeholder}
          />
        </Field>
        <Field id={`${uid}-phone`} label={t.phone.label} error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            placeholder={t.phone.placeholder}
          />
        </Field>
      </div>

      <fieldset className={styles.group}>
        <legend className="caps">{t.topicLegend}</legend>
        <div className={styles.chips}>
          {leadTopics.map((item) => (
            <label key={item} className={styles.chip}>
              <input type="radio" name="topic" value={item} checked={topic === item} onChange={() => setTopic(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {interest && (
        <p className={styles.interest}>
          <span className="caps">{t.interestLabel}</span>
          <span>{interest}</span>
          <button type="button" onClick={() => setInterest("")} aria-label={t.interestRemove(interest)}>
            ×
          </button>
        </p>
      )}

      <div className={styles.row}>
        <Field id={`${uid}-store`} label={t.store.label}>
          <select id={`${uid}-store`} name="store" value={store} onChange={(e) => setStore(e.target.value)}>
            <option value="">{t.store.any}</option>
            {cities.map((c) => (
              <optgroup key={c} label={c}>
                {stores
                  .filter((s) => s.city === c)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.city}, {s.address}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </Field>

        <fieldset className={styles.group}>
          <legend className="caps">{t.contactLegend}</legend>
          <div className={styles.chips}>
            {contactMethods.map((m) => (
              <label key={m} className={styles.chip}>
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  checked={contactMethod === m}
                  onChange={() => setContactMethod(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <Field id={`${uid}-comment`} label={t.comment.label}>
        <textarea
          id={`${uid}-comment`}
          name="comment"
          rows={3}
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.comment.placeholder}
        />
      </Field>

      {/* Пастка для ботів */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          {t.honeypot}
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      <label className={styles.consent}>
        <input
          id={`${uid}-consent`}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
        />
        <span>
          {t.consent.text}{" "}
          <a href="/privacy" className={styles.underline}>
            {t.consent.link}
          </a>
        </span>
      </label>
      {errors.consent && (
        <p id={`${uid}-consent-err`} className={styles.error}>
          {errors.consent}
        </p>
      )}

      <div className={styles.submit}>
        <button type="submit" className="btn btn--accent" disabled={status === "sending"}>
          {status === "sending" ? t.sending : common.cta}
          <ArrowRight />
        </button>
        <p id={`${uid}-note`} className={styles.note}>
          {t.note}
        </p>
      </div>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {t.error}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className="caps">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
