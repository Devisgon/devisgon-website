"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK_TIMEOUT_MS = 10000;

function isTrackedClick(event: MouseEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function shouldTrackAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) {
    return false;
  }

  let nextUrl: URL;

  try {
    nextUrl = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (nextUrl.origin !== window.location.origin) {
    return false;
  }

  const currentPath = `${window.location.pathname}${window.location.search}`;
  const nextPath = `${nextUrl.pathname}${nextUrl.search}`;

  return currentPath !== nextPath;
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const clearLoadingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopLoading = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(false);
  }, [clearLoadingTimeout]);

  const startLoading = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(true);
    timeoutRef.current = window.setTimeout(() => setIsLoading(false), FALLBACK_TIMEOUT_MS);
  }, [clearLoadingTimeout]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isTrackedClick(event)) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");

      if (!anchor || !shouldTrackAnchor(anchor)) {
        return;
      }

      startLoading();
    };

    const handlePopState = () => startLoading();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearLoadingTimeout();
    };
  }, [clearLoadingTimeout, startLoading]);

  useEffect(() => {
    stopLoading();
  }, [pathname, search, stopLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-1 overflow-hidden bg-[#D1AFEC]/50 dark:bg-[#664282]/60">
        <div className="navigation-progress-bar h-full w-1/2 bg-btn-primary shadow-[0_0_14px_rgba(142,78,198,0.7)]" />
      </div>
      <div
        className="pointer-events-none fixed right-5 top-20 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-[#D1AFEC] bg-bg-primary/95 shadow-lg backdrop-blur dark:border-[#664282]"
        role="status"
        aria-live="polite"
      >
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D1AFEC] border-t-btn-primary dark:border-[#664282] dark:border-t-btn-primary" />
        <span className="sr-only">Loading page</span>
      </div>
    </>
  );
}
