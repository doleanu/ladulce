import { SITE } from "@/content/site";
import type { Category, CanonicalPrice } from "./carta-data";

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE.url}/#restaurant`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og.jpg`,
    logo: `${SITE.url}/logo/ladulce-logo.png`,
    servesCuisine: ["Brunch", "Café", "Canaria", "Desayunos", "Hamburguesas"],
    priceRange: SITE.priceRange,
    telephone: SITE.tel,
    email: SITE.email,
    menu: `${SITE.url}/carta`,
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      postalCode: SITE.postalCode,
      addressRegion: SITE.region,
      addressCountry: SITE.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.openDays,
        opens: SITE.openTime,
        closes: SITE.closeTime,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
    },
    sameAs: [SITE.instagram, SITE.facebook],
  };
}

/**
 * Full Menu/MenuSection/MenuItem structured data, with a schema.org Offer
 * (numeric price in EUR) on each item that has exactly one canonical price.
 * Dishes with a range ("5,50 € / 6,00 €") or free text ("Consultar") are
 * listed without an offer — schema.org expects one clean price per Offer.
 */
export function menuJsonLd(name: string, locale: string, carta: Category[], prices: Record<string, CanonicalPrice[]>) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name,
    inLanguage: locale,
    hasMenuSection: carta.map((cat) => {
      const catPrices = prices[cat.id];
      return {
        "@type": "MenuSection",
        name: cat.title,
        hasMenuItem: cat.dishes.map((d, i) => {
          const cp = catPrices?.[i];
          const offers =
            cp && cp.freeText === null && cp.amounts.length === 1
              ? { "@type": "Offer", price: cp.amounts[0].toFixed(2), priceCurrency: "EUR" }
              : undefined;
          return {
            "@type": "MenuItem",
            name: d.name,
            ...(d.note ? { description: d.note } : {}),
            ...(offers ? { offers } : {}),
          };
        }),
      };
    }),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Inline <script type="application/ld+json"> string content for one or more schema objects. */
export function jsonLdScript(...objects: unknown[]): string {
  return JSON.stringify(objects.length === 1 ? objects[0] : objects);
}
