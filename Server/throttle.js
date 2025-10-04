// Token bucket throttling utility (CommonJS)
// Configurable via environment variables:
// - BUCKET_EMAIL_CAPACITY (default 3)
// - BUCKET_IP_CAPACITY (default 10)
// - BUCKET_REFILL_SECONDS (default 60)

const BUCKET_EMAIL_CAPACITY = Number(process.env.BUCKET_EMAIL_CAPACITY || 3);
const BUCKET_IP_CAPACITY = Number(process.env.BUCKET_IP_CAPACITY || 10);
const BUCKET_REFILL_MS = Number(process.env.BUCKET_REFILL_SECONDS || 60) * 1000;

// In-memory bucket cache: key -> { tokens, last }
const bucketCache = new Map();

function checkTokenBucket(key, options = { capacity: 3, refillMs: 60_000 }, commit = true) {
  const now = Date.now();
  const entry = bucketCache.get(key) || { tokens: options.capacity, last: now };
  const elapsed = now - entry.last;
  if (elapsed >= options.refillMs) {
    const refillCount = Math.floor(elapsed / options.refillMs);
    entry.tokens = Math.min(options.capacity, entry.tokens + refillCount);
    entry.last = entry.last + refillCount * options.refillMs;
  }
  const allowed = entry.tokens >= 1;
  let waitSec = 0;
  if (allowed) {
    if (commit) {
      entry.tokens -= 1;
      bucketCache.set(key, entry);
    } else {
      bucketCache.set(key, entry);
    }
  } else {
    const msUntilNext = Math.max(0, options.refillMs - (now - entry.last));
    waitSec = Math.ceil(msUntilNext / 1000);
    bucketCache.set(key, entry);
  }
  return { ok: allowed, waitSec };
}

module.exports = {
  BUCKET_EMAIL_CAPACITY,
  BUCKET_IP_CAPACITY,
  BUCKET_REFILL_MS,
  checkTokenBucket,
};
