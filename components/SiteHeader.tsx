import Link from "next/link";
import { siteName } from "@/lib/site";
import { SiteNav } from "./SiteNav";

type SiteHeaderProps = {
  title?: string;
  description?: string;
};

export function SiteHeader({ title, description }: SiteHeaderProps) {
  const heading = title ?? "Explore passive income opportunities";
  const subtext =
    description ??
    "Research securities, real estate, and digital income streams—all in one place.";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group">
            <p className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
              {siteName}
            </p>
          </Link>
          <SiteNav />
        </div>
        {title !== undefined && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {heading}
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">{subtext}</p>
          </div>
        )}
      </div>
    </header>
  );
}
