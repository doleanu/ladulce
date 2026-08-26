import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_FR } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";

export const metadata: Metadata = {
  title: "Carte",
  description:
    "La carte complète de La Dulce : brunch, petit-déjeuner, burgers, salades, café, vin et cocktails. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/fr/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
};

export default function CartaPageFr() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "La Dulce Carte",
    inLanguage: "fr",
    hasMenuSection: CARTA_FR.map((cat) => ({
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
        carta={CARTA_FR}
        copy={{
          homeHref: "/fr",
          coverWord: "CARTE",
          coverLang: "Français",
          kicker: "Carte digitale",
          title: "Notre carte",
          intro: "Brunch, café de spécialité et cocktails à Los Abrigos.",
          food: "Cuisine",
          drinks: "Boissons",
          call: "Appeler",
          directions: "Itinéraire",
          footnote: "Les prix peuvent varier. Consultez la carte sur place pour la version définitive.",
          footerAddress: FULL_ADDRESS,
          demoNote: "",
          webBy: "Site web par",
          back: "← Retour à l'accueil",
          locale: "fr",
          esHref: "/carta",
          enHref: "/en/carta",
          deHref: "/de/carta",
          frHref: "/fr/carta",
        }}
      />
    </>
  );
}
