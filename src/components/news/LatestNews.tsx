"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Type representing a news/blog article.
 */
interface NewsBlogPost {
  id: string;
  titleKey: string;
  excerptKey: string;
  imagePath: string;
  linkHref: string;
}

// Blog posts config mapping the live site content
const NEWS_BLOG_POSTS_DATA: NewsBlogPost[] = [
  {
    id: "blog-post-1",
    titleKey: "latestNews.post1Title",
    excerptKey: "latestNews.post1Excerpt",
    imagePath: "/images/generator.webp",
    linkHref: "#blog-distribution-power-usa",
  },
  {
    id: "blog-post-2",
    titleKey: "latestNews.post2Title",
    excerptKey: "latestNews.post2Excerpt",
    imagePath: "/images/switch_giar.webp",
    linkHref: "#blog-power-excellent",
  },
  {
    id: "blog-post-3",
    titleKey: "latestNews.post3Title",
    excerptKey: "latestNews.post3Excerpt",
    imagePath: "/images/BBT.png",
    linkHref: "#blog-distribution-turkey",
  },
];

/**
 * LatestNews Component.
 * Renders a section showcasing the latest articles and publications
 */
export default function LatestNews() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="bg-white py-20 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-310">

        {/* News Section Header */}
        <div className="text-center mb-16 max-w-200 mx-auto">
          <h2 className="font-kanit text-[32px] font-bold text-neutral-900 md:text-[42px] tracking-tight">
            {t("latestNews.title")}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
            {t("latestNews.subtitle")}
          </p>
        </div>

        {/* 3-column Blog Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_BLOG_POSTS_DATA.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between border border-gray-150 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md rounded-xl"
            >

              {/* Image Container with Zoom Animation */}
              <div>
                <a href={post.linkHref} className="relative block aspect-4/3 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={post.imagePath}
                    alt={t(post.titleKey)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                {/* Article Copy Details */}
                <div className="p-6">

                  {/* Article Title */}
                  <h3 className="font-kanit text-[19px] font-bold text-neutral-900 transition-colors duration-300 hover:text-brand-red">
                    <a href={post.linkHref}>{t(post.titleKey)}</a>
                  </h3>

                  {/* Text Excerpt */}
                  <p className="mt-4 text-[14px] leading-relaxed text-gray-600">
                    {t(post.excerptKey)}
                  </p>

                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
