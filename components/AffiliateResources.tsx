import type { AffiliateLink as AffiliateLinkType } from "@/lib/content/affiliates";
import { AffiliateLink } from "./AffiliateLink";

type AffiliateResourcesProps = {
  links: AffiliateLinkType[];
};

export function AffiliateResources({ links }: AffiliateResourcesProps) {
  if (!links.length) return null;

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Recommended resources</h2>
      <p className="mt-1 text-sm text-slate-500">
        Third-party services we find useful for research (affiliate links).
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.id} className="text-sm text-slate-700">
            <AffiliateLink href={link.href} label={link.label} />
            {link.description && (
              <span className="mt-1 block text-slate-500">{link.description}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
