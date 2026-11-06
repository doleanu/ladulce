import { get, put } from "@vercel/blob";
import type { Storage } from "./service";

/** Private Vercel Blob store (needs BLOB_READ_WRITE_TOKEN). Hobby plan: free allowance, no overage. */
export function blobStorage(prefix = "pricelist"): Storage {
  return {
    async read(name) {
      const result = await get(`${prefix}/${name}`, { access: "private", useCache: false });
      if (!result || result.statusCode !== 200 || !result.stream) return null;
      return await new Response(result.stream).text();
    },
    async write(name, value) {
      await put(`${prefix}/${name}`, value, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    },
  };
}
