/**
 * Metadata for a government scheme.
 * Used in the scheme selector dropdown and for URL mapping.
 */
export interface SchemeMetadata {
  id: string;
  name: string;           // human-friendly name
  department: string;     // ministry/department label
  category: string;       // e.g. "Agriculture", "Pension", "Education"
  state: string;          // "Karnataka"
  officialUrl: string;    // URL for scraping
}

/**
 * Structured summary of a government scheme.
 * Parsed from scraped content into user-friendly sections.
 */
export interface SchemeSummary {
  overview: string[];     // bullet points explaining purpose/benefit
  eligibility: string[];  // bullet list of eligibility conditions
  documents: string[];    // bullet list of required documents
  steps: string[];        // numbered steps to apply
}

/**
 * API response shape from /api/scheme-info.
 * Always returns this shape — never raw errors or stack traces.
 */
export interface SchemeInfoResponse {
  success: boolean;
  data?: SchemeSummary;
  error?: string;
  officialUrl?: string;
}
