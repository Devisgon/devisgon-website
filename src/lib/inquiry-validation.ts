export const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
export const MAX_INQUIRY_BODY_BYTES = 3 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);

export function validateInquiry(body: unknown): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "Invalid request.";
  const data = body as Record<string, unknown>;
  const limits: Record<string, number> = {
    name: 120, email: 254, phone: 30, company: 200, country: 100,
    projectType: 200, serviceName: 200, industryName: 200, sourceType: 50,
    sourcePage: 500, budget: 100, timeline: 100, projectDetail: 10000, message: 10000,
    fileName: 200, fileType: 100, website: 200, turnstileToken: 2048,
  };
  for (const [field, limit] of Object.entries(limits)) {
    const value = data[field];
    if (value !== undefined && (typeof value !== "string" || value.length > limit)) return "One or more fields are invalid or too long.";
  }
  if (typeof data.name !== "string" || !data.name.trim() ||
    typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Name and a valid email address are required.";
  }
  if (typeof data.phone === "string" && data.phone.trim() && !/^\+?[0-9\s().-]{7,20}$/.test(data.phone.trim())) return "Use a valid phone number or leave it blank.";
  if (typeof (data.projectDetail || data.message) !== "string" || !String(data.projectDetail || data.message).trim()) return "Please describe your project.";
  if (data.fileBase64 !== undefined) {
    if (typeof data.fileBase64 !== "string" || !data.fileBase64 ||
      data.fileBase64.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(data.fileBase64) ||
      Buffer.byteLength(data.fileBase64, "base64") > MAX_ATTACHMENT_BYTES ||
      !ALLOWED_ATTACHMENT_TYPES.has(String(data.fileType))) return "Attach a PNG, JPG, WEBP or PDF up to 2 MB.";
  }
  return null;
}

export async function verifyInquiryChallenge(token: unknown, secret: string, requestFetch: typeof fetch = fetch): Promise<boolean> {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const response = await requestFetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(5000),
    });
    const result = await response.json();
    return response.ok && result.success === true && result.action === "inquiry";
  } catch {
    return false;
  }
}
