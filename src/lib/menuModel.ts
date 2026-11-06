/* ---------------------------------------------------------------------------
   Menu data model shared by the server (Blob I/O, rendering, API validation)
   and the admin editor (client). PURE: no Blob / no big data imports, so it is
   safe to ship to the browser.

   One document = the whole carta. Categories are fixed (their titles, order
   and photos live in code); what Manu edits are the DISHES inside them.
   --------------------------------------------------------------------------- */

export const LANGS = ["es", "en", "de", "fr"] as const;
export type Lang = (typeof LANGS)[number];

/** Spanish is required; the other languages are optional and fall back to ES. */
export type LText = { es: string; en?: string; de?: string; fr?: string };

export type MenuPrice =
  | { kind: "amount"; amounts: number[]; sep: "/" | "–" | null }
  | { kind: "text"; text: LText };

export type MenuDish = {
  id: string;
  name: LText;
  note?: LText;
  price: MenuPrice;
  hidden?: boolean;
};

export type MenuCategory = { id: string; dishes: MenuDish[] };

export type MenuData = {
  /** Bumped on every save; used to refuse a save made from a stale page. */
  version: number;
  updatedAt: string;
  categories: MenuCategory[];
};

/* ------------------------------ limits -------------------------------- */

export const LIMITS = {
  name: 120,
  note: 300,
  priceText: 40,
  maxAmounts: 3,
  maxAmount: 9999,
  dishesPerCategory: 150,
} as const;

/** Pick the text for a language, falling back to Spanish. */
export function pick(t: LText | undefined, lang: Lang): string {
  if (!t) return "";
  const v = lang === "es" ? t.es : t[lang];
  return (v && v.trim()) || t.es;
}

/* ------------------------- price <-> input text ------------------------ */

const NUM = String.raw`\d{1,4}(?:[.,]\d{1,2})?`;
const NUMERIC_PRICE = new RegExp(String.raw`^\s*${NUM}(?:\s*[/–-]\s*${NUM})*\s*(?:€|eur|euros?)?\s*$`, "i");

function toNumber(s: string): number {
  return Number(s.replace(",", "."));
}

/** "8,90" / "3,00 – 3,50" / "5 / 6" / "Consultar" → MenuPrice, or null if empty/invalid. */
export function parsePriceInput(raw: string): MenuPrice | null {
  const s = raw.trim();
  if (!s) return null;
  if (NUMERIC_PRICE.test(s)) {
    const amounts = [...s.matchAll(new RegExp(NUM, "g"))].map((m) => toNumber(m[0]));
    if (amounts.length === 0 || amounts.length > LIMITS.maxAmounts) return null;
    if (amounts.some((n) => !Number.isFinite(n) || n < 0 || n > LIMITS.maxAmount)) return null;
    const sepMatch = s.match(/[/–-]/)?.[0];
    const sep = amounts.length > 1 ? (sepMatch === "/" ? "/" : "–") : null;
    return { kind: "amount", amounts, sep };
  }
  // Anything non-numeric is free text ("Consultar", "Precio según peso"…). It must not
  // look like a malformed number, otherwise "8,9,0" would silently become text.
  if (/\d/.test(s) && !/[a-zA-ZÀ-ÿ]/.test(s)) return null;
  if (s.length > LIMITS.priceText) return null;
  return { kind: "text", text: { es: s } };
}

/** Editor text for a stored price (Spanish formatting). */
export function priceToInput(p: MenuPrice): string {
  if (p.kind === "text") return p.text.es;
  const fmt = (n: number) => n.toFixed(2).replace(".", ",");
  const glue = p.sep === "–" ? " – " : " / ";
  return p.amounts.map(fmt).join(glue);
}

/** Display string per locale — the same format the carta has always used. */
function formatAmount(n: number, lang: Lang): string {
  const fixed = n.toFixed(2);
  return lang === "en" ? `€${fixed}` : `${fixed.replace(".", ",")} €`;
}

export function formatPrice(p: MenuPrice, lang: Lang): string {
  if (p.kind === "text") return pick(p.text, lang);
  if (p.amounts.length === 1) return formatAmount(p.amounts[0], lang);
  const glue = p.sep === "–" ? " – " : " / ";
  return p.amounts.map((a) => formatAmount(a, lang)).join(glue);
}

/* ----------------------------- validation ------------------------------ */

export type ValidationResult = { ok: true; data: MenuData } | { ok: false; error: string };

const ID_RE = /^[A-Za-z0-9_-]{1,40}$/;

function cleanText(v: unknown, max: number, required: boolean, label: string): string | undefined | Error {
  if (v === undefined || v === null || v === "") return required ? new Error(`${label}: obligatorio`) : undefined;
  if (typeof v !== "string") return new Error(`${label}: texto no válido`);
  const t = v.replace(/\s+/g, " ").trim();
  if (!t) return required ? new Error(`${label}: obligatorio`) : undefined;
  if (t.length > max) return new Error(`${label}: máximo ${max} caracteres`);
  return t;
}

