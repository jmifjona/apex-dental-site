import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import GoogleAdsAppPage from './GoogleAdsAppPage';
import GoogleAdsDashboard from './GoogleAdsDashboard.jsx';
import GoogleAdsCampaignCreator from './GoogleAdsCampaignCreator';
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
    'Trident Park, Imdina Road, Central Business District, Imrieħel, CBD 2010, Malta',
  logo: '/images/orislogo.png',
};

const siteUrl = 'https://apexdentalmalta.com';

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
      streetAddress: 'Trident Park, Imdina Road, Central Business District',
      addressLocality: 'Imrieħel',
      postalCode: 'CBD 2010',
      addressCountry: 'MT',
    },
    areaServed: 'Malta',
    sameAs: [],
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
              <a
                href="https://www.google.com/search?q=Apex+Dental+Malta+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-amber-400 hover:text-amber-300 font-semibold text-sm transition"
              >
                Read all reviews on Google
                <ArrowUpRight size={16} />
              </a>
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
            Beautiful smiles.
            <br />
            Precise dentistry.
            <br />
            A clinic that feels premium.
          </>
        }
        subtitle="Apex Dental combines advanced implantology, aesthetic dentistry, clear aligners, and modern digital workflows in a refined clinic environment designed around trust, comfort, and results."
      />

      <HomeFeatureGrid />
      <ServiceTiles />

      <SplitEditorial
        imageLeft={images.home.H2}
        title="Dentistry designed to feel calm, modern, and high-end"
        text="Your website should reflect the quality of the clinic. That means strong photography, elegant spacing, better contrast, and sections that feel intentional rather than assembled from generic blocks. This layout is built to feel more premium and more confident."
        points={[
          'Clean, high-end visual hierarchy',
          'Editorial image-led layout',
          'Stronger luxury clinic atmosphere',
          'Better mobile browsing and conversion flow',
        ]}
      />

      <HomeGallery />
      <ReviewStrip />

      <CTASection
        title="Ready to experience Apex Dental?"
        text="Book your visit for implants, clear aligners, cosmetic dentistry, general care, or an emergency consultation. Our team will guide you clearly through the next steps."
      />
    </>
  );
}

function ImplantsPage() {
  usePageTitle('Dental Implants Malta | Apex Dental');
  const implantFaqs = [
    { q: 'How long do dental implants last?', a: 'With proper care and regular maintenance, dental implants can last a lifetime. The crown on top may need replacement after 15 to 20 years due to normal wear, but the implant itself, once fully integrated with the bone, is designed to be a permanent solution.' },
    { q: 'Am I suitable for dental implants?', a: 'Most adults with good general health are suitable candidates. Key factors include having sufficient jawbone density, healthy gums, and no uncontrolled systemic conditions. A 3D scan and thorough assessment at Apex Dental will confirm suitability for your specific case.' },
    { q: 'Is the implant procedure painful?', a: 'The procedure is carried out under local anaesthesia, so you should not feel pain during treatment. Post-operative discomfort is normal for a few days and is typically managed with standard pain relief. Most patients find the experience more straightforward than expected.' },
    { q: 'How long does the full implant process take?', a: 'The full treatment from implant placement to the final crown typically takes between 3 and 6 months. This allows time for osseointegration, where the implant fuses with the jawbone before the final restoration is fitted.' },
    { q: 'What is the cost of dental implants in Malta?', a: 'At Apex Dental, the implant consultation is free if implant treatment is carried out, or the fee is deducted from your treatment bill. A 3D scan is also included at no extra cost when you proceed with implant surgery. View our full price list for detailed pricing.' },
    { q: 'What is All-on-4 and is it available at Apex Dental?', a: 'All-on-4 is a full-arch restoration technique where four implants support a complete fixed bridge, often called a Toronto bridge. It is a well-established solution for patients who have lost most or all of their teeth and want a fixed, non-removable result. Apex Dental offers All-on-4 treatment.' },
  ];
  const implantSteps = [
    { title: 'Consultation and 3D scan', text: 'We assess your bone volume, gum health, and overall suitability with a detailed clinical examination and a 3D CBCT scan at no extra cost when you proceed with treatment.' },
    { title: 'Implant placement', text: 'The titanium implant is placed into the jawbone under local anaesthesia. This is a precise surgical procedure carried out in our modern clinical environment.' },
    { title: 'Healing and integration', text: 'The implant is given time to integrate with the surrounding bone, a process called osseointegration. This typically takes 3 to 4 months and is essential for long-term stability.' },
    { title: 'Final restoration', text: 'Once integration is confirmed, the abutment and custom crown are fitted. The result is a natural-looking, fully functional tooth cared for just like your natural teeth.' },
  ];
  const implantPricing = [
    { label: 'Implant consultation', price: 'Free with treatment' },
    { label: '3D CBCT scan', price: 'Free with implant surgery' },
    { label: 'Single implant + crown', price: 'From price list' },
    { label: 'All-on-4 (Toronto bridge)', price: 'From price list' },
    { label: 'Implant-retained denture', price: 'From price list' },
  ];
  return (
    <>
      <SEO
        title="Dental Implants Malta | Apex Dental"
        description="Apex Dental provides dental implants in Malta for single missing teeth, multiple teeth, All-on-4, and advanced restorative cases. Free consultation and 3D scan with treatment. Led by Dr Jonathan Mifsud."
        canonical={`${siteUrl}/dental-implants/`}
        schema={serviceSchema('Dental Implants', 'Dental implant treatment in Malta. Single implants, All-on-4, implant-retained dentures. Free consultation and 3D scan included with treatment.', `${siteUrl}/dental-implants/`)}
      />
      <PageHero
        image={images.implants.I1}
        eyebrow="Dental Implants Malta"
        title="Replace missing teeth with a stable, long-lasting solution that looks and feels natural"
        subtitle="At Apex Dental, implant treatment is planned with precision from the initial 3D scan to the final crown. Led by Dr Jonathan Mifsud, a specialist implantologist based at Trident Park, Malta."
      />
      <SplitEditorial
        imageLeft={images.implants.I2}
        title="Why implants are the gold standard for missing teeth"
        text="A dental implant replaces both the root and the crown of a missing tooth. Unlike a bridge, it does not rely on adjacent teeth for support. It integrates directly with the jawbone, providing stability that feels and functions like a natural tooth and helps preserve the bone around it."
        points={['No damage to adjacent healthy teeth', 'Preserves jawbone and prevents bone loss', 'Feels, looks, and functions like a natural tooth', 'Suitable for single teeth, multiple teeth, or full-arch cases']}
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="Precision planning with 3D imaging"
        text="Successful implant treatment starts well before surgery. At Apex Dental, every implant case begins with a thorough assessment and a 3D CBCT scan included at no extra cost when you proceed with treatment. This allows us to evaluate bone volume, plan implant position accurately, and avoid complications before they arise."
        points={['Free 3D scan with implant surgery', 'Accurate bone and anatomy assessment', 'Precise surgical planning', 'Reduced risk and better long-term outcomes']}
        dark
        reverse
      />
      <ProcessSteps steps={implantSteps} />
      <SplitEditorial
        imageLeft={images.implants.I4}
        title="All-on-4 and full-arch implant solutions"
        text="For patients who have lost most or all of their teeth, All-on-4, also known as the Toronto bridge, provides a fixed full-arch restoration supported by just four implants. It avoids the need for a removable denture and can often be completed in fewer appointments than traditional full-arch implant approaches."
        points={['Fixed non-removable full-arch bridge', 'Supported by four strategically placed implants', 'No need for a removable denture', 'Restores function, confidence, and aesthetics']}
      />
      <PricingHint items={implantPricing} note="At Apex Dental, the implant consultation is free when you proceed with treatment and your 3D scan is also included at no additional cost. We believe in transparent pricing with no unexpected fees. View our full price list for detailed figures on all implant options." />
      <FAQSection faqs={implantFaqs} dark />
      <CTASection dark title="Thinking about dental implants?" text="Book a free implant consultation at Apex Dental in Malta. Dr Jonathan Mifsud will assess your suitability and walk you through all available options for your case." />
    </>
  );
}


