import { CARTA_ES, DRINK_IDS } from "@/lib/carta-data";
import { getMenuData } from "@/lib/menuData";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { MenuEditor } from "@/components/admin/MenuEditor";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const { data } = await getMenuData();
  const drinkIds: readonly string[] = DRINK_IDS;
  const categories = CARTA_ES.map((c) => ({ id: c.id, title: c.title, isDrink: drinkIds.includes(c.id) }));

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-semibold text-espresso">Carta · La Dulce</p>
          <p className="mt-1 text-sm text-espresso/60">
            Cambia precios, añade o quita productos. Se actualiza la web en los 4 idiomas.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/carta"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-espresso/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-espresso/60 transition-colors hover:text-espresso"
          >
            Ver carta
          </a>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-6">
        <MenuEditor categories={categories} initialData={data} />
      </div>
    </main>
  );
}
