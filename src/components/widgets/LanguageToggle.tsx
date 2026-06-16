"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * LanguageToggle Component.
 * A premium sliding pill button to toggle between English and Bangla.
 * Features smooth transitions and hover micro-animations matching the brand style.
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center select-none bg-gray-100 p-0.5 rounded-full border border-gray-200/50 shadow-inner max-w-fit">

      {/* Sliding Highlight Indicator */}
      <span
        className={[
          "absolute top-0.5 bottom-0.5 left-0.5 w-10 rounded-full bg-brand-red transition-transform duration-300 ease-out shadow-sm",
          language === "en" ? "translate-x-0" : "translate-x-10",
        ].join(" ")}
      />

      {/* English Toggle Button */}
      <button
        onClick={() => setLanguage("en")}
        className={[
          "relative z-10 w-10 h-7 flex items-center justify-center text-[10px] font-bold uppercase rounded-full transition-colors duration-300 focus:outline-hidden",
          language === "en" ? "text-white" : "text-gray-500 hover:text-gray-800",
        ].join(" ")}
        aria-label="Switch language to English"
      >
        EN
      </button>

      {/* Bangla Toggle Button */}
      <button
        onClick={() => setLanguage("bn")}
        className={[
          "relative z-10 w-10 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-colors duration-300 focus:outline-hidden",
          language === "bn" ? "text-white font-sans" : "text-gray-500 hover:text-gray-800",
        ].join(" ")}
        aria-label="Switch language to Bangla"
      >
        বাং
      </button>
    </div>
  );
}
