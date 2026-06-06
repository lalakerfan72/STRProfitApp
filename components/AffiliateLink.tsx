import Link from "next/link";

type AffiliateLinkProps = {
  href: string;
  label: string;
  showBadge?: boolean;
};

export function AffiliateLink({ href, label, showBadge = true }: AffiliateLinkProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Link
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
      >
        {label}
      </Link>
      {showBadge && (
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
          Affiliate
        </span>
      )}
    </span>
  );
}
