import React, { useState } from 'react';
import { brand, CLINIC_OPTIONS, CLINIC_LABEL } from './data/clinics.js';

// Patient visit-preparation questionnaire, shown above the contact form.
// Nothing is transmitted from this component. The WhatsApp button opens a
// pre-filled message that the patient reviews and sends from their own device.

const CONFIG = {
  clinic: 'Apex Dental',
  phone: '+356 7985 4037',
  phoneHref: '+35679854037',
  whatsapp: brand.whatsappIntl,
  hospital: 'Mater Dei Hospital',
  newPatientMinutes: 30,
};

const STEPS = [
  {
    key: 'reason', type: 'single',
    title: "What's bringing you in?",
    hint: 'Pick the closest one. You can add detail later.',
    options: [
      { v: 'pain', l: 'Pain or discomfort', n: 'A tooth, a gum, or the jaw' },
      { v: 'broken', l: 'A broken or missing tooth', n: 'Including a lost filling, crown or denture' },
      { v: 'look', l: 'How my teeth look', n: 'Colour, shape, gaps, chips' },
      { v: 'straight', l: 'Crooked or crowded teeth', n: 'Braces or clear aligners' },
      { v: 'routine', l: 'A check-up and clean', n: 'Nothing wrong that I know of' },
      { v: 'unsure', l: "I'm not sure", n: "Something feels off and I'd like it looked at" },
    ],
  },
  {
    key: 'timing', type: 'single',
    title: 'How long has this been going on?',
    hint: 'A rough answer is fine.',
    options: [
      { v: 'now', l: "It's a problem right now", n: 'Pain, swelling or damage today' },
      { v: 'weeks', l: 'Days or weeks' },
      { v: 'months', l: 'Months' },
      { v: 'years', l: 'A year or more' },
      { v: 'na', l: 'Not applicable' },
    ],
  },
  {
    key: 'priorities', type: 'multi',
    title: 'What matters most to you?',
    hint: 'Choose as many as apply. This shapes how the options get explained to you.',
    options: [
      { v: 'cost', l: 'Knowing the cost up front' },
      { v: 'speed', l: 'Getting it sorted quickly' },
      { v: 'look', l: 'How it will look' },
      { v: 'keep', l: 'Keeping my own teeth if possible' },
      { v: 'nosurg', l: "Avoiding surgery if there's a choice" },
      { v: 'time', l: 'As few appointments as possible' },
      { v: 'comfort', l: 'Not being in pain during treatment' },
    ],
  },
  {
    key: 'context', type: 'multi',
    title: 'Anything we should know before you sit down?',
    hint: 'These are the things patients often only mention halfway through. Knowing them first changes how we plan the appointment.',
    options: [
      { v: 'anxious', l: "I'm anxious about dentists" },
      { v: 'badpast', l: "I've had a bad experience before" },
      { v: 'meds', l: 'I take regular medication', n: 'Bring the list or a photo of the boxes' },
      { v: 'medical', l: 'I have a medical condition', n: 'Heart, diabetes, bleeding, bone or immune-related' },
      { v: 'grind', l: 'I grind or clench my teeth' },
      { v: 'smoke', l: 'I smoke or vape' },
      { v: 'preg', l: "I'm pregnant or breastfeeding" },
      { v: 'none', l: 'None of these' },
    ],
    freeText: 'Anything else in your own words — optional',
  },
  {
    key: 'lastvisit', type: 'single',
    title: 'When did you last see a dentist?',
    hint: 'No wrong answer. It only tells us how much time to leave.',
    options: [
      { v: '6m', l: 'Within the last 6 months' },
      { v: '2y', l: '1 to 2 years ago' },
      { v: '5y', l: 'Several years ago' },
      { v: 'long', l: "I honestly can't remember" },
    ],
  },
  {
    key: 'clinic', type: 'single',
    title: 'Which clinic suits you better?',
    hint: 'Both are in Birkirkara. Trident Park is our main clinic and the only one open on Sundays.',
    options: CLINIC_OPTIONS,
  },
  {
    key: 'details', type: 'fields',
    title: 'Your details',
    hint: 'So reception can find your file or open a new one before you arrive. This stays on your device until you choose to send it.',
    fields: [
      { k: 'pname', l: 'Full name', req: true, ph: 'First and last name' },
      { k: 'pdob', l: 'Date of birth', ph: 'DD/MM/YYYY' },
      { k: 'pphone', l: 'Best number to call', ph: 'Only if different from your WhatsApp number' },
      { k: 'pemail', l: 'Email', ph: 'Optional' },
    ],
  },
];
const REASON_WORDS = {
  pain: 'pain or discomfort',
  broken: 'a broken or missing tooth',
  look: 'the appearance of your teeth',
  straight: 'crooked or crowded teeth',
  routine: 'a check-up and clean',
  unsure: "something that doesn't feel right, without being sure what",
};
const REASON_SHORT = {
  pain: 'Pain or discomfort',
  broken: 'A broken or missing tooth',
  look: 'The appearance of my teeth',
  straight: 'Crooked or crowded teeth',
  routine: 'A check-up and clean',
  unsure: 'Not sure — something does not feel right',
};
const TIMING_WORDS = {
  now: "and it's a problem today", weeks: 'for the last few days or weeks',
  months: 'for a few months', years: 'for a year or more', na: '',
};
const TIMING_SHORT = {
  now: 'a problem today', weeks: 'days or weeks', months: 'a few months',
  years: 'a year or more', na: '',
};
const LASTVISIT_SHORT = {
  '6m': 'within the last 6 months', '2y': '1 to 2 years ago',
  '5y': 'several years ago', long: 'cannot remember',
};
const QUESTIONS = {
  pain: [
    'What is actually causing the pain?',
    'Can this tooth be saved, or is removing it the better option?',
    'What happens if I leave it as it is?',
    'What will settle the pain today, and what is the longer-term fix?',
  ],
  broken: [
    'What are my options for replacing or repairing this?',
    'How long does the whole process take from start to finish?',
    'What is the total cost including every stage, not just the first appointment?',
    'What happens to the bone and the neighbouring teeth if I wait?',
  ],
  look: [
    'What is realistically achievable with my teeth?',
    'How long do the results last, and what maintenance do they need?',
    'Does any of this involve removing healthy tooth structure?',
    'Can I see photographs of cases similar to mine?',
  ],
  straight: [
    'Which approach suits my case, and why?',
    'How long will treatment take, and how often would I come in?',
    'What do I need to wear afterwards to stop the teeth moving back?',
    'What is the total cost including retainers and reviews?',
  ],
  routine: [
    'How is my gum health?',
    "Is there anything you're watching that isn't a problem yet?",
    'How often should I be coming in?',
    'Is there anything I should change in how I clean at home?',
  ],
  unsure: [
    'What did you find on examination?',
    'What needs attention now, and what can safely wait?',
    'If it were you, what would you do first?',
    'What does the whole plan cost, and can it be staged?',
  ],
};
const PRIORITY_WORDS = {
  cost: 'a clear cost before starting', speed: 'getting it resolved quickly',
  look: 'the final appearance', keep: 'keeping your own teeth where possible',
  nosurg: 'avoiding surgery if there is a choice', time: 'as few appointments as possible',
  comfort: 'being comfortable during treatment',
};
const PRIORITY_MINE = {
  cost: 'a clear cost before starting', speed: 'getting it resolved quickly',
  look: 'the final appearance', keep: 'keeping my own teeth where possible',
  nosurg: 'avoiding surgery if there is a choice', time: 'as few appointments as possible',
  comfort: 'being comfortable during treatment',
};
const CONTEXT_WORDS = {
  anxious: 'anxious about dental treatment', badpast: 'had a difficult experience in the past',
  meds: 'taking regular medication', medical: 'living with a medical condition',
  grind: 'grinding or clenching', smoke: 'a smoker or vaper',
  preg: 'pregnant or breastfeeding',
};
const CONTEXT_MINE = {
  anxious: 'I am anxious about dental treatment', badpast: 'I have had a difficult experience in the past',
  meds: 'I take regular medication', medical: 'I have a medical condition',
  grind: 'I grind or clench my teeth', smoke: 'I smoke or vape',
  preg: 'I am pregnant or breastfeeding',
};

