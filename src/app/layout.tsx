import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ladulce-demo.vercel.app"),
  title: "La Dulce — Café & Brunch en Los Abrigos, Tenerife",
  description:
    "Café, brunch y terraza en Los Abrigos. Barraquito canario, pancakes, Eggs Benedict, smash burger y cheesecake. Abierto todos los días hasta las 21:30. Llama al 922 74 92 19.",
  openGraph: {
    title: "La Dulce — Café & Brunch en Los Abrigos",
    description:
      "Barraquito, brunch y terraza en Los Abrigos, Tenerife. Abierto todos los días hasta las 21:30.",
    locale: "es_ES",
    type: "website",
    siteName: "La Dulce",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf0dd",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
