"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackInquiryEvent } from "@/lib/analytics";

const consentKey = "devisgon-analytics-consent";
const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const path = usePathname();
  const configured = Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));
  useEffect(() => {
    try { setConsent(window.localStorage.getItem(consentKey) || "pending"); } catch { setConsent("denied"); }
  }, []);
  useEffect(() => {
    if (!ready || consent !== "granted") return;
    const browser = window as Window & { gtag?: (...args: unknown[]) => void };
    let referrer = "";
    try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* No referrer. */ }
    browser.gtag?.("event", "page_view", { page_location: window.location.origin + path, page_referrer: referrer });
  }, [ready, consent, path]);
  useEffect(() => {
    if (!configured || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      try {
        if (new URL(link.href).hostname === "calendly.com") trackInquiryEvent("booking_link_click", { page_path: window.location.pathname });
      } catch { /* Invalid href. */ }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [configured, consent]);

  function choose(value: "granted" | "denied") {
    try { window.localStorage.setItem(consentKey, value); } catch { /* Choice still applies to this page. */ }
    setConsent(value);
  }
  if (!configured) return null;
  return (
    <>
      {consent === "granted" && <Script id="devisgon-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} onReady={() => {
        const browser = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
        browser.dataLayer = browser.dataLayer || [];
        // gtag's command queue uses an Arguments object, as specified by Google.
        // eslint-disable-next-line prefer-rest-params
        browser.gtag = function () { browser.dataLayer?.push(arguments); };
        browser.gtag("js", new Date());
        browser.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        setReady(true);
      }} />}
      {consent === "pending" && <aside aria-label="Analytics preference" className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-xl border bg-bg-primary p-5 text-t-primary shadow-xl">
        <p className="text-sm">Allow optional analytics to help us improve this website? We send page visits and enquiry events, without your form details.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" onClick={() => choose("granted")} className="rounded-lg bg-btn-primary px-4 py-2 text-btn-secondary">Allow analytics</button>
          <button type="button" onClick={() => choose("denied")} className="rounded-lg border px-4 py-2">Decline</button>
        </div>
      </aside>}
      {consent && consent !== "pending" && <button type="button" onClick={() => { try { window.localStorage.removeItem(consentKey); } catch { /* Storage unavailable. */ } window.location.reload(); }} className="fixed bottom-2 right-2 z-50 rounded border bg-bg-primary px-2 py-1 text-xs text-t-primary">Analytics preferences</button>}
    </>
  );
}
