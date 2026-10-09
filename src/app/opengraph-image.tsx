import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — мережа магазинів смартфонів та аксесуарів`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Завантажує лише потрібні гліфи Onest (з кирилицею) для картинки соцмереж */
async function loadFont(text: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Onest:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("font not found");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const title = "Новий смартфон без сумнівів.";
  const sub = "Мережа магазинів смартфонів та аксесуарів";
  const brand = "MOBILE ZONA";
  const cta = "Отримати консультацію →";

  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 500 }[] = [];
  try {
    fonts = [{ name: "Onest", data: await loadFont(title + sub + brand + cta, 500), weight: 500 }];
  } catch {
    // Без мережі — системний шрифт за замовчуванням
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f1f0ed",
          color: "#1d1d1f",
          fontFamily: "Onest",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, fontWeight: 500 }}>{brand}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, lineHeight: 1, letterSpacing: -3, fontWeight: 500, maxWidth: 900 }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.62 }}>{sub}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#e2f23a",
              borderRadius: 999,
              padding: "18px 32px",
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            {cta}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
