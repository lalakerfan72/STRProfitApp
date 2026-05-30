import { siteName } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Footer" className="text-sm text-slate-600">
          <p>
            © {year} {siteName}. Estimates only—not financial or tax advice.
          </p>
        </nav>
      </div>
    </footer>
  );
}
