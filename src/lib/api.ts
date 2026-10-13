export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }

  /** Field errors from the server's zod validation: { "coordinator.email": "..." } */
  get fields(): Record<string, string> {
    if (!Array.isArray(this.details)) return {};
    return Object.fromEntries((this.details as { path: string; message: string }[]).map((d) => [d.path, d.message]));
  }
}

type Options = Omit<RequestInit, "body"> & { body?: unknown; token?: string };

async function raw(path: string, opts: Options = {}) {
  const { body, token, headers, ...rest } = opts;
  return fetch(`${API_URL}/v1${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { "X-Team-Token": token } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

/** JSON API call. Auth is an httpOnly JWT cookie set by the server, so requests just include credentials. */
export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  let res: Response;
  try {
    res = await raw(path, opts);
  } catch {
    throw new ApiError(0, "NETWORK", "Can't reach the server. Please check your connection and try again.");
  }

  if (res.ok) return (res.status === 204 ? undefined : await res.json()) as T;

  const data = await res.json().catch(() => null);
  throw new ApiError(res.status, data?.error?.code ?? "ERROR", data?.error?.message ?? "Something went wrong.", data?.error?.details);
}

/** Download a file (PDF/CSV) from an authenticated endpoint. */
export async function download(path: string, filename: string, opts: Options = {}) {
  const res = await raw(path, opts);
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(res.status, data?.error?.code ?? "ERROR", data?.error?.message ?? "Download failed.");
  }
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const errorMessage = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong.");
