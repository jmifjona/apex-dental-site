import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  isCookieChoiceMade,
  saveChoice,
  updateConsent,
  clearGoogleCookies,
  onOpenCookieSettings,
  announceCookieBanner,
} from './lib/consent.js';
import { useHydrated } from './lib/hydration.js';

// Cookie banner for Google Consent Mode v2: analytics and ads stay denied (public/gtag-init.js)
// until the visitor accepts here. Shown until a choice is stored; "Cookie settings" in the footer
// reopens it.
//
// The stored choice lives in the visitor's browser, so the prerendered HTML never contains the
// banner: it appears when the page's script runs (hydration), as it always has. Consent is denied
// until then either way, because public/gtag-init.js sets the default before anything else.
export default function ConsentBanner() {
  const hydrated = useHydrated();
  // null = follow the stored choice; true / false once the visitor acts in this page view.
  const [openOverride, setOpen] = useState(null);
  const open = openOverride ?? (hydrated && !isCookieChoiceMade());

  useEffect(() => onOpenCookieSettings(() => setOpen(true)), []);
  // The phone booking bar steps aside while this banner is open (src/App.jsx MobileStickyBar).
  useEffect(() => {
    if (hydrated) announceCookieBanner(open);
  }, [hydrated, open]);

  if (!open) return null;

  const choose = (granted) => {
    saveChoice(granted ? 'granted' : 'denied');
    updateConsent(granted);
    if (!granted) clearGoogleCookies();
    setOpen(false);
  };

  const buttonClass =
    'flex-1 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900';

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6"
    >
      <div className="on-dark mx-auto max-w-xl rounded-3xl border border-white/10 bg-navy-900 p-5 text-white shadow-2xl">
        <h2 id="cookie-banner-title" className="font-semibold">
          Cookies
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          May we use Google Analytics and Google Ads cookies to see how our site is used and to
          measure our adverts? They stay off unless you accept.{' '}
          <Link to="/privacy-policy" className="font-medium text-white underline">
            Privacy policy
          </Link>
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => choose(true)}
            className={`${buttonClass} bg-gold-400 text-navy-900 hover:bg-gold-300`}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className={`${buttonClass} bg-white text-navy-900 hover:bg-navy-50`}
          >
            Reject
          </button>
        </div>
      </div>
    </section>
  );
}
