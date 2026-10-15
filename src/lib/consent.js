// Cookie consent helpers for Google Consent Mode v2. public/gtag-init.js sets analytics and ads
// consent to "denied" before gtag.js runs and applies a stored "granted"; the banner
// (src/ConsentBanner.jsx) asks, stores the answer here and updates consent.
export const CONSENT_KEY = 'apex_cookie_consent'; // the same key public/gtag-init.js reads
const OPEN_EVENT = 'apex:open-cookie-settings';
const CONSENT_TYPES = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];

export function readChoice() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function saveChoice(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage blocked: the choice holds for this page view only
  }
}

export function updateConsent(granted) {
  if (typeof window.gtag !== 'function') return;
  const value = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', Object.fromEntries(CONSENT_TYPES.map((type) => [type, value])));
}

// On Reject after an earlier Accept, remove the Google Analytics / Ads first-party cookies.
export function clearGoogleCookies() {
  try {
    const host = window.location.hostname;
    const domains = ['', host, `.${host.replace(/^www\./, '')}`];
    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl_)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
      }
    }
  } catch {
    // nothing to clear
  }
}

// "Cookie settings" (footer) reopens the banner.
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
