import { SchemeMetadata } from './types';

/**
 * Pre-configured list of Karnataka government schemes.
 * Each entry maps a scheme ID to its metadata and official URL for scraping.
 */
export const SCHEMES: SchemeMetadata[] = [
  {
    id: 'pm-kisan-ka',
    name: 'PM-Kisan Samman Nidhi',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    state: 'Karnataka',
    officialUrl: 'https://www.myscheme.gov.in/schemes/pm-kisan',
  },
  {
    id: 'pm-jdy',
    name: 'Pradhan Mantri Jan Dhan Yojana',
    department: 'Department of Financial Services',
    category: 'Banking',
    state: 'Central',
    officialUrl: 'https://www.myscheme.gov.in/schemes/pmjdy',
  },
  {
    id: 'pm-sby',
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    department: 'Department of Financial Services',
    category: 'Insurance',
    state: 'Central',
    officialUrl: 'https://www.myscheme.gov.in/schemes/pmsby',
  },
];

/**
 * Look up a scheme by its unique ID.
 * @param id - The scheme identifier (e.g., "pm-kisan-ka")
 * @returns The matching SchemeMetadata object, or undefined if not found.
 */
export function getSchemeById(id: string): SchemeMetadata | undefined {
  return SCHEMES.find((scheme) => scheme.id === id);
}
