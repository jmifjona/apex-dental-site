// The price list, exactly as /price-list/ shows it. Read by the price list page and the homepage's
// price teaser, so a fee can only ever be changed in one place.
export const priceSections = [
  {
    title: 'Examination / Diagnosis',
    items: [
      {
        name: 'Booking Fee (new patients, emergency & long appointments)',
        price: '€20.00',
        note: 'Secures your appointment and is deducted from your final bill. Non-refundable if the appointment is cancelled less than 5 hours beforehand.',
      },
      { name: 'Routine Checkup', price: '€30.00' },
      { name: 'Panoramic X-Ray', price: '€70.00', note: '2D full mouth X-ray.' },
      {
        name: 'Periapical or one side Bitewing X-Ray',
        price: '€20.00',
        note: 'For a set of bitewings, 2 are required.',
      },
      {
        name: 'Implant Consultation',
        price: '€30.00',
        note: 'Free if implant treatment is done, or deducted later from the implant bill if treatment proceeds.',
      },
      {
        name: 'CBCT X-Ray',
        price: '€120.00',
        note: '3D X-ray of the mouth; copy available on request. Important for implant planning and free if implant surgery is done.',
      },
    ],
  },
  {
    title: 'Hygiene / Cleaning and Teeth Whitening',
    items: [
      {
        name: 'Routine Hygiene Session',
        price: '€50.00',
        note: 'Scaling and polishing; ideally every 6 months.',
      },
      {
        name: 'Perio Laser',
        price: '€220.00',
        note: 'Usually done in 4 sessions; price is per session.',
      },
      {
        name: 'Fissure Sealing',
        price: '€30.00',
        note: 'Preventive measure, mostly for molars; price per tooth.',
      },
      {
        name: 'Home Whitening Kit (custom trays)',
        price: '€250.00',
        note: 'Custom trays included; worn at home, usually over one to two weeks.',
      },
      {
        name: 'Removal of Fixed Prosthesis and Cleaning',
        price: '€80.00',
        note: 'Recommended every 6 months for full-arch / Toronto bridge cases.',
      },
      { name: 'Fluoride Application', price: '€40.00' },
      {
        name: 'In-Clinic Whitening (Beyond or Zoom)',
        price: '€400.00',
        note: 'Usually a 90-minute session using branded products such as Beyond or Zoom.',
      },
    ],
  },
  {
    title: 'Crowns and Bridgework',
    items: [
      {
        name: 'Crowns, Metal/Porcelain',
        price: '€450.00',
        note: 'Porcelain outer shell with metal inside.',
      },
      { name: 'Lab Made Temporary Crowns', price: '€50.00' },
      {
        name: 'Removal of Existing Bridgework',
        price: '€30.00',
        note: 'Depends on the state of the bridge and work involved.',
      },
      {
        name: 'Full Porcelain Crowns / Zirconia',
        price: '€450.00',
        note: 'Variable full porcelain crowns available at the same price.',
      },
      { name: 'Post and Core Build Up', price: '€70.00' },
    ],
  },
  {
    title: 'Cosmetic Veneers',
    items: [
      {
        name: 'Composite Veneers',
        price: '€130.00',
        note: 'Highly aesthetic composite. Price per tooth.',
      },
      {
        name: '3D-Printed Ceramic Resin Veneers',
        price: '€220.00',
        note: 'Very stain resistant. Price per tooth.',
      },
      {
        name: 'Porcelain / Zirconia Veneers',
        price: '€450.00',
        note: 'The premium, longest-lasting option. Price per tooth.',
      },
      {
        name: 'Veneer Mockup / Try-In',
        price: '€50.00',
        note: 'See and try the final look before starting. Deducted from your bill if you proceed with resin or porcelain/zirconia veneers.',
      },
    ],
  },
  {
    title: 'Fillings',
    items: [
      {
        name: 'Removal of Amalgam Filling Under Rubberdam',
        price: '€40.00',
      },
      {
        name: 'Restoration of Deciduous Teeth',
        price: '€40.00',
        note: 'Material choice depends on cooperation and cavity size.',
      },
      {
        name: 'Composite Filling',
        price: 'From €70.00',
        note: 'Does not include posts if required.',
      },
    ],
  },
  {
    title: 'Implants',
    items: [
      {
        name: 'Implant Complete with Crown',
        price: '€1500.00',
        note: 'Depends on implant type, abutment type, and crown type.',
      },
      {
        name: 'Toronto Bridge All on 4',
        price: '€10,000.00',
        note: 'Full-arch fixed bridge on 4 implants, with zirconia teeth and Straumann BLX implants.',
      },
      {
        name: 'Implant Retained Removable Denture with 3 Implants and Bar',
        price: '€5500.00',
        note: 'Best removable option for upper arch.',
      },
      { name: 'Crown / Pontic on Implant', price: '€400.00' },
      {
        name: 'Implant Retained Removable Denture',
        price: '€3500.00',
        note: 'Locator-based, with 2 implants included; suitable for lower arch only.',
      },
    ],
  },
  {
    title: 'Extraction and Surgery',
    items: [
      {
        name: 'Extraction',
        price: 'From €60.00',
        note: 'Does not include radiographs if required.',
      },
      {
        name: 'Wisdom Tooth Surgical Extraction',
        price: '€250.00',
        note: 'Does not include radiographs if required.',
      },
      {
        name: 'Surgical Extraction',
        price: 'From €150.00',
        note: 'Includes retained roots and heavily broken teeth; radiographs not included.',
      },
    ],
  },
  {
    title: 'Root Canal Treatment',
    items: [
      {
        name: 'Root Canal Anterior Teeth',
        price: '€250.00',
        note: 'Includes filling but not the post if required.',
      },
      {
        name: 'Re Root Canal Treatment',
        price: '€320.00',
        note: 'For teeth that already had root canal treatment previously.',
      },
      {
        name: 'Root Canal Treatment Posterior Teeth',
        price: '€280.00',
        note: 'Includes filling but not the post if required.',
      },
    ],
  },
  {
    title: 'Dentures',
    items: [
      { name: 'Full Upper / Lower Acrylic Dentures', price: '€400.00' },
      {
        name: 'Flexible Dentures Partial',
        price: '€350.00',
        note: 'Meaning 3 teeth and less.',
      },
      { name: 'Chrome Cobalt Dentures', price: '€650.00' },
      {
        name: 'Partial Acrylic Dentures',
        price: '€300.00',
        note: 'More than 3 teeth is considered a full denture.',
      },
      {
        name: 'Flexible Dentures More Than 3 Teeth',
        price: '€650.00',
      },
    ],
  },
  {
    title: 'Orthodontic Treatment & Miscellaneous',
    items: [
      { name: 'Soft Splint 2mm', price: '€100.00' },
      { name: 'Michigan Splint', price: '€300.00' },
      {
        name: 'Clear Correct Treatment',
        price: 'From €2900.00',
        note: 'Invisible aligners.',
      },
      { name: 'Bionator', price: '€600.00' },
      { name: 'Soft Splint 4mm', price: '€120.00' },
      {
        name: 'Invisalign Treatment',
        price: 'From €3500.00',
        note: 'Invisible aligners.',
      },
      {
        name: 'Fixed Upper and Lower Orthodontic Appliance',
        price: 'From €2800.00',
      },
    ],
  },
];
