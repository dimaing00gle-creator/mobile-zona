import { leadTopics, type LeadTopic } from "@/content/site";

export const contactMethods = ["Дзвінок", "Telegram", "Viber"] as const;
export type ContactMethod = (typeof contactMethods)[number];

export type Lead = {
  name: string;
  phone: string;
  store: string;
  topic: LeadTopic;
  contactMethod: ContactMethod;
  comment: string;
  consent: boolean;
  /** Пастка для ботів: справжні користувачі це поле не бачать */
  company?: string;
};

export type LeadErrors = Partial<Record<"name" | "phone" | "consent", string>>;

/** Приводить номер до формату +380XXXXXXXXX або повертає null */
export function normalizeUaPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  return null;
}

export function validateLead(lead: Pick<Lead, "name" | "phone" | "consent">): LeadErrors {
  const errors: LeadErrors = {};
  if (lead.name.trim().length < 2) errors.name = "Вкажіть, як до вас звертатися";
  if (!normalizeUaPhone(lead.phone)) errors.phone = "Вкажіть номер у форматі +380 XX XXX XX XX";
  if (!lead.consent) errors.consent = "Потрібна згода на обробку даних";
  return errors;
}

export function isLeadTopic(value: unknown): value is LeadTopic {
  return typeof value === "string" && (leadTopics as readonly string[]).includes(value);
}

export function isContactMethod(value: unknown): value is ContactMethod {
  return typeof value === "string" && (contactMethods as readonly string[]).includes(value);
}

/** Подія для попереднього заповнення форми з будь-якої кнопки на сторінці */
export const LEAD_PREFILL_EVENT = "mz:lead-prefill";
export type LeadPrefill = { topic?: LeadTopic; interest?: string };
