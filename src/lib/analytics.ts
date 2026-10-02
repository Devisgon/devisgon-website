import { ANALYTICS_CONSENT_KEY } from "./analytics-config";

export function trackInquiryEvent(event: "generate_lead" | "inquiry_error" | "booking_link_click" | "inquiry_start" | "inquiry_step", parameters: { source_type?: string; page_path?: string; step_number?: number } = {}) {
  // Analytics must never turn a successfully accepted enquiry into an error.
  try {
    if (typeof window === "undefined" || window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "granted") return;
    const browser = window as Window & { gtag?: (...args: unknown[]) => void };
    browser.gtag?.("event", event, parameters);
  } catch { /* Browser storage or analytics may be unavailable. */ }
}
