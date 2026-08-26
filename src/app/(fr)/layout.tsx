import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";
import ChatWidget from "@/components/ChatWidget";
import { metadataBase } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "La Dulce — Café & Brunch à Los Abrigos, Tenerife",
    template: "%s · La Dulce",
  },
  description:
    "Café, brunch et terrasse à Los Abrigos, Tenerife. Barraquito canarien, pancakes, Eggs Benedict, smash burger et cheesecake. Ouvert du mardi au dimanche jusqu'à 22h30. Appelez le 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch à Los Abrigos",
    description:
      "Barraquito, brunch et terrasse à Los Abrigos, Tenerife. Ouvert du mardi au dimanche jusqu'à 22h30.",
    locale: "fr_FR",
    type: "website",
    siteName: "La Dulce",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f6f3ed" };

export default function RootLayoutFr({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        <ChatWidget locale="fr" />
      </body>
    </html>
  );
}
