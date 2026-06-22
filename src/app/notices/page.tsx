"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

/**
 * Interface representing a notice attachment file.
 */
interface NoticeFile {
  nameEn: string;
  nameBn: string;
  url: string;
  size: string;
}

/**
 * Interface representing a complete notice record.
 */
interface Notice {
  id: string;
  refNo: string;
  publishDate: string;
  category: "tender" | "recruitment" | "general" | "certification";
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  files: NoticeFile[];
  signatoryEn: string;
  signatoryBn: string;
  designationEn: string;
  designationBn: string;
}

// Complete mock dataset for Seeco Power Limited Notices
const NOTICES_DATA: Notice[] = [
  {
    id: "N-2026-001",
    refNo: "SPL/HO/TND/2026/049",
    publishDate: "2026-06-20",
    category: "tender",
    titleEn: "Tender Notice: Procurement of Super Enameled Copper Wire for Transformer Winding",
    titleBn: "দরপত্র বিজ্ঞপ্তি: ট্রান্সফরমার উইন্ডিংয়ের জন্য সুপার এনামেলড তামার তার সংগ্রহ",
    contentEn: "Sealed tenders are invited from reputable manufacturers/suppliers for the supply of high-grade Super Enameled Copper Wire. The technical specifications and quantity details are outlined in the attached tender schedule documents. Bid submission deadline is July 15, 2026.",
    contentBn: "উচ্চ মানের সুপার এনামেলড তামার তার সরবরাহের জন্য নামী নির্মাতা/সরবরাহকারীদের কাছ থেকে সিলমোহরযুক্ত দরপত্র আহ্বান করা হচ্ছে। প্রযুক্তিগত বিবরণ এবং পরিমাণের বিশদ বিবরণ সংযুক্ত দরপত্র তফসিলে উল্লেখ করা হয়েছে। দরপত্র জমা দেওয়ার শেষ তারিখ ১৫ জুলাই, ২০২৬।",
    files: [
      { nameEn: "Tender Specifications Schedule.pdf", nameBn: "দরপত্র স্পেসিফিকেশন তফসিল.pdf", url: "/docs/tender-copper-spec.pdf", size: "1.4 MB" },
      { nameEn: "Tender Terms and Conditions.pdf", nameBn: "দরপত্র শর্তাবলী ফরম.pdf", url: "/docs/terms-conditions.pdf", size: "840 KB" }
    ],
    signatoryEn: "Engr. Monirul Islam",
    signatoryBn: "ইঞ্জি. মনিরুল ইসলাম",
    designationEn: "Head of Procurement Division, SPL",
    designationBn: "প্রধান, ক্রয় বিভাগ, এসপিএল"
  },
  {
    id: "N-2026-002",
    refNo: "SPL/HO/HR/REC/2026/088",
    publishDate: "2026-06-18",
    category: "recruitment",
    titleEn: "Recruitment Notice: Job Vacancy for Assistant Electrical Design Engineer",
    titleBn: "নিয়োগ বিজ্ঞপ্তি: সহকারী বৈদ্যুতিক ডিজাইন প্রকৌশলী পদের শূন্যতা",
    contentEn: "We are seeking a talented Assistant Electrical Design Engineer with experience in transformer design (Core, Coil, and Tank layout). Interested candidates must apply through our website or send their CV to careers@seecopowerlimited.com by July 10, 2026.",
    contentBn: "আমরা ট্রান্সফরমার ডিজাইন (কোর, কয়েল এবং ট্যাংক লেআউট) এ অভিজ্ঞ একজন প্রতিভাবান সহকারী বৈদ্যুতিক ডিজাইন প্রকৌশলী খুঁজছি। আগ্রহী প্রার্থীদের আমাদের ওয়েবসাইটের মাধ্যমে আবেদন করতে হবে অথবা ১০ জুলাই, ২০২৬ এর মধ্যে careers@seecopowerlimited.com এ সিভি পাঠাতে হবে।",
    files: [
      { nameEn: "Job Description & Requirements.pdf", nameBn: "কাজের বিবরণ এবং যোগ্যতা.pdf", url: "/docs/job-assistant-engineer.pdf", size: "1.1 MB" }
    ],
    signatoryEn: "Fariha Tabassum",
    signatoryBn: "ফারিহা তাবাসসুম",
    designationEn: "Manager, Human Resource Department",
    designationBn: "ব্যবস্থাপক, মানব সম্পদ বিভাগ"
  },
  {
    id: "N-2026-003",
    refNo: "SPL/FAC/GEN/2026/102",
    publishDate: "2026-06-15",
    category: "general",
    titleEn: "General Notice: Factory Operational Schedule Update for Eid-ul-Adha Holidays",
    titleBn: "সাধারণ নোটিশ: ঈদুল আজহার ছুটির জন্য কারখানা পরিচালনার সময়সূচী আপডেট",
    contentEn: "All departments of the Seeco Power Limited Factory will remain closed from June 26 to June 30, 2026, in observance of the holy Eid-ul-Adha. Limited security and plant maintenance personnel will remain on duty as per shifts. Normal factory operations will resume on July 1, 2026.",
    contentBn: "পবিত্র ঈদুল আজহা উপলক্ষে ২৬ জুন থেকে ৩০ জুন, ২০২৬ পর্যন্ত সিকো পাওয়ার লিমিটেড কারখানার সকল বিভাগ বন্ধ থাকবে। শিফট অনুযায়ী সীমিত নিরাপত্তা এবং প্ল্যান্ট রক্ষণাবেক্ষণ কর্মীরা দায়িত্বে থাকবেন। ১ জুলাই, ২০২৬ থেকে স্বাভাবিক কারখানার কার্যক্রম পুনরায় শুরু হবে।",
    files: [
      { nameEn: "Official Eid Holiday Circular.pdf", nameBn: "অফিসিয়াল ঈদের ছুটির নোটিশ.pdf", url: "/docs/eid-holiday-notice.pdf", size: "620 KB" }
    ],
    signatoryEn: "Asaduzzaman Chowdhury",
    signatoryBn: "আসাদুজ্জামান চৌধুরী",
    designationEn: "Factory Superintendent, SPL Plant",
    designationBn: "কারখানা সুপারিন্টেন্ডেন্ট, এসপিএল প্ল্যান্ট"
  },
  {
    id: "N-2026-004",
    refNo: "SPL/HO/TND/2026/047",
    publishDate: "2026-06-10",
    category: "tender",
    titleEn: "Tender Notice: Supply of Cold Rolled Grain Oriented (CRGO) Steel Core Sheets",
    titleBn: "দরপত্র বিজ্ঞপ্তি: কোল্ড রোল্ড গ্রেইন ওরিয়েন্টেড (সিআরজিও) স্টিল কোর শিট সরবরাহ",
    contentEn: "Reputable local and international importers/suppliers are invited to tender for the supply of CRGO Steel Core Sheets. Specific grade, thickness and magnetic loss specifications can be downloaded here. Submissions must reach the Head Office before July 05, 2026.",
    contentBn: "সিআরজিও স্টিল কোর শিট সরবরাহের জন্য সুপ্রতিষ্ঠিত স্থানীয় ও আন্তর্জাতিক আমদানিকারক/সরবরাহকারীদের কাছ থেকে দরপত্র আহ্বান করা হচ্ছে। নির্দিষ্ট গ্রেড, পুরুত্ব এবং চৌম্বকীয় হ্রাসের স্পেসিফিকেশন এখান থেকে ডাউনলোড করা যাবে। দরপত্রসমূহ আগামী ৫ জুলাই, ২০২৬ এর মধ্যে প্রধান কার্যালয়ে পৌঁছাতে হবে।",
    files: [
      { nameEn: "CRGO Core Specification Schedule.pdf", nameBn: "সিআরজিও কোর স্পেসিফিকেশন তফসিল.pdf", url: "/docs/crgo-core-spec.pdf", size: "2.3 MB" },
      { nameEn: "Tender Submission Form Part-B.pdf", nameBn: "দরপত্র জমা দেওয়ার ফরম পার্ট-বি.pdf", url: "/docs/tender-submission-b.pdf", size: "980 KB" }
    ],
    signatoryEn: "Engr. Monirul Islam",
    signatoryBn: "ইঞ্জি. মনিরুল ইসলাম",
    designationEn: "Head of Procurement Division, SPL",
    designationBn: "প্রধান, ক্রয় বিভাগ, এসপিএল"
  },
  {
    id: "N-2026-005",
    refNo: "SPL/HO/QA/2026/012",
    publishDate: "2026-06-05",
    category: "certification",
    titleEn: "Corporate Notice: Successful ISO 9001:2015 Quality Management System Certification Audit",
    titleBn: "কর্পোরেট নোটিশ: সফলভাবে আইএসও ৯০০১:২০১৫ কোয়ালিটি ম্যানেজমেন্ট সিস্টেম সার্টিফিকেশন অডিট সম্পন্ন",
    contentEn: "We are pleased to inform all stakeholders that Seeco Power Limited has successfully cleared its annual surveillance audit for ISO 9001:2015 Quality Management System standards. The audit was conducted by SGS Certification Services at both our Head Office and Factory Plant.",
    contentBn: "আমরা সকল অংশীদারদের জানাতে পেরে আনন্দিত যে সিকো পাওয়ার লিমিটেড সফলভাবে আইএসও ৯০০১:২০১৫ কোয়ালিটি ম্যানেজমেন্ট সিস্টেম মানদণ্ডের জন্য তার বার্ষিক অডিট সম্পন্ন করেছে। অডিটটি আমাদের প্রধান কার্যালয় এবং কারখানা উভয় প্ল্যান্টে এসজিএস সার্টিফিকেশন সার্ভিসেস দ্বারা পরিচালিত হয়েছিল।",
    files: [
      { nameEn: "ISO Certification Press Release.pdf", nameBn: "আইএসও সার্টিফিকেশন ক্লিয়ারেন্স প্রেস বিজ্ঞপ্তি.pdf", url: "/docs/iso-audit-clearance.pdf", size: "750 KB" }
    ],
    signatoryEn: "Faisal Ahmed",
    signatoryBn: "ফয়সাল আহমেদ",
    designationEn: "Managing Director, SPL",
    designationBn: "ব্যবস্থাপনা পরিচালক, এসপিএল"
  }
];

