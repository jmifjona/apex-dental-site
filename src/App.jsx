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
  const cardImages = [];

  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), url(/images/H1.jpg)",
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
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
              Advanced dental care in Malta focused on aesthetics, function, and long-term results.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black">
                Book Consultation
              </a>
              <a href="#services" className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white">
                View Treatments
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
              <img src="/images/AB1.jpg" alt="Apex Dental about visual" className="h-64 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl shadow-black/20">
              <img src="/images/AB2.jpg" alt="Apex Dental about visual" className="h-44 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl shadow-black/20">
              <img src="/images/AB3.jpg" alt="Apex Dental about visual" className="h-56 w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="About Apex Dental"
              title="A more premium experience from first click to final treatment"
              text="Apex Dental combines advanced digital workflows with clinical expertise to deliver precise, predictable outcomes. The redesign uses stronger hierarchy, clearer treatment information, and dedicated pages for each service so patients understand what they are choosing and why it matters."
            />
            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
              The aim is simple: a website that feels refined, builds trust quickly, and explains treatments in a way patients can actually follow.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="Services"
            title="Explore each treatment in detail"
            text="Each card below opens a dedicated page with treatment information."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const displayImage = service.cardImage;
              return (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-[#00AEEF]/40"
                >
                  <div className="h-56 overflow-hidden">
                    <img src={displayImage} alt={service.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-[#00AEEF]">{service.eyebrow}</span>
                      <span className="text-white/25">↗</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-4 text-base leading-7 text-white/70">{service.subtitle}</p>
                    <div className="mt-6 text-sm uppercase tracking-[0.18em] text-white/45">Open treatment page</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
            <img src="/images/H2.jpg" alt="Apex Dental featured image" className="h-full min-h-[420px] w-full object-cover" />
          </div>
          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl shadow-black/20">
              <img src="/images/H3.jpg" alt="Apex Dental secondary image" className="h-[198px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl shadow-black/20">
              <img src="/images/H4.jpg" alt="Apex Dental secondary image" className="h-[198px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {['/images/H5.jpg','/images/H6.jpg','/images/H7.jpg','/images/H8.jpg','/images/H9.jpg','/images/H10.jpg'].map((img, index) => (
            <div key={img} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20">
              <img src={img} alt={`Apex Dental gallery ${index + 1}`} className="h-64 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
            <img src="/images/CT1.jpg" alt="Apex Dental at Trident Park" className="h-72 w-full object-cover" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <SectionHeading
                eyebrow="Contact Us"
                title="Visit Apex Dental at Trident Park"
                text="Apex Dental is located at Trident Park in Mrieħel, one of Malta’s best-known modern business destinations. The setting adds a more refined and professional arrival experience for patients, with a high-quality environment in the Central Business District."
              />

              <div className="mt-8 space-y-5 text-base leading-8 text-white/78">
                <p>
                  Trident Park is known for its premium office campus environment, combining contemporary design with landscaped outdoor areas and a polished business setting. For patients visiting the clinic, this means a location that feels accessible, modern, and professional from the moment they arrive.
                </p>
                <p>
                  The development occupies the site of the historic former Farsons Brewery and has been designed as a green office campus in Malta’s Central Business District. That gives the area a distinctive character, blending heritage, architecture, and a more elevated visitor experience.
                </p>
              </div>

              <div className="mt-10 space-y-5 text-base text-white/82">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/40">Phone</div>
                  <a href="tel:79854037" className="mt-1 block text-lg text-white ho
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
          {
            q: "Are implants painful?",
            a: "Treatment is carried out with local anaesthesia, and many patients report that implant placement feels easier than expected. Mild soreness afterwards is normal and usually manageable.",
          },
          {
            q: "How long do implants last?",
            a: "With good planning, proper maintenance, and healthy gums, implants can last for many years.",
          },
          {
            q: "Can I replace all my teeth with implants?",
            a: "Yes. In suitable cases, implants can support larger bridges or full-arch restorations.",
          },
        ],
      },
      {
        slug: "veneers",
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
          "Veneers are thin custom-made coverings bonded to the front surface of the teeth. They are commonly used to improve colour, shape, proportion, and the overall harmony of the smile.",
        forWho:
          "This treatment is well suited for patients looking for a cosmetic improvement with a natural, elegant finish.",
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
          "Creation of bespoke veneers in the chosen material",
          "Careful fitting, bonding, and review of the final result",
        ],
        faqs: [
          {
            q: "Do veneers look natural?",
            a: "Yes. When properly designed, veneers can look extremely natural.",
          },
          {
            q: "Do all teeth need veneers?",
            a: "Not always. Some patients need only a few veneers, while others choose a broader smile makeover.",
          },
          {
            q: "Are veneers permanent?",
            a: "They are considered a long-term treatment.",
          },
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
        eyebrow: "Brighter Smile Treatment",
        subtitle: "Professional whitening designed to lift stains safely and deliver a cleaner, fresher smile.",
        intro:
          "Teeth whitening is a cosmetic treatment used to reduce staining and lighten the natural shade of the teeth.",
        forWho:
          "It is suitable for many patients with healthy teeth and gums, particularly when staining comes from coffee, tea, wine, smoking, or age-related darkening.",
        benefits: [
          "Noticeably brighter smile with a non-invasive treatment",
          "Safer and more controlled than over-the-counter products",
          "Evener results using professional-grade systems",
          "Can be combined with hygiene visits or smile makeovers",
        ],
        steps: [
          "Clinical assessment of tooth shade and suitability",
          "Selection of the best whitening protocol",
          "Professional treatment carried out under supervision",
          "Review of progress and advice on maintenance",
          "Guidance on how to keep results looking fresh for longer",
        ],
        faqs: [
          {
            q: "Does whitening damage the teeth?",
            a: "When properly prescribed and supervised, professional whitening is considered safe.",
          },
          {
            q: "Will fillings and crowns also whiten?",
            a: "No. Whitening changes the natural tooth shade but does not alter the colour of existing restorations.",
          },
          {
            q: "How long do results last?",
            a: "Results vary depending on diet, habits, and oral hygiene.",
          },
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
          "Crowns and bridges are restorative treatments used to rebuild teeth and restore the bite.",
        forWho:
          "These treatments are appropriate when teeth are weakened by decay, fracture, large fillings, or root canal treatment.",
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
          {
            q: "When is a crown better than a filling?",
            a: "A crown is often preferred when a tooth is too weak for a regular filling to last predictably.",
          },
          {
            q: "Can a bridge replace a missing tooth without an implant?",
            a: "Yes. A conventional bridge can use adjacent teeth for support.",
          },
          {
            q: "Do crowns look natural?",
            a: "Modern crowns can be highly aesthetic when designed well.",
          },
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
          "Root canal treatment is performed when the inside of the tooth becomes inflamed or infected.",
        forWho:
          "It is commonly recommended for teeth causing severe pain, sensitivity, swelling, or infection.",
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
          {
            q: "Is root canal treatment painful?",
            a: "Modern root canal treatment is carried out with anaesthesia and is designed to remove pain.",
          },
          {
            q: "Will the tooth need a crown afterwards?",
            a: "Many root canal treated teeth benefit from a crown, especially back teeth.",
          },
          {
            q: "Why not just remove the tooth?",
            a: "Whenever possible, preserving the natural tooth is often the better biological and functional option.",
          },
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
        subtitle: "Discreet, carefully planned tooth movement for a straighter, more balanced smile.",
        intro:
          "Orthodontic treatment is used to improve tooth position, bite relationships, and smile alignment.",
        forWho:
          "This is suitable for patients with crowding, spacing, mild to moderate bite issues, or those seeking a straighter smile.",
        benefits: [
          "Improves smile alignment and visual symmetry",
          "Can support better cleaning and oral hygiene access",
          "Clear aligners are discreet and removable",
          "Treatment is digitally planned for controlled tooth movement",
        ],
        steps: [
          "Initial consultation and orthodontic assessment",
          "Scans, records, and planning of tooth movement",
          "Approval of the treatment setup",
          "Progress through aligners or the chosen orthodontic system",
          "Retention phase to maintain the final result",
        ],
        faqs: [
          {
            q: "Are clear aligners suitable for everyone?",
            a: "Not every case is the same. Many patients are good candidates.",
          },
          {
            q: "Do aligners have to be worn all day?",
            a: "For best results, aligners are usually worn for most of the day.",
          },
          {
            q: "How long does treatment take?",
            a: "Treatment time varies depending on the complexity of the case.",
          },
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
          {
            q: "What counts as a dental emergency?",
            a: "Severe pain, swelling, infection, broken teeth, knocked teeth, trauma, or significant bleeding can all count as emergencies.",
          },
          {
            q: "Should I wait if the pain improves?",
            a: "Not always. Some infections or tooth problems can flare again or worsen.",
          },
          {
            q: "What should I do before I arrive?",
            a: "Keep the area as clean as possible, avoid chewing on the affected side, and contact the clinic promptly.",
          },
        ],
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
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00AEEF]/30 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <img src="/images/orislogo.png" alt="Apex Dental logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.35em] uppercase text-white">Apex Dental</div>
              <div className="text-[10px] tracking-[0.3em] text-[#00AEEF]">Advanced Dentistry Malta</div>
            </div>
          </a>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 px-6 xl:gap-10">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-xs uppercase tracking-[0.28em] text-white/60 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <div className="h-5 w-px bg-white/10" />
            {services.map((service) => (
              <a key={service.slug} href={`#${service.slug}`} className="text-xs uppercase tracking-[0.22em] text-white/40 transition hover:text-white">
                {service.navLabel}
              </a>
            ))}
          </nav>

          <a href="#contact" className="rounded-full border border-[#00AEEF]/60 px-6 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-[#00AEEF]/10">
            Book Consultation
          </a>
        </div>
      </header>

      <main>{currentService ? <ServicePage service={currentService} /> : <HomePage services={services} />}</main>

      <footer className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Apex Dental. All rights reserved.</p>
          <div className="flex flex-wrap gap-5 uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-white">Home</a>
            {services.map((service) => (
              <a key={service.slug} href={`#${service.slug}`} className="hover:text-white">
                {service.navLabel}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
