"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LIMITS,
  parsePriceInput,
  priceToInput,
  type LText,
  type MenuData,
  type MenuDish,
  type MenuPrice,
} from "@/lib/menuModel";

/* ---------------------------------------------------------------------------
   Admin editor for the carta (Manu). One state tree = the whole menu; "Guardar"
   sends it in one request and the server validates it again. Prices are typed as
   text ("8,90", "3,00 – 3,50", "Consultar") and parsed on save.
   --------------------------------------------------------------------------- */

type CatMeta = { id: string; title: string; isDrink: boolean };

type Row = {
  id: string;
  es: string;
  en: string;
  de: string;
  fr: string;
  noteEs: string;
  noteEn: string;
  noteDe: string;
  noteFr: string;
  price: string;
  hidden: boolean;
  isNew: boolean;
  /** The price as stored, and the text it was shown as — so an untouched price keeps its other-language texts. */
  origPrice: MenuPrice | null;
  origPriceInput: string;
};

type Cat = CatMeta & { rows: Row[] };

function toRow(d: MenuDish): Row {
  const price = priceToInput(d.price);
  return {
    id: d.id,
    es: d.name.es,
    en: d.name.en ?? "",
    de: d.name.de ?? "",
    fr: d.name.fr ?? "",
    noteEs: d.note?.es ?? "",
    noteEn: d.note?.en ?? "",
    noteDe: d.note?.de ?? "",
    noteFr: d.note?.fr ?? "",
    price,
    hidden: Boolean(d.hidden),
    isNew: false,
    origPrice: d.price,
    origPriceInput: price,
  };
}

function fromData(meta: CatMeta[], data: MenuData): Cat[] {
  const byId = new Map(data.categories.map((c) => [c.id, c]));
  return meta.map((m) => ({ ...m, rows: (byId.get(m.id)?.dishes ?? []).map(toRow) }));
}

function lt(es: string, en: string, de: string, fr: string): LText | undefined {
  if (!es.trim()) return undefined;
  const out: LText = { es: es.trim() };
  if (en.trim()) out.en = en.trim();
  if (de.trim()) out.de = de.trim();
  if (fr.trim()) out.fr = fr.trim();
  return out;
}

function rowPrice(r: Row): MenuPrice | null {
  if (r.origPrice && r.price.trim() === r.origPriceInput.trim()) return r.origPrice;
  return parsePriceInput(r.price);
}

function rowError(r: Row): string | null {
  if (!r.es.trim()) return "Falta el nombre.";
  if (r.es.trim().length > LIMITS.name) return `El nombre es demasiado largo (máx. ${LIMITS.name}).`;
  if (!r.price.trim()) return "Falta el precio.";
  if (!rowPrice(r)) return "Precio no válido. Ejemplos: 8,90 · 3,00 – 3,50 · Consultar";
  if (r.noteEs.trim().length > LIMITS.note) return `La descripción es demasiado larga (máx. ${LIMITS.note}).`;
  return null;
}

function toData(cats: Cat[], version: number): MenuData {
  return {
    version,
    updatedAt: "",
    categories: cats.map((c) => ({
      id: c.id,
      dishes: c.rows.map((r): MenuDish => {
        const dish: MenuDish = {
          id: r.id,
          name: lt(r.es, r.en, r.de, r.fr) ?? { es: "" },
          price: rowPrice(r) ?? { kind: "text", text: { es: r.price.trim() } },
        };
        const note = lt(r.noteEs, r.noteEn, r.noteDe, r.noteFr);
        if (note) dish.note = note;
        if (r.hidden) dish.hidden = true;
        return dish;
      }),
    })),
  };
}

const snapshot = (cats: Cat[]) =>
  JSON.stringify(
    cats.map((c) => c.rows.map((r) => [r.id, r.es, r.en, r.de, r.fr, r.noteEs, r.noteEn, r.noteDe, r.noteFr, r.price.trim(), r.hidden]))
  );

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const newId = () => "n" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

const inputCls =
  "w-full rounded-lg border border-espresso/15 bg-white px-3 py-2 text-sm text-espresso outline-none focus:border-azul-deep";
const iconBtn =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-espresso/15 px-2.5 text-xs font-bold text-espresso/70 transition-colors hover:border-espresso/40 hover:text-espresso disabled:opacity-30 disabled:hover:border-espresso/15 disabled:hover:text-espresso/70";

