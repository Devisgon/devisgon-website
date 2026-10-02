"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trackInquiryEvent } from "@/lib/analytics";
import { ANALYTICS_CONSENT_KEY, ANALYTICS_PREFERENCES_EVENT, CLARITY_PROJECT_ID, DENIED_CONSENT, GA4_MEASUREMENT_ID, analyticsPageUrl } from "@/lib/analytics-config";

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; clarity?: ((...args: unknown[]) => void) & { q?: unknown[] } };
function updateConsent(value: string) {
  const browser = window as AnalyticsWindow;
  browser.gtag?.("consent", "update", { ...DENIED_CONSENT, analytics_storage: value === "granted" ? "granted" : "denied" });
  if (!browser.clarity) browser.clarity = function (...args: unknown[]) { (browser.clarity!.q = browser.clarity!.q || []).push(args); };
  browser.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: value === "granted" ? "granted" : "denied" });
}
function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name) && !["_clck", "_clsk"].includes(name)) continue;
    const expiry = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = expiry;
    const parts = window.location.hostname.split(".");
    for (let index = 0; index < parts.length - 1; index++) document.cookie = `${expiry}; domain=.${parts.slice(index).join(".")}`;
  }
}

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  const [preferences, setPreferences] = useState(false);
  const [ready, setReady] = useState(false);
  const [clarityReady, setClarityReady] = useState(false);
  const configured = useRef(false);
  const lastPage = useRef("");
  const preferencePanel = useRef<HTMLElement>(null);
  const preferenceOpener = useRef<HTMLElement | null>(null);
  const path = usePathname();
  useEffect(() => {
    function openPreferences() {
      preferenceOpener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPreferences(true);
    }
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, []);
  useEffect(() => {
    if (preferences) preferencePanel.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [preferences]);
  function closePreferences() {
    setPreferences(false);
    preferenceOpener.current?.focus();
  }
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      setConsent(saved === "granted" || saved === "denied" ? saved : "pending");
    } catch { setConsent("pending"); }
  }, []);
  useEffect(() => { if (consent) updateConsent(consent); }, [consent]);
  useEffect(() => {
    if (!ready || consent !== "granted" || lastPage.current === path) return;
    const browser = window as AnalyticsWindow;
    const page = window.location.origin + path;
    const referrer = lastPage.current ? window.location.origin + lastPage.current : analyticsPageUrl(document.referrer);
    browser.gtag?.("set", { page_location: page, page_referrer: referrer, page_title: document.title });
    browser.gtag?.("event", "page_view", { page_location: page, page_referrer: referrer, page_title: document.title });
    lastPage.current = path;
  }, [ready, consent, path]);
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      try {
        if (new URL(link.href).hostname === "calendly.com") trackInquiryEvent("booking_link_click", { page_path: window.location.pathname });
      } catch { /* Invalid href. */ }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);
  function choose(value: "granted" | "denied") {
    updateConsent(value);
    try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { /* This choice still applies to the current page. */ }
    setConsent(value); closePreferences();
    if (value === "denied") {
      clearAnalyticsCookies();
      // Basic consent mode: after withdrawal, reload without the Google script.
      if (ready || clarityReady) window.location.reload();
    }
  }
  return <>
    {consent === "granted" && <Script id="devisgon-clarity" src={`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`} strategy="afterInteractive" onReady={() => { updateConsent("granted"); setClarityReady(true); }} />}
    {consent === "granted" && <Script id="devisgon-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="afterInteractive" onReady={() => {
      if (configured.current) return;
      const browser = window as AnalyticsWindow;
      browser.dataLayer = browser.dataLayer || [];
      if (!browser.gtag) {
        // Google requires Arguments objects in its command queue.
        // eslint-disable-next-line prefer-rest-params
        browser.gtag = function () { browser.dataLayer?.push(arguments); };
        browser.gtag("consent", "default", DENIED_CONSENT);
      }
      updateConsent("granted");
      browser.gtag("js", new Date());
      browser.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false, page_location: window.location.origin + window.location.pathname, page_referrer: analyticsPageUrl(document.referrer), allow_google_signals: false, allow_ad_personalization_signals: false });
      configured.current = true;
      setReady(true);
    }} />}
    {(consent === "pending" || preferences) && <aside id="analytics-preferences-panel" ref={preferencePanel} aria-label="Analytics preference" onKeyDown={(event) => { if (event.key === "Escape") closePreferences(); }} className="fixed top-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-xl border bg-bg-primary p-5 text-t-primary shadow-xl">
      <p className="text-sm">Allow Google Analytics and Microsoft Clarity to help us improve this website? We measure visits, enquiry steps, heatmaps and masked session replays. Your form answers and contact details are masked in recordings. <Link href="/privacy-policies" className="underline">Privacy policy</Link></p>
      <div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={() => choose("granted")} className="rounded-lg bg-btn-primary px-4 py-2 text-btn-secondary">Allow analytics</button><button type="button" onClick={() => choose("denied")} className="rounded-lg border px-4 py-2">Decline</button>{preferences && <button type="button" onClick={closePreferences} className="rounded-lg border px-4 py-2">Close</button>}</div>
    </aside>}
  </>;
}
