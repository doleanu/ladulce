"use client";

import { useEffect, useRef, useState } from "react";

export type LangCode = "es" | "en" | "de" | "fr";

type LangOption = { code: LangCode; label: string; href: string; ariaLabel: string };

const TRIGGER_LABEL: Record<LangCode, string> = {
  es: "Cambiar idioma",
  en: "Change language",
  de: "Sprache wechseln",
  fr: "Changer de langue",
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LangSwitcher({ locale, options }: { locale: LangCode; options: LangOption[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={TRIGGER_LABEL[locale]}
        className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 bg-crema/85 px-3.5 py-1.5 text-xs font-bold text-espresso/75 backdrop-blur transition-colors hover:text-espresso"
      >
        {locale.toUpperCase()}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-30 mt-2 w-40 -translate-x-1/2 overflow-hidden rounded-2xl border border-espresso/10 bg-crema shadow-[3px_4px_0_rgba(59,42,30,0.18)]"
        >
          {options.map((opt) => (
            <a
              key={opt.code}
              href={opt.href}
              role="menuitem"
              aria-label={opt.ariaLabel}
              aria-current={opt.code === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                opt.code === locale ? "bg-terracota text-crema" : "text-espresso/75 hover:bg-espresso/5 hover:text-espresso"
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wide opacity-70">{opt.code}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
