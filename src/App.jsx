import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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

  const mainNav = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/price-list', label: 'Prices' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { to: '/dental-implants', label: 'Dental Implants' },
    { to: '/clear-aligners-malta', label: 'Clear Aligners' },
    { to: '/cosmetic-dentistry-malta', label: 'Cosmetic Dentistry' },
    { to: '/general-dentistry-malta', label: 'General Dentistry' },
    { to: '/dental-hygiene-malta', label: 'Dental Hygiene' },
    { to: '/veneers-malta', label: 'Veneers' },
    { to: '/teeth-whitening-malta', label: 'Teeth Whitening' },
    { to: '/crowns-and-bridgework-malta', label: 'Crowns & Bridgework' },
    { to: '/periodontology-malta', label: 'Periodontology' },
    { to: '/orthodontic-malta', label: 'Orthodontic Treatment' },
    { to: '/dental-prosthetics-malta', label: 'Dental Prosthetics' },
    { to: '/removable-prosthesis-malta', label: 'Removable Prosthesis' },
    { to: '/root-canal-treatment-malta', label: 'Root Canal Treatment' },
    { to: '/emergency-dentist-malta', label: 'Emergency Dentist' },
  ];

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
              {mainNav.slice(0, 2).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-slate-200 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="text-sm font-medium text-slate-200 hover:text-white transition inline-flex items-center gap-2"
                >
                  Services
                  <ChevronRight
                    size={16}
                    className={`transition ${servicesOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[820px] rounded-[2rem] border border-white/10 bg-slate-950/95 backdrop-blur-2xl p-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                      {serviceLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="text-sm text-slate-200 hover:text-white transition py-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {mainNav.slice(2).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-slate-200 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
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
              <Link to="/" onClick={() => setOpen(false)} className="text-slate-200 hover:text-white">
                Home
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="text-slate-200 hover:text-white">
                About
              </Link>

              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="text-left text-slate-200 hover:text-white flex items-center justify-between"
              >
                <span>Services</span>
                <ChevronRight
                  size={18}
                  className={`transition ${mobileServicesOpen ? 'rotate-90' : ''}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-3 border-l border-white/10">
                  {serviceLinks.map((item) => (
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
              )}

              <Link to="/price-list" onClick={() => setOpen(false)} className="text-slate-200 hover:text-white">
                Prices
              </Link>
              <Link to="/blog" onClick={() => setOpen(false)} className="text-slate-200 hover:text-white">
                Blog
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="text-slate-200 hover:text-white">
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
          to="/contact"
          className="flex flex-col items-center justify-center py-3 text-slate-900 font-semibold"
        >
          <ChevronRight size={18} />
          <span className="text-xs mt-1">Book</span>
        </Link>
      </div>
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
              <Button to="/contact" variant="gold">
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
                Replace this with a real Google review to add instant trust and
                make the hero feel authentic.
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
      to: '/dental-implants',
    },
    {
      title: 'Clear Aligners',
      text: 'Discreet orthodontic treatment designed around modern lifestyles.',
      image: images.aligners.A1,
      to: '/clear-aligners-malta',
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
            to="/contact"
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
  return (
    <section className="bg-slate-950 text-white py-20">
      <Section>
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">
                Patient Reviews
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Real trust is better than decorative fluff
              </h2>
              <p className="mt-6 text-slate-300 leading-8 text-lg">
                Replace these placeholders with three real Google reviews. Real
                local feedback will improve both trust and conversion.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] bg-white text-slate-900 p-6 shadow-xl"
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Add a real Google review here. Patients trust actual
                    experiences far more than generic stock praise.
                  </p>
                  <div className="mt-4 font-semibold text-slate-900">
                    Google Review
                  </div>
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
              <Button to="/contact" variant={dark ? 'gold' : 'dark'}>
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
        </div>

        <div>
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <div className="mt-4 flex flex-col gap-3 text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dental-implants">Dental Implants</Link>
            <Link to="/clear-aligners-malta">Clear Aligners</Link>
            <Link to="/cosmetic-dentistry-malta">Cosmetic Dentistry</Link>
            <Link to="/general-dentistry-malta">General Dentistry</Link>
            <Link to="/dental-hygiene-malta">Dental Hygiene</Link>
            <Link to="/veneers-malta">Veneers</Link>
            <Link to="/teeth-whitening-malta">Teeth Whitening</Link>
            <Link to="/crowns-and-bridgework-malta">Crowns & Bridgework</Link>
            <Link to="/periodontology-malta">Periodontology</Link>
            <Link to="/orthodontic-malta">Orthodontic Treatment</Link>
            <Link to="/dental-prosthetics-malta">Dental Prosthetics</Link>
            <Link to="/removable-prosthesis-malta">Removable Prosthesis</Link>
            <Link to="/root-canal-treatment-malta">Root Canal Treatment</Link>
            <Link to="/emergency-dentist-malta">Emergency Dentist</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/appointment-booking">Appointment Booking</Link>
            <Link to="/price-list">Price List</Link>
            <Link to="/contact">Contact</Link>
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

  return (
    <>
      <PageHero
        image={images.implants.I1}
        eyebrow="Dental Implants Malta"
        title="Premium dental implant care with precision, stability, and aesthetics in mind"
        subtitle="Apex Dental provides carefully planned implant treatment for patients looking to restore missing teeth with a functional, long-term, and natural-looking solution."
      />

      <SplitEditorial
        imageLeft={images.implants.I2}
        title="A modern solution for missing teeth"
        text="Dental implants are designed to replace missing tooth roots and support crowns, bridges, or fixed restorations. They can help restore function, confidence, stability, and smile aesthetics in a predictable and refined way."
        points={[
          'Single-tooth replacement',
          'Multiple missing teeth solutions',
          'Advanced restorative planning',
          'Long-term functional and aesthetic goals',
        ]}
      />

      <SplitEditorial
        imageLeft={images.implants.I3}
        title="Precision planning matters"
        text="Successful implant treatment is not only about placing an implant. It is about diagnosis, planning, restorative design, soft tissue aesthetics, long-term maintenance, and creating a stable result that feels natural in function and appearance."
        points={[
          'Detailed assessment before treatment',
          'Careful restorative planning',
          'Focus on both function and aesthetics',
          'Patient guidance throughout each phase',
        ]}
        dark
        reverse
      />

      <SplitEditorial
        imageLeft={images.implants.I4}
        title="A more premium implant experience"
        text="At Apex Dental, implant care is approached with attention to detail, modern workflows, and a commitment to quality outcomes. Whether replacing one tooth or planning a more advanced case, our goal is to provide treatment that is precise, clear, and carefully executed."
        points={[
          'High-quality restorative focus',
          'Modern implant workflow',
          'Natural-looking final outcomes',
          'Premium patient experience',
        ]}
      />

      <CTASection
        dark
        title="Thinking about dental implants?"
        text="Book an implant consultation to discuss suitability, treatment options, and the most appropriate plan for your case."
      />
    </>
  );
}

function AlignersPage() {
  usePageTitle('Clear Aligners Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.aligners.A1}
        eyebrow="Clear Aligners Malta"
        title="Discreet orthodontic treatment for patients who want straight teeth without the obvious hardware"
        subtitle="Clear aligners offer a modern way to improve tooth alignment with comfort, discretion, and a treatment approach better suited to adult lifestyles."
      />

      <SplitEditorial
        imageLeft={images.aligners.A2}
        title="Digitally guided smile improvement"
        text="Clear aligner treatment begins with careful assessment and planning. Digital workflows help evaluate alignment concerns and build a treatment journey that is more visual, precise, and convenient for the patient."
        points={[
          'Modern digital planning',
          'Discreet treatment option',
          'Comfort-focused approach',
          'Suitable for image-conscious patients',
        ]}
      />

      <SplitEditorial
        imageLeft={images.aligners.A3}
        title="Designed around your life"
        text="Patients often choose aligners because they are removable, discreet, and easier to integrate into work, social life, eating, and oral hygiene. The treatment aims to improve the smile while remaining as low-profile as possible."
        points={[
          'Removable for meals and cleaning',
          'More discreet than fixed braces',
          'Popular with adults and professionals',
          'Planned for practical everyday use',
        ]}
        dark
        reverse
      />

      <SplitEditorial
        imageLeft={images.aligners.A4}
        title="A confident, modern orthodontic experience"
        text="At Apex Dental, aligner treatment is presented as a premium orthodontic option supported by clear communication, digital planning, and close follow-up. It is not just about moving teeth. It is about improving the smile in a way that feels practical, elegant, and well-managed."
        points={[
          'Patient-friendly treatment process',
          'Aesthetic and functional planning',
          'Contemporary smile enhancement',
          'Premium consultation experience',
        ]}
      />

      <CTASection
        title="Interested in clear aligners?"
        text="Book a consultation to find out whether aligners are suitable for your smile, lifestyle, and treatment goals."
      />
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
  usePageTitle('About Apex Dental Malta');

  return (
    <>
      <PageHero
        image={images.about.AB1}
        eyebrow="About Apex Dental"
        title="A modern dental clinic in Malta built around quality, precision, and patient confidence"
        subtitle="Apex Dental combines professional care, modern technology, and a welcoming clinic atmosphere to create a better patient experience from the moment you walk in."
      />

      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
              <img
                src={images.about.AB1}
                alt="Apex Dental team or clinic image"
                className="w-full h-[520px] object-cover"
              />
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
              <img
                src={images.about.AB2}
                alt="Apex Dental interior image"
                className="w-full h-[520px] object-cover"
              />
            </div>
          </div>
        </Section>
      </section>

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="max-w-4xl">
            <TextPanel
              title="A clinic experience that feels reassuring and refined"
              text="Great dental care is about more than technical treatment alone. It is also about clarity, trust, comfort, and how the entire experience feels to the patient. Apex Dental is designed to provide high-quality care in an environment that feels calm, modern, and professional."
            />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Professionalism',
                text: 'A high standard of communication, planning, and patient support.',
              },
              {
                title: 'Modern Approach',
                text: 'Digital workflows and up-to-date treatment presentation.',
              },
              {
                title: 'Patient Trust',
                text: 'Clear guidance, transparency, and careful attention to comfort.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">
                Apex Dental
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Built for patients who value quality care and a better overall experience
              </h2>
              <p className="mt-6 text-slate-300 text-lg leading-8">
                Use this page to add your team details, doctor bios,
                qualifications, and a stronger explanation of your clinical
                philosophy. It already has the premium layout. Now it just needs
                your story.
              </p>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
              <img
                src={images.about.AB3}
                alt="Apex Dental clinic detail"
                className="w-full h-[520px] object-cover"
              />
            </div>
          </div>
        </Section>
      </section>

      <CTASection
        title="Would you like to visit Apex Dental?"
        text="Contact us to arrange an appointment, discuss treatment options, or ask about emergency availability."
      />
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
  usePageTitle('Veneers Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.cosmetic.C1}
        eyebrow="Veneers Malta"
        title="Smile enhancement with veneers designed for elegance, balance, and natural-looking results"
        subtitle="Veneers can help improve colour, shape, symmetry, and overall smile harmony for patients seeking a more refined aesthetic result."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C2}
        title="A premium cosmetic option"
        text="Veneers are thin aesthetic restorations placed on the front surfaces of teeth to improve their appearance. They can be used to enhance shape, colour, proportion, and smile consistency."
        points={[
          'Porcelain and composite options',
          'Smile refinement and symmetry',
          'Natural-looking enhancement',
          'Careful cosmetic planning',
        ]}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="Cosmetic results should look polished, not artificial"
        text="At Apex Dental, cosmetic treatment is planned to feel elegant and believable. Good veneers improve the smile without making it look overdone."
        points={[
          'Balanced smile design',
          'Attention to facial harmony',
          'Refined cosmetic workflow',
          'Premium consultation process',
        ]}
        dark
        reverse
      />
      <CTASection
        dark
        title="Thinking about veneers?"
        text="Book a cosmetic consultation to discuss whether veneers are the right fit for your smile goals."
      />
    </>
  );
}

function TeethWhiteningPage() {
  usePageTitle('Teeth Whitening Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.cosmetic.C2}
        eyebrow="Teeth Whitening Malta"
        title="Professional whitening options for a brighter, cleaner, more confident smile"
        subtitle="Apex Dental offers whitening solutions designed to improve tooth colour in a safer and more controlled way than over-the-counter shortcuts."
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C3}
        title="Home kits and in-clinic whitening"
        text="Professional teeth whitening may include custom home trays or an in-house whitening session depending on the patient’s needs, goals, and suitability."
        points={[
          'Custom tray home whitening',
          'In-clinic whitening sessions',
          'Professional supervision',
          'More predictable aesthetic improvement',
        ]}
      />
      <SplitEditorial
        imageLeft={images.cosmetic.C4}
        title="A cosmetic boost with minimal disruption"
        text="Whitening is often one of the simplest ways to freshen a smile and improve confidence, whether used on its own or before other cosmetic treatment."
        points={[
          'Popular aesthetic treatment',
          'Useful before smile makeovers',
          'Designed for cleaner brighter colour',
          'Quick confidence upgrade',
        ]}
        dark
        reverse
      />
      <CTASection
        title="Interested in professional whitening?"
        text="Book a consultation and Apex Dental can guide you toward the most suitable whitening option."
      />
    </>
  );
}

function CrownsBridgeworkPage() {
  usePageTitle('Crowns and Bridgework Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.home.H4}
        eyebrow="Crowns and Bridgework Malta"
        title="Restorative dentistry designed to rebuild strength, function, and aesthetics"
        subtitle="Crowns and bridges can help protect weakened teeth, restore damaged structures, and replace missing teeth in a stable and aesthetic way."
      />
      <SplitEditorial
        imageLeft={images.home.H3}
        title="Restoring teeth properly matters"
        text="Crowns are used to cover and protect teeth that are weakened, heavily restored, or structurally compromised. Bridges help replace missing teeth and restore continuity to the smile."
        points={[
          'Protection for compromised teeth',
          'Replacement for missing teeth',
          'Improved chewing function',
          'Better structural stability',
        ]}
      />
      <SplitEditorial
        imageLeft={images.home.H2}
        title="Built for fit, bite, and longevity"
        text="A strong restorative result depends on diagnosis, fit, bite planning, materials, and overall balance. The goal is not just to fill space, but to restore confidence and function properly."
        points={[
          'Functional bite planning',
          'Natural-looking restorations',
          'Material choice matched to the case',
          'Careful restorative workflow',
        ]}
        dark
        reverse
      />
      <CTASection
        dark
        title="Need a crown or bridge?"
        text="Book a consultation to discuss the most suitable restorative option for your tooth or missing space."
      />
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

  return (
    <>
      <PageHero
        image={images.home.H6}
        eyebrow="Root Canal Treatment Malta"
        title="Endodontic treatment focused on relieving pain and helping save natural teeth"
        subtitle="Root canal treatment may be needed when the nerve inside a tooth becomes inflamed or infected. The goal is to treat the problem, reduce discomfort, and preserve the tooth where possible."
      />

      <SplitEditorial
        imageLeft={images.home.H7}
        title="When is root canal treatment needed?"
        text="Root canal treatment may be recommended when a tooth has deep decay, infection, trauma, or persistent pain related to the pulp tissue inside the tooth. Symptoms may include prolonged sensitivity, pain on biting, swelling, or spontaneous toothache."
        points={[
          'Tooth pain or sensitivity',
          'Deep decay or infection',
          'Swelling or inflammation',
          'An option to help save the natural tooth',
        ]}
      />

      <SplitEditorial
        imageLeft={images.home.H8}
        title="A treatment patients often fear more than they should"
        text="Root canal treatment has a dramatic reputation, mostly because teeth have good publicists and bad behaviour. In reality, modern endodontic treatment is designed to manage infection and discomfort carefully while preserving the tooth when possible."
        points={[
          'Focus on removing infection',
          'Designed to preserve the tooth',
          'Modern treatment approach',
          'Clear explanation throughout the process',
        ]}
        dark
        reverse
      />

      <CTASection
        title="Worried you may need root canal treatment?"
        text="Book an assessment at Apex Dental so we can examine the tooth, explain the problem clearly, and guide you through the most suitable next step."
      />
    </>
  );
}

function EmergencyPage() {
  usePageTitle('Emergency Dentist Malta | Apex Dental');

  return (
    <>
      <PageHero
        image={images.contact.CT1}
        eyebrow="Emergency Dentist Malta"
        title="Urgent dental care when you need fast help, not a philosophical lecture from your tooth"
        subtitle="Apex Dental provides urgent assessment for dental pain, swelling, broken teeth, trauma, lost restorations, and other unexpected dental problems."
      />

      <SplitEditorial
        imageLeft={images.contact.CT2}
        title="When should you seek emergency dental care?"
        text="You may need urgent dental treatment if you are experiencing severe toothache, swelling, facial pain, trauma, bleeding, a broken tooth, or a lost filling, crown, or bridge causing pain or functional difficulty."
        points={[
          'Severe tooth pain',
          'Swelling or infection',
          'Broken or knocked teeth',
          'Lost crowns, bridges, or fillings',
        ]}
      />

      <SplitEditorial
        imageLeft={images.contact.CT3}
        title="Fast guidance and prompt assessment"
        text="If you are unsure whether your problem is an emergency, the safest step is to contact Apex Dental directly. Early assessment can reduce complications, improve comfort, and sometimes save a tooth that would otherwise worsen."
        points={[
          'Prompt communication matters',
          'Fast assessment can reduce complications',
          'Clear next-step guidance',
          'Support for urgent dental situations',
        ]}
        dark
        reverse
      />

      <CTASection
        dark
        title="Need urgent dental care now?"
        text="Call or WhatsApp Apex Dental directly so our team can guide you as quickly as possible."
      />
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
                  to="/contact"
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

            <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
              <h2 className="text-3xl font-semibold">Request an Appointment</h2>
              <p className="mt-4 text-slate-300 leading-7">
                Styled to convert better, but still needs your form backend or
                email integration.
              </p>

              <form className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <input
                  type="date"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-amber-300"
                />
                <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-amber-300">
                  <option className="text-slate-900">Select Service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} className="text-slate-900">
                      {service}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="rounded-full bg-amber-400 text-slate-950 px-6 py-3.5 font-semibold hover:bg-amber-300 transition"
                >
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}

function ContactPage() {
  usePageTitle('Contact Apex Dental Malta');

  return (
    <>
      <PageHero
        image={images.contact.CT1}
        eyebrow="Contact Apex Dental"
        title="Book your visit at Apex Dental Malta"
        subtitle="Get in touch for routine care, cosmetic treatment, clear aligners, implant consultations, or urgent dental care."
      />

      <section className="bg-white py-20">
        <Section>
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
            <div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <img
                  src={images.contact.CT2}
                  alt="Apex Dental location or reception"
                  className="w-full h-[520px] object-cover"
                />
              </div>

              <div className="mt-8 rounded-[2rem] bg-[#f7f4ef] border border-slate-200 p-8">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Contact Details
                </h2>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">Address</div>
                      <div className="text-slate-600 mt-1">{brand.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">Phone</div>
                      <a
                        href={`tel:${brand.phone}`}
                        className="text-slate-600 mt-1 block hover:text-sky-700"
                      >
                        {brand.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle
                      className="text-sky-600 mt-1 shrink-0"
                      size={20}
                    />
                    <div>
                      <div className="font-medium text-slate-900">WhatsApp</div>
                      <a
                        href={`https://wa.me/356${brand.whatsapp}`}
                        className="text-slate-600 mt-1 block hover:text-sky-700"
                      >
                        {brand.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="text-sky-600 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium text-slate-900">
                        Appointments
                      </div>
                      <div className="text-slate-600 mt-1">
                        Contact us for available times and emergency guidance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
              <h2 className="text-3xl font-semibold">Appointment Request</h2>
              <p className="mt-4 text-slate-300 leading-7">
                This form is styled and ready, but you still need to connect it
                to your backend or email handler.
              </p>

              <form className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-amber-300">
                  <option className="text-slate-900">Reason for Visit</option>
                  <option className="text-slate-900">General Check-up</option>
                  <option className="text-slate-900">Dental Implants</option>
                  <option className="text-slate-900">Clear Aligners</option>
                  <option className="text-slate-900">Cosmetic Dentistry</option>
                  <option className="text-slate-900">Emergency Appointment</option>
                </select>
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="rounded-full bg-amber-400 text-slate-950 px-6 py-3.5 font-semibold hover:bg-amber-300 transition"
                >
                  Send Request
                </button>
              </form>

              <div className="mt-8 text-sm text-slate-400">
                Prefer speaking to us directly? Call{' '}
                <a href={`tel:${brand.phone}`} className="text-white">
                  {brand.phone}
                </a>{' '}
                or WhatsApp{' '}
                <a
                  href={`https://wa.me/356${brand.whatsapp}`}
                  className="text-white"
                >
                  {brand.mobile}
                </a>
                .
              </div>
            </div>
          </div>
        </Section>
      </section>

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
            <img
              src={images.contact.CT3}
              alt="Apex Dental exterior or entrance"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </Section>
      </section>
    </>
  );
}

export default function ApexDentalWebsitePremium() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16 lg:pb-0">
      <ScrollToTop />
      <FloatingHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dental-implants" element={<ImplantsPage />} />
        <Route path="/clear-aligners-malta" element={<AlignersPage />} />
        <Route path="/cosmetic-dentistry-malta" element={<CosmeticPage />} />
        <Route path="/general-dentistry-malta" element={<GeneralDentistryPage />} />
        <Route path="/dental-hygiene-malta" element={<HygienePage />} />
        <Route path="/veneers-malta" element={<VeneersPage />} />
        <Route path="/teeth-whitening-malta" element={<TeethWhiteningPage />} />
        <Route
          path="/crowns-and-bridgework-malta"
          element={<CrownsBridgeworkPage />}
        />
        <Route path="/periodontology-malta" element={<PeriodontologyPage />} />
        <Route path="/orthodontic-malta" element={<OrthodonticPage />} />
        <Route
          path="/dental-prosthetics-malta"
          element={<DentalProstheticsPage />}
        />
        <Route
          path="/removable-prosthesis-malta"
          element={<RemovableProsthesisPage />}
        />
        <Route path="/root-canal-treatment-malta" element={<RootCanalPage />} />
        <Route path="/emergency-dentist-malta" element={<EmergencyPage />} />
        <Route path="/price-list" element={<PriceListPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/appointment-booking"
          element={<AppointmentBookingPage />}
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
