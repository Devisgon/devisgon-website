"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export default function InquiryProtection({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const callback = useRef(onToken);
  callback.current = onToken;
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const renderWidget = useCallback(() => {
    if (!sitekey || !container.current || !window.turnstile || widgetId.current !== null) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey, action: "inquiry", callback: (token: string) => callback.current(token),
      "expired-callback": () => callback.current(""), "error-callback": () => callback.current(""),
    });
  }, [sitekey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [renderWidget, resetKey]);

  return (
    <>
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {sitekey && <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderWidget} /><div ref={container} /></>}
    </>
  );
}
