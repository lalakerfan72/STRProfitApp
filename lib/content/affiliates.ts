export type AffiliateLink = {
  id: string;
  label: string;
  href: string;
  partner?: string;
  description?: string;
};

export const affiliateLinks: Record<string, AffiliateLink> = {};

export function resolveAffiliateLinks(ids: string[] | undefined): AffiliateLink[] {
  if (!ids?.length) return [];
  return ids
    .map((id) => affiliateLinks[id])
    .filter((link): link is AffiliateLink => link != null);
}
