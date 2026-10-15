import React, { useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import ConsultationPrep from './ConsultationPrep.jsx';
import ConsentBanner from './ConsentBanner.jsx';
import { openCookieSettings, onCookieBannerChange, isCookieChoiceMade } from './lib/consent.js';
import { trackAppointmentBookingConversion } from './lib/googleAds';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
import { brand, CLINIC_OPTIONS, CLINIC_HOURS } from './data/clinics.js';
import { blogPosts, blogPostMeta } from './data/blogPosts.js';
import { IMAGE_SIZES } from './data/imageSizes.js';
import { team } from './data/team.js';
import { priceSections } from './data/priceList.js';
import { HeadContext } from './seo/context.js';
import { buildHead, applyHead, SITE_URL } from './seo/head.js';
import { useAfterHydration, useHydrated } from './lib/hydration.js';
import {
  Phone,
  MapPin,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Star,
  ShieldCheck,
  Sparkles,
  Clock3,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Languages,
  Stethoscope,
} from 'lucide-react';

// Back to the top when the visitor moves to another page. Not on the first load: the page is
// already on screen from the prerendered HTML, so the visitor may have scrolled (or followed a
// #link) before the script arrived, and jumping back would undo that.
function ScrollToTop() {
  const { pathname } = useLocation();
  const shownPath = useRef(pathname);

  useEffect(() => {
    if (shownPath.current === pathname) return;
    shownPath.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function GoogleAdsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (typeof window.gtag !== 'function') {
        return;
      }

      const pagePath = `${location.pathname}${location.search}${location.hash}`;

      window.gtag('config', 'AW-11413798917', {
        page_path: pagePath,
        page_title: document.title,
        page_location: window.location.href,
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

// Also hand the enquiry straight to Jarvis (api/enquiry.js), so the patient gets a WhatsApp at
// once. Fire-and-forget: it never blocks or breaks the Formspree submit, which stays the email backup.
function sendToJarvis(form, formEl) {
  try {
    const data = new FormData(formEl);
    const get = (key) => {
      const v = data.get(key);
      return typeof v === 'string' ? v : '';
    };
    const id =
      window.crypto && typeof window.crypto.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    fetch('/api/enquiry', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form,
        name: get('name'),
        email: get('email'),
        phone: get('phone'),
        clinic: get('Preferred clinic'),
        service: get('service'),
        preferredDate: get('preferredDate'),
        subject: get('subject'),
        message: get('message'),
        company: get('company'),
        id,
        sent_at: new Date().toISOString(),
      }),
    }).catch(() => {});
  } catch {
    // never let this touch the Formspree submit
  }
}

// Spam trap: hidden from people (and from browser autofill), filled only by bots. First in the
// form, so Formspree's email lists it above the patient's fields.
function HoneypotField() {
  return <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />;
}

// Shared look for both forms' fields. Every field has a visible <label>; field NAMES are read by
// Formspree and by Jarvis (api/enquiry.js), so they must not change.
const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-gold-300 focus:ring-2 focus:ring-gold-300/60';
const labelClass = 'block text-sm text-slate-300 mb-1';
const optionalMark = <span className="text-slate-400"> (optional)</span>;

function FormSuccess({ title, children }) {
  const headingRef = React.useRef(null);
  useEffect(() => {
    // The form (and the button that had focus) is gone: move focus to the confirmation.
    if (headingRef.current) headingRef.current.focus();
  }, []);
  return (
    <div
      role="status"
      className="rounded-[2.5rem] bg-navy-900 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-navy-900">
        <BadgeCheck size={24} aria-hidden="true" />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-3xl font-semibold leading-tight outline-none">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-slate-300 leading-7">{children}</div>
    </div>
  );
}

function ContactFormCard() {
  const [contactState, handleContactSubmit] = useForm('myknrvqq');

  if (contactState.succeeded) {
    return (
      <FormSuccess title="Thank you">
        <p>Your message has been sent successfully. We’ll get back to you shortly.</p>
      </FormSuccess>
    );
  }

  return (
    <div className="rounded-[2.5rem] bg-navy-900 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-3xl font-semibold">Contact Us</h2>

      <form
        onSubmit={(e) => {
          sendToJarvis('contact', e.currentTarget);
          return handleContactSubmit(e);
        }}
        className="mt-8 space-y-4"
      >
        <HoneypotField />
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <input id="contact-name" type="text" name="name" autoComplete="name" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            aria-describedby="contact-phone-hint"
            className={fieldClass}
          />
          <p id="contact-phone-hint" className="mt-1 text-xs text-slate-400">
            A mobile number lets us reply on WhatsApp.
          </p>
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input id="contact-email" type="email" name="email" autoComplete="email" required className={fieldClass} />
          <ValidationError prefix="Email" field="email" errors={contactState.errors} />
        </div>

        <div>
          <label htmlFor="contact-clinic" className={labelClass}>
            Preferred clinic
          </label>
          <select
            id="contact-clinic"
            name="Preferred clinic"
            defaultValue="Either — whichever gives me the sooner appointment"
            className={fieldClass}
          >
            {CLINIC_OPTIONS.map((o) => (
              <option key={o.v} value={o.l} className="text-navy-900">
                {o.l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message{optionalMark}
          </label>
          <textarea id="contact-message" rows="5" name="message" className={fieldClass} />
          <ValidationError prefix="Message" field="message" errors={contactState.errors} />
        </div>

        <button
          type="submit"
          disabled={contactState.submitting}
          className="rounded-full bg-gold-400 text-navy-900 px-6 py-3.5 font-semibold hover:bg-gold-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
        >
          {contactState.submitting ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  );
}

function BookingFormCard({ serviceOptions }) {
  const [appointmentState, handleAppointmentSubmit] = useForm('mwvrgyay');

  useEffect(() => {
    if (appointmentState.succeeded) {
      trackAppointmentBookingConversion();
    }
  }, [appointmentState.succeeded]);

  if (appointmentState.succeeded) {
    // Truthful to what happens: Jarvis messages the patient on WhatsApp when the form carried a
    // usable mobile number; otherwise reception replies by phone or email.
    return (
      <FormSuccess title="Thank you — we will WhatsApp you shortly">
        <p>
          Your booking request has reached us. If you gave a mobile number, we will message you on
          WhatsApp to arrange your appointment. If not, we will call or email you.
        </p>
        <p>
          Need us sooner? Call{' '}
          <a href={`tel:${brand.phone}`} className="font-semibold text-white underline">
            {brand.phone}
          </a>{' '}
          or WhatsApp{' '}
          <a href={`https://wa.me/356${brand.whatsapp}`} className="font-semibold text-white underline">
            {brand.whatsapp}
          </a>
          .
        </p>
      </FormSuccess>
    );
  }

  return (
    <div className="rounded-[2.5rem] bg-navy-900 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-3xl font-semibold">Request an Appointment</h2>

      <form
        onSubmit={(e) => {
          sendToJarvis('appointment', e.currentTarget);
          return handleAppointmentSubmit(e);
        }}
        className="mt-8 space-y-4"
      >
        <HoneypotField />
        <div>
          <label htmlFor="booking-name" className={labelClass}>
            Full name
          </label>
          <input id="booking-name" type="text" name="name" autoComplete="name" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="booking-email" className={labelClass}>
            Email address
          </label>
          <input id="booking-email" type="email" name="email" autoComplete="email" required className={fieldClass} />
          <ValidationError prefix="Email" field="email" errors={appointmentState.errors} />
        </div>

        <div>
          <label htmlFor="booking-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="booking-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            aria-describedby="booking-phone-hint"
            className={fieldClass}
          />
          <p id="booking-phone-hint" className="mt-1 text-xs text-slate-400">
            A mobile number lets us reply on WhatsApp.
          </p>
        </div>

        <div>
          <label htmlFor="booking-date" className={labelClass}>
            Preferred date{optionalMark}
          </label>
          <input id="booking-date" type="date" name="preferredDate" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="booking-service" className={labelClass}>
            Service{optionalMark}
          </label>
          <select id="booking-service" name="service" className={fieldClass}>
            <option className="text-navy-900">Select Service</option>
            {serviceOptions.map((service) => (
              <option key={service} className="text-navy-900">
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="booking-subject" className={labelClass}>
            Subject{optionalMark}
          </label>
          <input id="booking-subject" type="text" name="subject" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="booking-message" className={labelClass}>
            Message{optionalMark}
          </label>
          <textarea id="booking-message" rows="5" name="message" className={fieldClass} />
          <ValidationError prefix="Message" field="message" errors={appointmentState.errors} />
        </div>

        <button
          type="submit"
          disabled={appointmentState.submitting}
          className="rounded-full bg-gold-400 text-navy-900 px-6 py-3.5 font-semibold hover:bg-gold-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
        >
          {appointmentState.submitting ? 'Sending...' : 'Send Booking Request'}
        </button>
      </form>
    </div>
  );
}

// `brand` (both clinics' identity data) now lives in src/data/clinics.js so it
// can only be edited in one place — imported at the top of this file.

const siteUrl = SITE_URL;

function localBusinessSchema(pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Apex Dental',
    url: siteUrl,
    image: `${siteUrl}/images/H1.jpg`,
    telephone: brand.phone,
    email: brand.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Trident Park, Mdina Road, Mrieħel',
      addressLocality: 'Birkirkara',
      postalCode: 'CBD 2010',
      addressCountry: 'MT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.89618,
      longitude: 14.45876,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '12:00',
        description: 'Emergency appointments only',
      },
    ],
    department: [
      {
        '@type': 'Dentist',
        name: brand.stAnnesName,
        image: `${siteUrl}/images/H1.jpg`,
        telephone: brand.phone,
        email: brand.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Level 3, Triq Kanonku Karm Pirotta',
          addressLocality: 'Birkirkara',
          postalCode: 'BKR 1111',
          addressCountry: 'MT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.9028887,
          longitude: 14.4595558,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '12:30',
          },
        ],
        url: siteUrl,
      },
    ],
    priceRange: '€€',
    // No aggregateRating here: a hard-coded rating goes stale (it said 4.9/119 while Google
    // showed 4.8/112), and Google ignores self-serving review markup on a LocalBusiness anyway.
    areaServed: 'Malta',
    sameAs: [
      'https://maps.app.goo.gl/F9LpeRvHAuzB2Qva9',
      'https://www.facebook.com/ApexDentalMedAesthetic',
      'https://www.instagram.com/apex.dental.clinic_/',
    ],
    mainEntityOfPage: pageUrl,
  };
}

function serviceSchema(name, description, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@type': 'Dentist',
      name: 'Apex Dental',
      url: siteUrl,
      telephone: brand.phone,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Malta',
    },
    url: pageUrl,
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

function articleSchema({ title, description, url, datePublished, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Apex Dental Malta',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/orislogo.png`,
      },
    },
    image: image || `${siteUrl}/images/H1.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Apex Dental Malta',
    },
  };
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

const images = {
  home: {
    H1: '/images/H1.jpg',
    H2: '/images/H2.jpg',
    H2_1280: '/images/H2-1280.jpg',
    H3: '/images/H3.jpg',
    H4: '/images/H4.jpg',
    H5: '/images/H5.jpg',
    H6: '/images/H6.jpg',
    H7: '/images/H7.jpg',
    H8: '/images/H8.jpg',
    H9: '/images/H9.jpg',
    H10: '/images/H10.jpg',
  },
  implants: {
    I1: '/images/I1.jpg',
    I2: '/images/I2.jpg',
    I3: '/images/I3.jpg',
    I4: '/images/I4.jpg',
    straumann: '/images/straumann.jpg',
  },
  aligners: {
    A1: '/images/A1.jpg',
    A2: '/images/A2.jpg',
    A3: '/images/A3.jpg',
    A4: '/images/A4.jpg',
  },
  cosmetic: {
    C1: '/images/C1.jpg',
    C2: '/images/C2.jpg',
    C3: '/images/C3.jpg',
    C4: '/images/C4.jpg',
  },
  about: {
    AB1: '/images/AB1.jpg',
    AB2: '/images/AB2.jpg',
    AB3: '/images/AB3.jpg',
  },
  contact: {
    CT1: '/images/CT1.jpg',
    CT2: '/images/CT2.jpg',
    CT3: '/images/CT3.jpg',
  },
  trust: {
    compliance: '/images/COMPLIANCE.jpg',
  },
};

// Below-the-fold image: loads lazily, decodes off the main thread, and carries its intrinsic
// width/height so the browser knows its shape before it arrives. Not for hero (LCP) images.
function LazyImg({ src, alt, className }) {
  const size = IMAGE_SIZES[src];
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      width={size ? size[0] : undefined}
      height={size ? size[1] : undefined}
    />
  );
}

function Section({ children, className = '' }) {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

function Button({
  to,
  children,
  variant = 'dark',
  external = false,
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-200';

  const variants = {
    dark: 'bg-navy-900 text-white hover:bg-navy-800',
    light: 'bg-white text-navy-900 hover:bg-ivory-100',
    outline: 'border border-navy-200 bg-white text-navy-900 hover:border-navy-900 hover:bg-ivory',
    glass: 'border border-white/25 bg-white/10 text-white hover:bg-white/15',
    gold: 'bg-gold-400 text-navy-900 hover:bg-gold-300',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={to} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

const whatsappUrl = `https://wa.me/356${brand.whatsapp}`;

// The services menu (header) - one list, shown as the desktop dropdown and the phone menu.
const SERVICE_GROUPS = [
  {
    title: 'Implant & Restorative',
    items: [
      { to: '/dental-implants/', label: 'Dental Implants' },
      { to: '/straumann-implants-malta/', label: 'Straumann Implants' },
      { to: '/all-on-4-malta/', label: 'All-on-4 Implants' },
      { to: '/all-on-6-malta/', label: 'All-on-6 Implants' },
      { to: '/crowns-and-bridgework/', label: 'Crowns & Bridgework' },
      { to: '/dental-prosthetics/', label: 'Dental Prosthetics' },
      { to: '/removable-prosthesis/', label: 'Removable Prosthesis' },
      { to: '/root-canal-treatment/', label: 'Root Canal Treatment' },
    ],
  },
  {
    title: 'Cosmetic',
    items: [
      { to: '/cosmetic-dentistry-malta', label: 'Cosmetic Dentistry' },
      { to: '/veneers/', label: 'Veneers' },
      { to: '/teeth-whitening/', label: 'Teeth Whitening' },
    ],
  },
  {
    title: 'Orthodontic',
    items: [
      { to: '/invisalign-malta/', label: 'Clear Aligners' },
      { to: '/orthodontics/', label: 'Orthodontic Treatment' },
      { to: '/fixed-braces-malta/', label: 'Fixed Braces' },
      { to: '/orthix-aligners/', label: 'Orthix (In-House Aligner)' },
      { to: '/clearcorrect-malta/', label: 'ClearCorrect' },
      { to: '/ordoline-aligners-malta/', label: 'Ordoline' },
      { to: '/cristaline-aligners-malta/', label: 'Cristaline' },
    ],
  },
  {
    title: 'Preventive',
    items: [
      { to: '/general-dentistry/', label: 'General Dentistry' },
      { to: '/dental-hygiene/', label: 'Dental Hygiene' },
      { to: '/periodontology/', label: 'Periodontology' },
    ],
  },
  {
    title: 'Urgent Care',
    items: [{ to: '/emergency-dental-service-malta/', label: 'Emergency Dentist' }],
  },
];

// Header links, in the order the site has always shown them (Services sits after About).
const NAV_BEFORE_SERVICES = [
  { to: '/', label: 'Home' },
  { to: '/about-us/', label: 'About' },
];
const NAV_AFTER_SERVICES = [
  { to: '/price-list', label: 'Prices' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact-us/', label: 'Contact' },
];

const samePath = (a, b) => a.replace(/\/+$/, '') === b.replace(/\/+$/, '');

// Whether the page is scrolled down. "Not scrolled" in the prerendered HTML and during
// hydration; the real position from the next render on.
function subscribeToScroll(onChange) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function useScrolled(threshold = 8) {
  const isScrolled = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribeToScroll, isScrolled, () => false);
}

// Sticky header: navy on white, the existing links, the phone number and the primary action.
// The menus remember the page they were opened on, so moving to another page closes them. The phone
// menu's state lives in App, because the booking bar steps aside while it is open.
function SiteHeader({ menuOpen, setMenuOpen }) {
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const [servicesPath, setServicesPath] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesButtonRef = React.useRef(null);
  const servicesOpen = servicesPath === pathname;

  useEffect(() => {
    if (!servicesOpen) return undefined;
    const close = () => setServicesPath(null);
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setServicesPath(null);
        if (servicesButtonRef.current) servicesButtonRef.current.focus();
      }
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesPath(null);
    setMobileServicesOpen(false);
  };

  const navLinkClass = (to) =>
    `relative py-2 text-[15px] font-medium transition-colors ${
      samePath(pathname, to)
        ? 'text-navy-900 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold-400'
        : 'text-navy-900/75 hover:text-navy-900'
    }`;

  const renderNavLink = (link) => (
    <Link
      key={link.to}
      to={link.to}
      onClick={closeAll}
      aria-current={samePath(pathname, link.to) ? 'page' : undefined}
      className={navLinkClass(link.to)}
    >
      {link.label}
    </Link>
  );

  const mobileLinkBase = 'block rounded-xl px-3 py-3 text-base font-medium hover:bg-ivory';
  const mobileLinkClass = `${mobileLinkBase} text-navy-900`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        scrolled ? 'border-navy-100 shadow-[0_6px_24px_-12px_rgba(15,33,64,0.25)]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeAll} className="flex min-w-0 items-center gap-3">
          <img
            src={brand.logo}
            alt="Apex Dental logo"
            width={IMAGE_SIZES[brand.logo][0]}
            height={IMAGE_SIZES[brand.logo][1]}
            className="h-10 w-auto shrink-0"
          />
          <span className="hidden min-w-0 sm:block">
            <span className="block font-semibold tracking-wide text-navy-900">{brand.name}</span>
            <span className="block text-xs text-slate-600">{brand.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {NAV_BEFORE_SERVICES.map(renderNavLink)}

          <div className="relative flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Link
              to="/services"
              onClick={closeAll}
              aria-current={samePath(pathname, '/services') ? 'page' : undefined}
              className={navLinkClass('/services')}
            >
              Services
            </Link>
            <button
              ref={servicesButtonRef}
              type="button"
              onClick={() => setServicesPath(servicesOpen ? null : pathname)}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              aria-label="Show all services"
              className="rounded-full p-1 text-navy-900/75 hover:text-navy-900"
            >
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div
                id="services-menu"
                className="absolute left-1/2 top-full mt-4 w-[min(60rem,calc(100vw-4rem))] -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-8 shadow-[0_24px_60px_-24px_rgba(15,33,64,0.35)]"
              >
                <div className="grid grid-cols-5 gap-8">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                        {group.title}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {group.items.map((item) => (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              onClick={closeAll}
                              className="text-sm leading-6 text-slate-700 hover:text-navy-900 hover:underline hover:decoration-gold-400 hover:underline-offset-4"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_AFTER_SERVICES.map(renderNavLink)}

          <a href="/contact-us/#prepare" className="py-2 text-[15px] font-medium text-gold-700 hover:text-gold-800">
            Prepare for your visit
          </a>
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy-900 hover:text-navy-700"
          >
            <Phone size={16} aria-hidden="true" className="text-gold-700" />
            {brand.phone}
          </a>
          <Button to="/appointment-booking/" variant="gold" className="px-5 py-3">
            Request an appointment
          </Button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <a
            href={`tel:${brand.phone}`}
            aria-label={`Call us on ${brand.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-ivory"
          >
            <Phone size={20} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-ivory"
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={closeAll}
          className="fixed inset-x-0 bottom-0 top-[4.5rem] bg-navy-950/30 xl:hidden"
        />
      )}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy-100 bg-white shadow-[0_24px_40px_-24px_rgba(15,33,64,0.35)] xl:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {NAV_BEFORE_SERVICES.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeAll} className={mobileLinkClass}>
                {link.label}
              </Link>
            ))}
            <Link to="/services" onClick={closeAll} className={mobileLinkClass}>
              Services
            </Link>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-navy-900 hover:bg-ivory"
            >
              <span>Browse services</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileServicesOpen && (
              <div id="mobile-services" className="mb-2 ml-3 flex flex-col gap-5 border-l border-gold-200 py-2 pl-4">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{group.title}</p>
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <Link to={item.to} onClick={closeAll} className="block py-2 text-[15px] text-slate-700 hover:text-navy-900">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {NAV_AFTER_SERVICES.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeAll} className={mobileLinkClass}>
                {link.label}
              </Link>
            ))}
            <a href="/contact-us/#prepare" onClick={closeAll} className={`${mobileLinkBase} text-gold-700`}>
              Prepare for your visit
            </a>
            <div className="mt-3 flex flex-col gap-3 border-t border-navy-100 pt-4">
              <Button to="/appointment-booking/" variant="gold" className="w-full py-4 text-base">
                Request an appointment
              </Button>
              <a
                href={`tel:${brand.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 px-6 py-3.5 text-base font-semibold text-navy-900"
              >
                <Phone size={18} aria-hidden="true" />
                Call {brand.phone}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

// Phones only: WhatsApp and Request appointment, always one thumb away. Steps aside while the
// cookie banner is open, and while anything marked data-hide-booking-bar is on screen: the booking
// and contact forms, and the homepage's own pair of these buttons (so they are never shown twice).
// The page keeps bottom padding (App) so the bar never covers the last lines of content.
function MobileStickyBar({ menuOpen }) {
  const { pathname } = useLocation();
  const hydrated = useHydrated();
  // The cookie choice is stored in the visitor's browser, so the prerendered HTML has no bar; it
  // appears on hydration (as it always appeared once the script ran) unless the banner is open.
  const [bannerOpenEvent, setBannerOpen] = useState(null);
  const bannerOpen = bannerOpenEvent ?? (!hydrated || !isCookieChoiceMade());
  const [formInViewOn, setFormInViewOn] = useState(null);

  useEffect(() => onCookieBannerChange(setBannerOpen), []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-booking-bar]');
    if (!targets.length || typeof window.IntersectionObserver !== 'function') return undefined;
    const visible = new Set();
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setFormInViewOn(visible.size ? pathname : null);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (menuOpen || bannerOpen || formInViewOn === pathname) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] shadow-[0_-8px_30px_-12px_rgba(15,33,64,0.25)] md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={whatsappUrl}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy-200 bg-white text-[15px] font-semibold text-navy-900"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          to="/appointment-booking/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-gold-400 px-3 text-center text-[15px] font-semibold leading-tight text-navy-900"
        >
          Request appointment
        </Link>
      </div>
    </div>
  );
}

function WhatsAppFloat() {
  const hydrated = useHydrated();
  const [showTooltip, setShowTooltip] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      {/* The tooltip shows for the first 5 seconds once the script runs (not in the prerendered HTML). */}
      {hydrated && showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 whitespace-nowrap rounded-2xl bg-navy-900 px-4 py-2 text-sm text-white shadow-lg">
          Chat with us on WhatsApp
          <div className="absolute bottom-[-6px] right-5 h-3 w-3 rotate-45 bg-navy-900" />
        </div>
      )}
      <a
        href={`${whatsappUrl}?text=Hi%20Apex%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 shadow-[0_12px_30px_-10px_rgba(15,33,64,0.6)] ring-1 ring-white/20 transition-colors hover:bg-navy-800"
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

function SplitEditorial({
  imageLeft,
  title,
  text,
  points = [],
  dark = false,
  reverse = false,
}) {
  const wrapper = dark ? 'bg-navy-900 text-white' : 'bg-ivory text-navy-900';
  const textClass = dark ? 'text-slate-300' : 'text-slate-600';
  const pointClass = dark ? 'text-slate-200' : 'text-slate-700';

  return (
    <section className={wrapper}>
      <Section className="py-20">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="relative">
            <div
              className={`rounded-[2.5rem] overflow-hidden ${
                dark ? 'border border-white/10' : 'border border-slate-200'
              } shadow-xl`}
            >
              <LazyImg src={imageLeft} alt={title} className="w-full h-[520px] object-cover" />
            </div>
          </div>

          <div>
            <div
              className={`text-sm uppercase tracking-[0.25em] ${
                dark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Apex Dental
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              {title}
            </h2>
            <p className={`mt-6 text-lg leading-8 ${textClass}`}>{text}</p>

            {points.length > 0 && (
              <div className="mt-8 grid gap-4">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <BadgeCheck
                      className={
                        dark
                          ? 'text-gold-300 mt-1 shrink-0'
                          : 'text-gold-700 mt-1 shrink-0'
                      }
                      size={20}
                    />
                    <p className={`${pointClass} leading-7`}>{point}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </section>
  );
}

function CTASection({ dark = false, title, text }) {
  return (
    <section
      className={
        dark
          ? 'bg-navy-900 text-white py-20'
          : 'bg-ivory text-navy-900 py-20'
      }
    >
      <Section>
        <div
          className={`rounded-[2.5rem] p-8 md:p-12 ${
            dark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white border border-slate-200 shadow-sm'
          }`}
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                {title}
              </h2>
              <p
                className={`mt-5 text-lg leading-8 ${
                  dark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {text}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact-us/" variant={dark ? 'gold' : 'dark'}>
                Book Appointment
              </Button>
              <Button
                to={`tel:${brand.phone}`}
                variant={dark ? 'glass' : 'outline'}
                external
              >
                Call {brand.phone}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}


function FAQSection({ faqs, dark = false }) {
  const [open, setOpen] = React.useState(null);
  const bg = dark ? 'bg-navy-900 text-white' : 'bg-ivory text-navy-900';
  const itemBg = dark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200';
  const textColor = dark ? 'text-slate-300' : 'text-slate-600';
  return (
    <section className={bg}>
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
          <div className={`text-sm uppercase tracking-[0.25em] text-center mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 leading-tight">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-2xl border ${itemBg} overflow-hidden`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-lg"
                >
                  <span>{faq.q}</span>
                  <span className={`text-2xl transition-transform shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {open === i && (
                  <div className={`px-6 pb-6 ${textColor} leading-8 text-base`}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

function ProcessSteps({ steps, dark = false }) {
  const bg = dark ? 'bg-navy-900 text-white' : 'bg-white text-navy-900';
  const stepBg = dark ? 'bg-white/5 border-white/10' : 'bg-ivory border-slate-200';
  const numColor = dark ? 'text-gold-300' : 'text-gold-700';
  return (
    <section className={bg}>
      <Section className="py-20">
        <div className={`text-sm uppercase tracking-[0.25em] mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Treatment Process
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 leading-tight max-w-2xl">
          What to expect, step by step
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className={`rounded-2xl border ${stepBg} p-6`}>
              <div className={`text-4xl font-bold ${numColor} mb-4`}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className={`text-sm leading-7 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{step.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}

function PricingHint({ items, note }) {
  return (
    <section className="bg-white py-20">
      <Section>
        <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Pricing Guide</div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 leading-tight mb-6">
              Transparent pricing — no surprises
            </h2>
            <p className="text-slate-600 leading-8 mb-8">{note}</p>
            <Button to="/price-list/" variant="dark">View full price list</Button>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
                <span className="text-slate-700 font-medium">{item.label}</span>
                <span className="text-navy-900 font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

// Both clinics, as the contact page describes them. Read by the homepage and the footer.
const CLINICS = [
  {
    key: 'trident',
    name: 'Trident Park',
    tag: 'Main clinic',
    address: brand.address,
    note: null,
    hours: CLINIC_HOURS.trident,
    sunday: 'For Sunday emergencies call or WhatsApp us directly.',
    map: brand.googleMaps,
  },
  {
    key: 'stannes',
    name: brand.stAnnesName,
    tag: 'Level 3',
    address: brand.addressStAnnes,
    note: 'An independent Apex Dental practice on Level 3.',
    hours: CLINIC_HOURS.stannes,
    sunday: 'For Sunday emergencies please contact Trident Park.',
    map: brand.googleMapsStAnnes,
  },
];

const FOOTER_TREATMENT_LINKS = [
  { to: '/dental-implants/', label: 'Dental Implants' },
  { to: '/invisalign-malta/', label: 'Clear Aligners' },
  { to: '/cosmetic-dentistry-malta', label: 'Cosmetic Dentistry' },
  { to: '/general-dentistry/', label: 'General Dentistry' },
  { to: '/dental-hygiene/', label: 'Dental Hygiene' },
  { to: '/veneers/', label: 'Veneers' },
  { to: '/teeth-whitening/', label: 'Teeth Whitening' },
  { to: '/crowns-and-bridgework/', label: 'Crowns & Bridgework' },
  { to: '/periodontology/', label: 'Periodontology' },
  { to: '/orthodontics/', label: 'Orthodontic Treatment' },
  { to: '/dental-prosthetics/', label: 'Dental Prosthetics' },
  { to: '/removable-prosthesis/', label: 'Removable Prosthesis' },
  { to: '/root-canal-treatment/', label: 'Root Canal Treatment' },
  { to: '/emergency-dental-service-malta/', label: 'Emergency Dentist' },
];

const FOOTER_PRACTICE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us/', label: 'About' },
  { to: '/blog/', label: 'Blog' },
  { to: '/appointment-booking/', label: 'Appointment Booking' },
  { to: '/price-list/', label: 'Price List' },
  { to: '/contact-us/', label: 'Contact' },
];

const currentYear = () => new Date().getFullYear();

function Footer() {
  // The build's year in the prerendered HTML (and while hydrating), the visitor's year after that.
  const year = useAfterHydration(currentYear, __BUILD_YEAR__);
  const headingClass = 'font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-300';
  const linkClass = 'text-slate-300 hover:text-white hover:underline hover:underline-offset-4';

  return (
    <footer className="on-dark bg-navy-950 text-slate-300">
      <Section className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl text-white">{brand.name}</p>
          <p className="mt-4 max-w-sm leading-7">
            Premium dental care in Malta with a focus on advanced restorative treatment, clear
            aligners, cosmetic dentistry, and a modern patient experience.
          </p>
          <ul className="mt-6 space-y-2">
            <li>
              <a href={`tel:${brand.phone}`} className={linkClass}>
                Tel: {brand.phone}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} className={linkClass}>
                WhatsApp: {brand.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className={linkClass}>
                {brand.email}
              </a>
            </li>
            <li>
              <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Find us on Google Maps &amp; read our reviews
              </a>
            </li>
          </ul>
        </div>

        {CLINICS.map((clinic) => (
          <div key={clinic.key} className="lg:col-span-4">
            <h2 className={headingClass}>
              {clinic.key === 'trident' ? 'Trident Park — main clinic' : clinic.name}
            </h2>
            <p className="mt-4 leading-7">{clinic.address}</p>
            {clinic.note && <p className="mt-1 text-sm text-slate-400">{clinic.note}</p>}
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {clinic.hours.map(([day, time]) => (
                <React.Fragment key={day}>
                  <dt className="text-slate-400">{day}</dt>
                  <dd className="text-slate-200">{time}</dd>
                </React.Fragment>
              ))}
            </dl>
            <a
              href={clinic.map}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200"
            >
              Get directions
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only">to {clinic.key === 'trident' ? 'Trident Park' : clinic.name} (opens Google Maps)</span>
            </a>
          </div>
        ))}

        <nav aria-label="Practice" className="lg:col-span-4">
          <h2 className={headingClass}>Practice</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {FOOTER_PRACTICE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Treatments" className="md:col-span-2 lg:col-span-8">
          <h2 className={headingClass}>Treatments</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
            {FOOTER_TREATMENT_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <div className="border-t border-white/10">
        <Section className="flex flex-col gap-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Apex Dental Malta. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <button type="button" onClick={openCookieSettings} className="hover:text-white">
              Cookie settings
            </button>
          </div>
        </Section>
      </div>
    </footer>
  );
}

function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white pt-16 md:pt-20 pb-20">
      <img
        src={image}
        alt={title}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-navy-900/60 to-navy-900" />
      <Section className="relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100">
            <Sparkles size={16} />
            {eyebrow}
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200 leading-8 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </Section>
    </section>
  );
}

function TextPanel({ title, text }) {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-semibold text-navy-900 leading-tight">
        {title}
      </h2>
      <p className="mt-5 text-slate-600 text-lg leading-8">{text}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Homepage ("Calm premium", 15 Oct 2026). Every word, fact, price and photo below is already on
// the site; the sections only reorder and restyle them.
// ---------------------------------------------------------------------------------------------

const eyebrowClass = 'text-xs font-semibold uppercase tracking-[0.2em] text-gold-700';
const sectionTitleClass = 'mt-4 font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]';

function SectionIntro({ eyebrow, title, children, className = '' }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={sectionTitleClass}>{title}</h2>
      {children && <p className="mt-5 text-lg leading-8 text-slate-600">{children}</p>}
    </div>
  );
}

function HomeHero() {
  const [width, height] = IMAGE_SIZES[images.home.H2];
  return (
    <section className="bg-white">
      <Section className="pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className={eyebrowClass}>Premium dental care in Malta</p>
            <h1 className="mt-5 font-display text-[2.375rem] leading-[1.1] text-navy-900 sm:text-5xl sm:leading-[1.08] xl:text-[3.5rem]">
              <span className="block">Healthy teeth.</span>{' '}
              <span className="block">Honest dentistry.</span>{' '}
              <span className="block text-balance">A clinic you will go back to.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              At Apex Dental you will find implant surgery, cosmetic and everyday dentistry, and clear
              aligners under one roof at Trident Park, with digital scanning and planning rather than
              the old putty impressions.
            </p>
            <div data-hide-booking-bar className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/appointment-booking/" variant="gold" className="px-7 py-4 text-base">
                Request an appointment
              </Button>
              <Button to={whatsappUrl} variant="outline" external className="px-7 py-4 text-base">
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp us
              </Button>
            </div>
            <p className="mt-5 text-[15px] text-slate-600">
              Or call{' '}
              <a
                href={`tel:${brand.phone}`}
                className="font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-4 hover:decoration-navy-900"
              >
                {brand.phone}
              </a>
            </p>
          </div>

          <img
            src={images.home.H2}
            srcSet={`${images.home.H2_1280} 1280w, ${images.home.H2} 1920w`}
            sizes="(min-width: 1024px) 52vw, 100vw"
            width={width}
            height={height}
            fetchPriority="high"
            alt="A dentist and dental assistant treating a patient at Apex Dental"
            className="aspect-[4/3] w-full rounded-3xl object-cover object-[38%_50%] shadow-[0_30px_60px_-30px_rgba(15,33,64,0.45)] lg:aspect-[6/5]"
          />
        </div>
      </Section>
    </section>
  );
}

const TRUST_FACTS = [
  {
    icon: MapPin,
    title: 'Two clinics in Birkirkara',
    text: 'Trident Park, Mrieħel, and St Anne’s Clinic, Level 3',
  },
  {
    icon: Stethoscope,
    title: 'Six dentists',
    text: 'Routine care, cosmetic work, gum treatment and implant surgery',
  },
  {
    icon: Languages,
    title: 'Five languages',
    text: 'Consultations in English, Italian, Spanish, Polish or German',
  },
  {
    icon: ShieldCheck,
    title: 'Straumann implants',
    text: 'Swiss-made, research-led implant system',
  },
];

function TrustStrip() {
  return (
    <section aria-label="Apex Dental at a glance" className="border-y border-ivory-200 bg-ivory">
      <Section className="py-10 lg:py-12">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {TRUST_FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <li key={fact.title} className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-700 ring-1 ring-ivory-200">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-navy-900">{fact.title}</span>
                  <span className="mt-1 block text-[15px] leading-6 text-slate-600">{fact.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>
    </section>
  );
}

const HOME_TREATMENTS = [
  {
    title: 'Dental Implants',
    to: '/dental-implants/',
    text: 'From a single missing tooth to a full arch on implants, planned and placed in-house.',
    image: images.implants.I3,
    alt: 'A Straumann BLX implant shown with its abutment and crown',
  },
  {
    title: 'All-on-4 Implants',
    to: '/all-on-4-malta/',
    text: 'A full set of fixed teeth on four implants, planned and placed by Dr Jonathan Mifsud.',
    image: images.implants.I4,
    alt: 'A Straumann BLX implant',
  },
  {
    title: 'Clear Aligners',
    to: '/invisalign-malta/',
    text: 'Clear, removable trays that straighten teeth without the metal of fixed braces.',
    image: images.aligners.A1,
    alt: 'A smiling woman holding a clear aligner',
  },
  {
    title: 'Cosmetic Dentistry',
    to: '/cosmetic-dentistry-malta',
    text: 'Whitening, veneers and bonding to improve a smile without making it look done.',
    image: images.cosmetic.C3,
    alt: 'A close-up of a smile',
  },
  {
    title: 'General Dentistry',
    to: '/general-dentistry/',
    text: 'Check-ups, fillings and the everyday care most visits are about.',
    image: images.home.H7,
    alt: 'A treatment room at Apex Dental',
  },
];

function TreatmentsOverview() {
  return (
    <section className="bg-white">
      <Section className="py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow="Treatments" title="Everything we treat, in one place">
            From routine check-ups to implants, cosmetic work, aligners and emergencies.
          </SectionIntro>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 self-start font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-[6px] hover:decoration-navy-900 lg:self-auto"
          >
            See all services <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_TREATMENTS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[0_1px_2px_rgba(15,33,64,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(15,33,64,0.35)]"
              >
                <div className="aspect-[3/2] overflow-hidden bg-ivory-100">
                  <LazyImg
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-navy-900">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                    Explore treatment
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="text-gold-700 transition-transform motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}

          <li>
            <div className="on-dark flex h-full flex-col rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Urgent care</p>
              <h3 className="mt-3 font-display text-2xl">Emergency Dentist</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Prompt help for toothache, swelling, broken teeth and knocks to the mouth.
              </p>
              <p className="mt-4 flex items-start gap-3 leading-7 text-slate-200">
                <Clock3 size={18} aria-hidden="true" className="mt-1 shrink-0 text-gold-300" />
                Open Sunday 9:00 to 12:00 for emergencies at Trident Park.
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button to={`tel:${brand.phone}`} variant="gold" external>
                  <Phone size={16} aria-hidden="true" />
                  Call {brand.phone}
                </Button>
                <Link
                  to="/emergency-dental-service-malta/"
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white hover:text-gold-200"
                >
                  About emergency care <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </Section>
    </section>
  );
}

const EXTRA_LANGUAGE = { PL: 'Polish', IT: 'Italian', ES: 'Spanish', DE: 'German' };
const LANGUAGE_BADGE = { IT: 'text-green-700', ES: 'text-red-600', PL: 'text-rose-700', DE: 'text-slate-800' };

function initialsOf(name) {
  const parts = name.replace(/^Dr\.?\s+/, '').split(/\s+/);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function TeamSection() {
  return (
    <section className="bg-ivory">
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Our dentists" title="Six dentists, five languages spoken">
              Plenty of people put off the dentist because the last place they went felt rushed or cold.
              We have tried to build the opposite — a calm space, modern equipment, and dentists who
              explain things instead of talking over your head.
            </SectionIntro>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <LazyImg
                src={images.home.H9}
                alt="The reception area at Apex Dental"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <Link
              to="/about-us/"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-[6px] hover:decoration-navy-900"
            >
              Meet the team <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid content-start gap-4 sm:grid-cols-2">
            {team.map((doctor) => (
              <li key={doctor.name} className="rounded-2xl border border-ivory-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg text-white"
                  >
                    {initialsOf(doctor.name)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug text-navy-900">{doctor.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-600">{doctor.role}</p>
                  </div>
                </div>
                {doctor.langs.length > 0 && (
                  <p className="mt-4 inline-flex rounded-full bg-ivory-100 px-3 py-1 text-sm text-navy-900">
                    Consultations also in {doctor.langs.map((code) => EXTRA_LANGUAGE[code]).join(' and ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </section>
  );
}

function ClinicsSection() {
  return (
    <section className="bg-white">
      <Section className="py-20 lg:py-28">
        <SectionIntro eyebrow="Our clinics" title="Two clinics in Birkirkara" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CLINICS.map((clinic) => (
            <article key={clinic.key} className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl text-navy-900">{clinic.name}</h3>
                <span className="rounded-full bg-ivory-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
                  {clinic.tag}
                </span>
              </div>
              <p className="mt-4 flex items-start gap-3 leading-7 text-slate-700">
                <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-gold-700" />
                <span>
                  {clinic.address}
                  {clinic.note && <span className="block text-[15px] text-slate-600">{clinic.note}</span>}
                </span>
              </p>
              <div className="mt-5 flex items-start gap-3">
                <Clock3 size={18} aria-hidden="true" className="mt-1 shrink-0 text-gold-700" />
                <div className="min-w-0 flex-1">
                  <h4 className="sr-only">Opening hours</h4>
                  <dl className="grid grid-cols-1 gap-y-1 text-[15px] leading-7 sm:grid-cols-[10rem_1fr]">
                    {clinic.hours.map(([day, time]) => (
                      <React.Fragment key={day}>
                        <dt className="font-medium text-navy-900">{day}</dt>
                        <dd className="mb-1 text-slate-600 sm:mb-0">{time}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                  <p className="mt-2 text-[15px] text-slate-600">{clinic.sunday}</p>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <a
                  href={clinic.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900 hover:bg-ivory"
                >
                  Open in Google Maps
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}

// Live Google reviews only (api/reviews.js). Nothing is shown in their place while they load, and
// if the API is not answering, the section simply links to Google - no typed-in testimonials.
function GoogleReviews() {
  const [reviews, setReviews] = useState({ status: 'loading' });

  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d && d.ok && Array.isArray(d.reviews) && d.reviews.length) setReviews({ status: 'live', data: d });
        else setReviews({ status: 'none' });
      })
      .catch(() => {
        if (active) setReviews({ status: 'none' });
      });
    return () => {
      active = false;
    };
  }, []);

  const live = reviews.status === 'live' ? reviews.data : null;
  const hasLiveRating = Boolean(live && typeof live.rating === 'number' && live.total);

  return (
    <section className="bg-ivory">
      <Section className="py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro eyebrow="Patient reviews" title="What our patients say about Apex Dental" />
          {hasLiveRating && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-0.5 text-gold-600" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} fill={i <= Math.round(live.rating) ? 'currentColor' : 'none'} />
                ))}
              </span>
              <span className="text-2xl font-semibold tabular-nums text-navy-900">{live.rating.toFixed(1)}</span>
              <span className="text-[15px] text-slate-600">from {live.total} Google reviews</span>
            </div>
          )}
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {reviews.status === 'loading' ? 'Loading reviews from Google' : ''}
        </div>

        {reviews.status === 'loading' && (
          <ul aria-hidden="true" className="mt-12 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="h-56 rounded-2xl border border-ivory-200 bg-white/70 motion-safe:animate-pulse" />
            ))}
          </ul>
        )}

        {live && (
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {live.reviews.slice(0, 3).map((review, i) => (
              <li key={`${review.name}-${i}`}>
                <figure className="flex h-full flex-col rounded-2xl border border-ivory-200 bg-white p-6">
                  <span className="flex items-center gap-0.5 text-gold-600" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill={s <= (review.rating || 5) ? 'currentColor' : 'none'} />
                    ))}
                  </span>
                  <span className="sr-only">Rated {review.rating || 5} out of 5</span>
                  <blockquote className="mt-4 flex-1 leading-7 text-slate-700">
                    <p className="line-clamp-6">{review.text}</p>
                  </blockquote>
                  <figcaption className="mt-5 border-t border-ivory-200 pt-4">
                    <span className="block font-semibold text-navy-900">{review.name}</span>
                    {review.date && <span className="block text-sm text-slate-600">{review.date} · Google review</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}

        {reviews.status !== 'loading' && (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {!live && (
              <p className="w-full text-lg leading-8 text-slate-600">
                Read more reviews on our Google Business Profile.
              </p>
            )}
            <a
              href={brand.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-[6px] hover:decoration-navy-900"
            >
              Read all reviews on Google <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={brand.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-navy-700"
            >
              Leave us a review <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </Section>
    </section>
  );
}

// Fees shown on the homepage, picked by name from the price list itself (src/data/priceList.js),
// so they can never disagree with /price-list/.
const PRICE_TEASER_ITEMS = [
  'Routine Checkup',
  'Routine Hygiene Session',
  'Implant Complete with Crown',
  'Toronto Bridge All on 4',
];

function PriceTeaser() {
  const all = priceSections.flatMap((section) => section.items);
  const items = PRICE_TEASER_ITEMS.map((name) => all.find((item) => item.name === name)).filter(Boolean);

  return (
    <section className="bg-white">
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Pricing guide" title="Transparent pricing — no surprises">
              Use the price list as a guide, then book a consultation so Apex Dental can assess your case
              properly and confirm the most suitable treatment plan.
            </SectionIntro>
            <Button to="/price-list/" variant="dark" className="mt-8">
              View the full price list
            </Button>
          </div>

          <dl className="divide-y divide-navy-100 border-y border-navy-100">
            {items.map((item) => (
              <div key={item.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="min-w-0">
                  <span className="block font-semibold text-navy-900">{item.name}</span>
                  {item.note && <span className="mt-1 block text-[15px] leading-6 text-slate-600">{item.note}</span>}
                </dt>
                <dd className="shrink-0 text-xl font-semibold tabular-nums text-navy-900">{item.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </section>
  );
}

function FinalCallToAction() {
  return (
    <section className="bg-ivory">
      <Section className="py-16 lg:py-24">
        <div className="on-dark rounded-3xl bg-navy-900 px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Ready to visit Apex Dental?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Book a visit for implants, clear aligners, cosmetic or everyday dental care, or an
              emergency. Tell us what you need and we will point you to the right starting point.
            </p>
          </div>
          <div data-hide-booking-bar className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Button to="/appointment-booking/" variant="gold" className="px-7 py-4 text-base">
              Request an appointment
            </Button>
            <Button to={whatsappUrl} variant="glass" external className="px-7 py-4 text-base">
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp us
            </Button>
            <a
              href={`tel:${brand.phone}`}
              className="py-2 text-center text-[15px] font-semibold text-slate-200 hover:text-white"
            >
              Or call {brand.phone}
            </a>
          </div>
        </div>
      </Section>
    </section>
  );
}

function HomePage() {

  return (
    <>
      <SEO
        title="Apex Dental Malta | Dental Implants, Invisalign, Veneers & Emergency Dentist"
        description="Apex Dental Malta offers dental implants, Invisalign, veneers, cosmetic dentistry, emergency dental care, hygiene, and restorative treatments in Malta."
        canonical={`${siteUrl}/`}
        schema={localBusinessSchema(`${siteUrl}/`)}
      />
      <HomeHero />
      <TrustStrip />
      <TreatmentsOverview />
      <TeamSection />
      <ClinicsSection />
      <GoogleReviews />
      <PriceTeaser />
      <FinalCallToAction />
    </>
  );
}

function ImplantsPage() {
  const implantFaqs = [
    { q: 'How long do dental implants actually last?', a: 'The implant itself is designed to be permanent. Once it has fused to the bone there is no reason it cannot last for decades. The part that wears over time is the crown on top, which you might expect to replace somewhere around the 15 to 20 year mark, much like any tooth that does a lot of chewing. What really decides the lifespan is how well you look after your gums and keep up with hygiene visits.' },
    { q: 'Will the procedure hurt?', a: 'Not during it. The area is completely numbed with local anaesthetic, so placing the implant feels like pressure rather than pain. Afterwards you can expect some swelling and tenderness for a few days, similar to having a tooth taken out, and ordinary painkillers manage it well. Most patients tell us it was easier than they had braced themselves for.' },
    { q: 'How long does the whole process take?', a: 'From placing the implant to fitting the final tooth is usually three to six months. Most of that is simply the implant healing into the bone, which cannot be rushed. Your actual chair time is only a couple of short appointments; the rest is healing you barely notice.' },
    { q: 'Am I too old, or is my bone not good enough?', a: 'Age on its own is rarely the deciding factor. What matters more is your general health and how much bone you have to work with. If the bone is thin, a graft or a sinus lift can often rebuild it before the implant goes in. The 3D scan tells us for certain, and we will be honest with you if implants are not the right choice for your case.' },
    { q: 'What do dental implants cost in Malta?', a: 'There is no single price because it depends on the case, but the consultation is free when you proceed with treatment and the 3D scan is included with surgery. A single implant costs far less than a full-arch case. Our price list sets out current figures so you can see where you stand before committing.' },
    { q: 'What is All-on-4, and do you offer it?', a: 'All-on-4 replaces a full arch of teeth on just four implants rather than one per tooth. The new teeth are fixed in permanently, often called a Toronto bridge, so they do not come out at night like a denture. We provide it for both the upper and lower jaw.' },
  ];
  const implantSteps = [
    { title: 'Consultation and 3D scan', text: 'We go through your medical history, examine your mouth, and take a CBCT scan. If there is not enough bone, this is where we would talk through grafting or a sinus lift before any implant is placed. You leave knowing whether implants suit you, what the plan looks like, and what it will cost.' },
    { title: 'Placing the implant', text: 'On the day, the area is fully numbed. The titanium implant is placed into the jaw, which for a single tooth usually takes around an hour. There are no general anaesthetics involved and you can drive yourself home afterwards.' },
    { title: 'Healing and integration', text: 'The implant now needs time to fuse with the bone, a process called osseointegration, which takes roughly three to four months. You carry on as normal during this time, and where a gap would show we can fit a temporary tooth so you are never left without one.' },
    { title: 'Fitting your new tooth', text: 'Once we have confirmed the implant is solid, we take impressions and fit the final crown, bridge or denture, colour-matched to your other teeth. From there it is cared for like any natural tooth: brush, floss, and keep up your hygiene visits.' },
  ];
  const implantPricing = [
    { label: 'Implant consultation', price: 'Free with treatment' },
    { label: '3D CBCT scan', price: 'Included with surgery' },
    { label: 'Single implant + crown', price: 'See price list' },
    { label: 'Full arch (All-on-4 / Toronto bridge)', price: 'See price list' },
    { label: 'Implant-retained denture', price: 'See price list' },
  ];
  return (
    <>
      <SEO
        title="Dental Implants Malta | Apex Dental"
        description="Apex Dental provides dental implants in Malta for single missing teeth, multiple teeth, All-on-4, and advanced restorative cases. Free consultation and 3D scan with treatment. Led by Dr Jonathan Mifsud."
        canonical={`${siteUrl}/dental-implants/`}
        image={`${siteUrl}/images/I1.jpg`}
        schemas={[
          serviceSchema('Dental Implants', 'Dental implant treatment in Malta. Single implants, All-on-4, implant-retained dentures. Free consultation and 3D scan included with treatment.', `${siteUrl}/dental-implants/`),
          faqSchema(implantFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Dental Implants', path: '/dental-implants/' }]),
        ]}
      />
      <PageHero
        image={images.implants.I1}
        eyebrow="Dental Implants Malta"
        title="Dental implants that restore how your teeth look, feel and work"
        subtitle="Missing one tooth or a whole arch, your implant treatment is planned and placed in-house by Dr Jonathan Mifsud, an implantologist at our Trident Park clinic in Malta — from the first 3D scan to the final tooth."
      />
      <SplitEditorial
        imageLeft={images.implants.I2}
        title="Why an implant beats the alternatives"
        text="A missing tooth is more than a gap. The bone that used to hold the root starts to shrink within months, the teeth on either side begin to drift, and your bite shifts onto places it was not built for. An implant is the one option that replaces the root itself — a small titanium post that fuses to the jaw — so it actually halts that bone loss rather than just hiding the space. A bridge means cutting down the healthy teeth beside the gap, and a denture rests on the gums and can move when you eat."
        points={['Leaves the neighbouring teeth untouched', 'Keeps the jawbone loaded so it does not waste away', 'Bites and feels like a real tooth, not an appliance', 'Works for a single gap or a complete arch']}
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="We plan the surgery before picking up an instrument"
        text="Every case starts with a CBCT scan, a low-dose 3D X-ray that shows your jaw in cross-section instead of the flat picture an ordinary X-ray gives. It tells us how much bone you have, exactly where the nerve and sinus sit, and the safest angle and depth for each implant. We plan the whole thing digitally first, which means fewer surprises on the day and a result we can predict with confidence. The scan is included at no extra cost when you go ahead with surgery."
        points={['Low-dose 3D imaging, not a flat X-ray', 'Shows bone, nerve and sinus position before we start', 'Implant position planned digitally in advance', 'Scan included when you proceed with treatment']}
        dark
        reverse
      />
      <ProcessSteps steps={implantSteps} />
      <SplitEditorial
        imageLeft={images.implants.I4}
        title="Replacing a whole arch with All-on-4"
        text="If you have lost most or all of your teeth, or you are worn down by a denture that slips, All-on-4 fixes a full set of teeth onto just four implants per jaw. The implants are angled to make the most of the bone you already have, which often avoids the need for grafting, and the new teeth are screwed firmly in place. Nothing comes out at night, and nothing covers the roof of your mouth, so taste and comfort come back too. In many cases a fixed temporary set can go on the same day as surgery."
        points={['A full fixed set of teeth on four implants', 'Angled placement often avoids bone grafting', 'Stays put — nothing to remove or soak overnight', 'Leaves the palate free, so taste and comfort improve']}
      />
      <section className="bg-ivory py-12">
        <Section>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-700 font-medium">Explore in detail:</span>
            <Link to="/straumann-implants-malta/" className="text-sm font-medium text-gold-700 hover:text-gold-800">Straumann implants &rarr;</Link>
            <Link to="/all-on-4-malta/" className="text-sm font-medium text-gold-700 hover:text-gold-800">All-on-4 &rarr;</Link>
            <Link to="/all-on-6-malta/" className="text-sm font-medium text-gold-700 hover:text-gold-800">All-on-6 &rarr;</Link>
          </div>
        </Section>
      </section>
      <PricingHint items={implantPricing} note="Your implant consultation is free when you go ahead with treatment, and the 3D scan is included with surgery, so there is no separate planning fee. From there the cost depends on how many implants you need, whether any grafting is involved, and the type of crown or bridge that goes on top. The full price list lays it all out, with no hidden extras." />
      <FAQSection faqs={implantFaqs} dark />
      <CTASection dark title="Not sure if implants are right for you?" text="Book a consultation with Dr Jonathan Mifsud. He will take a proper look, talk you through what is realistic for your case, and give you a clear plan and price — with no pressure to commit." />
    </>
  );
}


function AlignersPage() {
  const alignerFaqs = [
    { q: 'How long does Invisalign treatment take?', a: 'It depends on how much your teeth need to move. Minor crowding or a small gap can be sorted in 6 to 12 months, while a bigger correction might run closer to 18 months. We give you a realistic timeframe once we have scanned your teeth, rather than a guess on the day.' },
    { q: 'Is Invisalign suitable for adults?', a: 'Yes, and most of the people we treat with aligners are adults. A lot of them had braces as teenagers and have watched things drift back, or never got round to it and would rather not wear metal brackets to fix it now. Because the aligners are clear, you can straighten your teeth without it being obvious at work or in photos.' },
    { q: 'How many hours a day do you wear aligners?', a: 'Plan on 20 to 22 hours a day. In practice that means they are in except when you are eating, drinking anything other than water, or cleaning your teeth. The treatment only works if you are honest with yourself about wearing them — leave them in a drawer and the teeth simply stop moving.' },
    { q: 'Is Invisalign painful?', a: 'There is some tightness for a day or two each time you change to a new set, because that is the aligner pushing the teeth along. It settles quickly, and most people find it easier than the rubbing and ulcers fixed braces can cause. Switching to a new set at bedtime helps you sleep through the worst of it.' },
    { q: 'Can Invisalign fix my bite as well as straighten my teeth?', a: 'It can handle a fair amount — crowding, gaps, and many overbite, underbite and crossbite cases. Some bites are too complex for aligners alone and do better with fixed braces, and we will tell you straight if that is your situation rather than start something that will not get you the result you want.' },
  ];
  const alignerSteps = [
    { title: 'Consultation and scan', text: 'We check your teeth and bite and take a digital scan instead of the old putty impressions, so there is nothing to gag on. This also tells us whether aligners can realistically do what you are after.' },
    { title: 'Treatment preview', text: 'From the scan we build a plan showing, tooth by tooth, how everything will move and where your smile ends up. You see the projected result before you decide to go ahead.' },
    { title: 'Aligner delivery', text: 'Your full set of aligners is made to fit only your teeth. We fit the first ones, check they sit properly, and show you how to take them in and out and keep them clean.' },
    { title: 'Progress check-ups', text: 'You come in now and then for a quick check so we can make sure the teeth are tracking the plan and hand over your next aligners. These visits are short, with no tightening involved.' },
  ];
  return (
    <>
      <SEO
        title="Invisalign Malta | Clear Aligners | Apex Dental"
        description="Invisalign and clear aligner treatment in Malta at Apex Dental. Discreet, removable orthodontics for adults. Digital planning and multilingual consultations available."
        canonical={`${siteUrl}/invisalign-malta/`}
        image={`${siteUrl}/images/A1.jpg`}
        schemas={[
          serviceSchema('Clear Aligners', 'Invisalign and clear aligner orthodontic treatment in Malta at Apex Dental.', `${siteUrl}/invisalign-malta/`),
          faqSchema(alignerFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Clear Aligners', path: '/invisalign-malta/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A1}
        eyebrow="Invisalign and Clear Aligners Malta"
        title="Straighten your teeth with clear aligners almost nobody will notice"
        subtitle="Clear aligners suit people who want straighter teeth without a mouth full of metal. You take them out to eat and clean, and most of the time no one can tell you are wearing them."
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Why so many adults choose clear aligners"
        text="Fixed braces are stuck on, hard to clean around, and there is no hiding the metal. Aligners are a set of clear trays you swap every week or two. You take them out to eat, so there is no list of foods to avoid, and you brush and floss exactly as you normally would. For most people the only giveaway is someone looking very closely."
        points={['Hard to spot unless someone is right up close', 'Come out for meals, drinks and cleaning', 'Nothing off the menu', 'Shorter, less frequent visits than fixed braces']}
      />
      <SplitEditorial
        imageLeft={images.aligners.A3}
        title="See where your teeth will end up before you start"
        text="Before you commit to anything, we use the scan to map out how your teeth will move and show you where they should finish. It means you are not signing up on faith — you can look at the projected result and decide if it is what you want."
        points={['See the projected result before you start', 'Each aligner moves the teeth a small, planned amount', 'Trays made to fit only your teeth', 'A realistic timeframe from the first visit']}
        dark
        reverse
      />
      <ProcessSteps steps={alignerSteps} />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="Consultations in English, Italian, Spanish, Polish or German"
        text="We see a lot of patients who have moved to Malta from abroad. Dr Martha Lopez consults in Spanish, Dr Massimo D'Alessandro in Italian, and Dr Aleksandra Syrico Mallia in Polish and German, so you can talk through your treatment in your own language instead of translating dental terms on the spot."
        points={['Consultations in English, Italian, Spanish, Polish or German', 'Used to treating expats and visitors', 'The same standard of care whoever you are', 'At Trident Park, Mrieħel, Birkirkara']}
      />
      <FAQSection faqs={alignerFaqs} dark />
      <CTASection title="Interested in clear aligners in Malta?" text="Book a consultation and we will check whether aligners can do what you want, show you a preview of the result, and be upfront about the timeframe and the cost." />
    </>
  );
}


function CosmeticPage() {

  return (
    <>
      <SEO
        title="Cosmetic Dentistry Malta | Veneers, Whitening &amp; Bonding | Apex Dental"
        description="Cosmetic dentistry in Malta at Apex Dental — teeth whitening, veneers, bonding and natural-looking smile makeovers. Book a cosmetic consultation today."
        canonical={`${siteUrl}/cosmetic-dentistry-malta`}
        image={`${siteUrl}/images/C1.jpg`}
        schemas={[
          serviceSchema('Cosmetic Dentistry', 'Cosmetic dentistry in Malta at Apex Dental — teeth whitening, veneers, bonding and natural-looking smile makeovers. Book a cosmetic consultation today.', `${siteUrl}/cosmetic-dentistry-malta`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Cosmetic Dentistry', path: '/cosmetic-dentistry-malta' }]),
        ]}
      />
      <PageHero
        image={images.cosmetic.C1}
        eyebrow="Cosmetic Dentistry Malta"
        title="Cosmetic dentistry that improves your smile without it looking done"
        subtitle="Most people who come in for cosmetic work want their teeth to look better, not fake. The aim is a smile that suits your face — one people notice without being able to say exactly what changed."
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="What cosmetic dentistry can involve"
        text="Cosmetic treatment covers a few different things — whitening to lift the colour, veneers to change shape and cover chips or gaps, bonding to repair small flaws, and replacing old fillings that have darkened. Which of these you need depends on what is actually bothering you, so we start by working that out rather than reaching for the same answer every time."
        points={[
          'Whitening for colour',
          'Veneers for shape, chips and gaps',
          'Bonding for smaller repairs',
          'Matched to what actually bothers you',
        ]}
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="The details that stop teeth looking fake"
        text="A good result is about more than white teeth. The width of each tooth, how the edges follow your lip when you smile, the small differences that stop teeth looking like a row of identical tiles — these are what separate teeth that look natural from teeth that look done. We plan for that before any work starts."
        points={[
          'Teeth sized and shaped to suit your face',
          'Edges that follow your smile line',
          'Subtle variation so it does not look uniform',
          'Planned out before treatment begins',
        ]}
        dark
        reverse
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="Natural beats noticeable, every time"
        text="There is a version of cosmetic dentistry that turns out blindingly white, perfectly identical teeth that announce themselves from across the room. That is not what we are after. Good veneers should not look like the teeth joined a nightclub — they should look like teeth you could have been born with, just tidier."
        points={[
          'Results that look like your own teeth',
          'A clear consultation so you know what to expect',
          'No pressure to do more than you want',
          'Shade and shape kept believable',
        ]}
      />

      <CTASection
        dark
        title="Considering cosmetic dentistry?"
        text="Book a consultation and we will go through what is bothering you, what can realistically be improved, and which treatment makes sense — whitening, veneers, bonding, or a mix."
      />
    </>
  );
}

function AboutPage() {
  const milestones = [
    { year: '2023', label: 'Apex Dental opens its doors at Trident Park, Mrieħel, Birkirkara' },
    { year: '2024', label: 'Added full implant surgery, All-on-4 and clear aligner treatment' },
    { year: '2024', label: 'Recognised for meeting professional compliance standards' },
    { year: '2025', label: 'Steady growth in our patient base across Malta' },
  ];
  return (
    <>
      <SEO
        title="About Apex Dental Malta | Our Dental Team"
        description="Meet the team at Apex Dental Malta. Dr Jonathan Mifsud (Implantologist), Dr Aleksandra Syrico Mallia (Orthodontist, Polish- and German-speaking), Dr Charlotte Axisa, Dr Massimo D'Alessandro (Italian-speaking), Dr Adam Borg and Dr Martha Lopez (Spanish-speaking). Trident Park, Mrieħel, Birkirkara."
        canonical={`${siteUrl}/about-us/`}
        image={`${siteUrl}/images/AB1.jpg`}
        schema={localBusinessSchema(`${siteUrl}/about-us/`)}
      />
      <PageHero
        image={images.about.AB1}
        eyebrow="About Apex Dental"
        title="A private dental clinic in Malta, with six dentists under one roof"
        subtitle="We are a private clinic at Trident Park, Mrieħel, Birkirkara. Six dentists work here, between us covering routine care, cosmetic work, gum treatment and implant surgery, with consultations in English, Italian, Spanish, Polish or German."
      />
      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl lg:col-span-2">
              <LazyImg src={images.about.AB1} alt="Apex Dental clinic interior" className="w-full h-[420px] object-cover" />
            </div>
            <div className="grid gap-6">
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <LazyImg src={images.about.AB2} alt="Apex Dental treatment room" className="w-full h-[196px] object-cover" />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <LazyImg src={images.about.AB3} alt="Apex Dental clinic detail" className="w-full h-[196px] object-cover" />
              </div>
            </div>
          </div>
        </Section>
      </section>
      <section className="bg-navy-900 py-20 text-white">
        <Section>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
              <LazyImg src={images.about.AB2} alt="Dr Jonathan Mifsud, Apex Dental" className="w-full h-[520px] object-cover" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">Meet the team</div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-2">{team[0].name}</h2>
              <div className="text-gold-300 font-medium mb-6">{team[0].role}</div>
              <p className="text-slate-300 leading-8 text-lg">{team[0].bio}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/appointment-booking/" variant="gold">Book a consultation</Button>
                <Button to="/dental-implants/" variant="glass">Implant treatments</Button>
              </div>
            </div>
          </div>
        </Section>
      </section>
      <section className="bg-white py-20">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Our dentists</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 leading-tight mb-12 max-w-2xl">
            Six dentists, five languages spoken
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.slice(1).map((doctor) => (
              <div key={doctor.name} className="rounded-[2rem] bg-ivory border border-slate-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{doctor.name.split(' ').slice(-1)[0][0]}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-navy-900">{doctor.name}</h3>
                  {doctor.langs.map((code) => (
                    <span key={code} className={`text-sm font-bold ${LANGUAGE_BADGE[code]}`} title={EXTRA_LANGUAGE[code]}>
                      {code}
                    </span>
                  ))}
                </div>
                <div className="text-gold-700 font-medium text-sm mb-3">{doctor.role}</div>
                <p className="text-slate-600 leading-7 text-sm">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>
      <section className="bg-ivory py-20">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Our journey</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 leading-tight mb-12 max-w-2xl">
            How the clinic has grown
          </h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 items-start py-6 border-b border-slate-200">
                <div className="text-gold-700 font-bold text-lg w-16 shrink-0">{m.year}</div>
                <div className="text-slate-700 leading-7">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </section>
      <ComplianceTrustSection />
      <CTASection title="Would you like to visit Apex Dental?" text="Book online, call us on 27016017, or message us on WhatsApp at 99722185. You will find us at Trident Park, Mrieħel, Birkirkara." />
    </>
  );
}


function GeneralDentistryPage() {

  return (
    <>
      <SEO
        title="General Dentistry Malta | Check-ups &amp; Fillings | Apex Dental"
        description="General dentistry in Malta at Apex Dental: check-ups, fillings and preventive care for the whole family. Catch problems early — book an appointment today."
        canonical={`${siteUrl}/general-dentistry/`}
        image={`${siteUrl}/images/H5.jpg`}
        schemas={[
          serviceSchema('General Dentistry', 'General dentistry in Malta at Apex Dental: check-ups, fillings and preventive care for the whole family. Catch problems early — book an appointment today.', `${siteUrl}/general-dentistry/`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'General Dentistry', path: '/general-dentistry/' }]),
        ]}
      />
      <PageHero
        image={images.home.H5}
        eyebrow="General Dentistry Malta"
        title="Check-ups, fillings and everyday dental care, done properly"
        subtitle="This is the everyday side of dentistry — the regular check-ups, fillings and small repairs that stop problems turning into big ones. Most people see us for this more than anything else."
      />

      <SplitEditorial
        imageLeft={images.home.H6}
        title="What a routine visit covers"
        text="A general appointment usually means an examination, a look at any specific niggle, and treatment of whatever needs it — most often a filling. We are also checking the things you cannot see yourself: early decay between teeth, a cracked filling, the start of gum trouble. Catching those early is almost always simpler and cheaper than dealing with them later."
        points={[
          'Examinations and check-ups',
          'Fillings and everyday repairs',
          'A proper look at teeth and gums',
          'Catching small problems early',
        ]}
      />

      <SplitEditorial
        imageLeft={images.home.H7}
        title="The same care whether it is a filling or an implant"
        text="A routine appointment should not feel like you are being rushed through. We give a check-up or a filling the same attention we would a bigger case — taking the time to explain what we have found, what your options are, and what we would do in your position."
        points={[
          'Time taken to explain what we find',
          'Clear options, not just instructions',
          'Careful diagnosis before treatment',
          'Looking after teeth for the long run',
        ]}
        dark
        reverse
      />

      <CTASection
        title="Looking for a dentist in Malta?"
        text="Book a check-up at Apex Dental — whether you are due a routine visit, have a specific problem, or just want to get back into seeing a dentist regularly."
      />
    </>
  );
}

function HygienePage() {

  return (
    <>
      <SEO
        title="Dental Hygiene Malta | Scale &amp; Polish | Apex Dental"
        description="Dental hygiene in Malta at Apex Dental. Professional scale and polish to remove tartar, treat bleeding gums and protect your teeth. Book a hygiene visit."
        canonical={`${siteUrl}/dental-hygiene/`}
        image={`${siteUrl}/images/H8.jpg`}
        schemas={[
          serviceSchema('Dental Hygiene', 'Dental hygiene in Malta at Apex Dental. Professional scale and polish to remove tartar, treat bleeding gums and protect your teeth. Book a hygiene visit.', `${siteUrl}/dental-hygiene/`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Dental Hygiene', path: '/dental-hygiene/' }]),
        ]}
      />
      <PageHero
        image={images.home.H8}
        eyebrow="Dental Hygiene Malta"
        title="A professional clean that gets at what brushing cannot reach"
        subtitle="However well you brush, hardened deposits build up in spots a toothbrush misses. A hygiene visit clears them away and gives your gums a chance to settle, which is a big part of avoiding more serious work later."
      />

      <SplitEditorial
        imageLeft={images.home.H9}
        title="Why hygiene visits matter"
        text="Plaque that is not cleaned off hardens into tartar, and once it does, brushing will not shift it — it has to be removed with instruments. Left there, it irritates the gums, which is how bleeding, bad breath and eventually gum disease start. A scale and polish clears that build-up and lets the gums firm up again."
        points={[
          'Removes hardened tartar brushing cannot',
          'Calms down sore, bleeding gums',
          'Fresher breath and a cleaner feel',
          'Heads off bigger gum problems',
        ]}
      />

      <SplitEditorial
        imageLeft={images.home.H10}
        title="Cheaper to prevent than to fix"
        text="Most people only book in when something hurts, but by then the easy window has usually passed. Coming in for a clean and check on a regular basis is one of the cheapest things you can do for your teeth — it catches issues while they are still small and keeps any existing work in good shape."
        points={[
          'Stops small issues becoming big ones',
          'Keeps fillings, crowns and implants healthy',
          'Worth doing before cosmetic work',
          'Especially important if you have implants',
        ]}
        dark
        reverse
      />

      <CTASection
        title="Time for a hygiene visit?"
        text="Book a hygiene appointment at Apex Dental. If it has been a while, that is all the more reason to come in — we will get your teeth clean and tell you honestly how your gums are doing."
      />
    </>
  );
}

function VeneersPage() {
  const veneerFaqs = [
    { q: 'What are dental veneers made of?', a: 'We mostly use porcelain veneers — thin ceramic shells made to fit over the front of your teeth. Porcelain holds up well, resists staining, and catches the light much like natural enamel, which is why it tends to look convincing. We also offer composite and 3D-printed options, and which suits you comes down to your goals and budget.' },
    { q: 'How long do veneers last?', a: 'Porcelain veneers usually last somewhere between 10 and 15 years, often longer. What shortens that is the obvious stuff: using your teeth to open things, grinding at night without a guard, or skipping check-ups so a small problem at the edge goes unnoticed.' },
    { q: 'Is the veneer procedure painful?', a: 'Not really. We numb the tooth while preparing it, so you do not feel that part. Afterwards some people notice a few days of mild sensitivity to hot and cold, which settles on its own.' },
    { q: 'How many teeth can be treated with veneers?', a: 'Anything from a single tooth to a full smile. Some people just want to fix one chipped or stained front tooth; others have six to ten of the front teeth done together so the colour and shape all match. We talk through which makes sense for what you want to change.' },
    { q: 'Can veneers be combined with whitening?', a: 'Yes, and the order matters. If you are whitening your natural teeth too, we do that first, let the colour settle, then match the veneers to the lighter shade. Done the other way round, the veneers would no longer match once the natural teeth brightened.' },
  ];
  const veneerSteps = [
    { title: 'Smile design consultation', text: 'We talk through what you want to change and plan the shape, size and shade of the veneers using photos and, where it helps, a mock-up so you are not guessing at the result.' },
    { title: 'Tooth preparation', text: 'A thin layer of the front surface is removed to make room for the veneer so it sits flush rather than bulky. We fit temporaries to wear while the lab makes the final ones.' },
    { title: 'Veneer fabrication', text: 'A dental technician makes your veneers from detailed impressions and the shade we agreed, getting the thickness and translucency right so they read as natural.' },
    { title: 'Bonding and final fitting', text: 'We try the veneers in first to check the fit, shape and colour with you, and only bond them once you are happy. The change is there the moment you look in the mirror.' },
  ];
  const veneerPricing = [
    { label: 'Composite veneers', price: '€130 / tooth' },
    { label: '3D-printed ceramic resin (very stain resistant)', price: '€220 / tooth' },
    { label: 'Porcelain / zirconia', price: '€450 / tooth' },
    { label: 'Smile mockup / try-in', price: '€50' },
  ];
  return (
    <>
      <SEO
        title="Dental Veneers Malta | Porcelain Veneers | Apex Dental"
        description="Porcelain dental veneers in Malta at Apex Dental. Custom smile design for chipped, stained, or misshapen teeth. Book a veneer consultation today."
        canonical={`${siteUrl}/veneers/`}
        image={`${siteUrl}/images/C1.jpg`}
        schemas={[
          serviceSchema('Dental Veneers', 'Porcelain dental veneer treatment in Malta for smile improvement at Apex Dental.', `${siteUrl}/veneers/`),
          faqSchema(veneerFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Veneers', path: '/veneers/' }]),
        ]}
      />
      <PageHero
        image={images.cosmetic.C1}
        eyebrow="Dental Veneers Malta"
        title="Reshape, brighten and even out your smile with veneers"
        subtitle="Veneers sit over the front of your teeth to change their colour, shape and how evenly they line up. Planned and made well, the result looks like your own teeth rather than something stuck on top."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="What veneers can correct"
        text="Veneers deal with the things whitening cannot. Whitening only changes colour, so if a tooth is chipped, worn, slightly out of line, or simply too small, no amount of bleaching will fix it. A veneer changes the shape and the shade together, which is why it can sort out several problems on one tooth at once."
        points={['Discoloured or stained teeth that do not whiten', 'Chipped, cracked or worn teeth', 'Slight misalignment or gaps between teeth', 'Teeth that are too small or irregularly shaped']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Why we usually reach for porcelain"
        text="Porcelain is stronger than composite, shrugs off staining from coffee and wine far better, and has a slight translucency that makes it catch the light like real enamel. Composite has its place and costs less, but for veneers meant to last and keep looking right, porcelain is usually what we recommend."
        points={['Typically lasts 10 to 15 years or more', 'Holds its colour against coffee and wine', 'Catches the light like natural enamel', 'Made to fit your teeth exactly']}
        dark
        reverse
      />
      <ProcessSteps steps={veneerSteps} />
      <PricingHint
        items={veneerPricing}
        note="Choose the veneer option that suits your goals and budget, all priced per tooth: composite at €130, very stain-resistant 3D-printed ceramic resin at €220, and premium porcelain or zirconia at €450. Not sure which is right for you? For €50 we create a mockup so you can see and try the final look before committing — and that fee is deducted from your bill if you proceed with resin or porcelain/zirconia veneers. To book a consultation we take a €20 booking fee, which is deducted from your final bill."
      />
      <FAQSection faqs={veneerFaqs} />
      <CTASection dark title="Ready to improve your smile with veneers?" text="Book a cosmetic consultation and we will talk through what you want changed, whether veneers are the right way to get there, and exactly what each option costs." />
    </>
  );
}


function TeethWhiteningPage() {
  const whiteningFaqs = [
    { q: 'How white can my teeth get?', a: 'It depends where you are starting from and what is causing the discolouration. Most people get a clear, visible lift in shade. Professional whitening goes further than shop-bought kits because the gel is stronger and we control how it is used, but it works on natural enamel — it will not take teeth past their natural limit.' },
    { q: 'Is teeth whitening safe?', a: 'Yes, when a dentist is overseeing it. We use regulated bleaching gels and custom trays that keep the gel on the teeth and off the gums. The main side effect is some temporary sensitivity, which we can manage. The risk goes up with unregulated online kits and salon treatments, which is worth bearing in mind.' },
    { q: 'How long do whitening results last?', a: 'Usually 12 to 24 months, depending on how much coffee, tea, red wine and tobacco come into the picture. Because you keep your custom trays, topping up is cheap and easy — a night or two with fresh gel brings the colour back when it starts to drift.' },
    { q: 'Does whitening work on crowns or veneers?', a: 'No. The gel only lightens natural enamel, so crowns, veneers and white fillings stay the colour they already are. If you have these at the front, we factor that in — sometimes whitening first and then replacing a filling to match is the better order.' },
    { q: 'Will whitening make my teeth sensitive?', a: 'Some people get mild, short-lived sensitivity during the whitening period, and it usually fades within a few days of finishing. Using a sensitivity toothpaste while you whiten takes the edge off it.' },
  ];
  const whiteningSteps = [
    { title: 'Consultation', text: 'We look at the shade you are starting from and any crowns, veneers or fillings that will not whiten, then talk through whether home trays or an in-clinic session suits you better.' },
    { title: 'Custom tray impressions', text: 'For home whitening we take impressions and make trays moulded to your teeth, so the gel sits evenly against every tooth instead of pooling or leaking onto the gums.' },
    { title: 'Whitening treatment', text: 'You wear the trays with the gel for a set time each day at home, usually over one to two weeks. The colour lifts gradually, which also keeps sensitivity down compared with rushing it.' },
    { title: 'Review and top-ups', text: 'We check the result and how it settled, and you keep the trays. When the colour fades over the months ahead, a little fresh gel tops it straight back up.' },
  ];
  return (
    <>
      <SEO
        title="Teeth Whitening Malta | Apex Dental"
        description="Professional teeth whitening in Malta at Apex Dental. Custom home whitening trays and in-clinic options for a brighter, whiter smile. Book a consultation today."
        canonical={`${siteUrl}/teeth-whitening/`}
        image={`${siteUrl}/images/C2.jpg`}
        schemas={[
          serviceSchema('Teeth Whitening', 'Professional teeth whitening in Malta with custom home trays and in-clinic options.', `${siteUrl}/teeth-whitening/`),
          faqSchema(whiteningFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Teeth Whitening', path: '/teeth-whitening/' }]),
        ]}
      />
      <PageHero
        image={images.cosmetic.C2}
        eyebrow="Teeth Whitening Malta"
        title="Professional whitening that lifts the colour safely, under a dentist’s eye"
        subtitle="Whitening here is fitted to your teeth and overseen by a dentist. Custom trays and proper-strength gel give a more even, longer-lasting result than the strips and kits you buy off the shelf."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Why a kit from the shop falls short"
        text="High-street strips and kits use weak gel and one-size trays that do not match your teeth, so the gel spreads unevenly and often onto the gums. With professional whitening the gel is stronger and the trays are made for your mouth, which means the colour comes up evenly and you are not guessing at how much to use."
        points={['Higher-strength regulated whitening gels', 'Custom trays for even, precise application', 'Supervised treatment with professional guidance', 'More consistent, longer-lasting results']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="Home whitening with custom trays"
        text="Our home whitening comes with trays made from impressions of your teeth plus professional gel. You wear them for a set period each day and watch the shade lighten over a week or two. The trays are yours to keep, so future top-ups cost only a tube of gel."
        points={['Precision-fitted custom trays included', 'Gradual, controlled whitening at home', 'Flexible and fits around your schedule', 'Trays reusable for long-term maintenance']}
        dark
        reverse
      />
      <ProcessSteps steps={whiteningSteps} dark />
      <FAQSection faqs={whiteningFaqs} />
      <CTASection title="Ready for a brighter smile?" text="Book a whitening consultation and we will look at your teeth, flag anything that will not whiten, and recommend the option that fits your routine." />
    </>
  );
}


function CrownsBridgeworkPage() {
  const crownFaqs = [
    { q: 'When is a crown needed?', a: 'A crown goes on when a tooth has lost too much structure for a filling to hold reliably — after a root canal, a big fracture, or years of heavy wear or grinding. By wrapping the whole tooth it holds what is left together and takes the bite force that would otherwise crack it. Crowns also tidy up badly shaped or deeply discoloured teeth.' },
    { q: 'What are dental crowns made of?', a: 'Most of ours are ceramic or zirconia — strong, tooth-coloured, and hard to tell apart from the real thing. There are still a few situations where a metal-bonded crown is the sensible choice, and we will say so if yours is one of them.' },
    { q: 'How long do crowns last?', a: 'Looked after, a crown commonly lasts 10 to 15 years or more. What helps is keeping the edge where crown meets tooth clean, not using your teeth as tools, and wearing a night guard if you grind — most crowns that fail early do so for one of those reasons.' },
    { q: 'What is a dental bridge?', a: 'A bridge fills a gap by crowning the teeth either side of it and joining them with a false tooth in between. It is fixed in place, so unlike a denture it does not come out. The trade-off is that the neighbouring teeth have to be prepared, which is part of why an implant is sometimes the better option.' },
    { q: 'Crown or implant — which is better for a missing tooth?', a: 'For a single gap, an implant is usually the better long-term answer because it stands on its own and leaves the neighbouring teeth alone. A bridge can still make sense — for instance when those neighbouring teeth already need crowns anyway. We will lay out both for your case rather than push one.' },
  ];
  return (
    <>
      <SEO
        title="Crowns and Bridges Malta | Apex Dental"
        description="Dental crowns and bridges in Malta at Apex Dental. Protect damaged teeth and replace missing teeth with high-quality ceramic and zirconia restorations."
        canonical={`${siteUrl}/crowns-and-bridgework/`}
        image={`${siteUrl}/images/C4.jpg`}
        schemas={[
          serviceSchema('Dental Crowns and Bridges', 'Dental crown and bridge treatment in Malta at Apex Dental.', `${siteUrl}/crowns-and-bridgework/`),
          faqSchema(crownFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Crowns & Bridgework', path: '/crowns-and-bridgework/' }]),
        ]}
      />
      <PageHero
        image={images.cosmetic.C4}
        eyebrow="Crowns and Bridges Malta"
        title="Rebuild a damaged tooth or fill a gap with a crown or bridge"
        subtitle="Crowns cap and protect a tooth that has been weakened; bridges fill the gap left by a missing one. Both are long-standing, dependable ways to get teeth working and looking right again, and we make ours in tooth-coloured ceramic."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C1}
        title="Dental crowns — when a filling is not enough"
        text="A filling rebuilds part of a tooth; a crown covers the whole of it. Once a tooth has lost a lot of structure to decay, a crack, or an old large filling, a fresh filling has little to grip and tends to come loose or take the tooth with it when it fails. A crown wraps over the top and holds everything together so the tooth can take normal biting again."
        points={['Protects teeth after root canal treatment', 'Restores badly broken or worn teeth', 'Covers misshapen or heavily stained teeth', 'High-quality ceramic and zirconia materials']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="Dental bridges — a fixed solution for missing teeth"
        text="A bridge replaces a missing tooth by borrowing support from the teeth on either side. Those teeth are crowned, and a false tooth is joined between them to fill the space. The result is fixed in place and used like your own teeth — nothing to take out at night, and the gap is closed so the other teeth cannot drift into it."
        points={['Replaces one or more missing teeth', 'Fixed and not removable like a denture', 'Restores chewing function and smile aesthetics', 'Prevents remaining teeth from shifting']}
        dark
        reverse
      />
      <FAQSection faqs={crownFaqs} />
      <CTASection title="Need a crown or bridge in Malta?" text="Book a consultation and we will look at the tooth, explain whether a crown, bridge or implant fits best, and give you the cost before you decide." />
    </>
  );
}


function PeriodontologyPage() {

  return (
    <>
      <SEO
        title="Gum Disease Treatment Malta | Periodontology | Apex Dental"
        description="Gum disease treatment in Malta at Apex Dental. Periodontal care for bleeding, receding or loose teeth, from deep cleaning to maintenance. Book a check-up."
        canonical={`${siteUrl}/periodontology/`}
        image={`${siteUrl}/images/H8.jpg`}
        schemas={[
          serviceSchema('Periodontology', 'Gum disease treatment in Malta at Apex Dental. Periodontal care for bleeding, receding or loose teeth, from deep cleaning to maintenance. Book a check-up.', `${siteUrl}/periodontology/`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Periodontology', path: '/periodontology/' }]),
        ]}
      />
      <PageHero
        image={images.home.H8}
        eyebrow="Periodontology Malta"
        title="Treatment for gums that bleed, recede or no longer hold teeth firmly"
        subtitle="Your gums and the bone under them are what hold your teeth in place. When that support starts to break down it is often quiet at first, which is why gum problems are worth catching and treating early."
      />
      <SplitEditorial
        imageLeft={images.home.H9}
        title="Why gum health matters"
        text="Gum disease creeps up slowly. It usually starts as bleeding when you brush and, left alone, can progress to the bone that anchors the teeth shrinking back — at which point teeth loosen and can eventually be lost. The earlier we pick it up, the more support we can save, and in the early stages a thorough clean and better home care often turns it around."
        points={[
          'Checking gums for early signs of disease',
          'Deeper cleaning and treatment when needed',
          'Protecting the bone that holds teeth in',
          'Important before and after bigger treatment',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H10}
        title="Get it under control, then keep it there"
        text="Gum disease is rarely cured once and forgotten — it is managed. After the initial treatment, regular maintenance cleans keep it from creeping back. This matters as much for implants as for natural teeth, since the same infection that loosens teeth can affect the gum and bone around an implant."
        points={[
          'Catching problems before they spread',
          'Regular upkeep to hold the result',
          'Applies to implants as well as teeth',
          'Looking after gums for the long run',
        ]}
        dark
        reverse
      />
      <CTASection
        title="Concerned about your gums?"
        text="If your gums bleed, feel sore, or have started to pull back from your teeth, book an assessment. We will tell you where things stand and what, if anything, needs doing."
      />
    </>
  );
}

function OrthodonticPage() {
  const orthoFaqs = [
    { q: 'Who does the orthodontics at Apex Dental?', a: 'Orthodontics is led by Dr Aleksandra, our orthodontist. She treats children, teenagers and adults, and works across both fixed braces and clear aligners, so the recommendation you get is based on what your case actually needs rather than the one option a clinic happens to offer.' },
    { q: 'Braces or clear aligners — which is right for me?', a: 'It depends on the teeth and the bite. Clear aligners suit a lot of adult cases and are barely visible, but some movements and more complex bites are corrected more reliably with fixed braces. Dr Aleksandra assesses your case first and explains the trade-offs in plain terms before you decide.' },
    { q: 'What is Orthix?', a: 'Orthix is our own clear aligner, designed and produced in-house at Apex Dental rather than sent to an overseas lab. Making them ourselves means we control the planning, shorten the wait between scan and starting treatment, and can keep the cost down compared with the big international aligner brands.' },
    { q: 'Which clear aligner brands do you offer?', a: 'As well as our in-house Orthix aligner, we work with Invisalign, the most established system; ClearCorrect, a cost-effective option for suitable cases; Ordoline, a clinician-led system for more complex movements; and Cristaline, German-made aligners produced to ISO standards. Dr Aleksandra matches the system to your case and budget rather than pushing a single brand.' },
    { q: 'How long does orthodontic treatment take?', a: 'Most cases run somewhere between 6 and 18 months depending on how far the teeth need to move. Minor crowding or a small gap is at the shorter end; a fuller correction takes longer. You get a realistic timeframe once your teeth have been scanned and assessed.' },
    { q: 'Do you treat children as well as adults?', a: 'Yes. Dr Aleksandra sees children and teenagers as well as adults. With younger patients there is often a right window to start, so an early assessment is worthwhile even if treatment itself comes a little later.' },
    { q: 'Will braces or aligners hurt?', a: 'Expect some tightness for a day or two after braces are adjusted or when you move to a new aligner — that is the teeth being moved, and it settles quickly. Fixed braces can rub at first; aligners are smooth and usually more comfortable day to day.' },
  ];
  const orthoSteps = [
    { title: 'Consultation with Dr Aleksandra', text: 'We look at your teeth and, just as importantly, how they bite together. This is where we work out whether fixed braces, clear aligners, or our in-house Orthix would suit your case, and what is realistic to achieve.' },
    { title: 'Digital scan and plan', text: 'We take a digital scan rather than putty impressions and build a plan that shows how the teeth will move. For aligner cases you can see the projected result before committing.' },
    { title: 'Starting treatment', text: 'Braces are fitted, or your aligners are made and handed over with instructions on wear and cleaning. Either way you leave knowing exactly what to do and what to expect over the coming weeks.' },
    { title: 'Reviews and refinement', text: 'You come in periodically so Dr Aleksandra can check the teeth are tracking the plan, adjust braces or hand over the next aligners, and make any refinements needed to finish the case properly.' },
  ];
  const alignerSystems = [
    { name: 'Orthix (in-house)', to: '/orthix-aligners/', text: 'Our own clear aligner, planned and produced at Apex Dental. Faster to start, fully under our control, and more affordable than the international brands.' },
    { name: 'Invisalign', to: '/invisalign-malta/', text: 'The best-known clear aligner system, with a long track record across a wide range of cases.' },
    { name: 'ClearCorrect', to: '/clearcorrect-malta/', text: 'A well-established clear aligner option from the Straumann Group, often a cost-effective route for suitable cases.' },
    { name: 'Ordoline', to: '/ordoline-aligners-malta/', text: 'A clinician-led aligner system built for more demanding cases. It combines aligners with auxiliaries such as mini-screws and segmental mechanics to achieve movements aligners alone often cannot.' },
    { name: 'Cristaline', to: '/cristaline-aligners-malta/', text: 'German-made clear aligners produced to ISO 13485 standards in a three-layer biocompatible material, with a 3D preview of your result before treatment starts.' },
  ];
  return (
    <>
      <SEO
        title="Orthodontist Malta | Braces & Clear Aligners | Apex Dental"
        description="Orthodontics in Malta with orthodontist Dr Aleksandra Syrico Mallia at Apex Dental. Fixed braces, clear aligners and our in-house Orthix aligner, plus Invisalign, ClearCorrect, Ordoline and Cristaline. For children, teenagers and adults."
        canonical={`${siteUrl}/orthodontics/`}
        image={`${siteUrl}/images/A3.jpg`}
        schemas={[
          serviceSchema('Orthodontics', 'Orthodontic treatment in Malta at Apex Dental: fixed braces, clear aligners, and the in-house Orthix aligner, led by orthodontist Dr Aleksandra.', `${siteUrl}/orthodontics/`),
          faqSchema(orthoFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Orthodontics', path: '/orthodontics/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A3}
        eyebrow="Orthodontist Malta"
        title="Straighter teeth and a better bite, with braces or clear aligners"
        subtitle="Orthodontics at Apex Dental is led by Dr Aleksandra Syrico Mallia. From fixed braces to clear aligners — including our own in-house Orthix — she treats children, teenagers and adults, choosing the approach that fits your case rather than a one-size-fits-all option."
      />
      <SplitEditorial
        imageLeft={images.aligners.AB2 || images.aligners.A4}
        title="Led by our orthodontist, Dr Aleksandra Syrico Mallia"
        text="Orthodontics is its own discipline, and it is worth seeing someone who does it day in, day out. Dr Aleksandra plans every case around how your teeth meet, not just how they look head-on, because a bite that closes evenly is easier to keep clean and wears far more slowly over the years. She sees children, teenagers and adults, and is straight with you about what each option can and cannot do."
        points={[
          'A dedicated orthodontist, not a general add-on service',
          'Children, teenagers and adults all treated',
          'Planning built around your bite, not just appearance',
          'Honest advice on braces versus aligners',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Fixed braces when they are the better tool"
        text="For all the attention aligners get, fixed braces still correct some cases more predictably — bigger movements, rotations and more complex bites in particular. Modern braces are smaller and neater than the ones you might remember, and clear or tooth-coloured brackets make them far less obvious. Where braces are genuinely the better route for your result, Dr Aleksandra will tell you so."
        points={[
          'Reliable for complex movements and bites',
          'Smaller, neater brackets than older systems',
          'Clear and tooth-coloured options available',
          'Suitable across a wide range of ages and cases',
        ]}
        dark
        reverse
      />
      <section className="bg-ivory py-10">
        <Section>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-700 font-medium">Read more:</span>
            <Link to="/fixed-braces-malta/" className="text-sm font-medium text-gold-700 hover:text-gold-800">Fixed braces &rarr;</Link>
            <Link to="/orthix-aligners/" className="text-sm font-medium text-gold-700 hover:text-gold-800">Orthix in-house aligner &rarr;</Link>
          </div>
        </Section>
      </section>
      <section className="bg-white py-20">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Clear Aligner Options</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 leading-tight mb-6 max-w-3xl">
            Clear aligners, including our own in-house Orthix
          </h2>
          <p className="text-slate-600 leading-8 mb-12 max-w-3xl">
            Clear aligners straighten teeth using a series of near-invisible removable trays, with no metal on show. We are not tied to a single brand: alongside our own Orthix aligner, made in-house, we work with several established systems and match the right one to your case and budget.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alignerSystems.map((sys, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-ivory p-7 flex flex-col">
                <div className="text-lg font-semibold text-navy-900 mb-2">{sys.name}</div>
                <p className="text-slate-600 leading-7 text-sm">{sys.text}</p>
                {sys.to && (
                  <Link to={sys.to} className="mt-4 text-sm font-medium text-gold-700 hover:text-gold-800">
                    Learn more about {sys.name.replace(' (in-house)', '')} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Section>
      </section>
      <SplitEditorial
        imageLeft={images.aligners.A1}
        title="Why we make Orthix in-house"
        text="Most clinics send their aligner cases off to a large international lab and wait. We produce Orthix at Apex Dental instead. That means Dr Aleksandra controls the planning directly, there is less waiting between your scan and starting treatment, and we can offer aligner treatment at a more accessible price than the big-name brands — without giving up clinical control of your case."
        points={[
          'Planned and produced at our own clinic',
          'Less waiting between scan and starting',
          'More affordable than international aligner brands',
          'Full clinical control kept in-house',
        ]}
      />
      <ProcessSteps steps={orthoSteps} />
      <FAQSection faqs={orthoFaqs} dark />
      <CTASection
        dark
        title="Thinking about straightening your teeth?"
        text="Book an orthodontic consultation with Dr Aleksandra. She will check your teeth and bite and talk you through your options — fixed braces, clear aligners, or our in-house Orthix — with a clear plan and timeframe."
      />
    </>
  );
}

function FixedBracesPage() {
  const faqs = [
    { q: 'Who fits braces at Apex Dental?', a: 'Fixed braces are fitted and adjusted by our orthodontist, Dr Aleksandra Syrico Mallia. She treats children, teenagers and adults, and plans each case around the bite as well as the appearance of the teeth.' },
    { q: 'What types of fixed braces do you offer?', a: 'We offer traditional metal braces, which are reliable and efficient, and tooth-coloured ceramic braces, which blend in far more and are much less noticeable. Dr Aleksandra will advise which suits your case and how visible each option really is.' },
    { q: 'Braces or clear aligners?', a: 'Both move teeth, but fixed braces handle some cases more predictably, especially bigger movements, rotations and more complex bites. Aligners are great for many cases and barely visible. We assess your teeth first and recommend on what will actually get you the result, not on a single preferred option.' },
    { q: 'Do braces hurt?', a: 'There is usually some tightness for a day or two after braces are fitted and after each adjustment, as the teeth begin to move. It settles quickly. Brackets can rub at first, and we give you wax to smooth that over while your mouth gets used to them.' },
    { q: 'How long will I wear braces?', a: 'Most courses run somewhere between 12 and 24 months depending on how much the teeth need to move. You will get a realistic estimate once Dr Aleksandra has assessed your teeth and bite.' },
  ];
  return (
    <>
      <SEO
        title="Fixed Braces Malta | Metal & Ceramic Braces | Apex Dental"
        description="Fixed dental braces in Malta at Apex Dental. Metal and clear ceramic braces for children, teenagers and adults, fitted by orthodontist Dr Aleksandra Syrico Mallia."
        canonical={`${siteUrl}/fixed-braces-malta/`}
        image={`${siteUrl}/images/A2.jpg`}
        schemas={[
          serviceSchema('Fixed Braces', 'Fixed orthodontic braces in Malta at Apex Dental, including metal and ceramic braces, fitted by orthodontist Dr Aleksandra Syrico Mallia.', `${siteUrl}/fixed-braces-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Orthodontics', path: '/orthodontics/' }, { name: 'Fixed Braces', path: '/fixed-braces-malta/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A2}
        eyebrow="Fixed Braces Malta"
        title="Fixed braces: the most reliable way to correct a difficult bite"
        subtitle="For all the attention clear aligners get, fixed braces still straighten some cases more predictably than anything else. At Apex Dental they are fitted and managed by our orthodontist, Dr Aleksandra Syrico Mallia, for children, teenagers and adults."
      />
      <SplitEditorial
        imageLeft={images.aligners.A3}
        title="When braces are the better tool"
        text="Aligners are excellent for many cases, but certain movements are simply harder to achieve with removable trays — larger shifts, rotating a tooth, and more complex bite corrections among them. Fixed braces stay on the teeth and work continuously, which gives the orthodontist more control over exactly how each tooth moves. Where that control is what your case needs, braces are the honest recommendation."
        points={[
          'Reliable for complex movements and bite correction',
          'Continuous, controlled tooth movement',
          'Suitable across a wide range of ages',
          'Nothing to remember to wear',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="Metal or clear ceramic"
        text="Braces have come a long way. Modern metal brackets are much smaller and neater than the ones you might remember, and they remain the most efficient option. If you would rather they did not show, tooth-coloured ceramic brackets blend in with your teeth and are far less noticeable from a normal talking distance. Dr Aleksandra will talk you through how visible each really is so you can choose with realistic expectations."
        points={[
          'Small, neat modern metal brackets',
          'Tooth-coloured ceramic for discretion',
          'Honest guidance on visibility',
          'Chosen to suit your case and preference',
        ]}
        dark
        reverse
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Considering braces?" text="Book an orthodontic consultation with Dr Aleksandra Syrico Mallia. She will check your teeth and bite and explain whether fixed braces or clear aligners will get you the best result." />
    </>
  );
}

function OrthixPage() {
  const faqs = [
    { q: 'What is Orthix?', a: 'Orthix is our own clear aligner, designed and produced in-house at Apex Dental rather than ordered from an overseas lab. Your case is planned by our orthodontist, Dr Aleksandra Syrico Mallia, and the aligners are made here in Malta.' },
    { q: 'How is Orthix more affordable than the big brands?', a: 'Most clinics pay an international lab for every aligner case, and that markup ends up on your bill. Because we plan and produce Orthix ourselves, we cut out that middle step and pass the saving on, without handing clinical control to a company abroad.' },
    { q: 'Is Orthix as good as Invisalign?', a: 'Clear aligners all work on the same principle — a series of trays that move your teeth a little at a time. What really decides the result is the planning and the clinician behind it. With Orthix that planning stays in-house with our orthodontist, who follows your case from the first scan to the final tray.' },
    { q: 'How long does Orthix treatment take?', a: 'Most cases run between 6 and 18 months depending on how far the teeth need to move. You get a realistic timeframe once your teeth have been scanned and Dr Aleksandra has assessed what is involved.' },
  ];
  return (
    <>
      <SEO
        title="Orthix Clear Aligners Malta | Made In-House | Apex Dental"
        description="Orthix is Apex Dental's own clear aligner, designed and produced in-house in Malta. Faster to start and more affordable than international brands, planned by our orthodontist."
        canonical={`${siteUrl}/orthix-aligners/`}
        image={`${siteUrl}/images/A1.jpg`}
        schemas={[
          serviceSchema('Orthix Clear Aligners', 'Orthix is the in-house clear aligner designed and produced at Apex Dental in Malta, planned by orthodontist Dr Aleksandra Syrico Mallia.', `${siteUrl}/orthix-aligners/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Orthodontics', path: '/orthodontics/' }, { name: 'Orthix Aligners', path: '/orthix-aligners/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A1}
        eyebrow="Orthix — In-House Clear Aligners"
        title="Orthix: our own clear aligner, designed and made here in Malta"
        subtitle="Orthix is Apex Dental's in-house aligner. Planned by our orthodontist and produced on site rather than sent to a lab abroad, it brings the cost of clear-aligner treatment down without giving up clinical control of your case."
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Why we built our own aligner"
        text="We treated enough aligner cases to know the weak point in the usual setup: the case gets shipped to a large international lab, you wait, and the lab's fee lands on the patient's bill. Producing Orthix ourselves removes that step. Dr Aleksandra plans every case directly, there is less waiting between your scan and starting, and the price comes down because there is no overseas markup to cover."
        points={[
          'Planned and produced at our own clinic in Malta',
          'No overseas lab fee, so a lower price',
          'Less waiting between scan and starting treatment',
          'Full clinical control kept in-house with our orthodontist',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="What treatment looks like"
        text="It starts with a digital scan of your teeth — no putty impressions. From that we build a plan showing how your teeth will move and where they finish, so you can see the projected result before committing. You then wear a series of near-invisible trays, swapping to the next set as your teeth shift, with short check-ups along the way to keep things on track."
        points={[
          'Digital scan instead of putty impressions',
          'See your projected result before you start',
          'Near-invisible removable trays',
          'Short progress reviews with the orthodontist',
        ]}
        dark
        reverse
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Interested in Orthix aligners?" text="Book a consultation with Dr Aleksandra Syrico Mallia. She will scan your teeth, tell you whether Orthix suits your case, and give you a clear plan, timeframe and price." />
    </>
  );
}

function ClearCorrectPage() {
  const faqs = [
    { q: 'What is ClearCorrect?', a: 'ClearCorrect is a clear aligner system made by the Straumann Group, one of the best-known names in dentistry. Like other aligners it straightens teeth with a series of clear removable trays, and at Apex Dental every ClearCorrect case is planned and monitored by our orthodontist.' },
    { q: 'How discreet are ClearCorrect aligners?', a: 'Very. The trays are clear and sit closely over your teeth, so for everyday situations most people will not notice you are wearing them. They are removable too, so there is nothing on show when you eat or clean your teeth.' },
    { q: 'How does ClearCorrect compare with Invisalign or Orthix?', a: 'All three are clear aligner systems and the day-to-day experience is similar. ClearCorrect is often a cost-effective route for suitable cases, Invisalign has the longest track record, and our in-house Orthix keeps planning and production with us. Dr Aleksandra will recommend the one that fits your case and budget.' },
    { q: 'How long will treatment take?', a: 'Typically somewhere between 6 and 18 months depending on how much movement is needed. We give you a realistic estimate once your teeth have been scanned and assessed.' },
  ];
  return (
    <>
      <SEO
        title="ClearCorrect Malta | Clear Aligners | Apex Dental"
        description="ClearCorrect clear aligners in Malta at Apex Dental. A Straumann Group aligner system for discreet teeth straightening, planned and monitored by our orthodontist."
        canonical={`${siteUrl}/clearcorrect-malta/`}
        image={`${siteUrl}/images/A2.jpg`}
        schemas={[
          serviceSchema('ClearCorrect Clear Aligners', 'ClearCorrect clear aligner treatment in Malta at Apex Dental, planned by orthodontist Dr Aleksandra Syrico Mallia.', `${siteUrl}/clearcorrect-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Orthodontics', path: '/orthodontics/' }, { name: 'ClearCorrect', path: '/clearcorrect-malta/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A2}
        eyebrow="ClearCorrect Aligners Malta"
        title="ClearCorrect: discreet clear aligners from the Straumann Group"
        subtitle="ClearCorrect is a well-established clear aligner system made by Straumann, a name dentists know and trust. At Apex Dental your treatment is planned and followed through by our orthodontist, Dr Aleksandra Syrico Mallia."
      />
      <SplitEditorial
        imageLeft={images.aligners.A3}
        title="Straighten your teeth without anyone noticing"
        text="ClearCorrect uses a series of clear, removable trays that move your teeth gradually into a better position. There is no metal and nothing fixed to your teeth, so for most everyday situations the aligners go unnoticed. You take them out to eat and to clean your teeth, which keeps things simple day to day."
        points={[
          'Clear, removable trays — no visible braces',
          'Made by the Straumann Group',
          'Comes out for eating and cleaning',
          'Planned and monitored by our orthodontist',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="Planned around your case, not a one-size approach"
        text="Aligners only work well when the plan behind them is right. We scan your teeth, work out whether ClearCorrect is the best fit for what you need, and map the movement out before you start. If another system or fixed braces would serve you better, Dr Aleksandra will tell you straight rather than push a single option."
        points={[
          'Digital scan and a planned tooth-by-tooth result',
          'Honest advice on whether it is the right system',
          'Comparable options including in-house Orthix',
          'Reviews along the way to keep on track',
        ]}
        dark
        reverse
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Considering ClearCorrect?" text="Book a consultation with Dr Aleksandra Syrico Mallia to find out whether ClearCorrect is the right aligner for your case, with a clear plan and price." />
    </>
  );
}

function OrdolinePage() {
  const faqs = [
    { q: 'What is Ordoline?', a: 'Ordoline is a clinician-led clear aligner system designed to handle more demanding cases. Rather than relying on aligners alone, it combines them with orthodontic auxiliaries — small additions that give the control usually associated with fixed braces.' },
    { q: 'What makes Ordoline suited to complex cases?', a: 'Aligners on their own struggle with certain movements. Ordoline integrates tools such as mini-screws, power arms and segmental mechanics, which lets us treat rotations, larger movements and trickier bites more predictably than aligners alone typically manage.' },
    { q: 'Is Ordoline right for me?', a: 'It depends on your case. For straightforward crowding or spacing, a simpler aligner like our in-house Orthix may be all you need. Where the bite or the movements are more involved, Ordoline can be the better tool. Dr Aleksandra assesses this before recommending anything.' },
    { q: 'How long does treatment take?', a: 'It varies with the complexity of the case, but most run between 6 and 18 months. You will get a realistic estimate after your teeth are scanned and assessed.' },
  ];
  return (
    <>
      <SEO
        title="Ordoline Aligners Malta | Clear Aligners for Complex Cases | Apex Dental"
        description="Ordoline clear aligners in Malta at Apex Dental. A clinician-led aligner system with hybrid mechanics for more complex orthodontic cases, planned by our orthodontist."
        canonical={`${siteUrl}/ordoline-aligners-malta/`}
        image={`${siteUrl}/images/A3.jpg`}
        schemas={[
          serviceSchema('Ordoline Clear Aligners', 'Ordoline clinician-led clear aligner treatment in Malta at Apex Dental for more complex cases, planned by orthodontist Dr Aleksandra Syrico Mallia.', `${siteUrl}/ordoline-aligners-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Orthodontics', path: '/orthodontics/' }, { name: 'Ordoline Aligners', path: '/ordoline-aligners-malta/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A3}
        eyebrow="Ordoline Aligners Malta"
        title="Ordoline: clear aligners built for the harder cases"
        subtitle="Some cases are more than a simple aligner can handle. Ordoline is a clinician-led system that combines aligners with orthodontic auxiliaries, giving the kind of control normally associated with fixed braces — used at Apex Dental for more complex corrections."
      />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="When aligners alone are not enough"
        text="Clear aligners are excellent for a lot of cases, but certain movements — rotations, larger shifts, more difficult bites — are hard to achieve with trays on their own. Ordoline is designed for exactly these situations, integrating tools such as mini-screws, power arms and segmental mechanics so more demanding cases can still be treated predictably."
        points={[
          'Built for rotations, larger movements and tricky bites',
          'Combines aligners with orthodontic auxiliaries',
          'Control closer to fixed braces',
          'Clinician-led planning throughout',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="The right system for the right case"
        text="Not everyone needs a system like this. For simpler crowding or spacing, our in-house Orthix or another aligner may be all that is required. Where the case is more involved, Ordoline earns its place. Dr Aleksandra assesses your teeth and bite first and recommends on that basis, so you are matched to the system your case actually needs."
        points={[
          'Honest assessment before recommending',
          'Simpler options offered where they suit',
          'Reserved for cases that genuinely benefit',
          'Planned and followed by our orthodontist',
        ]}
        dark
        reverse
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Have a more complex case?" text="Book a consultation with Dr Aleksandra Syrico Mallia. She will assess your teeth and bite and tell you whether Ordoline, another aligner, or fixed braces is the best route." />
    </>
  );
}

function CristalinePage() {
  const faqs = [
    { q: 'What is Cristaline?', a: 'Cristaline is a German-made clear aligner system, produced to ISO 13485 medical-device standards. The aligners are clear and made from a three-layer biocompatible material designed to deliver steady, consistent force as your teeth move.' },
    { q: 'What does German manufacturing mean for me?', a: 'It means the aligners are made under strict European quality controls, with consistent materials and finishing. For you that translates into reliable, comfortable trays and a treatment plan you can trust.' },
    { q: 'Do I see the result before starting?', a: 'Yes. Cristaline provides a 3D visualisation of how your teeth will move, so you can see the projected end result before committing to treatment. We go through it with you at the planning stage.' },
    { q: 'How long does treatment take?', a: 'Most cases run between 6 and 18 months depending on how much the teeth need to move. We give you a realistic timeframe once your teeth are scanned and assessed.' },
  ];
  return (
    <>
      <SEO
        title="Cristaline Aligners Malta | German-Made Clear Aligners | Apex Dental"
        description="Cristaline clear aligners in Malta at Apex Dental. German-made, ISO 13485 aligners in a three-layer biocompatible material with a 3D treatment preview, planned by our orthodontist."
        canonical={`${siteUrl}/cristaline-aligners-malta/`}
        image={`${siteUrl}/images/A4.jpg`}
        schemas={[
          serviceSchema('Cristaline Clear Aligners', 'Cristaline German-made clear aligner treatment in Malta at Apex Dental, planned by orthodontist Dr Aleksandra Syrico Mallia.', `${siteUrl}/cristaline-aligners-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Orthodontics', path: '/orthodontics/' }, { name: 'Cristaline Aligners', path: '/cristaline-aligners-malta/' }]),
        ]}
      />
      <PageHero
        image={images.aligners.A4}
        eyebrow="Cristaline Aligners Malta"
        title="Cristaline: German-made clear aligners with a quality pedigree"
        subtitle="Cristaline aligners are produced in Germany to ISO 13485 medical-device standards, in a three-layer biocompatible material built for steady, predictable tooth movement. At Apex Dental they are planned and monitored by our orthodontist."
      />
      <SplitEditorial
        imageLeft={images.aligners.A1}
        title="Quality you can feel"
        text="Cristaline aligners are made under strict German manufacturing standards, certified to ISO 13485. The three-layer material is designed to keep a constant, gentle force on the teeth with minimal loss between changes, which makes for comfortable trays and movement you can rely on through the course of treatment."
        points={[
          'Made in Germany to ISO 13485 standards',
          'Three-layer biocompatible material',
          'Consistent, gentle force as teeth move',
          'Clear and removable — discreet day to day',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="See the result before you commit"
        text="Cristaline cases come with a 3D visualisation of the planned tooth movement, so before you start you can see where your smile is heading. We talk it through with you at the planning stage, and Dr Aleksandra confirms it is the right system for your case rather than starting something that will not get you the result you want."
        points={[
          '3D preview of your projected result',
          'Planned with our orthodontist',
          'Matched to your case and goals',
          'Reviews along the way to stay on track',
        ]}
        dark
        reverse
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Interested in Cristaline aligners?" text="Book a consultation with Dr Aleksandra Syrico Mallia to see whether Cristaline is the right clear aligner for your case, with a clear plan and price." />
    </>
  );
}

function StudiesSection({ eyebrow, heading, intro, studies, dark = false }) {
  const wrap = dark ? 'bg-navy-900 text-white' : 'bg-white text-navy-900';
  const card = dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-ivory';
  const body = dark ? 'text-slate-300' : 'text-slate-600';
  return (
    <section className={`${wrap} py-20`}>
      <Section>
        <div className={`text-sm uppercase tracking-[0.25em] mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{eyebrow}</div>
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 max-w-3xl">{heading}</h2>
        <p className={`leading-8 mb-12 max-w-3xl ${body}`}>{intro}</p>
        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((st, i) => (
            <div key={i} className={`rounded-3xl border p-7 ${card}`}>
              <p className={`leading-7 mb-4 ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{st.finding}</p>
              <div className="flex items-center justify-between gap-4">
                <span className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{st.source}</span>
                <a href={st.url} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium shrink-0 ${dark ? 'text-gold-300 hover:text-gold-200' : 'text-gold-700 hover:text-gold-800'}`}>View study &rarr;</a>
              </div>
            </div>
          ))}
        </div>
        <p className={`text-xs mt-8 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Survival and success figures are drawn from published clinical studies and reflect averages across many patients; your own outcome depends on your case, bone, general health and aftercare.</p>
      </Section>
    </section>
  );
}

function StraumannImplantsPage() {
  const faqs = [
    { q: 'What are Straumann implants?', a: 'Straumann is a Swiss implant manufacturer widely regarded as one of the leading names in dentistry, backed by decades of research. Their implants are known for the SLA and SLActive surfaces, which are designed to help the implant integrate with the bone quickly and reliably.' },
    { q: 'Why does the implant brand matter?', a: 'The body and surface of an implant affect how well and how quickly it fuses with your bone, and a well-documented brand means replacement parts and components are available for years to come. Straumann has some of the longest published track records in the field, which is reassuring for something meant to last decades.' },
    { q: 'What is SLActive?', a: 'SLActive is Straumann\'s hydrophilic implant surface, engineered to speed up early healing. In their documentation it is reported to shorten the integration period compared with older surfaces, which can mean a faster route to your final teeth in suitable cases.' },
    { q: 'Do you use Straumann implants at Apex Dental?', a: 'Yes. Dr Jonathan Mifsud places Straumann implants as part of our implant treatment. During your consultation we will explain which system suits your case and why.' },
  ];
  const studies = [
    { finding: 'A retrospective study of 1,692 Straumann tissue-level implants reported a 10-year cumulative survival rate of around 98% at the implant level.', source: 'PubMed, 10-year radiographic study', url: 'https://pubmed.ncbi.nlm.nih.gov/30110515/' },
    { finding: 'A cohort of 4,591 Straumann implants placed in a private-practice setting found a survival rate of about 98% with up to 10 years of follow-up.', source: 'PubMed, retrospective cohort', url: 'https://pubmed.ncbi.nlm.nih.gov/25134415/' },
    { finding: 'A clinical evaluation of Straumann implants reported high clinical performance and survival rates across the patient group studied.', source: 'Scientific Reports (Nature)', url: 'https://www.nature.com/articles/s41598-021-89112-8' },
  ];
  return (
    <>
      <SEO
        title="Straumann Implants Malta | Premium Swiss Implants | Apex Dental"
        description="Straumann dental implants in Malta at Apex Dental. Premium Swiss implants with SLActive surface technology and a long published track record, placed by Dr Jonathan Mifsud."
        canonical={`${siteUrl}/straumann-implants-malta/`}
        image={`${siteUrl}/images/I1.jpg`}
        schemas={[
          serviceSchema('Straumann Dental Implants', 'Straumann premium Swiss dental implants in Malta at Apex Dental, placed by implantologist Dr Jonathan Mifsud.', `${siteUrl}/straumann-implants-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Dental Implants', path: '/dental-implants/' }, { name: 'Straumann Implants', path: '/straumann-implants-malta/' }]),
        ]}
      />
      <PageHero
        image={images.implants.straumann}
        eyebrow="Straumann Implants Malta"
        title="Straumann implants: premium Swiss engineering for a tooth meant to last"
        subtitle="When you are replacing a tooth root for the long term, the implant you choose matters. At Apex Dental we place Straumann implants — a Swiss system with one of the longest and strongest research records in dentistry — fitted by implantologist Dr Jonathan Mifsud."
      />
      <SplitEditorial
        imageLeft={images.implants.I2}
        title="Why we place Straumann"
        text="There are many implant brands, and they are not all equal. Straumann has spent decades researching how implants bond to bone, and the result is a system with predictable healing and a vast body of published evidence behind it. For you that means an implant from a manufacturer that will still be supplying matching components in fifteen or twenty years, which matters for something designed to stay in your jaw for life."
        points={[
          'Swiss-made, research-led implant system',
          'SLA and SLActive surfaces for reliable integration',
          'Decades of published clinical data',
          'Components supported long into the future',
        ]}
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="SLActive: engineered for faster healing"
        text="The surface of an implant is where it meets your bone, and it is what Straumann has focused much of its research on. Their SLActive surface is hydrophilic, designed to encourage bone cells to attach sooner. In Straumann\'s own documentation this shortens the early healing phase compared with older surfaces, which in suitable cases can bring your final teeth a little closer."
        points={[
          'Hydrophilic surface that speeds early healing',
          'Designed for predictable osseointegration',
          'Useful in immediate and complex cases',
          'Backed by the manufacturer\'s research',
        ]}
        dark
        reverse
      />
      <StudiesSection
        eyebrow="What the Research Shows"
        heading="The evidence behind Straumann implants"
        intro="Implant success is not a marketing claim — it is measured over years in clinical studies. Here is a selection of published research on Straumann implant survival. We have linked the original sources so you can read them yourself."
        studies={studies}
        dark
      />
      <FAQSection faqs={faqs} />
      <CTASection dark title="Considering implants?" text="Book a consultation with Dr Jonathan Mifsud to discuss Straumann implant treatment for your case, with a clear plan and price." />
    </>
  );
}

function AllOn4Page() {
  const faqs = [
    { q: 'What is All-on-4?', a: 'All-on-4 replaces a full arch of missing teeth using just four implants to support a fixed bridge. Two implants are placed straight at the front and two are angled at the back, which makes the most of the bone you already have and often avoids the need for grafting.' },
    { q: 'Can I get teeth on the same day?', a: 'In many All-on-4 cases a fixed temporary set of teeth can be fitted on the day of surgery, so you do not leave without teeth. Your final bridge is made once everything has healed. Whether same-day teeth are right for you depends on your bone and bite, which we assess first.' },
    { q: 'How long do All-on-4 implants last?', a: 'Published long-term studies report high survival over 10 years and beyond. As with any implant, longevity depends on your gum health, general health and keeping up with maintenance visits.' },
    { q: 'Is All-on-4 better than dentures?', a: 'For most people, yes. Unlike a denture, All-on-4 is fixed in place — it does not come out at night, does not cover the roof of your mouth, and lets you eat and speak with confidence. It is a bigger investment, but it is a permanent solution rather than an appliance.' },
  ];
  const studies = [
    { finding: 'Maló and colleagues followed 245 patients with 980 All-on-4 implants and reported implant success of 98.1% at five years and 94.8% at up to ten years, with prosthesis survival of 99.2%.', source: 'PubMed, longitudinal study', url: 'https://pubmed.ncbi.nlm.nih.gov/21357865/' },
    { finding: 'A longer follow-up of 471 patients (1,884 implants) over 10 to 18 years found a prosthetic survival rate of 98.8% and implant survival of 93.0%.', source: 'PubMed, 10–18 year study', url: 'https://pubmed.ncbi.nlm.nih.gov/30924309/' },
    { finding: 'A systematic review of the All-on-4 treatment concept confirmed it as a predictable option for full-arch rehabilitation.', source: 'PMC, systematic review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5347302/' },
    { finding: 'Nobel Biocare reports up to 18 years of documented clinical success for the All-on-4 treatment concept.', source: 'Nobel Biocare, science review', url: 'https://www.nobelbiocare.com/en-int/blog/science-first/all-on-4-treatment-concept-high-rates-of-long-term-clinical-success' },
  ];
  return (
    <>
      <SEO
        title="All-on-4 Dental Implants Malta | Full Arch | Apex Dental"
        description="All-on-4 dental implants in Malta at Apex Dental. A fixed full arch of teeth on four implants, often with same-day temporary teeth. Placed by implantologist Dr Jonathan Mifsud."
        canonical={`${siteUrl}/all-on-4-malta/`}
        image={`${siteUrl}/images/I4.jpg`}
        schemas={[
          serviceSchema('All-on-4 Dental Implants', 'All-on-4 full-arch dental implant treatment in Malta at Apex Dental, placed by implantologist Dr Jonathan Mifsud.', `${siteUrl}/all-on-4-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Dental Implants', path: '/dental-implants/' }, { name: 'All-on-4', path: '/all-on-4-malta/' }]),
        ]}
      />
      <PageHero
        image={images.implants.I4}
        eyebrow="All-on-4 Implants Malta"
        title="A full set of fixed teeth on four implants"
        subtitle="All-on-4 replaces an entire arch of missing teeth with a fixed bridge anchored on four implants. It is a well-documented solution for people who have lost most of their teeth or are tired of a loose denture, and at Apex Dental it is planned and placed by Dr Jonathan Mifsud."
      />
      <SplitEditorial
        imageLeft={images.implants.I2}
        title="How All-on-4 works"
        text="Instead of one implant per missing tooth, All-on-4 uses four. The two at the back are angled to take advantage of the denser bone toward the front of the jaw, which often means treatment can go ahead without bone grafting even when some bone has been lost. A full bridge is fixed onto those four implants, giving you a complete arch of teeth that stays put."
        points={[
          'A full fixed arch on four implants',
          'Angled implants make the most of available bone',
          'Often avoids the need for bone grafting',
          'Nothing removable — it stays in place',
        ]}
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="Often teeth on the same day"
        text="One of the reasons All-on-4 is so popular is that a fixed set of temporary teeth can frequently be fitted on the day of surgery. You go in with failing teeth or a denture and leave with a fixed set the same day, then return for your permanent bridge once the implants have fully healed. Whether immediate teeth suit you depends on your bone and bite, which we check during planning."
        points={[
          'Fixed temporary teeth often fitted same day',
          'No long gap without teeth',
          'Permanent bridge after healing',
          'Suitability confirmed at planning stage',
        ]}
        dark
        reverse
      />
      <StudiesSection
        eyebrow="What the Research Shows"
        heading="The evidence behind All-on-4"
        intro="All-on-4 is one of the most studied treatments in implant dentistry, with follow-up now stretching beyond fifteen years. Here is a selection of the published evidence, with links to the original studies."
        studies={studies}
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Thinking about All-on-4?" text="Book a consultation with Dr Jonathan Mifsud. He will assess your jaw with a 3D scan and explain whether All-on-4 — or All-on-6 — is the right approach for you." />
    </>
  );
}

function AllOn6Page() {
  const faqs = [
    { q: 'What is All-on-6?', a: 'All-on-6 replaces a full arch of teeth with a fixed bridge supported by six implants instead of four. The two extra implants spread the chewing load across more points, which can be an advantage in certain cases, particularly in the upper jaw or where more support is wanted.' },
    { q: 'All-on-4 or All-on-6 — which do I need?', a: 'It comes down to your bone and your case. All-on-4 is enough for many people and makes the most of limited bone. All-on-6 can be the better choice where there is good bone volume and you want to distribute the load more widely. Dr Jonathan Mifsud decides this from your 3D scan, not as a default.' },
    { q: 'Does All-on-6 last longer than All-on-4?', a: 'Published studies show both designs achieve high survival rates over ten years and more, and the difference in survival is small. The extra implants in All-on-6 mainly help with load distribution and can reduce stress on the prosthesis rather than dramatically changing implant survival.' },
    { q: 'Can I have same-day teeth with All-on-6?', a: 'Often yes, in the same way as All-on-4 — a fixed temporary set can frequently be placed on the day of surgery, with the final bridge fitted after healing. We confirm whether this is suitable for you during planning.' },
  ];
  const studies = [
    { finding: 'A clinical case series treating full arches with the All-on-4 and All-on-6 concepts using a digital workflow reported an overall implant survival rate of 98.3%.', source: 'Stomatology MFS Journal, case series', url: 'https://stomatology-mfsjournal.com/wp-content/uploads/2026/04/Full-Arch-Implant-Rehabilitation-Using-the-All-on-4%C2%AE-and-All-on-6%C2%AE-Concepts-with-Digital-Workflow-A-Clinical-Case-Series-1-1-2.pdf' },
    { finding: 'A retrospective study compared immediate full-arch rehabilitation on four or six implants with follow-up of up to 10 years, reporting high survival for both approaches.', source: 'PMC, up to 10-year study', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10092257/' },
    { finding: 'Systematic reviews report 10-year survival above 95% for both four- and six-implant full-arch designs, with the choice driven by bone volume and load distribution rather than survival alone.', source: 'PMC, systematic review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5347302/' },
  ];
  return (
    <>
      <SEO
        title="All-on-6 Dental Implants Malta | Full Arch | Apex Dental"
        description="All-on-6 dental implants in Malta at Apex Dental. A fixed full arch of teeth on six implants for wider load distribution, placed by implantologist Dr Jonathan Mifsud."
        canonical={`${siteUrl}/all-on-6-malta/`}
        image={`${siteUrl}/images/I1.jpg`}
        schemas={[
          serviceSchema('All-on-6 Dental Implants', 'All-on-6 full-arch dental implant treatment in Malta at Apex Dental, placed by implantologist Dr Jonathan Mifsud.', `${siteUrl}/all-on-6-malta/`),
          faqSchema(faqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Dental Implants', path: '/dental-implants/' }, { name: 'All-on-6', path: '/all-on-6-malta/' }]),
        ]}
      />
      <PageHero
        image={images.implants.I1}
        eyebrow="All-on-6 Implants Malta"
        title="A full fixed arch on six implants for extra support"
        subtitle="All-on-6 restores a complete arch of teeth on six implants rather than four, spreading the load across more points of support. It is a strong full-arch option in the right case, planned and placed at Apex Dental by Dr Jonathan Mifsud."
      />
      <SplitEditorial
        imageLeft={images.implants.I2}
        title="When six implants are the better choice"
        text="All-on-6 follows the same idea as All-on-4 but adds two more implants. Those extra supports spread the forces of chewing more evenly, which can be useful where there is good bone to work with or where a wider, more heavily loaded bridge is planned — often in the upper jaw. It is not automatically better than All-on-4; it is better for certain cases, and the 3D scan tells us which yours is."
        points={[
          'Six implants supporting a fixed full arch',
          'Load spread more evenly across the jaw',
          'Often suited to the upper jaw or larger bridges',
          'Chosen from your scan, not as a default',
        ]}
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="All-on-6 versus All-on-4"
        text="Both are excellent, well-evidenced ways to replace a full arch, and survival rates in the studies are similar. The real question is your bone and how the bite will load the bridge. Where bone is limited, All-on-4 makes the most of it; where there is more to work with, All-on-6 can offer extra support and resilience. We will talk you through the trade-offs honestly so the decision fits your case, not a sales pitch."
        points={[
          'Similar implant survival in the research',
          'All-on-6 adds load distribution and resilience',
          'All-on-4 maximises limited bone',
          'Decision based on your 3D scan and bite',
        ]}
        dark
        reverse
      />
      <StudiesSection
        eyebrow="What the Research Shows"
        heading="The evidence behind full-arch implants"
        intro="Full-arch rehabilitation on four or six implants is well documented in the literature. Here is a selection of published research on survival and outcomes, with links to the original studies."
        studies={studies}
      />
      <FAQSection faqs={faqs} dark />
      <CTASection dark title="Full-arch implants in Malta" text="Book a consultation with Dr Jonathan Mifsud. A 3D scan will show whether All-on-6 or All-on-4 is the right full-arch solution for your jaw." />
    </>
  );
}

function DentalProstheticsPage() {

  return (
    <>
      <SEO
        title="Dental Prosthetics Malta | Replace Missing Teeth | Apex Dental"
        description="Dental prosthetics in Malta at Apex Dental — fixed and removable ways to replace missing teeth, from single crowns to full-arch solutions. Book a consultation."
        canonical={`${siteUrl}/dental-prosthetics/`}
        image={`${siteUrl}/images/H5.jpg`}
        schemas={[
          serviceSchema('Dental Prosthetics', 'Dental prosthetics in Malta at Apex Dental — fixed and removable ways to replace missing teeth, from single crowns to full-arch solutions. Book a consultation.', `${siteUrl}/dental-prosthetics/`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Dental Prosthetics', path: '/dental-prosthetics/' }]),
        ]}
      />
      <PageHero
        image={images.home.H5}
        eyebrow="Dental Prosthetics Malta"
        title="Replacing missing teeth so you can eat and smile normally again"
        subtitle="Prosthetics is the umbrella term for the ways of replacing teeth you have lost — from a single tooth to a whole arch. The right one depends on how many teeth are gone, how much bone is left, and how you want it to feel day to day."
      />
      <SplitEditorial
        imageLeft={images.home.H6}
        title="Fixed or removable, depending on your case"
        text="Some replacements are fixed in place — crowns, bridges, or teeth on implants — and stay put like natural teeth. Others are removable, which can be quicker and more affordable. Which way we go comes down to the number of missing teeth, the bone supporting them, and what you can live with comfortably."
        points={[
          'Fixed and removable options',
          'Replacing one tooth or many',
          'Planned for function and looks',
          'Chosen to fit your situation',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H7}
        title="It has to work in everyday life"
        text="A replacement that looks fine but is awkward to eat with or hard to keep clean is not much use. So as much as the look, we think about how it sits, how stable it is when you chew, and how easy it is to maintain — because that is what decides whether you actually get on with it."
        points={[
          'Stable and comfortable to chew on',
          'Manageable to keep clean',
          'Explained clearly before you commit',
          'Advice on looking after it',
        ]}
        dark
        reverse
      />
      <CTASection
        title="Need advice on prosthetic options?"
        text="Book a consultation and we will go through the ways of replacing your missing teeth — fixed and removable — and which would suit you best."
      />
    </>
  );
}

function RemovableProsthesisPage() {

  return (
    <>
      <SEO
        title="Dentures Malta | Removable Prosthesis | Apex Dental"
        description="Dentures in Malta at Apex Dental. Partial and full removable dentures to replace missing teeth comfortably and affordably. Book a denture consultation today."
        canonical={`${siteUrl}/removable-prosthesis/`}
        image={`${siteUrl}/images/H8.jpg`}
        schemas={[
          serviceSchema('Removable Prosthesis', 'Dentures in Malta at Apex Dental. Partial and full removable dentures to replace missing teeth comfortably and affordably. Book a denture consultation today.', `${siteUrl}/removable-prosthesis/`),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Removable Prosthesis', path: '/removable-prosthesis/' }]),
        ]}
      />
      <PageHero
        image={images.home.H8}
        eyebrow="Removable Prosthesis Malta"
        title="Dentures and removable replacements when fixed options are not the right fit"
        subtitle="A removable denture replaces missing teeth and comes out for cleaning. It is often the more affordable route, and sometimes the most sensible one, depending on how many teeth are missing and the state of the gums and bone supporting it."
      />
      <SplitEditorial
        imageLeft={images.home.H9}
        title="A practical restorative option"
        text="Removable options cover both a partial denture, which fills in around teeth you still have, and a full denture when all the teeth in an arch are gone. They suit cases where fixed work is not possible or not the priority, and they can usually be made faster and for less than implants or bridges."
        points={[
          'Partial and full dentures',
          'A range of materials to choose from',
          'A practical, affordable route',
          'Made to suit your case',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H10}
        title="Getting the fit right, and being straight about it"
        text="A denture lives or dies on its fit. A well-made one is stable and comfortable; a poor one moves and rubs. It also helps to be realistic — even a good denture feels different from natural teeth and takes some getting used to. We would rather tell you that up front than have you find out afterwards."
        points={[
          'Built for fit and stability',
          'Straightforward to clean and wear',
          'Honest about what to expect',
          'Guidance on upkeep and relines',
        ]}
        dark
        reverse
      />
      <CTASection
        dark
        title="Considering denture options?"
        text="Book a consultation and we will look at what you have to work with and talk you through the removable options and how they would feel."
      />
    </>
  );
}

function RootCanalPage() {
  const rootCanalFaqs = [
    { q: 'Is root canal treatment painful?', a: 'The procedure itself is done under local anaesthetic, so you should not feel pain while it is happening — most people are surprised how ordinary it is, not far off having a filling. The pain people associate with root canals is really the infection beforehand, and the treatment is what gets rid of it.' },
    { q: 'How do I know if I need a root canal?', a: 'Common signs are a toothache that will not let up, hot or cold that hurts and then lingers, a tooth going darker than its neighbours, swelling or tenderness in the gum, or a recurring little spot on the gum. None of these is a certainty on its own, so we take an X-ray to confirm what is happening inside the tooth.' },
    { q: 'How long does root canal treatment take?', a: 'Most are done in one or two visits of about 60 to 90 minutes. A front tooth with a single canal is quicker; a back molar with several canals, or a badly infected tooth, takes longer or a second appointment.' },
    { q: 'What happens after root canal treatment?', a: 'A tooth that has had its nerve removed gets more brittle over time, so we usually crown it afterwards to stop it cracking under normal biting. We will go through that plan with you — the root canal saves the tooth, and the crown is what keeps it in service.' },
    { q: 'Can a root-treated tooth last a lifetime?', a: 'It can. Properly sealed, crowned, and kept clean, a root-treated tooth can serve you for the rest of your life. The two things that matter most are getting a crown on it so it does not fracture, and keeping up your regular check-ups.' },
  ];
  const rootCanalSteps = [
    { title: 'Assessment and X-ray', text: 'We examine the tooth and take X-rays to see the canals and how far the infection has reached, and to confirm a root canal is the right call rather than an extraction.' },
    { title: 'Cleaning the canals', text: 'With the tooth numbed, we remove the infected pulp and clean, shape and disinfect the canals to clear out the bacteria causing the trouble.' },
    { title: 'Sealing the tooth', text: 'The cleaned canals are filled with a sealing material to keep bacteria from getting back in, and a filling closes the tooth.' },
    { title: 'Crown placement', text: 'In most cases we follow up with a crown, which protects the now more brittle tooth from cracking and gets it back to full strength.' },
  ];
  return (
    <>
      <SEO
        title="Root Canal Treatment Malta | Apex Dental"
        description="Root canal treatment in Malta at Apex Dental. Comfortable, effective treatment for infected or damaged teeth — saving your natural tooth and relieving pain."
        canonical={`${siteUrl}/root-canal-treatment/`}
        image={`${siteUrl}/images/I2.jpg`}
        schemas={[
          serviceSchema('Root Canal Treatment', 'Root canal treatment in Malta to save infected or damaged teeth and relieve pain.', `${siteUrl}/root-canal-treatment/`),
          faqSchema(rootCanalFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: 'Root Canal Treatment', path: '/root-canal-treatment/' }]),
        ]}
      />
      <PageHero
        image={images.implants.I2}
        eyebrow="Root Canal Treatment Malta"
        title="Stop the pain and keep the tooth with root canal treatment"
        subtitle="Root canals have a worse reputation than they deserve. The tooth is fully numbed for it, and most people walk out saying it was nothing like as bad as they had braced themselves for."
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="When is root canal treatment needed?"
        text="The trouble starts when the soft pulp inside a tooth — the nerve and blood supply — gets infected or inflamed. That can follow deep decay, a crack, repeated work on the same tooth, or a knock. Once the pulp is infected it does not recover on its own, and if it is ignored the infection spreads down to the bone and the tooth is often lost."
        points={['Severe or persistent toothache', 'Prolonged sensitivity to hot or cold', 'Darkening of the tooth', 'Swelling or a gum abscess near the tooth']}
      />
      <SplitEditorial
        imageLeft={images.implants.I4}
        title="The goal is to save your natural tooth"
        text="Nothing replaces a natural tooth quite as well as the tooth itself, so wherever it is sensible we try to save it. A root canal followed by a crown, with decent hygiene afterwards, can keep that tooth working for life — usually a simpler and cheaper path than taking it out and replacing it later."
        points={['Preserves your natural tooth and root', 'Avoids the cost and recovery of extraction and replacement', 'Treated tooth restored with a crown for strength', 'Normal eating and function restored']}
        dark
        reverse
      />
      <ProcessSteps steps={rootCanalSteps} />
      <FAQSection faqs={rootCanalFaqs} />
      <CTASection title="Concerned about a painful tooth?" text="Toothache and swelling do not sort themselves out, and waiting usually makes the treatment bigger. Book an appointment and we will find out what is going on and deal with it." />
    </>
  );
}


function EmergencyPage() {
  const emergencyFaqs = [
    { q: 'What counts as a dental emergency?', a: 'Roughly, anything causing a lot of pain, swelling, bleeding, or sudden serious damage that should not wait. That covers severe toothache, a knocked-out or badly broken tooth, an abscess, a lost crown or filling that is now painful, and any swelling of the face. If you are unsure, it is better to ring and ask than to sit on it.' },
    { q: 'What should I do if a tooth is knocked out?', a: 'Pick it up by the crown, not the root, and rinse it gently with milk or clean water without scrubbing it. If you can, slot it back into the socket and bite gently on a tissue to hold it there. If you cannot, keep it in milk or tucked between your cheek and gum. Then contact us straight away — the sooner a knocked-out tooth goes back in, the better the chance of saving it.' },
    { q: 'How quickly can I be seen at Apex Dental for an emergency?', a: 'We do our best to fit genuine emergencies in as quickly as possible. The fastest thing is to call or WhatsApp, tell us what has happened, and we will find you the earliest slot we can.' },
    { q: 'What can I do at home while waiting to be seen?', a: 'For pain, take ibuprofen or paracetamol as directed on the packet. For swelling, hold a cold compress against the cheek. Steer clear of very hot, cold, or hard foods. If a filling or crown has come out, a pharmacy sells temporary dental cement that will protect the tooth until we see you.' },
    { q: 'Is a dental abscess a dental emergency?', a: 'Yes. An abscess is an infection that can spread if it is left, so it needs looking at promptly. The warning signs are severe throbbing pain, a swollen face or jaw, fever, and trouble swallowing. If you have those, contact us or seek urgent care without waiting.' },
  ];
  const emergencyTypes = [
    { title: 'Severe toothache', text: 'Pain that keeps you up at night or will not ease with painkillers usually means something is going on inside the tooth — an infection, a deep crack, or an abscess — and it needs looking at rather than riding out.' },
    { title: 'Swelling or abscess', text: 'Swelling of the face or gum, or a tender lump near a tooth, points to infection. This is the kind of thing to deal with quickly, because dental infections can spread to the surrounding tissue.' },
    { title: 'Broken or knocked-out tooth', text: 'A knocked-out tooth stands the best chance if it is back in place within the hour, so do not wait. A broken tooth with a sharp edge or exposed nerve also needs seeing soon, even if the pain is bearable.' },
    { title: 'Lost crown, bridge, or filling', text: 'If a crown, bridge or filling has come away and the tooth is now sore or exposed, get in touch. Left open, the tooth is vulnerable to damage and sensitivity, and the longer it is gone the more can go wrong.' },
  ];
  return (
    <>
      <SEO
        title="Emergency Dentist Malta | Apex Dental"
        description="Need an emergency dentist in Malta? Apex Dental provides urgent dental care for toothache, swelling, broken teeth, abscesses, and lost restorations. Open Sunday 9-12. Call or WhatsApp us now."
        canonical={`${siteUrl}/emergency-dental-service-malta/`}
        image={`${siteUrl}/images/CT1.jpg`}
        schemas={[
          serviceSchema('Emergency Dentist Malta', 'Emergency dental care in Malta at Apex Dental. Open Sunday 9am-12pm for emergencies. Urgent assessment for severe toothache, dental abscess, broken teeth, and lost restorations.', `${siteUrl}/emergency-dental-service-malta/`),
          faqSchema(emergencyFaqs),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Emergency Dentist Malta', path: '/emergency-dental-service-malta/' }]),
        ]}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Emergency Dentist Malta"
        title="Urgent dental care when something has gone wrong and cannot wait"
        subtitle="We keep room for emergencies — bad toothache, swelling, a broken or knocked-out tooth, or a lost crown or filling. We are open Sunday 9am to 12pm for emergencies; call or WhatsApp and tell us what has happened."
      />
      <SplitEditorial
        imageLeft={images.contact.CT2}
        title="When should you contact us urgently?"
        text="Not everything is an emergency, but some things should not wait — pain that is hard to control, swelling, or an injury to a tooth. If you are in real pain, your face is swelling, or you have had a knock to the mouth, get in touch the same day. When you are not sure how serious it is, ring anyway and we will tell you."
        points={['Severe or persistent toothache', 'Facial or gum swelling — possible infection or abscess', 'Knocked-out, broken, or cracked tooth', 'Lost crown, bridge, or filling causing pain']}
      />
      <ProcessSteps steps={emergencyTypes} dark />
      <SplitEditorial
        imageLeft={images.contact.CT3}
        title="What to do before you reach us"
        text="Take ibuprofen or paracetamol as directed for the pain. A cold compress on the outside of the cheek helps with swelling. Keep off very hot, cold, hard or chewy food in the meantime. And if a tooth has been knocked out, keep it moist in milk or your own saliva — never let it dry out — and contact us straight away."
        points={['Pain relief: ibuprofen or paracetamol as directed', 'Cold compress to reduce external swelling', 'Keep a knocked-out tooth moist in milk', 'Temporary dental cement for a lost crown from pharmacy']}
        reverse
      />
      <FAQSection faqs={emergencyFaqs} />
      <CTASection dark title="Dental emergency in Malta? Contact us now." text="Call or WhatsApp us and tell us what has happened. We are open Sunday 9am to 12pm for emergencies, and we will assess things and get you seen as soon as we can." />
    </>
  );
}


function BlogPage() {

  return (
    <>
      <SEO
        title="Dental Blog Malta | Apex Dental"
        description="Helpful dental articles from Apex Dental Malta. Read about implant costs, veneers vs whitening, emergency dental care, clear aligners, and preventive dentistry."
        canonical={`${siteUrl}/blog/`}
        image={`${siteUrl}/images/H5.jpg`}
        schema={localBusinessSchema(`${siteUrl}/blog/`)}
      />
      <PageHero
        image={images.home.H5}
        eyebrow="Apex Dental Blog"
        title="Honest dental advice for patients in Malta"
        subtitle="Practical guides on implants, cosmetic dentistry, emergencies, and preventive care — written to help you make informed decisions about your dental health."
      />

      <section className="bg-ivory py-20">
        <Section>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="rounded-[2rem] bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{post.category}</div>
                    <div className="text-xs text-slate-400">{post.readTime}</div>
                  </div>
                  <h2 className="text-xl font-semibold text-navy-900 leading-tight mb-3">{post.title}</h2>
                  <p className="text-slate-600 leading-7 text-sm">{post.excerpt}</p>
                  <Link
                    to={post.slug}
                    className="inline-flex items-center gap-2 mt-5 text-navy-900 font-semibold hover:text-gold-800 transition text-sm"
                  >
                    Read article <ChevronRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </section>

      <CTASection
        title="Have a question not covered here?"
        text="Contact Apex Dental directly and our team will be happy to answer any questions about your dental health or treatment options."
      />
    </>
  );
}


function PriceListPage() {


  return (
    <>
      <SEO
        title="Dental Price List Malta | Apex Dental"
        description="View Apex Dental's price list in Malta for checkups, hygiene, whitening, crowns, veneers, implants, root canal treatment, dentures, and orthodontics."
        canonical={`${siteUrl}/price-list/`}
        image={`${siteUrl}/images/CT1.jpg`}
        schema={serviceSchema(
          'Dental Price List',
          'Dental treatment price list in Malta for common consultations and procedures.',
          `${siteUrl}/price-list/`
        )}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Dental Services Price List"
        title="A detailed treatment price list presented properly"
        subtitle="This restores the broader price structure from the live site in a cleaner premium layout. Final fees may still vary depending on complexity, materials, and case requirements."
      />

      <section className="bg-ivory py-20">
        <Section>
          <div className="space-y-10">
            {priceSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-xl"
              >
                <div className="bg-navy-900 text-white px-8 py-6">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    {section.title}
                  </h2>
                </div>

                <div>
                  {section.items.map((item, idx) => (
                    <div
                      key={`${section.title}-${item.name}`}
                      className={`px-8 py-6 ${
                        idx !== section.items.length - 1
                          ? 'border-b border-slate-200'
                          : ''
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="md:max-w-[75%]">
                          <h3 className="text-lg font-semibold text-navy-900">
                            {item.name}
                          </h3>
                          {item.note && (
                            <p className="mt-2 text-slate-600 leading-7">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="text-xl font-bold text-navy-900 md:text-right">
                          {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <CTASection
        title="Need a personalised estimate?"
        text="Use the price list as a guide, then book a consultation so Apex Dental can assess your case properly and confirm the most suitable treatment plan."
      />
    </>
  );
}

function AppointmentBookingPage() {

  const serviceOptions = [
    'Cosmetic Dentistry',
    'Crowns and Bridgework',
    'Dental Implants',
    'Dental Prosthetics',
    'Removable Prosthesis',
    'Orthodontics',
    'Periodontology',
    'Root Canal Treatment',
    'Teeth Whitening',
    'Veneers',
  ];

  return (
    <>
      <SEO
        title="Book a Dentist Appointment Malta | Apex Dental"
        description="Book a dental appointment at Apex Dental Malta for implants, Invisalign, veneers, hygiene, restorative treatment, and emergency dental care."
        canonical={`${siteUrl}/appointment-booking/`}
        image={`${siteUrl}/images/CT2.jpg`}
        schema={serviceSchema(
          'Dental Appointment Booking',
          'Book a dentist appointment in Malta for consultations, emergency care, cosmetic dentistry, implants, and aligners.',
          `${siteUrl}/appointment-booking/`
        )}
      />
      <PageHero
        image={images.contact.CT2}
        eyebrow="Appointment Booking"
        title="Book your dental appointment online"
        subtitle="Use this page for general visits, cosmetic consultations, implant assessments, prosthetic care, aligners, whitening, and urgent dental needs."
      />

      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div className="rounded-[2.5rem] bg-ivory border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-navy-900">
                Clinic Details
              </h2>
              <div className="mt-6 space-y-5 text-slate-700">
                <div>
                    <div className="font-semibold text-navy-900">Trident Park &mdash; main clinic</div>
                  <div className="mt-1">{brand.address}</div>
                </div>
                  <div>
                    <div className="font-semibold text-navy-900">{brand.stAnnesName}</div>
                    <div className="mt-1">{brand.addressStAnnes}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      An independent Apex Dental practice on Level 3. Closed Sundays.
                    </div>
                  </div>
                <div>
                  <div className="font-semibold text-navy-900">Phone</div>
                  <a
                    href={`tel:${brand.phone}`}
                    className="mt-1 block hover:text-gold-800"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={`tel:${brand.mobile}`}
                    className="mt-1 block hover:text-gold-800"
                  >
                    {brand.mobile}
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-navy-900">Email</div>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 block hover:text-gold-800"
                  >
                    {brand.email}
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-navy-900">Working Hours</div>
                  <div className="mt-1">Monday - Friday: 9 am - 7 pm</div>
                  <div>Saturday: 9 am - 12:30 pm</div>
                  <div>Sunday: 9 am - 12 pm (emergency only)</div>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] overflow-hidden shadow-lg">
                <LazyImg
                  src={images.contact.CT3}
                  alt="Apex Dental clinic entrance"
                  className="w-full h-[260px] object-cover"
                />
              </div>
            </div>

            <div data-hide-booking-bar>
              <BookingFormCard serviceOptions={serviceOptions} />
            </div>
          </div>
        </Section>
      </section>

      <section className="bg-ivory py-16">
        <Section>
          <div className="rounded-[2.5rem] bg-white border border-slate-200 p-8 md:p-10 shadow-sm max-w-3xl">
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">
              Booking Fee &amp; Cancellation Policy
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-navy-900 mb-4">
              A €20 booking fee secures your appointment
            </h2>
            <p className="text-slate-600 leading-8">
              For new patients, emergency appointments, and long appointments we take a
              €20 booking fee to secure your slot. This fee is deducted from your final
              bill when you attend. Please note that the booking fee is non-refundable if
              the appointment is cancelled less than 5 hours before the scheduled time.
            </p>
          </div>
        </Section>
      </section>
    </>
  );
}

function ContactPage() {
  const quickLinks = [
    { label: 'Book appointment', to: '/appointment-booking/' },
    { label: 'Dental implants', to: '/dental-implants/' },
    { label: 'Emergency dental care', to: '/emergency-dental-service-malta/' },
    { label: 'Price list', to: '/price-list/' },
  ];
  return (
    <>
      <SEO
        title="Contact Apex Dental Malta | Book an Appointment"
        description="Contact Apex Dental Malta at Trident Park, Mrieħel, Birkirkara. Call 27016017, WhatsApp 99722185 or fill in our contact form to book your appointment."
        canonical={`${siteUrl}/contact-us/`}
        image={`${siteUrl}/images/CT1.jpg`}
        schema={localBusinessSchema(`${siteUrl}/contact-us/`)}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Contact Apex Dental"
        title="Get in touch — we are at Trident Park, Mrieħel, Birkirkara"
        subtitle="Call us, send a WhatsApp, or fill in the form below. We will get back to you quickly to sort out an appointment or answer anything you are wondering about."
      />

        <ConsultationPrep />
      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <div>
              <div className="rounded-[2rem] bg-ivory border border-slate-200 p-8 mb-6">
                <h2 className="text-2xl font-semibold text-navy-900 mb-6">Contact details</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">Trident Park &mdash; main clinic</div>
                      <div className="text-slate-600 mt-1 leading-7">{brand.address}</div>
                      <a href="https://maps.google.com/?q=Apex+Dental+Trident+Park+Birkirkara+Malta" target="_blank" rel="noopener noreferrer" className="text-gold-700 hover:text-gold-800 text-sm font-medium mt-1 inline-block">Get directions</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">{brand.stAnnesName}</div>
                      <div className="text-slate-600 mt-1 leading-7">{brand.addressStAnnes}</div>
                      <div className="text-sm text-slate-500 mt-1">
                        An independent Apex Dental practice on Level 3.
                      </div>
                      <a
                        href={brand.googleMapsStAnnes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-700 hover:text-gold-800 text-sm inline-block mt-1"
                      >
                        Get directions
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">Phone</div>
                      <a href={`tel:${brand.phone}`} className="text-slate-600 mt-1 block hover:text-gold-800 text-lg font-medium">{brand.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">WhatsApp</div>
                      <a href={`https://wa.me/356${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 mt-1 block hover:text-gold-800 text-lg font-medium">{brand.whatsapp}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">Trident Park opening hours</div>
                      <div className="text-slate-600 mt-1 leading-7">
                        Monday to Friday: 9:00 to 19:00<br />
                        Saturday: 9:00 to 12:30<br />
                        Sunday: 9:00 to 12:00 (emergency only)<br />
                        <span className="text-sm text-slate-500">For Sunday emergencies call or WhatsApp us directly</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="text-gold-700 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-navy-900">
                        St Anne&rsquo;s Clinic opening hours
                      </div>
                      <div className="text-slate-600 mt-1 leading-7">
                        Monday to Friday: 9:00 to 19:00<br />
                        Saturday: 9:00 to 12:30<br />
                        Sunday: closed<br />
                        <span className="text-sm text-slate-500">
                          For Sunday emergencies please contact Trident Park
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 mb-2">
                {brand.name} — Trident Park (main clinic)
              </p>
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="Apex Dental Malta — Trident Park, Mrieħel, Birkirkara"
                  src={brand.mapEmbedTrident}
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
                  <p className="text-sm text-slate-500 mt-4 mb-2">
                    {brand.stAnnesName} — Level 3
                  </p>
                  <div className="rounded-[2rem] overflow-hidden border border-slate-200">
                    <iframe
                      title="Apex Dental at St Anne&rsquo;s Clinic, Level 3, Birkirkara"
                      src={brand.mapEmbedStAnnes}
                      width="100%"
                      height="320"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
            </div>
            <div data-hide-booking-bar>
              <ContactFormCard />
            </div>
          </div>
        </Section>
      </section>
      <section className="bg-ivory py-16">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-8">Quick access</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex items-center gap-3">
                <ChevronRight className="text-gold-700 shrink-0" size={18} />
                <span className="font-medium text-navy-900">{link.label}</span>
              </Link>
            ))}
          </div>
        </Section>
      </section>
    </>
  );
}


function ServicesPage() {

  const serviceGroups = [
    {
      title: 'Implant & Restorative Dentistry',
      description:
        'Replacing teeth you have lost and rebuilding ones that are damaged — from implants and crowns through to dentures and root canal work.',
      items: [
        {
          title: 'Dental Implants',
          to: '/dental-implants/',
          text: 'From a single missing tooth to a full arch on implants, planned and placed in-house.',
          image: images.implants.I1,
        },
        {
          title: 'Crowns & Bridgework',
          to: '/crowns-and-bridgework/',
          text: 'Crowns to cap weakened teeth and bridges to fill the gap where one is missing.',
          image: images.home.H4,
        },
        {
          title: 'Dental Prosthetics',
          to: '/dental-prosthetics/',
          text: 'Ways to replace missing teeth, fixed or removable, chosen around how they feel day to day.',
          image: images.home.H5,
        },
        {
          title: 'Removable Prosthesis',
          to: '/removable-prosthesis/',
          text: 'Partial and full dentures, made to fit and sit as stably as they can.',
          image: images.home.H8,
        },
        {
          title: 'Root Canal Treatment',
          to: '/root-canal-treatment/',
          text: 'Clearing infection inside a tooth to settle the pain and save the tooth itself.',
          image: images.home.H6,
        },
      ],
    },
    {
      title: 'Cosmetic & Smile Enhancement',
      description:
        'Changing how your smile looks — its colour, shape and how evenly the teeth line up — while keeping the result believable rather than obvious.',
      items: [
        {
          title: 'Cosmetic Dentistry',
          to: '/cosmetic-dentistry-malta',
          text: 'Whitening, veneers and bonding to improve a smile without making it look done.',
          image: images.cosmetic.C1,
        },
        {
          title: 'Veneers',
          to: '/veneers/',
          text: 'Porcelain or composite shells that change the shape, colour and line of your front teeth.',
          image: images.cosmetic.C2,
        },
        {
          title: 'Teeth Whitening',
          to: '/teeth-whitening/',
          text: 'Custom-tray and in-clinic whitening that lifts the colour evenly and safely.',
          image: images.cosmetic.C3,
        },
      ],
    },
    {
      title: 'Orthodontic & Alignment Treatments',
      description:
        'Moving crowded, gappy or crooked teeth into better positions, and correcting how they bite together.',
      items: [
        {
          title: 'Clear Aligners',
          to: '/invisalign-malta/',
          text: 'Clear, removable trays that straighten teeth without the metal of fixed braces.',
          image: images.aligners.A1,
        },
        {
          title: 'Orthodontic Treatment',
          to: '/orthodontics/',
          text: 'Aligners or fixed braces to sort crowding, gaps and an uneven bite.',
          image: images.aligners.A3,
        },
      ],
    },
    {
      title: 'Preventive & Gum Care',
      description:
        'The routine care that keeps problems small — check-ups, professional cleans, and looking after your gums.',
      items: [
        {
          title: 'General Dentistry',
          to: '/general-dentistry/',
          text: 'Check-ups, fillings and the everyday care most visits are about.',
          image: images.home.H5,
        },
        {
          title: 'Dental Hygiene',
          to: '/dental-hygiene/',
          text: 'A professional clean that gets at the tartar brushing leaves behind.',
          image: images.home.H9,
        },
        {
          title: 'Periodontology',
          to: '/periodontology/',
          text: 'Treatment for gums that bleed, recede or have started to loosen teeth.',
          image: images.home.H10,
        },
      ],
    },
    {
      title: 'Urgent Dental Care',
      description:
        'Prompt help when something has gone wrong — pain, swelling, a broken tooth, or a knock to the mouth.',
      items: [
        {
          title: 'Emergency Dentist',
          to: '/emergency-dental-service-malta/',
          text: 'Prompt help for toothache, swelling, broken teeth and knocks to the mouth.',
          image: images.contact.CT1,
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Dental Services Malta | Apex Dental"
        description="Explore Apex Dental's services in Malta including dental implants, Invisalign, veneers, whitening, crowns, root canal treatment, prosthetics, hygiene, and emergency dentistry."
        canonical={`${siteUrl}/services/`}
        image={`${siteUrl}/images/H2.jpg`}
        schema={serviceSchema(
          'Dental Services',
          'Comprehensive dental services in Malta including implants, cosmetic dentistry, aligners, restorative care, and emergency treatment.',
          `${siteUrl}/services/`
        )}
      />
      <PageHero
        image={images.home.H2}
        eyebrow="Dental Services Malta"
        title="Everything we treat, in one place"
        subtitle="From routine check-ups to implants, cosmetic work, aligners and emergencies — here is the full range of what we do and where to read more on each."
      />

      <section className="bg-white py-20">
        <Section>
          <div className="max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Apex Dental Services
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-navy-900 leading-tight">
              Not sure which treatment you need? Start here
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-8">
              This is the place to get your bearings. The treatments are grouped by what they are
              for, so you can find the right one and read more about it — and if you are still not
              sure, that is exactly what a consultation is for.
            </p>
          </div>
        </Section>
      </section>

      {serviceGroups.map((group, groupIndex) => (
        <section
          key={group.title}
          className={groupIndex % 2 === 0 ? 'bg-ivory py-20' : 'bg-white py-20'}
        >
          <Section>
            <div className="max-w-4xl mb-12">
              <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Service Category
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-navy-900 leading-tight">
                {group.title}
              </h2>
              <p className="mt-5 text-lg text-slate-600 leading-8">
                {group.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group rounded-[2rem] overflow-hidden bg-navy-900 text-white relative min-h-[460px] shadow-xl"
                >
                  <LazyImg
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-transparent" />

                  <div className="relative p-8 h-full flex flex-col justify-end">
                    <div className="text-sm uppercase tracking-[0.25em] text-slate-300">
                      Apex Dental
                    </div>
                    <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-slate-200 leading-7">
                      {item.text}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-gold-300 font-medium">
                      Explore service <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      ))}

      <CTASection
        title="Not sure which treatment is right for you?"
        text="Book a consultation and we will look at your teeth, listen to what you want sorted, and point you to the treatment that actually fits."
      />
    </>
  );
}

function ComplianceTrustSection() {
  return (
    <section className="bg-white py-20">
      <Section>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-xl">
            <LazyImg
              src={images.trust.compliance}
              alt="Apex Dental compliance certificate"
              className="w-full h-[620px] object-cover object-top"
            />
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Compliance & Standards
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-navy-900 leading-tight">
              Recognition that supports patient trust
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Apex Dental has been recognised for achieving a high-level standard
              of compliance with legal obligations for 2025. This adds another
              layer of reassurance for patients looking for a clinic that values
              professionalism, structure, and responsible practice standards.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                'Supports credibility and patient confidence',
                'Strong fit for a premium clinic positioning',
                'Useful trust signal for new visitors',
                'Best presented as a dedicated credibility section',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <BadgeCheck className="text-gold-700 mt-1 shrink-0" size={20} />
                  <p className="text-slate-700 leading-7">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button to="/contact-us/" variant="dark">
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}

// The page's <head>: title, description, canonical, Open Graph / Twitter tags and JSON-LD. Every
// page renders exactly one <SEO>. The tags come from buildHead() in src/seo/head.js, which the build
// also uses to write them into the page's prerendered HTML, so the two cannot differ.
function SEO(props) {
  const head = buildHead(props);
  // Build time (src/entry-server.jsx): hand the head to the prerender script. null in the browser.
  const collectHead = useContext(HeadContext);
  if (collectHead) collectHead(head);

  const headKey = JSON.stringify(head);
  useEffect(() => {
    applyHead(JSON.parse(headKey));
  }, [headKey]);

  return null;
}


function BlogPostPage({ postId }) {
  const meta = blogPostMeta[postId];
  const post = blogPosts.find((p) => p.id === postId);
  const canonical = `${siteUrl}${meta.slug}`;


  return (
    <>
      <SEO
        title={meta.seoTitle}
        description={meta.description}
        canonical={canonical}
        type="article"
        image={meta.image}
        schemas={[
          articleSchema({ title: meta.title, description: meta.description, url: canonical, datePublished: meta.datePublished, image: meta.image }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: meta.breadcrumb, path: meta.slug }]),
        ]}
      />
      <PageHero
        image={meta.image}
        eyebrow={post.category}
        title={post.title}
        subtitle={meta.description}
      />
      <section className="bg-white py-20">
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
              <span className="uppercase tracking-[0.2em]">{post.category}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <Link to="/blog/" className="hover:text-navy-900 transition">← Back to blog</Link>
            </div>
            <div className="space-y-6">
              {post.content.map((block, i) => {
                if (block.type === 'p') return <p key={i} className="text-slate-600 leading-8 text-lg">{block.text}</p>;
                if (block.type === 'h3') return <h2 key={i} className="text-2xl font-semibold text-navy-900 mt-10 mb-2">{block.text}</h2>;
                if (block.type === 'cta') return (
                  <div key={i} className="pt-4">
                    <Link to={block.to} className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-navy-800 transition">
                      {block.text} <ChevronRight size={16} />
                    </Link>
                  </div>
                );
                return null;
              })}
            </div>
          </div>
        </Section>
      </section>
      <CTASection
        title="Ready to visit Apex Dental?"
        text="Book an appointment online or contact us directly — our team will guide you through your options."
      />
    </>
  );
}

// Unknown URLs. Vercel answers them with HTTP 404 and dist/404.html (prerendered from this page by
// scripts/prerender.mjs); this is what that page, or a broken in-site link, shows.
function NotFoundPage() {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Our services', to: '/services/' },
    { label: 'Price list', to: '/price-list/' },
    { label: 'Emergency dentist', to: '/emergency-dental-service-malta/' },
    { label: 'Contact us', to: '/contact-us/' },
  ];

  return (
    <section className="bg-white pt-20 pb-24">
      {/* Not a page to index or to name as canonical: noindex, no canonical, no og:url. */}
      <SEO
        title="Page not found | Apex Dental"
        description="This page could not be found on the Apex Dental Malta website."
        noindex
      />
      <Section>
        <div className="max-w-2xl">
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Error 404</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-navy-900 leading-tight">
            Sorry, we cannot find that page
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8">
            The link may be old or mistyped. These pages should help, or call us on{' '}
            <a href={`tel:${brand.phone}`} className="font-semibold text-navy-900 underline">
              {brand.phone}
            </a>
            .
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-ivory px-5 py-4 font-medium text-navy-900 hover:bg-slate-100 transition"
                >
                  <ChevronRight className="text-gold-700 shrink-0" size={18} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </section>
  );
}

export default function ApexDentalWebsitePremium() {
  const { pathname } = useLocation();
  // The phone menu is open only on the page it was opened on, so any navigation closes it.
  const [menuPath, setMenuPath] = useState(null);
  const menuOpen = menuPath === pathname;
  const setMenuOpen = React.useCallback((open) => setMenuPath(open ? pathname : null), [pathname]);

  return (
    // Bottom padding on phones = the booking bar's height, so the bar never covers the page's end.
    <div className="min-h-screen bg-white text-navy-900 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <a
        href="#main-content"
        className="on-dark sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <ConsentBanner />
      <GoogleAdsPageTracker />
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div id="main-content" tabIndex={-1} className="outline-none">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us/" element={<AboutPage />} />
        <Route path="/dental-implants/" element={<ImplantsPage />} />
        <Route path="/straumann-implants-malta/" element={<StraumannImplantsPage />} />
        <Route path="/all-on-4-malta/" element={<AllOn4Page />} />
        <Route path="/all-on-6-malta/" element={<AllOn6Page />} />
        <Route path="/invisalign-malta/" element={<AlignersPage />} />
        <Route path="/cosmetic-dentistry-malta" element={<CosmeticPage />} />
        <Route path="/general-dentistry/" element={<GeneralDentistryPage />} />
        <Route path="/dental-hygiene/" element={<HygienePage />} />
        <Route path="/veneers/" element={<VeneersPage />} />
        <Route path="/teeth-whitening/" element={<TeethWhiteningPage />} />
        <Route path="/crowns-and-bridgework/" element={<CrownsBridgeworkPage />} />
        <Route path="/periodontology/" element={<PeriodontologyPage />} />
        <Route path="/orthodontics/" element={<OrthodonticPage />} />
        <Route path="/fixed-braces-malta/" element={<FixedBracesPage />} />
        <Route path="/orthix-aligners/" element={<OrthixPage />} />
        <Route path="/clearcorrect-malta/" element={<ClearCorrectPage />} />
        <Route path="/ordoline-aligners-malta/" element={<OrdolinePage />} />
        <Route path="/cristaline-aligners-malta/" element={<CristalinePage />} />
        <Route path="/dental-prosthetics/" element={<DentalProstheticsPage />} />
        <Route path="/removable-prosthesis/" element={<RemovableProsthesisPage />} />
        <Route path="/root-canal-treatment/" element={<RootCanalPage />} />
        <Route path="/emergency-dental-service-malta/" element={<EmergencyPage />} />
        <Route path="/price-list/" element={<PriceListPage />} />
        <Route path="/blog/" element={<BlogPage />} />
        {blogPosts.map((p) => (
          <Route key={p.slug} path={p.slug} element={<BlogPostPage postId={p.id} />} />
        ))}
        <Route path="/appointment-booking/" element={<AppointmentBookingPage />} />
        <Route path="/services/" element={<ServicesPage />} />
        <Route path="/contact-us/" element={<ContactPage />} />
        <Route
          path="/privacy-policy"
          element={
            <>
              <SEO
                title="Privacy Policy | Apex Dental"
                description="Privacy policy for the internal Google Ads management application used by Apex Dental Malta."
                canonical={`${siteUrl}/privacy-policy`}
              />
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <SEO
                title="Terms of Service | Apex Dental"
                description="Terms of service for the internal Google Ads management application used by Apex Dental Malta."
                canonical={`${siteUrl}/terms`}
              />
              <Terms />
            </>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>

      <Footer />
      <WhatsAppFloat />
      <MobileStickyBar menuOpen={menuOpen} />
    </div>
  );
}
