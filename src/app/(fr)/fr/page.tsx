import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_FR } from "@/content/home";
import { restaurantJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fr",
    languages: { es: "/", en: "/en", de: "/de", fr: "/fr", "x-default": "/" },
  },
  openGraph: { url: "/fr" },
};

export default function HomePageFr() {
  const ld = jsonLdScript(restaurantJsonLd(), faqJsonLd(HOME_FR.faq.items));
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <HomeView copy={HOME_FR} />
    </>
  );
}
