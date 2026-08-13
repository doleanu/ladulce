import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie policy",
  alternates: { canonical: "/en/cookies", languages: { es: "/cookies", en: "/en/cookies" } },
};

export default function Page() {
  return <LegalView doc={LEGAL.en.cookies} locale="en" />;
}