// Local translations config for Notice board items
const TRANSLATIONS = {
  en: {
    title: "Notices & Circulars",
    searchPlaceholder: "Search notices by title...",
    filterAll: "All Notices",
    filterTender: "Tender Notices",
    filterRecruitment: "Career / Recruitment",
    filterGeneral: "General Circulars",
    filterCert: "Certifications",
    colId: "No.",
    colTitle: "Notice Title",
    colDate: "Publish Date",
    colFiles: "Attachments",
    colAction: "Action",
    btnView: "View",
    btnDownload: "Download",
    noNotices: "No notices found matching your criteria.",
    detailsTitle: "Notice Details",
    refLabel: "Ref No:",
    signLabel: "Authorized Signature",
    downloadAll: "Download File",
    closeBtn: "Close Preview",
    viewTitle: "Official Notice Viewer",
    mockStamp: "OFFICIAL SEAL",
  },
  bn: {
    title: "নোটিশ ও সার্কুলার",
    searchPlaceholder: "শিরোনাম দিয়ে নোটিশ খুঁজুন...",
    filterAll: "সকল নোটিশ",
    filterTender: "দরপত্র বিজ্ঞপ্তি",
    filterRecruitment: "নিয়োগ বিজ্ঞপ্তি",
    filterGeneral: "সাধারণ নোটিশ",
    filterCert: "সার্টিফিকেশন",
    colId: "নং",
    colTitle: "নোটিশের শিরোনাম",
    colDate: "প্রকাশের তারিখ",
    colFiles: "ফাইল সমূহ",
    colAction: "কার্যক্রম",
    btnView: "দেখুন",
    btnDownload: "ডাউনলোড",
    noNotices: "আপনার খোঁজা ফিল্টারের সাথে মিলে এমন কোনো নোটিশ পাওয়া যায়নি।",
    detailsTitle: "নোটিশের বিস্তারিত",
    refLabel: "স্মারক নং:",
    signLabel: "অনুমোদিত স্বাক্ষর",
    downloadAll: "ফাইল ডাউনলোড করুন",
    closeBtn: "বন্ধ করুন",
    viewTitle: "অফিসিয়াল নোটিশ ভিউয়ার",
    mockStamp: "অফিসিয়াল সিল",
  }
};