function AlignersPage() {
  usePageTitle('Invisalign Malta | Clear Aligners | Apex Dental');
  const alignerFaqs = [
    { q: 'How long does Invisalign treatment take?', a: 'Treatment length depends on the complexity of your case. Mild to moderate corrections typically take 6 to 12 months. More complex cases may take up to 18 months. Your exact timeline will be discussed during your consultation.' },
    { q: 'Is Invisalign suitable for adults?', a: 'Absolutely. Invisalign was designed with adults in mind, particularly professionals who want to straighten their teeth without the visible look of traditional metal braces. It is one of the most popular orthodontic choices for adults at Apex Dental.' },
    { q: 'How many hours a day do you wear aligners?', a: 'For best results, aligners should be worn for 20 to 22 hours per day. They are removed for eating, drinking anything other than water, and brushing and flossing.' },
    { q: 'Is Invisalign painful?', a: 'Most patients experience mild pressure or discomfort when switching to a new set of aligners. This is normal and typically settles within a day or two. It is generally considered more comfortable than traditional fixed braces.' },
    { q: 'Can Invisalign fix my bite as well as straighten my teeth?', a: 'Invisalign can address a range of orthodontic issues including crowding, spacing, overbite, underbite, and crossbite. Whether it is suitable for your specific case will be assessed during your consultation.' },
  ];
  const alignerSteps = [
    { title: 'Consultation and scan', text: 'We assess your teeth, bite, and suitability using digital scanning and photographs. No messy impressions required.' },
    { title: 'Treatment preview', text: 'Digital planning software shows you a simulation of how your teeth will move and what your smile will look like at the end of treatment.' },
    { title: 'Aligner delivery', text: 'Your custom-made aligner series is fabricated and delivered to the clinic. You receive your first sets with full instructions on wear and care.' },
    { title: 'Progress check-ups', text: 'Regular short appointments allow us to monitor your progress, issue new aligners, and keep your treatment on track.' },
  ];
  return (
    <>
      <SEO
        title="Invisalign Malta | Clear Aligners | Apex Dental"
        description="Invisalign and clear aligner treatment in Malta at Apex Dental. Discreet, removable orthodontics for adults. Digital planning and multilingual consultations available."
        canonical={`${siteUrl}/invisalign-malta/`}
        schema={serviceSchema('Clear Aligners', 'Invisalign and clear aligner orthodontic treatment in Malta at Apex Dental.', `${siteUrl}/invisalign-malta/`)}
      />
      <PageHero
        image={images.aligners.A1}
        eyebrow="Invisalign and Clear Aligners Malta"
        title="Straighten your teeth discreetly without fixed braces or obvious hardware"
        subtitle="Clear aligners are the orthodontic choice for patients who want a better smile without disrupting their lifestyle, appearance, or confidence during treatment."
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Why so many adults choose clear aligners"
        text="Traditional metal braces are visible, fixed in place, and make eating and cleaning difficult. Clear aligners are transparent, removable, and designed around modern adult life. You can eat what you like, maintain normal oral hygiene, and go about your day without anyone noticing you are in orthodontic treatment."
        points={['Nearly invisible during wear', 'Removable for meals, drinks and brushing', 'No food restrictions', 'Fewer and shorter clinic appointments']}
      />
      <SplitEditorial
        imageLeft={images.aligners.A3}
        title="Digital planning — see your result before you start"
        text="Digital planning software allows us to show you a simulation of your tooth movement and predicted outcome before treatment begins. You know what you are signing up for before committing to anything."
        points={['Digital smile simulation before you commit', 'Precise, predictable tooth movement', 'Custom-made aligners for your exact teeth', 'Clear timeline from day one']}
        dark
        reverse
      />
      <ProcessSteps steps={alignerSteps} />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="Multilingual consultations available"
        text="At Apex Dental, our team includes Dr Martha Lopez who is Spanish-speaking and Dr Massimo D'Alessandro who is Italian-speaking, making clear aligner treatment accessible to Malta's diverse international community. Consultations are available in your preferred language."
        points={['English, Italian and Spanish spoken', 'Welcoming to expats and international patients', 'Same high standard of care for every patient', 'Located at Trident Park, Birkirkara']}
      />
      <FAQSection faqs={alignerFaqs} dark />
      <CTASection title="Interested in clear aligners in Malta?" text="Book a consultation at Apex Dental and we will assess your suitability, show you a digital preview of your result, and walk you through all available options." />
    </>
  );
}


function CosmeticPage() {
  usePageTitle('Cosmetic Dentistry Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.cosmetic.C1}
        eyebrow="Cosmetic Dentistry Malta"
        title="Smile enhancement with a refined, natural-looking result"
        subtitle="Cosmetic dentistry at Apex Dental is focused on elegance, harmony, and creating results that look polished without looking artificial."
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="Veneers, whitening, and smile refinement"
        text="Cosmetic treatment may include veneers, whitening, and other aesthetic improvements designed to enhance colour, symmetry, proportion, and smile confidence. The goal is always to elevate the smile while maintaining natural character."
        points={[
          'Porcelain and aesthetic smile solutions',
          'Refined cosmetic planning',
          'Natural-looking enhancement',
          'Tailored to each patient’s features',
        ]}
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Smile design with attention to detail"
        text="A high-quality cosmetic result depends on more than bright teeth. It requires attention to facial harmony, proportions, contours, surface texture, and how the final smile fits the patient. Beautiful dentistry is detail-sensitive dentistry."
        points={[
          'Balanced and natural smile design',
          'Attention to shape, harmony, and proportion',
          'Premium aesthetic workflow',
          'Treatment led by visual refinement',
        ]}
        dark
        reverse
      />

      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="A more elevated cosmetic experience"
        text="Cosmetic dentistry should feel premium from consultation to result. At Apex Dental, the emphasis is on elegant presentation, careful planning, and outcomes that feel sophisticated rather than excessive. Good veneers should not look like the teeth joined a nightclub."
        points={[
          'Elegant and believable final results',
          'Clear aesthetic consultation process',
          'Premium clinical environment',
          'Confidence-focused treatment planning',
        ]}
      />

      <CTASection
        dark
        title="Considering cosmetic dentistry?"
        text="Book a consultation to discuss veneers, whitening, smile enhancement, and the most suitable aesthetic options for your case."
      />
    </>
  );
}

