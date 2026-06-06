import { siteDisclaimer, siteName, affiliateDisclosure } from "@/lib/site";
import { SiteNav } from "./SiteNav";
import { categories } from "@/lib/content/categories";
import Link from "next/link";

type SiteFooterProps = {
  showAffiliateDisclosure?: boolean;
};

export function SiteFooter({ showAffiliateDisclosure = true }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <SiteNav variant="footer" className="text-sm" />
          <nav aria-label="Categories" className="text-sm">
            <p className="mb-2 font-medium text-slate-700">Categories</p>
            <ul className="space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="text-slate-600 hover:text-emerald-700"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <aside aria-label="Disclaimer" className="mt-8 space-y-3 border-t border-slate-100 pt-6">
          {showAffiliateDisclosure && (
            <p className="text-xs leading-relaxed text-slate-500">
              {affiliateDisclosure}
            </p>
          )}
          <p className="text-xs leading-relaxed text-slate-500" role="note">
            <span className="font-semibold text-slate-600">Disclaimer:</span>{" "}
            {siteDisclaimer.replace(/^Disclaimer:\s*/, "")}
          </p>
          <p className="text-xs text-slate-500">
            © {year} {siteName}.
          </p>
        </aside>
      </div>
    </footer>
  );
}
