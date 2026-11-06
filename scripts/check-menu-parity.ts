/**
 * Dev check: the carta rendered from the new menu-data model must be IDENTICAL
 * (names, notes, formatted prices) to what the pages rendered before it existed
 * (withCanonicalPrices over the code arrays). Run against the live legacy prices:
 *   set -a; source .env.local; set +a; npx tsx scripts/check-menu-parity.ts
 */
import { CARTA_ES, CARTA_EN, CARTA_DE, CARTA_FR, withCanonicalPrices } from "@/lib/carta-data";
import { getMenuPrices } from "@/lib/menuPrices";
import { buildFromCode, renderCarta, CATEGORY_IDS } from "@/lib/menuData";
import { validateMenuData, parsePriceInput, priceToInput, formatPrice } from "@/lib/menuModel";

const CODE = { es: CARTA_ES, en: CARTA_EN, de: CARTA_DE, fr: CARTA_FR } as const;
let bad = 0;
const strip = (c: ReturnType<typeof renderCarta>) =>
  c.map((cat) => ({ id: cat.id, title: cat.title, note: cat.note, dishes: cat.dishes.map(({ name, price, note }) => ({ name, price, note })) }));

(async () => {
  const prices = await getMenuPrices();
  const data = buildFromCode(prices);
  const v = validateMenuData(JSON.parse(JSON.stringify(data)), CATEGORY_IDS);
  if (!v.ok) { console.log("SEED INVALID:", v.error); process.exit(1); }
  for (const lang of ["es", "en", "de", "fr"] as const) {
    const a = JSON.stringify(strip(renderCarta(data, lang)));
    const b = JSON.stringify(strip(withCanonicalPrices(CODE[lang], lang, prices)));
    const same = a === b;
    if (!same) {
      bad++;
      const A = strip(renderCarta(data, lang)), B = strip(withCanonicalPrices(CODE[lang], lang, prices));
      outer: for (let i = 0; i < B.length; i++) for (let j = 0; j < B[i].dishes.length; j++) {
        if (JSON.stringify(A[i]?.dishes[j]) !== JSON.stringify(B[i].dishes[j])) { console.log(lang, "first diff", B[i].id, j, "\n new:", A[i]?.dishes[j], "\n old:", B[i].dishes[j]); break outer; }
      }
    }
    console.log(lang, same ? "IDENTICAL" : "DIFFERENT", `(${B_count(lang)} dishes)`);
  }
  function B_count(l: keyof typeof CODE) { return CODE[l].reduce((n, c) => n + c.dishes.length, 0); }

  // price parsing round-trips
  const cases = ["8", "8,90", "8.9", "3,00 – 3,50", "3 - 3,5", "5 / 6", "10€", "Consultar", "", "8,9,0", "1000000", "a".repeat(60)];
  for (const c of cases) { const p = parsePriceInput(c); console.log(JSON.stringify(c.slice(0, 20)).padEnd(24), "→", p ? `${p.kind}: ${priceToInput(p)} | es ${formatPrice(p, "es")} | en ${formatPrice(p, "en")}` : "INVALID"); }
  process.exit(bad ? 1 : 0);
})();
