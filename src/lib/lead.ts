import { leadTopics, type LeadTopic } from "@/content/site";

export type Lead = {
  name: string;
  phone: string;
  comment: string;
  /** Context from the CTA the visitor clicked; not shown as form fields */
  topic?: LeadTopic;
  interest?: string;
  /** Honeypot: real users never see this field */
  company?: string;
};

export type LeadErrors = Partial<Record<"name" | "phone", string>>;

/** Normalizes a number to +380XXXXXXXXX or returns null */
export function normalizeUaPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  return null;
}

export function validateLead(lead: Pick<Lead, "name" | "phone">): LeadErrors {
  const errors: LeadErrors = {};
  if (lead.name.trim().length < 2) errors.name = "Вкажіть, як до вас звертатися";
  if (!normalizeUaPhone(lead.phone)) errors.phone = "Вкажіть номер у форматі +380 XX XXX XX XX";
  return errors;
}

export function isLeadTopic(value: unknown): value is LeadTopic {
  return typeof value === "string" && (leadTopics as readonly string[]).includes(value);
}

/** Event for prefilling the form from any button on the page */
export const LEAD_PREFILL_EVENT = "mz:lead-prefill";
export type LeadPrefill = { topic?: LeadTopic; interest?: string };