export function MenuEditor({ categories, initialData }: { categories: CatMeta[]; initialData: MenuData }) {
  const [cats, setCats] = useState<Cat[]>(() => fromData(categories, initialData));
  const [version, setVersion] = useState(initialData.version);
  const [savedSnap, setSavedSnap] = useState(() => snapshot(fromData(categories, initialData)));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error" | "conflict">("idle");
  const [message, setMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [query, setQuery] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [focusId, setFocusId] = useState<string | null>(null);
  const savedFlash = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dirty = useMemo(() => snapshot(cats) !== savedSnap, [cats, savedSnap]);
  const searching = query.trim().length > 0;
  const q = norm(query.trim());

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (!focusId) return;
    document.getElementById(`name-${focusId}`)?.focus();
    setFocusId(null);
  }, [focusId, cats]);

  function patchRow(catId: string, rowId: string, patch: Partial<Row>) {
    setCats((cs) => cs.map((c) => (c.id !== catId ? c : { ...c, rows: c.rows.map((r) => (r.id === rowId ? { ...r, ...patch } : r)) })));
    if (status === "saved" || status === "error") setStatus("idle");
  }

  function move(catId: string, rowId: string, dir: -1 | 1) {
    setCats((cs) =>
      cs.map((c) => {
        if (c.id !== catId) return c;
        const i = c.rows.findIndex((r) => r.id === rowId);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= c.rows.length) return c;
        const rows = [...c.rows];
        [rows[i], rows[j]] = [rows[j], rows[i]];
        return { ...c, rows };
      })
    );
  }

  function remove(catId: string, row: Row) {
    if (!window.confirm(`¿Eliminar «${row.es || "este producto"}» de la carta?\n\nSi solo quieres que no salga por ahora, usa «Ocultar».`)) return;
    setCats((cs) => cs.map((c) => (c.id !== catId ? c : { ...c, rows: c.rows.filter((r) => r.id !== row.id) })));
  }

  function add(catId: string) {
    const id = newId();
    const row: Row = {
      id, es: "", en: "", de: "", fr: "", noteEs: "", noteEn: "", noteDe: "", noteFr: "",
      price: "", hidden: false, isNew: true, origPrice: null, origPriceInput: "",
    };
    setCats((cs) => cs.map((c) => (c.id !== catId ? c : { ...c, rows: [...c.rows, row] })));
    setOpenCats((o) => ({ ...o, [catId]: true }));
    setFocusId(id);
  }

  function discard() {
    if (!window.confirm("¿Descartar todos los cambios sin guardar?")) return;
    setCats(fromData(categories, initialData));
    setSavedSnap(snapshot(fromData(categories, initialData)));
    setShowErrors(false);
    setStatus("idle");
  }

  async function save() {
    const bad = cats.flatMap((c) => c.rows.filter((r) => rowError(r)).map((r) => ({ c, r })));
    if (bad.length > 0) {
      setShowErrors(true);
      setOpenCats((o) => ({ ...o, ...Object.fromEntries(bad.map(({ c }) => [c.id, true])) }));
      setStatus("error");
      setMessage(`Hay ${bad.length} ${bad.length === 1 ? "producto" : "productos"} con datos que corregir (marcados en rojo).`);
      setTimeout(() => document.getElementById(`row-${bad[0].r.id}`)?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
      return;
    }
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/menu-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseVersion: version, data: toData(cats, version) }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; version?: number; error?: string; message?: string };
      if (res.ok && json.ok && typeof json.version === "number") {
        const settled = cats.map((c) => ({
          ...c,
          rows: c.rows.map((r) => ({ ...r, isNew: false, origPrice: rowPrice(r), origPriceInput: r.price })),
        }));
        setCats(settled);
        setSavedSnap(snapshot(settled));
        setVersion(json.version);
        setShowErrors(false);
        setStatus("saved");
        if (savedFlash.current) clearTimeout(savedFlash.current);
        savedFlash.current = setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 8000);
      } else if (res.status === 409) {
        setStatus("conflict");
        setMessage("El menú se ha cambiado desde otro dispositivo o pestaña.");
      } else if (res.status === 401) {
        setStatus("error");
        setMessage("La sesión ha caducado. Vuelve a entrar (tus cambios siguen aquí hasta que cierres la página).");
      } else {
        setStatus("error");
        setMessage(json.message || "No se pudo guardar. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Sin conexión. Inténtalo de nuevo.");
    }
  }

  const totalDishes = cats.reduce((n, c) => n + c.rows.length, 0);
  const untranslated = cats.reduce((n, c) => n + c.rows.filter((r) => !r.en.trim() || !r.de.trim() || !r.fr.trim()).length, 0);

  function renderCat(c: Cat) {
    const visibleRows = searching ? c.rows.filter((r) => norm(r.es).includes(q)) : c.rows;
    if (searching && visibleRows.length === 0) return null;
    const open = searching || Boolean(openCats[c.id]);
    const hiddenCount = c.rows.filter((r) => r.hidden).length;
    return (
      <section key={c.id} className="rounded-2xl border border-espresso/10 bg-white">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpenCats((o) => ({ ...o, [c.id]: !open }))}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <span className="font-display text-lg font-bold text-espresso">{c.title}</span>
          <span className="flex shrink-0 items-center gap-2 text-xs text-espresso/50">
            {hiddenCount > 0 && <span className="rounded-full bg-espresso/10 px-2 py-0.5">{hiddenCount} oculto{hiddenCount > 1 ? "s" : ""}</span>}
            <span>{c.rows.length}</span>
            <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
          </span>
        </button>

        {open && (
          <div className="border-t border-espresso/10 px-3 pb-3 pt-1 sm:px-4">
            <ul className="divide-y divide-espresso/10">
              {visibleRows.map((r) => {
                const err = showErrors ? rowError(r) : null;
                const idx = c.rows.findIndex((x) => x.id === r.id);
                const moreOpen = Boolean(openRows[r.id]);
                const missingTr = !r.en.trim() || !r.de.trim() || !r.fr.trim();
                return (
                  <li key={r.id} id={`row-${r.id}`} className={`py-3 ${r.hidden ? "opacity-60" : ""}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        id={`name-${r.id}`}
                        value={r.es}
                        onChange={(e) => patchRow(c.id, r.id, { es: e.target.value })}
                        placeholder="Nombre del producto"
                        aria-label="Nombre"
                        maxLength={LIMITS.name}
                        className={`${inputCls} min-w-0 flex-1 basis-48 ${err && !r.es.trim() ? "border-red-500" : ""}`}
                      />
                      <div className="flex items-center gap-1">
                        <input
                          value={r.price}
                          onChange={(e) => patchRow(c.id, r.id, { price: e.target.value })}
                          placeholder="0,00"
                          inputMode="decimal"
                          aria-label="Precio"
                          className={`${inputCls} w-28 text-right font-bold text-terracota-deep ${err && !rowPrice(r) ? "border-red-500" : ""}`}
                        />
                        <span className="text-sm font-bold text-terracota-deep">€</span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <button type="button" className={iconBtn} disabled={searching || idx === 0} onClick={() => move(c.id, r.id, -1)} aria-label="Subir" title="Subir">▲</button>
                      <button type="button" className={iconBtn} disabled={searching || idx === c.rows.length - 1} onClick={() => move(c.id, r.id, 1)} aria-label="Bajar" title="Bajar">▼</button>
                      <button type="button" className={iconBtn} onClick={() => patchRow(c.id, r.id, { hidden: !r.hidden })}>
                        {r.hidden ? "Mostrar" : "Ocultar"}
                      </button>
                      <button type="button" className={iconBtn} aria-expanded={moreOpen} onClick={() => setOpenRows((o) => ({ ...o, [r.id]: !moreOpen }))}>
                        {moreOpen ? "Menos" : "Más"}
                      </button>
                      <button type="button" className={`${iconBtn} text-red-600 hover:text-red-700`} onClick={() => remove(c.id, r)}>Eliminar</button>
                      <span className="ml-1 flex flex-wrap gap-1 text-[0.7rem]">
                        {r.isNew && <span className="rounded-full bg-azul-deep px-2 py-0.5 font-bold text-crema">Nuevo</span>}
                        {r.hidden && <span className="rounded-full bg-espresso/10 px-2 py-0.5 text-espresso/70">Oculto en la web</span>}
                        {!r.isNew && missingTr && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">Sin traducir</span>}
                      </span>
                    </div>

                    {err && <p className="mt-1.5 text-xs font-semibold text-red-600">{err}</p>}

                    {moreOpen && (
                      <div className="mt-3 space-y-3 rounded-xl bg-paper p-3">
                        <label className="block">
                          <span className="text-xs font-semibold text-espresso/60">Descripción (opcional)</span>
                          <input
                            value={r.noteEs}
                            onChange={(e) => patchRow(c.id, r.id, { noteEs: e.target.value })}
                            maxLength={LIMITS.note}
                            placeholder="Ingredientes, a elegir…"
                            className={`${inputCls} mt-1`}
                          />
                        </label>
                        <p className="text-xs text-espresso/55">
                          Inglés, alemán y francés son opcionales: si los dejas vacíos, en esos idiomas saldrá el texto en español.
                          Si cambias el nombre de un producto, revisa también sus traducciones.
                        </p>
                        {(
                          [
                            ["EN", "en", "noteEn", "English"],
                            ["DE", "de", "noteDe", "Deutsch"],
                            ["FR", "fr", "noteFr", "Français"],
                          ] as const
                        ).map(([label, nameKey, noteKey, full]) => (
                          <div key={label} className="grid gap-2 sm:grid-cols-2">
                            <label className="block">
                              <span className="text-xs font-semibold text-espresso/60">{full} · nombre</span>
                              <input value={r[nameKey]} onChange={(e) => patchRow(c.id, r.id, { [nameKey]: e.target.value } as Partial<Row>)} maxLength={LIMITS.name} className={`${inputCls} mt-1`} />
                            </label>
                            <label className="block">
                              <span className="text-xs font-semibold text-espresso/60">{full} · descripción</span>
                              <input value={r[noteKey]} onChange={(e) => patchRow(c.id, r.id, { [noteKey]: e.target.value } as Partial<Row>)} maxLength={LIMITS.note} className={`${inputCls} mt-1`} />
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {!searching && (
              <button
                type="button"
                onClick={() => add(c.id)}
                className="mt-2 w-full rounded-xl border-2 border-dashed border-espresso/20 py-2.5 text-sm font-bold text-azul-deep transition-colors hover:border-azul-deep"
              >
                + Añadir producto a {c.title}
              </button>
            )}
          </div>
        )}
      </section>
    );
  }

  const food = cats.filter((c) => !c.isDrink);
  const drinks = cats.filter((c) => c.isDrink);

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-espresso/10 bg-crema/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm" role="status" aria-live="polite">
            {status === "saved" && <span className="font-semibold text-green-700">✓ Guardado. La web se actualiza en unos segundos.</span>}
            {status === "saving" && <span className="text-espresso/60">Guardando…</span>}
            {status === "error" && <span className="font-semibold text-red-600">{message}</span>}
            {status === "conflict" && <span className="font-semibold text-red-600">{message}</span>}
            {status === "idle" && (dirty ? <span className="font-semibold text-amber-700">Tienes cambios sin guardar.</span> : <span className="text-espresso/50">Sin cambios.</span>)}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {dirty && status !== "saving" && (
              <button type="button" onClick={discard} className="text-xs font-bold uppercase tracking-wide text-espresso/50 hover:text-espresso">
                Descartar
              </button>
            )}
            {status === "conflict" ? (
              <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-crema">
                Recargar
              </button>
            ) : (
              <button
                type="button"
                onClick={save}
                disabled={!dirty || status === "saving"}
                className="rounded-full bg-azul-deep px-5 py-2 text-sm font-semibold uppercase tracking-wide text-crema transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
              >
                Guardar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar un producto…"
          aria-label="Buscar un producto"
          className={inputCls}
        />
        <p className="mt-2 text-xs text-espresso/50">
          {totalDishes} productos
          {untranslated > 0 && ` · ${untranslated} sin alguna traducción (en esos idiomas sale el español)`}
        </p>
      </div>

      <h2 className="mb-2 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-espresso/50">Comida</h2>
      <div className="space-y-2">{food.map(renderCat)}</div>
      <h2 className="mb-2 mt-8 text-xs font-bold uppercase tracking-[0.2em] text-espresso/50">Bebidas</h2>
      <div className="space-y-2">{drinks.map(renderCat)}</div>
    </div>
  );
}
