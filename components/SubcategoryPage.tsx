import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSubcategory,
  getStubSubcategories,
  getSubcategoryPath,
  type Category,
  type Subcategory,
} from "@/lib/content/categories";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/PageShell";
import { ContentLayout } from "@/components/ContentLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { OverviewContent } from "@/components/OverviewContent";
import { PageSchemas } from "@/components/PageSchemas";
import { resolveAffiliateLinks } from "@/lib/content/affiliates";

type Props = { params: Promise<{ slug: string }> };

export function createSubcategoryStaticParams(categorySlug: string) {
  return getStubSubcategories(categorySlug).map((s) => ({ slug: s.slug }));
}

export async function generateSubcategoryMetadata(
  categorySlug: string,
  slug: string
): Promise<Metadata> {
  const result = getSubcategory(categorySlug, slug);
  if (!result) return {};
  const { subcategory } = result;
  return buildPageMetadata({
    title: subcategory.metaTitle,
    description: subcategory.metaDescription,
    keywords: subcategory.keywords,
    path: getSubcategoryPath(categorySlug, slug),
  });
}

export async function SubcategoryPage({
  categorySlug,
  params,
}: {
  categorySlug: string;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getSubcategory(categorySlug, slug);
  if (!result || result.subcategory.dedicatedRoute) notFound();

  const { category, subcategory } = result;
  const path = getSubcategoryPath(categorySlug, slug);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category.title, path: `/${category.slug}` },
    { name: subcategory.title, path },
  ];
  const hasAffiliates = resolveAffiliateLinks(subcategory.affiliateLinkIds).length > 0;

  return (
    <>
      <PageSchemas
        breadcrumbs={breadcrumbs}
        webPage={{
          name: subcategory.h1,
          description: subcategory.metaDescription,
          path,
        }}
        faqs={subcategory.faq}
      />
      <PageShell showAffiliateDisclosure={hasAffiliates}>
        <Breadcrumbs items={breadcrumbs} />
        <PageHero
          h1={subcategory.h1}
          imageSrc={category.cardImage}
          imageAlt=""
        />
        <ContentLayout>
          <OverviewContent subcategory={subcategory} />
        </ContentLayout>
      </PageShell>
    </>
  );
}

export type { Category, Subcategory };
