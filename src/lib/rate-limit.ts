type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Minimal in-memory rate limiter — best-effort for a single-instance deployment.
 * For multi-instance: replace with Upstash Redis or Vercel KV.
 */
export function rateLimit(key: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (b.count >= max) return { ok: false, remaining: 0, retryAfter: b.resetAt - now };
  b.count += 1;
  return { ok: true, remaining: max - b.count };
}
