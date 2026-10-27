import type Lenis from "lenis";

/** Single Lenis instance per page, so other components can pause it */
let instance: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
  listeners.forEach((fn) => fn(lenis));
};

export const getLenis = () => instance;

/** Calls fn with the current Lenis instance now and whenever it changes; returns an unsubscribe */
export const onLenisChange = (fn: (lenis: Lenis | null) => void) => {
  listeners.add(fn);
  fn(instance);
  return () => {
    listeners.delete(fn);
  };
};

/**
 * Desktop Safari on macOS. There CSS position: sticky lags a frame behind Lenis'
 * JS-driven scroll and sticky elements jitter during trackpad scrolling.
 * iPad reports "Macintosh" too, hence the touch-points check.
 */
export const isDesktopSafari = () => {
  const ua = navigator.userAgent;
  return (
    /Macintosh/.test(ua) &&
    /Safari\//.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(ua) &&
    navigator.maxTouchPoints < 2
  );
};

/** Pause page scrolling (e.g. under a modal); falls back to overflow when Lenis is off */
export const stopScroll = () => {
  if (instance) instance.stop();
  else document.documentElement.style.overflow = "hidden";
};

export const startScroll = () => {
  if (instance) instance.start();
  else document.documentElement.style.overflow = "";
};
