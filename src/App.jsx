import React, { useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Smile,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';

export default function ApexDentalWebsite() {
  const location = useLocation();

  const branding = {
    logo: '/images/orislogo.png',

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

    I1: '/images/I1.jpg',
    I2: '/images/I2.jpg',
    I3: '/images/I3.jpg',
    I4: '/images/I4.jpg',

    A1: '/images/A1.jpg',
    A2: '/images/A2.jpg',
    A3: '/images/A3.jpg',
    A4: '/images/A4.jpg',
    A5: '/images/A5.jpg',

    C1: '/images/C1.jpg',
    C2: '/images/C2.jpg',
    C3: '/images/C3.jpg',
    C4: '/images/C4.jpg',

    AB1: '/images/AB1.jpg',
    AB2: '/images/AB2.jpg',
    AB3: '/images/AB3.jpg',

    CT1: '/images/CT1.jpg',
    CT2: '/images/CT2.jpg',
    CT3: '/images/CT3.jpg',

    E1: '/images/E1.jpg',
    E2: '/images/E2.jpg',
  };

  const homeGalleryImages = [
    branding.H5,
    branding.H6,
    branding.H7,
    branding.H8,
    branding.H9,
    branding.H10,
  ];

  const pages = useMemo(
    () => ({
      '/': {
        title: 'Modern Dentistry in Malta',
        eyebrow: 'Apex Dental · Malta',
        subtitle:
          'Advanced implantology, cosmetic dentistry, and clear aligners delivered with precision, digital planning, and a patient-first experience.',
      },
      '/implants': {
        title: 'Dental Implants',
        eyebrow: 'Permanent tooth replacement',
        subtitle:
          'From single missing teeth to full-arch rehabilitation, we use digital workflows and premium components for stable, aesthetic long-term outcomes.',
      },
      '/aligners': {
        title: 'Clear Aligners',
        eyebrow: 'Discreet orthodontics',
        subtitle:
          'Straighten teeth with removable, comfortable aligners designed through 3D scans and a carefully planned digital setup.',
      },
      '/cosmetic': {
        title: 'Cosmetic Dentistry',
        eyebrow: 'Smile design with restraint',
        subtitle:
          'Veneers, whitening, bonding, and smile enhancement designed to look elegant and natural.',
      },
      '/about': {
        title: 'About Apex Dental',
        eyebrow: 'Specialist-led digital dentistry',
        subtitle:
          'A modern clinic in Malta focused on precision, comfort, premium materials, and transparent communication from consultation to follow-up.',
      },
      '/contact': {
        title: 'Contact & Book',
        eyebrow: 'Appointments and enquiries',
        subtitle:
          'Reach the clinic directly through WhatsApp or phone and arrange a consultation for implants, aligners, cosmetic dentistry, or a full dental assessment.',
      },
      '/emergency': {
        title: 'Dental Emergency',
        eyebrow: 'Urgent same-day care',
        subtitle:
          'Fast assessment and treatment for dental pain, swelling, trauma, broken teeth, lost crowns, infections, and other urgent dental problems.',
      },
    }),
    []
  );

  const navItems = [
    ['/', 'Home'],
    ['/implants', 'Implants'],
    ['/aligners', 'Aligners'],
    ['/cosmetic', 'Cosmetic'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
    ['/emergency', 'Emergency'],
  ];

  const services = [
    {
      title: 'Dental Implants',
      text: 'Single implants, implant bridges, and full-arch solutions using digitally planned workflows and guided surgery where appropriate.',
      path: '/implants',
    },
    {
      title: 'Clear Aligners',
      text: 'A discreet orthodontic option for adults and teens looking to improve alignment without fixed metal appliances.',
      path: '/aligners',
    },
    {
      title: 'Cosmetic Dentistry',
      text: 'Smile makeovers, veneers, whitening, and aesthetic treatments tailored to facial balance and natural appearance.',
      path: '/cosmetic',
    },
  ];

  const implantBenefits = [
    'Single-tooth implants for fixed replacement of missing teeth',
    'Implant bridges for multiple missing teeth',
    'Full-arch rehabilitation for advanced tooth loss',
    'Digitally guided planning using scans and imaging',
    'Temporary teeth possible in selected immediate cases',
  ];

  const alignerBenefits = [
    '3D digital scans instead of messy impressions',
    'Removable trays for easier oral hygiene',
    'Treatment planning tailored to your bite and smile goals',
    'Suitable for many mild to moderate orthodontic cases',
    'Clear review process with regular monitoring',
  ];

  const cosmeticBenefits = [
    'Porcelain veneers for shape, colour, and proportion improvement',
    'Composite bonding for minimally invasive refinement',
    'Professional whitening for brighter natural teeth',
    'Smile design guided by facial and dental proportions',
    'Focus on natural aesthetics and long-term maintainability',
  ];

  const whyUs = [
    'Digital workflows for better planning and communication',
    'Modern diagnostics and imaging for greater treatment precision',
    'Comfort-focused appointments in a premium clinical setting',
    'A clear explanation of options, costs, and treatment stages',
  ];

  function getHeroImage(path) {
    const imageMap = {
      '/implants': branding.I1,
      '/aligners': branding.A1,
      '/cosmetic': branding.C1,
      '/about': branding.AB1,
      '/contact': branding.CT1,
      '/emergency': branding.E1,
    };
    return imageMap[path] || branding.H1;
  }

  function getPageMeta(path) {
    return pages[path] || pages['/'];
  }

  function PageHero({ path }) {
    const meta = getPageMeta(path);
    return (
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_26%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_20%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(255,255,255,0.02))] blur-3xl lg:block" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-950/20">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium uppercase tracking-[0.24em] text-cyan-200">
                {meta.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.04]">
              {meta.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {meta.subtitle}
            </p>

            <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
              {([
                ['Digital Planning', 'CBCT, scans, and guided workflows'],
                ['Premium Care', 'Comfort-first modern dentistry'],
                ['Fast Booking', 'Direct WhatsApp contact'],
              ]).map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/35679854037"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                Book on WhatsApp
                <ChevronRight className="h-4 w-4" />
              </a>

              <Link
                to="/contact"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                Contact Clinic
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-3 rounded-[2rem] bg-cyan-300/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <img
                src={getHeroImage(path)}
                alt="Apex Dental clinic"
                className="h-[560px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                  Apex Dental Malta
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Modern care in a premium clinical environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function HomePage() {
    return (
      <>
        <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Featured Treatments
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Premium dentistry, presented clearly.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-7 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-cyan-950/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                    <Smile className="h-4 w-4" />
                  </div>
                </div>

                <p className="mt-4 leading-7 text-slate-300">{service.text}</p>

                <Link
                  to={service.path}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
                >
                  Learn more
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <img
                src={branding.H2}
                alt="Apex Dental feature image"
                className="h-[420px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="grid gap-6">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
                <img
                  src={branding.H3}
                  alt="Apex Dental feature image"
                  className="h-[198px] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
                <img
                  src={branding.H4}
                  alt="Apex Dental feature image"
                  className="h-[198px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Why patients choose us
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A clinic experience built properly from start to finish.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Good dentistry is not magic. It is careful diagnosis, good planning,
                skilled execution, and systems that make the patient feel informed
                instead of mildly haunted.
              </p>
            </div>

            <div className="grid gap-4">
              {whyUs.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-white/85 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Clinic Gallery
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A real clinic. A real environment.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homeGalleryImages.map((image, index) => (
              <div
                key={image + index}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm"
              >
                <img
                  src={image}
                  alt={`Apex Dental gallery ${index + 1}`}
                  className="h-[260px] w-full rounded-[1.5rem] object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Patient Journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              From first consultation to final result.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {([
              ['Consultation', 'A clear diagnosis and tailored treatment options.'],
              ['Digital Planning', 'Scans, photos, and imaging guide the workflow.'],
              ['Treatment', 'Delivered with precision, comfort, and modern materials.'],
              ['Follow-Up', 'Maintenance and review for long-term stability.'],
            ]).map(([title, text], idx) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-cyan-300">0{idx + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  function InfoPage({ title, intro, benefits, closing, image, secondaryImages = [] }) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={image}
            alt={title}
            className="h-[340px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        {secondaryImages.length > 0 && (
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {secondaryImages.map((img, idx) => (
              <div
                key={img + idx}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm"
              >
                <img
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  className="h-[220px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">{intro}</p>
            <p className="mt-6 leading-8 text-slate-400">{closing}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              What this page covers
            </p>

            <div className="mt-6 space-y-4">
              {benefits.map((item) => (
                <div key={item} className="flex gap-3 text-white/82">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="leading-7">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              Book a consultation
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function AboutPage() {
    return (
      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.AB1}
              alt="About Apex Dental"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.AB2}
              alt="About Apex Dental"
              className="h-[360px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A modern dental clinic in Malta focused on quality and clarity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Apex Dental is designed around contemporary dentistry: digital
              diagnostics, precise planning, premium materials, and a smoother
              patient experience from first consultation to final result.
            </p>
            <p className="mt-6 leading-8 text-slate-400">
              The clinic approach centres on clear communication, conservative
              judgment where possible, and high-level treatment planning where
              more advanced care is needed.
            </p>
          </div>

          <div className="grid gap-4">
            {([
              'Advanced digital planning and imaging',
              'Implant, cosmetic, and aligner-focused workflows',
              'Patient-friendly communication and treatment guidance',
              'Convenient location in Trident Park, Birkirkara',
            ]).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/85 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <ScanLine className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={branding.AB3}
            alt="About Apex Dental"
            className="h-[320px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>
    );
  }

  function ContactPage() {
    return (
      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={branding.CT1}
            alt="Contact Apex Dental"
            className="h-[320px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Book an appointment or ask a question.
            </h2>

            <div className="mt-8 space-y-5 text-slate-300">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Phone / WhatsApp
                </p>
                <p className="mt-1 flex items-center gap-2 text-lg text-white">
                  <Phone className="h-5 w-5 text-cyan-300" /> +356 7985 4037
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Location
                </p>
                <p className="mt-1 flex items-start gap-2 text-lg text-white">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                  Trident Park, Imriehel, Birkirkara BKR 4000, Malta
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Opening Hours
                </p>
                <p className="mt-1 text-lg text-white">Monday to Friday 9am–7pm</p>  
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <h3 className="text-2xl font-semibold">Contact form</h3>

            <div className="mt-6 grid gap-4">
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="Full name"
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="Phone or email"
              />
              <select className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-300/40">
                <option>Interested in</option>
                <option>Dental Implants</option>
                <option>Clear Aligners</option>
                <option>Cosmetic Dentistry</option>
                <option>General Consultation</option>
              </select>
              <textarea
                rows={5}
                className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="How can we help?"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">
                Request Appointment <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.CT2}
              alt="Apex Dental location"
              className="h-[240px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.CT3}
              alt="Apex Dental exterior"
              className="h-[240px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  function EmergencyPage() {
    const emergencyList = [
      'Severe toothache or throbbing pain',
      'Facial swelling or gum swelling',
      'Broken, cracked, or chipped tooth',
      'Knocked-out tooth after trauma',
      'Lost filling, crown, or bridge',
      'Bleeding after dental injury',
    ];

    const actionSteps = [
      'Call or WhatsApp the clinic immediately and explain the problem clearly.',
      'If there is swelling, fever, or spreading pain, seek help urgently the same day.',
      'For a knocked-out tooth, hold it by the crown, not the root, and keep it moist.',
      'Avoid chewing on the affected side until you are seen.',
    ];

    return (
      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.E1}
              alt="Dental emergency care"
              className="h-[360px] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl shadow-black/20 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Need urgent help?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Same-day emergency dental care when possible.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              If you have severe pain, swelling, trauma, a broken tooth, or a lost
              restoration, contact Apex Dental as soon as possible.
            </p>
            <a
              href="https://wa.me/35679854037"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              WhatsApp Emergency
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Common emergencies
            </p>
            <div className="mt-6 space-y-4">
              {emergencyList.map((item) => (
                <div key={item} className="flex gap-3 text-white/85">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="leading-7">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              What to do first
            </p>
            <div className="mt-6 space-y-5 text-slate-300">
              {actionSteps.map((item, idx) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-200">
                    {idx + 1}
                  </div>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              How we help
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              Fast assessment, pain relief, and a clear plan.
            </h3>
            <p className="mt-5 leading-8 text-slate-300">
              Emergency appointments focus on diagnosing the cause quickly and getting
              you comfortable. Depending on the problem, this may include x-rays,
              drainage of infection, temporary stabilisation, repair of a broken tooth,
              re-cementing a crown, or planning the next stage of care.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.E2}
              alt="Urgent dental appointment"
              className="h-[320px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_22%),linear-gradient(180deg,#2b2b2b_0%,#1f1f24_38%,#2b2b2b_100%)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2b2b2b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="group flex items-center gap-3 text-left">
            <img
              src={branding.logo}
              alt="Apex Dental logo"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-xl font-semibold tracking-[0.08em] text-white">
                Apex Dental
              </p>
              <p className="text-[11px] uppercase tracking-[0.38em] text-cyan-300/90">
                Digital Dentistry · Malta
              </p>
            </div>
          </Link>

          <nav className="hidden gap-5 text-sm md:flex">
            {navItems.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`transition ${
                  location.pathname === path ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="https://wa.me/35679854037"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4" />
            Book Now
          </a>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageHero path="/" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/implants"
          element={
            <>
              <PageHero path="/implants" />
              <InfoPage
                title="Dental Implants"
                image={branding.I1}
                secondaryImages={[branding.I2, branding.I3, branding.I4]}
                intro="Dental implants are a stable, aesthetic solution for replacing missing teeth."
                benefits={implantBenefits}
                closing="We use careful diagnosis, imaging, and planning to improve predictability and long-term outcomes."
              />
            </>
          }
        />
        <Route
          path="/aligners"
          element={
            <>
              <PageHero path="/aligners" />
              <InfoPage
                title="Clear Aligners"
                image={branding.A1}
                secondaryImages={[branding.A2, branding.A4, branding.A5]}
                intro="This page presents clear aligners as a modern and discreet route to straighter teeth."
                benefits={alignerBenefits}
                closing="Treatment is planned digitally and monitored carefully for predictable, comfortable progress."
              />
            </>
          }
        />
        <Route
          path="/cosmetic"
          element={
            <>
              <PageHero path="/cosmetic" />
              <InfoPage
                title="Cosmetic Dentistry"
                image={branding.C1}
                secondaryImages={[branding.C2, branding.C3, branding.C4]}
                intro="Cosmetic dentistry focuses on elegant, natural-looking smile enhancement."
                benefits={cosmeticBenefits}
                closing="Whitening, bonding, and veneers can be tailored to each patient with a premium, conservative approach."
              />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <PageHero path="/about" />
              <AboutPage />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageHero path="/contact" />
              <ContactPage />
            </>
          }
        />
        <Route
          path="/emergency"
          element={
            <>
              <PageHero path="/emergency" />
              <EmergencyPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageHero path="/" />
              <HomePage />
            </>
          }
        />
      </Routes>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.05))] p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Ready to take the next step?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Book a consultation with Apex Dental.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-200 leading-7">
                The site structure is now set up to convert better, explain services
                more clearly, and feel more premium than the old version.
              </p>
            </div>

            <a
              href="https://wa.me/35679854037"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              WhatsApp +356 7985 4037
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={branding.logo}
              alt="Apex Dental logo"
              className="h-10 w-auto object-contain"
            />
            <p>Apex Dental Malta</p>
          </div>
          <p>Implants · Aligners · Cosmetic Dentistry · Birkirkara</p>
        </div>
      </footer>
    </div>
  );
}
