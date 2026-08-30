// Single source of truth for Apex Dental's two locations.
// Edit clinic identity data (names, addresses, phones, map links/embeds) and the
// clinic-choice wording HERE only. App.jsx (brand, structured data, maps, the
// contact form) and ConsultationPrep.jsx (the questionnaire) all read from this
// file, so the two addresses can only ever be changed in one place.

export const brand = {
  name: 'Apex Dental',
  tagline: 'Advanced Dentistry in Malta',
  phone: '27016017',
  mobile: '79854037',
  whatsapp: '79854037',
  // International format for wa.me links (e.g. the questionnaire's WhatsApp button)
  whatsappIntl: '35679854037',
  email: 'info@apexdental.com.mt',
  address:
    'Trident Park, Mdina Road, Mrieħel, Birkirkara, CBD 2010, Malta',
  logo: '/images/orislogo.png',
  googleMaps: 'https://maps.app.goo.gl/F9LpeRvHAuzB2Qva9',
  stAnnesName: "Apex Dental @ St Anne's Clinic",
  addressStAnnes: 'Level 3, Triq Kanonku Karm Pirotta, Birkirkara BKR 1111',
  googleMapsStAnnes: 'https://maps.google.com/?cid=3534893952217415551',
  // Map embed sources. Trident is a full Google business embed and carries the
  // labelled Apex Dental pin. St Anne's is currently a plain-coordinate embed:
  // it shows the right spot but has NO business pin.
  // TODO: replace mapEmbedStAnnes with the iframe `src` from the St Anne's
  // Google listing (Share -> Embed a map) so the pin appears.
  mapEmbedTrident:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.2!2d14.45876!3d35.89618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e51a910f3489f%3A0x6cb52257e336786f!2sApex+Dental!5e0!3m2!1sen!2smt!4v1',
  mapEmbedStAnnes:
    'https://www.google.com/maps?q=35.9028887,14.4595558&z=17&output=embed',
};

// The clinic-choice options, defined once and shared by the questionnaire
// (ConsultationPrep.jsx) and the plain contact form (App.jsx).
//   v     – option value / key
//   l     – radio-card title shown in the questionnaire, and the value + text
//           submitted by the contact form
//   n     – supporting note under the title
//   label – how the choice is written back into the "Preferred clinic:" summary
export const CLINIC_OPTIONS = [
  {
    v: 'trident',
    l: 'Trident Park, Mrieħel, Birkirkara',
    n: 'Our main clinic — Mdina Road, CBD 2010',
    label: 'Trident Park, Mrieħel, Birkirkara (main clinic)',
  },
  {
    v: 'stannes',
    l: "St Anne's Clinic, Level 3",
    n: 'Triq Kanonku Karm Pirotta, BKR 1111 — closed Sundays',
    label: "St Anne's Clinic, Level 3",
  },
  {
    v: 'either',
    l: 'Either — whichever gives me the sooner appointment',
    n: '',
    label: 'Either clinic — whichever is sooner',
  },
];

// value -> summary label, used for the "Preferred clinic:" line
export const CLINIC_LABEL = Object.fromEntries(
  CLINIC_OPTIONS.map((o) => [o.v, o.label]),
);
