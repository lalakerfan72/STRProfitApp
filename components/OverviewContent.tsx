import type { Subcategory } from "@/lib/content/categories";
import { resolveAffiliateLinks } from "@/lib/content/affiliates";
import { AffiliateResources } from "./AffiliateResources";
import { ComingSoonBanner } from "./ComingSoonBanner";

type OverviewContentProps = {
  subcategory: Subcategory;
};

export function OverviewContent({ subcategory }: OverviewContentProps) {
  const affiliateLinks = resolveAffiliateLinks(subcategory.affiliateLinkIds);

  return (
    <article className="prose prose-slate max-w-none">
      {subcategory.overview.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-700">
          {paragraph}
        </p>
      ))}
      {subcategory.status === "coming-soon" && <ComingSoonBanner />}
      <AffiliateResources links={affiliateLinks} />
    </article>
  );
}

type HubOverviewProps = {
  paragraphs: string[];
};

export function HubOverview({ paragraphs }: HubOverviewProps) {
  return (
    <div className="prose prose-slate max-w-none">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
