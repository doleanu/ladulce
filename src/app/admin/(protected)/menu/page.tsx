import { CARTA_ES } from "@/lib/carta-data";
import { getMenuPrices } from "@/lib/menuPrices";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { MenuPriceEditor } from "@/components/admin/MenuPriceEditor";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const menuPrices = await getMenuPrices();
  const categories = CARTA_ES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    dishes: cat.dishes.map((d, idx) => ({
      name: d.name,
      key: `${cat.id}::${idx}`,
      catId: cat.id,
      idx,
      freeText: menuPrices[cat.id]?.[idx]?.freeText ?? null,
    })),
  }));

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-espresso">Carta · La Dulce</p>
          <p className="mt-1 text-sm text-espresso/60">Precios en español — se aplican igual en las 4 versiones del sitio.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8">
        <MenuPriceEditor categories={categories} initialPrices={menuPrices} />
      </div>
    </main>
  );
}
