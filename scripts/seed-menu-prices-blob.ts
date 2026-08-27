/**
 * One-off: seed the private Blob store with the current menu-prices.json
 * snapshot, so the admin panel and the live carta pages have something to
 * read/edit from day one.
 *
 * Run: npx tsx scripts/seed-menu-prices-blob.ts
 * (needs BLOB_READ_WRITE_TOKEN in the environment — `vercel env pull` or
 * source .env.local first)
 */
import { readFileSync } from "node:fs";
import { put } from "@vercel/blob";

const data = readFileSync(new URL("../src/content/menu-prices.json", import.meta.url), "utf-8");

put("menu-prices.json", data, {
  access: "private",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
}).then((blob) => {
  console.log("Seeded menu-prices.json to Blob store:", blob.url);
});
