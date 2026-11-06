import type { Category } from "./carta-data";
import { CARTA_ES, CARTA_EN, CARTA_DE, CARTA_FR } from "./carta-data";
import { formatPrice, pick, singleAmount, type PriceListData } from "./pricelist/model";
import { cfg, pl } from "./pricelist/instance";

/* ---------------------------------------------------------------------------
   The live carta. The data layer (storage, versioning, validation, seed from
   carta-data.ts) is the shared admin-kit in ./pricelist; this file only turns the
   price-list document into what La Dulce's pages render.
   --------------------------------------------------------------------------- */

type Lang = "es" | "en" | "de" | "fr";
const CODE: Record<Lang, Category[]> = { es: CARTA_ES, en: CARTA_EN, de: CARTA_DE, fr: CARTA_FR };

export async function getMenuData(): Promise<{ data: PriceListData }> {
  const { data } = await pl.getData();
  return { data };
}

/** The carta as the public pages render it, for one language. Hidden dishes are left out. */
export function renderCarta(data: PriceListData, lang: Lang): Category[] {
  const byId = new Map(data.categories.map((c) => [c.id, c]));
  const out: Category[] = [];
  for (const cat of CODE[lang]) {
    const items = (byId.get(cat.id)?.items ?? []).filter((d) => !d.hidden);
    if (items.length === 0) continue;
    out.push({
      ...cat,
      dishes: items.map((d) => {
        const dish: Category["dishes"][number] = { name: pick(d.name, lang, cfg), price: formatPrice(d.price, lang, cfg) };
        const note = d.note ? pick(d.note, lang, cfg) : "";
        if (note) dish.note = note;
        const amount = singleAmount(d.price);
        if (amount !== undefined) dish.amount = amount;
        return dish;
      }),
    });
  }
  return out;
}

export async function getCarta(lang: Lang): Promise<Category[]> {
  return renderCarta((await getMenuData()).data, lang);
}

/* ------------------- home "imprescindibles" live prices ------------------ */

// Featured home items (by position in `destacados.items`) that are exactly one dish of the carta.
// The others (e.g. "Tosta de salmón", a marketing price) stay as written.
const FEATURED_REFS: Record<number, string> = {
  0: "pancakes-0",
  1: "sandwiches-4",
  3: "burgers-5",
  4: "cafe-13",
  5: "postres-18",
};

function compact(n: number, lang: Lang): string {
  const body = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return lang === "en" ? `€${body}` : `${body.replace(".", ",")} €`;
}

export function withLiveFeaturedPrices<T extends { destacados: { items: { price: string }[] } }>(copy: T, data: PriceListData, lang: Lang): T {
  const dishes = new Map(data.categories.flatMap((c) => c.items.map((d) => [d.id, d] as const)));
  const items = copy.destacados.items.map((item, i) => {
    const ref = FEATURED_REFS[i];
    const d = ref ? dishes.get(ref) : undefined;
    if (!d || d.hidden || d.price.kind !== "amount" || d.price.amounts.length !== 1) return item;
    return { ...item, price: compact(d.price.amounts[0], lang) };
  });
  return { ...copy, destacados: { ...copy.destacados, items } };
}
