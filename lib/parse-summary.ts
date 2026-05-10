import { SchemeSummary } from './types';

const FALLBACK_TEXT = 'Information not clearly available on official page.';

/**
 * Parse raw markdown content from a scraped scheme page into a structured SchemeSummary.
 * Uses keyword-based heuristics to identify sections.
 */
export function parseSummary(rawMarkdown: string): SchemeSummary {
  const summary: SchemeSummary = {
    overview: [],
    eligibility: [],
    documents: [],
    steps: [],
  };

  // Normalize the markdown
  const content = rawMarkdown.replace(/\r\n/g, '\n').trim();

  // Split into sections by headings (## or ### or bold **Section**)
  const sections = splitIntoSections(content);

  // Try to match sections to our categories
  for (const section of sections) {
    const titleLower = section.title.toLowerCase();
    const bullets = extractBulletPoints(section.body);

    if (matchesOverview(titleLower)) {
      summary.overview.push(...bullets);
    } else if (matchesEligibility(titleLower)) {
      summary.eligibility.push(...bullets);
    } else if (matchesDocuments(titleLower)) {
      summary.documents.push(...bullets);
    } else if (matchesSteps(titleLower)) {
      summary.steps.push(...bullets);
    }
  }

  // If no sections matched, try to extract from the full content
  if (summary.overview.length === 0 && summary.eligibility.length === 0 &&
      summary.documents.length === 0 && summary.steps.length === 0) {
    // Attempt line-by-line extraction from the full text
    const allBullets = extractBulletPoints(content);
    if (allBullets.length > 0) {
      // Distribute first few bullets as overview
      summary.overview = allBullets.slice(0, Math.min(4, allBullets.length));
    }
  }

  // Apply fallbacks for any empty section
  if (summary.overview.length === 0) summary.overview = [FALLBACK_TEXT];
  if (summary.eligibility.length === 0) summary.eligibility = [FALLBACK_TEXT];
  if (summary.documents.length === 0) summary.documents = [FALLBACK_TEXT];
  if (summary.steps.length === 0) summary.steps = [FALLBACK_TEXT];

  // Limit each section to reasonable length
  summary.overview = summary.overview.slice(0, 6);
  summary.eligibility = summary.eligibility.slice(0, 8);
  summary.documents = summary.documents.slice(0, 10);
  summary.steps = summary.steps.slice(0, 8);

  return summary;
}

// ---------------------------------------------------------------------------
// Section splitting
// ---------------------------------------------------------------------------

interface Section {
  title: string;
  body: string;
}

function splitIntoSections(content: string): Section[] {
  const sections: Section[] = [];

  // Match markdown headings (##, ###) or bold lines (**Title**)
  const headingRegex = /^(?:#{1,4}\s+(.+)|(?:\*\*(.+?)\*\*))$/gm;
  const matches: { title: string; index: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    matches.push({
      title: (match[1] || match[2] || '').trim(),
      index: match.index,
    });
  }

  // Extract body text between headings
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + content.substring(matches[i].index).indexOf('\n') + 1;
    const end = i + 1 < matches.length ? matches[i + 1].index : content.length;
    const body = content.substring(start, end).trim();

    sections.push({
      title: matches[i].title,
      body,
    });
  }

  // If no headings found, treat entire content as a single unnamed section
  if (sections.length === 0 && content.length > 0) {
    sections.push({ title: '', body: content });
  }

  return sections;
}

// ---------------------------------------------------------------------------
// Bullet point extraction
// ---------------------------------------------------------------------------

function extractBulletPoints(text: string): string[] {
  const lines = text.split('\n');
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines, headings, and very short lines
    if (!trimmed || trimmed.startsWith('#') || trimmed.length < 5) continue;

    // Match bullet points: -, *, •, numbered (1. 2. etc.)
    const bulletMatch = trimmed.match(/^(?:[-*•]\s+|\d+[.)]\s+)(.+)/);
    if (bulletMatch) {
      const cleaned = cleanText(bulletMatch[1]);
      if (cleaned.length >= 5) bullets.push(cleaned);
      continue;
    }

    // Match standalone sentences that look informative
    if (trimmed.length > 20 && !trimmed.startsWith('|') && !trimmed.startsWith('---')) {
      const cleaned = cleanText(trimmed);
      if (cleaned.length >= 10) bullets.push(cleaned);
    }
  }

  return bullets;
}

// ---------------------------------------------------------------------------
// Keyword matchers
// ---------------------------------------------------------------------------

function matchesOverview(title: string): boolean {
  const keywords = ['overview', 'about', 'introduction', 'description', 'summary', 'details', 'benefit', 'objective'];
  return keywords.some((kw) => title.includes(kw));
}

function matchesEligibility(title: string): boolean {
  const keywords = ['eligib', 'who can', 'criteria', 'qualification', 'condition', 'requirement'];
  return keywords.some((kw) => title.includes(kw));
}

function matchesDocuments(title: string): boolean {
  const keywords = ['document', 'papers', 'certificate', 'proof', 'attach', 'required document'];
  return keywords.some((kw) => title.includes(kw));
}

function matchesSteps(title: string): boolean {
  const keywords = ['how to apply', 'step', 'application process', 'procedure', 'apply online', 'process'];
  return keywords.some((kw) => title.includes(kw));
}

// ---------------------------------------------------------------------------
// Text cleaning
// ---------------------------------------------------------------------------

function cleanText(text: string): string {
  return text
    .replace(/\*\*/g, '')       // Remove bold markdown
    .replace(/\*/g, '')         // Remove italic markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/`([^`]+)`/g, '$1') // Remove code formatting
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim();
}