/**
 * Notice Board Page Component.
 * Presents a responsive, searchable list of official documents with
 * multi-language toggle support and a visual document preview modal.
 */
export default function NoticesPage() {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const text = TRANSLATIONS[activeLang];

  // Filtering and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Notice detail expansion state
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  // PDF Preview modal state
  const [previewFile, setPreviewFile] = useState<NoticeFile | null>(null);
  const [previewNotice, setPreviewNotice] = useState<Notice | null>(null);

  // Filter logic based on category and search query input
  const filteredNotices = NOTICES_DATA.filter((notice) => {
    const title = activeLang === "bn" ? notice.titleBn : notice.titleEn;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Helper to format publish dates to local format.
   * @param dateStr - ISO date string "YYYY-MM-DD"
   */
  const formatLocalDate = (dateStr: string) => {
    if (activeLang === "en") return dateStr;
    // Map to Bengali digits
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return dateStr.replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit)]);
  };

  /**
   * Opens the document simulator preview modal.
   * @param file - Selected attachment metadata
   * @param notice - Parent notice container
   */
  const handleOpenPreview = (file: NoticeFile, notice: Notice) => {
    setPreviewFile(file);
    setPreviewNotice(notice);
  };

  /**
   * Closes the document simulator preview modal.
   */
  const handleClosePreview = () => {
    setPreviewFile(null);
    setPreviewNotice(null);
  };

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen">
      {/* Page Header Segment */}
      <PageHeader title={text.title} />

      {/* Main Container Section */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">
          
          {/* Controls Bar: Search & Category Tabs */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10 bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            {/* Real-time search bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={text.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </span>
            </div>

            {/* Category selection filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: text.filterAll },
                { id: "tender", label: text.filterTender },
                { id: "recruitment", label: text.filterRecruitment },
                { id: "general", label: text.filterGeneral },
                { id: "certification", label: text.filterCert },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={[
                    "px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all cursor-pointer",
                    selectedCategory === tab.id
                      ? "bg-brand-red text-white shadow-md shadow-red-500/10"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Wrapper */}
          {filteredNotices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-neutral-300 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className="text-[16px] text-neutral-500 font-medium">{text.noNotices}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              
              {/* Desktop Table View Layout */}
              <div className="hidden md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[14px] font-bold text-neutral-700">
                      <th className="py-4 px-6 w-16 text-center">{text.colId}</th>
                      <th className="py-4 px-6">{text.colTitle}</th>
                      <th className="py-4 px-6 w-36">{text.colDate}</th>
                      <th className="py-4 px-6 w-44">{text.colFiles}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotices.map((notice, index) => {
                      const isExpanded = expandedNoticeId === notice.id;
                      const displayTitle = activeLang === "bn" ? notice.titleBn : notice.titleEn;
                      const displayContent = activeLang === "bn" ? notice.contentBn : notice.contentEn;

                      return (
                        <>
                          {/* Main Row */}
                          <tr
                            key={notice.id}
                            onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                            className={[
                              "border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors cursor-pointer text-[15px]",
                              isExpanded ? "bg-neutral-50/30" : "",
                            ].join(" ")}
                          >
                            <td className="py-5 px-6 font-semibold text-neutral-500 text-center">
                              {activeLang === "bn" ? index + 1 : index + 1}
                            </td>
                            <td className="py-5 px-6 font-bold text-neutral-800 hover:text-brand-red transition-colors">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[12px] uppercase font-bold text-brand-red tracking-wider">
                                  {text[`filter${notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}` as keyof typeof text]}
                                </span>
                                <span>{displayTitle}</span>
                              </div>
                            </td>
                            <td className="py-5 px-6 font-medium text-neutral-600 whitespace-nowrap">
                              {formatLocalDate(notice.publishDate)}
                            </td>
                            <td className="py-5 px-6" onClick={(e) => e.stopPropagation()}>
                              <div className="flex flex-col gap-1.5">
                                {notice.files.map((file) => (
                                  <div key={file.nameEn} className="flex items-center justify-between gap-2 p-1.5 rounded-md border border-neutral-100 bg-neutral-50/50">
                                    <span className="text-[12px] font-semibold text-neutral-600 truncate max-w-32" title={activeLang === "bn" ? file.nameBn : file.nameEn}>
                                      {activeLang === "bn" ? file.nameBn : file.nameEn}
                                    </span>
                                    <div className="flex items-center gap-1 shrink-0">
                                      {/* View trigger */}
                                      <button
                                        onClick={() => handleOpenPreview(file, notice)}
                                        className="p-1 text-neutral-500 hover:text-brand-red hover:bg-white rounded-sm border border-transparent hover:border-neutral-100 shadow-sm transition-all"
                                        title={text.btnView}
                                      >
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                      </button>
                                      {/* Download trigger */}
                                      <a
                                        href={file.url}
                                        download
                                        className="p-1 text-neutral-500 hover:text-brand-red hover:bg-white rounded-sm border border-transparent hover:border-neutral-100 shadow-sm transition-all"
                                        title={text.btnDownload}
                                      >
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>

                          {/* Expansion Row */}
                          {isExpanded && (
                            <tr key={`${notice.id}-details`} className="bg-neutral-50/20 border-b border-neutral-100">
                              <td colSpan={4} className="py-6 px-10">
                                <div className="space-y-3">
                                  <h4 className="font-bold text-[14px] uppercase text-neutral-400 tracking-wider">
                                    {text.detailsTitle}
                                  </h4>
                                  <p className="text-[15px] leading-relaxed text-neutral-700 font-medium">
                                    {displayContent}
                                  </p>
                                  <div className="text-[13px] text-neutral-500 font-bold">
                                    {text.refLabel} <span className="font-mono text-neutral-800">{notice.refNo}</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List Layout */}
              <div className="block md:hidden divide-y divide-neutral-100">
                {filteredNotices.map((notice) => {
                  const displayTitle = activeLang === "bn" ? notice.titleBn : notice.titleEn;
                  const displayContent = activeLang === "bn" ? notice.contentBn : notice.contentEn;
                  const isExpanded = expandedNoticeId === notice.id;

                  return (
                    <div key={notice.id} className="p-5 space-y-4">
                      {/* Card Header information */}
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-[11px] uppercase font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-full shrink-0">
                          {text[`filter${notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}` as keyof typeof text]}
                        </span>
                        <span className="text-[12px] font-semibold text-neutral-500">
                          {formatLocalDate(notice.publishDate)}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3
                        onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                        className="font-bold text-neutral-900 leading-snug cursor-pointer hover:text-brand-red text-[16px] transition-colors"
                      >
                        {displayTitle}
                      </h3>

                      {/* Notice details if expanded */}
                      {isExpanded && (
                        <div className="p-3.5 bg-neutral-50/60 rounded-xl space-y-2.5 border border-neutral-100 animate-fade-in">
                          <p className="text-[14px] leading-relaxed text-neutral-700">
                            {displayContent}
                          </p>
                          <div className="text-[12px] text-neutral-500">
                            {text.refLabel} <span className="font-mono text-neutral-800">{notice.refNo}</span>
                          </div>
                        </div>
                      )}

                      {/* Attachment actions */}
                      <div className="space-y-2">
                        {notice.files.map((file) => (
                          <div key={file.nameEn} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-neutral-150 bg-neutral-50/30">
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-neutral-800 truncate" title={activeLang === "bn" ? file.nameBn : file.nameEn}>
                                {activeLang === "bn" ? file.nameBn : file.nameEn}
                              </p>
                              <span className="text-[11px] font-bold text-neutral-400">{file.size}</span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleOpenPreview(file, notice)}
                                className="px-3.5 py-2 text-[12px] font-semibold border border-neutral-200 rounded-lg hover:bg-neutral-100 hover:border-neutral-300 shadow-sm transition-colors cursor-pointer"
                              >
                                {text.btnView}
                              </button>
                              <a
                                href={file.url}
                                download
                                className="px-3.5 py-2 text-[12px] font-semibold bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 shadow-md transition-colors cursor-pointer"
                              >
                                {text.btnDownload}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* PDF Document Simulator Preview Modal */}
      {previewFile && previewNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-700">
            
            {/* Modal Header Panel */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-700 text-white shrink-0">
              <div>
                <h3 className="font-bold text-[16px] leading-tight flex items-center gap-2">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span>{text.viewTitle}</span>
                </h3>
                <p className="text-[12px] text-neutral-400 font-medium truncate max-w-md mt-0.5">
                  {activeLang === "bn" ? previewFile.nameBn : previewFile.nameEn}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={previewFile.url}
                  download
                  className="flex items-center gap-1.5 bg-brand-red hover:bg-red-600 text-white px-4 py-2 text-[13px] font-bold rounded-lg shadow-lg shadow-red-500/10 transition-colors cursor-pointer"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>{text.downloadAll}</span>
                </a>
                <button
                  onClick={handleClosePreview}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-lg transition-all cursor-pointer"
                  title={text.closeBtn}
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body: Custom simulated letterhead paper notice design */}
            <div className="grow overflow-y-auto p-6 bg-neutral-900/40 flex justify-center">
              <div className="w-full max-w-2xl bg-white text-black p-8 md:p-12 shadow-2xl relative border border-neutral-100 min-h-[70vh] flex flex-col justify-between font-montserrat">
                
                {/* Simulated Stamp Badge (Visual Details) */}
                <div className="absolute top-8 right-8 border-4 border-dashed border-red-500/20 text-red-500/20 text-[13px] font-extrabold uppercase p-2 pointer-events-none tracking-widest select-none rounded-md">
                  {text.mockStamp}
                </div>

                <div>
                  {/* Letterhead Banner */}
                  <div className="text-center border-b border-neutral-300 pb-6 mb-8">
                    <h2 className="font-kanit text-[24px] font-bold text-neutral-950 tracking-wider">
                      SEECO POWER LIMITED
                    </h2>
                    <p className="text-[12px] text-neutral-500 font-bold uppercase tracking-widest mt-1">
                      Manufacturer of Power & Distribution Transformers
                    </p>
                    <p className="text-[11px] text-neutral-400 font-semibold mt-0.5">
                      3rd Floor, 5 BCC Rd, Dhaka-1203 | Factory: South Keranigonj, Dhaka-1311
                    </p>
                  </div>

                  {/* Ref & Date Panel */}
                  <div className="flex justify-between items-center text-[12px] text-neutral-600 font-bold mb-8">
                    <div>
                      {text.refLabel} <span className="font-mono text-neutral-800">{previewNotice.refNo}</span>
                    </div>
                    <div>
                      {text.colDate}: <span className="text-neutral-800">{formatLocalDate(previewNotice.publishDate)}</span>
                    </div>
                  </div>

                  {/* Notice Title segment */}
                  <div className="text-center mb-8">
                    <h3 className="font-kanit text-[18px] md:text-[20px] font-bold text-neutral-900 border-b border-double border-neutral-400 pb-3 max-w-xl mx-auto leading-snug">
                      {activeLang === "bn" ? previewNotice.titleBn : previewNotice.titleEn}
                    </h3>
                  </div>

                  {/* Main Document Content paragraphs */}
                  <div className="text-[14px] md:text-[15px] leading-relaxed text-neutral-800 font-medium text-justify mb-10 whitespace-pre-line font-arone">
                    {activeLang === "bn" ? previewNotice.contentBn : previewNotice.contentEn}
                  </div>
                </div>

                {/* Signatory Footer segment */}
                <div className="flex justify-end pt-6 border-t border-neutral-200">
                  <div className="text-right space-y-1 max-w-sm">
                    {/* Simulated hand signature line */}
                    <div className="h-8 flex justify-end items-end pr-6 pointer-events-none select-none">
                      <span className="font-serif italic text-[18px] text-neutral-600 tracking-wide font-medium">
                        {activeLang === "bn" ? previewNotice.signatoryBn.slice(0, 10) : previewNotice.signatoryEn.slice(0, 10)}...
                      </span>
                    </div>
                    <div className="h-[1.5px] w-48 bg-neutral-400 ml-auto" />
                    
                    <h4 className="font-bold text-[14px] text-neutral-900 pt-1 leading-none">
                      {activeLang === "bn" ? previewNotice.signatoryBn : previewNotice.signatoryEn}
                    </h4>
                    <p className="text-[12px] text-neutral-500 font-bold leading-none">
                      {activeLang === "bn" ? previewNotice.designationBn : previewNotice.designationEn}
                    </p>
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                      Seeco Power Ltd.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer Controls Panel */}
            <div className="flex justify-end px-6 py-4 bg-neutral-950 border-t border-neutral-700 gap-3 shrink-0">
              <button
                onClick={handleClosePreview}
                className="px-5 py-2.5 rounded-lg text-[13px] font-bold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                {text.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
