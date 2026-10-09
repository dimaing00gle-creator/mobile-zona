import { NextResponse } from "next/server";
import { stores } from "@/content/site";
import { isContactMethod, isLeadTopic, normalizeUaPhone, validateLead } from "@/lib/lead";

// Simple flood protection: at most 5 leads per IP per 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // A bot filled the hidden field — pretend success, send nothing
  if (str(body.company, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const phoneRaw = str(body.phone, 32);
  const consent = body.consent === true;
  const errors = validateLead({ name, phone: phoneRaw, consent });
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  const phone = normalizeUaPhone(phoneRaw)!;
  const topic = isLeadTopic(body.topic) ? body.topic : "Інше";
  const contactMethod = isContactMethod(body.contactMethod) ? body.contactMethod : "Дзвінок";
  const store = stores.find((s) => s.id === body.store);
  const interest = str(body.interest, 200);
  const comment = str(body.comment, 1000);

  const text = [
    "<b>🟢 Нова заявка з сайту</b>",
    "",
    `<b>Ім’я:</b> ${esc(name)}`,
    `<b>Телефон:</b> ${phone}`,
    `<b>Зв’язатися:</b> ${contactMethod}`,
    `<b>Тема:</b> ${esc(topic)}`,
    interest && `<b>Цікавить:</b> ${esc(interest)}`,
    `<b>Магазин:</b> ${store ? esc(`${store.city}, ${store.address}`) : "будь-який"}`,
    comment && `<b>Коментар:</b> ${esc(comment)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] Telegram не налаштовано, заявка:\n" + text);
      return NextResponse.json({ ok: true, mock: true });
    }
    console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не задані");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  }).catch(() => null);

  if (!tg?.ok) {
    console.error("[lead] Telegram error", tg?.status, await tg?.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
