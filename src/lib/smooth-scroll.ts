import type Lenis from "lenis";

/** Єдиний екземпляр Lenis на сторінку — щоб інші компоненти могли його зупиняти */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
