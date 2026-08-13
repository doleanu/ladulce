import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";
import ChatWidget from "@/components/ChatWidget";
import { metadataBase } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "La Dulce — Café & Brunch en Los Abrigos, Tenerife",
    template: "%s · La Dulce",
  },
  description:
    "Café, brunch y terraza en Los Abrigos. Barraquito canario, pancakes, Eggs Benedict, smash burger y cheesecake. Abierto todos los días hasta las 22:30. Llama al 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch en Los Abrigos",
    description:
      "Barraquito, brunch y terraza en Los Abrigos, Tenerife. Abierto todos los días hasta las 22:30.",
    locale: "es_ES",
    type: "website",
    siteName: "La Dulce",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f6f3ed" };

export default function RootLayoutEs({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        <ChatWidget locale="es" />
      </body>
    </html>
  );
}
