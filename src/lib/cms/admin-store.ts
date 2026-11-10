import type { ContentKey } from "@/lib/content/paths";
import {
  commitContentJson,
  isGithubCmsConfigured,
  readContentJson,
  writeContentJsonLocal,
} from "@/lib/github-cms";
import { GithubCmsError } from "@/lib/github-cms/errors";

export const SAVE_FLASH =
  "Zmeny boli uložené. Web sa aktualizuje (zvyčajne do 1–2 minút).";

export async function loadContent<T>(key: ContentKey) {
  return readContentJson<T>(key);
}

export async function saveContent<T>(
  key: ContentKey,
  data: T,
  message: string,
): Promise<{ commitSha: string | null; message: string }> {
  if (isGithubCmsConfigured()) {
    const result = await commitContentJson(key, data, message);
    return { commitSha: result.commitSha, message: SAVE_FLASH };
  }
  if (process.env.NODE_ENV === "production") {
    throw new GithubCmsError(
      "GitHub CMS nie je nakonfigurovaný. Nastavte GITHUB_CONTENT_TOKEN.",
      500,
    );
  }
  await writeContentJsonLocal(key, data);
  return { commitSha: null, message: "Uložené lokálne (dev bez GitHub tokenu)." };
}
