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
  Smile,
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
  address: 'Trident Park, Imdina Road, Central Business District, Imrieħel, CBD 2010, Malta',
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

function Button({ to, children, variant = 'dark', external = false, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300';

  const variants = {
    dark: 'bg-slate-950 text-white hover:bg-slate-800',
    light: 'bg-white text-slate-900 hover:bg-slate-100',
    outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100',
    glass: 'border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15',
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

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dental-implants', label: 'Implants' },
    { to: '/clear-aligners-malta', label: 'Aligners' },
    { to: '/cosmetic-dentistry-malta', label: 'Cosmetic' },
    { to: '/price-list', label: 'Prices' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-2xl text-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <img src={brand.logo} alt="Apex Dental logo" className="h-11 w-auto shrink-0" />
              <div className="hidden md:block min-w-0">
                <div className="font-semibold tracking-wide">{brand.name}</div>
                <div className="text-xs text-slate-300">{brand.tagline}</div>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-7">
              {nav.map((item) => (
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
              <Button to="/contact" variant="gold">
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
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-slate-200 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a href={`tel:${brand.phone}`} className="text-slate-300">
                  Call {brand.phone}
                </a>
                <Button to="/contact" variant="gold">
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
        alt={title}
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
              <Button to={`https://wa.me/356${brand.whatsapp}`} variant="glass" external>
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
              <img src={image} alt={title} className="w-full h-[560px] object-cover" />
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
                Replace this with a real Google review to add instant trust and make the hero feel authentic.
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
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="relative">
            <div className={`rounded-[2.5rem] overflow-hidden ${dark ? 'border border-white/10' : 'border border-slate-200'} shadow-xl`}>
              <img src={imageLeft} alt={title} className="w-full h-[520px] object-cover" />
            </div>
          </div>

          <div>
            <div className={`text-sm uppercase tracking-[0.25em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Apex Dental
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              {title}
            </h2>
            <p className={`mt-6 text-lg leading-8 ${textClass}`}>
              {text}
            </p>

            {points.length > 0 && (
              <div className="mt-8 grid gap-4">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <BadgeCheck className={dark ? 'text-amber-300 mt-1 shrink-0' : 'text-sky-600 mt-1 shrink-0'} size={20} />
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
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Signature Treatments</div>
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
                <div className="text-sm uppercase tracking-[0.25em] text-slate-300">Apex Dental</div>
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
  return (
    <section className="bg-[#f7f4ef]">
      <Section className="py-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
            <img src={images.home.H2} alt="Apex Dental clinic interior" className="w-full h-[560px] object-cover" />
          </div>

          <div className="grid gap-8">
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img src={images.home.H3} alt="Apex Dental logo detail" className="w-full h-[265px] object-cover" />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img src={images.home.H4} alt="Apex Dental reception or team desk" className="w-full h-[265px] object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <ScanLine size={20} />,
              title: 'Digital Workflows',
              text: 'Modern diagnostics and planning designed for precision and predictability.',
            },
            {
              icon: <HeartHandshake size={20} />,
              title: 'Patient Comfort',
              text: 'A calm, welcoming environment with careful attention to communication and reassurance.',
            },
            {
              icon: <Sparkles size={20} />,
              title: 'Premium Results',
              text: 'Functional and aesthetic dentistry designed to look polished, natural, and refined.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm">
              <div className="inline-flex items-center justify-center rounded-full bg-slate-950 text-white h-11 w-11">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
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
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Clinic Gallery</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-slate-900">
              A practice that looks as polished as the care it provides
            </h2>
          </div>
          <p className="max-w-xl text-slate-600 leading-8 text-lg">
            Use this section to showcase the clinic, treatment rooms, scanner, reception, and key branded details.
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
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Patient Reviews</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Real trust is better than decorative fluff
              </h2>
              <p className="mt-6 text-slate-300 leading-8 text-lg">
                Replace these placeholders with three real Google reviews. Real local feedback will improve both trust and conversion.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-[2rem] bg-white text-slate-900 p-6 shadow-xl">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Add a real Google review here. Patients trust actual experiences far more than generic stock praise.
                  </p>
                  <div className="mt-4 font-semibold text-slate-900">Google Review</div>
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
    <section className={dark ? 'bg-slate-950 text-white py-20' : 'bg-[#f7f4ef] text-slate-900 py-20'}>
      <Section>
        <div className={`rounded-[2.5rem] p-8 md:p-12 ${dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight">{title}</h2>
              <p className={`mt-5 text-lg leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                {text}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact" variant={dark ? 'gold' : 'dark'}>
                Book Appointment
              </Button>
              <Button to={`tel:${brand.phone}`} variant={dark ? 'glass' : 'outline'} external>
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
            Premium dental care in Malta with a focus on advanced restorative treatment, clear aligners,
            cosmetic dentistry, and a modern patient experience.
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
              <a href={`https://wa.me/356${brand.whatsapp}`} className="hover:text-white">
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
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-35" />
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
      <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight">{title}</h2>
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
              <img src={images.about.AB1} alt="Apex Dental team or clinic image" className="w-full h-[520px] object-cover" />
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
              <img src={images.about.AB2} alt="Apex Dental interior image" className="w-full h-[520px] object-cover" />
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
              <div key={item.title} className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
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
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">Apex Dental</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                Built for patients who value quality care and a better overall experience
              </h2>
              <p className="mt-6 text-slate-300 text-lg leading-8">
                Use this page to add your team details, doctor bios, qualifications, and a stronger explanation of your clinical philosophy. It already has the premium layout. Now it just needs your story.
              </p>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl">
              <img src={images.about.AB3} alt="Apex Dental clinic detail" className="w-full h-[520px] object-cover" />
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

function PriceListPage() {
  usePageTitle('Price List | Apex Dental Malta');

  const prices = [
    ['Routine Check-up', 'From €20'],
    ['Panoramic X-Ray', 'From €25'],
    ['Dental Hygiene', 'From €45'],
    ['Implant Consultation', 'From €50'],
    ['CBCT Scan', 'From €75'],
    ['Teeth Whitening', 'From €180'],
    ['Emergency Assessment', 'Contact us'],
  ];

  return (
    <>
      <PageHero
        image={images.contact.CT1}
        eyebrow="Price List"
        title="Transparent pricing presented in a cleaner, more premium format"
        subtitle="Below are example starting prices for selected treatments. Final fees may vary depending on complexity, materials, and treatment requirements."
      />

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="max-w-4xl rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-xl">
            {prices.map(([item, price], index) => (
              <div
                key={item}
                className={`grid grid-cols-2 gap-4 p-6 md:p-7 ${index !== prices.length - 1 ? 'border-b border-slate-200' : ''}`}
              >
                <div className="font-medium text-slate-800">{item}</div>
                <div className="text-right font-semibold text-slate-900">{price}</div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <CTASection
        title="Need a personalised treatment estimate?"
        text="Book a consultation so we can assess your case properly and guide you through the most suitable treatment options."
      />
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
                <img src={images.contact.CT2} alt="Apex Dental location or reception" className="w-full h-[520px] object-cover" />
              </div>

              <div className="mt-8 rounded-[2rem] bg-[#f7f4ef] border border-slate-200 p-8">
                <h2 className="text-2xl font-semibold text-slate-900">Contact Details</h2>
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
                      <a href={`tel:${brand.phone}`} className="text-slate-600 mt-1 block hover:text-sky-700">
                        {brand.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-sky-600 mt-1 shrink-0" size={20} />
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
                      <div className="font-medium text-slate-900">Appointments</div>
                      <div className="text-slate-600 mt-1">Contact us for available times and emergency guidance.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-slate-950 text-white p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
              <h2 className="text-3xl font-semibold">Appointment Request</h2>
              <p className="mt-4 text-slate-300 leading-7">
                This form is styled and ready, but you still need to connect it to your backend or email handler.
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
            </div>
          </div>
        </Section>
      </section>

      <section className="bg-[#f7f4ef] py-20">
        <Section>
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
            <img src={images.contact.CT3} alt="Apex Dental exterior or entrance" className="w-full h-[480px] object-cover" />
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
        <Route path="/price-list" element={<PriceListPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
