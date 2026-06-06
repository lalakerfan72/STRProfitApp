import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/content/categories";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/PageShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { HubOverview } from "@/components/OverviewContent";
import { SubcategoryGrid } from "@/components/SubcategoryGrid";
import { ContentLayout } from "@/components/ContentLayout";
import { PageSchemas } from "@/components/PageSchemas";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return [
    { category: "securities" },
    { category: "real-estate" },
    { category: "digital-assets" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return buildPageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.keywords,
    path: `/${category.slug}`,
  });
}

export default async function CategoryHubPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const path = `/${category.slug}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: category.title, path },
  ];

  return (
    <>
      <PageSchemas
        breadcrumbs={breadcrumbs}
        webPage={{
          name: category.h1,
          description: category.metaDescription,
          path,
        }}
        faqs={category.faq}
      />
      <PageShell>
        <Breadcrumbs items={breadcrumbs} />
        <PageHero
          h1={category.h1}
          intro={category.shortDescription}
          imageSrc={category.heroImage}
          imageAlt=""
        />
        <ContentLayout>
          <HubOverview paragraphs={category.overview} />
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Explore {category.title.toLowerCase()} topics
            </h2>
            <p className="mt-2 text-slate-600">
              Click a topic to learn more. New tools and guides are added over time.
            </p>
            <div className="mt-6">
              <SubcategoryGrid category={category} />
            </div>
          </section>
        </ContentLayout>
      </PageShell>
    </>
  );
}
