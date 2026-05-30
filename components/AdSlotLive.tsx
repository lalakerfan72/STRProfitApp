"use client";

import { useEffect, useRef } from "react";
import { adsenseClient } from "@/lib/site";

type AdSlotLiveProps = {
  adSlotId: string;
  format: "horizontal" | "rectangle";
  className?: string;
};

export function AdSlotLive({ adSlotId, format, className }: AdSlotLiveProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !adSlotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // blocked by ad blocker
    }
  }, [adSlotId]);

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={adsenseClient}
      data-ad-slot={adSlotId}
      data-ad-format={format === "horizontal" ? "auto" : "rectangle"}
      data-full-width-responsive={format === "horizontal" ? "true" : "false"}
    />
  );
}
