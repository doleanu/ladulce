import { get, put } from "@vercel/blob";
import fallback from "@/content/menu-prices.json";

export type CanonicalPrice = { amounts: number[]; sep: string | null; freeText: string | null };
export type MenuPrices = Record<string, CanonicalPrice[]>;

const BLOB_PATH = "menu-prices.json";

/**
 * Reads the live prices from the private Blob store — this is what the admin
 * panel writes to when Manu saves a change, so it's the source of truth in
 * production. Falls back to the JSON file committed in the repo (the
 * original migration snapshot) if the blob doesn't exist yet or the read
 * fails for any reason — the site should never go down over a pricing read.
 */
export async function getMenuPrices(): Promise<MenuPrices> {
  try {
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return fallback as MenuPrices;
    }
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as MenuPrices;
  } catch {
    return fallback as MenuPrices;
  }
}

export async function saveMenuPrices(data: MenuPrices): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
