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

function SEOManager({ route, currentService }) {
  useEffect(() => {
    const baseUrl = "https://apexdental.com.mt";
    const meta = {
      home: {
        title: "Dentist in Malta | Apex Dental",
        description:
          "Private dental clinic in Malta offering implants, cosmetic dentistry, clear aligners, root canal treatment, and emergency dental care.",
        keywords: "dentist malta, dental clinic malta, private dentist malta, apex dental malta",
        path: "/",
      },
      implants: {
        title: "Dental Implants Malta | Apex Dental",
        description:
          "Premium dental implants in Malta with digital planning and advanced restorative solutions. Book your consultation at Apex Dental.",
        keywords: "dental implants malta, implant dentist malta, neodent malta, straumann malta",
        path: "/dental-implants-malta",
      },
      cosmetic: {
        title: "Cosmetic Dentistry Malta | Apex Dental",
        description:
          "Cosmetic dentistry in Malta including veneers, smile design, and whitening with a refined private-clinic approach.",
        keywords: "cosmetic dentistry malta, veneers malta, smile design malta, teeth whitening malta",
        path: "/cosmetic-dentistry-malta",
      },
      aligners: {
        title: "Clear Aligners Malta | Apex Dental",
        description:
          "Clear aligners in Malta for discreet orthodontic treatment with digital planning and a premium patient experience.",
        keywords: "clear aligners malta, invisalign malta, orthodontics malta, teeth straightening malta",
        path: "/clear-aligners-malta",
      },
      "crowns-bridges": {
        title: "Crowns and Bridges Malta | Apex Dental",
        description:
          "Crowns and bridges in Malta to restore damaged or missing teeth with functional and aesthetic results.",
        keywords: "crowns malta, bridges malta, zirconia crowns malta, restorative dentistry malta",
        path: "/crowns-and-bridges-malta",
      },
      "root-canal": {
        title: "Root Canal Treatment Malta | Apex Dental",
        description:
          "Root canal treatment in Malta focused on relieving pain, removing infection, and preserving the natural tooth.",
        keywords: "root canal malta, endodontic treatment malta, tooth pain malta",
        path: "/root-canal-treatment-malta",
      },
      orthodontics: {
        title: "Orthodontics Malta | Apex Dental",
        description:
          "Orthodontic treatment in Malta for smile alignment, bite improvement, and controlled tooth movement.",
        keywords: "orthodontics malta, braces malta, aligners malta, smile alignment malta",
        path: "/orthodontics-malta",
      },
      emergency: {
        title: "Emergency Dentist Malta | Apex Dental",
        description:
          "Emergency dentist in Malta for urgent appointments, toothache, swelling, trauma, and broken teeth.",
        keywords: "emergency dentist malta, urgent dental care malta, toothache malta",
        path: "/emergency-dentist-malta",
      },
      "price-list": {
        title: "Dental Price List Malta | Apex Dental",
        description:
          "View the Apex Dental price list in Malta for common treatments including implants, veneers, whitening, and surgery.",
        keywords: "dental price list malta, implant prices malta, veneers prices malta",
        path: "/price-list",
      },
      contact: {
        title: "Contact Apex Dental | Trident Park Malta",
        description:
          "Contact Apex Dental at Trident Park, Mrieħel, Malta. Book an appointment or plan your visit to our private clinic.",
        keywords: "apex dental contact, trident park dentist, dentist mriehel malta",
        path: "/contact",
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

    const setLink = (rel, href) => {
      let tag = document.head.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    setMeta("description", data.description);
    setMeta("keywords", data.keywords);
    setMeta("robots", "index, follow");
    setMeta("og:title", data.title, "property");
    setMeta("og:description", data.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", `${baseUrl}${data.path}`, "property");
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", data.title, "name");
    setMeta("twitter:description", data.description, "name");
    setLink("canonical", `${baseUrl}${data.path}`);

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "Apex Dental",
      telephone: "+35679854037",
      email: "info@apexdental.com.mt",
      url: baseUrl,
      image: `${baseUrl}/images/CT1.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Trident Park",
        addressLocality: "Mriehel",
        addressCountry: "MT",
      },
      areaServed: "Malta",
      medicalSpecialty: ["Dentistry", "Cosmetic Dentistry", "Orthodontics", "Implantology"],
    };

    const schemaItems = [localBusinessSchema];

    if (currentService && currentService.slug !== "price-list") {
      schemaItems.push({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: currentService.title,
        provider: {
          "@type": "Dentist",
          name: "Apex Dental",
          url: baseUrl,
        },
        areaServed: "Malta",
        description: currentService.subtitle,
      });

      if (currentService.faqs?.length) {
        schemaItems.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: currentService.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        });
      }
    }

    let schemaTag = document.head.querySelector('script[data-apex-schema="true"]');
    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.setAttribute("type", "application/ld+json");
      schemaTag.setAttribute("data-apex-schema", "true");
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(schemaItems);
  }, [route, currentService]);

  return null;
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
              <SectionHeading eyebrow="Treatment Overview" title={`Understanding ${service.shortTitle}`} text={service.intro} />
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
              {service.slug === "cosmetic" ? (
                <div className="mt-8 space-y-6">
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    Cosmetic dentistry in Malta often involves more than simply whitening teeth. It is about smile proportions, tooth shape, facial balance, and selecting the right treatment combination to create results that look polished rather than artificial.
                  </p>
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    At Apex Dental, cosmetic consultations are structured to help patients compare options such as veneers, whitening, and broader smile design planning in a more informed and clinically grounded way.
                  </p>
                </div>
              ) : null}
              {service.slug === "aligners" ? (
                <div className="mt-8 space-y-6">
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    Clear aligners in Malta are increasingly popular for patients who want straighter teeth without the appearance of traditional braces. Digital treatment planning helps map each stage of movement before treatment begins.
                  </p>
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    This approach is especially attractive for adults and professionals looking for a more discreet orthodontic option while still benefiting from structured clinical oversight.
                  </p>
                </div>
              ) : null}
              {service.slug === "emergency" ? (
                <div className="mt-8 space-y-6">
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    Patients searching for an emergency dentist in Malta are often dealing with pain, swelling, trauma, or a failed restoration that needs fast attention. The page is designed to make urgent care clearer and easier to access.
                  </p>
                  <p className="text-base leading-8 text-[#D3D3D3]">
                    Prompt assessment can make a major difference to comfort, treatment options, and overall recovery, especially in cases involving infection or dental injury.
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
            <div className="mt-10 grid gap-5 md:grid-colfunction SEOManager({ route, currentService }) {
  useEffect(() => {
    const baseUrl = "https://apexdental.com.mt";
    const routes = {
      home: {
        title: "Dentist in Malta | Apex Dental",
        description:
          "Private dental clinic in Malta offering implants, cosmetic dentistry, clear aligners, root canal treatment, and emergency dental care.",
        keywords:
          "dentist malta, dental clinic malta, private dentist malta, apex dental malta",
        path: "/",
      },
      implants: {
        title: "Dental Implants Malta | Apex Dental",
        description:
          "Premium dental implants in Malta with digital planning and advanced restorative solutions. Book your consultation at Apex Dental.",
        keywords:
          "dental implants malta, implant dentist malta, neodent malta, straumann malta",
        path: "/dental-implants-malta",
      },
      cosmetic: {
        title: "Cosmetic Dentistry Malta | Apex Dental",
        description:
          "Cosmetic dentistry in Malta including veneers, smile design, and whitening with a refined private-clinic approach.",
        keywords:
          "cosmetic dentistry malta, veneers malta, smile design malta, teeth whitening malta",
        path: "/cosmetic-dentistry-malta",
      },
      aligners: {
        title: "Clear Aligners Malta | Apex Dental",
        description:
          "Clear aligners in Malta for discreet orthodontic treatment with digital planning and a premium patient experience.",
        keywords:
          "clear aligners malta, invisalign malta, orthodontics malta, teeth straightening malta",
        path: "/clear-aligners-malta",
      },
      "crowns-bridges": {
        title: "Crowns and Bridges Malta | Apex Dental",
        description:
          "Crowns and bridges in Malta to restore damaged or missing teeth with functional and aesthetic results.",
        keywords:
          "crowns malta, bridges malta, zirconia crowns malta, restorative dentistry malta",
        path: "/crowns-and-bridges-malta",
      },
      "root-canal": {
        title: "Root Canal Treatment Malta | Apex Dental",
        description:
          "Root canal treatment in Malta focused on relieving pain, removing infection, and preserving the natural tooth.",
          keywords: "root canal malta, endodontic treatment malta, tooth pain malta",
        path: "/root-canal-treatment-malta",
      },
      orthodontics: {
        title: "Orthodontics Malta | Apex Dental",
        description:
          "Orthodontic treatment in Malta for smile alignment, bite improvement, and controlled tooth movement.",
        keywords: "orthodontics malta, braces malta, aligners malta, smile alignment malta",
        path: "/orthodontics-malta",
      },
      emergency: {
        title: "Emergency Dentist Malta | Apex Dental",
        description:
          "Emergency dentist in Malta for urgent appointments, toothache, swelling, trauma, and broken teeth.",
        keywords: "emergency dentist malta, urgent dental care malta, toothache malta",
        path: "/emergency-dentist-malta",
      },
      "price-list": {
        title: "Dental Price List Malta | Apex Dental",
        description:
          "View the Apex Dental price list in Malta for common treatments including implants, veneers, whitening, and surgery.",
        keywords: "dental price list malta, implant prices malta, veneers prices malta",
        path: "/price-list",
      },
      contact: {
        title: "Contact Apex Dental | Trident Park Malta",
        description:
          "Contact Apex Dental at Trident Park, Mrieħel, Malta. Book an appointment or plan your visit to our private clinic.",
        keywords: "apex dental contact, trident park dentist, dentist mriehel malta",
        path: "/contact",
      },
    };

    const key = route === "home" ? "home" : route === "contact" ? "contact" : currentService?.slug || "home";
    const data = routes[key] || routes.home;

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

    const setLink = (rel, href) => {
      let tag = document.head.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    setMeta("description", data.description);
    setMeta("keywords", data.keywords);
    setMeta("robots", "index, follow");
    setMeta("og:title", data.title, "property");
    setMeta("og:description", data.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", `${baseUrl}${data.path}`, "property");
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", data.title, "name");
    setMeta("twitter:description", data.description, "name");
    setLink("canonical", `${baseUrl}${data.path}`);

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "Apex Dental",
      telephone: "+35679854037",
      email: "info@apexdental.com.mt",
      url: baseUrl,
      image: `${baseUrl}/images/CT1.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Trident Park",
        addressLocality: "Mriehel",
        addressCountry: "MT",
      },
      areaServed: "Malta",
      medicalSpecialty: ["Dentistry", "Cosmetic Dentistry", "Orthodontics", "Implantology"],
    };

    const schemaItems = [localBusinessSchema];

    if (currentService && currentService.slug !== "price-list") {
      schemaItems.push({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: currentService.title,
        provider: {
          "@type": "Dentist",
          name: "Apex Dental",
          url: baseUrl,
        },
        areaServed: "Malta",
        description: currentService.subtitle,
      });

      if (currentService.faqs?.length) {
        schemaItems.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: currentService.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        });
      }
    }

    let schemaTag = document.head.querySelector('script[data-apex-schema="true"]');
    if (!schemaTag) {
      schemaTag = document.createElement("script");
      schemaTag.setAttribute("type", "application/ld+json");
      schemaTag.setAttribute("data-apex-schema", "true");
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(schemaItems);
  }, [route, currentService]);

  return null;
}
