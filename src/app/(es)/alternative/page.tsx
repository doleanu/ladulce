import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { HOME_ES } from "@/content/home";

export const metadata: Metadata = {
  title: "Alternativa · colores originales",
  robots: { index: false, follow: false },
  alternates: { canonical: "/alternative" },
};

// Same homepage, same elements — only the colour palette differs (the original
// warm terracotta / cream scheme), applied via the .legacy-theme wrapper.
export default function AlternativeHomePage() {
  return (
    <div className="legacy-theme">
      <HomeView copy={HOME_ES} />
    </div>
  );
}
