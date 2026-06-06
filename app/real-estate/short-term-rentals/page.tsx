import type { Metadata } from "next";
import { getSubcategory, getSubcategoryPath } from "@/lib/content/categories";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorApp } from "@/components/CalculatorApp";
import { SeoContent, faqs } from "@/components/SeoContent";
import { PageSchemas } from "@/components/PageSchemas";
import { HubOverview } from "@/components/OverviewContent";
import { AdSlot } from "@/components/AdSlot";

const CATEGORY_SLUG = "real-estate";
const SUB_SLUG = "short-term-rentals";

export const metadata: Metadata = (() => {
  const result = getSubcategory(CATEGORY_SLUG, SUB_SLUG);
  if (!result) return {};
  const { subcategory } = result;
  return buildPageMetadata({
    title: subcategory.metaTitle,
    description: subcategory.metaDescription,
    keywords: subcategory.keywords,
    path: getSubcategoryPath(CATEGORY_SLUG, SUB_SLUG),
  });
})();

export default function ShortTermRentalsPage() {
  const result = getSubcategory(CATEGORY_SLUG, SUB_SLUG);
  if (!result) return null;

  const { category, subcategory } = result;
  const path = getSubcategoryPath(CATEGORY_SLUG, SUB_SLUG);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category.title, path: `/${category.slug}` },
    { name: subcategory.title, path },
  ];

  return (
    <>
      <PageSchemas
        breadcrumbs={breadcrumbs}
        webPage={{
          name: subcategory.h1,
          description: subcategory.metaDescription,
          path,
        }}
        webApplication={{
          name: subcategory.metaTitle,
          description: subcategory.metaDescription,
          path,
        }}
        faqs={faqs}
      />
      <PageShell
        title={subcategory.h1}
        description={subcategory.shortDescription}
      >
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-4">
          <HubOverview paragraphs={subcategory.overview} />
        </div>
        <section className="mt-8" aria-label="Rental profitability calculator">
          <CalculatorApp />
        </section>
        <div className="mt-6 lg:hidden">
          <AdSlot slot="content-bottom" className="mx-auto" />
        </div>
        <SeoContent />
      </PageShell>
    </>
  );
}
