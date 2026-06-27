"use client";

import { useEffect, useState, useCallback } from "react";
import { parseMarkdownToPolicy, PolicyContent } from "@/lib/policyParser";

/* ─────────────────────────────────────────────
   Syntax Guide — collapsible cheat-sheet panel
───────────────────────────────────────────── */
function SyntaxGuide({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-dash-border overflow-hidden">
      {/* Toggle header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-dash-hover-bg/20 hover:bg-dash-hover-bg/40 transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted flex items-center gap-2">
          <svg fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 text-brand-red">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          Markdown Syntax Guide
        </span>
        <svg
          fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="currentColor"
          className={`h-4 w-4 text-dash-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {/* Cheat-sheet body */}
      {open && (
        <div className="px-4 py-3 bg-dash-sidebar-bg/30 space-y-3 text-[12px]">
          <div className="grid grid-cols-2 gap-2">
            {[
              { syntax: "# 1. Section Title", result: "Creates a new section with a TOC entry" },
              { syntax: "Plain paragraph text", result: "Displayed as a body paragraph" },
              { syntax: "- List item", result: "Bullet point inside a list block" },
              { syntax: "* List item", result: "Same as above (alternative bullet)" },
            ].map(({ syntax, result }) => (
              <div key={syntax} className="bg-dash-hover-bg/30 rounded-lg p-2.5 border border-dash-border">
                <code className="block text-brand-red font-mono text-[11px] mb-1">{syntax}</code>
                <span className="text-dash-text-muted text-[11px]">{result}</span>
              </div>
            ))}
          </div>
          <p className="text-dash-text-muted text-[11px] italic border-t border-dash-border pt-2">
            💡 Tip: Leave a blank line between sections and paragraphs for better readability.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Live Preview — renders parsed Markdown content
───────────────────────────────────────────── */
function LivePreview({ markdown, label }: { markdown: string; label: string }) {
  const data: PolicyContent = markdown.trim()
    ? parseMarkdownToPolicy(markdown, label)
    : { title: label, companyName: "", effectiveDateLabel: "", effectiveDate: "", lastUpdatedLabel: "", lastUpdated: "", sections: [], footerNote: "" };

  if (!data.sections.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-48 gap-3 text-center px-4">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-dash-text-muted/30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-[12px] text-dash-text-muted/60 font-medium">
          Start typing in either editor to see a live preview here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-[13px] leading-relaxed">
      {/* Preview title */}
      <div className="pb-3 border-b border-dash-border">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted block mb-1">Preview</span>
        <h3 className="font-kanit text-[16px] font-bold text-dash-text">{data.title}</h3>
      </div>

      {/* Rendered sections */}
      {data.sections.map((section, idx) => (
        <div key={idx} className="space-y-2 pb-3 border-b border-dash-border/50 last:border-b-0">
          {/* Section heading */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-brand-red rounded-full shrink-0" />
            <h4 className="font-kanit text-[13px] font-bold text-dash-text">{section.title}</h4>
          </div>

          {/* Paragraphs */}
          {section.paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="text-[12px] text-dash-text-muted leading-relaxed pl-3.5">{para}</p>
          ))}

          {/* List groups */}
          {section.lists && section.lists.map((listGroup, lIdx) => (
            <div key={lIdx} className="pl-3.5">
              {listGroup.subtitle && (
                <p className="text-[11px] font-bold text-dash-text uppercase tracking-wide mb-1">{listGroup.subtitle}</p>
              )}
              <ul className="space-y-1">
                {listGroup.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2 text-[12px] text-dash-text-muted">
                    <span className="text-brand-red font-bold mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Policies Settings Page
───────────────────────────────────────────── */
export default function PoliciesSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /** Which policy tab is active */
  const [activeTab, setActiveTab] = useState<"privacy" | "cookie" | "terms" | "return">("privacy");

  /** Which editor (EN or BN) is currently active for the preview */
  const [activeEditor, setActiveEditor] = useState<"en" | "bn">("en");

  /** Whether the syntax guide is open */
  const [guideOpen, setGuideOpen] = useState(true);

  /** Policy Markdown strings */
  const [privacyEn, setPrivacyEn] = useState("");
  const [privacyBn, setPrivacyBn] = useState("");
  const [cookieEn, setCookieEn] = useState("");
  const [cookieBn, setCookieBn] = useState("");
  const [termsEn, setTermsEn] = useState("");
  const [termsBn, setTermsBn] = useState("");
  const [returnEn, setReturnEn] = useState("");
  const [returnBn, setReturnBn] = useState("");

  useEffect(() => {
    async function loadPolicies() {
      try {
        const res = await fetch("/api/spl-dashboard/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.siteSettings?.policies) {
            const pols = data.siteSettings.policies;
            setPrivacyEn(pols.privacyEn || "");
            setPrivacyBn(pols.privacyBn || "");
            setCookieEn(pols.cookieEn || "");
            setCookieBn(pols.cookieBn || "");
            setTermsEn(pols.termsEn || "");
            setTermsBn(pols.termsBn || "");
            setReturnEn(pols.returnEn || "");
            setReturnBn(pols.returnBn || "");
          }
        }
      } catch (err) {
        console.error("Failed to load policy settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPolicies();
  }, []);

  /** Returns [enValue, setEn, bnValue, setBn, label] for the active tab */
  const getActiveTabData = useCallback((): [string, (v: string) => void, string, (v: string) => void, string] => {
    switch (activeTab) {
      case "cookie":  return [cookieEn, setCookieEn, cookieBn, setCookieBn, "Cookie Policy"];
      case "terms":   return [termsEn,  setTermsEn,  termsBn,  setTermsBn,  "Terms of Service"];
      case "return":  return [returnEn, setReturnEn, returnBn, setReturnBn, "Return Policy"];
      default:        return [privacyEn, setPrivacyEn, privacyBn, setPrivacyBn, "Privacy Policy"];
    }
  }, [activeTab, privacyEn, privacyBn, cookieEn, cookieBn, termsEn, termsBn, returnEn, returnBn]);

  const [enValue, setEn, bnValue, setBn, tabLabel] = getActiveTabData();

  /** The Markdown shown in the live preview — whichever editor is active */
  const previewMarkdown = activeEditor === "en" ? enValue : bnValue;
  const previewLabel    = `${tabLabel}${activeEditor === "bn" ? " (বাংলা)" : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policies: { privacyEn, privacyBn, cookieEn, cookieBn, termsEn, termsBn, returnEn, returnBn },
        }),
      });
      if (res.ok) {
        setMessage("Policies saved successfully!");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save policies.");
      }
    } catch (err) {
      console.error("Error saving policies:", err);
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
      </div>
    );
  }

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "privacy", label: "Privacy Policy" },
    { key: "cookie",  label: "Cookie Policy" },
    { key: "terms",   label: "Terms of Service" },
    { key: "return",  label: "Return Policy" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="font-kanit text-[24px] font-extrabold uppercase tracking-tight text-dash-text">
          Policies Content Manager
        </h1>
        <p className="text-[12px] text-dash-text-muted font-medium">
          Write your policy content below. Use the syntax guide if you&apos;re unfamiliar with Markdown, and watch the live preview update as you type.
        </p>
      </div>

      {/* Notifications */}
      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[13px] px-4 py-3 rounded-xl font-semibold">
          ✓ {message}
        </div>
      )}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[13px] px-4 py-3 rounded-xl font-semibold">
          ✕ {error}
        </div>
      )}

      {/* Main Panel */}
      <div className="bg-dash-card-bg border border-dash-border rounded-2xl overflow-hidden">

        {/* Policy Tabs */}
        <div className="flex border-b border-dash-border bg-dash-sidebar-bg/50 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setActiveEditor("en"); setMessage(""); setError(""); }}
              className={`px-6 py-4 text-[12px] font-extrabold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "border-b-2 border-brand-red text-brand-red bg-dash-hover-bg/25"
                  : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">

          {/* Syntax Guide */}
          <SyntaxGuide open={guideOpen} onToggle={() => setGuideOpen((o) => !o)} />

          {/* 2-column layout: stacked editors left, sticky preview right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 items-start">

            {/* ── Left: Stacked EN + BN Editors ── */}
            <div className="space-y-4">

              {/* English Editor */}
              <div className="space-y-2">
                <label
                  className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    activeEditor === "en" ? "text-brand-red" : "text-dash-text-muted"
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full shrink-0 transition-colors ${activeEditor === "en" ? "bg-brand-red" : "bg-dash-border"}`} />
                  {tabLabel} — English
                </label>
                <textarea
                  rows={12}
                  value={enValue}
                  onFocus={() => setActiveEditor("en")}
                  onChange={(e) => { setEn(e.target.value); setActiveEditor("en"); }}
                  placeholder={"# 1. Introduction\nWrite your section content here...\n\n# 2. Second Section\n- List item one\n- List item two"}
                  className={`w-full bg-dash-hover-bg/30 border rounded-xl px-4 py-3 text-[12.5px] focus:outline-none text-dash-text placeholder-dash-text-muted/30 font-mono resize-y transition-colors ${
                    activeEditor === "en"
                      ? "border-brand-red/40 shadow-sm shadow-brand-red/5"
                      : "border-dash-border focus:border-brand-red/30"
                  }`}
                />
              </div>

              {/* Bangla Editor */}
              <div className="space-y-2">
                <label
                  className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    activeEditor === "bn" ? "text-brand-red" : "text-dash-text-muted"
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full shrink-0 transition-colors ${activeEditor === "bn" ? "bg-brand-red" : "bg-dash-border"}`} />
                  {tabLabel} — বাংলা
                </label>
                <textarea
                  rows={12}
                  value={bnValue}
                  onFocus={() => setActiveEditor("bn")}
                  onChange={(e) => { setBn(e.target.value); setActiveEditor("bn"); }}
                  placeholder={"# ১. ভূমিকা\nএখানে বিভাগের বিষয়বস্তু লিখুন...\n\n# ২. দ্বিতীয় বিভাগ\n- তালিকা আইটেম এক\n- তালিকা আইটেম দুই"}
                  className={`w-full bg-dash-hover-bg/30 border rounded-xl px-4 py-3 text-[12.5px] focus:outline-none text-dash-text placeholder-dash-text-muted/30 font-mono resize-y transition-colors ${
                    activeEditor === "bn"
                      ? "border-brand-red/40 shadow-sm shadow-brand-red/5"
                      : "border-dash-border focus:border-brand-red/30"
                  }`}
                />
              </div>

            </div>

            {/* ── Right: Sticky Live Preview ── */}
            <div className="space-y-2 lg:sticky lg:top-6">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500">
                  Live Preview
                </span>
                <span className="text-[10px] text-dash-text-muted ml-1">
                  ({activeEditor === "en" ? "English" : "বাংলা"})
                </span>
              </div>
              <div className="border border-dash-border rounded-xl bg-white/[0.03] p-4 overflow-y-auto max-h-[70vh]">
                <LivePreview markdown={previewMarkdown} label={previewLabel} />
              </div>
            </div>

          </div>

          {/* Save button */}
          <div className="flex justify-end pt-3 border-t border-dash-border">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-[0.98] transition-all text-[13px] cursor-pointer"
            >
              {saving ? "Saving..." : `Save ${tabLabel}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
