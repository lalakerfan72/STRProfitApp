import Image from "next/image";
import { AdSlot } from "./AdSlot";

type PageHeroProps = {
  h1: string;
  intro?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
};

export function PageHero({ h1, intro, imageSrc, imageAlt, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-slate-50 px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {h1}
          </h1>
          {intro && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>
          )}
          {children}
        </div>
        {imageSrc && (
          <div className="flex shrink-0 justify-center lg:justify-end">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              width={160}
              height={120}
              className="h-auto w-32 sm:w-40"
              priority
            />
          </div>
        )}
      </div>
      <div className="mt-6 lg:hidden">
        <AdSlot slot="mobile-banner" className="mx-auto" />
      </div>
    </section>
  );
}
