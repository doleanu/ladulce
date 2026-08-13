"use client";

import { useEffect, useRef, useState } from "react";

// 2024-01-01 was a Monday — a fixed reference week to read localized
// Mon..Sun weekday labels from, regardless of what day "today" is.
const REF_MONDAY = new Date(2024, 0, 1);

function isoOf(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  maxDaysAhead = 60,
  locale = "es",
}: {
  value: string;
  onChange: (iso: string) => void;
  placeholder: string;
  maxDaysAhead?: number;
  locale?: "es" | "en";
}) {
  const LOCALE = locale === "en" ? "en-GB" : "es-ES";
  const prevLabel = locale === "en" ? "Previous month" : "Mes anterior";
  const nextLabel = locale === "en" ? "Next month" : "Mes siguiente";
  const today = startOfDay(new Date());
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxDaysAhead);

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(startOfMonth(today));
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

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;

  const label = selectedDate
    ? (() => {
        const raw = selectedDate.toLocaleDateString(LOCALE, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        return raw.charAt(0).toUpperCase() + raw.slice(1);
      })()
    : placeholder;

  const monthLabel = (() => {
    const raw = viewMonth.toLocaleDateString(LOCALE, { month: "long", year: "numeric" });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  })();

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(REF_MONDAY);
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString(LOCALE, { weekday: "narrow" });
  });

  const firstOffset = mondayIndex(viewMonth);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstOffset).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)
    ),
  ];

  const canGoPrev = !sameMonth(viewMonth, today) && viewMonth > startOfMonth(today);
  const canGoNext = startOfMonth(viewMonth) < startOfMonth(maxDate);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cx(
          "flex w-full items-center justify-between gap-2 rounded-2xl border border-espresso/15 bg-crema px-4 py-2.5 text-left text-sm font-medium outline-none transition-colors focus:border-terracota",
          selectedDate ? "text-espresso" : "text-espresso/40"
        )}
      >
        <span className="truncate">{label}</span>
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-terracota">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-2xl border border-espresso/10 bg-crema p-4 shadow-[0_18px_45px_rgba(59,42,30,0.25)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                canGoPrev && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
              }
              disabled={!canGoPrev}
              className="rounded-full p-1.5 text-espresso/70 transition-colors hover:bg-espresso/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={prevLabel}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-display text-sm font-semibold text-espresso">{monthLabel}</span>
            <button
              type="button"
              onClick={() =>
                canGoNext && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
              }
              disabled={!canGoNext}
              className="rounded-full p-1.5 text-espresso/70 transition-colors hover:bg-espresso/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={nextLabel}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-espresso/40">
            {weekdayLabels.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <span key={`blank-${i}`} />;
              const iso = isoOf(date);
              const disabled = date < today || date > maxDate;
              const isSelected = iso === value;
              const isToday = iso === isoOf(today);
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cx(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    disabled && "cursor-not-allowed text-espresso/20",
                    !disabled && !isSelected && "text-espresso hover:bg-espresso/10",
                    isSelected && "bg-terracota text-crema",
                    !isSelected && isToday && !disabled && "text-terracota font-semibold"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
