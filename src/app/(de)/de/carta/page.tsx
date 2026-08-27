import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_DE, withCanonicalPrices } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";
import menuPrices from "@/content/menu-prices.json";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Die komplette Speisekarte von La Dulce: Brunch, Frühstück, Burger, Salate, Kaffee, Wein und Cocktails. Los Abrigos, Teneriffa.",
  alternates: {
    canonical: "/de/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
};

export default function CartaPageDe() {
  const carta = withCanonicalPrices(CARTA_DE, "de", menuPrices);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "La Dulce Speisekarte",
    inLanguage: "de",
    hasMenuSection: carta.map((cat) => ({
      "@type": "MenuSection",
      name: cat.title,
      hasMenuItem: cat.dishes.map((d) => ({ "@type": "MenuItem", name: d.name })),
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CartaView
        carta={carta}
        copy={{
          homeHref: "/de",
          coverWord: "MENÜ",
          coverLang: "Deutsch",
          kicker: "Digitale Speisekarte",
          title: "Unsere Speisekarte",
          intro: "Brunch, Kaffeespezialitäten und Cocktails in Los Abrigos.",
          food: "Essen",
          drinks: "Getränke",
          call: "Anrufen",
          directions: "Route planen",
          footnote: "Preise können abweichen. Bitte die Speisekarte vor Ort für die endgültige Version prüfen.",
          footerAddress: FULL_ADDRESS,
          demoNote: "",
          webBy: "Website von",
          back: "← Zurück zur Startseite",
          locale: "de",
          esHref: "/carta",
          enHref: "/en/carta",
          deHref: "/de/carta",
          frHref: "/fr/carta",
        }}
      />
    </>
  );
}
