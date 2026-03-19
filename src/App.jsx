import { useEffect, useMemo, useState } from "react";

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {text ? <p className="mt-6 text-base leading-8 text-white/72">{text}</p> : null}
    </div>
  );
}

function ServicePage({ service }) {
  return (
    <>
      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,10,0.68), rgba(10,10,10,0.82)), url(${service.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-end px-6 py-20 lg:px-10">
          <div className="max-w-4xl">
            <a
              href="#home"
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
            >
              ← Back to Home
            </a>
            <p className="mt-8 text-xs uppercase tracking-[0.42em] text-[#00AEEF]">{service.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">{service.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Treatment Overview"
              title={`Understanding ${service.shortTitle}`}
              text={service.intro}
            />
            <p className="mt-8 text-base leading-8 text-white/72">{service.forWho}</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
            <img src={service.pageImage} alt={service.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30 lg:order-2">
            <img src={service.sectionImage} alt={`${service.title} supporting visual`} className="h-full w-full object-cover" />
          </div>
          <div className="lg:order-1">
            <SectionHeading
              eyebrow="Why Patients Choose This Treatment"
              title={`Benefits of ${service.shortTitle}`}
              text="A premium treatment page should explain the value of the procedure and what it can realistically achieve."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-base leading-8 text-white/78"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Treatment Journey"
            title={`What to expect with ${service.shortTitle}`}
            text="Explaining the process helps patients feel more informed and more comfortable before they even book."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {service.steps.map((step, index) => (
              <div key={step} className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-[#00AEEF]">Step {index + 1}</div>
                <p className="mt-4 text-base leading-8 text-white/78">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title={`${service.shortTitle} FAQs`}
              text="Clear answers remove hesitation and make the website feel genuinely useful."
            />
            <div className="mt-12 space-y-5">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
                  <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
            <img src={service.faqImage} alt={`${service.title} page visual`} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.40em] text-[#00AEEF]">Book a Consultation</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Discuss your {service.shortTitle.toLowerCase()} treatment with Apex Dental
            </h2>
            <p className="mt-6 text-base leading-8 text-white/72">
              The next step is a consultation, assessment, and a tailored treatment plan based on your clinical needs and aesthetic goals.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:79854037"
              className="rounded-full bg-white px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
            >
              Call 79854037
            </a>
            <a
              href="mailto:info@apexdental.com.mt"
              className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Email Clinic
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function HomePage({ services }) {
  const cardImages = [
    "/images/A1.jpg",
    "/images/A2.jpg",
    "/images/A3.jpg",
    "/images/A4.jpg",
    "/images/C1.jpg",
    "/images/C2.jpg",
    "/images/C3.jpg",
  ];

  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), u
