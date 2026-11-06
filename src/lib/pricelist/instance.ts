/* La Dulce · admin-kit instance: config, categories, seed from carta-data.ts + legacy prices, storage, auth. */
import { createPriceList } from "./service";
import { blobStorage } from "./storage.blob";
import { getCookie } from "./handler";
import type { LText, PriceListConfig, PriceListData, Item, Price } from "./model";
import type { EditorConfig } from "@/components/admin/PriceListEditor";
import { CARTA_ES, CARTA_EN, CARTA_DE, CARTA_FR, DRINK_IDS, type Category } from "@/lib/carta-data";
import { getMenuPrices, type MenuPrices } from "@/lib/menuPrices";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/adminAuth";

const LANGS = ["es", "en", "de", "fr"] as const;
type Lang = (typeof LANGS)[number];
const CODE: Record<Lang, Category[]> = { es: CARTA_ES, en: CARTA_EN, de: CARTA_DE, fr: CARTA_FR };

export const cfg: PriceListConfig = {
  siteId: "ladulce",
  defaultLang: "es",
  langs: LANGS,
  langStyle: {
    es: { decimalSep: ",", symbol: "suffix" },
    en: { decimalSep: ".", symbol: "prefix" },
    de: { decimalSep: ",", symbol: "suffix" },
    fr: { decimalSep: ",", symbol: "suffix" },
  },
  decimals: "fixed2", // 8,00 € / €8.00
  range: "unit-each", // 3,00 € – 3,50 €
  fromWord: { es: "desde", en: "from", de: "ab", fr: "dès" },
};

const drinkIds: readonly string[] = DRINK_IDS;
export const CATEGORIES = CARTA_ES.map((c) => ({ id: c.id, title: c.title, group: drinkIds.includes(c.id) ? "bebidas" : "comida" }));

/** What the site shows today, as a document: dishes from the code arrays (4 languages), numeric prices from the
 *  legacy prices blob (the live source of truth before the editor existed); texts like "Consultar" stay per-language text. */
export function seedFromCode(prices: MenuPrices): PriceListData {
  return {
    version: 0,
    updatedAt: "",
    categories: CARTA_ES.map((cat, ci) => ({
      id: cat.id,
      items: cat.dishes.map((d, i): Item => {
        const name: LText = { es: d.name };
        const note: LText = { es: d.note ?? "" };
        for (const l of ["en", "de", "fr"] as const) {
          const x = CODE[l][ci]?.dishes[i];
          if (x?.name) name[l] = x.name;
          if (x?.note) note[l] = x.note;
        }
        const entry = prices[cat.id]?.[i];
        let price: Price;
        if (entry && entry.freeText === null && entry.amounts.length > 0) {
          price = { kind: "amount", amounts: entry.amounts, sep: entry.amounts.length > 1 ? (entry.sep === "–" ? "–" : "/") : null };
        } else {
          const text: LText = { es: d.price };
          for (const l of ["en", "de", "fr"] as const) {
            const x = CODE[l][ci]?.dishes[i];
            if (x?.price) text[l] = x.price;
          }
          price = { kind: "text", text };
        }
        const item: Item = { id: `${cat.id}-${i}`, name, price };
        if (d.note) item.note = note;
        return item;
      }),
    })),
  };
}

export const pl = createPriceList({
  cfg,
  categoryIds: CATEGORIES.map((c) => c.id),
  storage: blobStorage(),
  seed: async () => seedFromCode(await getMenuPrices()),
  production: process.env.VERCEL_ENV === "production",
  fileBase: "menu-data",
});

export const editorConfig: EditorConfig = {
  cfg,
  noun: { one: "producto", many: "productos" },
  langs: [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
  ],
  groups: [
    { id: "comida", label: "Comida" },
    { id: "bebidas", label: "Bebidas" },
  ],
  categories: CATEGORIES,
  features: { note: true, highlight: false },
  endpoint: "/api/admin/pricelist",
  priceHint: "8,90 · 3,00 – 3,50 · Consultar",
  accent: "#2f7ba3",
  viewHref: "/carta",
};

export const isAuthed = (req: Request) => isValidSession(getCookie(req, ADMIN_SESSION_COOKIE));
export const REVALIDATE_PATHS = ["/", "/en", "/de", "/fr", "/carta", "/en/carta", "/de/carta", "/fr/carta", "/admin/menu"];
