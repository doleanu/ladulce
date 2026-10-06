import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_DE } from "@/content/home";
import { restaurantJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/de",
    languages: { es: "/", en: "/en", de: "/de", fr: "/fr", "x-default": "/" },
  },
  openGraph: { url: "/de" },
};

export default function HomePageDe() {
  const ld = jsonLdScript(restaurantJsonLd(), faqJsonLd(HOME_DE.faq.items));
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <HomeView copy={HOME_DE} />
    </>
  );
}
