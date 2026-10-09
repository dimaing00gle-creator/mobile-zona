import type Lenis from "lenis";

/** Single Lenis instance per page, so other components can pause it */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
