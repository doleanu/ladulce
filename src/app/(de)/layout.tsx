import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";
import ChatWidget from "@/components/ChatWidget";
import { metadataBase } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "La Dulce — Café & Brunch in Los Abrigos, Teneriffa",
    template: "%s · La Dulce",
  },
  description:
    "Café, Brunch und Terrasse in Los Abrigos, Teneriffa. Kanarischer Barraquito, Pancakes, Eggs Benedict, Smash Burger und Cheesecake. Geöffnet Dienstag bis Sonntag bis 22:30 Uhr. Anrufen unter 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch in Los Abrigos",
    description:
      "Barraquito, Brunch und Terrasse in Los Abrigos, Teneriffa. Geöffnet Dienstag bis Sonntag bis 22:30 Uhr.",
    locale: "de_DE",
    type: "website",
    siteName: "La Dulce",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f6f3ed" };

export default function RootLayoutDe({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        <ChatWidget locale="de" />
      </body>
    </html>
  );
}
