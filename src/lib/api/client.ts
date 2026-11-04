/**
 * API client — thin fetch wrapper ready for backend integration.
 * Today: all data comes from src/lib/data/* (mock).
 * Tomorrow: flip NEXT_PUBLIC_API_BASE to a real base URL and point each
 * data getter in src/lib/api/* at an endpoint instead of the mock import.
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
export const USE_MOCK = !API_BASE;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}

type Opts = Omit<RequestInit, "body"> & { body?: unknown; query?: Record<string, string | number | boolean | undefined> };

function buildUrl(path: string, query?: Opts["query"]): string {
  const url = new URL(path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export async function apiFetch<T>(path: string, opts: Opts = {}): Promise<T> {
  const { body, query, headers, ...rest } = opts;
  const init: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(headers as Record<string, string> | undefined),
    },
  };
  if (body !== undefined) init.body = typeof body === "string" ? body : JSON.stringify(body);

  const res = await fetch(buildUrl(path, query), init);
  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); if (typeof j === "object" && j && "message" in j) msg = String((j as { message: unknown }).message); } catch { /* ignore */ }
    throw new ApiError(msg, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get:  <T>(path: string, query?: Opts["query"]) => apiFetch<T>(path, { method: "GET", query }),
  post: <T>(path: string, body?: unknown)        => apiFetch<T>(path, { method: "POST", body }),
  put:  <T>(path: string, body?: unknown)        => apiFetch<T>(path, { method: "PUT",  body }),
  del:  <T>(path: string)                        => apiFetch<T>(path, { method: "DELETE" }),
};
