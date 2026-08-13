import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_EN } from "@/lib/carta-data";

export const metadata: Metadata = {
  title: "Digital menu — La Dulce | Los Abrigos",
  description:
    "Full menu at La Dulce: brunch, breakfast, burgers, salads, coffee, wine and cocktails. Los Abrigos, Tenerife. Real prices.",
  robots: { index: false, follow: false },
  alternates: { languages: { es: "/carta", en: "/carta/en" } },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CartaView
        carta={CARTA_EN}
        copy={{
          kicker: "Digital menu",
          title: "Our menu",
          intro: "Brunch, specialty coffee and cocktails in Los Abrigos. Transcribed from our real menu.",
          call: "Call",
          directions: "Get directions",
          footnote: "Menu transcribed from the real version published on ladulcelosabrigos.es.",
          footerAddress: "Av. los Abrigos, 2, 38618 Los Abrigos, Santa Cruz de Tenerife",
          demoNote: "Demo site — unofficial design proposal. Not affiliated with the business.",
          webBy: "Website by",
          back: "← Back home",
          langSwitchLabel: "Español",
          langSwitchHref: "/carta",
        }}
      />
    </>
  );
}
