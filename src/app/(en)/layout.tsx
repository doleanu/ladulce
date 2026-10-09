import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";
import ChatWidget from "@/components/ChatWidget";
import { metadataBase } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "La Dulce — Breakfast, Brunch & Café in Los Abrigos, Tenerife",
    template: "%s · La Dulce",
  },
  description:
    "Breakfast, brunch and café in Los Abrigos, south Tenerife. Barraquito, pancakes, Eggs Benedict and smash burger on the terrace. Open Tuesday to Sunday until 22:30. Tel. 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch in Los Abrigos",
    description:
      "Barraquito, brunch and terrace in Los Abrigos, Tenerife. Open Tuesday to Sunday until 22:30.",
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
