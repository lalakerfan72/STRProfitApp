import { siteName } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-emerald-700">{siteName}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Short-Term Rental Profitability Calculator
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Estimate monthly income and expenses for Airbnb and vacation rentals.
          See if your property is profitable for the year.
        </p>
      </div>
    </header>
  );
}
