export const siteName = "Passive Income Hub";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://passive-income-hub.com";
export const defaultDescription =
  "Explore passive income ideas across securities, real estate, and digital assets. Educational guides and free tools to help you research income streams.";
export const defaultKeywords = [
  "passive income ideas",
  "passive income streams",
  "ways to make passive income",
  "extra income",
  "side income ideas",
  "build passive income",
];

export const affiliateDisclosure =
  "Some links on this site are affiliate links. We may earn a commission at no extra cost to you.";

export const siteDisclaimer = `Disclaimer: ${siteName} is an informational and educational resource tool designed to help users explore potential concepts. We do not provide financial, legal, or tax advice. All passive income ideas carry risk, and users should conduct their own due diligence before investing time or capital.`;

export const adSlotSidebar =
  process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "";
export const adSlotSidebar2 =
  process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_2 ?? "";
export const adSlotContentBottom =
  process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM ?? "";
export const adSlotMobileBanner =
  process.env.NEXT_PUBLIC_AD_SLOT_MOBILE_BANNER ?? "";

export const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;
const GOOGLE_ADS_TXT_CERT_ID = "f08c47fec0942fa0";

export function getAdsTxtBody(): string | null {
  if (!ADSENSE_CLIENT_PATTERN.test(adsenseClient)) return null;
  const pubId = adsenseClient.replace(/^ca-/, "");
  return `google.com, ${pubId}, DIRECT, ${GOOGLE_ADS_TXT_CERT_ID}`;
}
