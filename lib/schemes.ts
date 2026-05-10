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
    id: 'vidyasiri-scholarship',
    name: 'Vidyasiri Scholarship',
    department: 'Department of Backward Classes & Minorities Welfare',
    category: 'Education',
    state: 'Karnataka',
    officialUrl: 'https://www.myscheme.gov.in/schemes/post-matric-scholarship-for-sc-students-karnataka',
  },
  {
    id: 'sandhya-suraksha',
    name: 'Sandhya Suraksha Yojana',
    department: 'Department of Social Welfare',
    category: 'Pension',
    state: 'Karnataka',
    officialUrl: 'https://www.myscheme.gov.in/schemes/old-age-pension-karnataka',
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
