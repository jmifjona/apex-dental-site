import React, { useMemo, useEffect } from 'react';
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

function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function ApexDentalWebsite() {
  const location = useLocation();

  const branding = {
    logo: '/images/orislogo.png',
    straumann: '/images/straumann.jpg',

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
        title: 'Get Your Dream Smile with Advanced Dental Care in Malta',
        eyebrow: 'Apex Dental · Malta',
        subtitle:
          'Dental implants, clear aligners, cosmetic dentistry, and emergency care delivered with precision, digital planning, and a patient-first experience.',
      },
      '/dental-implants-malta': {
        title: 'Dental Implants',
        eyebrow: 'Permanent tooth replacement',
        subtitle:
          'From single missing teeth to full-arch rehabilitation, we use digital workflows and premium components for stable, aesthetic long-term outcomes.',
      },
      '/clear-aligners-malta': {
        title: 'Clear Aligners',
        eyebrow: 'Discreet orthodontics',
        subtitle:
          'Straighten teeth with removable, comfortable aligners designed through 3D scans and a carefully planned digital setup.',
      },
      '/cosmetic-dentistry-malta': {
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
      '/emergency-dentist-malta': {
        title: 'Dental Emergency',
        eyebrow: 'Urgent same-day care',
        subtitle:
          'Fast assessment and treatment for dental pain, swelling, trauma, broken teeth, lost crowns, infections, and other urgent dental problems.',
      },
      '/price-list': {
        title: 'Dental Price List Malta',
        eyebrow: 'Transparent pricing',
        subtitle:
          'A clear overview of current treatment fees at Apex Dental Malta.',
      },
    }),
    []
  );

  const navItems = [
    ['/', 'Home'],
    ['/dental-implants-malta', 'Implants'],
    ['/clear-aligners-malta', 'Aligners'],
    ['/cosmetic-dentistry-malta', 'Cosmetic'],
    ['/emergency-dentist-malta', 'Emergency'],
    ['/price-list', 'Price List'],
    ['/contact', 'Contact'],
  ];

  const services = [
    {
      title: 'Dental Implants',
      text: 'Single implants, implant bridges, and full-arch solutions using digitally planned workflows and guided surgery where appropriate.',
      path: '/dental-implants-malta',
    },
    {
      title: 'Clear Aligners',
      text: 'A discreet orthodontic option for adults and teens looking to improve alignment without fixed metal appliances.',
      path: '/clear-aligners-malta',
    },
    {
      title: 'Cosmetic Dentistry',
      text: 'Smile makeovers, veneers, whitening, and aesthetic treatments tailored to facial balance and natural appearance.',
      path: '/cosmetic-dentistry-malta',
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
      '/dental-implants-malta': branding.I1,
      '/clear-aligners-malta': branding.A1,
      '/cosmetic-dentistry-malta': branding.C1,
      '/about': branding.AB1,
      '/contact': branding.CT1,
      '/emergency-dentist-malta': branding.E1,
      '/price-list': branding.CT1,
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_20%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(255,255,255,0.02))] blur-3xl lg:block" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100 shadow-lg shadow-cyan-950/20 md:px-4 md:text-sm">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium uppercase tracking-[0.2em] text-cyan-200 md:tracking-[0.24em]">
                {meta.eyebrow}
              </span>
            </div>

            <h1 className="mt-5 max-w-5xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.04]">
              {meta.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              {meta.subtitle}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['Digital Planning', 'CBCT, scans, and guided workflows'],
                ['Premium Care', 'Comfort-first modern dentistry'],
                ['Fast Booking', 'Direct WhatsApp contact'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://wa.me/35679854037"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                Book on WhatsApp
                <ChevronRight className="h-4 w-4" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white/90 transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                Contact Clinic
              </Link>
            </div>

            <div className="mt-5 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-lg text-yellow-400">★★★★★</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                “A very professional and friendly clinic. Everything was explained clearly and the treatment was completely painless.”
              </p>
              <p className="mt-2 text-xs text-slate-400">— Elisa Camilleri · Google Reviews</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 hidden rounded-[2rem] bg-cyan-300/10 blur-2xl lg:block" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-2.5 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-3">
              <img
                src={getHeroImage(path)}
                alt="Apex Dental clinic"
                className="h-[260px] w-full rounded-[1.25rem] object-cover sm:h-[320px] md:h-[420px] lg:h-[560px] lg:rounded-[1.5rem]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-5 lg:inset-x-8 lg:bottom-8">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 md:text-sm md:tracking-[0.28em]">
                  Apex Dental Malta
                </p>
                <p className="mt-2 text-base font-semibold text-white md:text-xl">
                  Modern care in a premium clinical environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function StraumannTrustSection() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Clinical Standards
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Precision dentistry backed by premium systems.
            </h2>

            <p className="mt-6 text-lg text-slate-300 leading-8">
              Apex Dental is a <span className="text-white font-semibold">Straumann Partner Clinic</span>,
              reflecting our commitment to advanced implant workflows, premium implant systems,
              and predictable long-term results.
            </p>

            <p className="mt-6 text-slate-400 leading-8">
              Every treatment is planned digitally using scans, imaging, and structured workflows
              designed to improve accuracy, aesthetics, and long-term stability.
            </p>

            <ul className="mt-8 space-y-3 text-slate-300">
              <li>• Straumann and Neodent implant systems</li>
              <li>• Fully digital planning and guided workflows</li>
              <li>• High-end materials and aesthetic focus</li>
              <li>• Clear communication and treatment planning</li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-xl">
            <img
              src={branding.straumann}
              alt="Straumann Partner Clinic"
              className="rounded-[1.5rem] w-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  function ReviewsSection() {
    const reviews = [
      {
        text: 'A very professional and friendly clinic. Everything was explained clearly and the treatment was completely painless.',
        name: 'Elisa Camilleri',
      },
      {
        text: 'I had dental implants done and the whole process was smooth from start to finish. The results are excellent and feel completely natural.',
        name: 'Mark Borg',
      },
      {
        text: 'I’m extremely happy with my new smile. The team is very attentive and the results look natural and beautiful.',
        name: 'Sarah Attard',
      },
    ];

    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Google Reviews
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Trusted by patients across Malta.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-sm"
            >
              <div className="text-lg text-yellow-400">★★★★★</div>
              <p className="mt-4 leading-7 text-slate-300">“{review.text}”</p>
              <p className="mt-4 text-sm text-slate-400">— {review.name} · Google Reviews</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function DentistsSection() {
    return (
      <section className="mt-14">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Our Team
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Experienced dentists focused on quality care.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Dr Jonathan Mifsud',
              role: 'Dental Surgeon',
              text: 'Focused on implantology, digital workflows, and full-arch rehabilitation using modern guided techniques.',
            },
            {
              name: 'Dr Massimi D Alessandro',
              role: 'Dental Surgeon',
              text: 'Experienced in restorative and aesthetic dentistry with a focus on precision and long-term outcomes.',
            },
            {
              name: 'Dr Charlotte Axisa',
              role: 'Dental Surgeon',
              text: 'General and cosmetic dentistry with attention to patient comfort and natural aesthetics.',
            },
            {
              name: 'Dr Martha Lopez',
              role: 'Dental Surgeon',
              text: 'Patient-focused dentistry with a strong emphasis on prevention and minimally invasive care.',
            },
            {
              name: 'Dr Adam Borg',
              role: 'Dental Surgeon',
              text: 'General dentistry and restorative treatments with a structured and patient-friendly approach.',
            },
            {
              name: 'Clinical & Support Staff',
              role: 'Patient Care Team',
              text: 'Our support team helps create a welcoming, calm, and well-organised patient experience from first contact to follow-up care.',
            },
          ].map((doc) => (
            <div
              key={doc.name}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold text-white">{doc.name}</h3>
              <p className="text-cyan-300 text-sm mt-1">{doc.role}</p>
              <p className="mt-4 text-slate-300 leading-7">{doc.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function AftercareSection() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Long-Term Care
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Treatment does not end when you leave the clinic.
            </h2>

            <p className="mt-6 text-lg text-slate-300 leading-8">
              High-quality dentistry requires structured follow-up, maintenance, and
              clear patient guidance to support long-term success.
            </p>

            <p className="mt-6 text-slate-400 leading-8">
              We provide clear aftercare protocols and review schedules for implants,
              restorations, and cosmetic treatments.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <ul className="space-y-4 text-slate-300">
              <li>• Structured follow-up appointments</li>
              <li>• Implant and restoration maintenance guidance</li>
              <li>• Clear expectations before treatment</li>
              <li>• Support in case of complications</li>
              <li>• Long-term monitoring of results</li>
            </ul>

            <p className="mt-6 text-sm text-slate-400">
              Warranty and maintenance conditions are explained clearly during consultation.
            </p>
          </div>
        </div>
      </section>
    );
  }

  function TestimonialPlaceholderSection() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-center md:px-6 md:py-16 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Patient Stories
        </p>

        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Real patients. Real results.
        </h2>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto leading-8">
          We focus on delivering predictable results and a comfortable experience.
          Video testimonials from patients can be added here as the next trust-building upgrade.
        </p>
      </section>
    );
  }

  function HomePage() {
    usePageTitle('Dentist in Malta | Apex Dental');

    return (
      <>
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Featured Treatments
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Premium dentistry, presented clearly.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Apex Dental is a private dental clinic in Malta offering dental implants, clear aligners, cosmetic dentistry, and emergency care from Trident Park.
            </p>
            <p className="mt-4 text-slate-400 leading-8">
              Patients looking for a dentist in Malta often want a clinic that combines modern technology, careful explanation, premium surroundings, and predictable treatment planning from first consultation to final review.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-7 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-cyan-950/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold sm:text-2xl">{service.title}</h3>
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

        <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <img
                src={branding.H2}
                alt="Apex Dental clinic in Malta"
                className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
              />
            </div>

            <div className="grid gap-6">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
                <img
                  src={branding.H3}
                  alt="Private dental clinic environment Malta"
                  className="h-[198px] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
                <img
                  src={branding.H4}
                  alt="Modern dental setting Malta"
                  className="h-[198px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
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

        <StraumannTrustSection />
        <ReviewsSection />

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
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

        <TestimonialPlaceholderSection />

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Patient Journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              From first consultation to final result.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              ['Consultation', 'A clear diagnosis and tailored treatment options.'],
              ['Digital Planning', 'Scans, photos, and imaging guide the workflow.'],
              ['Treatment', 'Delivered with precision, comfort, and modern materials.'],
              ['Follow-Up', 'Maintenance and review for long-term stability.'],
            ].map(([title, text], idx) => (
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

  function InfoPage({ title, intro, benefits, closing, image, secondaryImages = [], seoTitle, seoSlug }) {
    usePageTitle(seoTitle);

    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={image}
            alt={title}
            className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[340px]"
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

            <h3 className="mt-10 text-2xl font-semibold">What is this treatment?</h3>
            <p className="mt-4 text-slate-300 leading-7">
              This treatment is designed to improve both function and aesthetics using modern dental techniques and digital workflows. At Apex Dental Malta, every case is carefully planned using scans, imaging, and clinical evaluation to ensure predictable results.
            </p>

            <h3 className="mt-10 text-2xl font-semibold">Why choose Apex Dental?</h3>
            <p className="mt-4 text-slate-300 leading-7">
              Our clinic is based in Trident Park and focuses on premium dentistry with a strong emphasis on accuracy, comfort, and long-term results. Treatments are tailored to each patient, with clear communication and transparent planning at every stage.
            </p>

            {seoSlug === 'implants' && (
              <>
                <h3 className="mt-10 text-2xl font-semibold">Dental implants in Malta</h3>
                <p className="mt-4 text-slate-300 leading-7">
                  Dental implants in Malta are one of the most reliable solutions for replacing missing teeth. At Apex Dental, we use digital planning, CBCT imaging, and careful restorative design to improve precision, long-term stability, and natural-looking aesthetics.
                </p>
                <p className="mt-4 text-slate-300 leading-7">
                  Whether replacing one tooth or planning more advanced rehabilitation, implant treatment should be based on diagnosis, bone quality, bite analysis, and long-term maintenance. That is why our workflows focus on predictability rather than guesswork.
                </p>
              </>
            )}

            {seoSlug === 'aligners' && (
              <>
                <h3 className="mt-10 text-2xl font-semibold">Clear aligners in Malta</h3>
                <p className="mt-4 text-slate-300 leading-7">
                  Clear aligners in Malta are a popular option for patients who want straighter teeth without the appearance of traditional fixed braces. Using digital scans and planned tooth movement, treatment can be designed with a more discreet and comfortable patient experience in mind.
                </p>
                <p className="mt-4 text-slate-300 leading-7">
                  Many mild to moderate alignment issues can be addressed with removable aligners, while still allowing easier cleaning and day-to-day convenience.
                </p>
              </>
            )}

            {seoSlug === 'cosmetic' && (
              <>
                <h3 className="mt-10 text-2xl font-semibold">Cosmetic dentistry in Malta</h3>
                <p className="mt-4 text-slate-300 leading-7">
                  Cosmetic dentistry in Malta often involves more than simply making teeth whiter. It includes smile proportions, tooth shape, facial harmony, and material choice. Treatments such as veneers, whitening, and bonding should be selected carefully to look polished rather than artificial.
                </p>
                <p className="mt-4 text-slate-300 leading-7">
                  At Apex Dental, cosmetic consultations are structured to help patients compare options clearly and choose a treatment approach that balances aesthetics with long-term maintainability.
                </p>
              </>
            )}

            <h3 className="mt-10 text-2xl font-semibold">Related treatments</h3>
            <p className="mt-4 text-slate-300 leading-7">
              You may also be interested in{' '}
              <Link to="/clear-aligners-malta" className="text-cyan-300 underline">
                clear aligners
              </Link>{' '}
              or{' '}
              <Link to="/cosmetic-dentistry-malta" className="text-cyan-300 underline">
                cosmetic dentistry
              </Link>.
            </p>

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
    usePageTitle('About Apex Dental Malta');

    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.AB1}
              alt="About Apex Dental Malta"
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
            />
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.AB2}
              alt="Apex Dental team and clinic"
              className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[360px]"
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
            {[
              'Advanced digital planning and imaging',
              'Implant, cosmetic, and aligner-focused workflows',
              'Patient-friendly communication and treatment guidance',
              'Convenient location in Trident Park, Mrieħel',
            ].map((item) => (
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

        <DentistsSection />

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={branding.AB3}
            alt="Inside Apex Dental Malta"
            className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[320px]"
          />
        </div>
      </section>
    );
  }

  function ContactPage() {
    usePageTitle('Contact Apex Dental Malta');

    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
          <img
            src={branding.CT1}
            alt="Contact Apex Dental Malta"
            className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[320px]"
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
                  Clinic
                </p>
                <p className="mt-1 text-lg text-white">Apex Dental</p>
              </div>

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
                  Trident Park, Imriehel, Malta
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

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-7">
            <h3 className="text-2xl font-semibold">Contact form</h3>

            <div className="mt-6 grid gap-4">
              <input
                className="min-h-[52px] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="Full name"
              />
              <input
                className="min-h-[52px] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="Phone or email"
              />
              <select className="min-h-[52px] rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white outline-none focus:border-cyan-300/40">
                <option>Interested in</option>
                <option>Dental Implants</option>
                <option>Clear Aligners</option>
                <option>Cosmetic Dentistry</option>
                <option>General Consultation</option>
              </select>
              <textarea
                rows={5}
                className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                placeholder="How can we help?"
              />
              <button className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-slate-950 transition hover:scale-[1.01]">
                Request Appointment <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.CT2}
              alt="Apex Dental location in Malta"
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
    usePageTitle('Emergency Dentist Malta | Apex Dental');

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
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/20 backdrop-blur-sm">
            <img
              src={branding.E1}
              alt="Emergency dentist in Malta"
              className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[360px]"
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
              alt="Urgent dental appointment in Malta"
              className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[320px]"
            />
          </div>
        </div>
      </section>
    );
  }

  function PricePage() {
    usePageTitle('Dental Prices Malta | Apex Dental');

    return (
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h1 className="text-4xl font-semibold">Price List</h1>

        <p className="mt-4 text-slate-300">
          Transparent pricing for dental treatments at Apex Dental Malta.
        </p>

        <div className="mt-10 space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Consultation</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Routine Checkup — €20</p>
              <p>Panormic X-Ray — €70</p>
              <p>Periapical or one side Bitewing X-Ray — €20</p>
              <p>Implant Consultation — €30</p>
              <p>CBCT X-Ray — €120</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Hygiene & Whitening</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Routine Hygiene session — €50</p>
              <p>Perio Laser — €220 per session</p>
              <p>Fissure sealing — €30 per tooth</p>
              <p>Whitening home kits — €250</p>
              <p>Removal of fixed prosthesis and cleaning — €80</p>
              <p>Fluoride Application — €40</p>
              <p>In House teeth whitening — €400</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Crowns</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Lab made Temporary crowns — €50</p>
              <p>Removal of existing Bridgework — €30</p>
              <p>Full Porcelain crowns/Zirconia — €450</p>
              <p>Post and Core Build up — €70</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Veneers</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Porcelain Veneers — €450</p>
              <p>Composite Veneers — €120</p>
              <p>3D Printed Ceramic Resin Veneers — €220</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Fillings</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Removal of Amalgam Filling Under Rubberdam — €40</p>
              <p>Restoration of Deciduous Teeth — €40</p>
              <p>Composite filling — €90</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Implants</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Neodent Implant — €1700</p>
              <p>Straumann Implant — €1800</p>
              <p>Toronto Bridge with Neodent implants — €9000</p>
              <p>Toronto Bridge with Straumann implants — €10000</p>
              <p>Implant Retained Removable denture with 3 implants and bar — €5500</p>
              <p>Crown/Pontic on implant — €400</p>
              <p>Implant retained removable Denture — €3500</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Extraction and Surgery</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Extraction from — €60</p>
              <p>Wisdom tooth Surgical extraction — €300</p>
              <p>Surgical Extraction from — €150</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Root Canal Treatment</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Root Canal Anterior Teeth — €250</p>
              <p>Re Root Canal treatment — €320</p>
              <p>Root Canal Treatment Posterior Teeth — €280</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Dentures</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Full Upper/ Lower Acrylic dentures — €400</p>
              <p>Flexible Dentures Partial — €350</p>
              <p>Chrome Cobalt dentures — €650</p>
              <p>Partial Acrylic Dentures — €300</p>
              <p>Flexible dentures more than 3 teeth — €650</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Orthodontic Treatment & Miscellaneous</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>Soft Splint 2mm — €100</p>
              <p>Michigan Splint — €300</p>
              <p>Clear Correct Treatment from — €2900</p>
              <p>Bionator — €600</p>
              <p>Soft Splint 4mm — €120</p>
              <p>Invisalign Treatment from — €3500</p>
              <p>Fixed Upper and lower orthodontic appliance from — €2500</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_22%),linear-gradient(180deg,#2b2b2b_0%,#1f1f24_38%,#2b2b2b_100%)] pb-20 text-white md:pb-0">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2b2b2b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3 text-left">
            <img
              src={branding.logo}
              alt="Apex Dental logo"
              className="h-10 w-auto shrink-0 object-contain md:h-12"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-[0.04em] text-white md:text-xl">
                Apex Dental
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.28em] text-cyan-300/90 sm:block md:text-[11px] md:tracking-[0.38em]">
                Digital Dentistry · Malta
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm lg:flex">
            {navItems.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className={`transition ${
                  location.pathname === path
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="https://wa.me/35679854037"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] md:px-5 md:py-2.5"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
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
          path="/dental-implants-malta"
          element={
            <>
              <PageHero path="/dental-implants-malta" />
              <InfoPage
                title="Dental Implants"
                seoTitle="Dental Implants Malta | Apex Dental"
                seoSlug="implants"
                image={branding.I1}
                secondaryImages={[branding.I2, branding.I3, branding.I4]}
                intro="Dental implants in Malta are a stable, aesthetic solution for replacing missing teeth. At Apex Dental, we use digital planning, CBCT imaging, and guided workflows to improve precision, long-term stability, and restorative quality."
                benefits={implantBenefits}
                closing="We use careful diagnosis, imaging, and planning to improve predictability and long-term outcomes."
              />
              <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
                <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-lg text-yellow-400">★★★★★</div>
                  <p className="mt-3 text-slate-300 leading-7">
                    “I had dental implants done and the whole process was smooth from start to finish. The results are excellent and feel completely natural.”
                  </p>
                  <p className="mt-3 text-sm text-slate-400">— Mark Borg · Google Reviews</p>
                </div>
              </section>
              <AftercareSection />
            </>
          }
        />

        <Route
          path="/clear-aligners-malta"
          element={
            <>
              <PageHero path="/clear-aligners-malta" />
              <InfoPage
                title="Clear Aligners"
                seoTitle="Clear Aligners Malta | Apex Dental"
                seoSlug="aligners"
                image={branding.A1}
                secondaryImages={[branding.A2, branding.A3, branding.A4]}
                intro="Clear aligners in Malta offer a discreet way to straighten teeth using removable transparent trays designed through digital scanning and planning."
                benefits={alignerBenefits}
                closing="Treatment is planned digitally and monitored carefully for predictable, comfortable progress."
              />
            </>
          }
        />

        <Route
          path="/cosmetic-dentistry-malta"
          element={
            <>
              <PageHero path="/cosmetic-dentistry-malta" />
              <InfoPage
                title="Cosmetic Dentistry"
                seoTitle="Cosmetic Dentistry Malta | Apex Dental"
                seoSlug="cosmetic"
                image={branding.C1}
                secondaryImages={[branding.C2, branding.C3, branding.C4]}
                intro="Cosmetic dentistry in Malta focuses on improving smile aesthetics using veneers, whitening, bonding, and conservative smile design techniques."
                benefits={cosmeticBenefits}
                closing="Whitening, bonding, and veneers can be tailored to each patient with a premium, conservative approach."
              />
              <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
                <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-lg text-yellow-400">★★★★★</div>
                  <p className="mt-3 text-slate-300 leading-7">
                    “I’m extremely happy with my new smile. The team is very attentive and the results look natural and beautiful.”
                  </p>
                  <p className="mt-3 text-sm text-slate-400">— Sarah Attard · Google Reviews</p>
                </div>
              </section>
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
          path="/emergency-dentist-malta"
          element={
            <>
              <PageHero path="/emergency-dentist-malta" />
              <EmergencyPage />
            </>
          }
        />

        <Route
          path="/price-list"
          element={
            <>
              <PageHero path="/price-list" />
              <PricePage />
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

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:px-8">
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

      <div className="fixed inset-x-0 bottom-3 z-50 px-4 md:hidden">
        <a
          href="https://wa.me/35679854037"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 text-base font-semibold text-slate-950 shadow-2xl shadow-cyan-500/30 transition hover:scale-[1.01]"
        >
          <Phone className="h-5 w-5" />
          WhatsApp Now
        </a>
      </div>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={branding.logo}
              alt="Apex Dental logo"
              className="h-10 w-auto object-contain"
            />
            <p>Apex Dental Malta</p>
          </div>
          <p>Implants · Aligners · Cosmetic Dentistry · Trident Park, Malta</p>
        </div>
      </footer>
    </div>
  );
}
