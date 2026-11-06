import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { FULL_ADDRESS } from "@/content/site";
import { getCarta } from "@/lib/menuData";
import { menuJsonLd, jsonLdScript } from "@/lib/jsonld";

// Refreshed on demand when Manu saves in /admin/menu; this is only the daily safety net (keeps Blob reads minimal).
export const revalidate = 86400;

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
  const carta = await getCarta("de");
  const jsonLd = jsonLdScript(menuJsonLd("La Dulce Speisekarte", "de", carta));

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