function cleanLText(v: unknown, max: number, required: boolean, label: string): LText | undefined | Error {
  if (v === undefined || v === null) return required ? new Error(`${label}: obligatorio`) : undefined;
  if (typeof v !== "object" || Array.isArray(v)) return new Error(`${label}: formato no válido`);
  const o = v as Record<string, unknown>;
  const es = cleanText(o.es, max, required, `${label} (ES)`);
  if (es instanceof Error) return es;
  const out: LText = { es: es ?? "" };
  for (const l of ["en", "de", "fr"] as const) {
    const t = cleanText(o[l], max, false, `${label} (${l.toUpperCase()})`);
    if (t instanceof Error) return t;
    if (t) out[l] = t;
  }
  if (!out.es) return undefined;
  return out;
}

/**
 * Validates (and normalises) a whole document. `allowedCategoryIds` is the list
 * of fixed categories from code: every one must be present, none may be invented.
 * `version`/`updatedAt` are stamped by the server, so they are only type-checked.
 */
export function validateMenuData(input: unknown, allowedCategoryIds: readonly string[]): ValidationResult {
  if (!input || typeof input !== "object") return { ok: false, error: "Datos no válidos" };
  const raw = input as Record<string, unknown>;
  if (!Array.isArray(raw.categories)) return { ok: false, error: "Faltan las categorías" };

  const seenCats = new Set<string>();
  const seenDishIds = new Set<string>();
  const categories: MenuCategory[] = [];

  for (const c of raw.categories) {
    if (!c || typeof c !== "object") return { ok: false, error: "Categoría no válida" };
    const cat = c as Record<string, unknown>;
    const catId = cat.id;
    if (typeof catId !== "string" || !allowedCategoryIds.includes(catId)) {
      return { ok: false, error: `Categoría desconocida: ${String(catId)}` };
    }
    if (seenCats.has(catId)) return { ok: false, error: `Categoría repetida: ${catId}` };
    seenCats.add(catId);
    if (!Array.isArray(cat.dishes)) return { ok: false, error: `Categoría ${catId}: faltan los productos` };
    if (cat.dishes.length > LIMITS.dishesPerCategory) {
      return { ok: false, error: `Categoría ${catId}: demasiados productos` };
    }

    const dishes: MenuDish[] = [];
    for (const d of cat.dishes) {
      if (!d || typeof d !== "object") return { ok: false, error: `Categoría ${catId}: producto no válido` };
      const dish = d as Record<string, unknown>;
      if (typeof dish.id !== "string" || !ID_RE.test(dish.id)) return { ok: false, error: "Identificador de producto no válido" };
      if (seenDishIds.has(dish.id)) return { ok: false, error: `Producto repetido: ${dish.id}` };
      seenDishIds.add(dish.id);

      const name = cleanLText(dish.name, LIMITS.name, true, "Nombre");
      if (name instanceof Error) return { ok: false, error: name.message };
      if (!name) return { ok: false, error: "Nombre: obligatorio" };
      const note = cleanLText(dish.note, LIMITS.note, false, `Descripción de «${name.es}»`);
      if (note instanceof Error) return { ok: false, error: note.message };

      const p = dish.price as Record<string, unknown> | undefined;
      let price: MenuPrice;
      if (p && p.kind === "amount") {
        const amounts = p.amounts;
        if (!Array.isArray(amounts) || amounts.length < 1 || amounts.length > LIMITS.maxAmounts) {
          return { ok: false, error: `Precio de «${name.es}» no válido` };
        }
        for (const a of amounts) {
          if (typeof a !== "number" || !Number.isFinite(a) || a < 0 || a > LIMITS.maxAmount) {
            return { ok: false, error: `Precio de «${name.es}» no válido` };
          }
        }
        const sep = amounts.length > 1 ? (p.sep === "–" ? "–" : "/") : null;
        price = { kind: "amount", amounts: (amounts as number[]).map((a) => Math.round(a * 100) / 100), sep };
      } else if (p && p.kind === "text") {
        const t = cleanLText(p.text, LIMITS.priceText, true, `Precio de «${name.es}»`);
        if (t instanceof Error) return { ok: false, error: t.message };
        if (!t) return { ok: false, error: `Precio de «${name.es}»: obligatorio` };
        price = { kind: "text", text: t };
      } else {
        return { ok: false, error: `Precio de «${name.es}»: obligatorio` };
      }

      const out: MenuDish = { id: dish.id, name, price };
      if (note) out.note = note;
      if (dish.hidden === true) out.hidden = true;
      dishes.push(out);
    }
    categories.push({ id: catId, dishes });
  }

  for (const id of allowedCategoryIds) {
    if (!seenCats.has(id)) return { ok: false, error: `Falta la categoría ${id}` };
  }

  const version = typeof raw.version === "number" && Number.isFinite(raw.version) ? raw.version : 0;
  const updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : "";
  return { ok: true, data: { version, updatedAt, categories } };
}
