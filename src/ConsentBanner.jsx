import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  readChoice,
  saveChoice,
  updateConsent,
  clearGoogleCookies,
  onOpenCookieSettings,
} from './lib/consent.js';

// Cookie banner for Google Consent Mode v2: analytics and ads stay denied (public/gtag-init.js)
// until the visitor accepts here. Shown until a choice is stored; "Cookie settings" in the footer
// reopens it.
export default function ConsentBanner() {
  const [open, setOpen] = useState(() => {
    const choice = readChoice();
    return choice !== 'granted' && choice !== 'denied';
  });

  useEffect(() => onOpenCookieSettings(() => setOpen(true)), []);

  if (!open) return null;

  const choose = (granted) => {
    saveChoice(granted ? 'granted' : 'denied');
    updateConsent(granted);
    if (!granted) clearGoogleCookies();
    setOpen(false);
  };

  const buttonClass =
    'flex-1 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-20 lg:bottom-6 z-[60] px-4"
    >
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl">
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
            className={`${buttonClass} bg-amber-400 text-slate-950 hover:bg-amber-300`}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className={`${buttonClass} bg-white text-slate-950 hover:bg-slate-100`}
          >
            Reject
          </button>
        </div>
      </div>
    </section>
  );
}
