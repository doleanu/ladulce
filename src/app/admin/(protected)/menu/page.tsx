import { CARTA_ES, withCanonicalPrices } from "@/lib/carta-data";
import menuPrices from "@/content/menu-prices.json";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminMenuPage() {
  const carta = withCanonicalPrices(CARTA_ES, "es", menuPrices);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-espresso">Carta · La Dulce</p>
          <p className="mt-1 text-sm text-espresso/60">
            Sesión iniciada correctamente. Edición de precios: próximamente.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 space-y-8">
        {carta.map((cat) => (
          <section key={cat.id}>
            <h2 className="border-b border-espresso/10 pb-2 font-display text-xl font-bold text-espresso">
              {cat.title}
            </h2>
            <ul className="mt-2 divide-y divide-crema">
              {cat.dishes.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-4 py-2">
                  <span className="text-sm text-espresso">{d.name}</span>
                  <span className="shrink-0 font-display font-bold text-terracota">{d.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
