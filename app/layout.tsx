import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdScript } from "@/components/AdScript";
import { JsonLd } from "@/components/JsonLd";
import {
  defaultDescription,
  defaultKeywords,
  siteName,
  siteUrl,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Airbnb & STR Profit Estimator`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Short-Term Rental Profit Calculator`,
    description: defaultDescription,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Short-term rental profitability calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | STR Profit Calculator`,
    description: defaultDescription,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JsonLd />
        <AdScript />
        {children}
      </body>
    </html>
  );
}
