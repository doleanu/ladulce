"use client";

import { useState } from "react";
import type { MenuPrices } from "@/lib/menuPrices";

type DisplayDish = { name: string; key: string; catId: string; idx: number; freeText: string | null };
type DisplayCategory = { id: string; title: string; dishes: DisplayDish[] };

function parseAmount(raw: string): number | null {
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function formatAmount(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

export function MenuPriceEditor({
  categories,
  initialPrices,
}: {
  categories: DisplayCategory[];
  initialPrices: MenuPrices;
}) {
  const [prices, setPrices] = useState<MenuPrices>(initialPrices);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function updateAmount(catId: string, idx: number, amountIdx: number, raw: string) {
    const n = parseAmount(raw);
    if (n === null) return;
    setPrices((prev) => {
      const next = { ...prev, [catId]: [...prev[catId]] };
      const entry = { ...next[catId][idx] };
      const amounts = [...entry.amounts];
      amounts[amountIdx] = n;
      entry.amounts = amounts;
      next[catId][idx] = entry;
      return next;
    });
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/menu-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prices),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 mb-6 flex items-center justify-between border-b border-espresso/10 bg-crema/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <p className="text-sm text-espresso/60">
          {status === "saved" && <span className="font-semibold text-green-700">✓ Guardado — los cambios estarán visibles en unos segundos.</span>}
          {status === "error" && <span className="font-semibold text-red-600">Error al guardar. Inténtalo de nuevo.</span>}
          {status === "idle" && "Cambia un precio y pulsa Guardar."}
          {status === "saving" && "Guardando…"}
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="rounded-full bg-azul px-6 py-2 text-sm font-semibold uppercase tracking-wide text-crema transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          Guardar cambios
        </button>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="border-b border-espresso/10 pb-2 font-display text-xl font-bold text-espresso">
              {cat.title}
            </h2>
            <ul className="mt-2 divide-y divide-crema">
              {cat.dishes.map((d) => {
                const entry = prices[cat.id]?.[d.idx];
                if (!entry) return null;
                return (
                  <li key={d.key} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-sm text-espresso">{d.name}</span>
                    {entry.freeText !== null ? (
                      <span className="shrink-0 text-sm italic text-espresso/40">{entry.freeText}</span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1.5">
                        {entry.amounts.map((amount, ai) => (
                          <span key={ai} className="flex items-center gap-1">
                            {ai > 0 && <span className="text-xs text-espresso/30">/</span>}
                            <input
                              type="text"
                              inputMode="decimal"
                              defaultValue={formatAmount(amount)}
                              onChange={(e) => updateAmount(cat.id, d.idx, ai, e.target.value)}
                              className="w-16 rounded-lg border border-espresso/15 bg-white px-2 py-1 text-right text-sm font-bold text-terracota outline-none focus:border-terracota"
                            />
                          </span>
                        ))}
                        <span className="text-sm font-bold text-terracota">€</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
