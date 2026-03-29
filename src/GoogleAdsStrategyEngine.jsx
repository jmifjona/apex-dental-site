import React, { useState } from 'react';

const CLAUDE_API = 'https://api.anthropic.com/v1/messages';

function callClaude(systemPrompt, userPrompt, useWebSearch = true) {
  const body = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  };
  if (useWebSearch) {
    body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
  }
  return fetch(CLAUDE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(async res => {
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'API error');
    }
    const data = await res.json();
    return data.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
  });
}

function parseJSON(text) {
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    return null;
  }
}

const card = { background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '1.25rem', marginBottom: '1rem' };
const btn = (bg, color, border = 'none') => ({ padding: '8px 18px', fontSize: 14, borderRadius: 8, border, background: bg, color, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' });
const label = { display: 'block', fontSize: 13, color: '#6B7280', marginBottom: 4 };
const input = { width: '100%', fontSize: 14, color: '#111827', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontFamily: 'inherit', boxSizing: 'border-box' };
const chip = { display: 'inline-block', padding: '3px 12px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 20, fontSize: 12, margin: 3 };

function ScoreBar({ score }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ width: `${score}%`, background: color, height: '100%', borderRadius: 3, transition: 'width 0.8s ease' }} />
    </div>
  );
}

function AlertBox({ type, children }) {
  const styles = {
    info: { bg: '#EFF6FF', color: '#1D4ED8' },
    success: { bg: '#F0FDF4', color: '#166534' },
    warn: { bg: '#FFFBEB', color: '#92400E' },
    error: { bg: '#FEF2F2', color: '#991B1B' },
  };
  const s = styles[type] || styles.info;
  return <div style={{ background: s.bg, color: s.color, padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>{children}</div>;
}

// ── COMPETITOR RESEARCH TAB ──────────────────────────────────
function ResearchTab() {
  const [service, setService] = useState('dental implants Malta');
  const [business, setBusiness] = useState('Apex Dental Malta');
  const [competitors, setCompetitors] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState('');

  async function run() {
    if (!service.trim()) { setError('Enter a service to research'); return; }
    setLoading(true); setError(''); setResults(null); setRawText('');
    try {
      const prompt = `Research Google Ads strategies for dental clinics competing for "${service}".
My business: ${business}
Known competitors: ${competitors || 'any dental clinics in Malta and major international dental brands'}

Search the web and analyse:
1. Headlines and ad copy angles top dental clinics use
2. Keywords commonly targeted (local and broad)
3. USPs competitors emphasise
4. Common sitelinks and extensions
5. Bidding strategy and positioning of top performers
6. Gaps ${business} could exploit

Respond with valid JSON only:
{
  "competitor_angles": [],
  "top_keywords": [],
  "common_usps": [],
  "opportunities": [],
  "suggested_headlines": [],
  "suggested_descriptions": [],
  "recommended_strategy": ""
}`;
      const text = await callClaude('You are a Google Ads expert in dental marketing. Respond with valid JSON only, no markdown.', prompt, true);
      const data = parseJSON(text);
      if (data) setResults(data);
      else setRawText(text);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Research settings</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div><label style={label}>Service to research</label><input style={input} value={service} onChange={e => setService(e.target.value)} /></div>
          <div><label style={label}>Your business</label><input style={input} value={business} onChange={e => setBusiness(e.target.value)} /></div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={label}>Known competitors (optional, one per line)</label>
          <textarea style={{ ...input, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} value={competitors} onChange={e => setCompetitors(e.target.value)} placeholder="e.g. Savina Clinic&#10;mydentist.com" />
        </div>
        {error && <AlertBox type="error">{error}</AlertBox>}
        <button style={btn('#1E3A5F', 'white')} onClick={run} disabled={loading}>
          {loading ? '⏳ Researching with AI + web search...' : '🔍 Analyse competitors with AI'}
        </button>
      </div>

      {rawText && <div style={card}><pre style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: '#111827' }}>{rawText}</pre></div>}

      {results && (
        <div style={card}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Competitor analysis: {service}</div>

          {results.competitor_angles?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Ad copy angles competitors use</div>
              {results.competitor_angles.map((a, i) => <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 6, fontSize: 13, lineHeight: 1.6 }}>{a}</div>)}
            </div>
          )}

          {results.top_keywords?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Top keywords to target</div>
              <div>{results.top_keywords.map((k, i) => <span key={i} style={chip}>{k}</span>)}</div>
            </div>
          )}

          {results.common_usps?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Common USPs competitors highlight</div>
              {results.common_usps.map((u, i) => <div key={i} style={{ padding: '5px 0', fontSize: 13, borderBottom: '1px solid #F3F4F6' }}>✓ {u}</div>)}
            </div>
          )}

          {results.opportunities?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Opportunities for {business}</div>
              {results.opportunities.map((o, i) => <div key={i} style={{ background: '#F0FDF4', color: '#166534', borderLeft: '3px solid #22C55E', padding: '10px 14px', borderRadius: '0 8px 8px 0', marginBottom: 6, fontSize: 13 }}>{o}</div>)}
            </div>
          )}

          {results.suggested_headlines?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Suggested headlines</div>
              {results.suggested_headlines.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                  <span>{h}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: h.length > 30 ? '#FEF3C7' : '#D1FAE5', color: h.length > 30 ? '#92400E' : '#065F46' }}>{h.length}/30</span>
                </div>
              ))}
            </div>
          )}

          {results.recommended_strategy && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Recommended bidding strategy</div>
              <div style={{ background: '#EFF6FF', color: '#1D4ED8', borderLeft: '3px solid #3B82F6', padding: '10px 14px', borderRadius: '0 8px 8px 0', fontSize: 13 }}>{results.recommended_strategy}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── CAMPAIGN SCORER TAB ──────────────────────────────────────
function ScorerTab() {
  const [headlines, setHeadlines] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [keywords, setKeywords] = useState('');
  const [service, setService] = useState('Dental Implants');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  async function run() {
    if (!headlines || !descriptions) { setError('Enter at least headlines and descriptions'); return; }
    setLoading(true); setError(''); setResults(null);
    try {
      const prompt = `Score this Google Ads campaign for a dental clinic offering "${service}":

HEADLINES:\n${headlines}
DESCRIPTIONS:\n${descriptions}
KEYWORDS:\n${keywords}

Score each area 0-100 and provide actionable feedback. Respond with JSON only:
{
  "overall_score": 72,
  "scores": { "headline_quality": 80, "description_quality": 65, "keyword_relevance": 70, "policy_risk": 90, "character_compliance": 85, "usp_clarity": 60 },
  "issues": [],
  "quick_wins": [],
  "improved_headlines": [],
  "improved_descriptions": [],
  "bidding_recommendation": "",
  "summary": ""
}`;
      const text = await callClaude('You are a Google Ads quality expert. Respond with valid JSON only.', prompt, false);
      const data = parseJSON(text);
      if (data) setResults(data);
      else setError('Could not parse AI response. Raw: ' + text.slice(0, 200));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const scoreColor = s => s >= 80 ? '#10B981' : s >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Paste your current ad copy</div>
        <div style={{ marginBottom: 12 }}><label style={label}>Headlines (one per line)</label><textarea style={{ ...input, minHeight: 100, resize: 'vertical', lineHeight: 1.5 }} value={headlines} onChange={e => setHeadlines(e.target.value)} placeholder="Apex Dental&#10;Book Dental Implants&#10;Implants in Malta" /></div>
        <div style={{ marginBottom: 12 }}><label style={label}>Descriptions (one per line)</label><textarea style={{ ...input, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} value={descriptions} onChange={e => setDescriptions(e.target.value)} placeholder="Book dental implants at Apex Dental.&#10;Visit our website to book online in Malta." /></div>
        <div style={{ marginBottom: 12 }}><label style={label}>Keywords (one per line)</label><textarea style={{ ...input, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="dental implants malta&#10;apex dental" /></div>
        <div style={{ marginBottom: 12 }}><label style={label}>Service / treatment</label><input style={input} value={service} onChange={e => setService(e.target.value)} /></div>
        {error && <AlertBox type="error">{error}</AlertBox>}
        <button style={btn('#1E3A5F', 'white')} onClick={run} disabled={loading}>
          {loading ? '⏳ Scoring with AI...' : '📊 Score my campaign'}
        </button>
      </div>

      {results && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: scoreColor(results.overall_score) }}>{results.overall_score}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Overall score</div>
            </div>
            <div style={{ flex: 1, fontSize: 13, lineHeight: 1.7, color: '#6B7280' }}>{results.summary}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            {Object.entries(results.scores || {}).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: '#6B7280' }}>{k.replace(/_/g, ' ')}</span>
                  <span style={{ fontWeight: 500, color: scoreColor(v) }}>{v}/100</span>
                </div>
                <ScoreBar score={v} />
              </div>
            ))}
          </div>

          {results.issues?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Issues to fix</div>
              {results.issues.map((i, idx) => <div key={idx} style={{ background: '#FEF2F2', color: '#991B1B', borderLeft: '3px solid #EF4444', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginBottom: 6, fontSize: 13 }}>{i}</div>)}
            </div>
          )}

          {results.quick_wins?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Quick wins</div>
              {results.quick_wins.map((w, idx) => <div key={idx} style={{ background: '#F0FDF4', color: '#166534', borderLeft: '3px solid #22C55E', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginBottom: 6, fontSize: 13 }}>{w}</div>)}
            </div>
          )}

          {results.improved_headlines?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Improved headlines</div>
              {results.improved_headlines.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                  <span>{h}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: h.length > 30 ? '#FEF3C7' : '#D1FAE5', color: h.length > 30 ? '#92400E' : '#065F46' }}>{h.length}/30</span>
                </div>
              ))}
            </div>
          )}

          {results.bidding_recommendation && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Bidding recommendation</div>
              <div style={{ background: '#EFF6FF', color: '#1D4ED8', borderLeft: '3px solid #3B82F6', padding: '10px 14px', borderRadius: '0 8px 8px 0', fontSize: 13 }}>{results.bidding_recommendation}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── STRATEGY ADVISOR TAB ─────────────────────────────────────
function StrategyTab() {
  const [form, setForm] = useState({ budget: 600, goal: 'Get appointment bookings', clicks: 14831, conversions: 0, challenge: '', services: 'Dental Implants, Invisalign, Teeth Whitening, Veneers' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }

  async function run() {
    setLoading(true); setError(''); setResults(null);
    try {
      const prompt = `Create a comprehensive Google Ads strategy for Apex Dental Malta.

Data:
- Monthly budget: €${form.budget}
- Primary goal: ${form.goal}
- Monthly clicks: ${form.clicks}
- Monthly conversions: ${form.conversions}
- Main challenge: ${form.challenge || 'Not specified'}
- Services: ${form.services}
- Location: Malta (multilingual: English, Italian, Spanish)

Respond with JSON only:
{
  "recommended_bidding_strategy": "",
  "bidding_rationale": "",
  "budget_allocation": { "search_campaigns": "60%", "performance_max": "40%" },
  "campaign_structure": [],
  "priority_services": [],
  "targeting_recommendations": [],
  "expected_outcomes": "",
  "quick_action_items": [],
  "30_day_plan": []
}`;
      const text = await callClaude('You are a senior Google Ads strategist for dental clinics in competitive European markets. Respond with valid JSON only.', prompt, true);
      const data = parseJSON(text);
      if (data) setResults(data);
      else setError('Could not parse AI response.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Your campaign context</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div><label style={label}>Monthly budget (€)</label><input type="number" style={input} value={form.budget} onChange={e => set('budget', e.target.value)} /></div>
          <div><label style={label}>Primary goal</label>
            <select style={input} value={form.goal} onChange={e => set('goal', e.target.value)}>
              <option>Get appointment bookings</option>
              <option>Increase brand awareness</option>
              <option>Promote a specific treatment</option>
              <option>Compete against specific clinics</option>
            </select>
          </div>
          <div><label style={label}>Current monthly clicks</label><input type="number" style={input} value={form.clicks} onChange={e => set('clicks', e.target.value)} /></div>
          <div><label style={label}>Current monthly conversions</label><input type="number" style={input} value={form.conversions} onChange={e => set('conversions', e.target.value)} /></div>
        </div>
        <div style={{ marginBottom: 12 }}><label style={label}>Biggest challenge</label><textarea style={{ ...input, minHeight: 60, resize: 'vertical', lineHeight: 1.5 }} value={form.challenge} onChange={e => set('challenge', e.target.value)} placeholder="e.g. High CPC, low conversion rate..." /></div>
        <div style={{ marginBottom: 12 }}><label style={label}>Services to promote</label><input style={input} value={form.services} onChange={e => set('services', e.target.value)} /></div>
        {error && <AlertBox type="error">{error}</AlertBox>}
        <button style={btn('#1E3A5F', 'white')} onClick={run} disabled={loading}>
          {loading ? '⏳ Generating strategy with AI...' : '🤖 Get AI strategy recommendations'}
        </button>
      </div>

      {results && (
        <div style={card}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Your personalised Google Ads strategy</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Recommended bidding strategy</div>
            <div style={{ background: '#EFF6FF', color: '#1D4ED8', borderLeft: '3px solid #3B82F6', padding: '12px 14px', borderRadius: '0 8px 8px 0', fontSize: 13 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{results.recommended_bidding_strategy}</div>
              <div>{results.bidding_rationale}</div>
            </div>
          </div>

          {results.budget_allocation && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Budget allocation</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(results.budget_allocation).map(([k, v]) => (
                  <div key={k} style={{ flex: '1 1 120px', background: '#F8FAFC', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1D4ED8' }}>{v}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{k.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.campaign_structure?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Campaign structure</div>
              {results.campaign_structure.map((c, i) => <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}><span style={{ color: '#9CA3AF', minWidth: 20 }}>{i + 1}.</span><span>{c}</span></div>)}
            </div>
          )}

          {results.priority_services?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Priority services</div>
              <div>{results.priority_services.map((s, i) => <span key={i} style={chip}>{s}</span>)}</div>
            </div>
          )}

          {results.quick_action_items?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Quick action items</div>
              {results.quick_action_items.map((a, i) => (
                <div key={i} style={{ background: '#F0FDF4', color: '#166534', borderLeft: '3px solid #22C55E', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginBottom: 6, fontSize: 13 }}>
                  <strong>{i + 1}.</strong> {a}
                </div>
              ))}
            </div>
          )}

          {results['30_day_plan']?.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>30-day action plan</div>
              {results['30_day_plan'].map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13, alignItems: 'flex-start' }}>
                  <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap' }}>Week {i + 1}</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────
export default function GoogleAdsStrategyEngine() {
  const [tab, setTab] = useState('research');
  const tabs = [
    { id: 'research', label: '🔍 Competitor research' },
    { id: 'score', label: '📊 Campaign scorer' },
    { id: 'strategy', label: '🤖 Strategy advisor' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#F1F5F9', paddingTop: 120, paddingBottom: 80 }}>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ background: '#0F172A', color: 'white', borderRadius: 16, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>AI strategy engine</h1>
          <p style={{ color: '#94A3B8', marginTop: 4, fontSize: 14, margin: '4px 0 0' }}>Research competitors, score your campaigns and get AI-powered recommendations</p>
        </div>

        <div style={{ display: 'flex', gap: 0, border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', marginBottom: '1.5rem' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '10px', fontSize: 13, border: 'none', cursor: 'pointer', background: tab === t.id ? '#0F172A' : '#F9FAFB', color: tab === t.id ? 'white' : '#374151', fontWeight: tab === t.id ? 500 : 400, fontFamily: 'inherit' }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'research' && <ResearchTab />}
        {tab === 'score' && <ScorerTab />}
        {tab === 'strategy' && <StrategyTab />}
      </section>
    </main>
  );
}
