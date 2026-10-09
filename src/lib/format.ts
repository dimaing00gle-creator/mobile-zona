/** Phone number without spaces: "+380 67 000 00 00" → "+380670000000" */
export const compactPhone = (phone: string) => phone.replace(/\s/g, "");

/** tel: link for calling */
export const telHref = (phone: string) => `tel:${compactPhone(phone)}`;

/** Ordinal with a leading zero: 1 → "01" */
export const pad2 = (n: number) => String(n).padStart(2, "0");
