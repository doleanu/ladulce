import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

const PATHS = [
  "",
  "/carta",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
  "/en",
  "/en/carta",
  "/en/aviso-legal",
  "/en/privacidad",
  "/en/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/carta" || path === "/en/carta" ? 0.9 : 0.5,
  }));
}
