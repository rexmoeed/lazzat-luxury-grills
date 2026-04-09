type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __lazzatRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore = globalThis.__lazzatRateLimitStore ?? new Map<string, RateLimitEntry>();
globalThis.__lazzatRateLimitStore = rateLimitStore;

const suspiciousUserAgentPattern = /bot|crawler|spider|curl|wget|python|axios|node-fetch|httpclient|go-http-client|headless|selenium|playwright|phantom|scrapy|postman|insomnia/i;
const supportedOrigins = new Set([
  "https://lazzat.ca",
  "https://www.lazzat.ca",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
]);

export const json = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      ...headers,
    },
  });
};

export const noStoreHeaders = (): HeadersInit => ({
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
});

export const staleWhileRevalidateHeaders = (
  sMaxAgeSeconds: number,
  staleWhileRevalidateSeconds: number,
  browserMaxAgeSeconds = 0
): HeadersInit => ({
  "Cache-Control": `public, max-age=${browserMaxAgeSeconds}, s-maxage=${sMaxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`,
});

export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
};

export const getUserAgent = (request: Request): string => {
  return request.headers.get("user-agent")?.trim() || "unknown";
};

export const isSuspiciousUserAgent = (userAgent: string): boolean => {
  return userAgent === "unknown" || suspiciousUserAgentPattern.test(userAgent);
};

export const isAllowedOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  return supportedOrigins.has(origin);
};

export const applyRateLimit = ({ key, limit, windowMs }: RateLimitOptions): RateLimitResult => {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  return {
    allowed: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
    retryAfter,
  };
};

export const logRequest = (event: string, details: Record<string, unknown>) => {
  console.info(`[lazzat-api] ${event}`, JSON.stringify(details));
};

export const logBlockedRequest = (event: string, details: Record<string, unknown>) => {
  console.warn(`[lazzat-api] ${event}`, JSON.stringify(details));
};

export const rejectIfInvalidMethod = (request: Request, allowedMethod: string) => {
  if (request.method !== allowedMethod) {
    return json({ error: "Method not allowed" }, 405, {
      Allow: allowedMethod,
    });
  }

  return null;
};

export const parseJsonBody = async <T>(request: Request, maxBytes = 12_000): Promise<T> => {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error("Payload too large");
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("Unsupported content type");
  }

  return request.json() as Promise<T>;
};

export const sanitizeText = (value: unknown, maxLength: number): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
};

export const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const validatePhone = (value: string): boolean => {
  return /^\+?1?\s?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(value);
};

export const withCommonProtection = (request: Request, routeName: string, rateLimit: { limit: number; windowMs: number }) => {
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  if (!isAllowedOrigin(request)) {
    logBlockedRequest("blocked_origin", { routeName, ip, userAgent });
    return {
      ip,
      denied: json({ error: "Forbidden" }, 403),
    };
  }

  if (isSuspiciousUserAgent(userAgent)) {
    logBlockedRequest("blocked_user_agent", { routeName, ip, userAgent });
    return {
      ip,
      denied: json({ error: "Forbidden" }, 403),
    };
  }

  const bucket = applyRateLimit({
    key: `${routeName}:${ip}`,
    limit: rateLimit.limit,
    windowMs: rateLimit.windowMs,
  });

  if (!bucket.allowed) {
    logBlockedRequest("rate_limited", {
      routeName,
      ip,
      userAgent,
      retryAfter: bucket.retryAfter,
    });

    return {
      ip,
      denied: json({ error: "Too many requests" }, 429, {
        "Retry-After": String(bucket.retryAfter),
      }),
    };
  }

  return {
    ip,
    denied: null,
  };
};
