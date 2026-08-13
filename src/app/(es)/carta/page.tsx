import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_ES } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";

export const metadata: Metadata = {
  title: "Carta digital",
  description:
    "Carta completa de La Dulce: brunch, desayunos, hamburguesas, ensaladas, café, vino y cócteles. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/carta",
    languages: { es: "/carta", en: "/en/carta", "x-default": "/carta" },
  },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CartaView
        carta={CARTA_ES}
        copy={{
          homeHref: "/",
          coverWord: "MENÚ",
          coverLang: "Español",
          kicker: "Carta digital",
          title: "La carta",
          intro: "Brunch, café de especialidad y cócteles en Los Abrigos.",
          food: "Comida",
          drinks: "Bebidas",
          call: "Llamar",
          directions: "Cómo llegar",
          footnote: "Los precios pueden variar. Consulta la carta del local para la versión definitiva.",
          footerAddress: FULL_ADDRESS,
          demoNote: "",
          webBy: "Web de",
          back: "← Volver al inicio",
          langSwitchLabel: "English",
          langSwitchHref: "/en/carta",
        }}
      />
    </>
  );
}
