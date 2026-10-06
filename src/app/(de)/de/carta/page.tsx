import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_DE, withCanonicalPrices } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";
import { getMenuPrices } from "@/lib/menuPrices";
import { menuJsonLd, jsonLdScript } from "@/lib/jsonld";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Speisekarte: Frühstück & Brunch in Los Abrigos",
  description:
    "Die komplette Speisekarte von La Dulce: Brunch, Frühstück, Burger, Salate, Kaffee, Wein und Cocktails. Los Abrigos, Teneriffa.",
  alternates: {
    canonical: "/de/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
  openGraph: { url: "/de/carta" },
};

export default async function CartaPageDe() {
  const menuPrices = await getMenuPrices();
  const carta = withCanonicalPrices(CARTA_DE, "de", menuPrices);
  const jsonLd = jsonLdScript(menuJsonLd("La Dulce Speisekarte", "de", carta, menuPrices));

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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
