"use client";

import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";

// Solo hay un fijo publicado (922 74 92 19) — no hay móvil/WhatsApp
// confirmado. Se usa igualmente para wa.me como demo de la funcionalidad;
// actualizar si el negocio confirma un número de WhatsApp real.
const WHATSAPP_NUMBER = "34922749219";
const PEOPLE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"];

// Abierto todos los días hasta las 21:30 (hora de apertura no publicada) —
// franja típica de café/brunch, cada 30 min, última reserva 21:00.
const TIME_SLOTS = Array.from({ length: 25 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

function formatDateEs(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function waHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function ReservationForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const peopleText =
      people === "9+" ? "un grupo de 9 o más personas" : `${people} persona${people === "1" ? "" : "s"}`;

    const lines = [
      `¡Hola La Dulce! Soy ${name || "—"}.`,
      `Me gustaría reservar mesa en la terraza para ${peopleText}${date ? ` el ${formatDateEs(date)}` : ""}${time ? ` a las ${time}` : ""}.`,
    ];
    if (message.trim()) lines.push(message.trim());

    window.open(waHref(lines.join(" ")), "_blank", "noopener,noreferrer");
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
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Nombre</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Cómo te llamas?"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Fecha</span>
          <DatePicker value={date} onChange={setDate} placeholder="Elige un día" />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Hora</span>
          <select required value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}>
            <option value="" disabled>
              Elige una hora
            </option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Personas</span>
          <select value={people} onChange={(e) => setPeople(e.target.value)} className={inputClass}>
            {PEOPLE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
            Algo más que debamos saber (opcional)
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Alergias, trona para bebé…"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-terracota px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-crema transition-transform hover:scale-[1.02]"
      >
        Reservar por WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-espresso/50">
        Al enviar se abre WhatsApp con tu reserva ya escrita — solo tienes que confirmarla.
      </p>
    </form>
  );
}
