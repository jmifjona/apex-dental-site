import React, { useState, useEffect } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';
const STRATEGY_KEY = 'apex_strategy_prefill';

const DENTAL_SERVICES = [
  'Dental Implants', 'Invisalign', 'Teeth Whitening', 'Veneers',
  'Root Canal Treatment', 'Crowns & Bridges', 'Emergency Dental',
  'Orthodontics', 'Dental Hygiene', 'Dental Prosthetics',
  'Cosmetic Dentistry', 'General Dentistry', 'Periodontology',
];

const s = {
  card: { background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' },
  label: { display: 'block', fontSize: 13, color: '#6B7280', marginBottom: 4, fontWeight: 500 },
  input: { width: '100%', fontSize: 14, color: '#111827', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '9px 12px', fontFamily: 'inherit', boxSizing: 'border-box' },
  textarea: { width: '100%', fontSize: 14, color: '#111827', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '9px 12px', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 },
  btn: (bg, color, border = 'none') => ({ padding: '9px 20px', fontSize: 14, borderRadius: 8, border, background: bg, color, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }),
  sectionTitle: { fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 },
  badge: (bg, color) => ({ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: bg, color, fontWeight: 500 }),
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
};

function CharBadge({ text, max }) {
  const len = (text || '').length;
  const over = len > max;
  return <span style={s.badge(over ? '#FEF2F2' : len > max * 0.85 ? '#FEF3C7' : '#F0FDF4', over ? '#991B1B' : len > max * 0.85 ? '#92400E' : '#166534')}>{len}/{max}</span>;
}

function StepBar({ step }) {
  const steps = ['Setup', 'AI Generate', 'Edit & Images', 'Preview', 'Launch'];
  return (
    <div style={{ display: 'flex', marginBottom: '1.5rem', border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
      {steps.map((label, i) => (
        <div key={i} style={{ flex: 1, padding: '10px 4px', textAlign: 'center', fontSize: 12, fontWeight: i + 1 === step ? 600 : 400, background: i + 1 === step ? '#0F172A' : i + 1 < step ? '#F0FDF4' : '#F9FAFB', color: i + 1 === step ? 'white' : i + 1 < step ? '#166534' : '#6B7280', borderRight: i < 4 ? '1px solid #E5E7EB' : 'none' }}>
          {i + 1 < step ? '✓ ' : `${i + 1}. `}{label}
        </div>
      ))}
    </div>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1E293B', color: 'white', padding: '12px 20px', borderRadius: 10, zIndex: 999, fontSize: 14, maxWidth: 400 }}>{msg}</div>;
}

// ── Strategy context banner shown when prefill is active ──────
function StrategyBanner({ strategy, onDismiss }) {
  if (!strategy) return null;
  return (
    <div style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', border: '1px solid #059669', borderRadius: 14, padding: '16px 20px', marginBottom: '1.5rem', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6EE7B7', marginBottom: 6 }}>
            ✓ Strategy loaded from AI Strategy Engine
          </div>
          <div style={{ fontSize: 14, color: '#D1FAE5', lineHeight: 1.6 }}>
            Your campaign setup has been pre-filled based on your strategy. The AI generator will use your research context and strategy recommendations to create targeted campaign copy.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {strategy.biddingStrategy && (
              <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, color: '#A7F3D0' }}>
                💡 {strategy.biddingStrategy}
              </span>
            )}
            {strategy.priorityServices?.length > 0 && (
              <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, color: '#A7F3D0' }}>
                📋 {strategy.priorityServices.length} priority service{strategy.priorityServices.length > 1 ? 's' : ''}
              </span>
            )}
            {strategy.campaignStructure?.length > 0 && (
              <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, color: '#A7F3D0' }}>
                🏗 {strategy.campaignStructure.length} structure recommendations
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onDismiss}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>
          ✕ Dismiss
        </button>
      </div>

      {/* Strategy details accordion */}
      {strategy.quickActionItems?.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 12, color: '#6EE7B7', fontWeight: 600, marginBottom: 6 }}>Quick action items from strategy:</div>
          <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
            {strategy.quickActionItems.slice(0, 4).map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: '#D1FAE5', lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function GoogleAdsCampaignBuilder() {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategyPrefill, setStrategyPrefill] = useState(null); // from AI Strategy Engine

  // Step 1 form
  const [form, setForm] = useState({
    service: '',
    customService: '',
    location: 'Malta',
    businessName: 'Apex Dental',
    finalUrl: 'https://www.apexdentalmalta.com',
    dailyBudget: '20',
    languages: ['English'],
  });

  // Strategy context — passed into AI generation prompt
  const [strategyContext, setStrategyContext] = useState('');

  // Step 2 — AI generated data
  const [generated, setGenerated] = useState(null);
  const [shutterstockQueries, setShutterstockQueries] = useState([]);
  const [biddingStrategy, setBiddingStrategy] = useState('');

  // Step 3 — editable per language
  const [edited, setEdited] = useState({});
  const [activeLang, setActiveLang] = useState('English');
  const [uploadedImages, setUploadedImages] = useState([]);

  // ── Read strategy prefill from sessionStorage on mount ──────
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STRATEGY_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      // Only use if fresh (within last 10 minutes)
      if (!data.timestamp || Date.now() - data.timestamp > 10 * 60 * 1000) {
        sessionStorage.removeItem(STRATEGY_KEY);
        return;
      }

      setStrategyPrefill(data);

      // Pre-fill form fields from strategy
      setForm(prev => {
        const updated = { ...prev };

        // Budget — parse numeric value from strategy
        if (data.budget) {
          const budgetNum = parseFloat(String(data.budget).replace(/[^0-9.]/g, ''));
          if (!isNaN(budgetNum) && budgetNum > 0) updated.dailyBudget = String(Math.round(budgetNum / 30) || 20);
        }

        // Service — try to match to our dropdown list
        if (data.services) {
          const serviceStr = Array.isArray(data.services) ? data.services[0] : data.services.split(',')[0].trim();
          const matched = DENTAL_SERVICES.find(s => s.toLowerCase().includes(serviceStr.toLowerCase()) || serviceStr.toLowerCase().includes(s.toLowerCase()));
          if (matched) {
            updated.service = matched;
          } else {
            updated.service = 'Other';
            updated.customService = serviceStr;
          }
        }

        // Languages — keep existing defaults unless strategy specifies
        return updated;
      });

      // Build strategy context string for AI prompt
      const lines = [];
      if (data.biddingStrategy)              lines.push(`RECOMMENDED BIDDING STRATEGY: ${data.biddingStrategy}`);
      if (data.biddingRationale)             lines.push(`BIDDING RATIONALE: ${data.biddingRationale}`);
      if (data.priorityServices?.length)     lines.push(`PRIORITY SERVICES: ${data.priorityServices.join(', ')}`);
      if (data.campaignStructure?.length)    lines.push(`CAMPAIGN STRUCTURE: ${data.campaignStructure.join(' | ')}`);
      if (data.targetingRecommendations?.length) lines.push(`TARGETING: ${data.targetingRecommendations.join(' | ')}`);
      if (data.quickActionItems?.length)     lines.push(`QUICK WINS: ${data.quickActionItems.slice(0, 3).join(' | ')}`);
      if (data.expectedOutcomes)             lines.push(`EXPECTED OUTCOMES: ${data.expectedOutcomes}`);
      if (data.researchContext)              lines.push(`RESEARCH CONTEXT:\n${data.researchContext}`);
      if (data.goal)                         lines.push(`PRIMARY GOAL: ${data.goal}`);

      setStrategyContext(lines.join('\n\n'));

    } catch (e) {
      // Silently ignore parse errors
    }
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 4000); };

  function setField(k, v) { setForm(p => ({ ...p, [k]: v })); }

  function toggleLang(lang) {
    setForm(p => ({
      ...p,
      languages: p.languages.includes(lang) ? p.languages.filter(l => l !== lang) : [...p.languages, lang],
    }));
  }

  function updateEdited(lang, field, value) {
    setEdited(p => ({ ...p, [lang]: { ...p[lang], [field]: value } }));
  }

  function getVal(lang, field) {
    return edited[lang]?.[field] ?? (generated?.campaigns?.[lang]?.[field] || '');
  }

  function dismissStrategy() {
    setStrategyPrefill(null);
    setStrategyContext('');
    try { sessionStorage.removeItem(STRATEGY_KEY); } catch (e) {}
  }

  async function runGenerate() {
    const service = form.service === 'Other' ? form.customService : form.service;
    if (!service) { showToast('Please select or enter a service'); return; }
    if (!form.languages.length) { showToast('Select at least one language'); return; }

    setLoading(true);
    try {
      // Build enriched prompt — include strategy context if available
      const extraContext = strategyContext
        ? `\n\nSTRATEGY CONTEXT FROM AI ANALYSIS:\n${strategyContext}\n\nUse the above strategy insights to inform the campaign copy — align messaging with identified opportunities, use competitor differentiators, and reflect the recommended bidding and targeting approach.`
        : '';

      const res = await fetch(`${API}/ai/generate-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          location: form.location,
          businessName: form.businessName,
          finalUrl: form.finalUrl,
          languages: form.languages,
          // Pass strategy context as additional instructions
          additionalContext: extraContext,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);

      setGenerated(data);
      setShutterstockQueries(data.shutterstockQueries || []);
      // Use strategy bidding recommendation if available, otherwise use AI's
      setBiddingStrategy(strategyPrefill?.biddingStrategy || data.biddingStrategy || '');

      // Init edited with generated data
      const init = {};
      form.languages.forEach(lang => {
        if (data.campaigns?.[lang]) {
          const c = data.campaigns[lang];
          init[lang] = {
            campaignName: c.campaignName || '',
            headlines: Array.isArray(c.headlines) ? c.headlines.join('\n') : c.headlines || '',
            descriptions: Array.isArray(c.descriptions) ? c.descriptions.join('\n') : c.descriptions || '',
            keywords: Array.isArray(c.keywords) ? c.keywords.join('\n') : c.keywords || '',
            callouts: Array.isArray(c.callouts) ? c.callouts.join('\n') : c.callouts || '',
            sitelinks: Array.isArray(c.sitelinks) ? c.sitelinks.join('\n') : c.sitelinks || '',
            structuredSnippets: c.structuredSnippets || '',
          };
        }
      });
      setEdited(init);
      setActiveLang(form.languages[0]);
      setStep(3);
    } catch (e) {
      showToast('AI generation failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function launchCampaigns() {
    setLoading(true);
    try {
      const campaigns = form.languages.map(lang => ({
        campaignName: getVal(lang, 'campaignName'),
        adGroupName: getVal(lang, 'campaignName'),
        dailyBudget: form.dailyBudget,
        finalUrl: form.finalUrl,
        headlines: getVal(lang, 'headlines'),
        descriptions: getVal(lang, 'descriptions'),
        keywords: getVal(lang, 'keywords'),
        callouts: getVal(lang, 'callouts'),
        sitelinks: getVal(lang, 'sitelinks'),
        structuredSnippets: getVal(lang, 'structuredSnippets'),
      }));

      const res = await fetch(`${API}/campaigns/create-multi-language`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaigns }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);

      // Clear strategy prefill after successful launch
      try { sessionStorage.removeItem(STRATEGY_KEY); } catch (e) {}

      showToast(`🎉 ${campaigns.length} campaign(s) created successfully! They are paused — enable them in the Campaign Manager when ready.`);
      setStep(1);
      setGenerated(null);
      setEdited({});
      setStrategyPrefill(null);
      setStrategyContext('');
    } catch (e) {
      showToast('Launch failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setUploadedImages(p => [...p, { name: file.name, url: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  }

  const service = form.service === 'Other' ? form.customService : form.service;

  // Headline/desc lists for preview
  const previewHeadlines = (getVal(activeLang, 'headlines') || '').split('\n').filter(Boolean).slice(0, 3);
  const previewDescs = (getVal(activeLang, 'descriptions') || '').split('\n').filter(Boolean).slice(0, 2);

  return (
    <main style={{ minHeight: '100vh', background: '#F1F5F9', paddingTop: 110, paddingBottom: 80 }}>
      <Toast msg={toast} />
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 1rem' }}>

        {/* Header */}
        <div style={{ ...s.card, background: '#0F172A', color: 'white', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Campaign builder</h1>
              <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: 14 }}>
                AI-powered Google Ads campaign creation with images and multi-language support
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <a href="/google-ads-strategy" style={{ ...s.btn('rgba(255,255,255,0.1)', 'white', '1px solid rgba(255,255,255,0.2)'), textDecoration: 'none', fontSize: 13 }}>
                ← AI Strategy
              </a>
              <a href="/google-ads-manager" style={{ ...s.btn('rgba(255,255,255,0.1)', 'white', '1px solid rgba(255,255,255,0.2)'), textDecoration: 'none', fontSize: 13 }}>
                Campaign Manager
              </a>
            </div>
          </div>
        </div>

        {/* Strategy banner */}
        <StrategyBanner strategy={strategyPrefill} onDismiss={dismissStrategy} />

        <StepBar step={step} />

        {/* ── STEP 1: SETUP ── */}
        {step === 1 && (
          <div>
            <div style={s.card}>
              <div style={s.sectionTitle}>Service & business</div>
              <div style={{ ...s.grid2, marginBottom: 14 }}>
                <div>
                  <label style={s.label}>Select service</label>
                  <select style={s.input} value={form.service} onChange={e => setField('service', e.target.value)}>
                    <option value="">-- Choose a service --</option>
                    {DENTAL_SERVICES.map(sv => <option key={sv}>{sv}</option>)}
                    <option value="Other">Other (type below)</option>
                  </select>
                </div>
                <div>
                  <label style={s.label}>Business name</label>
                  <input style={s.input} value={form.businessName} onChange={e => setField('businessName', e.target.value)} />
                </div>
              </div>
              {form.service === 'Other' && (
                <div style={{ marginBottom: 14 }}>
                  <label style={s.label}>Custom service</label>
                  <input style={s.input} value={form.customService} onChange={e => setField('customService', e.target.value)} placeholder="e.g. Smile Makeover" />
                </div>
              )}
              <div style={{ ...s.grid2, marginBottom: 14 }}>
                <div>
                  <label style={s.label}>Location</label>
                  <input style={s.input} value={form.location} onChange={e => setField('location', e.target.value)} />
                </div>
                <div>
                  <label style={s.label}>Daily budget (€)</label>
                  <input type="number" style={s.input} value={form.dailyBudget} onChange={e => setField('dailyBudget', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={s.label}>Landing page URL</label>
                <input style={s.input} value={form.finalUrl} onChange={e => setField('finalUrl', e.target.value)} />
              </div>
            </div>

            <div style={s.card}>
              <div style={s.sectionTitle}>Languages</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['English', 'Italian', 'Spanish'].map(lang => (
                  <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${form.languages.includes(lang) ? '#0F172A' : '#E5E7EB'}`, background: form.languages.includes(lang) ? '#0F172A' : 'white', color: form.languages.includes(lang) ? 'white' : '#374151', fontSize: 14, fontWeight: 500 }}>
                    <input type="checkbox" checked={form.languages.includes(lang)} onChange={() => toggleLang(lang)} style={{ display: 'none' }} />
                    {lang}
                  </label>
                ))}
              </div>
            </div>

            {/* Strategy context preview — shown when prefill active */}
            {strategyContext && (
              <div style={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ ...s.sectionTitle, margin: 0 }}>Strategy context for AI generation</div>
                  <span style={s.badge('#D1FAE5', '#065F46')}>Auto-filled from strategy</span>
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 8, lineHeight: 1.6 }}>
                  This context will be sent to the AI alongside your campaign details to generate more targeted copy based on your research and strategy.
                </p>
                <textarea
                  style={{ ...s.textarea, minHeight: 140, fontSize: 13, background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                  value={strategyContext}
                  onChange={e => setStrategyContext(e.target.value)}
                />
              </div>
            )}

            <button style={s.btn('#0F172A', 'white')} onClick={() => { if (!service) { showToast('Select a service first'); return; } setStep(2); }}>
              Next: AI generation →
            </button>
          </div>
        )}

        {/* ── STEP 2: AI GENERATE ── */}
        {step === 2 && (
          <div>
            <div style={s.card}>
              <div style={s.sectionTitle}>Ready to generate</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Service',    value: service },
                  { label: 'Location',   value: form.location },
                  { label: 'Daily budget', value: `€${form.dailyBudget}` },
                  { label: 'Languages',  value: form.languages.join(', ') },
                ].map(m => (
                  <div key={m.label} style={{ background: '#F8FAFC', borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {strategyPrefill && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#065F46', lineHeight: 1.7 }}>
                  ✓ <strong>Strategy context active</strong> — AI will use your competitor research, recommended bidding strategy and targeting insights to generate more relevant campaign copy.
                </div>
              )}

              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20, lineHeight: 1.7 }}>
                Claude AI will generate <strong>creative, policy-compliant</strong> headlines, descriptions, keywords, callouts, sitelinks and image suggestions specifically for <strong>{service}</strong> in <strong>{form.location}</strong> — in {form.languages.join(', ')}.
                {strategyPrefill && ' Informed by your AI strategy analysis.'}
              </p>

              {loading ? (
                <div style={{ background: '#F0FDF4', color: '#166534', padding: '16px 20px', borderRadius: 10, fontSize: 14 }}>
                  ⏳ Claude AI is generating your campaign copy{strategyPrefill ? ' using your strategy context' : ''}... this takes about 15–30 seconds.
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={s.btn('#6B7280', 'white')} onClick={() => setStep(1)}>← Back</button>
                  <button style={s.btn('#0F172A', 'white')} onClick={runGenerate}>
                    ✨ {strategyPrefill ? 'Generate with AI + Strategy' : 'Generate with AI'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: EDIT & IMAGES ── */}
        {step === 3 && generated && (
          <div>
            {/* Language tabs */}
            <div style={{ display: 'flex', gap: 0, border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', marginBottom: '1rem' }}>
              {form.languages.map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)} style={{ flex: 1, padding: '10px', fontSize: 13, border: 'none', cursor: 'pointer', background: activeLang === lang ? '#0F172A' : '#F9FAFB', color: activeLang === lang ? 'white' : '#374151', fontWeight: activeLang === lang ? 600 : 400, fontFamily: 'inherit' }}>
                  {lang}
                </button>
              ))}
            </div>

            {/* Bidding strategy — from strategy prefill or AI */}
            {biddingStrategy && (
              <div style={{ background: strategyPrefill ? '#F0FDF4' : '#EFF6FF', color: strategyPrefill ? '#166534' : '#1D4ED8', borderLeft: `4px solid ${strategyPrefill ? '#22C55E' : '#3B82F6'}`, padding: '12px 16px', borderRadius: '0 10px 10px 0', marginBottom: '1rem', fontSize: 13 }}>
                <strong>{strategyPrefill ? '✓ Strategy recommended bidding:' : 'AI recommended bidding strategy:'}</strong> {biddingStrategy}
              </div>
            )}

            <div style={s.card}>
              <div style={s.sectionTitle}>Campaign name</div>
              <input style={s.input} value={getVal(activeLang, 'campaignName')} onChange={e => updateEdited(activeLang, 'campaignName', e.target.value)} />
            </div>

            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={s.sectionTitle}>Headlines</div>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Max 30 chars each — one per line</span>
              </div>
              <textarea style={{ ...s.textarea, minHeight: 180 }} value={getVal(activeLang, 'headlines')} onChange={e => updateEdited(activeLang, 'headlines', e.target.value)} />
              <div style={{ marginTop: 8 }}>
                {(getVal(activeLang, 'headlines') || '').split('\n').filter(Boolean).map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                    <span style={{ color: h.length > 30 ? '#EF4444' : '#111827' }}>{h}</span>
                    <CharBadge text={h} max={30} />
                  </div>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={s.sectionTitle}>Descriptions</div>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Max 90 chars each</span>
              </div>
              <textarea style={{ ...s.textarea, minHeight: 100 }} value={getVal(activeLang, 'descriptions')} onChange={e => updateEdited(activeLang, 'descriptions', e.target.value)} />
              <div style={{ marginTop: 8 }}>
                {(getVal(activeLang, 'descriptions') || '').split('\n').filter(Boolean).map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                    <span style={{ color: d.length > 90 ? '#EF4444' : '#111827' }}>{d}</span>
                    <CharBadge text={d} max={90} />
                  </div>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <div style={s.sectionTitle}>Keywords <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 12, color: '#9CA3AF' }}>(one per line)</span></div>
              <textarea style={{ ...s.textarea, minHeight: 140 }} value={getVal(activeLang, 'keywords')} onChange={e => updateEdited(activeLang, 'keywords', e.target.value)} />
            </div>

            <div style={s.card}>
              <div style={s.sectionTitle}>Callouts <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 12, color: '#9CA3AF' }}>(max 25 chars, one per line)</span></div>
              <textarea style={{ ...s.textarea, minHeight: 80 }} value={getVal(activeLang, 'callouts')} onChange={e => updateEdited(activeLang, 'callouts', e.target.value)} />
            </div>

            <div style={s.card}>
              <div style={s.sectionTitle}>Sitelinks <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 12, color: '#9CA3AF' }}>(format: Text|URL, one per line)</span></div>
              <textarea style={{ ...s.textarea, minHeight: 80 }} value={getVal(activeLang, 'sitelinks')} onChange={e => updateEdited(activeLang, 'sitelinks', e.target.value)} />
            </div>

            <div style={s.card}>
              <div style={s.sectionTitle}>Structured snippet <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 12, color: '#9CA3AF' }}>(format: Header|val1, val2, val3)</span></div>
              <input style={s.input} value={getVal(activeLang, 'structuredSnippets')} onChange={e => updateEdited(activeLang, 'structuredSnippets', e.target.value)} />
            </div>

            {/* Image section */}
            <div style={s.card}>
              <div style={s.sectionTitle}>Images</div>
              {shutterstockQueries.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Shutterstock search suggestions for this campaign:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {shutterstockQueries.map((q, i) => (
                      <a key={i} href={`https://www.shutterstock.com/search/${encodeURIComponent(q)}`} target="_blank" rel="noopener noreferrer"
                        style={{ padding: '6px 14px', background: '#F0FDF4', color: '#166634', borderRadius: 20, fontSize: 13, textDecoration: 'none', border: '1px solid #BBF7D0', fontWeight: 500 }}>
                        🔍 {q} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Or upload your own images:</div>
                <label style={{ display: 'inline-block', padding: '8px 16px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                  📎 Choose images
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                {uploadedImages.length > 0 && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                    {uploadedImages.map((img, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={img.url} alt={img.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #E5E7EB' }} />
                        <button onClick={() => setUploadedImages(p => p.filter((_, j) => j !== i))}
                          style={{ position: 'absolute', top: -6, right: -6, background: '#EF4444', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={s.btn('#6B7280', 'white')} onClick={() => setStep(2)}>← Back</button>
              <button style={s.btn('#0F172A', 'white')} onClick={() => setStep(4)}>Preview ad →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: PREVIEW ── */}
        {step === 4 && (
          <div>
            <div style={s.card}>
              <div style={s.sectionTitle}>Ad preview — {activeLang}</div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {form.languages.map(lang => (
                  <button key={lang} onClick={() => setActiveLang(lang)} style={s.btn(activeLang === lang ? '#0F172A' : '#F3F4F6', activeLang === lang ? 'white' : '#374151', '1px solid #E5E7EB')}>
                    {lang}
                  </button>
                ))}
              </div>

              {/* Google Ad Preview */}
              <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px', maxWidth: 600 }}>
                <div style={{ fontSize: 12, color: '#166534', background: '#F0FDF4', display: 'inline-block', padding: '2px 8px', borderRadius: 4, marginBottom: 8, fontWeight: 600 }}>Ad</div>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{form.finalUrl.replace('https://', '')}</div>
                <div style={{ fontSize: 20, color: '#1A0DAB', fontWeight: 500, marginBottom: 6, lineHeight: 1.3 }}>
                  {previewHeadlines.join(' | ') || 'Your headlines will appear here'}
                </div>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                  {previewDescs[0] || 'Your description will appear here.'}
                </div>
                {previewDescs[1] && <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{previewDescs[1]}</div>}
                {getVal(activeLang, 'sitelinks') && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                    {(getVal(activeLang, 'sitelinks') || '').split('\n').filter(Boolean).slice(0, 4).map((sl, i) => {
                      const [text] = sl.split('|');
                      return <span key={i} style={{ fontSize: 13, color: '#1A0DAB', textDecoration: 'underline', cursor: 'pointer' }}>{text}</span>;
                    })}
                  </div>
                )}
                {getVal(activeLang, 'callouts') && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    {(getVal(activeLang, 'callouts') || '').split('\n').filter(Boolean).slice(0, 4).map((c, i) => (
                      <span key={i} style={{ fontSize: 12, color: '#374151' }}>{i > 0 ? '·' : ''} {c}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Campaign summary */}
            <div style={s.card}>
              <div style={s.sectionTitle}>Campaign summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Campaigns',    value: form.languages.length },
                  { label: 'Daily budget', value: `€${form.dailyBudget} each` },
                  { label: 'Service',      value: service },
                  { label: 'Location',     value: form.location },
                ].map(m => (
                  <div key={m.label} style={{ background: '#F8FAFC', borderRadius: 10, padding: '12px' }}>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {form.languages.map(lang => {
                const hls   = (getVal(lang, 'headlines') || '').split('\n').filter(Boolean);
                const descs = (getVal(lang, 'descriptions') || '').split('\n').filter(Boolean);
                const kws   = (getVal(lang, 'keywords') || '').split('\n').filter(Boolean);
                const hlOk  = hls.length >= 3;
                const descOk = descs.length >= 2;
                const kwOk  = kws.length >= 1;
                return (
                  <div key={lang} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                    <span style={{ fontWeight: 500 }}>{lang}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={s.badge(hlOk ? '#D1FAE5' : '#FEE2E2', hlOk ? '#065F46' : '#991B1B')}>{hls.length} headlines</span>
                      <span style={s.badge(descOk ? '#D1FAE5' : '#FEE2E2', descOk ? '#065F46' : '#991B1B')}>{descs.length} desc</span>
                      <span style={s.badge(kwOk ? '#D1FAE5' : '#FEE2E2', kwOk ? '#065F46' : '#991B1B')}>{kws.length} keywords</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={s.btn('#6B7280', 'white')} onClick={() => setStep(3)}>← Edit</button>
              <button style={s.btn('#166534', 'white')} onClick={() => setStep(5)}>Proceed to launch →</button>
            </div>
          </div>
        )}

        {/* ── STEP 5: LAUNCH ── */}
        {step === 5 && (
          <div>
            <div style={s.card}>
              <div style={s.sectionTitle}>Ready to launch</div>
              <div style={{ background: '#FEF3C7', color: '#92400E', padding: '14px 18px', borderRadius: 10, fontSize: 14, marginBottom: 16, lineHeight: 1.7 }}>
                ⚠️ Campaigns will be created as <strong>PAUSED</strong>. You can review and enable them in the Campaign Manager.
              </div>

              {strategyPrefill && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#065F46', lineHeight: 1.7 }}>
                  ✓ <strong>Strategy-informed campaigns</strong> — these campaigns were generated using your AI strategy analysis and competitor research.
                </div>
              )}

              <div style={{ fontSize: 15, color: '#374151', marginBottom: 20, lineHeight: 1.7 }}>
                You are about to create <strong>{form.languages.length} campaign(s)</strong> for <strong>{service}</strong> in {form.location} with a daily budget of <strong>€{form.dailyBudget}</strong> each.
              </div>

              {loading ? (
                <div style={{ background: '#F0FDF4', color: '#166534', padding: '16px 20px', borderRadius: 10, fontSize: 14 }}>
                  ⏳ Creating campaigns in Google Ads...
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button style={s.btn('#6B7280', 'white')} onClick={() => setStep(4)}>← Back</button>
                  <button style={s.btn('#166534', 'white')} onClick={launchCampaigns}>
                    🚀 Launch campaigns
                  </button>
                  <a href="/google-ads-manager" style={{ ...s.btn('transparent', '#374151', '1px solid #E5E7EB'), textDecoration: 'none' }}>
                    Go to Campaign Manager
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
