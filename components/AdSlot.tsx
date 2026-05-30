import { adSlotSidebar, adSlotSidebar2, adsEnabled } from "@/lib/site";
import { AdSlotLive } from "./AdSlotLive";

const sizeClass = "min-h-[250px] w-full max-w-[300px]";

export type AdSlotId = "sidebar" | "sidebar2";

const slotIds: Record<AdSlotId, string> = {
  sidebar: adSlotSidebar,
  sidebar2: adSlotSidebar2,
};

type AdSlotProps = {
  slot?: AdSlotId;
  className?: string;
};

function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100/80 ${sizeClass} ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
        Advertisement
      </span>
      <span className="mt-1 text-xs text-slate-400">300 × 250</span>
    </div>
  );
}

export function AdSlot({ slot = "sidebar", className = "" }: AdSlotProps) {
  const adSlotId = slotIds[slot];

  if (!adsEnabled || !adSlotId) {
    return <AdPlaceholder className={className} />;
  }

  return (
    <div
      className={`ad-slot flex justify-center ${sizeClass} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <AdSlotLive adSlotId={adSlotId} format="rectangle" />
    </div>
  );
}
