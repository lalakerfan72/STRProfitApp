"use client";

import Script from "next/script";
import { adsEnabled, adsenseClient } from "@/lib/site";

export function AdScript() {
  if (!adsEnabled || !adsenseClient) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
