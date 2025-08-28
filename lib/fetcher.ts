export const API_BASE = "";

export async function jsonFetcher<T = any>(url: string): Promise<T> {
  // If API_BASE is empty, use relative path for Next.js API routes
  const apiUrl = url.startsWith("/api/") ? url : API_BASE ? `${API_BASE}${url}` : url;
  const res = await fetch(apiUrl, { headers: { "Content-Type": "application/json" } })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`)
  }
  return res.json()
}
