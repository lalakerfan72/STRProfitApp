import {
  breadcrumbSchema,
  faqPageSchema,
  organizationSchema,
  webApplicationSchema,
  webPageSchema,
  webSiteSchema,
  type BreadcrumbItem,
  type FaqItem,
} from "@/lib/seo/jsonld";

type JsonLdScriptProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const schemas = Array.isArray(data) ? data : [data];
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export type PageSchemasProps = {
  breadcrumbs: BreadcrumbItem[];
  webPage?: { name: string; description: string; path: string };
  faqs?: FaqItem[];
  webApplication?: { name: string; description: string; path: string };
  includeWebSite?: boolean;
};

export function PageSchemas({
  breadcrumbs,
  webPage,
  faqs,
  webApplication,
  includeWebSite,
}: PageSchemasProps) {
  const schemas: Record<string, unknown>[] = [breadcrumbSchema(breadcrumbs)];

  if (includeWebSite) {
    schemas.push(webSiteSchema(), organizationSchema());
  }
  if (webPage) {
    schemas.push(webPageSchema(webPage.name, webPage.description, webPage.path));
  }
  if (faqs?.length) {
    schemas.push(faqPageSchema(faqs));
  }
  if (webApplication) {
    schemas.push(
      webApplicationSchema(
        webApplication.name,
        webApplication.description,
        webApplication.path
      )
    );
  }

  return <JsonLdScript data={schemas} />;
}
