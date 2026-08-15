import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_EN } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full menu at La Dulce: brunch, breakfast, burgers, salads, coffee, wine and cocktails. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/en/carta",
    languages: { es: "/carta", en: "/en/carta", "x-default": "/carta" },
  },
};

export default function CartaPageEn() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "La Dulce Menu",
    inLanguage: "en",
    hasMenuSection: CARTA_EN.map((cat) => ({
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
        carta={CARTA_EN}
        copy={{
          homeHref: "/en",
          coverWord: "MENU",
          coverLang: "English",
          kicker: "Digital menu",
          title: "Our menu",
          intro: "Brunch, specialty coffee and cocktails in Los Abrigos.",
          food: "Food",
          drinks: "Drinks",
          call: "Call",
          directions: "Get directions",
          footnote: "Prices may vary. Please check the in-house menu for the definitive version.",
          footerAddress: FULL_ADDRESS,
          demoNote: "",
          webBy: "Website by",
          back: "← Back home",
          locale: "en",
          esHref: "/carta",
          enHref: "/en/carta",
        }}
      />
    </>
  );
}
