import { getAnalyticsPreference } from './analytics-config';
export type HomepageEvent = 'homepage_demo_select' | 'homepage_demo_run' | 'homepage_section_view';
export type HomepageItem = 'leads' | 'invoices' | 'support' | 'work' | 'services' | 'process';
/** Fixed identifiers only. Never collect form contents or change consent. */
export function trackHomepageEvent(event: HomepageEvent, item: HomepageItem) {
  try {
    if (typeof window === 'undefined' || getAnalyticsPreference() !== 'granted') return;
    const browser = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void };
    browser.gtag?.('event', event, { item_id: item });
    browser.clarity?.('event', `${event}_${item}`);
  } catch { /* Analytics must not interrupt the experience. */ }
}
