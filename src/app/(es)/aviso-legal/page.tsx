import type { Metadata } from "next";
import { LegalView } from "@/components/LegalView";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal", languages: { es: "/aviso-legal", en: "/en/aviso-legal" } },
};

export default function Page() {
  return <LegalView doc={LEGAL.es["aviso-legal"]} locale="es" />;
}
