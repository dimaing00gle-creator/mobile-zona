import { site, stores } from "@/content/site";
import { compactPhone } from "@/lib/format";

const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Структуровані дані schema.org для пошукових систем */
export function JsonLd() {
  const orgId = `${site.url}/#organization`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        email: site.email,
        foundingDate: String(site.foundedYear),
        sameAs: site.socials.map((s) => s.href),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: compactPhone(site.phone),
          contactType: "customer service",
          areaServed: "UA",
          availableLanguage: ["uk"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "uk-UA",
        publisher: { "@id": orgId },
      },
      ...stores.map((s) => ({
        "@type": "ElectronicsStore",
        "@id": `${site.url}/#store-${s.id}`,
        name: s.name,
        url: `${site.url}/#stores`,
        image: `${site.url}/opengraph-image`,
        telephone: compactPhone(s.phone),
        priceRange: "₴₴",
        parentOrganization: { "@id": orgId },
        address: {
          "@type": "PostalAddress",
          streetAddress: s.address,
          addressLocality: s.city,
          addressRegion: s.region,
          postalCode: s.postalCode,
          addressCountry: "UA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayList,
          opens: s.opens,
          closes: s.closes,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.city}`)}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Дані формуються на сервері з власного контенту, без введення користувача
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
