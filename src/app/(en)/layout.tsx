import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";
import ChatWidget from "@/components/ChatWidget";
import { metadataBase } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "La Dulce — Café & Brunch in Los Abrigos, Tenerife",
    template: "%s · La Dulce",
  },
  description:
    "Café, brunch and terrace in Los Abrigos. Canarian barraquito, pancakes, Eggs Benedict, smash burger and cheesecake. Open every day until 22:30. Call 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch in Los Abrigos",
    description:
      "Barraquito, brunch and terrace in Los Abrigos, Tenerife. Open every day until 22:30.",
    locale: "en_GB",
    type: "website",
    siteName: "La Dulce",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f6f3ed" };

export default function RootLayoutEn({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        <ChatWidget locale="en" />
      </body>
    </html>
  );
}
