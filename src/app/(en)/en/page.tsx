import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_EN } from "@/content/home";
import { restaurantJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";
import { getMenuData, withLiveFeaturedPrices } from "@/lib/menuData";

// Featured-dish prices follow the carta (edited in /admin/menu); refreshed on demand when Manu saves.
export const revalidate = 86400;

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: { es: "/", en: "/en", de: "/de", fr: "/fr", "x-default": "/" },
  },
  openGraph: { url: "/en" },
};

export default async function HomePageEn() {
  const { data } = await getMenuData();
  const copy = withLiveFeaturedPrices(HOME_EN, data, "en");
  const ld = jsonLdScript(restaurantJsonLd(), faqJsonLd(copy.faq.items));
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <HomeView copy={copy} />
    </>
  );
}
