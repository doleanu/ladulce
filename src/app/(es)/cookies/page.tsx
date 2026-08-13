import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: { canonical: "/cookies", languages: { es: "/cookies", en: "/en/cookies" } },
};

export default function Page() {
  return <LegalView doc={LEGAL.es.cookies} locale="es" />;
}