function AboutPage() {
  usePageTitle('About Apex Dental Malta | Our Dental Team');
  const team = [
    { name: 'Dr Jonathan Mifsud', role: 'Dental Implantologist', flag: null, bio: 'Dr Jonathan Mifsud is the founder and lead clinician at Apex Dental. Specialising in dental implantology and restorative dentistry, he leads all implant cases and complex treatment planning at the clinic, including single implants, All-on-4, and full-arch restorations.' },
    { name: 'Dr Charlotte Axisa', role: 'General and Restorative Dentist', flag: null, bio: 'Dr Charlotte Axisa is a skilled general and restorative dentist with experience across a broad range of treatments. She provides routine care, fillings, crowns, and preventive dentistry with a calm and patient-focused manner.' },
    { name: "Dr Massimo D'Alessandro", role: 'General Dentist', flag: 'IT', bio: "Dr Massimo D'Alessandro brings his Italian dental training and background to Apex Dental. Italian-speaking patients are welcome to consult with Dr D'Alessandro in their preferred language." },
    { name: 'Dr Adam Borg', role: 'General Dentist', flag: null, bio: 'Dr Adam Borg provides a wide range of general dental treatments at Apex Dental, with a focus on clear communication, patient comfort, and delivering consistent quality care across routine and restorative procedures.' },
    { name: 'Dr Martha Lopez', role: 'General and Cosmetic Dentist', flag: 'ES', bio: 'Dr Martha Lopez joins Apex Dental from Spain, bringing international dental expertise and a particular interest in cosmetic and aesthetic dentistry. Spanish-speaking patients are warmly welcome to consult with Dr Lopez in their first language.' },
  ];
  const milestones = [
    { year: '2023', label: 'Apex Dental founded at Trident Park, Birkirkara, Malta' },
    { year: '2024', label: 'Expanded to full implant surgery, All-on-4, and clear aligner therapy' },
    { year: '2024', label: 'Compliance recognition for high-level professional standards' },
    { year: '2025', label: "Continued growth as one of Malta's leading private dental clinics" },
  ];
  return (
    <>
      <SEO
        title="About Apex Dental Malta | Our Dental Team"
        description="Meet the team at Apex Dental Malta. Dr Jonathan Mifsud (Implantologist), Dr Charlotte Axisa, Dr Massimo D'Alessandro (Italian-speaking), Dr Adam Borg and Dr Martha Lopez (Spanish-speaking). Trident Park, Birkirkara."
        canonical={`${siteUrl}/about-us/`}
        schema={localBusinessSchema(`${siteUrl}/about-us/`)}
      />
      <PageHero
        image={images.about.AB1}
        eyebrow="About Apex Dental"
        title="A modern dental clinic in Malta built around precision, clarity, and patient confidence"
        subtitle="Apex Dental is a private dental clinic at Trident Park, Birkirkara, with a multilingual team of five dentists. Consultations available in English, Italian, and Spanish."
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
            A multilingual team — English, Italian and Spanish spoken
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
            Building a clinic patients trust, year by year
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
      <CTASection title="Would you like to visit Apex Dental?" text="Book an appointment online, call us on 27016017, or send a WhatsApp message to 79854037. We are based at Trident Park, Birkirkara, Malta." />
    </>
  );
}


function GeneralDentistryPage() {
  usePageTitle('General Dentistry Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H5}
        eyebrow="General Dentistry Malta"
        title="Modern everyday dental care delivered with the same attention to quality as advanced treatment"
        subtitle="General dentistry at Apex Dental focuses on oral health, prevention, function, and maintaining a smile that stays healthy and stable over time."
      />

      <SplitEditorial
        imageLeft={images.home.H6}
        title="Routine care that protects long-term oral health"
        text="General dentistry includes examinations, fillings, maintenance care, diagnosis of dental problems, and monitoring of the teeth and gums. The goal is to identify concerns early and treat them before they become more complex."
        points={[
          'Routine dental check-ups',
          'Fillings and restorative care',
          'Assessment of teeth and gums',
          'Early diagnosis of dental issues',
        ]}
      />

      <SplitEditorial
        imageLeft={images.home.H7}
        title="A better standard of everyday dental care"
        text="At Apex Dental, routine dentistry is approached with the same professionalism and detail as cosmetic and implant treatment. Preventive and restorative care should still feel thorough, clear, and well-managed."
        points={[
          'Professional, patient-focused approach',
          'Clear communication and guidance',
          'Careful diagnosis and treatment planning',
          'Long-term oral health mindset',
        ]}
        dark
        reverse
      />

      <CTASection
        title="Looking for a trusted dentist in Malta?"
        text="Book a routine visit at Apex Dental for examination, diagnosis, preventive care, or treatment planning."
      />
    </>
  );
}

function HygienePage() {
  usePageTitle('Dental Hygiene Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H8}
        eyebrow="Dental Hygiene Malta"
        title="Preventive dentistry and hygiene care that keeps your smile healthy, fresh, and easier to maintain"
        subtitle="Dental hygiene is one of the most important parts of long-term oral health. It helps reduce plaque, tartar buildup, gum inflammation, and future treatment needs."
      />

      <SplitEditorial
        imageLeft={images.home.H9}
        title="Why hygiene visits matter"
        text="Professional hygiene appointments help remove deposits that regular brushing and flossing cannot always manage effectively. They also support gum health, fresher breath, cleaner teeth, and early identification of potential problems."
        points={[
          'Plaque and tartar removal',
          'Improved gum health',
          'Fresher breath and cleaner teeth',
          'Support for long-term oral stability',
        ]}
      />

      <SplitEditorial
        imageLeft={images.home.H10}
        title="Preventive care is smarter care"
        text="Patients often focus on treatment only when something hurts, but preventive dentistry is what helps avoid larger problems. Regular hygiene visits are one of the best ways to protect both oral health and future treatment costs."
        points={[
          'Helps reduce future dental problems',
          'Supports maintenance after treatment',
          'Useful before cosmetic work',
          'Important for implant and restorative care',
        ]}
        dark
        reverse
      />

      <CTASection
        title="Time for a hygiene visit?"
        text="Book a preventive dental hygiene appointment at Apex Dental and keep your smile in better long-term condition."
      />
    </>
  );
}

