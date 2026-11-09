/** Basin confirms a receipt with 2xx, or with a redirect to its thanks page. An error body is never a receipt. */
export function basinConfirmed(status: number, body: unknown): boolean {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (typeof record.error === "string" && record.error.trim()) return false;
    if (record.success === false || record.ok === false) return false;
  }
  if (status >= 200 && status < 300) return true;
  return status === 302 || status === 303;
}
