// Public measurement ID supplied by the site owner; this is not a secret.
export const GA4_MEASUREMENT_ID = "G-VYTLPTGT2N";
export const ANALYTICS_CONSENT_KEY = "devisgon-analytics-consent";
export const DENIED_CONSENT = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
export const CONSENT_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',${JSON.stringify(DENIED_CONSENT)});`;

export function analyticsPageUrl(value: string): string {
  try { const url = new URL(value); return url.origin + url.pathname; } catch { return ""; }
}
