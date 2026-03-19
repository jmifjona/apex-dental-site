export default function ApexDentalLuxuryWebsite() {
  const heroImages = {
    home: "/images/H1.jpg",
    implants: "/images/H4.jpg",
    veneers: "/images/H7.jpg",
    whitening: "/images/H8.jpg",
    orthodontics: "/images/H1.jpg",
    emergency: "/images/H2.jpg",
  };

  const services = [
    {
      id: "implants",
      title: "Dental Implants",
      subtitle: "Fixed. Natural. Long-lasting.",
      image: "/images/I3.jpg",
      points: ["Natural aesthetics", "Functional stability", "Long-term reliability"],
      description:
        "A precise solution for replacing missing teeth using advanced implant planning and durable restorative materials.",
    },
    {
      id: "veneers",
      title: "Veneers",
      subtitle: "Refined smile enhancement.",
      image: "/images/I1.jpg",
      points: ["Shape correction", "Colour enhancement", "Natural finish"],
      description:
        "Custom veneers designed to enhance symmetry, brightness, and confidence with a premium aesthetic result.",
    },
    {
      id: "whitening",
      title: "Teeth Whitening",
      subtitle: "Cleaner. Brighter. More confident.",
      image: "/images/I2.jpg",
      points: ["Professional systems", "Even results", "Safe treatment"],
      description:
        "Professional whitening options tailored to deliver noticeable brightness while protecting enamel and comfort.",
    },
    {
      id: "orthodontics",
      title: "Orthodontics & Clear Aligners",
      subtitle: "Discreet movement. Precise outcomes.",
      image: "/images/I4.jpg",
      points: ["Clear planning", "Removable aligners", "Predictable progress"],
      description:
        "Advanced orthodontic solutions for patients seeking a straighter smile with comfort, discretion, and control.",
    },
  ];

  const treatmentCards = [
    "Dental Implants",
    "Veneers",
    "Teeth Whitening",
    "Crowns & Bridges",
    "Root Canal Treatment",
    "Orthodontics",
    "Emergency Care",
    "Smile Design",
  ];

  const navigation = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Emergency", href: "#emergency" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00AEEF]/30 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#home" className="text-lg font-semibold tracking-[0.35em] uppercase text-white">
            Apex Dental
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-[#00AEEF]/50 px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:border-[#00AEEF] hover:bg-[#00AEEF]/10"
          >
            Book Consultation
          </a>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative isolate overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.70), rgba(10,10,10,0.78)), url(${heroImages.home})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-24 lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#00AEEF]">Luxury Dental Experience</p>
              <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                Precision Dentistry. <br /> Redefined.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Advanced dental care in Malta focused on aesthetics, function, and long-term results. A premium
                clinical environment with modern digital workflows and a calm, high-trust patient journey.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                >
                  Book Consultation
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  View Treatments
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-white/10 bg-[#0D0D0D]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
              <img src="/images/I1.jpg" alt="Apex Dental clinic interior" className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">About Apex Dental</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">A Higher Standard of Dentistry</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
                Apex Dental combines advanced digital workflows with clinical expertise to deliver precise,
                predictable outcomes. Every detail is designed to feel calm, refined, and clinically excellent.
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
                From consultation to final restoration, the experience is built around clarity, comfort, and premium
                patient care. Dentistry should not feel rushed. Teeth are not a takeaway order.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "Digital", label: "Workflow" },
                  { value: "Premium", label: "Materials" },
                  { value: "Personal", label: "Care" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.2em] text-white/45">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-white/10 bg-[#0A0A0A]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Treatments</p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Premium care across every stage of treatment</h2>
              <p className="mt-6 text-base leading-8 text-white/70">
                Structured to feel clean, modern, and easy to navigate while still using your existing image assets.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {treatmentCards.map((item) => (
                <div
                  key={item}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#00AEEF]/40 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-[0.2em] text-white/45">Treatment</span>
                    <span className="text-white/25 transition group-hover:text-[#00AEEF]">↗</span>
                  </div>
                  <h3 className="mt-8 text-xl font-medium leading-snug text-white">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden border-y border-white/10"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.72)), url(/images/H2.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-10">
            <p className="text-xs uppercase tracking-[0.45em] text-[#00AEEF]">Clinical Philosophy</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Designed for Results. Built to Last.
            </h2>
          </div>
        </section>

        <section className="bg-[#0D0D0D]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Digital Precision",
                  text: "Modern planning and refined workflows to support accurate, predictable treatment delivery.",
                },
                {
                  title: "Premium Materials",
                  text: "High-quality restorative materials selected for aesthetics, strength, and long-term confidence.",
                },
                {
                  title: "Personalised Care",
                  text: "A tailored treatment journey shaped around comfort, clarity, and the right clinical outcome.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/68">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0A0A0A]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Featured Services</p>
                <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Luxury service pages, ready to expand</h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-white/70">
                Each section uses a strong hero, concise authority-driven messaging, and a visual rhythm designed for a
                premium clinic experience.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              {services.map((service, index) => (
                <section
                  key={service.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
                >
                  <div className={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="min-h-[340px]">
                      <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                      <p className="text-xs uppercase tracking-[0.35em] text-[#00AEEF]">Signature Service</p>
                      <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{service.title}</h3>
                      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/45">{service.subtitle}</p>
                      <p className="mt-6 max-w-xl text-base leading-8 text-white/70">{service.description}</p>

                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {service.points.map((point) => (
                          <div key={point} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/80">
                            {point}
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-wrap gap-4">
                        <a
                          href="#contact"
                          className="rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                        >
                          Book Consultation
                        </a>
                        <a
                          href="#contact"
                          className="rounded-full border border-white/15 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:border-white/35 hover:bg-white/5"
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section
          id="emergency"
          className="relative isolate overflow-hidden border-y border-white/10"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.72), rgba(10,10,10,0.82)), url(${heroImages.emergency})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-sm sm:p-10">
              <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Emergency Dentist Malta</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Immediate Care. Fast Relief.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
                Urgent appointments for pain, swelling, broken teeth, lost restorations, and other dental emergencies.
                This page is designed to convert fast and keep the next step obvious.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:79854037"
                  className="rounded-full bg-[#00AEEF] px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:brightness-110"
                >
                  Call 79854037
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Request Appointment
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#0D0D0D]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Contact</p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Visit Apex Dental</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
                A refined clinical environment in Malta designed for comfort, trust, and premium dental care.
              </p>

              <div className="mt-10 space-y-5 text-base text-white/82">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Phone</div>
                  <a href="tel:79854037" className="mt-1 block text-lg text-white hover:text-[#00AEEF]">
                    79854037
                  </a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Email</div>
                  <a href="mailto:info@apexdental.com.mt" className="mt-1 block text-lg text-white hover:text-[#00AEEF]">
                    info@apexdental.com.mt
                  </a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Location</div>
                  <p className="mt-1 text-lg text-white">Imrieħel, Malta</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Website</div>
                  <a href="https://apexdental.com.mt" className="mt-1 block text-lg text-white hover:text-[#00AEEF]">
                    apexdental.com.mt
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 sm:p-10">
              <div className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Appointment Form</div>
              <h3 className="mt-4 text-3xl font-semibold">Start Your Treatment Journey</h3>
              <p className="mt-4 text-base leading-8 text-white/70">
                Clean, premium form styling ready to connect to your preferred backend or booking workflow.
              </p>

              <form className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-[#00AEEF]/60"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-[#00AEEF]/60"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-[#00AEEF]/60"
                />
                <select className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition focus:border-[#00AEEF]/60">
                  <option className="bg-[#0A0A0A]">Select Treatment</option>
                  <option className="bg-[#0A0A0A]">Dental Implants</option>
                  <option className="bg-[#0A0A0A]">Veneers</option>
                  <option className="bg-[#0A0A0A]">Teeth Whitening</option>
                  <option className="bg-[#0A0A0A]">Orthodontics</option>
                  <option className="bg-[#0A0A0A]">Emergency Appointment</option>
                </select>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-[#00AEEF]/60"
                />
                <button
                  type="button"
                  className="w-full rounded-full bg-white px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.01]"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Apex Dental. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
