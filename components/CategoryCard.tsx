import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/content/categories";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-50 px-6 py-8">
        <Image
          src={category.cardImage}
          alt=""
          width={120}
          height={80}
          className="h-16 w-auto transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold text-slate-900">{category.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {category.shortDescription}
        </p>
        <span className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
          Explore {category.navLabel.toLowerCase()} →
        </span>
      </div>
    </Link>
  );
}
