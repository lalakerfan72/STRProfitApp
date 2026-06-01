export const siteName = "STR Profit Calculator";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://str-profit-calculator.com";
export const defaultDescription =
  "Free short-term rental calculator to estimate monthly income, expenses, and annual profit for Airbnb and vacation rental properties.";
export const defaultKeywords = [
  "short term rental calculator",
  "Airbnb profit calculator",
  "STR cash flow",
  "vacation rental profitability",
  "rental property calculator",
];

export const adSlotSidebar =
  process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "";
export const adSlotSidebar2 =
  process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_2 ?? "";

export const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;
const GOOGLE_ADS_TXT_CERT_ID = "f08c47fec0942fa0";

export function getAdsTxtBody(): string | null {
  if (!ADSENSE_CLIENT_PATTERN.test(adsenseClient)) return null;
  const pubId = adsenseClient.replace(/^ca-/, "");
  return `google.com, ${pubId}, DIRECT, ${GOOGLE_ADS_TXT_CERT_ID}`;
}
