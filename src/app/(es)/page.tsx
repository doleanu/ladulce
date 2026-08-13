import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_ES } from "@/content/home";
import { restaurantJsonLd, faqJsonLd, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/en", "x-default": "/" },
  },
};

export default function HomePageEs() {
  const ld = jsonLdScript(restaurantJsonLd(), faqJsonLd(HOME_ES.faq.items));
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <HomeView copy={HOME_ES} />
    </>
  );
}
