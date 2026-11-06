import { get, put } from "@vercel/blob";
import { CARTA_ES, CARTA_EN, CARTA_DE, CARTA_FR, type Category } from "./carta-data";
import { getMenuPrices, type MenuPrices } from "./menuPrices";
import {
  formatPrice,
  pick,
  validateMenuData,
  type Lang,
  type LText,
  type MenuData,
  type MenuDish,
  type MenuPrice,
} from "./menuModel";

/* ---------------------------------------------------------------------------
   The live carta. Source of truth, in order:
     1. the `menu-data` blob in the private Vercel Blob store — what Manu edits
        in /admin/menu (one small JSON document);
     2. until the first save, a document derived on the fly from the dishes in
        src/lib/carta-data.ts + the legacy prices blob, so the first deploy of
        this feature changes nothing on the live site.
   Categories (titles, order, photos) always come from code.

   Cost: the Blob store is on the Hobby plan (free allowance, no overage). Pages
   are cached (revalidate = 1 day) and refreshed on demand when Manu saves, so
   Blob is read a few hundred times a month and written twice per save.
   --------------------------------------------------------------------------- */

const CODE: Record<Lang, Category[]> = { es: CARTA_ES, en: CARTA_EN, de: CARTA_DE, fr: CARTA_FR };
export const CATEGORY_IDS: string[] = CARTA_ES.map((c) => c.id);

// Preview / local deployments share the same Blob store as production, so they
// use their own file: testing can never overwrite the real menu.
const isProd = process.env.VERCEL_ENV === "production";
const BLOB_PATH = isProd ? "menu-data.json" : "menu-data.dev.json";
const PREV_PATH = isProd ? "menu-data.prev.json" : "menu-data.dev.prev.json";

/* ------------------------- derive from code (seed) ---------------------- */

export function buildFromCode(prices: MenuPrices): MenuData {
  const categories = CARTA_ES.map((cat, ci) => ({
    id: cat.id,
    dishes: cat.dishes.map((d, i): MenuDish => {
      const per = (l: Lang) => CODE[l][ci]?.dishes[i];
      const name: LText = { es: d.name };
      const note: LText = { es: d.note ?? "" };
      for (const l of ["en", "de", "fr"] as const) {
        const x = per(l);
        if (x?.name) name[l] = x.name;
        if (x?.note) note[l] = x.note;
      }
      const entry = prices[cat.id]?.[i];
      let price: MenuPrice;
      if (entry && entry.freeText === null && entry.amounts.length > 0) {
        price = {
          kind: "amount",
          amounts: entry.amounts,
          sep: entry.amounts.length > 1 ? (entry.sep === "–" ? "–" : "/") : null,
        };
      } else {
        const text: LText = { es: d.price };
        for (const l of ["en", "de", "fr"] as const) {
          const x = per(l);
          if (x?.price) text[l] = x.price;
        }
        price = { kind: "text", text };
      }
      const dish: MenuDish = { id: `${cat.id}-${i}`, name, price };
      if (d.note) dish.note = note;
      return dish;
    }),
  }));
  return { version: 0, updatedAt: "", categories };
}

/* ------------------------------ blob I/O -------------------------------- */

async function readRaw(path: string): Promise<string | null> {
  try {
    const result = await get(path, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return await new Response(result.stream).text();
  } catch {
    return null;
  }
}

export async function getMenuData(): Promise<{ data: MenuData; source: "blob" | "code" }> {
  const raw = await readRaw(BLOB_PATH);
  if (raw) {
    try {
      const v = validateMenuData(JSON.parse(raw), CATEGORY_IDS);
      if (v.ok) return { data: v.data, source: "blob" };
      console.error("menu-data blob is invalid, falling back to code:", v.error);
    } catch (e) {
      console.error("menu-data blob is not valid JSON, falling back to code:", e);
    }
  }
  return { data: buildFromCode(await getMenuPrices()), source: "code" };
}

export type SaveResult = { ok: true; version: number } | { ok: false; error: "conflict" | "invalid" | "write"; message: string };

export async function saveMenuData(input: unknown, baseVersion: number): Promise<SaveResult> {
  const validated = validateMenuData(input, CATEGORY_IDS);
  if (!validated.ok) return { ok: false, error: "invalid", message: validated.error };

  const raw = await readRaw(BLOB_PATH);
  let currentVersion = 0;
  if (raw) {
    try {
      const cur = validateMenuData(JSON.parse(raw), CATEGORY_IDS);
      if (cur.ok) currentVersion = cur.data.version;
    } catch {
      /* unreadable current file: treat as version 0, the previous copy below still keeps it */
    }
  }
  if (baseVersion !== currentVersion) {
    return { ok: false, error: "conflict", message: "El menú ha cambiado desde que abriste esta página." };
  }

  const next: MenuData = { ...validated.data, version: currentVersion + 1, updatedAt: new Date().toISOString() };
  try {
    if (raw) {
      await put(PREV_PATH, raw, { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
    }
    await put(BLOB_PATH, JSON.stringify(next), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (e) {
    console.error("menu-data write failed:", e);
    return { ok: false, error: "write", message: "No se pudo guardar. Inténtalo de nuevo." };
  }
  return { ok: true, version: next.version };
}

/* ------------------------------ rendering ------------------------------- */

/** The carta as the public pages render it, for one language. Hidden dishes are left out. */
export function renderCarta(data: MenuData, lang: Lang): Category[] {
  const byId = new Map(data.categories.map((c) => [c.id, c]));
  const out: Category[] = [];
  for (const cat of CODE[lang]) {
    const dishes = (byId.get(cat.id)?.dishes ?? []).filter((d) => !d.hidden);
    if (dishes.length === 0) continue;
    out.push({
      ...cat,
      dishes: dishes.map((d) => {
        const dish: Category["dishes"][number] = { name: pick(d.name, lang), price: formatPrice(d.price, lang) };
        const note = d.note ? pick(d.note, lang) : "";
        if (note) dish.note = note;
        if (d.price.kind === "amount" && d.price.amounts.length === 1) dish.amount = d.price.amounts[0];
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

// Featured home items (by position in `destacados.items`) that are exactly one
// dish of the carta. The others (e.g. "Tosta de salmón", a marketing price) stay as written.
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

export function withLiveFeaturedPrices<T extends { destacados: { items: { price: string }[] } }>(
  copy: T,
  data: MenuData,
  lang: Lang
): T {
  const dishes = new Map(data.categories.flatMap((c) => c.dishes.map((d) => [d.id, d] as const)));
  const items = copy.destacados.items.map((item, i) => {
    const ref = FEATURED_REFS[i];
    const d = ref ? dishes.get(ref) : undefined;
    if (!d || d.hidden || d.price.kind !== "amount" || d.price.amounts.length !== 1) return item;
    return { ...item, price: compact(d.price.amounts[0], lang) };
  });
  return { ...copy, destacados: { ...copy.destacados, items } };
}
