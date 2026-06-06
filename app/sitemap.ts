import type { MetadataRoute } from "next";
import { getAllRoutes } from "@/lib/content/categories";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map(({ path, priority }) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
