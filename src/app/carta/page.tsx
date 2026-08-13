import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_ES } from "@/lib/carta-data";

export const metadata: Metadata = {
  title: "Carta digital — La Dulce | Los Abrigos",
  description:
    "Carta completa de La Dulce: brunch, desayunos, hamburguesas, ensaladas, café, vino y cócteles. Los Abrigos, Tenerife. Precios reales.",
  robots: { index: false, follow: false },
  alternates: { languages: { es: "/carta", en: "/carta/en" } },
};

export default function CartaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Carta de La Dulce",
    inLanguage: "es",
    hasMenuSection: CARTA_ES.map((cat) => ({
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
        carta={CARTA_ES}
        copy={{
          kicker: "Carta digital",
          title: "La carta",
          intro: "Brunch, café de especialidad y cócteles en Los Abrigos. Traducida de nuestra carta real.",
          call: "Llamar",
          directions: "Cómo llegar",
          footnote: "Carta traducida de la versión real publicada en ladulcelosabrigos.es.",
          footerAddress: "Av. los Abrigos, 2, 38618 Los Abrigos, Santa Cruz de Tenerife",
          demoNote:
            "Sitio de demostración — propuesta de diseño no oficial. No afiliado al establecimiento.",
          webBy: "Web de",
          back: "← Volver al inicio",
          langSwitchLabel: "English",
          langSwitchHref: "/carta/en",
        }}
      />
    </>
  );
}
