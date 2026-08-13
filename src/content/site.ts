/* ---------------------------------------------------------------------------
   Single source of truth for La Dulce's business data (NAP, hours, ratings,
   socials). Used by the homepage, the carta, structured data (JSON-LD), legal
   pages and the sitemap. Update here and it propagates everywhere.
   --------------------------------------------------------------------------- */

export const SITE = {
  name: "La Dulce",
  url: "https://ladulcelosabrigos.es",

  // Contact
  phoneDisplay: "922 74 92 19",
  tel: "+34922749219",
  whatsapp: "34615029941", // móvil 615 02 99 41 con prefijo +34 para wa.me
  whatsappDisplay: "615 02 99 41",
  email: "ladulcelosabrigos@gmail.com",

  // Address
  street: "Av. los Abrigos, 2",
  city: "Los Abrigos",
  region: "Santa Cruz de Tenerife",
  postalCode: "38618",
  countryCode: "ES",
  geo: { lat: 28.0295188, lng: -16.5937985 }, // from Google Business Profile
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("La Dulce, Av. los Abrigos 2, Los Abrigos, Tenerife"),

  // Hours — open Tuesday to Sunday 08:30–22:30, CLOSED Mondays (owner-confirmed).
  openTime: "08:30",
  closeTime: "22:30",
  openDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

  // Reputation (Google, read from the Business Profile)
  rating: { value: 4.4, count: 757 },
  priceRange: "€€", // ~10–20 € per person

  // Social profiles (for schema sameAs + footer)
  instagram: "https://www.instagram.com/ladulcelosabrigos",
  facebook: "https://www.facebook.com/profile.php?id=100090019876713",
} as const;

export const FULL_ADDRESS = `${SITE.street}, ${SITE.postalCode} ${SITE.city}, ${SITE.region}`;

/**
 * Base URL for metadata (canonical, OG image, hreflang). On non-production
 * Vercel deployments (preview branches) it points at the deployment's own URL,
 * so shared links render correct OG previews before the real domain is live.
 * Production and local dev use the real domain.
 */
export function metadataBase(): URL {
  const { VERCEL_ENV, VERCEL_URL } = process.env;
  if (VERCEL_ENV && VERCEL_ENV !== "production" && VERCEL_URL) {
    return new URL(`https://${VERCEL_URL}`);
  }
  return new URL(SITE.url);
}
