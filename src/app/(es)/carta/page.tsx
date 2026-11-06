import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { FULL_ADDRESS } from "@/content/site";
import { getCarta } from "@/lib/menuData";
import { menuJsonLd, jsonLdScript } from "@/lib/jsonld";

// Refreshed on demand when Manu saves in /admin/menu; this is only the daily safety net (keeps Blob reads minimal).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Carta y menú de desayunos y brunch en Los Abrigos",
  description:
    "Carta completa de La Dulce: brunch, desayunos, hamburguesas, ensaladas, café, vino y cócteles. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
  openGraph: { url: "/carta" },
};

export default async function CartaPage() {
  const carta = await getCarta("es");
  const jsonLd = jsonLdScript(menuJsonLd("Carta de La Dulce", "es", carta));

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CartaView
        carta={carta}
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
          locale: "es",
          esHref: "/carta",
          enHref: "/en/carta",
          deHref: "/de/carta",
          frHref: "/fr/carta",
        }}
      />
    </>
  );
}
