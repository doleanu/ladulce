import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/en/privacidad", languages: { es: "/privacidad", en: "/en/privacidad" } },
};

export default function Page() {
  return <LegalView doc={LEGAL.en.privacidad} locale="en" />;
}
