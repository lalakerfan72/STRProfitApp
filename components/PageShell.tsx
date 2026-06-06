import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type PageShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showAffiliateDisclosure?: boolean;
};

export function PageShell({
  children,
  title,
  description,
  showAffiliateDisclosure = false,
}: PageShellProps) {
  return (
    <>
      <SiteHeader title={title} description={description} />
      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">{children}</main>
      <SiteFooter showAffiliateDisclosure={showAffiliateDisclosure} />
    </>
  );
}
