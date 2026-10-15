# DRAFT - Patient privacy notice for www.apexdentalmalta.com

> **DRAFT - for Dr Jonathan Mifsud's legal approval; not published.**
> This file is not a page on the website and nothing links to it. Text in [square brackets] is a
> fact to fill in or confirm. It was drafted on 15 Oct 2026 from what the website's code does on
> branch `site-fixes-2026-10-15`; it is not legal advice. Once approved it should become a real page
> (for example `/privacy`), and the cookie banner's "Privacy policy" link should point to it.
> Today that link goes to the existing `/privacy-policy`, which covers only the internal Google Ads
> application, not patients.

---

## Who we are

Apex Dental ([legal name of the practice or company], [registration number]) runs the dental
clinics at Trident Park, Mdina Road, Mrieħel, Birkirkara CBD 2010, and at St Anne's Clinic,
Level 3, Triq Kanonku Karm Pirotta, Birkirkara BKR 1111. We are the **controller** of the personal
data described here.

Contact for anything about your data: **info@apexdental.com.mt**, telephone 2701 6017
[or a named data protection contact / DPO, if one is appointed].

## What we collect on this website, and why

### 1. The contact form ("Contact Us", on the Contact page)
- **What:** your name, phone number, email address, preferred clinic, and your message. Anything
  you write in the message, including details about your health, is sent too.
- **Why:** to answer your enquiry and arrange an appointment.
- **Lawful basis:** steps you ask us to take before treatment (GDPR Art. 6(1)(b)); for any health
  details you choose to include, [explicit consent, Art. 9(2)(a) / provision of health care,
  Art. 9(2)(h) - legal to confirm].

### 2. The booking form ("Request an Appointment", on the Appointment Booking page)
- **What:** your name, email address, phone number, and, if you fill them in, a preferred date, the
  service you are interested in, a subject and a message.
- **Why, lawful basis:** as for the contact form.

### 3. The "Get more out of your first appointment" questionnaire (Contact page)
- It asks about the reason for your visit, how long it has been going on, what matters to you, some
  medical points (medication, conditions, pregnancy), your last dental visit, your preferred clinic,
  your name and date of birth.
- **The website does not send or store any of it.** It only prepares a WhatsApp message on your own
  device. Nothing reaches us unless you choose to send that message to our WhatsApp line
  (9972 2185); from then on it is handled as in section 4.

### 4. WhatsApp
- When you send us a WhatsApp message, or when you give a mobile number in either form, our
  booking assistant ("Jarvis", the clinic's own system) may message you on WhatsApp to arrange your
  appointment. Staff see and handle anything the assistant cannot.
- WhatsApp is provided by WhatsApp Ireland / Meta [confirm the exact WhatsApp Business service and
  contracting entity].
- [CONFIRM: if Jarvis uses an external AI service to read or draft replies (for example Anthropic's
  Claude API), name it here as a processor, with where it processes data and the transfer
  safeguard.]
- The assistant does not make decisions with legal or similarly significant effects about you; it
  arranges appointments and passes everything else to staff.

### 5. Cookies, Google Analytics and Google Ads - only if you accept
- We use Google Analytics 4 and Google Ads conversion measurement to see how the site is used and to
  measure our adverts. **These cookies are off unless you click Accept in the cookie banner**
  (Google Consent Mode v2; lawful basis: your consent, under the Processing of Personal Data
  (Electronic Communications Sector) Regulations, S.L. 586.01, and GDPR Art. 6(1)(a)).
- If you do not accept, Google's tag still loads and may send Google limited, cookieless signals
  (such as that a page was viewed), without advertising identifiers. [Owner/legal: decide whether
  to keep this "advanced" consent mode or load Google's tag only after Accept.]
- You can change your choice at any time with **"Cookie settings"** at the bottom of every page.
  Choosing Reject also removes Google Analytics and Google Ads cookies set earlier.
- Your choice itself is stored in your browser (localStorage key `apex_cookie_consent`), not sent to
  us.
- **Maps:** the Contact page shows Google Maps for both clinics. Google may set its own cookies when
  the map loads. [Owner/legal: consider showing the maps only after a click or after consent.]

### 6. Google reviews
- The reviews shown on the homepage are fetched from Google by our server. No information about you
  is sent to Google for this.

### 7. Website hosting and security logs
- The website is hosted by Vercel Inc. Like any web host, it processes your IP address and browser
  details to deliver pages and keep the service secure. Our enquiry relay writes one short log line
  per form submission (for example "delivered"), never the contents of the form.

## Who receives your data (processors)

| Who | What for | Where | Safeguard |
|---|---|---|---|
| Formspree, Inc. | receives both forms and emails them to info@apexdental.com.mt | USA | [EU-US Data Privacy Framework / Standard Contractual Clauses - confirm] |
| Vercel Inc. | website hosting; relays form enquiries to our booking assistant | USA / EU edge | [confirm] |
| WhatsApp Ireland / Meta | WhatsApp messages | EU / USA | [confirm] |
| [AI provider, if used by Jarvis] | [reading / drafting replies] | [ ] | [ ] |
| Google Ireland / Google LLC | Analytics and Ads measurement (only with consent); maps; reviews | EU / USA | [confirm] |

We do not sell your data. Clinic staff see only what they need to arrange and provide your care.

## How long we keep it

- Website enquiries that do not lead to an appointment: [for example 12 months], then deleted from
  our mailbox, Formspree and our booking system.
- Enquiries that lead to treatment become part of your patient record, kept for [the period required
  for dental records in Malta - confirm].
- WhatsApp conversations: [period].
- Copies held by Formspree: [Formspree's retention under our plan - confirm, and delete on our
  schedule].
- Google Analytics data: [the retention set in GA4 - 2 or 14 months].

## Your rights

Under the GDPR and Malta's Data Protection Act (Cap. 586) you can ask us to:
- give you a copy of your data (access);
- correct it;
- delete it, where we are not required to keep it;
- restrict or object to how we use it;
- give you your data in a portable format;
- withdraw your consent at any time (for example to cookies, through "Cookie settings"), without
  affecting what was done before.

Write to **info@apexdental.com.mt**. We will answer within one month.

If you are unhappy with how we handle your data, you can complain to the **Information and Data
Protection Commissioner (IDPC)**, Malta - www.idpc.org.mt [add the current postal address].

## Security

Form submissions travel over encrypted connections (HTTPS). The website signs each enquiry it
passes on to our booking assistant, so the assistant can tell a genuine one from a forged one.
Access to enquiries is limited to clinic staff who need them.

## Changes

We will update this notice when the website or our tools change. Last updated: [date of approval].

---

### Notes for the owner (delete before publishing)
- Confirm the legal entity, registration number and any data protection contact.
- Confirm each processor's contract (DPA) and transfer safeguard; Formspree, Vercel and Google are US
  companies.
- Decide the retention periods above.
- Decide on Google "advanced" vs "basic" consent mode, and click-to-load for the Google Maps embeds.
- Decide whether forms should show a one-line notice under the submit button, for example
  "We use your details only to answer you; see our privacy notice."
- The existing `/privacy-policy` and `/terms` describe only the internal Google Ads application
  (and are probably the Google OAuth consent-screen URLs). Keep them for that, and publish this
  notice as a separate page.
