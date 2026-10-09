import type { ImageLoaderProps } from "next/image";

/** Unsplash images are resized by their CDN (imgix): requested width, AVIF/WebP when the browser supports it */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
