// Public measurement ID supplied by the site owner; this is not a secret.
export const GA4_MEASUREMENT_ID = "G-VYTLPTGT2N";
export const CLARITY_PROJECT_ID = "yrindogf01";
export const ANALYTICS_CONSENT_KEY = "devisgon-analytics-consent-v2";
export const ANALYTICS_PREFERENCES_EVENT = "devisgon:analytics-preferences";
export const DENIED_CONSENT = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
export const CONSENT_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',${JSON.stringify(DENIED_CONSENT)});window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'});`;

export function analyticsPageUrl(value: string): string {
  try { const url = new URL(value); return url.origin + url.pathname; } catch { return ""; }
}
