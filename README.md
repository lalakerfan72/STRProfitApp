# STR Profit Calculator

Free short-term rental profitability calculator. Estimate monthly income, operating expenses, and annual profit for Airbnb and vacation rental properties.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm test` | Run calculation unit tests |
| `npm run lint` | ESLint |

## Calculation assumptions

- **Month length:** 30 days for occupancy (`booked nights = 30 × occupancy%`).
- **Gross income (monthly mode):** `nightly rate × booked nights`.
- **Gross income (seasonal mode):** sum of 12 monthly projections; platform/management fees calculated per month.
- **Cleaning expense:** `cleaning cost per stay × stays per month`.
- **Operating expenses:** platform fee % + management fee % + fixed monthly costs + variable monthly costs.
- **Operating profit:** gross income − operating expenses.
- **Cash flow:** operating profit − mortgage (when financing is enabled).
- **Annual profit:** monthly figure × 12.
- **Profitable:** annual cash flow (with financing) or annual operating profit (without) is greater than zero.

## Ad setup (Google AdSense)

1. Copy `.env.example` to `.env.local`.
2. Create two **300×250** display ad units in [Google AdSense](https://www.google.com/adsense/) for the right sidebar (top and bottom).
3. Set `NEXT_PUBLIC_ADS_ENABLED=true`, `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_AD_SLOT_SIDEBAR`, and `NEXT_PUBLIC_AD_SLOT_SIDEBAR_2`.
4. Deploy only after AdSense approves your domain.

A labeled placeholder displays when ads are disabled (default in development).

## SEO launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain before deploy.
2. Submit `https://your-domain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
3. Replace `public/og-image.svg` with a 1200×630 PNG if preferred (`og-image.png` and update metadata in `app/layout.tsx`).
4. After enabling live ads, check Core Web Vitals in Search Console (ad slots use min-height to reduce layout shift).

## Disclaimer

This tool provides estimates only. It is not financial, tax, or legal advice.
