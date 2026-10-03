// Public measurement ID supplied by the site owner; this is not a secret.
export const GA4_MEASUREMENT_ID = "G-VYTLPTGT2N";
export const CLARITY_PROJECT_ID = "yrindogf01";
// Temporary owner-requested research mode: analytics on, with a per-tab opt-out.
// A separate session key prevents old persistent choices from leaking into this mode.
export const ANALYTICS_CONSENT_KEY = "devisgon-analytics-preference-session-v3";
export const ANALYTICS_PREFERENCES_EVENT = "devisgon:analytics-preferences";
export const DENIED_CONSENT = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
export function getAnalyticsPreference(): "granted" | "denied" {
  if (typeof window === "undefined") return "denied";
  try { return window.sessionStorage.getItem(ANALYTICS_CONSENT_KEY) === "denied" ? "denied" : "granted"; }
  catch { return "granted"; }
}

export const CONSENT_BOOTSTRAP = `(function(){var preference='granted';try{if(window.sessionStorage.getItem(${JSON.stringify(ANALYTICS_CONSENT_KEY)})==='denied')preference='denied'}catch(e){}window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','default',Object.assign(${JSON.stringify(DENIED_CONSENT)},{analytics_storage:preference}));window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:preference});})();`;

export function analyticsPageUrl(value: string): string {
  try { const url = new URL(value); return url.origin + url.pathname; } catch { return ""; }
}
