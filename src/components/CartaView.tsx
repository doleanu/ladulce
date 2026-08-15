"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category } from "@/lib/carta-data";
import { CATEGORY_IMAGES, CATEGORY_IMAGE_POS, DRINK_IDS } from "@/lib/carta-data";
import { SITE } from "@/content/site";

const TEL = `tel:${SITE.tel}`;
const TEL_DISPLAY = SITE.phoneDisplay;
const MAPS = SITE.maps;

type Copy = {
  homeHref: string;
  coverWord: string;
  coverLang: string;
  kicker: string;
  title: string;
  intro: string;
  food: string;
  drinks: string;
  call: string;
  directions: string;
  footnote: string;
  footerAddress: string;
  demoNote: string;
  webBy: string;
  back: string;
  locale: "es" | "en";
  esHref: string;
  enHref: string;
};

const DRINK_SET = new Set<string>(DRINK_IDS);

function DishRow({ name, price, note }: { name: string; price: string; note?: string }) {
  return (
    <li className="py-3.5">
      <div className="flex items-baseline gap-2">
        <h3 className="font-medium text-espresso">{name}</h3>
        <span
          aria-hidden="true"
          className="mx-1 min-w-6 flex-1 self-end border-b border-dotted border-espresso/25"
          style={{ marginBottom: "0.35rem" }}
        />
        <span className="shrink-0 whitespace-nowrap font-display font-bold text-terracota">{price}</span>
      </div>
      {note && <p className="mt-0.5 max-w-prose text-sm leading-snug text-espresso/60">{note}</p>}
    </li>
  );
}

// Rotating brand accents so the menu reads colourful, like the printed carta.
const HEADER_ACCENTS = ["var(--terracota)", "var(--azul)", "var(--pistacho-deep)", "var(--ambar)"];

