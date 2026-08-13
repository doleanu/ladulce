import type { Locale } from "@/content/home";
import type { LegalDoc } from "@/content/legal";

export function LegalView({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const home = locale === "en" ? "/en" : "/";
  const langHref = locale === "en" ? `/${doc.slug}` : `/en/${doc.slug}`;
  const langLabel = locale === "en" ? "Español" : "English";
  const back = locale === "en" ? "← Back home" : "← Volver al inicio";

  return (
    <main className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-crema bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 sm:px-8">
          <a href={home} className="font-display text-lg font-bold text-espresso sm:text-xl">
            La Dulce
          </a>
          <div className="flex items-center gap-4">
            <a href={langHref} className="text-xs font-bold uppercase tracking-wide text-terracota hover:text-espresso">
              {langLabel}
            </a>
            <a href={home} className="text-sm font-semibold text-espresso hover:text-terracota">
              {back}
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">{doc.title}</h1>
        <p className="mt-2 text-sm text-espresso/50">{doc.updated}</p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((s, i) => (
            <section key={i}>
              {s.h && <h2 className="font-display text-xl font-bold text-espresso">{s.h}</h2>}
              <div className="mt-2 space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-espresso/75">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <footer className="border-t border-crema bg-crema py-8 text-center">
        <a href={home} className="text-sm font-semibold text-terracota hover:underline">{back}</a>
      </footer>
    </main>
  );
}
