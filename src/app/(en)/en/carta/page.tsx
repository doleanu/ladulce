import type { Metadata } from "next";
import { CartaView } from "@/components/CartaView";
import { FULL_ADDRESS } from "@/content/site";
import { getCarta } from "@/lib/menuData";
import { menuJsonLd, jsonLdScript } from "@/lib/jsonld";

// Refreshed on demand when Manu saves in /admin/menu; this is only the daily safety net (keeps Blob reads minimal).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Breakfast & Brunch Menu in Los Abrigos",
  description:
    "Full menu at La Dulce: brunch, breakfast, burgers, salads, coffee, wine and cocktails. Los Abrigos, Tenerife.",
  alternates: {
    canonical: "/en/carta",
    languages: { es: "/carta", en: "/en/carta", de: "/de/carta", fr: "/fr/carta", "x-default": "/carta" },
  },
  openGraph: { url: "/en/carta" },
};

export default async function CartaPageEn() {
  const carta = await getCarta("en");
  const jsonLd = jsonLdScript(menuJsonLd("La Dulce Menu", "en", carta));

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <CartaView
        carta={carta}
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
          deHref: "/de/carta",
          frHref: "/fr/carta",
        }}
      />
    </>
  );
}
