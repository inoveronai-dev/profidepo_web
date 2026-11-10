/** Allowlisted CMS content JSON files (repo-relative). */
export const CONTENT_FILES = {
  pricing: "content/pricing.json",
} as const;

export type ContentKey = keyof typeof CONTENT_FILES;

export const CONTENT_KEYS = Object.keys(CONTENT_FILES) as ContentKey[];

export function contentRepoPath(key: ContentKey): string {
  return CONTENT_FILES[key];
}
