"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Email o contraseña incorrectos.");
        return;
      }
      router.push("/admin/menu");
      router.refresh();
    } catch {
      setError("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-crema px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[26px] border border-espresso/10 bg-paper p-8 shadow-[3px_4px_0_rgba(59,42,30,0.12)]"
      >
        <p className="font-display text-2xl font-semibold text-espresso">La Dulce · Admin</p>
        <p className="mt-1 text-sm text-espresso/60">Panel de gestión de precios de la carta.</p>

        <label className="mt-6 flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-espresso/15 bg-crema px-4 py-2.5 text-sm font-medium text-espresso outline-none transition-colors focus:border-terracota"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Contraseña</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-espresso/15 bg-crema px-4 py-2.5 text-sm font-medium text-espresso outline-none transition-colors focus:border-terracota"
          />
        </label>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-azul-deep px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-crema transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