function CategorySection({ cat, index }: { cat: Category; index: number }) {
  const image = CATEGORY_IMAGES[cat.id];
  const accent = HEADER_ACCENTS[index % HEADER_ACCENTS.length];
  return (
    <section id={cat.id} className="mb-14 scroll-mt-24">
      {image ? (
        <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-[3px_5px_0_rgba(59,42,30,0.10)] sm:aspect-[21/9]">
          <Image
            src={image}
            alt={cat.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            style={{ objectPosition: CATEGORY_IMAGE_POS[cat.id] ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <h2 className="absolute bottom-4 left-5 right-5 font-display text-4xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-5xl">
            {cat.title}
          </h2>
        </div>
      ) : (
        <h2
          className="mb-2 border-b-2 pb-2 font-display text-3xl font-bold text-espresso sm:text-4xl"
          style={{ borderColor: accent }}
        >
          <span style={{ color: accent }}>·</span> {cat.title}
        </h2>
      )}

      {cat.note && (
        <p className="mb-2 rounded-2xl bg-crema px-4 py-3 text-sm leading-snug text-espresso/70 shadow-[2px_2px_0_rgba(59,42,30,0.06)]">
          {cat.note}
        </p>
      )}

      <ul className="divide-y divide-crema">
        {cat.dishes.map((d) => (
          <DishRow key={d.name} name={d.name} price={d.price} note={d.note} />
        ))}
      </ul>
    </section>
  );
}

const CHIP_STYLES = [
  "bg-[#f8dde7] text-[#b95780]", // pink
  "bg-[#d9ebf4] text-[#3f86ab]", // blue
  "bg-[#dcf1f1] text-[#3f9599]", // teal
  "bg-[#fbeac6] text-[#a9772a]", // butter
];

function CategoryChips({ cats, hidden }: { cats: Category[]; hidden: boolean }) {
  return (
    <div className={`${hidden ? "hidden" : "flex"} mx-auto max-w-4xl flex-wrap justify-center gap-2 px-4 py-4 sm:px-8`}>
      {cats.map((cat, i) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0_rgba(59,42,30,0.08)] transition-transform hover:-translate-y-0.5 ${CHIP_STYLES[i % CHIP_STYLES.length]}`}
        >
          {cat.title}
        </a>
      ))}
    </div>
  );
}

export function CartaView({ carta, copy }: { carta: Category[]; copy: Copy }) {
  const [tab, setTab] = useState<"food" | "drinks">("food");

  const food = carta.filter((c) => !DRINK_SET.has(c.id));
  const drinks = carta.filter((c) => DRINK_SET.has(c.id));

  const toggleBase = "rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wide transition-colors";

  return (
    <main className="overflow-x-hidden bg-paper">
      {/* ------------------------------------------------ header ---------- */}
      <header className="sticky top-0 z-30 border-b border-crema bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3 sm:px-8">
          <a href={copy.homeHref} className="font-display text-lg font-bold text-espresso sm:text-xl">
            La Dulce
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center rounded-full border border-espresso/15 bg-crema p-0.5 text-xs font-bold">
              <a
                href={copy.esHref}
                aria-label="Cambiar a español"
                className={`rounded-full px-3 py-1 transition-colors ${copy.locale === "es" ? "bg-terracota text-crema" : "text-espresso/55 hover:text-espresso"}`}
              >
                ES
              </a>
              <a
                href={copy.enHref}
                aria-label="Switch to English"
                className={`rounded-full px-3 py-1 transition-colors ${copy.locale === "en" ? "bg-terracota text-crema" : "text-espresso/55 hover:text-espresso"}`}
              >
                EN
              </a>
            </div>
            <a href={copy.homeHref} className="text-sm font-semibold text-espresso hover:text-terracota">
              {copy.back}
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------ cover (printed-menu style) -- */}
      <section className="border-b border-crema bg-white">
        <div className="mx-auto max-w-2xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <div className="flex items-center justify-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/ladulce-badge.jpg" alt="La Dulce" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-xl font-bold tracking-[0.15em] text-espresso">LA DULCE</span>
          </div>

          <h1 className="mt-5 font-display text-[5.5rem] font-black uppercase leading-[0.82] sm:text-[7rem]">
            <span style={{ color: "var(--rosa)" }}>{copy.coverWord.slice(0, Math.ceil(copy.coverWord.length / 2))}</span>
            <span style={{ color: "#5fabae" }}>{copy.coverWord.slice(Math.ceil(copy.coverWord.length / 2))}</span>
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.5em] text-espresso/70">{copy.coverLang}</p>
          <p className="mx-auto mt-5 max-w-md text-espresso/70">{copy.intro}</p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={TEL} className="w-full rounded-full bg-azul px-7 py-3.5 text-center text-sm font-bold text-paper shadow-md transition-transform hover:-translate-y-0.5 sm:w-auto">
              {copy.call} · {TEL_DISPLAY}
            </a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="w-full rounded-full border-2 border-espresso px-7 py-3.5 text-center text-sm font-bold text-espresso transition-colors hover:bg-espresso hover:text-paper sm:w-auto">
              {copy.directions}
            </a>
          </div>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-espresso/60">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-terracota">@ladulcelosabrigos</a>
            <span aria-hidden="true">·</span>
            <a href={TEL} className="hover:text-terracota">{TEL_DISPLAY}</a>
          </p>
        </div>
      </section>

      {/* ------------------------------------- food / drinks toggle (sticky) */}
      <div className="sticky top-[57px] z-20 border-b border-crema bg-paper/95 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl justify-center px-5">
          <div className="inline-flex rounded-full border-2 border-espresso/15 bg-crema p-1">
            <button
              type="button"
              onClick={() => setTab("food")}
              aria-pressed={tab === "food"}
              className={`${toggleBase} ${tab === "food" ? "bg-azul text-paper shadow-sm" : "text-espresso/70 hover:text-espresso"}`}
            >
              {copy.food}
            </button>
            <button
              type="button"
              onClick={() => setTab("drinks")}
              aria-pressed={tab === "drinks"}
              className={`${toggleBase} ${tab === "drinks" ? "bg-azul text-paper shadow-sm" : "text-espresso/70 hover:text-espresso"}`}
            >
              {copy.drinks}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- category chips (wrap) - */}
      <nav className="border-b border-crema bg-paper">
        <CategoryChips cats={food} hidden={tab !== "food"} />
        <CategoryChips cats={drinks} hidden={tab !== "drinks"} />
      </nav>

      {/* ------------------------------------------------ carta ----------- */}
      {/* Both groups are rendered in the DOM (visibility toggled) so the full
          menu — every dish and price — is in the server HTML for SEO/AEO. */}
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <div className={tab === "food" ? "" : "hidden"}>
          {food.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} index={i} />
          ))}
        </div>
        <div className={tab === "drinks" ? "" : "hidden"}>
          {drinks.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} index={i} />
          ))}
        </div>
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
          <a href="https://mojoweb.es" target="_blank" rel="noopener noreferrer" className="underline decoration-current/50 underline-offset-2">
            MojoWeb
          </a>
        </p>
      </footer>
    </main>
  );
}
