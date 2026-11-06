import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { FULL_ADDRESS } from "@/content/site";
import { getCarta } from "@/lib/menuData";
import { menuJsonLd, jsonLdScript } from "@/lib/jsonld";

// Refreshed on demand when Manu saves in /admin/menu; this is only the daily safety net (keeps Blob reads minimal).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Carte petit-déjeuner et brunch à Los Abrigos",
  description:
    "La carte complète de La Dulce : brunch, petit-déjeuner, burgers, salades, café, vin et cocktails. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/fr/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
  openGraph: { url: "/fr/carta" },
};

export default async function CartaPageFr() {
  const carta = await getCarta("fr");
  const jsonLd = jsonLdScript(menuJsonLd("La Dulce Carte", "fr", carta));

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CartaView
        carta={carta}
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
