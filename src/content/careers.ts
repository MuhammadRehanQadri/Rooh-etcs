export type CareerRole = {
  slug: string;
  title: string;
  location: string;
  department: string;
  type: "Full-time" | "Contract" | "Project-based";
  description: string;
  /**
   * ISO date (YYYY-MM-DD) the role was published. Required by Google for a
   * JobPosting rich result — a role without it is rendered on the page but
   * omitted from the structured data rather than given an invented date.
   */
  datePosted?: string;
  /** ISO date the posting closes, if the client sets one. */
  validThrough?: string;
};

/**
 * Rev 01 — the client supplied no current openings. The Careers page shows a
 * graceful empty state inviting speculative applications to hr@etcs-ksa.com.
 * Add roles here when the client provides them.
 */
export const careerRoles: CareerRole[] = [];
