import { AdSlot, type AdSlotId } from "./AdSlot";

type ContentLayoutProps = {
  children: React.ReactNode;
  showSecondSidebar?: boolean;
  showContentBottomAd?: boolean;
};

export function ContentLayout({
  children,
  showSecondSidebar = false,
  showContentBottomAd = true,
}: ContentLayoutProps) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        {children}
        {showContentBottomAd && (
          <div className="mt-10">
            <AdSlot slot="content-bottom" className="mx-auto max-w-[728px]" />
          </div>
        )}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-6">
          <AdSlot slot="sidebar" />
          {showSecondSidebar && <AdSlot slot="sidebar2" />}
        </div>
      </aside>
    </div>
  );
}

export type { AdSlotId };
