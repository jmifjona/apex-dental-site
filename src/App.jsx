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
              {service.slug === "implants" ? (
                <div className="mt-8 space-y-6">
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    Dental implants in Malta are one of the most reliable solutions for replacing missing teeth. At Apex Dental, implant planning is approached with a strong focus on precision, long-term stability, and restorative quality so the final result looks natural and functions confidently.
                  </p>
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    We work with premium implant solutions such as Neodent and Straumann, supported by digital planning and a more personalised consultation process. This helps patients understand the differences between treatment options, materials, and the long-term restorative pathway before making a decision.
                  </p>
                </div>
              ) : null}
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

function SEOManager({ route, currentService }) {
  useEffect(() => {
    const meta = {
      home: {
        title: "Dentist in Malta | Apex Dental",
        description:
          "Private dental clinic in Malta offering implants, cosmetic dentistry, clear aligners, root canal treatment, and emergency dental care.",
        keywords:
          "dentist malta, dental clinic malta, private dentist malta, apex dental malta",
      },
      implants: {
        title: "Dental Implants Malta | Apex Dental",
        description:
          "Premium dental implants in Malta with digital planning and advanced restorative solutions. Book your consultation at Apex Dental.",
        keywords:
          "dental implants malta, implant dentist malta, neodent malta, straumann malta",
      },
      cosmetic: {
        title: "Cosmetic Dentistry Malta | Apex Dental",
        description:
          "Cosmetic dentistry in Malta including veneers, smile design, and whitening with a refined private-clinic approach.",
        keywords:
          "cosmetic dentistry malta, veneers malta, smile design malta, teeth whitening malta",
      },
      aligners: {
        title: "Clear Aligners Malta | Apex Dental",
        description:
          "Clear aligners in Malta for discreet orthodontic treatment with digital planning and a premium patient experience.",
        keywords:
          "clear aligners malta, invisalign malta, orthodontics malta, teeth straightening malta",
      },
      "crowns-bridges": {
        title: "Crowns and Bridges Malta | Apex Dental",
        description:
          "Crowns and bridges in Malta to restore damaged or missing teeth with functional and aesthetic results.",
        keywords:
          "crowns malta, bridges malta, zirconia crowns malta, restorative dentistry malta",
      },
      "root-canal": {
        title: "Root Canal Treatment Malta | Apex Dental",
        description:
          "Root canal treatment in Malta focused on relieving pain, removing infection, and preserving the natural tooth.",
        keywords:
          "root canal malta, endodontic treatment malta, tooth pain malta",
      },
      orthodontics: {
        title: "Orthodontics Malta | Apex Dental",
        description:
          "Orthodontic treatment in Malta for smile alignment, bite improvement, and controlled tooth movement.",
        keywords:
          "orthodontics malta, braces malta, aligners malta, smile alignment malta",
      },
      emergency: {
        title: "Emergency Dentist Malta | Apex Dental",
        description:
          "Emergency dentist in Malta for urgent appointments, toothache, swelling, trauma, and broken teeth.",
        keywords:
          "emergency dentist malta, urgent dental care malta, toothache malta",
      },
      "price-list": {
        title: "Dental Price List Malta | Apex Dental",
        description:
          "View the Apex Dental price list in Malta for common treatments including implants, veneers, whitening, and surgery.",
        keywords:
          "dental price list malta, implant prices malta, veneers prices malta",
      },
      contact: {
        title: "Contact Apex Dental | Trident Park Malta",
        description:
          "Contact Apex Dental at Trident Park, Mrieħel, Malta. Book an appointment or plan your visit to our private clinic.",
        keywords:
          "apex dental contact, trident park dentist, dentist mriehel malta",
      },
    };

    const key = route === "home" ? "home" : route === "contact" ? "contact" : currentService?.slug || "home";
    const data = meta[key] || meta.home;

    document.title = data.title;

    const setMeta = (name, content, attribute = "name") => {
      let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", data.description);
    setMeta("keywords", data.keywords);
    setMeta("og:title", data.title, "property");
    setMeta("og:description", data.description, "property");
    setMeta("og:type", "website", "property");
  }, [route, currentService]);

  return null;
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

      <section className="border-t border-white/10 bg-[#0C0C0C]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="rounded-[2rem] border border-[#C7A86B]/15 bg-[#141414] p-8 sm:p-10">
            <SectionHeading
              eyebrow="Private Dental Clinic in Malta"
              title="Modern dentistry with strong local roots"
              text="Apex Dental is a private dental clinic in Malta located at Trident Park, Mrieħel. We provide advanced implant dentistry, cosmetic dentistry, clear aligners, restorative treatment, and emergency care for patients seeking a more refined clinical experience."
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <p className="text-base leading-8 text-[#D3D3D3]">
                Patients visiting Apex Dental benefit from a combination of modern digital workflows, careful treatment planning, and a premium private-practice environment in Malta’s Central Business District. The aim is to deliver treatment that feels calm, well-explained, and clinically precise.
              </p>
              <p className="text-base leading-8 text-[#D3D3D3]">
                Whether you are looking for dental implants in Malta, cosmetic dentistry, clear aligners, or emergency dental treatment, the website is now structured to make each service easier to understand and compare before you book.
              </p>
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
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Clinic</div>
                  <p className="mt-1 text-lg text-white">Apex Dental</p>
                </div>
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
              Contact Apex Dental to book an appointment, ask a question, or plan your visit to the clinic at Trident Park.
            </p>
            <form className="mt-8 space-y-4">
              <input type="text" placeholder="Full Name" className="w-full rounded-2xl border border-white/10 bg-[#191919] px-5 py-4 text-white placeholder:text-white/35 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full rounded-2xl border border-white/10 bg-[#191919] px-5 py-4 text-white placeholder:text-white/35 outline-none" />
              <input type="email" placeholder="Email Address" className="w-full rounded-2xl border border-white/10 bg-[#191919] px-5 py-4 text-white placeholder:text-white/35 outline-none" />
              <textarea rows={5} placeholder="Tell us how we can help" className="w-full rounded-2xl border border-white/10 bg-[#191919] px-5 py-4 text-white placeholder:text-white/35 outline-none" />
              <button type="button" className="w-full rounded-full bg-[#C7A86B] px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:brightness-110">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ApexDentalLuxuryWebsite() {
  const services = useMemo(
    () => [
      {
        slug: "implants",
        navLabel: "Implants",
        title: "Dental Implants",
        shortTitle: "Implants",
        cardImage: "/images/I4.jpg",
        heroImage: "/images/I1.jpg",
        pageImage: "/images/I2.jpg",
        sectionImage: "/images/I3.jpg",
        faqImage: "/images/I4.jpg",
        eyebrow: "Advanced Tooth Replacement",
        subtitle: "Fixed, natural-looking solutions designed for strength, function, and long-term confidence.",
        intro:
          "Dental implants are artificial tooth roots, usually made from titanium, that are placed into the jawbone to support crowns, bridges, or full-arch restorations. They are one of the most reliable ways to replace missing teeth because they restore both appearance and function while helping preserve the bone underneath.",
        forWho:
          "Implants are ideal for patients with one missing tooth, several missing teeth, or those looking for a stable alternative to removable dentures. Suitability depends on bone quality, general oral health, and the overall treatment plan.",
        benefits: [
          "Natural appearance and strong biting function",
          "Does not rely on neighbouring teeth for support",
          "Helps preserve jawbone volume over time",
          "Can support single teeth, bridges, or full-arch restorations",
        ],
        steps: [
          "Consultation, scans, and detailed assessment",
          "Digital planning of implant position and restorative outcome",
          "Implant placement with a precise surgical approach",
          "Healing period and preparation of the final restoration",
          "Delivery of the crown, bridge, or implant-supported prosthesis",
        ],
        faqs: [
          { q: "Are implants painful?", a: "Treatment is carried out with local anaesthesia, and many patients report that implant placement feels easier than expected. Mild soreness afterwards is normal and usually manageable." },
          { q: "How long do implants last?", a: "With good planning, proper maintenance, and healthy gums, implants can last for many years." },
          { q: "Can I replace all my teeth with implants?", a: "Yes. In suitable cases, implants can support larger bridges or full-arch restorations." },
        ],
      },
      {
        slug: "cosmetic",
        navLabel: "Cosmetic",
        title: "Cosmetic Dentistry",
        shortTitle: "Cosmetic Dentistry",
        cardImage: "/images/C1.jpg",
        heroImage: "/images/C1.jpg",
        pageImage: "/images/C2.jpg",
        sectionImage: "/images/C3.jpg",
        faqImage: "/images/C4.jpg",
        eyebrow: "Aesthetic Smile Enhancement",
        subtitle: "Refined cosmetic treatment for patients who want a brighter, more balanced, more confident smile.",
        intro:
          "Cosmetic dentistry focuses on improving colour, shape, symmetry, and overall smile harmony. Treatments may include veneers, whitening, and smile design planning tailored to the patient’s features and aesthetic goals.",
        forWho:
          "This treatment pathway is suited to patients seeking a more polished smile, whether through subtle refinement or a more comprehensive aesthetic transformation.",
        benefits: [
          "Improves colour, shape, and overall smile symmetry",
          "Can create a brighter result than whitening alone",
          "Custom designed to suit facial features and smile line",
          "Natural-looking finish with durable modern materials",
        ],
        steps: [
          "Clinical consultation and smile assessment",
          "Planning of shape, proportion, and final aesthetic goals",
          "Preparation where needed and impression or digital scan",
          "Creation of bespoke restorations or cosmetic enhancements",
          "Careful fitting, review, and refinement of the final result",
        ],
        faqs: [
          { q: "Do cosmetic restorations look natural?", a: "Yes. When properly designed, modern cosmetic dentistry can look extremely natural and well-balanced." },
          { q: "Do all teeth need treatment?", a: "Not always. Some patients need only a few teeth treated, while others choose a broader smile makeover." },
          { q: "How long do cosmetic results last?", a: "Longevity depends on the treatment type, the bite, maintenance, and general oral habits." },
        ],
      },
      {
        slug: "aligners",
        navLabel: "Aligners",
        title: "Clear Aligners",
        shortTitle: "Aligners",
        cardImage: "/images/A1.jpg",
        heroImage: "/images/A1.jpg",
        pageImage: "/images/A2.jpg",
        sectionImage: "/images/A3.jpg",
        faqImage: "/images/A4.jpg",
        eyebrow: "Discreet Orthodontics",
        subtitle: "Modern aligner treatment designed for discreet, comfortable tooth movement.",
        intro:
          "Clear aligners straighten teeth using a planned sequence of transparent trays. They offer a removable and discreet orthodontic option for patients seeking a more aesthetic treatment experience.",
        forWho:
          "This treatment is suitable for patients with crowding, spacing, mild to moderate bite issues, or those who want a straighter smile with minimal visual impact during treatment.",
        benefits: [
          "Discreet appearance during treatment",
          "Comfortable removable trays",
          "Digitally planned tooth movement",
          "Supports a more convenient lifestyle than fixed braces for many patients",
        ],
        steps: [
          "Consultation and orthodontic assessment",
          "Digital scan and treatment planning",
          "Approval of the aligner setup",
          "Progress through each aligner stage",
          "Retention to maintain the final result",
        ],
        faqs: [
          { q: "Are aligners suitable for everyone?", a: "Not every case is the same. Many patients are suitable, while others may need a different orthodontic approach." },
          { q: "Do aligners have to be worn all day?", a: "For best results, aligners are usually worn for most of the day and removed mainly for eating and cleaning." },
          { q: "How long does treatment take?", a: "Treatment time varies depending on complexity, tooth movement goals, and compliance." },
        ],
      },
      {
        slug: "crowns-bridges",
        navLabel: "Crowns & Bridges",
        title: "Crowns and Bridges",
        shortTitle: "Crowns & Bridges",
        cardImage: "/images/H9.jpg",
        heroImage: "/images/H9.jpg",
        pageImage: "/images/C2.jpg",
        sectionImage: "/images/C3.jpg",
        faqImage: "/images/C4.jpg",
        eyebrow: "Restorative Dentistry",
        subtitle: "Functional, aesthetic solutions for damaged, weakened, or missing teeth.",
        intro:
          "Crowns and bridges are restorative treatments used to rebuild teeth and restore the bite. They can improve function, reinforce weakened teeth, and provide a more complete smile.",
        forWho:
          "These treatments are appropriate when teeth are weakened by decay, fracture, large fillings, or root canal treatment, or when fixed replacement of missing teeth is needed.",
        benefits: [
          "Restores shape, strength, and appearance",
          "Protects weakened teeth from further breakdown",
          "Helps re-establish normal chewing and bite support",
          "Can replace missing teeth with a fixed restorative option",
        ],
        steps: [
          "Clinical examination and assessment of the affected teeth",
          "Preparation of the tooth or support structures",
          "Digital scan or impression for accurate fit",
          "Fabrication of the final crown or bridge",
          "Fit check, cementation, and bite refinement",
        ],
        faqs: [
          { q: "When is a crown better than a filling?", a: "A crown is often preferred when a tooth is too weak for a regular filling to last predictably." },
          { q: "Can a bridge replace a missing tooth without an implant?", a: "Yes. A conventional bridge can use adjacent teeth for support if the overall case is suitable." },
          { q: "Do crowns look natural?", a: "Modern crowns can be highly aesthetic when designed with the right materials and shade planning." },
        ],
      },
      {
        slug: "root-canal",
        navLabel: "Root Canal",
        title: "Root Canal Treatment",
        shortTitle: "Root Canal",
        cardImage: "/images/H10.jpg",
        heroImage: "/images/H10.jpg",
        pageImage: "/images/C2.jpg",
        sectionImage: "/images/C3.jpg",
        faqImage: "/images/C4.jpg",
        eyebrow: "Tooth Preservation",
        subtitle: "Treatment focused on removing infection, relieving pain, and helping save the natural tooth.",
        intro:
          "Root canal treatment is performed when the inside of the tooth becomes inflamed or infected. The aim is to remove infection, relieve discomfort, and preserve the tooth where possible.",
        forWho:
          "It is commonly recommended for teeth causing severe pain, sensitivity, swelling, infection, or where the nerve has become compromised by decay or trauma.",
        benefits: [
          "Relieves pain caused by pulpal inflammation or infection",
          "Helps save the natural tooth instead of removing it",
          "Allows the tooth to remain in function after restoration",
          "Can prevent the spread of dental infection when managed promptly",
        ],
        steps: [
          "Assessment, radiographs, and diagnosis",
          "Comfortable local anaesthesia and isolation of the tooth",
          "Cleaning and shaping of the root canal system",
          "Disinfection and sealing of the canals",
          "Definitive restoration, often with a crown where indicated",
        ],
        faqs: [
          { q: "Is root canal treatment painful?", a: "Modern root canal treatment is carried out with anaesthesia and is designed to remove pain, not create it." },
          { q: "Will the tooth need a crown afterwards?", a: "Many root canal treated teeth benefit from a crown, especially back teeth where strength matters more." },
          { q: "Why not just remove the tooth?", a: "Whenever possible, preserving the natural tooth is often the better biological and functional option." },
        ],
      },
      {
        slug: "orthodontics",
        navLabel: "Orthodontics",
        title: "Orthodontics",
        shortTitle: "Orthodontics",
        cardImage: "/images/A4.jpg",
        heroImage: "/images/A1.jpg",
        pageImage: "/images/A2.jpg",
        sectionImage: "/images/A3.jpg",
        faqImage: "/images/A4.jpg",
        eyebrow: "Smile Alignment",
        subtitle: "Straightening treatment planned for balance, function, and aesthetics.",
        intro:
          "Orthodontic treatment is used to improve tooth position, bite relationships, and smile alignment. It can support aesthetics, function, and oral hygiene access.",
        forWho:
          "This is suitable for patients with crowding, spacing, bite concerns, or those seeking a straighter smile with a more balanced appearance.",
        benefits: [
          "Improves smile alignment and visual symmetry",
          "Can support better cleaning and oral hygiene access",
          "Multiple treatment options depending on the case",
          "Treatment is digitally planned for controlled movement",
        ],
        steps: [
          "Initial consultation and orthodontic assessment",
          "Scans, records, and planning of tooth movement",
          "Approval of the treatment setup",
          "Progress through the chosen orthodontic system",
          "Retention phase to maintain the final result",
        ],
        faqs: [
          { q: "Is orthodontic treatment only cosmetic?", a: "No. Orthodontics can also improve function, spacing, and bite relationships depending on the case." },
          { q: "How long does orthodontic treatment take?", a: "Timing depends on the complexity of the movement required and the treatment system used." },
          { q: "Will I need retainers afterwards?", a: "Yes. Retention is a key stage of treatment to help maintain the final result." },
        ],
      },
      {
        slug: "emergency",
        navLabel: "Emergency",
        title: "Emergency Dental Care",
        shortTitle: "Emergency",
        cardImage: "/images/CT3.jpg",
        heroImage: "/images/CT1.jpg",
        pageImage: "/images/CT2.jpg",
        sectionImage: "/images/CT3.jpg",
        faqImage: "/images/CT1.jpg",
        eyebrow: "Urgent Appointments",
        subtitle: "Fast access for dental pain, swelling, trauma, and urgent treatment needs.",
        intro:
          "Emergency dental care is for situations that need prompt attention, including severe toothache, swelling, infection, broken teeth, lost restorations, and dental trauma.",
        forWho:
          "Patients with sudden dental pain, facial swelling, accidents affecting the teeth, or urgent problems that cannot reasonably wait for a routine appointment should seek an assessment as soon as possible.",
        benefits: [
          "Rapid assessment of the urgent problem",
          "Pain relief and infection management where needed",
          "Fast planning of the next treatment step",
          "Support for trauma, broken teeth, and failed restorations",
        ],
        steps: [
          "Initial urgent assessment",
          "Diagnosis of the source of pain or damage",
          "Immediate relief and stabilisation",
          "Advice on what happens next",
          "Follow-up treatment where necessary",
        ],
        faqs: [
          { q: "What counts as a dental emergency?", a: "Severe pain, swelling, infection, broken teeth, knocked teeth, trauma, or significant bleeding can all count as emergencies." },
          { q: "Should I wait if the pain improves?", a: "Not always. Some infections or tooth problems can flare again or worsen." },
          { q: "What should I do before I arrive?", a: "Keep the area as clean as possible, avoid chewing on the affected side, and contact the clinic promptly." },
        ],
      },
      {
        slug: "price-list",
        navLabel: "Price List",
        title: "Price List",
        shortTitle: "Price List",
        cardImage: "/images/CT1.jpg",
        heroImage: "/images/CT1.jpg",
        pageImage: "/images/CT2.jpg",
        sectionImage: "/images/CT3.jpg",
        faqImage: "/images/CT1.jpg",
        eyebrow: "Transparent Fees",
        subtitle: "A structured overview of common treatment fees at Apex Dental.",
        intro: "Browse our current treatment fees.",
        forWho: "A consultation is always recommended for an exact quote.",
        benefits: [],
        steps: [],
        faqs: [],
      },
    ],
    []
  );

  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "home";
    return window.location.hash.replace("#", "") || "home";
  });

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const currentService = services.find((service) => service.slug === route);

  const navigation = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services-menu" },
    { label: "Price List", href: "#price-list" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#C7A86B]/30 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <img src="/images/orislogo.png" alt="Apex Dental logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.35em] uppercase text-white">Apex Dental</div>
              <div className="text-[10px] tracking-[0.32em] text-[#C7A86B]">Private Dentistry Malta</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-xs uppercase tracking-[0.28em] text-white/65 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="rounded-full border border-[#C7A86B]/60 px-6 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-[#C7A86B]/10">
            Book Consultation
          </a>
        </div>
      </header>

      <SEOManager route={route} currentService={currentService} />

      <main>
        {route === "price-list" ? <PriceListPage /> : currentService ? <ServicePage service={currentService} /> : <HomePage services={services} />}
      </main>

      <footer className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Apex Dental. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 uppercase tracking-[0.2em]">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
