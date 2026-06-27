/**
 * Typed interfaces for structured policy page data.
 */
export interface PolicyListGroup {
  subtitle?: string;
  items: string[];
}

export interface PolicySection {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: PolicyListGroup[];
}

export interface PolicyContent {
  title: string;
  companyName: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: PolicySection[];
  footerNote: string;
}

/**
 * Parses a Markdown string into a structured PolicyContent object.
 * - `# Heading` lines become sections (title + auto-generated id).
 * - `- item` / `* item` lines become list items within the nearest list group.
 * - Plain text lines become paragraphs for the current section.
 *
 * @param markdown     - The raw Markdown string to parse.
 * @param defaultTitle - Fallback title for the page.
 * @returns            Structured PolicyContent ready for rendering.
 */
export function parseMarkdownToPolicy(markdown: string, defaultTitle: string): PolicyContent {
  const sections: PolicySection[] = [];
  const lines = (markdown || "").split("\n");
  let currentSection: PolicySection | null = null;
  let currentList: PolicyListGroup | null = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith("#")) {
      // Flush previous section
      if (currentSection) {
        if (currentList) {
          currentSection.lists!.push(currentList);
          currentList = null;
        }
        sections.push(currentSection);
      }
      const title = line.replace(/^#+\s*/, "");
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      currentSection = { id, title, paragraphs: [], lists: [] };
    } else if (line.startsWith("-") || line.startsWith("*")) {
      // List item
      if (currentSection) {
        if (!currentList) {
          currentList = { items: [] };
        }
        currentList.items.push(line.replace(/^[-*]\s*/, ""));
      }
    } else {
      // Paragraph text
      if (currentSection) {
        if (currentList) {
          currentSection.lists!.push(currentList);
          currentList = null;
        }
        currentSection.paragraphs.push(line);
      }
    }
  }

  // Flush last section
  if (currentSection) {
    if (currentList) {
      currentSection.lists!.push(currentList);
    }
    sections.push(currentSection);
  }

  return {
    title: defaultTitle,
    companyName: "SEECO Power Limited",
    effectiveDateLabel: "Effective Date",
    effectiveDate: "June 01, 2026",
    lastUpdatedLabel: "Last Updated",
    lastUpdated: "June 20, 2026",
    sections,
    footerNote: "",
  };
}

/**
 * Serializes a structured PolicyContent object back to Markdown format.
 * Reverses parseMarkdownToPolicy for storage in the database.
 *
 * @param data - The structured PolicyContent to serialize.
 * @returns    A Markdown string representation.
 */
export function serializePolicyToMarkdown(data: PolicyContent): string {
  let md = "";
  if (!data || !data.sections) return md;
  for (const section of data.sections) {
    md += `# ${section.title}\n`;
    for (const para of section.paragraphs || []) {
      md += `${para}\n\n`;
    }
    for (const listGroup of section.lists || []) {
      if (listGroup.subtitle) {
        md += `### ${listGroup.subtitle}\n`;
      }
      for (const item of listGroup.items || []) {
        md += `- ${item}\n`;
      }
      md += `\n`;
    }
  }
  return md.trim();
}
