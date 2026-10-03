import { getAnalyticsPreference } from "./analytics-config";

export function trackInquiryEvent(event: "generate_lead" | "inquiry_error" | "booking_link_click" | "inquiry_start" | "inquiry_step", parameters: { source_type?: string; page_path?: string; step_number?: number } = {}) {
  // Analytics must never turn a successfully accepted enquiry into an error.
  try {
    if (typeof window === "undefined" || getAnalyticsPreference() !== "granted") return;
    const browser = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void };
    browser.gtag?.("event", event, parameters);
    browser.clarity?.("event", event === "inquiry_step" ? `inquiry_step_${parameters.step_number}` : event);
  } catch { /* Browser storage or analytics may be unavailable. */ }
}
