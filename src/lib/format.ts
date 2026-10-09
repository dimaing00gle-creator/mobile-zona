/** Номер без пробілів: «+380 67 000 00 00» → «+380670000000» */
export const compactPhone = (phone: string) => phone.replace(/\s/g, "");

/** Посилання для дзвінка */
export const telHref = (phone: string) => `tel:${compactPhone(phone)}`;

/** Порядковий номер із нулем попереду: 1 → «01» */
export const pad2 = (n: number) => String(n).padStart(2, "0");
