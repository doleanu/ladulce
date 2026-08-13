import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { CARTA_ES } from "@/lib/carta-data";
import { FULL_ADDRESS } from "@/content/site";

export const metadata: Metadata = {
  title: "Carta · colores originales",
  robots: { index: false, follow: false },
  alternates: { canonical: "/alternative/carta" },
};

// Same menu, same elements — original warm palette via the .legacy-theme wrapper.
export default function AlternativeCartaPage() {
  return (
    <div className="legacy-theme">
      <CartaView
        carta={CARTA_ES}
        copy={{
          homeHref: "/alternative",
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
    </div>
  );
}
