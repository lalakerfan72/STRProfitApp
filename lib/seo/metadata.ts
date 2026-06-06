import type { Metadata } from "next";
import { defaultDescription, defaultKeywords, siteName, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description?: string;
  keywords?: string[];
  path: string;
};

export function buildPageMetadata({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName,
      title: fullTitle,
      description,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.svg"],
    },
  };
}
