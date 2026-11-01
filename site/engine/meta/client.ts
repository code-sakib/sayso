// One door to Meta's model API: adds the server-side key, retries when Meta is busy, and turns
// error bodies into messages a store owner can act on.

import { META_API_BASE, modelApiKey } from "../config.ts";

export class MetaApiError extends Error {
  readonly status: number;
  readonly detail?: string;
  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "MetaApiError";
    this.status = status;
    this.detail = detail;
  }
}

const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_ATTEMPTS = 4;
const FIRST_BACKOFF_MS = 1000;
/** Long video and long reasoning both take a while; give up after this. */
const REQUEST_TIMEOUT_MS = 10 * 60 * 1000;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function friendly(status: number): string {
  if (status === 401 || status === 403) return "The Meta API key was refused. Check MODEL_API_KEY on the server.";
  if (status === 413) return "The file is too big for the Meta API.";
  if (status === 429) return "Meta's API is busy right now. Try again in a few minutes.";
  if (status >= 500) return "Meta's API had a problem. Try again in a few minutes.";
  return "The Meta API couldn't handle this request.";
}

async function errorDetail(res: Response): Promise<string> {
  const body = await res.text().catch(() => "");
  try {
    const parsed = JSON.parse(body) as { error?: { message?: string }; message?: string };
    return parsed.error?.message ?? parsed.message ?? body.slice(0, 300);
  } catch {
    return body.slice(0, 300);
  }
}

/**
 * fetch against the Meta API. `body` is rebuilt per attempt because a FormData or stream can only
 * be sent once. Returns the successful Response; throws MetaApiError otherwise.
 */
export async function metaFetch(path: string, init: { method?: string; headers?: Record<string, string>; body?: () => BodyInit }): Promise<Response> {
  const key = modelApiKey();
  if (!key) throw new MetaApiError("The server has no Meta API key. Set MODEL_API_KEY and restart.", 0);
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${META_API_BASE}${path}`, {
      method: init.method ?? "POST",
      headers: { Authorization: `Bearer ${key}`, ...init.headers },
      body: init.body?.(),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.ok) return res;
    const detail = await errorDetail(res);
    if (!RETRY_STATUSES.has(res.status) || attempt === MAX_ATTEMPTS) {
      console.error(`[meta] ${init.method ?? "POST"} ${path} failed ${res.status}: ${detail}`);
      throw new MetaApiError(friendly(res.status), res.status, detail);
    }
    await wait(FIRST_BACKOFF_MS * 2 ** (attempt - 1));
  }
}
