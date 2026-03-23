import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Smile,
  Clock3,
  Star,
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
  phone: '27016017',
  mobile: '79854037',
  whatsapp: '79854037',
  email: 'info@apexdental.com.mt',
  address: 'Trident Park, Imdina Road, Central Business District, Imrieħel, CBD 2010, Malta',
  logo: '/images/orislogo.png',

  hero: '/images/H1.jpg',
  implants: '/images/I1.jpg',
  aligners: '/images/A1.jpg',
  veneers: '/images/C1.jpg',
  emergency: '/images/H2.jpg',
  team: '/images/H3.jpg',
  clinic: '/images/H4.jpg',
  smile: '/images/H5.jpg',
};

function Section({ children, className = '' }) {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

function ButtonLink({ to, children, primary = false, external = false }) {
  const classes = primary
    ? 'inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-5 py-3 font-semibold hover:bg-sky-700 transition'
    : 'inline-flex items-center gap-2 rounded-full border border-slate-300 text-slate-800 px-5 py-3 font-semibold hover:bg-slate-100 transition';

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

function Card({ title, text, to, image }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 mt-3 leading-7">{text}</p>
        <Link
          to={to}
          className="inline-flex items-center gap-2 mt-5 font-semibold text-sky-700 hover:text-sky-800"
        >
          Learn more <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-slate-950 text-white text-sm">
      <Section className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <a href={`tel:${brand.phone}`} className="inline-flex items-center gap-2 hover:text-sky-300">
            <Phone size={16} /> {brand.phone}
          </a>
          <a href={`https://wa.me/356${brand.whatsapp}`} className="inline-flex items-center gap-2 hover:text-sky-300">
            <MessageCircle size={16} /> WhatsApp {brand.mobile}
          </a>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <MapPin size={16} />
          <span>{brand.address}</span>
        </div>
      </Section>
    </div>
  );
}

function Header() {
  const [open, setOpen] = React.useState(false);

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dental-implants', label: 'Dental Implants' },
    { to: '/invisalign-malta', label: 'Clear Aligners' },
    { to: '/veneers-malta', label: 'Veneers' },
    { to: '/emergency-dentist-malta', label: 'Emergency' },
    { to: '/price-list', label: 'Price List' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <Section className="py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={brand.logo} alt="Apex Dental Malta" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="font-bold text-slate-900 text-lg">Apex Dental</div>
              <div className="text-sm text-slate-500">Advanced Dental Care in Malta</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="text-slate-700 hover:text-sky-700 font-medium">
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${brand.phone}`}
              className="rounded-full bg-sky-600 text-white px-5 py-3 font-semibold hover:bg-sky-700 transition"
            >
              Book Appointment
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl border border-slate-300"
            aria-label="Open menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </Section>

        {open && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <Section className="py-4 flex flex-col gap-4">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-slate-800 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${brand.phone}`}
                className="rounded-full bg-sky-600 text-white px-5 py-3 font-semibold text-center"
              >
                Book Appointment
              </a>
            </Section>
          </div>
        )}
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <Section className="py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold">Apex Dental</h3>
          <p className="text-slate-300 mt-4 leading-7">
            Premium dental care in Malta with a focus on dental implants, clear aligners,
            cosmetic dentistry, emergency care, and modern digital workflows.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <div className="mt-4 flex flex-col gap-3 text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/dental-implants">Dental Implants</Link>
            <Link to="/invisalign-malta">Clear Aligners</Link>
            <Link to="/veneers-malta">Veneers</Link>
            <Link to="/emergency-dentist-malta">Emergency</Link>
            <Link to="/price-list">Price List</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg">Contact</h4>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>{brand.address}</p>
            <p>
              <a href={`tel:${brand.phone}`} className="hover:text-sky-300">
                Tel: {brand.phone}
              </a>
            </p>
            <p>
              <a href={`https://wa.me/356${brand.whatsapp}`} className="hover:text-sky-300">
                WhatsApp: {brand.mobile}
              </a>
            </p>
            <p>
              <a href={`mailto:${brand.email}`} className="hover:text-sky-300">
                {brand.email}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <div className="border-t border-slate-800">
        <Section className="py-4 text-sm text-slate-400">
          © {new Date().getFullYear()} Apex Dental Malta. All rights reserved.
        </Section>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3">
        <a
          href={`tel:${brand.phone}`}
          className="flex flex-col items-center justify-center py-3 text-slate-800 font-semibold"
        >
          <Phone size={18} />
          <span className="text-xs mt-1">Call</span>
        </a>

        <a
          href={`https://wa.me/356${brand.whatsapp}`}
          className="flex flex-col items-center justify-center py-3 text-slate-800 font-semibold border-l border-r border-slate-200"
        >
          <MessageCircle size={18} />
          <span className="text-xs mt-1">WhatsApp</span>
        </a>

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center py-3 text-slate-800 font-semibold"
        >
          <ChevronRight size={18} />
          <span className="text-xs mt-1">Book</span>
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-950">
      <img
        src={brand.hero}
        alt="Apex Dental Malta"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="relative">
        <Section className="py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium mb-6">
              <ShieldCheck size={16} />
              Advanced Dentistry in Malta
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Dental Implants, Clear Aligners and Premium Dental Care in Malta
            </h1>

            <p className="mt-6 text-lg text-slate-200 leading-8 max-w-2xl">
              Apex Dental offers modern, patient-focused dental treatment in Malta,
              with a special focus on implants, aesthetic dentistry, emergency care,
              and digital treatment planning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/contact" primary>
                Book Appointment
              </ButtonLink>
              <ButtonLink to={`tel:${brand.phone}`} external>
                Call Now
              </ButtonLink>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-bold text-xl">Implants</div>
                <div className="text-slate-300 text-sm mt-1">Single to full-arch solutions</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-bold text-xl">Clear Aligners</div>
                <div className="text-slate-300 text-sm mt-1">Discreet orthodontic treatment</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="font-bold text-xl">Emergency Care</div>
                <div className="text-slate-300 text-sm mt-1">Fast help when you need it most</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white rounded-[2rem] p-6 shadow-2xl">
              <img
                src={brand.clinic}
                alt="Apex Dental clinic"
                className="rounded-[1.5rem] w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    'Located at Trident Park, Imrieħel',
    'Modern digital dentistry workflows',
    'Emergency dental appointments available',
    'Implants, aligners and smile makeovers',
  ];

  return (
    <Section className="py-8">
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex items-start gap-3">
            <CheckCircle2 className="text-sky-600 shrink-0 mt-1" size={20} />
            <span className="text-slate-700 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HomePage() {
  usePageTitle('Apex Dental Malta | Implants, Aligners, Veneers & Emergency Dentist');

  return (
    <>
      <Hero />
      <TrustBar />

      <Section className="py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Comprehensive Dental Care in Malta
          </h2>
          <p className="mt-5 text-slate-600 leading-8 text-lg">
            At Apex Dental, we combine clinical precision, modern technology, and a
            patient-first approach to deliver high-quality dental treatment in a calm
            and professional environment. Whether you need a routine check-up, a smile
            enhancement, a dental implant, or urgent care, our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
          <Card
            title="Dental Implants"
            text="Reliable solutions for replacing missing teeth, from single implants to advanced full-arch rehabilitation."
            to="/dental-implants"
            image={brand.implants}
          />
          <Card
            title="Clear Aligners"
            text="Straighten your teeth discreetly with modern aligner treatment planned around comfort and precision."
            to="/invisalign-malta"
            image={brand.aligners}
          />
          <Card
            title="Veneers"
            text="Transform your smile with carefully designed cosmetic treatments that enhance shape, harmony and confidence."
            to="/veneers-malta"
            image={brand.veneers}
          />
          <Card
            title="Emergency Dentist"
            text="Fast access to urgent dental care for pain, swelling, trauma, broken teeth and other unexpected problems."
            to="/emergency-dentist-malta"
            image={brand.emergency}
          />
        </div>
      </Section>

      <Section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={brand.team}
            alt="Apex Dental team"
            className="w-full h-[420px] object-cover rounded-[2rem] shadow-sm"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Apex Dental?</h2>
            <div className="mt-8 space-y-5">
              {[
                'Personalised treatment plans designed around each patient',
                'Advanced dental implant and restorative workflows',
                'Modern digital scanning and treatment planning',
                'Aesthetic and functional focus in every stage of care',
                'Convenient Malta location with a professional clinic environment',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="text-sky-600 mt-1 shrink-0" size={20} />
                  <p className="text-slate-700 leading-7">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/about" primary>
                Meet Our Team
              </ButtonLink>
              <ButtonLink to="/contact">Book Consultation</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="rounded-[2rem] bg-slate-50 border border-slate-200 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Real Reviews. Real Smiles.</h2>
            <p className="mt-4 text-slate-600 leading-8">
              Replace this section with your real Google reviews. Use only verified reviews
              from actual patients and keep the names exactly as shown on Google.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                name: 'Google Review',
                text: 'Add one real 5-star review here from your Google Business Profile.',
              },
              {
                name: 'Google Review',
                text: 'Add another real review focused on friendliness, professionalism, or pain-free care.',
              },
              {
                name: 'Google Review',
                text: 'Add a third real review focused on implants, veneers, aligners, or emergency treatment.',
              },
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="mt-4 text-slate-600 leading-7">{review.text}</p>
                <div className="mt-4 font-semibold text-slate-900">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Book Your Visit to Apex Dental</h2>
            <p className="mt-5 text-slate-600 leading-8 text-lg">
              Whether you are coming for a routine examination, a cosmetic consultation,
              clear aligner treatment, or a dental implant assessment, our team will guide
              you through every step with clarity and care.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-sky-600" size={20} />
                <span className="text-slate-700">{brand.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-sky-600" size={20} />
                <a href={`tel:${brand.phone}`} className="text-slate-700 hover:text-sky-700">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="text-sky-600" size={20} />
                <span className="text-slate-700">Contact us for appointments and emergency availability</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/contact" primary>
                Book Appointment
              </ButtonLink>
              <ButtonLink to={`https://wa.me/356${brand.whatsapp}`} external>
                WhatsApp Us
              </ButtonLink>
            </div>
          </div>

          <img
            src={brand.smile}
            alt="Smile makeover at Apex Dental"
            className="w-full h-[420px] object-cover rounded-[2rem] shadow-sm"
          />
        </div>
      </Section>
    </>
  );
}

function AboutPage() {
  usePageTitle('About Apex Dental Malta');

  return (
    <PageLayout
      title="About Apex Dental"
      subtitle="Modern dentistry in Malta with a focus on precision, patient comfort, and high-quality care."
      image={brand.team}
    >
      <TextBlock
        title="A patient-focused dental clinic in Malta"
        text="Apex Dental is dedicated to delivering high-quality dental care in a professional, welcoming setting. Our approach combines clinical precision, modern digital workflows, and clear communication so that each patient feels informed, reassured, and well cared for throughout treatment."
      />
      <TextBlock
        title="What makes us different"
        text="We believe great dentistry is not only about solving problems, but also about creating long-term stability, function, comfort, and confidence. From routine care to advanced restorative treatment, every case is planned with attention to detail and a commitment to excellent outcomes."
      />
      <TextBlock
        title="Our areas of focus"
        text="We provide a wide range of dental services, including dental implants, clear aligners, cosmetic dentistry, veneers, preventive care, restorative treatment, and emergency dental care."
      />
    </PageLayout>
  );
}

function ImplantsPage() {
  usePageTitle('Dental Implants Malta | Apex Dental');

  return (
    <PageLayout
      title="Dental Implants in Malta"
      subtitle="A long-term solution for replacing missing teeth with stability, function, and aesthetics in mind."
      image={brand.implants}
    >
      <TextBlock
        title="What are dental implants?"
        text="Dental implants are designed to replace missing tooth roots and support crowns, bridges, or fixed full-arch restorations. They are one of the most reliable and natural-feeling solutions for missing teeth, helping restore both appearance and chewing function."
      />
      <TextBlock
        title="Who are they suitable for?"
        text="Dental implants may be suitable for patients missing a single tooth, several teeth, or all teeth in one arch. A consultation and assessment are needed to evaluate bone levels, gum health, general oral condition, and treatment goals."
      />
      <TextBlock
        title="Treatment options"
        text="At Apex Dental, implant treatment may include single-tooth implants, implant-supported bridges, and advanced full-arch rehabilitation for patients looking for a fixed solution. Treatment planning is tailored carefully to each case."
      />
      <TextBlock
        title="Why choose Apex Dental for implants?"
        text="We focus on detailed planning, modern workflows, restorative precision, and clear patient guidance throughout the treatment journey. Our goal is to create stable, aesthetic and functional implant restorations designed for long-term success."
      />
      <CTA />
    </PageLayout>
  );
}

function AlignersPage() {
  usePageTitle('Clear Aligners Malta | Apex Dental');

  return (
    <PageLayout
      title="Clear Aligners in Malta"
      subtitle="A discreet way to straighten teeth with comfort, precision, and modern digital planning."
      image={brand.aligners}
    >
      <TextBlock
        title="A modern approach to orthodontics"
        text="Clear aligners are a popular option for patients who want to improve the alignment of their teeth without traditional braces. They are removable, discreet, and designed to fit into everyday life more comfortably."
      />
      <TextBlock
        title="What can aligners treat?"
        text="Clear aligners may help address crowding, spacing, mild to moderate bite issues, and general alignment concerns. Suitability depends on the complexity of the case and should always be assessed during consultation."
      />
      <TextBlock
        title="Why patients choose aligners"
        text="Patients often prefer aligners because they are more discreet, can be removed for eating and cleaning, and allow treatment to fit more naturally around work, social life, and daily routines."
      />
      <TextBlock
        title="Your aligner journey at Apex Dental"
        text="We focus on careful planning, digital assessment, and close follow-up to ensure treatment progresses efficiently and comfortably. Every treatment plan is tailored to the patient’s smile goals and clinical needs."
      />
      <CTA />
    </PageLayout>
  );
}

function VeneersPage() {
  usePageTitle('Veneers Malta | Apex Dental');

  return (
    <PageLayout
      title="Veneers in Malta"
      subtitle="Enhance the shape, colour, and overall harmony of your smile with cosmetic dental treatment."
      image={brand.veneers}
    >
      <TextBlock
        title="What are veneers?"
        text="Veneers are thin aesthetic restorations placed on the front surfaces of teeth to improve their appearance. They can help enhance colour, shape, symmetry, and overall smile balance."
      />
      <TextBlock
        title="Who are veneers for?"
        text="Veneers may be suitable for patients looking to improve chipped, worn, discoloured, uneven, or mildly misaligned teeth. A consultation is important to determine whether veneers are the right treatment option."
      />
      <TextBlock
        title="Smile design with precision"
        text="A successful veneer case is about more than bright teeth. It is about harmony, proportion, facial aesthetics, and natural-looking results. At Apex Dental, every cosmetic case is approached with careful planning and attention to detail."
      />
      <TextBlock
        title="A confident, natural-looking result"
        text="Our goal is to create smiles that look elegant, balanced, and believable rather than overdone. Cosmetic dentistry should elevate the smile, not make it look like it was ordered from a vending machine."
      />
      <CTA />
    </PageLayout>
  );
}

function EmergencyPage() {
  usePageTitle('Emergency Dentist Malta | Apex Dental');

  return (
    <PageLayout
      title="Emergency Dentist in Malta"
      subtitle="Fast support for dental pain, swelling, trauma, broken teeth, and urgent oral health problems."
      image={brand.emergency}
    >
      <TextBlock
        title="When to seek urgent dental care"
        text="You may need emergency dental treatment if you have severe toothache, facial swelling, a broken tooth, trauma, bleeding, a lost restoration, or another urgent problem affecting comfort or function."
      />
      <TextBlock
        title="What to do next"
        text="If you think you need urgent dental care, contact Apex Dental directly by phone or WhatsApp so our team can guide you as quickly as possible. Prompt care can make a major difference in protecting teeth and managing pain."
      />
      <TextBlock
        title="What we can help with"
        text="Emergency appointments may involve assessment, pain relief, stabilisation, infection management, temporary treatment, or planning the next stage of care depending on the problem presented."
      />
      <CTA emergency />
    </PageLayout>
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
    <Section className="py-16">
      <h1 className="text-4xl font-bold text-slate-900">Price List</h1>
      <p className="mt-5 text-slate-600 leading-8 max-w-3xl">
        Below are example starting prices for selected treatments. Final fees may vary
        depending on case complexity, materials used, and treatment requirements.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {prices.map(([item, price], index) => (
          <div
            key={item}
            className={`grid grid-cols-2 gap-4 p-5 ${index !== prices.length - 1 ? 'border-b border-slate-200' : ''}`}
          >
            <div className="font-medium text-slate-800">{item}</div>
            <div className="text-right font-semibold text-slate-900">{price}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <CTA />
      </div>
    </Section>
  );
}

function ContactPage() {
  usePageTitle('Contact Apex Dental Malta');

  return (
    <Section className="py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-5 text-slate-600 leading-8">
            Book an appointment, ask a question, or contact us for emergency dental care.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <div className="font-semibold text-slate-900">Address</div>
              <div className="text-slate-600 mt-1">{brand.address}</div>
            </div>

            <div>
              <div className="font-semibold text-slate-900">Phone</div>
              <a href={`tel:${brand.phone}`} className="text-slate-600 mt-1 block hover:text-sky-700">
                {brand.phone}
              </a>
            </div>

            <div>
              <div className="font-semibold text-slate-900">WhatsApp</div>
              <a
                href={`https://wa.me/356${brand.whatsapp}`}
                className="text-slate-600 mt-1 block hover:text-sky-700"
              >
                {brand.mobile}
              </a>
            </div>

            <div>
              <div className="font-semibold text-slate-900">Email</div>
              <a href={`mailto:${brand.email}`} className="text-slate-600 mt-1 block hover:text-sky-700">
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8">
          <h2 className="text-2xl font-bold text-slate-900">Appointment Request</h2>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500">
              <option>Reason for Visit</option>
              <option>General Check-up</option>
              <option>Dental Implants</option>
              <option>Clear Aligners</option>
              <option>Veneers</option>
              <option>Emergency Appointment</option>
            </select>
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="rounded-full bg-sky-600 text-white px-6 py-3 font-semibold hover:bg-sky-700 transition"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}

function PageLayout({ title, subtitle, image, children }) {
  return (
    <>
      <div className="bg-slate-950 relative overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="relative">
          <Section className="py-20 md:py-24">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{title}</h1>
              <p className="mt-5 text-lg text-slate-200 leading-8">{subtitle}</p>
            </div>
          </Section>
        </div>
      </div>

      <Section className="py-16">
        <div className="max-w-4xl space-y-10">{children}</div>
      </Section>
    </>
  );
}

function TextBlock({ title, text }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
      <p className="mt-4 text-slate-600 leading-8 text-lg">{text}</p>
    </div>
  );
}

function CTA({ emergency = false }) {
  return (
    <div className="rounded-[2rem] bg-slate-50 border border-slate-200 p-8 mt-10">
      <h3 className="text-2xl font-bold text-slate-900">
        {emergency ? 'Need urgent dental care?' : 'Ready to book your consultation?'}
      </h3>
      <p className="mt-4 text-slate-600 leading-8">
        Contact Apex Dental today to arrange your visit. Our team will guide you through the
        next steps and help you find the most suitable appointment.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <ButtonLink to="/contact" primary>
          Book Appointment
        </ButtonLink>
        <ButtonLink to={`tel:${brand.phone}`} external>
          Call {brand.phone}
        </ButtonLink>
      </div>
    </div>
  );
}

export default function ApexDentalWebsite() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16 lg:pb-0">
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dental-implants" element={<ImplantsPage />} />
        <Route path="/invisalign-malta" element={<AlignersPage />} />
        <Route path="/veneers-malta" element={<VeneersPage />} />
        <Route path="/emergency-dentist-malta" element={<EmergencyPage />} />
        <Route path="/price-list" element={<PriceListPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
