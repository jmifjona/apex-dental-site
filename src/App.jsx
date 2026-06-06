import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import GoogleAdsAppPage from './GoogleAdsAppPage';
import GoogleAdsDashboard from './GoogleAdsDashboard.jsx';
import GoogleAdsCampaignCreator from './GoogleAdsCampaignCreator';
import GoogleAdsCampaignManager from './GoogleAdsCampaignManager';
import GoogleAdsStrategyEngine from './GoogleAdsStrategyEngine';
import GoogleAdsCampaignBuilder from './GoogleAdsCampaignBuilder';
import { trackAppointmentBookingConversion } from './lib/googleAds';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
import {
  Phone,
  MapPin,
  MessageCircle,
  ChevronRight,
  Menu,
  X,
  Star,
  ShieldCheck,
  Sparkles,
  Clock3,
  ArrowUpRight,
  ScanLine,
  HeartHandshake,
  BadgeCheck,
} from 'lucide-react';

function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

function ContactFormCard() {
  const [contactState, handleContactSubmit] = useForm('myknrvqq');

  if (contactState.succeeded) {
    return (
      <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
        <h2 className="text-3xl font-semibold">Thank you</h2>
        <p className="mt-4 text-slate-300 leading-7">
          Your message has been sent successfully. We’ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-3xl font-semibold">Contact Us</h2>

      <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"
        />
        <ValidationError prefix="Email" field="email" errors={contactState.errors} />

        <textarea
          rows="5"
          name="message"
          placeholder="Message"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"
        />
        <ValidationError prefix="Message" field="message" errors={contactState.errors} />

        <button
          type="submit"
          disabled={contactState.submitting}
          className="rounded-full bg-amber-400 text-slate-950 px-6 py-3.5 font-semibold"
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
    return <div>Booking request sent</div>;
  }

  return (
    <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-3xl font-semibold">Request an Appointment</h2>

      <form onSubmit={handleAppointmentSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
        />
        <ValidationError prefix="Email" field="email" errors={appointmentState.errors} />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
        />

        <input
          type="date"
          name="preferredDate"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-amber-300"
        />

        <select
          name="service"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-amber-300"
        >
          <option className="text-slate-900">Select Service</option>
          {serviceOptions.map((service) => (
            <option key={service} className="text-slate-900">
              {service}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
        />

        <textarea
          rows="5"
          name="message"
          placeholder="Message"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
        />
        <ValidationError prefix="Message" field="message" errors={appointmentState.errors} />

        <button
          type="submit"
          disabled={appointmentState.submitting}
          className="rounded-full bg-amber-400 text-slate-950 px-6 py-3.5 font-semibold hover:bg-amber-300 transition"
        >
          {appointmentState.submitting ? 'Sending...' : 'Send Booking Request'}
        </button>
      </form>
    </div>
  );
}

const brand = {
  name: 'Apex Dental',
  tagline: 'Advanced Dentistry in Malta',
  phone: '27016017',
  mobile: '79854037',
  whatsapp: '79854037',
  email: 'info@apexdental.com.mt',
  address:
    'Trident Park, Mdina Road, Mrieħel, Birkirkara, CBD 2010, Malta',
  logo: '/images/orislogo.png',
  googleMaps: 'https://maps.app.goo.gl/F9LpeRvHAuzB2Qva9',
};

const siteUrl = 'https://www.apexdentalmalta.com';

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
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '119',
      bestRating: '5',
      worstRating: '1',
    },
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
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300';

  const variants = {
    dark: 'bg-slate-950 text-white hover:bg-slate-800',
    light: 'bg-white text-slate-900 hover:bg-slate-100',
    outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100',
    glass:
      'border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15',
    gold: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
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

function FloatingHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const serviceGroups = [
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

  useEffect(() => {
    function handleClickOutside() {
      setServicesOpen(false);
    }

    if (servicesOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [servicesOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-2xl text-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <img
                src={brand.logo}
                alt="Apex Dental logo"
                className="h-11 w-auto shrink-0"
              />
              <div className="hidden md:block min-w-0">
                <div className="font-semibold tracking-wide">{brand.name}</div>
                <div className="text-xs text-slate-300">{brand.tagline}</div>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-7">
              <Link
                to="/"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/about-us/"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
              >
                About
              </Link>

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <Link
                    to="/services"
                    className="text-sm font-medium text-slate-200 hover:text-white transition"
                  >
                    Services
                  </Link>

                  <button
                    type="button"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className="text-slate-200 hover:text-white transition"
                    aria-label="Open services menu"
                  >
                    <ChevronRight
                      size={16}
                      className={`transition ${servicesOpen ? 'rotate-90' : ''}`}
                    />
                  </button>
                </div>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[960px] rounded-[2rem] border border-white/10 bg-slate-950/95 backdrop-blur-2xl p-8 shadow-2xl">
                    <div className="grid grid-cols-5 gap-8">
                      {serviceGroups.map((group) => (
                        <div key={group.title}>
                          <div className="text-xs uppercase tracking-[0.22em] text-amber-300 mb-4">
                            {group.title}
                          </div>
                          <div className="flex flex-col gap-3">
                            {group.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setServicesOpen(false)}
                                className="text-sm text-slate-200 hover:text-white transition leading-6"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/price-list"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
              >
                Prices
              </Link>

              <Link
                to="/blog"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
              >
                Blog
              </Link>

              <Link
                to="/contact-us/"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden xl:flex items-center gap-4">
              <a
                href={`tel:${brand.phone}`}
                className="text-sm text-slate-200 hover:text-white transition"
              >
                {brand.phone}
              </a>
              <Button to="/appointment-booking" variant="gold">
                Book Visit
              </Button>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden text-white"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="xl:hidden mt-3 rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl text-white p-5 shadow-2xl">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/about-us/"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                About
              </Link>

              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                Services
              </Link>

              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="text-left text-slate-200 hover:text-white flex items-center justify-between"
              >
                <span>Browse Services</span>
                <ChevronRight
                  size={18}
                  className={`transition ${mobileServicesOpen ? 'rotate-90' : ''}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-5 border-l border-white/10">
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <div className="text-xs uppercase tracking-[0.22em] text-amber-300 mb-3">
                        {group.title}
                      </div>
                      <div className="flex flex-col gap-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => {
                              setOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="text-slate-300 hover:text-white text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to="/price-list"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                Prices
              </Link>
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                Blog
              </Link>
              <Link
                to="/contact-us/"
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white"
              >
                Contact
              </Link>

              <div className="pt-2 flex flex-col gap-3">
                <a href={`tel:${brand.phone}`} className="text-slate-300">
                  Call {brand.phone}
                </a>
                <Button to="/appointment-booking" variant="gold">
                  Book Visit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3">
        <a
          href={`tel:${brand.phone}`}
          className="flex flex-col items-center justify-center py-3 text-slate-900 font-semibold"
        >
          <Phone size={18} />
          <span className="text-xs mt-1">Call</span>
        </a>

        <a
          href={`https://wa.me/356${brand.whatsapp}`}
          className="flex flex-col items-center justify-center py-3 text-slate-900 font-semibold border-l border-r border-slate-200"
        >
          <MessageCircle size={18} />
          <span className="text-xs mt-1">WhatsApp</span>
        </a>

        <Link
          to="/contact-us/"
          className="flex flex-col items-center justify-center py-3 text-slate-900 font-semibold"
        >
          <ChevronRight size={18} />
          <span className="text-xs mt-1">Book</span>
        </Link>
      </div>
    </div>
  );
}


function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-slate-900 text-white text-sm px-4 py-2 rounded-2xl whitespace-nowrap shadow-lg mb-2">
          Chat with us on WhatsApp
          <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-slate-900 rotate-45" />
        </div>
      )}
      <a
        href={`https://wa.me/356${brand.whatsapp}?text=Hi%20Apex%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        style={{ background: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}


function DarkHero({
  image,
  eyebrow,
  title,
  subtitle,
  primaryCta = 'Book Appointment',
  secondaryCta = 'WhatsApp Us',
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <img
        src={image}
        alt={typeof title === 'string' ? title : 'Apex Dental'}
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/50 to-slate-950" />

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
        <Section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-lg">
              <ShieldCheck size={16} />
              {eyebrow}
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.02] tracking-tight max-w-5xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-200 leading-8">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact-us/" variant="gold">
                {primaryCta}
              </Button>
              <Button
                to={`https://wa.me/356${brand.whatsapp}`}
                variant="glass"
                external
              >
                {secondaryCta}
              </Button>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                ['Trident Park', 'Convenient Malta location'],
                ['Modern Care', 'Digital dentistry approach'],
                ['Patient First', 'Comfort, clarity, and quality'],
              ].map(([head, text]) => (
                <div
                  key={head}
                  className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md p-5 shadow-xl"
                >
                  <div className="font-semibold text-white">{head}</div>
                  <div className="text-sm text-slate-300 mt-2">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <img
                src={image}
                alt={typeof title === 'string' ? title : 'Apex Dental'}
                className="w-full h-[560px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-6 rounded-[2rem] bg-white text-slate-900 p-6 shadow-2xl max-w-xs">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The staff were welcoming, the clinic is modern and clean. I felt comfortable and well cared for throughout. Highly recommended! — Sarah Jane
              </p>
            </div>
          </div>
        </Section>
      </div>
    </section>
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
  const wrapper = dark ? 'bg-slate-950 text-white' : 'bg-[#f7f4ef] text-slate-900';
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
              <img src={imageLeft} alt={title} className="w-full h-[520px] object-cover" />
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
                          ? 'text-amber-300 mt-1 shrink-0'
                          : 'text-sky-600 mt-1 shrink-0'
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

function ServiceTiles() {
  const services = [
    {
      title: 'Dental Implants',
      text: 'Advanced tooth replacement planned for stability, function, and aesthetics.',
      image: images.implants.I1,
      to: '/dental-implants/',
    },
    {
      title: 'Clear Aligners',
      text: 'Discreet orthodontic treatment designed around modern lifestyles.',
      image: images.aligners.A1,
      to: '/invisalign-malta/',
    },
    {
      title: 'Cosmetic Dentistry',
      text: 'Veneers, smile design, and aesthetic treatments with refined results.',
      image: images.cosmetic.C1,
      to: '/cosmetic-dentistry-malta',
    },
  ];

  return (
    <section className="bg-white py-20">
      <Section>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Signature Treatments
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900">
              Precision-led care with a stronger visual identity
            </h2>
          </div>

          <Link
            to="/contact-us/"
            className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-600 transition"
          >
            Book your consultation <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              className="group rounded-[2rem] overflow-hidden bg-slate-950 text-white relative min-h-[520px] shadow-xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="relative p-8 h-full flex flex-col justify-end">
                <div className="text-sm uppercase tracking-[0.25em] text-slate-300">
                  Apex Dental
                </div>
                <h3 className="mt-3 text-3xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-slate-200 leading-7">{service.text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-amber-300 font-medium">
                  Explore treatment <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </section>
  );
}

function HomeFeatureGrid() {
  const features = [
    {
      title: 'Digital Workflows',
      text: 'Modern diagnostics and planning designed for precision and predictability.',
      icon: <ScanLine size={20} />,
    },
    {
      title: 'Patient Comfort',
      text: 'A calm, welcoming environment with careful attention to communication and reassurance.',
      icon: <HeartHandshake size={20} />,
    },
    {
      title: 'Premium Results',
      text: 'Functional and aesthetic dentistry designed to look polished, natural, and refined.',
      icon: <Sparkles size={20} />,
    },
  ];

  return (
    <section className="bg-[#f7f4ef]">
      <Section className="py-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
            <img
              src={images.home.H2}
              alt="Apex Dental clinic interior"
              className="w-full h-[560px] object-cover"
            />
          </div>

          <div className="grid gap-8">
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={images.home.H3}
                alt="Apex Dental logo detail"
                className="w-full h-[265px] object-cover"
              />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={images.home.H4}
                alt="Apex Dental reception or team desk"
                className="w-full h-[265px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm"
            >
              <div className="inline-flex items-center justify-center rounded-full bg-slate-950 text-white h-11 w-11">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-slate-600 leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}

function HomeGallery() {
  const gallery = [
    images.home.H5,
    images.home.H6,
    images.home.H7,
    images.home.H8,
    images.home.H9,
    images.home.H10,
  ];

  return (
    <section className="bg-white py-20">
      <Section>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Clinic Gallery
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900">
              A practice that looks as polished as the care it provides
            </h2>
          </div>
          <p className="max-w-xl text-slate-600 leading-8 text-lg">
            Use this section to showcase the clinic, treatment rooms, scanner,
            reception, and key branded details.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((img, index) => (
            <div key={index} className="rounded-[2rem] overflow-hidden shadow-md group">
              <img
                src={img}
                alt={`Apex Dental gallery ${index + 1}`}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}

function ReviewStrip() {
  const reviews = [
    {
      name: 'Sarah Jane',
      date: 'March 2025',
      text: 'I had an excellent experience at Apex Dental Clinic. The staff were very welcoming from the moment I walked in, and the dentist explained everything clearly before starting the treatment. The clinic is clean, modern, and well-organized. I felt comfortable and well cared for throughout my visit. Highly recommended!',
    },
    {
      name: 'Maime Eliot',
      date: 'March 2025',
      text: 'Apex Dental Clinic truly exceeded my expectations. I was quite nervous about my dental procedure, but the dentist and assistants were incredibly patient and reassuring. The treatment was painless and done very professionally. I am very happy with the results and will definitely come back for regular check-ups.',
    },
    {
      name: 'Keith Pablo',
      date: 'January 2025',
      text: 'The team here is amazing! From the moment you walk in, the staff is incredibly friendly and welcoming, instantly making you feel at ease. I usually get very nervous about dental visits, but they are so patient and understanding. They take the time to ensure you feel calm and comfortable throughout. I highly recommend them!',
    },
  ];
  return (
    <section className="bg-slate-950 text-white py-20">
      <Section>
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Patient Reviews</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">
                What our patients say about Apex Dental
              </h2>
              <p className="mt-6 text-slate-300 leading-8">
                Rated 5 stars by patients across Malta. Read more reviews on our Google Business Profile.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-white font-semibold text-lg">4.9</span>
                <span className="text-slate-400 text-sm">119 Google Reviews</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={brand.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition"
                >
                  Read all reviews on Google
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={brand.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition"
                >
                  Leave us a review
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-[1.5rem] bg-white text-slate-900 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{review.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{review.name}</div>
                        <div className="text-slate-400 text-xs">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{review.text}</p>
                </div>
              ))}
            </div>
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
          ? 'bg-slate-950 text-white py-20'
          : 'bg-[#f7f4ef] text-slate-900 py-20'
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
  const bg = dark ? 'bg-slate-950 text-white' : 'bg-[#f7f4ef] text-slate-900';
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
  const bg = dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const stepBg = dark ? 'bg-white/5 border-white/10' : 'bg-[#f7f4ef] border-slate-200';
  const numColor = dark ? 'text-amber-300' : 'text-sky-600';
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
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-6">
              Transparent pricing — no surprises
            </h2>
            <p className="text-slate-600 leading-8 mb-8">{note}</p>
            <Button to="/price-list/" variant="dark">View full price list</Button>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
                <span className="text-slate-700 font-medium">{item.label}</span>
                <span className="text-slate-900 font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Section className="py-16 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-semibold">{brand.name}</h3>
          <p className="mt-4 text-slate-300 leading-7">
            Premium dental care in Malta with a focus on advanced restorative
            treatment, clear aligners, cosmetic dentistry, and a modern patient
            experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
            <Link to="/google-ads-app" className="hover:text-white">
              Google Ads App
            </Link>
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <div className="mt-4 flex flex-col gap-3 text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/about-us/">About</Link>
            <Link to="/dental-implants/">Dental Implants</Link>
            <Link to="/invisalign-malta/">Clear Aligners</Link>
            <Link to="/cosmetic-dentistry-malta">Cosmetic Dentistry</Link>
            <Link to="/general-dentistry/">General Dentistry</Link>
            <Link to="/dental-hygiene/">Dental Hygiene</Link>
            <Link to="/veneers/">Veneers</Link>
            <Link to="/teeth-whitening/">Teeth Whitening</Link>
            <Link to="/crowns-and-bridgework/">Crowns & Bridgework</Link>
            <Link to="/periodontology/">Periodontology</Link>
            <Link to="/orthodontics/">Orthodontic Treatment</Link>
            <Link to="/dental-prosthetics/">Dental Prosthetics</Link>
            <Link to="/removable-prosthesis/">Removable Prosthesis</Link>
            <Link to="/root-canal-treatment/">Root Canal Treatment</Link>
            <Link to="/emergency-dental-service-malta/">Emergency Dentist</Link>
            <Link to="/blog/">Blog</Link>
            <Link to="/appointment-booking/">Appointment Booking</Link>
            <Link to="/price-list/">Price List</Link>
            <Link to="/contact-us/">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Contact</h4>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>{brand.address}</p>
            <p>
              <a href={`tel:${brand.phone}`} className="hover:text-white">
                Tel: {brand.phone}
              </a>
            </p>
            <p>
              <a
                href={`https://wa.me/356${brand.whatsapp}`}
                className="hover:text-white"
              >
                WhatsApp: {brand.mobile}
              </a>
            </p>
            <p>
              <a href={`mailto:${brand.email}`} className="hover:text-white">
                {brand.email}
              </a>
            </p>
            <p className="mt-4">
              <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-2">
                Find us on Google Maps &amp; read our reviews
              </a>
            </p>
          </div>
        </div>
      </Section>

      <div className="border-t border-slate-800">
        <Section className="py-5 text-sm text-slate-400">
          © {new Date().getFullYear()} Apex Dental Malta. All rights reserved.
        </Section>
      </div>
    </footer>
  );
}

function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-32 pb-20">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />
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
      <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight">
        {title}
      </h2>
      <p className="mt-5 text-slate-600 text-lg leading-8">{text}</p>
    </div>
  );
}

function HomePage() {
  usePageTitle('Apex Dental Malta | Premium Dentistry, Implants, Aligners & Cosmetic Care');

  return (
    <>
      <SEO
        title="Apex Dental Malta | Dental Implants, Invisalign, Veneers & Emergency Dentist"
        description="Apex Dental Malta offers dental implants, Invisalign, veneers, cosmetic dentistry, emergency dental care, hygiene, and restorative treatments in Malta."
        canonical={`${siteUrl}/`}
        schema={localBusinessSchema(`${siteUrl}/`)}
      />
      <DarkHero
        image={images.home.H1}
        eyebrow="Premium dental care in Malta"
        title={
          <>
            Healthy teeth.
            <br />
            Honest dentistry.
            <br />
            A clinic you will go back to.
          </>
        }
        subtitle="At Apex Dental you will find implant surgery, cosmetic and everyday dentistry, and clear aligners under one roof at Trident Park, with digital scanning and planning rather than the old putty impressions."
      />

      <HomeFeatureGrid />
      <ServiceTiles />

      <SplitEditorial
        imageLeft={images.home.H2}
        title="A clinic that is easy to walk into"
        text="Plenty of people put off the dentist because the last place they went felt rushed or cold. We have tried to build the opposite — a calm space, modern equipment, and dentists who explain things instead of talking over your head. You should leave knowing what was found, what your options are, and what happens next."
        points={[
          'Calm, unhurried appointments',
          'Modern equipment and digital scanning',
          'Plain explanations, not jargon',
          'A clear plan before any treatment',
        ]}
      />

      <HomeGallery />
      <ReviewStrip />

      <CTASection
        title="Ready to visit Apex Dental?"
        text="Book a visit for implants, clear aligners, cosmetic or everyday dental care, or an emergency. Tell us what you need and we will point you to the right starting point."
      />
    </>
  );
}

function ImplantsPage() {
  usePageTitle('Dental Implants Malta | Apex Dental');
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
      <section className="bg-[#f7f4ef] py-12">
        <Section>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-700 font-medium">Explore in detail:</span>
            <Link to="/straumann-implants-malta/" className="text-sm font-medium text-sky-700 hover:text-sky-900">Straumann implants &rarr;</Link>
            <Link to="/all-on-4-malta/" className="text-sm font-medium text-sky-700 hover:text-sky-900">All-on-4 &rarr;</Link>
            <Link to="/all-on-6-malta/" className="text-sm font-medium text-sky-700 hover:text-sky-900">All-on-6 &rarr;</Link>
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
  usePageTitle('Invisalign Malta | Clear Aligners | Apex Dental');
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
        title="Consultations in English, Italian or Spanish"
        text="We see a lot of patients who have moved to Malta from abroad. Dr Martha Lopez consults in Spanish, Dr Massimo D'Alessandro in Italian, and Dr Aleksandra Syrico Mallia in Polish, so you can talk through your treatment in your own language instead of translating dental terms on the spot."
        points={['Consultations in English, Italian or Spanish', 'Used to treating expats and visitors', 'The same standard of care whoever you are', 'At Trident Park, Mrieħel, Birkirkara']}
      />
      <FAQSection faqs={alignerFaqs} dark />
      <CTASection title="Interested in clear aligners in Malta?" text="Book a consultation and we will check whether aligners can do what you want, show you a preview of the result, and be upfront about the timeframe and the cost." />
    </>
  );
}


function CosmeticPage() {
  usePageTitle('Cosmetic Dentistry Malta | Apex Dental');

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
  usePageTitle('About Apex Dental Malta | Our Dental Team');
  const team = [
    { name: 'Dr Jonathan Mifsud', role: 'Dental Implantologist', flag: null, bio: 'Dr Jonathan Mifsud founded Apex Dental and runs the implant side of the practice. He places everything from single implants to full-arch and All-on-4 cases, and takes on the more complex treatment planning — the cases that need to be thought through carefully before anyone picks up an instrument.' },
    { name: 'Dr Aleksandra Syrico Mallia', role: 'Orthodontist', flag: 'PL', bio: 'Dr Aleksandra Syrico Mallia leads orthodontics at Apex Dental. She treats children, teenagers and adults with both fixed braces and clear aligners, and works with our in-house Orthix aligner system as well as Invisalign, ClearCorrect, Ordoline and Cristaline. She plans each case around how your teeth bite together, not just how they look from the front. Polish-speaking patients are welcome to consult with her in Polish.' },
    { name: 'Dr Charlotte Axisa', role: 'General and Restorative Dentist', flag: null, bio: 'Dr Charlotte Axisa covers general and restorative dentistry — the check-ups, fillings, crowns and preventive care that make up most visits. Patients tend to mention how calm and unhurried she is, which helps if you are someone who has put off the dentist for a while.' },
    { name: "Dr Massimo D'Alessandro", role: 'General Dentist', flag: 'IT', bio: "Dr Massimo D'Alessandro trained and worked in Italy before joining us. If Italian is your first language, you can see him and talk through your treatment in Italian rather than working it out in English." },
    { name: 'Dr Adam Borg', role: 'General Dentist', flag: null, bio: 'Dr Adam Borg handles a broad range of general and restorative treatment. He is straightforward about explaining what he is doing and why, so you leave knowing what was done and what, if anything, needs keeping an eye on.' },
    { name: 'Dr Martha Lopez', role: 'General and Cosmetic Dentist', flag: 'ES', bio: 'Dr Martha Lopez joined us from Spain and has a particular interest in cosmetic and aesthetic work. Spanish-speaking patients are welcome to consult with her in Spanish.' },
  ];
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
        description="Meet the team at Apex Dental Malta. Dr Jonathan Mifsud (Implantologist), Dr Aleksandra Syrico Mallia (Orthodontist, Polish-speaking), Dr Charlotte Axisa, Dr Massimo D'Alessandro (Italian-speaking), Dr Adam Borg and Dr Martha Lopez (Spanish-speaking). Trident Park, Mrieħel, Birkirkara."
        canonical={`${siteUrl}/about-us/`}
        schema={localBusinessSchema(`${siteUrl}/about-us/`)}
      />
      <PageHero
        image={images.about.AB1}
        eyebrow="About Apex Dental"
        title="A private dental clinic in Malta, with five dentists under one roof"
        subtitle="We are a private clinic at Trident Park, Mrieħel, Birkirkara. Five dentists work here, between us covering routine care, cosmetic work, gum treatment and implant surgery, with consultations in English, Italian or Spanish."
      />
      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl lg:col-span-2">
              <img src={images.about.AB1} alt="Apex Dental clinic interior" className="w-full h-[420px] object-cover" />
            </div>
            <div className="grid gap-6">
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <img src={images.about.AB2} alt="Apex Dental treatment room" className="w-full h-[196px] object-cover" />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <img src={images.about.AB3} alt="Apex Dental clinic detail" className="w-full h-[196px] object-cover" />
              </div>
            </div>
          </div>
        </Section>
      </section>
      <section className="bg-slate-950 py-20 text-white">
        <Section>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
              <img src={images.about.AB2} alt="Dr Jonathan Mifsud, Apex Dental" className="w-full h-[520px] object-cover" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">Meet the team</div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-2">{team[0].name}</h2>
              <div className="text-amber-300 font-medium mb-6">{team[0].role}</div>
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
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-12 max-w-2xl">
            Five dentists, three languages spoken
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.slice(1).map((doctor) => (
              <div key={doctor.name} className="rounded-[2rem] bg-[#f7f4ef] border border-slate-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{doctor.name.split(' ').slice(-1)[0][0]}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{doctor.name}</h3>
                  {doctor.flag === 'IT' && <span className="text-sm font-bold text-green-700">IT</span>}
                  {doctor.flag === 'ES' && <span className="text-sm font-bold text-red-600">ES</span>}
                </div>
                <div className="text-sky-600 font-medium text-sm mb-3">{doctor.role}</div>
                <p className="text-slate-600 leading-7 text-sm">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>
      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Our journey</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-12 max-w-2xl">
            How the clinic has grown
          </h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 items-start py-6 border-b border-slate-200">
                <div className="text-sky-600 font-bold text-lg w-16 shrink-0">{m.year}</div>
                <div className="text-slate-700 leading-7">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </section>
      <ComplianceTrustSection />
      <CTASection title="Would you like to visit Apex Dental?" text="Book online, call us on 27016017, or message us on WhatsApp at 79854037. You will find us at Trident Park, Mrieħel, Birkirkara." />
    </>
  );
}


function GeneralDentistryPage() {
  usePageTitle('General Dentistry Malta | Apex Dental');

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
  usePageTitle('Dental Hygiene Malta | Apex Dental');

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
  usePageTitle('Dental Veneers Malta | Apex Dental');
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
    { label: 'Composite veneers — freehand', price: '€90 / tooth' },
    { label: 'Composite veneers — lab wax-up', price: '€130 / tooth' },
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
        note="Choose the veneer option that suits your goals and budget, all priced per tooth: composite freehand at €90, composite with a lab wax-up at €130, very stain-resistant 3D-printed ceramic resin at €220, and premium porcelain or zirconia at €450. Not sure which is right for you? For €50 we create a mockup so you can see and try the final look before committing — and that fee is deducted from your bill if you proceed with resin or porcelain/zirconia veneers. To book a consultation we take a €20 booking fee, which is deducted from your final bill."
      />
      <FAQSection faqs={veneerFaqs} />
      <CTASection dark title="Ready to improve your smile with veneers?" text="Book a cosmetic consultation and we will talk through what you want changed, whether veneers are the right way to get there, and exactly what each option costs." />
    </>
  );
}


function TeethWhiteningPage() {
  usePageTitle('Teeth Whitening Malta | Apex Dental');
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
  usePageTitle('Crowns and Bridges Malta | Apex Dental');
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
  usePageTitle('Periodontology Malta | Apex Dental');

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
  usePageTitle('Orthodontist Malta | Braces & Clear Aligners | Apex Dental');
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
      <section className="bg-[#f7f4ef] py-10">
        <Section>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-700 font-medium">Read more:</span>
            <Link to="/fixed-braces-malta/" className="text-sm font-medium text-sky-700 hover:text-sky-900">Fixed braces &rarr;</Link>
            <Link to="/orthix-aligners/" className="text-sm font-medium text-sky-700 hover:text-sky-900">Orthix in-house aligner &rarr;</Link>
          </div>
        </Section>
      </section>
      <section className="bg-white py-20">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">Clear Aligner Options</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-6 max-w-3xl">
            Clear aligners, including our own in-house Orthix
          </h2>
          <p className="text-slate-600 leading-8 mb-12 max-w-3xl">
            Clear aligners straighten teeth using a series of near-invisible removable trays, with no metal on show. We are not tied to a single brand: alongside our own Orthix aligner, made in-house, we work with several established systems and match the right one to your case and budget.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alignerSystems.map((sys, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-[#f7f4ef] p-7 flex flex-col">
                <div className="text-lg font-semibold text-slate-900 mb-2">{sys.name}</div>
                <p className="text-slate-600 leading-7 text-sm">{sys.text}</p>
                {sys.to && (
                  <Link to={sys.to} className="mt-4 text-sm font-medium text-sky-700 hover:text-sky-900">
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
  usePageTitle('Fixed Braces Malta | Metal & Ceramic Braces | Apex Dental');
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
  usePageTitle('Orthix Clear Aligners Malta | Made In-House | Apex Dental');
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
  usePageTitle('ClearCorrect Malta | Clear Aligners | Apex Dental');
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
  usePageTitle('Ordoline Aligners Malta | Clear Aligners for Complex Cases | Apex Dental');
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
  usePageTitle('Cristaline Aligners Malta | German-Made Clear Aligners | Apex Dental');
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
  const wrap = dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const card = dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-[#f7f4ef]';
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
                <a href={st.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-sky-500 hover:text-sky-400 shrink-0">View study &rarr;</a>
              </div>
            </div>
          ))}
        </div>
        <p className={`text-xs mt-8 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Survival and success figures are drawn from published clinical studies and reflect averages across many patients; your own outcome depends on your case, bone, general health and aftercare.</p>
      </Section>
    </section>
  );
}

function StraumannImplantsPage() {
  usePageTitle('Straumann Implants Malta | Premium Swiss Implants | Apex Dental');
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
  usePageTitle('All-on-4 Dental Implants Malta | Full Arch | Apex Dental');
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
  usePageTitle('All-on-6 Dental Implants Malta | Full Arch | Apex Dental');
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
  usePageTitle('Dental Prosthetics Malta | Apex Dental');

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
  usePageTitle('Removable Prosthesis Malta | Apex Dental');

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
  usePageTitle('Root Canal Treatment Malta | Apex Dental');
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
        description="Root canal treatment in Malta at Apex Dental. Comfortable, effective treatment for infected or damaged teeth saving your natural tooth and relieving pain."
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
  usePageTitle('Emergency Dentist Malta | Apex Dental');
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
  usePageTitle('Dental Blog Malta | Apex Dental');
  const [openPost, setOpenPost] = React.useState(null);

  const posts = [
    {
      id: 1,
      title: 'How much do dental implants cost in Malta?',
      excerpt: 'A clear guide to what influences implant costs in Malta, from the initial scan to the final crown.',
      category: 'Implants',
      readTime: '4 min read',
      content: [
        { type: 'p', text: 'Dental implant costs in Malta vary depending on the complexity of your case, the number of implants required, and the type of restoration placed on top. Understanding what is included in the price is just as important as the headline figure.' },
        { type: 'h3', text: 'What affects the cost of dental implants?' },
        { type: 'p', text: 'Several factors influence the total cost of implant treatment. The number of implants needed is the most obvious variable. A single implant to replace one missing tooth costs significantly less than a full-arch All-on-4 restoration. The condition of your jawbone matters too — patients who require bone grafting before implant placement will have additional treatment needs. The type of crown or bridge placed on the implant also affects cost: zirconia restorations are generally more expensive than acrylic or porcelain-fused-to-metal options.' },
        { type: 'h3', text: 'What is typically included at Apex Dental?' },
        { type: 'p', text: 'At Apex Dental, the implant consultation is free when you proceed with treatment, and the 3D CBCT scan required for planning is also included at no extra cost when implant surgery is carried out. This scan, which provides a detailed view of your bone volume and anatomy, is essential for accurate planning and is a cost that some clinics charge separately.' },
        { type: 'h3', text: 'Single implants vs All-on-4 in Malta' },
        { type: 'p', text: 'A single implant includes the titanium implant, the abutment connector, and the crown. For patients missing most or all of their teeth, All-on-4 — also known as the Toronto bridge — places four implants to support a complete fixed arch. This is a more efficient solution than replacing each tooth individually and is generally more cost-effective per tooth than multiple single implants.' },
        { type: 'h3', text: 'The best way to get an accurate cost' },
        { type: 'p', text: 'The only way to get a reliable cost estimate is through a consultation and 3D scan. Implant costs quoted online without a clinical assessment are rarely accurate because they cannot account for your specific bone structure, the number of implants you need, or any preparatory treatment required. At Apex Dental the consultation is free when you proceed with implant treatment, so there is no cost to finding out exactly what your case involves.' },
        { type: 'cta', text: 'Book a free implant consultation', to: '/dental-implants/' },
      ],
    },
    {
      id: 2,
      title: 'Veneers vs teeth whitening — what is the difference?',
      excerpt: 'Two very different treatments that are often confused. One changes colour only. The other can transform shape, size and symmetry.',
      category: 'Cosmetic Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Teeth whitening and dental veneers are both popular cosmetic treatments, but they work in completely different ways and achieve very different results. Choosing the right one depends on what you are trying to improve.' },
        { type: 'h3', text: 'What whitening can and cannot do' },
        { type: 'p', text: 'Professional teeth whitening uses bleaching agents to lighten the natural colour of your teeth. It is effective for removing staining caused by coffee, tea, wine, and ageing. However, whitening only affects the shade of your enamel. It cannot change the shape, size, or alignment of your teeth, and it has no effect on crowns, veneers, or composite fillings — these will remain their original colour while your natural teeth whiten around them.' },
        { type: 'h3', text: 'What veneers can do that whitening cannot' },
        { type: 'p', text: 'Porcelain veneers are thin ceramic shells bonded to the front of your teeth. They can change the colour of teeth that are too dark or stained to whiten effectively. But they can also change the shape of teeth that are chipped, worn, or irregularly sized. They can close small gaps, make short teeth appear longer, and create a more symmetrical smile. Veneers offer a degree of smile transformation that whitening simply cannot achieve.' },
        { type: 'h3', text: 'Which is right for you?' },
        { type: 'p', text: 'If your teeth are a good shape and you are mainly concerned about colour, whitening is the simpler, less invasive and more affordable option. If you have cosmetic concerns beyond just shade — chips, wear, size, or shape — veneers are worth considering. Many patients do both: whiten their natural teeth first, then match the veneer shade to the whitened result for a completely consistent smile.' },
        { type: 'cta', text: 'Explore cosmetic treatments', to: '/veneers/' },
      ],
    },
    {
      id: 3,
      title: 'When is a dental problem a dental emergency?',
      excerpt: 'Not every dental problem needs same-day care. But some situations should never wait. Here is how to tell the difference.',
      category: 'Emergency Care',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Knowing when to seek urgent dental care can make the difference between saving a tooth and losing it. Some situations genuinely require same-day attention, while others can safely wait for a routine appointment.' },
        { type: 'h3', text: 'Situations that require urgent attention' },
        { type: 'p', text: 'A knocked-out tooth is a genuine emergency — if you act within an hour and keep the tooth moist, it may be possible to reimplant it. A dental abscess with facial swelling, fever, or difficulty swallowing should also be treated as urgent as the infection can spread. Severe, unrelenting toothache that does not respond to over-the-counter pain relief usually indicates infection or nerve damage and needs prompt assessment.' },
        { type: 'h3', text: 'What can wait for a regular appointment' },
        { type: 'p', text: 'A chipped tooth with no pain, a lost filling that is not causing discomfort, or mild sensitivity can generally wait a few days for a scheduled appointment. These are worth addressing soon but are not emergencies in the same sense as an abscess or a knocked-out tooth.' },
        { type: 'h3', text: 'Apex Dental is open Sundays for emergencies' },
        { type: 'p', text: 'Apex Dental is open Sunday mornings from 9am to 12pm specifically for emergency cases. If you are unsure whether your situation warrants urgent care, it is always better to call and describe your symptoms than to wait and risk the problem worsening.' },
        { type: 'cta', text: 'Contact us for emergency care', to: '/emergency-dental-service-malta/' },
      ],
    },
    {
      id: 4,
      title: 'Are clear aligners suitable for adults?',
      excerpt: 'More adults than ever are choosing aligners over braces. Here is why — and what to expect from the process.',
      category: 'Aligners',
      readTime: '4 min read',
      content: [
        { type: 'p', text: 'Clear aligners were originally designed with adults in mind. Unlike traditional metal braces, which are more commonly associated with teenagers, aligners are discreet, removable, and designed around the practical demands of adult life.' },
        { type: 'h3', text: 'Why adults prefer aligners over fixed braces' },
        { type: 'p', text: 'The most obvious advantage is appearance. Aligners are transparent and virtually invisible during wear, which matters to professionals and image-conscious adults who would not want visible metal brackets. They are also removable — you take them out for meals, drinks, and oral hygiene, which means no food restrictions and easier cleaning compared to fixed braces. Many adults also find aligners more comfortable than traditional braces, with fewer emergency appointments for broken wires or loose brackets.' },
        { type: 'h3', text: 'What can aligners treat?' },
        { type: 'p', text: 'Aligners can address a wide range of orthodontic issues including crowding, spacing, mild to moderate bite problems, and tooth rotation. More complex cases — particularly those involving significant bite correction — may still be better suited to fixed appliances. Your dentist will assess your specific situation and be honest about whether aligners are the right fit for your goals.' },
        { type: 'h3', text: 'How long does aligner treatment take for adults?' },
        { type: 'p', text: 'Most adult cases are completed in 6 to 18 months depending on the complexity of the tooth movement required. The process begins with digital scanning and a treatment simulation, which means you can see a preview of your expected outcome before committing to treatment.' },
        { type: 'h3', text: 'Multilingual consultations available at Apex Dental' },
        { type: 'p', text: 'Apex Dental offers aligner consultations in English, Italian, and Spanish. Dr Martha Lopez (Spanish-speaking) and Dr Massimo D\'Alessandro (Italian-speaking) are both available for patients who prefer to consult in their first language.' },
        { type: 'cta', text: 'Book an aligner consultation', to: '/invisalign-malta/' },
      ],
    },
    {
      id: 5,
      title: 'Why regular dental hygiene appointments matter more than you think',
      excerpt: 'Prevention is almost always cheaper, easier, and less uncomfortable than treatment. Your gums will thank you.',
      category: 'Preventive Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Many people only visit the dentist when something hurts. The problem with this approach is that by the time dental problems cause pain, they are often significantly more advanced — and more expensive to treat — than they would have been if caught earlier.' },
        { type: 'h3', text: 'What happens at a hygiene appointment?' },
        { type: 'p', text: 'A hygiene appointment involves professional removal of plaque and tartar buildup that cannot be removed by brushing and flossing alone. Tartar — calcified plaque — accumulates over time on all teeth and particularly around the gum line. If left, it causes gum inflammation, which can progress to periodontitis — a more serious form of gum disease that damages the bone supporting your teeth. Professional cleaning also gives the dentist an opportunity to spot early signs of decay, gum disease, or other issues before they develop into larger problems.' },
        { type: 'h3', text: 'How often should you attend?' },
        { type: 'p', text: 'The general recommendation for most adults is every six months. Patients with a history of gum disease, smokers, diabetics, and those with certain medications that affect the gums may be advised to attend more frequently. Your dentist will advise the most appropriate schedule for your situation.' },
        { type: 'h3', text: 'The cost of prevention versus the cost of treatment' },
        { type: 'p', text: 'A routine hygiene appointment costs a fraction of what a filling, root canal, or tooth extraction with replacement costs. Regular preventive care consistently reduces the likelihood of needing more complex and costly treatment down the line.' },
        { type: 'cta', text: 'Book a hygiene appointment', to: '/dental-hygiene/' },
      ],
    },
    {
      id: 6,
      title: 'How do dental crowns protect damaged teeth?',
      excerpt: 'Crowns are one of the most reliable ways to save a tooth that would otherwise be lost. Here is how they work.',
      category: 'Restorative Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'A dental crown is a cap that fits over the entire visible portion of a tooth, restoring its shape, size, strength, and appearance. Crowns are one of the most versatile and long-lasting restorations in dentistry, used in a wide range of situations where a tooth needs protection or reconstruction.' },
        { type: 'h3', text: 'When is a crown recommended?' },
        { type: 'p', text: 'The most common situations that require a crown include teeth that have undergone root canal treatment, which are more brittle and prone to fracture without a crown to reinforce them. Crowns are also used for teeth with large decay or fractures that cannot be reliably restored with a filling, severely worn teeth, and teeth with a poor appearance that cannot be improved with less invasive options.' },
        { type: 'h3', text: 'What are crowns made of?' },
        { type: 'p', text: 'Modern crowns are most commonly made from ceramic or zirconia — both tooth-coloured materials that are strong, durable, and virtually indistinguishable from natural teeth. Zirconia in particular is highly resistant to fracture and is an excellent choice for back teeth that are under significant chewing load. Metal-fused options are still used in some specific situations but are less common in contemporary practice.' },
        { type: 'h3', text: 'How long does a crown last?' },
        { type: 'p', text: 'With proper care — regular brushing, flossing, and dental check-ups — crowns typically last 10 to 15 years or longer. Avoiding habits like teeth grinding (if untreated), biting very hard objects, or using teeth as tools helps maximise crown lifespan.' },
        { type: 'cta', text: 'Learn about crowns and bridgework', to: '/crowns-and-bridgework/' },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Dental Blog Malta | Apex Dental"
        description="Helpful dental articles from Apex Dental Malta. Read about implant costs, veneers vs whitening, emergency dental care, clear aligners, and preventive dentistry."
        canonical={`${siteUrl}/blog/`}
        schema={localBusinessSchema(`${siteUrl}/blog/`)}
      />
      <PageHero
        image={images.home.H5}
        eyebrow="Apex Dental Blog"
        title="Honest dental advice for patients in Malta"
        subtitle="Practical guides on implants, cosmetic dentistry, emergencies, and preventive care — written to help you make informed decisions about your dental health."
      />

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="rounded-[2rem] bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{post.category}</div>
                    <div className="text-xs text-slate-400">{post.readTime}</div>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 leading-tight mb-3">{post.title}</h2>
                  <p className="text-slate-600 leading-7 text-sm">{post.excerpt}</p>
                  <Link
                    to={blogPostMeta[post.id].slug}
                    className="inline-flex items-center gap-2 mt-5 text-slate-900 font-semibold hover:text-sky-700 transition text-sm"
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
  usePageTitle('Dental Services Price List Malta | Apex Dental');

  const priceSections = [
    {
      title: 'Examination / Diagnosis',
      items: [
        {
          name: 'Booking Fee (new patients, emergency & long appointments)',
          price: '€20.00',
          note: 'Secures your appointment and is deducted from your final bill. Non-refundable if the appointment is cancelled less than 5 hours beforehand.',
        },
        { name: 'Routine Checkup', price: '€10.00' },
        { name: 'Panoramic X-Ray', price: '€70.00', note: '2D full mouth X-ray.' },
        {
          name: 'Periapical or one side Bitewing X-Ray',
          price: '€20.00',
          note: 'For a set of bitewings, 2 are required.',
        },
        {
          name: 'Implant Consultation',
          price: '€30.00',
          note: 'Free if implant treatment is done, or deducted later from the implant bill if treatment proceeds.',
        },
        {
          name: 'CBCT X-Ray',
          price: '€120.00',
          note: '3D X-ray of the mouth; copy available on request. Important for implant planning and free if implant surgery is done.',
        },
      ],
    },
    {
      title: 'Hygiene / Cleaning and Teeth Whitening',
      items: [
        {
          name: 'Routine Hygiene Session',
          price: '€50.00',
          note: 'Scaling and polishing; ideally every 6 months.',
        },
        {
          name: 'Perio Laser',
          price: '€220.00',
          note: 'Usually done in 4 sessions; price is per session.',
        },
        {
          name: 'Fissure Sealing',
          price: '€30.00',
          note: 'Preventive measure, mostly for molars; price per tooth.',
        },
        {
          name: 'Whitening Home Kits',
          price: '€250.00',
          note: 'Custom trays included.',
        },
        {
          name: 'Removal of Fixed Prosthesis and Cleaning',
          price: '€80.00',
          note: 'Recommended every 6 months for full-arch / Toronto bridge cases.',
        },
        { name: 'Fluoride Application', price: '€40.00' },
        {
          name: 'In House Teeth Whitening',
          price: '€400.00',
          note: 'Usually a 90-minute session using branded products such as Beyond or Zoom.',
        },
      ],
    },
    {
      title: 'Crowns and Bridgework',
      items: [
        {
          name: 'Crowns, Metal/Porcelain',
          price: '€450.00',
          note: 'Porcelain outer shell with metal inside.',
        },
        { name: 'Lab Made Temporary Crowns', price: '€50.00' },
        {
          name: 'Removal of Existing Bridgework',
          price: '€30.00',
          note: 'Depends on the state of the bridge and work involved.',
        },
        {
          name: 'Full Porcelain Crowns / Zirconia',
          price: '€450.00',
          note: 'Variable full porcelain crowns available at the same price.',
        },
        { name: 'Post and Core Build Up', price: '€70.00' },
      ],
    },
    {
      title: 'Cosmetic Veneers',
      items: [
        {
          name: 'Composite Veneers (Freehand)',
          price: '€90.00',
          note: 'Done chairside with highly aesthetic composite. Price per tooth.',
        },
        {
          name: 'Composite Veneers (Lab Wax-Up Replica)',
          price: '€130.00',
          note: 'Includes a lab-made wax-up. Price per tooth.',
        },
        {
          name: '3D-Printed Ceramic Resin Veneers',
          price: '€220.00',
          note: 'Very stain resistant. Price per tooth.',
        },
        {
          name: 'Porcelain / Zirconia Veneers',
          price: '€450.00',
          note: 'The premium, longest-lasting option. Price per tooth.',
        },
        {
          name: 'Veneer Mockup / Try-In',
          price: '€50.00',
          note: 'See and try the final look before starting. Deducted from your bill if you proceed with resin or porcelain/zirconia veneers.',
        },
      ],
    },
    {
      title: 'Fillings',
      items: [
        {
          name: 'Removal of Amalgam Filling Under Rubberdam',
          price: '€40.00',
        },
        {
          name: 'Restoration of Deciduous Teeth',
          price: '€40.00',
          note: 'Material choice depends on cooperation and cavity size.',
        },
        {
          name: 'Composite Filling',
          price: 'From €70.00',
          note: 'Does not include posts if required.',
        },
      ],
    },
    {
      title: 'Implants',
      items: [
        {
          name: 'Implant Complete with Crown',
          price: '€1500.00',
          note: 'Depends on implant type, abutment type, and crown type.',
        },
        {
          name: 'Toronto Bridge All on 4',
          price: '€9999.99',
          note: 'Full-arch bridge prosthesis on 4 implants.',
        },
        {
          name: 'Implant Retained Removable Denture with 3 Implants and Bar',
          price: '€5500.00',
          note: 'Best removable option for upper arch.',
        },
        { name: 'Crown / Pontic on Implant', price: '€400.00' },
        {
          name: 'Implant Retained Removable Denture',
          price: '€3500.00',
          note: 'Locator-based, with 2 implants included; suitable for lower arch only.',
        },
      ],
    },
    {
      title: 'Extraction and Surgery',
      items: [
        {
          name: 'Extraction',
          price: 'From €60.00',
          note: 'Does not include radiographs if required.',
        },
        {
          name: 'Wisdom Tooth Surgical Extraction',
          price: '€250.00',
          note: 'Does not include radiographs if required.',
        },
        {
          name: 'Surgical Extraction',
          price: 'From €150.00',
          note: 'Includes retained roots and heavily broken teeth; radiographs not included.',
        },
      ],
    },
    {
      title: 'Root Canal Treatment',
      items: [
        {
          name: 'Root Canal Anterior Teeth',
          price: '€250.00',
          note: 'Includes filling but not the post if required.',
        },
        {
          name: 'Re Root Canal Treatment',
          price: '€320.00',
          note: 'For teeth that already had root canal treatment previously.',
        },
        {
          name: 'Root Canal Treatment Posterior Teeth',
          price: '€280.00',
          note: 'Includes filling but not the post if required.',
        },
      ],
    },
    {
      title: 'Dentures',
      items: [
        { name: 'Full Upper / Lower Acrylic Dentures', price: '€400.00' },
        {
          name: 'Flexible Dentures Partial',
          price: '€350.00',
          note: 'Meaning 3 teeth and less.',
        },
        { name: 'Chrome Cobalt Dentures', price: '€650.00' },
        {
          name: 'Partial Acrylic Dentures',
          price: '€300.00',
          note: 'More than 3 teeth is considered a full denture.',
        },
        {
          name: 'Flexible Dentures More Than 3 Teeth',
          price: '€650.00',
        },
      ],
    },
    {
      title: 'Orthodontic Treatment & Miscellaneous',
      items: [
        { name: 'Soft Splint 2mm', price: '€100.00' },
        { name: 'Michigan Splint', price: '€300.00' },
        {
          name: 'Clear Correct Treatment',
          price: 'From €2900.00',
          note: 'Invisible aligners.',
        },
        { name: 'Bionator', price: '€600.00' },
        { name: 'Soft Splint 4mm', price: '€120.00' },
        {
          name: 'Invisalign Treatment',
          price: 'From €3500.00',
          note: 'Invisible aligners.',
        },
        {
          name: 'Fixed Upper and Lower Orthodontic Appliance',
          price: 'From €2500.00',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Dental Price List Malta | Apex Dental"
        description="View Apex Dental's price list in Malta for checkups, hygiene, whitening, crowns, veneers, implants, root canal treatment, dentures, and orthodontics."
        canonical={`${siteUrl}/price-list/`}
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

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="space-y-10">
            {priceSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-xl"
              >
                <div className="bg-slate-950 text-white px-8 py-6">
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
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.name}
                          </h3>
                          {item.note && (
                            <p className="mt-2 text-slate-600 leading-7">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="text-xl font-bold text-slate-900 md:text-right">
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
  usePageTitle('Appointment Booking | Apex Dental Malta');

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
            <div className="rounded-[2.5rem] bg-[#f7f4ef] border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Clinic Details
              </h2>
              <div className="mt-6 space-y-5 text-slate-700">
                <div>
                  <div className="font-semibold text-slate-900">Address</div>
                  <div className="mt-1">{brand.address}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Phone</div>
                  <a
                    href={`tel:${brand.phone}`}
                    className="mt-1 block hover:text-sky-700"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={`tel:${brand.mobile}`}
                    className="mt-1 block hover:text-sky-700"
                  >
                    {brand.mobile}
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Email</div>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 block hover:text-sky-700"
                  >
                    {brand.email}
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Working Hours</div>
                  <div className="mt-1">Monday - Friday: 9 am - 7 pm</div>
                  <div>Saturday: 9 am - 12:30 pm</div>
                  <div>Sunday: 9 am - 12 pm (emergency only)</div>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] overflow-hidden shadow-lg">
                <img
                  src={images.contact.CT3}
                  alt="Apex Dental clinic entrance"
                  className="w-full h-[260px] object-cover"
                />
              </div>
            </div>

            <BookingFormCard serviceOptions={serviceOptions} />
          </div>
        </Section>
      </section>

      <section className="bg-[#f7f4ef] py-16">
        <Section>
          <div className="rounded-[2.5rem] bg-white border border-slate-200 p-8 md:p-10 shadow-sm max-w-3xl">
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-4">
              Booking Fee &amp; Cancellation Policy
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
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
  usePageTitle('Contact Apex Dental Malta | Book an Appointment');
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
        description="Contact Apex Dental Malta at Trident Park, Mrieħel, Birkirkara. Call 27016017, WhatsApp 79854037 or fill in our contact form to book your appointment."
        canonical={`${siteUrl}/contact-us/`}
        schema={localBusinessSchema(`${siteUrl}/contact-us/`)}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Contact Apex Dental"
        title="Get in touch — we are at Trident Park, Mrieħel, Birkirkara"
        subtitle="Call us, send a WhatsApp, or fill in the form below. We will get back to you quickly to sort out an appointment or answer anything you are wondering about."
      />
      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <div>
              <div className="rounded-[2rem] bg-[#f7f4ef] border border-slate-200 p-8 mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Contact details</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">Address</div>
                      <div className="text-slate-600 mt-1 leading-7">{brand.address}</div>
                      <a href="https://maps.google.com/?q=Apex+Dental+Trident+Park+Birkirkara+Malta" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 text-sm font-medium mt-1 inline-block">Get directions</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">Phone</div>
                      <a href={`tel:${brand.phone}`} className="text-slate-600 mt-1 block hover:text-sky-700 text-lg font-medium">{brand.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">WhatsApp</div>
                      <a href={`https://wa.me/356${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 mt-1 block hover:text-sky-700 text-lg font-medium">{brand.mobile}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">Opening hours</div>
                      <div className="text-slate-600 mt-1 leading-7">
                        Monday to Friday: 9:00 to 19:00<br />
                        Saturday: 9:00 to 12:30<br />
                        Sunday: 9:00 to 12:00 (emergency only)<br />
                        <span className="text-sm text-slate-500">For Sunday emergencies call or WhatsApp us directly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="Apex Dental Malta — Trident Park, Mrieħel, Birkirkara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.2!2d14.45876!3d35.89618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e51a910f3489f%3A0x6cb52257e336786f!2sApex+Dental!5e0!3m2!1sen!2smt!4v1"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <ContactFormCard />
          </div>
        </Section>
      </section>
      <section className="bg-[#f7f4ef] py-16">
        <Section>
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-8">Quick access</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex items-center gap-3">
                <ChevronRight className="text-sky-600 shrink-0" size={18} />
                <span className="font-medium text-slate-900">{link.label}</span>
              </Link>
            ))}
          </div>
        </Section>
      </section>
      <section className="bg-slate-950 py-16 text-white">
        <Section>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">Internal tools</div>
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">Apex Dental Google Ads management</h2>
                <p className="text-slate-300 leading-7">Access the internal Google Ads dashboard, campaign builder, campaign manager, and AI strategy engine.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button to="/google-ads-dashboard" variant="gold">Ads dashboard</Button>
                <Button to="/google-ads-builder" variant="glass">Campaign builder</Button>
                <Button to="/google-ads-manager" variant="glass">Campaign manager</Button>
                <Button to="/google-ads-strategy" variant="glass">AI strategy</Button>
              </div>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}


function ServicesPage() {
  usePageTitle('Dental Services Malta | Apex Dental');

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
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
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
          className={groupIndex % 2 === 0 ? 'bg-[#f7f4ef] py-20' : 'bg-white py-20'}
        >
          <Section>
            <div className="max-w-4xl mb-12">
              <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Service Category
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
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
                  className="group rounded-[2rem] overflow-hidden bg-slate-950 text-white relative min-h-[460px] shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

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
                    <div className="mt-6 inline-flex items-center gap-2 text-amber-300 font-medium">
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
            <img
              src={images.trust.compliance}
              alt="Apex Dental compliance certificate"
              className="w-full h-[620px] object-cover object-top"
            />
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Compliance & Standards
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
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
                  <BadgeCheck className="text-sky-600 mt-1 shrink-0" size={20} />
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

function SEO({
  title,
  description,
  canonical,
  type = 'website',
  schema = null,
  schemas = null,
  image = `${siteUrl}/images/H1.jpg`,
}) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (attr, key, value) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const ensureLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    ensureMeta('name', 'description', description);
    ensureMeta('property', 'og:title', title);
    ensureMeta('property', 'og:description', description);
    ensureMeta('property', 'og:type', type);
    ensureMeta('property', 'og:url', canonical);
    ensureMeta('property', 'og:image', image);
    ensureMeta('property', 'og:image:width', '1200');
    ensureMeta('property', 'og:image:height', '630');
    ensureMeta('property', 'og:locale', 'en_MT');
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', title);
    ensureMeta('name', 'twitter:description', description);
    ensureMeta('name', 'twitter:image', image);

    ensureLink('canonical', canonical);

    // Remove old single schema tag
    document.head.querySelectorAll('[id^="seo-schema"]').forEach(el => el.remove());

    // Collect all schemas
    const allSchemas = [];
    if (schema) allSchemas.push(schema);
    if (schemas) allSchemas.push(...schemas);

    allSchemas.forEach((s, i) => {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = `seo-schema-${i}`;
      tag.textContent = JSON.stringify(s);
      document.head.appendChild(tag);
    });

    return () => {};
  }, [title, description, canonical, type, schema, schemas]);

  return null;
}


// ── BLOG POST META MAP ──────────────────────────────────────
const blogPostMeta = {
  1: { slug: '/blog/dental-implants-cost-malta/', title: 'How much do dental implants cost in Malta?', description: 'A clear guide to what influences dental implant costs in Malta, from the initial 3D scan to the final crown. Learn what\'s included at Apex Dental.', image: `${siteUrl}/images/I1.jpg`, datePublished: '2025-03-01', breadcrumb: 'Dental Implants Cost Malta' },
  2: { slug: '/blog/veneers-vs-teeth-whitening/', title: 'Veneers vs teeth whitening — what is the difference?', description: 'Veneers and whitening are often confused. One changes colour only. The other transforms shape, size and symmetry. Find out which is right for you.', image: `${siteUrl}/images/C1.jpg`, datePublished: '2025-03-05', breadcrumb: 'Veneers vs Whitening' },
  3: { slug: '/blog/dental-emergency-malta/', title: 'When is a dental problem a dental emergency?', description: 'Not every dental issue needs same-day care. Here\'s how to tell the difference — and what Apex Dental can do for you urgently in Malta.', image: `${siteUrl}/images/CT1.jpg`, datePublished: '2025-03-10', breadcrumb: 'Dental Emergency Malta' },
  4: { slug: '/blog/clear-aligners-adults-malta/', title: 'Are clear aligners suitable for adults?', description: 'More adults than ever are choosing aligners over fixed braces. Find out why and what to expect from Invisalign and clear aligner treatment in Malta.', image: `${siteUrl}/images/A1.jpg`, datePublished: '2025-03-15', breadcrumb: 'Clear Aligners Adults' },
  5: { slug: '/blog/dental-hygiene-appointments/', title: 'Why regular dental hygiene appointments matter more than you think', description: 'Prevention is almost always cheaper and easier than treatment. Find out what happens at a hygiene visit and how often you should attend.', image: `${siteUrl}/images/H9.jpg`, datePublished: '2025-03-20', breadcrumb: 'Dental Hygiene' },
  6: { slug: '/blog/dental-crowns-protect-teeth/', title: 'How do dental crowns protect damaged teeth?', description: 'Crowns are one of the most reliable ways to save a tooth that would otherwise be lost. Here\'s how they work and when they\'re needed.', image: `${siteUrl}/images/C4.jpg`, datePublished: '2025-03-25', breadcrumb: 'Dental Crowns' },
};

function BlogPostPage({ postId }) {
  const meta = blogPostMeta[postId];
  const canonical = `${siteUrl}${meta.slug}`;

  // Inline post data (same as BlogPage)
  const allPosts = {
    1: {
      title: 'How much do dental implants cost in Malta?',
      category: 'Implants',
      readTime: '4 min read',
      content: [
        { type: 'p', text: 'Dental implant costs in Malta vary depending on the complexity of your case, the number of implants required, and the type of restoration placed on top. Understanding what is included in the price is just as important as the headline figure.' },
        { type: 'h3', text: 'What affects the cost of dental implants?' },
        { type: 'p', text: 'Several factors influence the total cost of implant treatment. The number of implants needed is the most obvious variable. A single implant to replace one missing tooth costs significantly less than a full-arch All-on-4 restoration. The condition of your jawbone matters too — patients who require bone grafting before implant placement will have additional treatment needs. The type of crown or bridge placed on the implant also affects cost: zirconia restorations are generally more expensive than acrylic or porcelain-fused-to-metal options.' },
        { type: 'h3', text: 'What is typically included at Apex Dental?' },
        { type: 'p', text: 'At Apex Dental, the implant consultation is free when you proceed with treatment, and the 3D CBCT scan required for planning is also included at no extra cost when implant surgery is carried out. This scan, which provides a detailed view of your bone volume and anatomy, is essential for accurate planning and is a cost that some clinics charge separately.' },
        { type: 'h3', text: 'Single implants vs All-on-4 in Malta' },
        { type: 'p', text: 'A single implant includes the titanium implant, the abutment connector, and the crown. For patients missing most or all of their teeth, All-on-4 — also known as the Toronto bridge — places four implants to support a complete fixed arch. This is a more efficient solution than replacing each tooth individually and is generally more cost-effective per tooth than multiple single implants.' },
        { type: 'h3', text: 'The best way to get an accurate cost' },
        { type: 'p', text: 'The only way to get a reliable cost estimate is through a consultation and 3D scan. Implant costs quoted online without a clinical assessment are rarely accurate because they cannot account for your specific bone structure, the number of implants you need, or any preparatory treatment required. At Apex Dental the consultation is free when you proceed with implant treatment, so there is no cost to finding out exactly what your case involves.' },
        { type: 'cta', text: 'Book a free implant consultation', to: '/dental-implants/' },
      ],
    },
    2: {
      title: 'Veneers vs teeth whitening — what is the difference?',
      category: 'Cosmetic Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Teeth whitening and dental veneers are both popular cosmetic treatments, but they work in completely different ways and achieve very different results. Choosing the right one depends on what you are trying to improve.' },
        { type: 'h3', text: 'What whitening can and cannot do' },
        { type: 'p', text: 'Professional teeth whitening uses bleaching agents to lighten the natural colour of your teeth. It is effective for removing staining caused by coffee, tea, wine, and ageing. However, whitening only affects the shade of your enamel. It cannot change the shape, size, or alignment of your teeth, and it has no effect on crowns, veneers, or composite fillings — these will remain their original colour while your natural teeth whiten around them.' },
        { type: 'h3', text: 'What veneers can do that whitening cannot' },
        { type: 'p', text: 'Porcelain veneers are thin ceramic shells bonded to the front of your teeth. They can change the colour of teeth that are too dark or stained to whiten effectively. But they can also change the shape of teeth that are chipped, worn, or irregularly sized. They can close small gaps, make short teeth appear longer, and create a more symmetrical smile. Veneers offer a degree of smile transformation that whitening simply cannot achieve.' },
        { type: 'h3', text: 'Which is right for you?' },
        { type: 'p', text: 'If your teeth are a good shape and you are mainly concerned about colour, whitening is the simpler, less invasive and more affordable option. If you have cosmetic concerns beyond just shade — chips, wear, size, or shape — veneers are worth considering. Many patients do both: whiten their natural teeth first, then match the veneer shade to the whitened result for a completely consistent smile.' },
        { type: 'cta', text: 'Explore cosmetic treatments', to: '/veneers/' },
      ],
    },
    3: {
      title: 'When is a dental problem a dental emergency?',
      category: 'Emergency Care',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Knowing when to seek urgent dental care can make the difference between saving a tooth and losing it. Some situations genuinely require same-day attention, while others can safely wait for a routine appointment.' },
        { type: 'h3', text: 'Situations that require urgent attention' },
        { type: 'p', text: 'A knocked-out tooth is a genuine emergency — if you act within an hour and keep the tooth moist, it may be possible to reimplant it. A dental abscess with facial swelling, fever, or difficulty swallowing should also be treated as urgent as the infection can spread. Severe, unrelenting toothache that does not respond to over-the-counter pain relief usually indicates infection or nerve damage and needs prompt assessment.' },
        { type: 'h3', text: 'What can wait for a regular appointment' },
        { type: 'p', text: 'A chipped tooth with no pain, a lost filling that is not causing discomfort, or mild sensitivity can generally wait a few days for a scheduled appointment. These are worth addressing soon but are not emergencies in the same sense as an abscess or a knocked-out tooth.' },
        { type: 'h3', text: 'Apex Dental is open Sundays for emergencies' },
        { type: 'p', text: 'Apex Dental is open Sunday mornings from 9am to 12pm specifically for emergency cases. If you are unsure whether your situation warrants urgent care, it is always better to call and describe your symptoms than to wait and risk the problem worsening.' },
        { type: 'cta', text: 'Contact us for emergency care', to: '/emergency-dental-service-malta/' },
      ],
    },
    4: {
      title: 'Are clear aligners suitable for adults?',
      category: 'Aligners',
      readTime: '4 min read',
      content: [
        { type: 'p', text: 'Clear aligners were originally designed with adults in mind. Unlike traditional metal braces, which are more commonly associated with teenagers, aligners are discreet, removable, and designed around the practical demands of adult life.' },
        { type: 'h3', text: 'Why adults prefer aligners over fixed braces' },
        { type: 'p', text: 'The most obvious advantage is appearance. Aligners are transparent and virtually invisible during wear, which matters to professionals and image-conscious adults who would not want visible metal brackets. They are also removable — you take them out for meals, drinks, and oral hygiene, which means no food restrictions and easier cleaning compared to fixed braces. Many adults also find aligners more comfortable than traditional braces, with fewer emergency appointments for broken wires or loose brackets.' },
        { type: 'h3', text: 'What can aligners treat?' },
        { type: 'p', text: 'Aligners can address a wide range of orthodontic issues including crowding, spacing, mild to moderate bite problems, and tooth rotation. More complex cases — particularly those involving significant bite correction — may still be better suited to fixed appliances. Your dentist will assess your specific situation and be honest about whether aligners are the right fit for your goals.' },
        { type: 'h3', text: 'How long does aligner treatment take for adults?' },
        { type: 'p', text: 'Most adult cases are completed in 6 to 18 months depending on the complexity of the tooth movement required. The process begins with digital scanning and a treatment simulation, which means you can see a preview of your expected outcome before committing to treatment.' },
        { type: 'h3', text: 'Multilingual consultations available at Apex Dental' },
        { type: 'p', text: 'Apex Dental offers aligner consultations in English, Italian, and Spanish. Dr Martha Lopez (Spanish-speaking) and Dr Massimo D\'Alessandro (Italian-speaking) are both available for patients who prefer to consult in their first language.' },
        { type: 'cta', text: 'Book an aligner consultation', to: '/invisalign-malta/' },
      ],
    },
    5: {
      title: 'Why regular dental hygiene appointments matter more than you think',
      category: 'Preventive Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'Many people only visit the dentist when something hurts. The problem with this approach is that by the time dental problems cause pain, they are often significantly more advanced — and more expensive to treat — than they would have been if caught earlier.' },
        { type: 'h3', text: 'What happens at a hygiene appointment?' },
        { type: 'p', text: 'A hygiene appointment involves professional removal of plaque and tartar buildup that cannot be removed by brushing and flossing alone. Tartar — calcified plaque — accumulates over time on all teeth and particularly around the gum line. If left, it causes gum inflammation, which can progress to periodontitis — a more serious form of gum disease that damages the bone supporting your teeth. Professional cleaning also gives the dentist an opportunity to spot early signs of decay, gum disease, or other issues before they develop into larger problems.' },
        { type: 'h3', text: 'How often should you attend?' },
        { type: 'p', text: 'The general recommendation for most adults is every six months. Patients with a history of gum disease, smokers, diabetics, and those with certain medications that affect the gums may be advised to attend more frequently. Your dentist will advise the most appropriate schedule for your situation.' },
        { type: 'h3', text: 'The cost of prevention versus the cost of treatment' },
        { type: 'p', text: 'A routine hygiene appointment costs a fraction of what a filling, root canal, or tooth extraction with replacement costs. Regular preventive care consistently reduces the likelihood of needing more complex and costly treatment down the line.' },
        { type: 'cta', text: 'Book a hygiene appointment', to: '/dental-hygiene/' },
      ],
    },
    6: {
      title: 'How do dental crowns protect damaged teeth?',
      category: 'Restorative Dentistry',
      readTime: '3 min read',
      content: [
        { type: 'p', text: 'A dental crown is a cap that fits over the entire visible portion of a tooth, restoring its shape, size, strength, and appearance. Crowns are one of the most versatile and long-lasting restorations in dentistry, used in a wide range of situations where a tooth needs protection or reconstruction.' },
        { type: 'h3', text: 'When is a crown recommended?' },
        { type: 'p', text: 'The most common situations that require a crown include teeth that have undergone root canal treatment, which are more brittle and prone to fracture without a crown to reinforce them. Crowns are also used for teeth with large decay or fractures that cannot be reliably restored with a filling, severely worn teeth, and teeth with a poor appearance that cannot be improved with less invasive options.' },
        { type: 'h3', text: 'What are crowns made of?' },
        { type: 'p', text: 'Modern crowns are most commonly made from ceramic or zirconia — both tooth-coloured materials that are strong, durable, and virtually indistinguishable from natural teeth. Zirconia in particular is highly resistant to fracture and is an excellent choice for back teeth that are under significant chewing load. Metal-fused options are still used in some specific situations but are less common in contemporary practice.' },
        { type: 'h3', text: 'How long does a crown last?' },
        { type: 'p', text: 'With proper care — regular brushing, flossing, and dental check-ups — crowns typically last 10 to 15 years or longer. Avoiding habits like teeth grinding (if untreated), biting very hard objects, or using teeth as tools helps maximise crown lifespan.' },
        { type: 'cta', text: 'Learn about crowns and bridgework', to: '/crowns-and-bridgework/' },
      ],
    },
  };

  const post = allPosts[postId];

  usePageTitle(meta.title);

  return (
    <>
      <SEO
        title={meta.title}
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
              <Link to="/blog/" className="hover:text-slate-900 transition">← Back to blog</Link>
            </div>
            <div className="space-y-6">
              {post.content.map((block, i) => {
                if (block.type === 'p') return <p key={i} className="text-slate-600 leading-8 text-lg">{block.text}</p>;
                if (block.type === 'h3') return <h2 key={i} className="text-2xl font-semibold text-slate-900 mt-10 mb-2">{block.text}</h2>;
                if (block.type === 'cta') return (
                  <div key={i} className="pt-4">
                    <Link to={block.to} className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-slate-700 transition">
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

// ── GOOGLE ADS AUTH GATE ─────────────────────────────────────
// Credentials - change these to your preferred login
const ADS_USERNAME = 'apexdental';
const ADS_PASSWORD = 'Apex2025!';
const SESSION_KEY = 'apex_ads_auth';

function AdsAuthGate({ children }) {
  const [authed, setAuthed] = React.useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === 'true'; } catch { return false; }
  });
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (user.trim() === ADS_USERNAME && pass === ADS_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setAuthed(true);
        setError('');
      } else {
        setError('Incorrect username or password.');
      }
      setLoading(false);
    }, 600);
  }

  if (authed) return children;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/images/orislogo.png" alt="Apex Dental" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-white">Google Ads Management</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to access the Apex Dental ads dashboard</p>
        </div>

        <div className="rounded-[2rem] bg-white/5 border border-white/10 p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <input
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400 transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400 transition text-sm"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 text-slate-950 py-3 font-semibold text-sm hover:bg-amber-300 transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <Link to="/" className="text-slate-400 hover:text-white text-xs transition">
              Back to website
            </Link>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Apex Dental Malta · Internal tool
        </p>
      </div>
    </div>
  );
}

export default function ApexDentalWebsitePremium() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16 lg:pb-0">
      <ScrollToTop />
      <GoogleAdsPageTracker />
      <FloatingHeader />

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
        <Route path="/blog/dental-implants-cost-malta/" element={<BlogPostPage postId={1} />} />
        <Route path="/blog/veneers-vs-teeth-whitening/" element={<BlogPostPage postId={2} />} />
        <Route path="/blog/dental-emergency-malta/" element={<BlogPostPage postId={3} />} />
        <Route path="/blog/clear-aligners-adults-malta/" element={<BlogPostPage postId={4} />} />
        <Route path="/blog/dental-hygiene-appointments/" element={<BlogPostPage postId={5} />} />
        <Route path="/blog/dental-crowns-protect-teeth/" element={<BlogPostPage postId={6} />} />
        <Route path="/appointment-booking/" element={<AppointmentBookingPage />} />
        <Route path="/services/" element={<ServicesPage />} />
        <Route path="/contact-us/" element={<ContactPage />} />
        <Route path="/google-ads-app" element={<AdsAuthGate><GoogleAdsAppPage /></AdsAuthGate>} />
        <Route path="/google-ads-dashboard" element={<AdsAuthGate><GoogleAdsDashboard /></AdsAuthGate>} />
        <Route path="/google-ads-campaign-creator" element={<AdsAuthGate><GoogleAdsCampaignCreator /></AdsAuthGate>} />
        <Route path="/google-ads-manager" element={<AdsAuthGate><GoogleAdsCampaignManager /></AdsAuthGate>} />
        <Route path="/google-ads-strategy" element={<AdsAuthGate><GoogleAdsStrategyEngine /></AdsAuthGate>} />
        <Route path="/google-ads-builder" element={<AdsAuthGate><GoogleAdsCampaignBuilder /></AdsAuthGate>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
      <WhatsAppFloat />
      <MobileStickyBar />
    </div>
  );
}