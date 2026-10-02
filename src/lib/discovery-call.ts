export function getDiscoveryCallHref() {
  for (const value of [process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING, process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING]) {
    try {
      const url = new URL(value ?? "");
      if (url.protocol === "https:" && url.hostname === "calendly.com") return url.href;
    } catch { /* An unconfigured scheduler falls back to the contact page. */ }
  }
  return "/contact#book-a-call";
}
