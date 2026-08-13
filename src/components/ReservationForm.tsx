"use client";

import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE } from "@/content/site";

const PEOPLE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"];

// Franja de reservas cada 30 min. Última reserva 21:30 (cierre 22:30).
const TIME_SLOTS = Array.from({ length: 26 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

type Locale = "es" | "en";

const T = {
  es: {
    name: "Nombre",
    namePlaceholder: "¿Cómo te llamas?",
    date: "Fecha",
    datePlaceholder: "Elige un día",
    time: "Hora",
    timePlaceholder: "Elige una hora",
    people: "Personas",
    extra: "Algo más que debamos saber (opcional)",
    extraPlaceholder: "Alergias, trona para bebé…",
    submit: "Reservar por WhatsApp",
    note: "Al enviar se abre WhatsApp con tu reserva ya escrita — solo tienes que confirmarla.",
  },
  en: {
    name: "Name",
    namePlaceholder: "What's your name?",
    date: "Date",
    datePlaceholder: "Pick a day",
    time: "Time",
    timePlaceholder: "Pick a time",
    people: "People",
    extra: "Anything we should know? (optional)",
    extraPlaceholder: "Allergies, high chair…",
    submit: "Book via WhatsApp",
    note: "On send, WhatsApp opens with your booking pre-written — just confirm it.",
  },
} as const;

function formatDate(iso: string, locale: Locale) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return locale === "en" ? `${d}/${m}/${y}` : `${d}/${m}/${y}`;
}

function buildMessage(
  locale: Locale,
  { name, date, time, people, message }: { name: string; date: string; time: string; people: string; message: string }
) {
  if (locale === "en") {
    const peopleText = people === "9+" ? "a group of 9 or more" : `${people} ${people === "1" ? "person" : "people"}`;
    const lines = [
      `Hi La Dulce! I'm ${name || "—"}.`,
      `I'd like to book a table on the terrace for ${peopleText}${date ? ` on ${formatDate(date, locale)}` : ""}${time ? ` at ${time}` : ""}.`,
    ];
    if (message.trim()) lines.push(message.trim());
    return lines.join(" ");
  }
  const peopleText = people === "9+" ? "un grupo de 9 o más personas" : `${people} persona${people === "1" ? "" : "s"}`;
  const lines = [
    `¡Hola La Dulce! Soy ${name || "—"}.`,
    `Me gustaría reservar mesa en la terraza para ${peopleText}${date ? ` el ${formatDate(date, locale)}` : ""}${time ? ` a las ${time}` : ""}.`,
  ];
  if (message.trim()) lines.push(message.trim());
  return lines.join(" ");
}

function waHref(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function ReservationForm({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = buildMessage(locale, { name, date, time, people, message });
    window.open(waHref(text), "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-2xl border border-espresso/15 bg-crema px-4 py-2.5 text-sm font-medium text-espresso placeholder:text-espresso/40 outline-none transition-colors focus:border-terracota";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-xl rounded-[26px] border border-espresso/10 bg-paper p-6 text-left shadow-[3px_4px_0_rgba(59,42,30,0.12)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">{t.name}</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">{t.date}</span>
          <DatePicker value={date} onChange={setDate} placeholder={t.datePlaceholder} locale={locale} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">{t.time}</span>
          <select required value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}>
            <option value="" disabled>
              {t.timePlaceholder}
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">{t.people}</span>
          <select value={people} onChange={(e) => setPeople(e.target.value)} className={inputClass}>
            {PEOPLE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">{t.extra}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.extraPlaceholder}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-azul px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-crema transition-transform hover:scale-[1.02]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {t.submit}
      </button>
      <p className="mt-3 text-center text-xs text-espresso/50">{t.note}</p>
    </form>
  );
}
