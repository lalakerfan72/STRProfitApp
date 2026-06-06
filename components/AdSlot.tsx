import {
  adSlotSidebar,
  adSlotSidebar2,
  adSlotContentBottom,
  adSlotMobileBanner,
  adsEnabled,
} from "@/lib/site";
import { AdSlotLive } from "./AdSlotLive";

const sizeClasses: Record<string, string> = {
  sidebar: "min-h-[250px] w-full max-w-[300px]",
  sidebar2: "min-h-[250px] w-full max-w-[300px]",
  "content-bottom": "min-h-[90px] w-full max-w-[728px]",
  "mobile-banner": "min-h-[100px] w-full max-w-[320px]",
};

export type AdSlotId = "sidebar" | "sidebar2" | "content-bottom" | "mobile-banner";

const slotEnvMap: Record<AdSlotId, string> = {
  sidebar: adSlotSidebar,
  sidebar2: adSlotSidebar2,
  "content-bottom": adSlotContentBottom || adSlotSidebar,
  "mobile-banner": adSlotMobileBanner || adSlotSidebar,
};

type AdSlotProps = {
  slot?: AdSlotId;
  className?: string;
};

function AdPlaceholder({
  className = "",
  slot,
}: {
  className?: string;
  slot: AdSlotId;
}) {
  const label =
    slot === "content-bottom"
      ? "728 × 90"
      : slot === "mobile-banner"
        ? "320 × 100"
        : "300 × 250";

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100/80 ${sizeClasses[slot]} ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
        Advertisement
      </span>
      <span className="mt-1 text-xs text-slate-400">{label}</span>
    </div>
  );
}

export function AdSlot({ slot = "sidebar", className = "" }: AdSlotProps) {
  const adSlotId = slotEnvMap[slot];
  const sizeClass = sizeClasses[slot];
  const format = slot === "content-bottom" || slot === "mobile-banner" ? "horizontal" : "rectangle";

  if (!adsEnabled || !adSlotId) {
    return <AdPlaceholder className={className} slot={slot} />;
  }

  return (
    <div
      className={`ad-slot flex justify-center ${sizeClass} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <AdSlotLive adSlotId={adSlotId} format={format} />
    </div>
  );
}
