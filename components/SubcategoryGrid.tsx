import Link from "next/link";
import type { Category, Subcategory } from "@/lib/content/categories";
import { getSubcategoryPath } from "@/lib/content/categories";

type SubcategoryCardProps = {
  category: Category;
  subcategory: Subcategory;
};

export function SubcategoryCard({ category, subcategory }: SubcategoryCardProps) {
  const href = getSubcategoryPath(category.slug, subcategory.slug);
  const isLive = subcategory.status === "live";
  const isComingSoon = subcategory.status === "coming-soon";

  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        isLive
          ? "border-emerald-200 hover:border-emerald-300"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{subcategory.title}</h2>
        {isLive && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            Tool available
          </span>
        )}
        {isComingSoon && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {subcategory.shortDescription}
      </p>
      <span className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
        {isLive ? "Open →" : "Learn more →"}
      </span>
    </Link>
  );
}

type SubcategoryGridProps = {
  category: Category;
};

export function SubcategoryGrid({ category }: SubcategoryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {category.subcategories.map((sub) => (
        <SubcategoryCard key={sub.slug} category={category} subcategory={sub} />
      ))}
    </div>
  );
}