function VeneersPage() {
  usePageTitle('Dental Veneers Malta | Apex Dental');
  const veneerFaqs = [
    { q: 'What are dental veneers made of?', a: 'At Apex Dental we primarily use porcelain veneers, which are thin ceramic shells custom-made to fit over the front surface of your teeth. Porcelain is preferred for its durability, stain resistance, and natural light-reflecting properties that closely mimic real tooth enamel.' },
    { q: 'How long do veneers last?', a: 'Porcelain veneers typically last 10 to 15 years or longer with proper care. This includes regular brushing, flossing, avoiding biting very hard objects, and attending routine dental check-ups.' },
    { q: 'Is the veneer procedure painful?', a: 'The procedure involves minimal discomfort. Local anaesthesia is used during the tooth preparation stage. Some patients experience mild sensitivity for a few days after placement, which settles quickly.' },
    { q: 'How many teeth can be treated with veneers?', a: 'Veneers can be placed on one tooth or across an entire smile. Some patients choose veneers for just one or two teeth affected by staining or chips, while others opt for a full smile makeover covering six to ten front teeth.' },
    { q: 'Can veneers be combined with whitening?', a: 'Yes, but the sequencing matters. Whitening should be done first if you are also whitening natural teeth. The veneers are then shade-matched to your newly whitened teeth for a consistent, natural result.' },
  ];
  const veneerSteps = [
    { title: 'Smile design consultation', text: 'We discuss your aesthetic goals and plan the shape, size and shade of your veneers using photos and digital references.' },
    { title: 'Tooth preparation', text: 'A thin layer of enamel is removed from the front of the teeth to make room for the veneer. Temporary veneers are placed while your permanent ones are made.' },
    { title: 'Veneer fabrication', text: 'Your custom porcelain veneers are precision-made by a dental technician based on detailed impressions and shade information.' },
    { title: 'Bonding and final fitting', text: 'The veneers are checked for fit, shape and colour before being permanently bonded to your teeth. The result is immediately visible.' },
  ];
  return (
    <>
      <SEO
        title="Dental Veneers Malta | Porcelain Veneers | Apex Dental"
        description="Porcelain dental veneers in Malta at Apex Dental. Custom smile design for chipped, stained, or misshapen teeth. Book a veneer consultation today."
        canonical={`${siteUrl}/veneers/`}
        schema={serviceSchema('Dental Veneers', 'Porcelain dental veneer treatment in Malta for smile improvement at Apex Dental.', `${siteUrl}/veneers/`)}
      />
      <PageHero
        image={images.cosmetic.C1}
        eyebrow="Dental Veneers Malta"
        title="Transform the shape, colour and symmetry of your smile with porcelain veneers"
        subtitle="Veneers are one of the most effective cosmetic dental treatments available, covering imperfections and redesigning your smile in a way that looks completely natural."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="What veneers can correct"
        text="Porcelain veneers are used to address a wide range of aesthetic concerns from minor chips and staining to more significant issues with shape, size, or symmetry. Unlike whitening, which only affects colour, veneers can change the entire appearance of a tooth."
        points={['Discoloured or stained teeth that do not whiten', 'Chipped, cracked or worn teeth', 'Slight misalignment or gaps between teeth', 'Teeth that are too small or irregularly shaped']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Porcelain is the premium choice"
        text="Porcelain veneers are the gold standard in cosmetic dentistry. They are stronger than composite resin alternatives, highly resistant to staining, and have a translucency that mirrors natural tooth enamel under light. When crafted well, they are virtually indistinguishable from your natural teeth."
        points={['Durable and long-lasting 10 to 15 years plus', 'Highly stain resistant', 'Natural light-reflecting appearance', 'Custom-fabricated for your smile']}
        dark
        reverse
      />
      <ProcessSteps steps={veneerSteps} />
      <FAQSection faqs={veneerFaqs} />
      <CTASection dark title="Ready to improve your smile with veneers?" text="Book a cosmetic consultation at Apex Dental and we will discuss your goals, assess suitability, and walk you through your options with complete transparency." />
    </>
  );
}


function TeethWhiteningPage() {
  usePageTitle('Teeth Whitening Malta | Apex Dental');
  const whiteningFaqs = [
    { q: 'How white can my teeth get?', a: 'Results vary depending on your natural tooth colour and the type of staining present. Most patients achieve a noticeably brighter result. Professional whitening is more effective than over-the-counter products because it uses higher-concentration gels under controlled conditions.' },
    { q: 'Is teeth whitening safe?', a: 'Yes, when carried out by a dental professional. Whitening at Apex Dental uses regulated, clinically appropriate bleaching agents. Your gums and soft tissues are protected during treatment, and custom trays ensure the gel only contacts your teeth.' },
    { q: 'How long do whitening results last?', a: 'Most patients maintain good results for 12 to 24 months with regular brushing and occasional top-up treatments using their custom trays.' },
    { q: 'Does whitening work on crowns or veneers?', a: 'No. Whitening agents only affect natural tooth enamel and will not change the colour of crowns, veneers, or composite fillings. If you have existing restorations, we will discuss this during your consultation so your treatment is planned appropriately.' },
    { q: 'Will whitening make my teeth sensitive?', a: 'Some patients experience mild, temporary sensitivity during or after whitening. This typically resolves within a few days. Sensitivity toothpaste used during the whitening period can help manage this.' },
  ];
  const whiteningSteps = [
    { title: 'Consultation', text: 'We assess your tooth colour, existing restorations, and suitability for whitening, and discuss whether home or in-clinic treatment is the better fit for your goals.' },
    { title: 'Custom tray impressions', text: 'For home whitening, we take impressions to create precision-fitted trays that hold the bleaching gel against your teeth for even, predictable results.' },
    { title: 'Whitening treatment', text: 'You apply the whitening gel in your custom trays at home for the prescribed duration each day, typically one to two weeks.' },
    { title: 'Review and top-ups', text: 'We review your result and provide guidance on maintaining it. Your custom trays can be used for future top-up treatments to keep your smile bright.' },
  ];
  return (
    <>
      <SEO
        title="Teeth Whitening Malta | Apex Dental"
        description="Professional teeth whitening in Malta at Apex Dental. Custom home whitening trays and in-clinic options for a brighter, whiter smile. Book a consultation today."
        canonical={`${siteUrl}/teeth-whitening/`}
        schema={serviceSchema('Teeth Whitening', 'Professional teeth whitening in Malta with custom home trays and in-clinic options.', `${siteUrl}/teeth-whitening/`)}
      />
      <PageHero
        image={images.cosmetic.C2}
        eyebrow="Teeth Whitening Malta"
        title="Professional whitening for a brighter, more confident smile done safely and effectively"
        subtitle="At Apex Dental, whitening is supervised and tailored to your teeth. Custom trays and professional-grade gels deliver better, more predictable results than anything available off the shelf."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Why professional whitening outperforms DIY"
        text="Over-the-counter whitening strips and kits use low-concentration gels and generic trays that do not fit properly. Professional whitening uses regulated, higher-strength bleaching agents with custom trays that hold the gel precisely where it needs to be."
        points={['Higher-strength regulated whitening gels', 'Custom trays for even, precise application', 'Supervised treatment with professional guidance', 'More consistent, longer-lasting results']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="Home whitening with custom trays"
        text="Apex Dental home whitening includes custom-fitted trays made from impressions of your teeth, along with professional whitening gel. You wear the trays for a set period each day and the results build gradually. The trays can be kept for future top-up treatments."
        points={['Precision-fitted custom trays included', 'Gradual, controlled whitening at home', 'Flexible and fits around your schedule', 'Trays reusable for long-term maintenance']}
        dark
        reverse
      />
      <ProcessSteps steps={whiteningSteps} dark />
      <FAQSection faqs={whiteningFaqs} />
      <CTASection title="Ready for a brighter smile?" text="Book a whitening consultation at Apex Dental and we will recommend the most suitable option for your teeth, lifestyle, and goals." />
    </>
  );
}


function CrownsBridgeworkPage() {
  usePageTitle('Crowns and Bridges Malta | Apex Dental');
  const crownFaqs = [
    { q: 'When is a crown needed?', a: 'A crown is typically recommended when a tooth is too damaged or decayed to be reliably restored with a filling alone, for example after root canal treatment, a large fracture, or severe wear. Crowns are also used to improve the appearance of misshapen or heavily discoloured teeth.' },
    { q: 'What are dental crowns made of?', a: 'At Apex Dental we use high-quality ceramic and zirconia crowns, which are strong, tooth-coloured, and virtually indistinguishable from natural teeth. Metal-fused options are available for specific clinical situations.' },
    { q: 'How long do crowns last?', a: 'With proper care, crowns typically last 10 to 15 years or more. Regular dental check-ups, good oral hygiene, and avoiding habits like grinding or biting very hard objects help maximise crown longevity.' },
    { q: 'What is a dental bridge?', a: 'A dental bridge replaces one or more missing teeth by anchoring to the teeth on either side of the gap. The adjacent teeth are prepared and crowned, with an artificial tooth suspended between them. It is a fixed, non-removable solution for missing teeth.' },
    { q: 'Crown or implant — which is better for a missing tooth?', a: 'An implant is generally the preferred long-term solution for a single missing tooth because it does not require altering adjacent healthy teeth. However, a bridge may be more appropriate in certain situations. Your dentist will advise based on your specific case.' },
  ];
  return (
    <>
      <SEO
        title="Crowns and Bridges Malta | Apex Dental"
        description="Dental crowns and bridges in Malta at Apex Dental. Protect damaged teeth and replace missing teeth with high-quality ceramic and zirconia restorations."
        canonical={`${siteUrl}/crowns-and-bridgework/`}
        schema={serviceSchema('Dental Crowns and Bridges', 'Dental crown and bridge treatment in Malta at Apex Dental.', `${siteUrl}/crowns-and-bridgework/`)}
      />
      <PageHero
        image={images.cosmetic.C4}
        eyebrow="Crowns and Bridges Malta"
        title="Protect damaged teeth and replace missing ones with strong, natural-looking restorations"
        subtitle="Dental crowns and bridges are among the most reliable restorative options available, restoring function, protecting weakened teeth, and improving appearance with durable ceramic materials."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C1}
        title="Dental crowns — when a filling is not enough"
        text="A crown covers the entire visible surface of a tooth, providing protection and restoring shape, strength and appearance. It is used when a tooth has been significantly weakened by decay, fracture, or previous treatment and needs more support than a filling alone can provide."
        points={['Protects teeth after root canal treatment', 'Restores badly broken or worn teeth', 'Covers misshapen or heavily stained teeth', 'High-quality ceramic and zirconia materials']}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="Dental bridges — a fixed solution for missing teeth"
        text="A dental bridge replaces one or more missing teeth using the support of adjacent teeth. The teeth on either side of the gap are prepared and crowned, with an artificial tooth connecting them. The result is a fixed, non-removable restoration that looks and functions like natural teeth."
        points={['Replaces one or more missing teeth', 'Fixed and not removable like a denture', 'Restores chewing function and smile aesthetics', 'Prevents remaining teeth from shifting']}
        dark
        reverse
      />
      <FAQSection faqs={crownFaqs} />
      <CTASection title="Need a crown or bridge in Malta?" text="Book a consultation at Apex Dental. We will assess your tooth and recommend the most appropriate and cost-effective restoration for your situation." />
    </>
  );
}


function PeriodontologyPage() {
  usePageTitle('Periodontology Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H8}
        eyebrow="Periodontology Malta"
        title="Gum care and periodontal treatment to support the foundation of a healthy smile"
        subtitle="Periodontology focuses on the gums and supporting tissues around the teeth. Healthy gums are essential for long-term oral stability."
      />
      <SplitEditorial
        imageLeft={images.home.H9}
        title="Why gum health matters"
        text="Periodontal problems can affect the gums, bone support, and the long-term stability of teeth. Early diagnosis and maintenance can make a major difference."
        points={[
          'Gum health monitoring',
          'Periodontal treatment where needed',
          'Support for long-term tooth stability',
          'Important before and after advanced treatment',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H10}
        title="Prevention, treatment, and maintenance"
        text="At Apex Dental, gum care is part of the wider long-term health strategy. Healthy supporting tissues are critical for natural teeth, restorations, and implants alike."
        points={[
          'Prevention-focused care',
          'Maintenance for ongoing stability',
          'Useful for implant patients too',
          'Long-term oral health mindset',
        ]}
        dark
        reverse
      />
      <CTASection
        title="Concerned about your gums?"
        text="Book an assessment so Apex Dental can evaluate gum health and guide you clearly on next steps."
      />
    </>
  );
}

function OrthodonticPage() {
  usePageTitle('Orthodontic Treatment Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.aligners.A3}
        eyebrow="Orthodontic Treatment Malta"
        title="Orthodontic care for alignment, bite improvement, and a better-balanced smile"
        subtitle="Orthodontic treatment can help improve crowding, spacing, bite issues, and overall smile positioning for both function and aesthetics."
      />
      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="More than just straight teeth"
        text="Orthodontics helps improve alignment and bite relationships, which can influence oral health, smile aesthetics, and how comfortably the teeth function together."
        points={[
          'Crowding and spacing correction',
          'Bite improvement',
          'Smile and facial balance',
          'Treatment options for different needs',
        ]}
      />
      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Fixed appliances and modern aligner options"
        text="Apex Dental can present orthodontic options ranging from more traditional approaches to discreet aligner-based treatment, depending on the case."
        points={[
          'Traditional orthodontic options',
          'Clear aligner alternatives',
          'Assessment-led treatment planning',
          'Tailored recommendations',
        ]}
        dark
        reverse
      />
      <CTASection
        dark
        title="Interested in orthodontic treatment?"
        text="Book a consultation to find out which type of treatment best fits your case and lifestyle."
      />
    </>
  );
}

function DentalProstheticsPage() {
  usePageTitle('Dental Prosthetics Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H5}
        eyebrow="Dental Prosthetics Malta"
        title="Prosthetic solutions designed to restore missing teeth, function, and confidence"
        subtitle="Dental prosthetics include a range of restorative options used to replace missing teeth and improve daily comfort, support, and smile aesthetics."
      />
      <SplitEditorial
        imageLeft={images.home.H6}
        title="Restorative solutions tailored to the patient"
        text="Prosthetic treatment may include fixed or removable options depending on the number of missing teeth, bone support, comfort needs, and long-term goals."
        points={[
          'Fixed and removable solutions',
          'Replacement of missing teeth',
          'Functional and aesthetic planning',
          'Patient-specific treatment selection',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H7}
        title="Designed for comfort and usability"
        text="Good prosthetic treatment should not only fill a space, but also feel practical, stable, and manageable in everyday life."
        points={[
          'Focus on fit and function',
          'Comfort in daily use',
          'Clear treatment explanation',
          'Long-term maintenance guidance',
        ]}
        dark
        reverse
      />
      <CTASection
        title="Need advice on prosthetic options?"
        text="Book a consultation and Apex Dental can guide you through the restorative solutions most suitable for your case."
      />
    </>
  );
}

function RemovableProsthesisPage() {
  usePageTitle('Removable Prosthesis Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H8}
        eyebrow="Removable Prosthesis Malta"
        title="Removable tooth replacement options designed for support, comfort, and function"
        subtitle="Removable prostheses can help patients replace missing teeth in a practical and often cost-effective way, with options depending on support, fit, and case complexity."
      />
      <SplitEditorial
        imageLeft={images.home.H9}
        title="A practical restorative option"
        text="Removable prostheses can be used for partial or full tooth replacement and may be appropriate where fixed alternatives are not preferred or not indicated."
        points={[
          'Partial and full removable options',
          'Different material choices',
          'Practical restorative pathway',
          'Adapted to individual needs',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H10}
        title="Support, maintenance, and realistic planning"
        text="A good removable solution balances fit, support, ease of use, maintenance needs, and patient expectations. Proper planning makes a major difference."
        points={[
          'Focus on fit and support',
          'Ease of cleaning and use',
          'Expectation management',
          'Long-term maintenance advice',
        ]}
        dark
        reverse
      />
      <CTASection
        dark
        title="Considering denture options?"
        text="Book a consultation to discuss removable prosthesis solutions and which option may suit you best."
      />
    </>
  );
}

function RootCanalPage() {
  usePageTitle('Root Canal Treatment Malta | Apex Dental');
  const rootCanalFaqs = [
    { q: 'Is root canal treatment painful?', a: 'Root canal treatment is performed under local anaesthesia, so you should not feel pain during the procedure. Most patients are surprised by how comfortable it is. The treatment relieves the pain caused by infection rather than causing it.' },
    { q: 'How do I know if I need a root canal?', a: 'Signs that may indicate root canal treatment include persistent toothache, sensitivity to hot or cold that lingers, a darkening tooth, swelling or tenderness in the gum near a tooth, or a persistent pimple on the gum. An X-ray is needed to confirm the diagnosis.' },
    { q: 'How long does root canal treatment take?', a: 'Most root canal treatments are completed in one to two appointments, each lasting approximately 60 to 90 minutes. Complex cases or teeth with multiple canals may require additional time.' },
    { q: 'What happens after root canal treatment?', a: 'After root canal treatment, the tooth is typically restored with a crown to protect it from fracture. A tooth that has had its pulp removed is more brittle without a crown. Your dentist will discuss the restoration plan with you.' },
    { q: 'Can a root-treated tooth last a lifetime?', a: 'Yes. With proper restoration and good oral hygiene, a root-treated tooth can last as long as your natural teeth. The key is having the tooth properly crowned after treatment and maintaining regular dental check-ups.' },
  ];
  const rootCanalSteps = [
    { title: 'Assessment and X-ray', text: 'We examine the tooth, take X-rays to assess the root canals and extent of infection, and confirm whether root canal treatment is the appropriate option.' },
    { title: 'Cleaning the canals', text: 'Under local anaesthesia, the infected pulp is removed and the root canals are carefully cleaned, shaped, and disinfected to eliminate bacteria.' },
    { title: 'Sealing the tooth', text: 'The cleaned canals are filled and sealed with a biocompatible material. A temporary or permanent filling is placed to close the tooth.' },
    { title: 'Crown placement', text: 'In most cases, a crown is recommended to protect the treated tooth from fracture and restore full function and appearance.' },
  ];
  return (
    <>
      <SEO
        title="Root Canal Treatment Malta | Apex Dental"
        description="Root canal treatment in Malta at Apex Dental. Comfortable, effective treatment for infected or damaged teeth saving your natural tooth and relieving pain."
        canonical={`${siteUrl}/root-canal-treatment/`}
        schema={serviceSchema('Root Canal Treatment', 'Root canal treatment in Malta to save infected or damaged teeth and relieve pain.', `${siteUrl}/root-canal-treatment/`)}
      />
      <PageHero
        image={images.implants.I2}
        eyebrow="Root Canal Treatment Malta"
        title="Save your natural tooth with comfortable, effective treatment for infected teeth"
        subtitle="Root canal treatment has a reputation far worse than the reality. At Apex Dental, treatment is carried out under local anaesthesia and most patients are surprised by how manageable the experience is."
      />
      <SplitEditorial
        imageLeft={images.implants.I3}
        title="When is root canal treatment needed?"
        text="Root canal treatment becomes necessary when the inner pulp of a tooth becomes infected or inflamed. This can happen as a result of deep decay, a crack or fracture, repeated dental procedures on the same tooth, or trauma. Left untreated, the infection can spread and the tooth may be lost entirely."
        points={['Severe or persistent toothache', 'Prolonged sensitivity to hot or cold', 'Darkening of the tooth', 'Swelling or a gum abscess near the tooth']}
      />
      <SplitEditorial
        imageLeft={images.implants.I4}
        title="The goal is to save your natural tooth"
        text="Wherever possible, saving a natural tooth is the better long-term outcome. A tooth that has been root-treated, properly crowned, and maintained with good oral hygiene can last a lifetime. Preserving what you have is always the first priority."
        points={['Preserves your natural tooth and root', 'Avoids the cost and recovery of extraction and replacement', 'Treated tooth restored with a crown for strength', 'Normal eating and function restored']}
        dark
        reverse
      />
      <ProcessSteps steps={rootCanalSteps} />
      <FAQSection faqs={rootCanalFaqs} />
      <CTASection title="Concerned about a painful tooth?" text="Do not leave toothache or swelling untreated. Book an appointment at Apex Dental and we will assess the situation promptly and recommend the right treatment for your case." />
    </>
  );
}


function EmergencyPage() {
  usePageTitle('Emergency Dentist Malta | Apex Dental');
  const emergencyFaqs = [
    { q: 'What counts as a dental emergency?', a: 'A dental emergency is any situation causing severe pain, swelling, bleeding, or significant damage that needs prompt professional attention. This includes severe toothache, a knocked-out or broken tooth, a dental abscess, a lost crown or filling causing pain, and facial swelling.' },
    { q: 'What should I do if a tooth is knocked out?', a: 'Pick up the tooth by the crown not the root, rinse it gently with milk or clean water, and try to reposition it in the socket if possible. If not, store it in milk or between your cheek and gum to keep it moist. Contact Apex Dental immediately as time is critical for saving a knocked-out tooth.' },
    { q: 'How quickly can I be seen at Apex Dental for an emergency?', a: 'We aim to accommodate genuine dental emergencies as quickly as possible. Contact us directly by phone or WhatsApp to explain your situation and we will arrange an appointment at the earliest available slot.' },
    { q: 'What can I do at home while waiting to be seen?', a: 'For pain, take over-the-counter pain relief such as ibuprofen or paracetamol as directed. For swelling, apply a cold compress to the outside of the cheek. Avoid very hot, cold, or hard foods. For a lost filling or crown, temporary dental cement from a pharmacy can provide short-term protection.' },
    { q: 'Is a dental abscess a dental emergency?', a: 'Yes. A dental abscess is an infection that can spread if left untreated and should be assessed promptly. Signs include severe throbbing pain, swelling of the face or jaw, fever, and difficulty swallowing. Contact Apex Dental or seek urgent care if you suspect an abscess.' },
  ];
  const emergencyTypes = [
    { title: 'Severe toothache', text: 'Persistent or severe tooth pain that does not settle with pain relief may indicate infection, a deep crack, or an abscess requiring urgent assessment.' },
    { title: 'Swelling or abscess', text: 'Facial swelling, gum swelling, or a painful lump near a tooth can indicate infection. This should be assessed promptly to prevent the infection from spreading.' },
    { title: 'Broken or knocked-out tooth', text: 'A knocked-out tooth has the best chance of being saved if you act within the hour. Broken teeth with sharp edges or exposed nerve tissue also require urgent attention.' },
    { title: 'Lost crown, bridge, or filling', text: 'If a restoration has come off and is causing pain or leaving a tooth vulnerable, contact us to arrange a prompt appointment to protect the tooth.' },
  ];
  return (
    <>
      <SEO
        title="Emergency Dentist Malta | Apex Dental"
        description="Need an emergency dentist in Malta? Apex Dental provides urgent dental care for toothache, swelling, broken teeth, abscesses, and lost restorations. Open Sunday 9-12. Call or WhatsApp us now."
        canonical={`${siteUrl}/emergency-dental-service-malta/`}
        schema={serviceSchema('Emergency Dentist Malta', 'Emergency dental care in Malta at Apex Dental. Open Sunday 9am-12pm for emergencies. Urgent assessment for severe toothache, dental abscess, broken teeth, and lost restorations.', `${siteUrl}/emergency-dental-service-malta/`)}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Emergency Dentist Malta"
        title="Urgent dental care when you need it — fast assessment, clear guidance, prompt treatment"
        subtitle="Apex Dental provides emergency appointments for dental pain, swelling, broken teeth, trauma, and lost restorations. Open Sunday 9am to 12pm for emergencies. Contact us by phone or WhatsApp."
      />
      <SplitEditorial
        imageLeft={images.contact.CT2}
        title="When should you contact us urgently?"
        text="Not every dental problem is an emergency, but some situations need to be assessed promptly to prevent complications, manage infection, or save a tooth. If you are in significant pain, have swelling, or have suffered dental trauma, contact Apex Dental without delay. When in doubt, it is always safer to call."
        points={['Severe or persistent toothache', 'Facial or gum swelling — possible infection or abscess', 'Knocked-out, broken, or cracked tooth', 'Lost crown, bridge, or filling causing pain']}
      />
      <ProcessSteps steps={emergencyTypes} dark />
      <SplitEditorial
        imageLeft={images.contact.CT3}
        title="What to do before you reach us"
        text="Take over-the-counter pain relief as directed. Apply a cold compress to the outside of the cheek for swelling. Avoid very hot, cold, hard, or chewy foods. If a tooth has been knocked out, keep it moist in milk or saliva and contact us immediately."
        points={['Pain relief: ibuprofen or paracetamol as directed', 'Cold compress to reduce external swelling', 'Keep a knocked-out tooth moist in milk', 'Temporary dental cement for a lost crown from pharmacy']}
        reverse
      />
      <FAQSection faqs={emergencyFaqs} />
      <CTASection dark title="Dental emergency in Malta? Contact us now." text="Call or WhatsApp Apex Dental directly. We are open Sunday 9am to 12pm for emergencies. Our team will assess your situation and arrange an appointment as quickly as possible." />
    </>
  );
}


function BlogPage() {
  usePageTitle('Dental Blog Malta | Apex Dental');

  const posts = [
    {
      title: 'How much do dental implants cost in Malta?',
      excerpt:
        'A clear guide to what influences implant costs, from planning and surgery to restorative stages and complexity.',
      category: 'Implants',
    },
    {
      title: 'What is the difference between veneers and whitening?',
      excerpt:
        'Two very different treatments with different goals. One changes colour, the other can change shape, symmetry, and overall smile design.',
      category: 'Cosmetic Dentistry',
    },
    {
      title: 'When is a dental problem an emergency?',
      excerpt:
        'A practical guide to pain, swelling, trauma, bleeding, and when it is worth contacting a dentist urgently.',
      category: 'Emergency Care',
    },
    {
      title: 'Are clear aligners suitable for adults?',
      excerpt:
        'Why more adults are choosing discreet orthodontic treatment and what to expect from the aligner process.',
      category: 'Aligners',
    },
    {
      title: 'Why regular hygiene appointments matter',
      excerpt:
        'Prevention is usually cheaper, easier, and less dramatic than repair. Your gums would like a word.',
      category: 'Preventive Dentistry',
    },
    {
      title: 'How do crowns protect damaged teeth?',
      excerpt:
        'A closer look at when crowns are used and how they help restore function and strength.',
      category: 'Restorative Dentistry',
    },
  ];

  return (
    <>
      <PageHero
        image={images.home.H5}
        eyebrow="Apex Dental Blog"
        title="Helpful dental articles designed to support treatment pages and answer real patient questions"
        subtitle="Use this section to publish educational, SEO-friendly articles that build trust and guide patients toward the right treatment pages."
      />

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {post.category}
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 leading-tight">
                  {post.title}
                </h2>
                <p className="mt-4 text-slate-600 leading-7">{post.excerpt}</p>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 mt-6 text-slate-900 font-semibold hover:text-slate-600"
                >
                  Read more <ChevronRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </Section>
      </section>

      <CTASection
        title="Want content that ranks and converts better?"
        text="Apex Dental’s blog should support your implants, aligners, cosmetic, and emergency pages with stronger educational content and internal linking."
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
          price: '€350.00',
          note: 'Usually a 90-minute session using branded products such as Beyond or Zoom.',
        },
      ],
    },
    {
      title: 'Crowns and Bridgework',
      items: [
        {
          name: 'Crowns, Metal/Porcelain',
          price: '€350.00',
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
        { name: 'Porcelain Veneers', price: '€450.00' },
        {
          name: 'Composite Veneers (Lab Wax-Up Replica)',
          price: '€130.00',
          note: 'Includes a lab-made wax-up.',
        },
        {
          name: 'Composite Veneers (Freehand)',
          price: '€90.00',
          note: 'Done with highly aesthetic composite.',
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
          price: '€90.00',
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
                  <div>Sunday: Closed</div>
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
        description="Contact Apex Dental Malta at Trident Park, Birkirkara. Call 27016017, WhatsApp 79854037 or fill in our contact form to book your appointment."
        canonical={`${siteUrl}/contact-us/`}
        schema={localBusinessSchema(`${siteUrl}/contact-us/`)}
      />
      <PageHero
        image={images.contact.CT1}
        eyebrow="Contact Apex Dental"
        title="Get in touch — we are based at Trident Park, Birkirkara, Malta"
        subtitle="Call, WhatsApp, or send a message below. We will get back to you quickly to confirm your appointment or answer any questions about your treatment."
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
                        Monday to Friday: 9:00 to 18:00<br />
                        Saturday: 9:00 to 13:00<br />
                        Sunday: 9:00 to 12:00 (emergency only)<br />
                        <span className="text-sm text-slate-500">For Sunday emergencies call or WhatsApp us directly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="Apex Dental Malta location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.5!2d14.4589!3d35.8956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e45249b414d63%3A0x5b9956b98cace3!2sTrident+Park!5e0!3m2!1sen!2smt!4v1"
                  width="100%"
                  height="260"
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
        'Advanced restorative solutions designed to replace missing teeth, rebuild damaged teeth, and restore function with stability and aesthetics in mind.',
      items: [
        {
          title: 'Dental Implants',
          to: '/dental-implants/',
          text: 'Single-tooth to advanced implant solutions for long-term replacement of missing teeth.',
          image: images.implants.I1,
        },
        {
          title: 'Crowns & Bridgework',
          to: '/crowns-and-bridgework/',
          text: 'Carefully planned restorations to rebuild damaged teeth and replace missing spaces.',
          image: images.home.H4,
        },
        {
          title: 'Dental Prosthetics',
          to: '/dental-prosthetics/',
          text: 'Restorative prosthetic options tailored for function, comfort, and daily usability.',
          image: images.home.H5,
        },
        {
          title: 'Removable Prosthesis',
          to: '/removable-prosthesis/',
          text: 'Practical removable tooth replacement solutions planned around support and fit.',
          image: images.home.H8,
        },
        {
          title: 'Root Canal Treatment',
          to: '/root-canal-treatment/',
          text: 'Treatment focused on relieving pain and helping preserve natural teeth where possible.',
          image: images.home.H6,
        },
      ],
    },
    {
      title: 'Cosmetic & Smile Enhancement',
      description:
        'Aesthetic treatments designed to improve colour, harmony, shape, and confidence while keeping results elegant and natural-looking.',
      items: [
        {
          title: 'Cosmetic Dentistry',
          to: '/cosmetic-dentistry-malta',
          text: 'Smile enhancement planned with attention to proportion, harmony, and refined results.',
          image: images.cosmetic.C1,
        },
        {
          title: 'Veneers',
          to: '/veneers/',
          text: 'Porcelain or composite veneer options for shape, symmetry, and aesthetic refinement.',
          image: images.cosmetic.C2,
        },
        {
          title: 'Teeth Whitening',
          to: '/teeth-whitening/',
          text: 'Professional whitening options for a brighter, cleaner, more confident smile.',
          image: images.cosmetic.C3,
        },
      ],
    },
    {
      title: 'Orthodontic & Alignment Treatments',
      description:
        'Tooth alignment and bite improvement options for patients looking for a straighter, more balanced smile.',
      items: [
        {
          title: 'Clear Aligners',
          to: '/invisalign-malta/',
          text: 'Discreet modern aligner treatment designed for comfort and adult-friendly lifestyles.',
          image: images.aligners.A1,
        },
        {
          title: 'Orthodontic Treatment',
          to: '/orthodontics/',
          text: 'Orthodontic care for spacing, crowding, bite improvement, and smile positioning.',
          image: images.aligners.A3,
        },
      ],
    },
    {
      title: 'Preventive & Gum Care',
      description:
        'Preventive dentistry helps protect long-term oral health and reduce the need for more complex treatment later on.',
      items: [
        {
          title: 'General Dentistry',
          to: '/general-dentistry/',
          text: 'Routine examinations, diagnosis, maintenance, and everyday dental care.',
          image: images.home.H5,
        },
        {
          title: 'Dental Hygiene',
          to: '/dental-hygiene/',
          text: 'Professional hygiene care to support gum health, fresh breath, and long-term maintenance.',
          image: images.home.H9,
        },
        {
          title: 'Periodontology',
          to: '/periodontology/',
          text: 'Gum-focused care supporting the health of the tissues around teeth and implants.',
          image: images.home.H10,
        },
      ],
    },
    {
      title: 'Urgent Dental Care',
      description:
        'Fast support for pain, swelling, trauma, and unexpected dental issues that need prompt attention.',
      items: [
        {
          title: 'Emergency Dentist',
          to: '/emergency-dental-service-malta/',
          text: 'Urgent assessment and guidance for dental pain, swelling, broken teeth, and trauma.',
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
        title="Comprehensive dental care in Malta, presented clearly and organised properly"
        subtitle="Explore Apex Dental's treatment range across implants, cosmetic dentistry, aligners, preventive care, restorative treatment, prosthetics, and emergency dental services."
      />

      <section className="bg-white py-20">
        <Section>
          <div className="max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Apex Dental Services
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
              A cleaner service structure for patients and a much smarter one for the website
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-8">
              This page acts as the main service hub for the clinic. It gives patients a clear
              overview of treatment options and helps search engines understand the relationship
              between your key treatment pages.
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
        text="Book a consultation with Apex Dental and we'll guide you toward the most suitable option based on your oral health, goals, and priorities."
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
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', title);
    ensureMeta('name', 'twitter:description', description);

    ensureLink('canonical', canonical);

    let schemaTag = document.head.querySelector('#seo-schema');
    if (schema) {
      if (!schemaTag) {
        schemaTag = document.createElement('script');
        schemaTag.type = 'application/ld+json';
        schemaTag.id = 'seo-schema';
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    } else if (schemaTag) {
      schemaTag.remove();
    }

    return () => {};
  }, [title, description, canonical, type, schema]);

  return null;
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
        <Route path="/invisalign-malta/" element={<AlignersPage />} />
        <Route path="/cosmetic-dentistry-malta" element={<CosmeticPage />} />
        <Route path="/general-dentistry/" element={<GeneralDentistryPage />} />
        <Route path="/dental-hygiene/" element={<HygienePage />} />
        <Route path="/veneers/" element={<VeneersPage />} />
        <Route path="/teeth-whitening/" element={<TeethWhiteningPage />} />
        <Route path="/crowns-and-bridgework/" element={<CrownsBridgeworkPage />} />
        <Route path="/periodontology/" element={<PeriodontologyPage />} />
        <Route path="/orthodontics/" element={<OrthodonticPage />} />
        <Route path="/dental-prosthetics/" element={<DentalProstheticsPage />} />
        <Route path="/removable-prosthesis/" element={<RemovableProsthesisPage />} />
        <Route path="/root-canal-treatment/" element={<RootCanalPage />} />
        <Route path="/emergency-dental-service-malta/" element={<EmergencyPage />} />
        <Route path="/price-list/" element={<PriceListPage />} />
        <Route path="/blog/" element={<BlogPage />} />
        <Route path="/appointment-booking/" element={<AppointmentBookingPage />} />
        <Route path="/services/" element={<ServicesPage />} />
        <Route path="/contact-us/" element={<ContactPage />} />
        <Route path="/google-ads-app" element={<GoogleAdsAppPage />} />
        <Route path="/google-ads-dashboard" element={<GoogleAdsDashboard />} />
        <Route path="/google-ads-campaign-creator" element={<GoogleAdsCampaignCreator />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />
      <WhatsAppFloat />
      <MobileStickyBar />
    </div>
  );
}