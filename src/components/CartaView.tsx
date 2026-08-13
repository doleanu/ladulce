import type { Category } from "@/lib/carta-data";

const TEL = "tel:+34922749219";
const TEL_DISPLAY = "922 74 92 19";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("La Dulce, Av. los Abrigos 2, Los Abrigos, Tenerife");

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  call: string;
  directions: string;
  footnote: string;
  footerAddress: string;
  demoNote: string;
  webBy: string;
  back: string;
  langSwitchLabel: string;
  langSwitchHref: string;
};

export function CartaView({ carta, copy }: { carta: Category[]; copy: Copy }) {
  return (
    <main className="overflow-x-hidden bg-paper">
      {/* ------------------------------------------------ header ---------- */}
      <header className="sticky top-0 z-20 border-b border-crema bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="/" className="font-display text-lg font-bold text-espresso sm:text-xl">
            La Dulce
          </a>
          <div className="flex items-center gap-4">
            <a
              href={copy.langSwitchHref}
              className="text-xs font-bold uppercase tracking-wide text-terracota hover:text-espresso"
            >
              {copy.langSwitchLabel}
            </a>
            <a href="/" className="text-sm font-semibold text-espresso hover:text-terracota">
              {copy.back}
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------ intro ----------- */}
      <section className="border-b border-crema bg-crema py-14 text-center sm:py-20">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest text-terracota">{copy.kicker}</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-espresso sm:text-6xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-lg text-espresso/70">{copy.intro}</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={TEL}
              className="w-full rounded-full bg-terracota px-7 py-3.5 text-center text-sm font-bold text-paper shadow-md transition-colors hover:opacity-90 sm:w-auto"
            >
              {copy.call} · {TEL_DISPLAY}
            </a>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border-2 border-espresso px-7 py-3.5 text-center text-sm font-bold text-espresso transition-colors hover:bg-espresso hover:text-paper sm:w-auto"
            >
              {copy.directions}
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ carta ----------- */}
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <nav className="mb-12 flex flex-wrap justify-center gap-2 text-xs font-bold uppercase tracking-wide text-terracota">
          {carta.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-full border border-terracota/30 px-3.5 py-1.5 hover:bg-terracota hover:text-paper"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        {carta.map((cat) => (
          <section
            key={cat.title}
            id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="mb-16 scroll-mt-20"
          >
            <h2 className="border-b-2 border-terracota pb-2 font-display text-3xl font-bold text-espresso">
              {cat.title}
            </h2>
            <ul className="mt-2 divide-y divide-crema">
              {cat.dishes.map((d) => (
                <li key={d.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-base text-espresso">{d.name}</span>
                  <span className="shrink-0 whitespace-nowrap font-display text-base font-bold text-terracota">
                    {d.price}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-center text-xs text-espresso/45">{copy.footnote}</p>
      </div>

      {/* ------------------------------------------------ footer ---------- */}
      <footer className="border-t border-crema bg-crema py-10 text-center">
        <p className="text-sm text-espresso/70">{copy.footerAddress}</p>
        <a href={TEL} className="mt-1 inline-block text-sm font-bold text-terracota hover:underline">
          {TEL_DISPLAY}
        </a>
        <p className="mt-4 text-[0.65rem] text-espresso/40">
          {copy.demoNote} {copy.webBy}{" "}
          <a
            href="https://mojoweb.es"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-current/50 underline-offset-2"
          >
            MojoWeb
          </a>
        </p>
      </footer>
    </main>
  );
}
