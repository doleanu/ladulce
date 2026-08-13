import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Legal notice",
  alternates: { canonical: "/en/aviso-legal", languages: { es: "/aviso-legal", en: "/en/aviso-legal" } },
};

export default function Page() {
  return <LegalView doc={LEGAL.en["aviso-legal"]} locale="en" />;
}