function listify(arr) {
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
}
export default function ConsultationPrep() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState({});
  const [done, setDone] = useState(false);

  const step = STEPS[current];
  const isLast = current === STEPS.length - 1;

  const setAnswer = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  const setDetail = (key, value) => setDetails((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key, value) => {
    const prev = answers[key] || [];
    let next;
    if (value === 'none') next = prev.indexOf('none') > -1 ? [] : ['none'];
    else {
      next = prev.indexOf(value) > -1 ? prev.filter((v) => v !== value) : prev.concat([value]);
      next = next.filter((v) => v !== 'none');
    }
    setAnswer(key, next);
  };

  const canAdvance = () => {
    if (step.type === 'fields') return !!(details.pname && details.pname.trim());
    const chosen = answers[step.key];
    return !!(chosen && chosen.length !== 0);
  };

  const reset = () => {
    setAnswers({}); setDetails({}); setCurrent(0); setDone(false);
  };

  const reason = answers.reason;
  const prio = (answers.priorities || []).filter((v) => v !== 'none');
  const ctx = (answers.context || []).filter((v) => v !== 'none');
  const note = (answers.context_text || '').trim();
  const urgent = reason === 'pain' && answers.timing === 'now';

  const buildSummary = () => {
    let s = "You're coming in about " + REASON_WORDS[reason];
    if (TIMING_WORDS[answers.timing]) s += ', ' + TIMING_WORDS[answers.timing];
    s += '.';
    if (prio.length) s += ' What matters most to you is ' + listify(prio.map((p) => PRIORITY_WORDS[p])) + '.';
    if (ctx.length) s += " You've told us you're " + listify(ctx.map((c) => CONTEXT_WORDS[c])) + '.';
    return s;
  };

  const whatsappHref = () => {
    const L = [];
    L.push('Hello Apex Dental. I filled in the visit preparation on your website and would like to book an appointment.');
    L.push('');
    L.push('Name: ' + (details.pname || '').trim());
    if (details.pdob && details.pdob.trim()) L.push('Date of birth: ' + details.pdob.trim());
    if (details.pphone && details.pphone.trim()) L.push('Best number: ' + details.pphone.trim());
    if (details.pemail && details.pemail.trim()) L.push('Email: ' + details.pemail.trim());
    L.push('');
    L.push('Preferred clinic: ' + (CLINIC_LABEL[answers.clinic] || ''));
    L.push('Reason: ' + REASON_SHORT[reason] + (TIMING_SHORT[answers.timing] ? ' (' + TIMING_SHORT[answers.timing] + ')' : ''));
    if (prio.length) L.push('Most important to me: ' + listify(prio.map((p) => PRIORITY_MINE[p])));
    if (ctx.length) L.push('Please note: ' + listify(ctx.map((c) => CONTEXT_MINE[c])));
    L.push('Last dental visit: ' + (LASTVISIT_SHORT[answers.lastvisit] || ''));
    if (note) L.push('In my words: ' + note);
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(L.join('\n'));
  };

  const bring = []
    .concat(ctx.indexOf('meds') > -1 ? ['Your medication list, or a photo of the boxes'] : [])
    .concat(ctx.indexOf('medical') > -1 ? ['Any recent letters or reports from your doctor'] : [])
    .concat(['Any previous x-rays or scans, if you have them', 'This summary — on your phone or printed']);

  const anxious = ctx.indexOf('anxious') > -1 || ctx.indexOf('badpast') > -1;

  const detailRows = [
    ['Preferred clinic', CLINIC_LABEL[answers.clinic]],
    ['Name', details.pname], ['Date of birth', details.pdob],
    ['Best number', details.pphone], ['Email', details.pemail],
  ].filter((r) => r[1] && r[1].trim());
  const optionCard = (o) => {
    const multi = step.type === 'multi';
    const chosen = answers[step.key];
    const sel = multi ? (chosen || []).indexOf(o.v) > -1 : chosen === o.v;
    return (
      <label
        key={o.v}
        className={
          'flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ' +
          (sel ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-400')
        }
      >
        <input
          type={multi ? 'checkbox' : 'radio'}
          name={step.key}
          value={o.v}
          checked={sel}
          onChange={() => (multi ? toggleMulti(step.key, o.v) : setAnswer(step.key, o.v))}
          className="mt-1 accent-amber-500 shrink-0"
        />
        <span>
          <span className="block font-semibold text-slate-900">{o.l}</span>
          {o.n && <span className="block text-sm text-slate-500">{o.n}</span>}
        </span>
      </label>
    );
  };

  const questionCard = (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
        Step {current + 1} of {STEPS.length}
      </p>
      <h3 className="text-xl md:text-2xl font-semibold text-slate-900">{step.title}</h3>
      <p className="text-sm text-slate-500 mt-1 mb-6">{step.hint}</p>

      {step.type === 'fields' ? (
        <div className="grid gap-4 mb-6">
          {step.fields.map((f) => (
            <div key={f.k}>
              <label htmlFor={f.k} className="block text-sm font-semibold text-slate-900 mb-1">
                {f.l} {f.req && <span className="text-amber-600">*</span>}
              </label>
              <input
                id={f.k}
                type="text"
                placeholder={f.ph}
                value={details[f.k] || ''}
                onChange={(e) => setDetail(f.k, e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-2 mb-6">{step.options.map(optionCard)}</div>
          {step.freeText && (
            <textarea
              value={answers[step.key + '_text'] || ''}
              onChange={(e) => setAnswer(step.key + '_text', e.target.value)}
              placeholder={step.freeText}
              className="w-full min-h-[88px] rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none mb-6"
            />
          )}
        </>
      )}

      <div className="flex items-center gap-3">
        {current > 0 && (
          <button
            type="button"
            onClick={() => setCurrent(current - 1)}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            Back
          </button>
        )}
        <button
          type="button"
          disabled={!canAdvance()}
          onClick={() => (isLast ? setDone(true) : setCurrent(current + 1))}
          className={
            'rounded-full px-7 py-3 text-sm font-bold transition ' +
            (canAdvance() ? 'bg-amber-400 text-slate-900 hover:bg-amber-500' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
          }
        >
          {isLast ? 'See my summary' : 'Next'}
        </button>
      </div>
    </div>
  );
  const block = (title, children) => (
    <div className="py-5 border-b border-slate-200 last:border-b-0">
      <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">{title}</h4>
      {children}
    </div>
  );

  const summaryCard = (
    <div>
      {urgent && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 mb-6">
          <h3 className="text-lg font-bold text-orange-800 mb-2">Call us rather than booking online</h3>
          <p className="text-sm text-slate-700 mb-3">
            You have said this is a problem today. Phone the clinic and we will find you the earliest slot.
          </p>
          <a
            href={'tel:' + CONFIG.phoneHref}
            className="inline-block rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900"
          >
            Call {CONFIG.phone}
          </a>
          <p className="text-sm font-bold text-slate-900 mt-5 mb-2">
            Go straight to {CONFIG.hospital} if any of these apply:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Swelling of the face that is spreading towards the eye or down the neck</li>
            <li>Difficulty swallowing, breathing, or opening your mouth</li>
            <li>Bleeding that will not stop with firm pressure</li>
            <li>A high temperature alongside facial swelling</li>
            <li>A significant injury to the face or jaw</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2">These need a hospital, not a dental chair.</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="bg-slate-950 px-6 md:px-8 py-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Bring this to your appointment
          </p>
          <h3 className="text-2xl font-semibold text-white mt-1">Consultation summary</h3>
        </div>

        <div className="px-6 md:px-8 pb-6">
          {block('Your details', (
            <dl className="text-sm">
              {detailRows.map((r) => (
                <div key={r[0]} className="flex gap-3 mb-1">
                  <dt className="text-slate-500 min-w-[120px]">{r[0]}</dt>
                  <dd className="font-semibold text-slate-900">{r[1].trim()}</dd>
                </div>
              ))}
            </dl>
          ))}

          {block('In your words', (
            <>
              <p className="text-lg text-slate-900 leading-relaxed">{buildSummary()}</p>
              {note && <p className="text-sm text-slate-600 mt-3">You also added: “{note}”</p>}
            </>
          ))}

          {block('Ask the dentist', (
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              {(QUESTIONS[reason] || []).map((q) => <li key={q}>{q}</li>)}
            </ul>
          ))}

          {block('What a first visit involves', (
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>A conversation about what you have described here, and your medical history.</li>
              <li>An examination of the teeth, gums and bite.</li>
              <li>Photographs, a digital scan or x-rays if they are needed to see the whole picture.</li>
              <li>A written plan with costs, so you can take it away and decide in your own time.</li>
              <li>
                Around {CONFIG.newPatientMinutes} minutes in total. Nothing irreversible happens at a
                first visit without discussing it with you first.
              </li>
            </ul>
          ))}

          {block('Bring with you', (
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              {bring.map((b) => <li key={b}>{b}</li>)}
            </ul>
          ))}

          {block('What to book', (
            <>
              <p className="text-slate-700">
                {urgent
                  ? 'Call the clinic today rather than booking online, so we can find you the soonest slot.'
                  : 'A new patient consultation' +
                    (answers.lastvisit === '6m' ? '' : ', with time allowed for a full assessment') + '.'}
              </p>
              {anxious && (
                <p className="text-slate-700 mt-2">
                  Tell reception when you book that you would like a longer, unhurried appointment. It is
                  a common request and it makes a difference.
                </p>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white"
        >
          Send this to the clinic on WhatsApp
        </a>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          Start again
        </button>
      </div>

      <p className="text-sm text-slate-500 mt-4 max-w-[56ch]">
        The WhatsApp button opens a message with your details and answers already written out, including
        anything you ticked under “anything we should know”. Read it before you send it, and delete
        anything you would rather tell us in person.
      </p>
    </div>
  );
  return (
    <section id="prepare" className="bg-[#f7f4ef] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
          Before your appointment
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
          Get more out of your first appointment
        </h2>
        <p className="text-slate-600 mb-4 max-w-[52ch]">
          A few short questions. At the end you get a summary you can send to us on WhatsApp or bring
          with you, the questions worth asking, and what a first visit actually involves.
        </p>
        <p className="text-sm text-slate-500 border-l-2 border-slate-300 pl-4 mb-8 max-w-[60ch]">
          This is not a diagnosis and it does not suggest treatment. It puts your own description on
          paper so the dentist has it from the first minute. Nothing here replaces an examination.
        </p>

        {!done && (
          <div className="flex gap-1.5 mb-6">
            {STEPS.map((s, i) => (
              <span
                key={s.key}
                className={'h-[3px] flex-1 rounded ' + (i <= current ? 'bg-amber-400' : 'bg-slate-300')}
              />
            ))}
          </div>
        )}

        {done ? summaryCard : questionCard}
      </div>
    </section>
  );
}
