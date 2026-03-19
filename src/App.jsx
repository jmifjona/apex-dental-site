import { useEffect, useMemo, useState } from "react";

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-6 text-base leading-8 text-[#D3D3D3]">{text}</p> : null}
    </div>
  );
}

function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-white/10"
      style={{
        backgroundImage: `linear-gradient(rgba(12,12,12,0.60), rgba(12,12,12,0.88)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-h-[64vh] max-w-7xl items-end px-6 py-20 lg:px-10">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E3E3E3]">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

function ServicePage({ service }) {
  return (
    <>
      <PageHero image={service.heroImage} eyebrow={service.eyebrow} title={service.title} subtitle={service.subtitle} />

      <section className="bg-[#111111]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
          <div>
            <a href="#home" className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/75 transition hover:text-white">
              ← Back to Home
            </a>
            <div className="mt-8">
              <SectionHeading
                eyebrow="Treatment Overview"
                title={`Understanding ${service.shortTitle}`}
                text={service.intro}
              />
              <p className="mt-8 text-base leading-8 text-[#D3D3D3]">{service.forWho}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/40">
            <img src={service.pageImage} alt={service.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/40 lg:order-2">
            <img src={service.sectionImage} alt={`${service.title} supporting visual`} className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Patients Choose This Treatment"
              title={`Benefits of ${service.shortTitle}`}
              text="The goal is not only to improve appearance or comfort, but to create a treatment pathway that feels clear, reassuring, and clinically sound."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.75rem] border border-white/10 bg-[#141414] p-6 text-base leading-8 text-[#E0E0E0]">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Treatment Journey"
            title={`What to expect with ${service.shortTitle}`}
            text="A structured process helps patients understand what happens next, from planning through to final delivery and review."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {service.steps.map((step, index) => (
              <div key={step} className="rounded-[1.75rem] border border-[#C7A86B]/15 bg-[#151515] p-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#C7A86B]">Step {index + 1}</div>
                <p className="mt-4 text-base leading-8 text-[#DEDEDE]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title={`${service.shortTitle} FAQs`}
              text="Clear answers build confidence and make the page feel more helpful, especially for patients comparing treatment options."
            />
            <div className="mt-12 space-y-5">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="rounded-[1.75rem] border border-white/10 bg-[#141414] p-7">
                  <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
                  <p className="mt-4 text-base leading-8 text-[#D3D3D3]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/40">
            <img src={service.faqImage} alt={`${service.title} page visual`} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">Book a Consultation</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Discuss your {service.shortTitle.toLowerCase()} treatment with Apex Dental
            </h2>
            <p className="mt-6 text-base leading-8 text-[#D3D3D3]">
              The next step is a consultation, assessment, and a tailored treatment plan based on your clinical needs, timeline, and aesthetic goals.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="tel:79854037" className="rounded-full bg-[#C7A86B] px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:brightness-110">
              Call 79854037
            </a>
            <a href="#contact" className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-[#C7A86B]/40 hover:bg-white/5">
              Contact Clinic
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function PriceListPage() {
  const categories = [
    {
      title: "Examination / Diagnosis",
      items: [
        ["Routine Checkup", "€20.00"],
        ["Panormic X-Ray", "€70.00"],
        ["Periapical or one side Bitewing X-Ray", "€20.00"],
        ["Implant Consultation", "€30.00"],
        ["CBCT X-Ray", "€120.00"],
      ],
    },
    {
      title: "Hygiene & Whitening",
      items: [
        ["Routine Hygiene Session", "€50.00"],
        ["In House Teeth Whitening", "€400.00"],
      ],
    },
    {
      title: "Crowns",
      items: [["Full Porcelain / Zirconia Crown", "€450.00"]],
    },
    {
      title: "Veneers",
      items: [
        ["Composite Veneers", "€120.00"],
        ["3D Printed Ceramic Resin Veneers", "€220.00"],
      ],
    },
    {
      title: "Implants",
      items: [
        ["Neodent Implant", "€1700.00"],
        ["Straumann Implant", "€1800.00"],
        ["Toronto Bridge with Neodent Implants", "€9000.00"],
        ["Toronto Bridge with Straumann Implants", "€10000.00"],
      ],
    },
    {
      title: "Surgery",
      items: [["Wisdom Tooth Surgical Extraction", "€300.00"]],
    },
  ];

  return (
    <>
      <PageHero
        image="/images/CT1.jpg"
        eyebrow="Transparent Fees"
        title="Price List"
        subtitle="A clear overview of common treatment fees at Apex Dental. Final costs may vary depending on complexity, materials, and the clinical pathway required."
      />

      <section className="bg-[#111111]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <a href="#home" className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/75 transition hover:text-white">
              ← Back to Home
            </a>
            <div className="mt-8">
              <SectionHeading
                eyebrow="Apex Dental Price List"
                title="Structured, premium, and easy to review"
                text="This page is designed to give patients a more transparent starting point before consultation. Exact fees can still vary depending on complexity, additional procedures, and the final treatment plan."
              />
              <p className="mt-8 text-base leading-8 text-[#D3D3D3]">
                Some implant and restorative treatments are highly case-dependent. For that reason, a consultation remains the best way to receive an accurate quotation tailored to the clinical situation.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/40">
            <img src="/images/CT2.jpg" alt="Apex Dental price list visual" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#141414] shadow-xl shadow-black/30">
                <div className="border-b border-white/10 px-6 py-5 sm:px-8">
                  <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                </div>
                <div className="px-6 py-2 sm:px-8">
                  {category.items.map(([name, price]) => (
                    <div key={name} className="flex items-center justify-between gap-4 border-b border-white/10 py-5 last:border-b-0">
                      <div className="text-base leading-7 text-[#E2E2E2]">{name}</div>
                      <div className="shrink-0 text-base font-semibold text-white">{price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">Please Note</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">Final costs can vary by case</h2>
            <p className="mt-6 text-base leading-8 text-[#D3D3D3]">
              A consultation allows us to assess diagnostics, materials, timing, and whether additional treatment stages are required before confirming the final fee.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="tel:79854037" className="rounded-full bg-[#C7A86B] px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:brightness-110">
              Call 79854037
            </a>
            <a href="#contact" className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-[#C7A86B]/40 hover:bg-white/5">
              Contact Clinic
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function HomePage({ services }) {
  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,12,12,0.58), rgba(12,12,12,0.86)), url(/images/H1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">Harley Street Inspired</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Private Dentistry,
              <br /> Refined for Malta.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#E0E0E0] sm:text-lg">
              A luxury dental experience with modern clinical workflows, aesthetic precision, and a calm premium environment designed to build confidence from first visit to final result.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="rounded-full bg-[#C7A86B] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:brightness-110">
                Book Consultation
              </a>
              <a href="#services-menu" className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-[#C7A86B]/40 hover:bg-white/5">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/30">
              <img src="/images/AB1.jpg" alt="Apex Dental about visual" className="h-56 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/30">
              <img src="/images/AB2.jpg" alt="Apex Dental about visual" className="h-56 w-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-xl shadow-black/20">
              <img src="/images/AB3.jpg" alt="Apex Dental about visual" className="h-60 w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="About Apex Dental"
              title="A more private, polished patient experience"
              text="Apex Dental combines advanced digital workflows with clinical expertise to deliver precise, predictable outcomes. The visual identity is intentionally calmer, more refined, and more in line with private-clinic aesthetics than template dentistry design."
            />
            <p className="mt-6 max-w-xl text-base leading-8 text-[#D3D3D3]">
              The aim is to create a website that feels elegant, trustworthy, and clinically serious while still being easy for patients to navigate. Each service now opens into its own detailed treatment page instead of sharing the same generic structure.
            </p>
          </div>
        </div>
      </section>

      <section id="services-menu" className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="rounded-[2rem] border border-[#C7A86B]/15 bg-[#141414] p-6 sm:p-8">
            <SectionHeading
              eyebrow="Services"
              title="Browse our treatment pages"
              text="Choose a service below to open a dedicated page with treatment information, benefits, steps, and frequently asked questions."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-5 transition hover:border-[#C7A86B]/40 hover:bg-white/[0.04]"
                >
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#C7A86B]">{service.eyebrow}</div>
                  <div className="mt-3 text-xl font-semibold text-white">{service.title}</div>
                  <div className="mt-4 text-sm uppercase tracking-[0.18em] text-white/45">Open page</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Selected Treatments"
            title="Clinical detail with a luxury presentation"
            text="Each treatment page is structured to feel cleaner, more informative, and more aligned with a private practice aesthetic."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#141414] transition hover:-translate-y-1 hover:border-[#C7A86B]/35"
              >
                <div className="h-56 overflow-hidden">
                  <img src={service.cardImage} alt={service.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-[#C7A86B]">{service.eyebrow}</span>
                    <span className="text-white/25">↗</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#D3D3D3]">{service.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-24 lg:grid-cols-[1.18fr_0.82fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/30">
            <img src="/images/H2.jpg" alt="Apex Dental featured image" className="h-full min-h-[440px] w-full object-cover" />
          </div>
          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-xl shadow-black/20">
              <img src="/images/H3.jpg" alt="Apex Dental secondary image" className="h-[210px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-xl shadow-black/20">
              <img src="/images/H4.jpg" alt="Apex Dental secondary image" className="h-[210px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {["/images/H5.jpg", "/images/H6.jpg", "/images/H7.jpg", "/images/H8.jpg", "/images/H9.jpg", "/images/H10.jpg"].map((img, index) => (
            <div key={img} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#151515] shadow-xl shadow-black/20">
              <img src={img} alt={`Apex Dental gallery ${index + 1}`} className="h-64 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-[#C7A86B]/20 bg-[#171717] shadow-2xl shadow-black/30">
            <img src="/images/CT1.jpg" alt="Apex Dental at Trident Park" className="h-72 w-full object-cover" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#141414] p-8 sm:p-10">
              <SectionHeading
                eyebrow="Contact Us"
                title="Visit Apex Dental at Trident Park"
                text="Apex Dental is located at Trident Park in Mrieħel, one of Malta’s best-known modern business destinations. The setting adds a more refined and professional arrival experience for patients, with a high-quality environment in the Central Business District."
              />

              <div className="mt-8 space-y-5 text-base leading-8 text-[#D3D3D3]">
                <p>
                  Trident Park is known for its premium office campus environment, combining contemporary design with landscaped outdoor areas and a polished business setting. For patients visiting the clinic, this means a location that feels accessible, modern, and professional from the moment they arrive.
                </p>
                <p>
                  The development occupies the site of the historic former Farsons Brewery and has been designed as a green office campus in Malta’s Central Business District, giving the area a distinctive blend of heritage and modern architectural quality.
                </p>
              </div>

              <div className="mt-10 space-y-5 text-base text-white/82">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Phone</div>
                  <a href="tel:79854037" className="mt-1 block text-lg text-white hover:text-[#C7A86B]">79854037</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Email</div>
                  <a href="mailto:info@apexdental.com.mt" className="mt-1 block text-lg text-white hover:text-[#C7A86B]">info@apexdental.com.mt</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Location</div>
                  <p className="mt-1 text-lg text-white">Trident Park, Mrieħel, Malta</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Trident Park</div>
                  <a href="https://tridentparkmalta.com/" target="_blank" rel="noreferrer" className="mt-1 inline-block text-lg text-white hover:text-[#C7A86B]">
                    Visit Trident Park website
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#141414] shadow-xl shadow-black/20">
                <img src="/images/CT2.jpg" alt="Trident Park location visual" className="h-56 w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#141414] shadow-xl shadow-black/20">
                <img src="/images/CT3.jpg" alt="Apex Dental exterior or entrance visual" className="h-56 w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#141414] p-8 sm:p-10">
            <div className="text-[11px] uppercase tracking-[0.42em] text-[#C7A86B]">Appointment Form</div>
            <h3 className="mt-4 text-3xl font-semibold text-white">Start Your Treatment Journey</h3>
            <p className="mt-4 text-base leading-8 text-[#D3D3D3]">
              Contact Apex Dental to book an appointment
