import type { Metadata } from "next";
import "../globals.css";
import { fraunces, workSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Admin · La Dulce",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
