import { CalculatorApp } from "@/components/CalculatorApp";
import { SeoContent } from "@/components/SeoContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <article aria-label="Rental profitability calculator">
          <CalculatorApp />
        </article>
        <SeoContent />
      </main>
      <SiteFooter />
    </>
  );
}
