import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_FR } from "@/content/home";
import { restaurantJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";
import { getMenuData, withLiveFeaturedPrices } from "@/lib/menuData";

// Featured-dish prices follow the carta (edited in /admin/menu); refreshed on demand when Manu saves.
export const revalidate = 86400;

export const metadata: Metadata = {
  alternates: {
    canonical: "/fr",
    languages: { es: "/", en: "/en", de: "/de", fr: "/fr", "x-default": "/" },
  },
  openGraph: { url: "/fr" },
};

export default async function HomePageFr() {
  const { data } = await getMenuData();
  const copy = withLiveFeaturedPrices(HOME_FR, data, "fr");
  const ld = jsonLdScript(restaurantJsonLd(), faqJsonLd(copy.faq.items));
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <HomeView copy={copy} />
    </>
  );
}
