import Link from "next/link";
import { categories } from "@/lib/content/categories";

const navItems = [
  { href: "/", label: "Home" },
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.navLabel })),
];

type SiteNavProps = {
  className?: string;
  variant?: "header" | "footer";
};

export function SiteNav({ className = "", variant = "header" }: SiteNavProps) {
  const linkClass =
    variant === "header"
      ? "text-sm font-medium text-slate-600 transition hover:text-emerald-700"
      : "text-slate-600 transition hover:text-emerald-700";

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
