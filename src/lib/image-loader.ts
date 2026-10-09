import type { ImageLoaderProps } from "next/image";

/** Зображення Unsplash ресайзить їхній CDN (imgix): потрібна ширина, AVIF/WebP за підтримки браузера */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
