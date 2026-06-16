"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * BrandIntroduction Component.
 * Renders the primary text introduction of the brand,
 * highlighting high quality manufacturing and custom solutions.
 */
export default function BrandIntroduction() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-[#FAF9F5] py-20 px-6 font-arone text-center border-y border-gray-100">
      <div className="mx-auto max-w-200">

        {/* Red Brand Subtitle */}
        <span className="font-kanit text-[15px] font-bold uppercase tracking-wider text-brand-red">
          {t("brandIntro.subtitle")}
        </span>

        {/* Core Segment Heading */}
        <h2 className="font-kanit mt-3 text-[32px] font-bold leading-tight text-neutral-900 md:text-[42px] tracking-tight">
          {t("brandIntro.title")}
        </h2>

        {/* Detailed Copy Text */}
        <p className="mt-8 text-[16.5px] leading-relaxed text-neutral-600 md:text-[18px]">
          {t("brandIntro.description")}
        </p>

      </div>
    </section>
  );
}
