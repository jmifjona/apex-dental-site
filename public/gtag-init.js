// Google tag bootstrap with Google Consent Mode v2. Loaded from index.html BEFORE gtag.js, so the
// consent defaults are queued ahead of any config or event.
//
// Everything is DENIED by default: Google Analytics and Google Ads set no cookies until the visitor
// clicks Accept in the cookie banner (src/ConsentBanner.jsx). The banner stores the choice in
// localStorage under 'apex_cookie_consent' ('granted' or 'denied') and calls
// gtag('consent', 'update', ...). A stored 'granted' is applied here, before the config below, so a
// returning visitor who accepted is measured from their first page.
//
// Kept as a same-origin file rather than an inline <script> so the Content-Security-Policy can
// allow it with 'self' (no inline hashes to keep in step with every edit).
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  // While ad_storage is denied, strip ad-click identifiers from the cookieless pings.
  gtag('set', 'ads_data_redaction', true);

  var stored = null;
  try {
    stored = window.localStorage.getItem('apex_cookie_consent');
  } catch {
    // storage blocked: stay denied
  }
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }

  gtag('js', new Date());
  gtag('config', 'G-V6ZGBB6J9T');
})();
