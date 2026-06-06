import type { Metadata } from "next";
import { getAllSubcategoryPaths } from "@/lib/content/categories";
import {
  generateSubcategoryMetadata,
  SubcategoryPage,
} from "@/components/SubcategoryPage";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return getAllSubcategoryPaths().map(({ categorySlug, subSlug }) => ({
    category: categorySlug,
    slug: subSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  return generateSubcategoryMetadata(category, slug);
}

export default async function SubcategoryRoutePage({ params }: Props) {
  const { category } = await params;
  return <SubcategoryPage categorySlug={category} params={params} />;
}
