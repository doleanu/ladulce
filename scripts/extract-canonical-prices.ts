/**
 * One-off migration: extract a canonical, language-agnostic price model from
 * the four hand-authored CARTA_ES/EN/DE/FR arrays.
 *
 * Assumption (true today, since the four arrays were translated in lockstep):
 * category `id`s match 1:1 across languages, and within a category the dish
 * at index N in one language is the same dish as index N in every other
 * language. We parse the numbers out of each language's price string and
 * cross-check them against each other; any mismatch is printed so it can be
 * fixed by hand before the canonical file is trusted.
 *
 * Run: npx tsx scripts/extract-canonical-prices.ts
 */
import { writeFileSync } from "node:fs";
import { CARTA_ES, CARTA_EN, CARTA_DE, CARTA_FR } from "../src/lib/carta-data";
import type { Category } from "../src/lib/carta-data";

type PriceEntry = {
  amounts: number[]; // one value, or several for size/option variants
  sep: "/" | "–" | null; // how multiple amounts were joined in the original text
  freeText: string | null; // for non-numeric prices ("Consultar" / "Ask us" / …) — null when numeric
};

// Pull every number out of a price string, e.g. "3,00 € – 3,50 €" -> [3, 3.5]
function parseAmounts(price: string): { amounts: number[]; sep: "/" | "–" | null } {
  const matches = [...price.matchAll(/(\d+)[.,](\d+)/g)];
  const amounts = matches.map((m) => Number(`${m[1]}.${m[2]}`));
  const sep: "/" | "–" | null = price.includes("–") ? "–" : price.includes("/") ? "/" : null;
  return { amounts, sep };
}

function isFreeText(price: string): boolean {
  return !/\d/.test(price);
}

const LANGS = { es: CARTA_ES, en: CARTA_EN, de: CARTA_DE, fr: CARTA_FR } as const;
const mismatches: string[] = [];
const canonical: Record<string, PriceEntry[]> = {};

for (const cat of CARTA_ES) {
  const key = cat.id;
  const entries: PriceEntry[] = [];

  cat.dishes.forEach((esDish, i) => {
    const label = `${key}[${i}] "${esDish.name}"`;

    if (isFreeText(esDish.price)) {
      entries.push({ amounts: [], sep: null, freeText: esDish.price });
      return;
    }

    const es = parseAmounts(esDish.price);
    entries.push({ amounts: es.amounts, sep: es.sep, freeText: null });

    // cross-check EN/DE/FR at the same position
    (["en", "de", "fr"] as const).forEach((lang) => {
      const otherCat = LANGS[lang].find((c) => c.id === key);
      const otherDish = otherCat?.dishes[i];
      if (!otherCat || !otherDish) {
        mismatches.push(`${label}: missing category/dish in ${lang}`);
        return;
      }
      if (isFreeText(otherDish.price)) {
        if (!isFreeText(esDish.price)) mismatches.push(`${label}: ${lang} is free-text ("${otherDish.price}") but ES is numeric`);
        return;
      }
      const other = parseAmounts(otherDish.price);
      const same =
        other.amounts.length === es.amounts.length &&
        other.amounts.every((v, idx) => Math.abs(v - es.amounts[idx]) < 0.001);
      if (!same) {
        mismatches.push(
          `${label}: ES=${JSON.stringify(es.amounts)} vs ${lang.toUpperCase()}=${JSON.stringify(other.amounts)} (raw "${otherDish.price}")`
        );
      }
    });
  });

  canonical[key] = entries;
}

writeFileSync(
  new URL("../src/content/menu-prices.json", import.meta.url),
  JSON.stringify(canonical, null, 2) + "\n"
);

console.log(`Wrote src/content/menu-prices.json — ${CARTA_ES.reduce((n, c) => n + c.dishes.length, 0)} dishes across ${CARTA_ES.length} categories.`);
if (mismatches.length) {
  console.log(`\n⚠️  ${mismatches.length} mismatch(es) found — review before trusting the canonical file:\n`);
  mismatches.forEach((m) => console.log(" - " + m));
} else {
  console.log("✅ No mismatches — ES/EN/DE/FR numeric prices agree everywhere.");
}
