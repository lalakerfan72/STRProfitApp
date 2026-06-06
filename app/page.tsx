import type { Metadata } from "next";
import { categories, homeContent } from "@/lib/content/categories";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { PageSchemas } from "@/components/PageSchemas";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata: Metadata = buildPageMetadata({
  title: homeContent.metaTitle,
  description: homeContent.metaDescription,
  keywords: homeContent.keywords,
  path: "/",
});

export default function HomePage() {
  const breadcrumbs = [{ name: "Home", path: "/" }];

  return (
    <>
      <PageSchemas breadcrumbs={breadcrumbs} includeWebSite />
      <PageShell>
        <PageHero
          h1={homeContent.h1}
          intro="Research realistic paths to extra income—organized by category, backed by free educational tools."
          imageSrc={homeContent.heroImage}
          imageAlt=""
        />
        <ContentLayout showContentBottomAd>
          <section className="prose prose-slate max-w-none">
            {homeContent.intro.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </section>
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900">
              Choose an income category
            </h2>
            <p className="mt-2 text-slate-600">
              Select a path below to explore subtopics and tools.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </ContentLayout>
      </PageShell>
    </>
  );
}
