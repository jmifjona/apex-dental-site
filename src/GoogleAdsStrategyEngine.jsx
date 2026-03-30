import React, { useState } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

const TABS = [
  { id: 'research',  emoji: '🔍', label: 'Competitor Research' },
  { id: 'scorer',    emoji: '📊', label: 'Campaign Scorer' },
  { id: 'advisor',   emoji: '🤖', label: 'Strategy Advisor' },
  { id: 'generator', emoji: '✨', label: 'AI Campaign Generator' },
];

function LoadingPulse({ message = 'Working…', sub }) {
  return (
    <div className="rounded-2xl bg-slate-800/40 border border-amber-400/20 p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
      <div className="text-white font-semibold">{message}</div>
      {sub && <div className="mt-2 text-slate-400 text-sm">{sub}</div>}
      <div className="mt-3 text-xs text-slate-500">AI requests can take 30–90 seconds. Please wait…</div>
    </div>
  );
}

function ErrorBox({ message, onRetry }) {
  return (
    <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6">
      <div className="flex items-start gap-3">
        <span className="text-rose-400 text-lg">⚠</span>
        <div className="flex-1">
          <div className="text-rose-400 font-semibold text-sm">Request failed</div>
          <div className="text-rose-300 text-sm mt-1">{message}</div>
          {message?.toLowerCase().includes('fetch') && (
            <div className="mt-2 text-xs text-slate-400">
              This may be a timeout — the AI request took longer than expected. Try again or check your Railway timeout setting (Settings → Networking → set to 180s).
            </div>
          )}
        </div>
        {onRetry && (
          <button onClick={onRetry} className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 text-xs font-semibold hover:bg-rose-500/30 transition">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

function ResultCard({ title, items = [], color = 'amber' }) {
  const colors = {
    amber: 'border-amber-400/20 bg-amber-400/5',
    sky:   'border-sky-400/20 bg-sky-400/5',
    emerald: 'border-emerald-400/20 bg-emerald-400/5',
    violet: 'border-violet-400/20 bg-violet-400/5',
  };
  const textColors = { amber: 'text-amber-400', sky: 'text-sky-400', emerald: 'text-emerald-400', violet: 'text-violet-400' };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color] || colors.amber}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${textColors[color] || textColors.amber}`}>{title}</div>
      {items.length === 0 && <div className="text-slate-500 text-sm">No data returned.</div>}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${textColors[color]?.replace('text-', 'bg-') || 'bg-amber-400'}`} />
            {typeof item === 'string' ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoreBar({ label, value }) {
  const pct = Math.min(100, Math.max(0, Number(value) || 0));
  const color = pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-bold">{pct}</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full">
        <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Tab: Competitor Research ──────────────────────────────────
function ResearchTab() {
  const [service, setService] = useState('dental implants Malta');
  const [business, setBusiness] = useState('Apex Dental Malta');
  const [competitors, setCompetitors] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function run() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${API}/ai/strategy-research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, business, competitors }),
        signal: AbortSignal.timeout(120000),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Research failed');
      setResult(data);
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'Request timed out after 2 minutes. Try increasing Railway timeout to 180s in your service settings.' : e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Research Settings</div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Service to research</label>
            <input value={service} onChange={e => setService(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Your business</label>
            <input value={business} onChange={e => setBusiness(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Known competitors (optional, one per line)</label>
          <textarea value={competitors} onChange={e => setCompetitors(e.target.value)} rows={3}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
        </div>
        <button onClick={run} disabled={loading}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Analysing…</> : '🔍 Analyse Competitors with AI'}
        </button>
      </div>

      {loading && <LoadingPulse message="Researching competitors with AI + web search…" sub="Searching for competitor ads, keywords and strategies" />}
      {error && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <ResultCard title="Competitor Angles" items={result.competitor_angles || []} color="amber" />
            <ResultCard title="Top Keywords" items={result.top_keywords || []} color="sky" />
            <ResultCard title="Common USPs" items={result.common_usps || []} color="emerald" />
            <ResultCard title="Opportunities for Apex" items={result.opportunities || []} color="violet" />
          </div>
          {result.suggested_headlines?.length > 0 && (
            <ResultCard title="Suggested Headlines" items={result.suggested_headlines} color="amber" />
          )}
          {result.suggested_descriptions?.length > 0 && (
            <ResultCard title="Suggested Descriptions" items={result.suggested_descriptions} color="sky" />
          )}
          {result.recommended_strategy && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Strategy</div>
              <p className="text-slate-300 text-sm leading-7">{result.recommended_strategy}</p>
            </div>
          )}
          {result.raw && (
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Raw AI Response</div>
              <pre className="text-slate-400 text-xs whitespace-pre-wrap overflow-auto max-h-60">{result.raw}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Tab: Campaign Scorer ──────────────────────────────────────
function ScorerTab() {
  const [headlines, setHeadlines] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [keywords, setKeywords] = useState('');
  const [service, setService] = useState('dental implants');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function run() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${API}/ai/score-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlines, descriptions, keywords, service }),
        signal: AbortSignal.timeout(90000),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Scoring failed');
      setResult(data);
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'Request timed out. Please retry.' : e.message);
    } finally { setLoading(false); }
  }

  const scoreFields = [
    ['headline_quality', 'Headline Quality'],
    ['description_quality', 'Description Quality'],
    ['keyword_relevance', 'Keyword Relevance'],
    ['policy_risk', 'Policy Safety'],
    ['character_compliance', 'Character Compliance'],
    ['usp_clarity', 'USP Clarity'],
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Campaign Copy to Score</div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Service</label>
            <input value={service} onChange={e => setService(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Headlines (one per line)</label>
            <textarea value={headlines} onChange={e => setHeadlines(e.target.value)} rows={6}
              placeholder="Book Dental Implants&#10;Apex Dental Malta&#10;Free Consultation"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Descriptions (one per line)</label>
            <textarea value={descriptions} onChange={e => setDescriptions(e.target.value)} rows={6}
              placeholder="Book dental implants at Apex Dental Malta.&#10;Visit our website to book online."
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Keywords (one per line)</label>
            <textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows={6}
              placeholder="dental implants malta&#10;book dentist malta&#10;apex dental"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
          </div>
        </div>
        <button onClick={run} disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Scoring…</> : '📊 Score Campaign Copy'}
        </button>
      </div>

      {loading && <LoadingPulse message="AI is scoring your campaign copy…" sub="Checking policy compliance, quality and relevance" />}
      {error && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
          {/* Overall score */}
          <div className="rounded-2xl bg-slate-800/40 border border-amber-400/20 p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-6xl font-black text-amber-400">{result.overall_score}</div>
              <div className="text-xs text-slate-400 mt-1">Overall Score</div>
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold mb-1">Campaign Quality Rating</div>
              <p className="text-slate-400 text-sm leading-6">{result.summary}</p>
            </div>
          </div>

          {/* Score bars */}
          {result.scores && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Score Breakdown</div>
              <div className="grid md:grid-cols-2 gap-4">
                {scoreFields.map(([key, label]) => (
                  <ScoreBar key={key} label={label} value={result.scores[key]} />
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {result.issues?.length > 0 && <ResultCard title="Issues Found" items={result.issues} color="amber" />}
            {result.quick_wins?.length > 0 && <ResultCard title="Quick Wins" items={result.quick_wins} color="emerald" />}
            {result.improved_headlines?.length > 0 && <ResultCard title="Improved Headlines" items={result.improved_headlines} color="sky" />}
            {result.improved_descriptions?.length > 0 && <ResultCard title="Improved Descriptions" items={result.improved_descriptions} color="violet" />}
          </div>

          {result.bidding_recommendation && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bidding Recommendation</div>
              <p className="text-slate-300 text-sm leading-7">{result.bidding_recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Tab: Strategy Advisor ─────────────────────────────────────
function AdvisorTab() {
  const [budget, setBudget] = useState('600');
  const [goal, setGoal] = useState('Get appointment bookings');
  const [clicks, setClicks] = useState('');
  const [conversions, setConversions] = useState('');
  const [challenge, setChallenge] = useState('');
  const [services, setServices] = useState('Dental Implants, Invisalign, Teeth Whitening');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function run() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${API}/ai/strategy-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget, goal, clicks, conversions, challenge, services }),
        signal: AbortSignal.timeout(120000),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Strategy generation failed');
      setResult(data);
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'Request timed out. Please retry.' : e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Campaign Data</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Monthly budget (€)', value: budget, set: setBudget, placeholder: '600' },
            { label: 'Primary goal', value: goal, set: setGoal, placeholder: 'Get appointment bookings' },
            { label: 'Monthly clicks', value: clicks, set: setClicks, placeholder: '0' },
            { label: 'Monthly conversions', value: conversions, set: setConversions, placeholder: '0' },
            { label: 'Services', value: services, set: setServices, placeholder: 'Dental Implants, Invisalign…' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Main challenge (optional)</label>
          <textarea value={challenge} onChange={e => setChallenge(e.target.value)} rows={2}
            placeholder="e.g. Low conversion rate, high CPC, not enough impressions…"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
        </div>
        <button onClick={run} disabled={loading}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Generating…</> : '🤖 Generate Strategy'}
        </button>
      </div>

      {loading && <LoadingPulse message="AI is building your strategy…" sub="Analysing budget, goals and campaign structure" />}
      {error && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
          {/* Bidding strategy */}
          {result.recommended_bidding_strategy && (
            <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Recommended Bidding Strategy</div>
              <div className="text-white font-semibold text-lg">{result.recommended_bidding_strategy}</div>
              {result.bidding_rationale && <p className="text-slate-400 text-sm mt-2 leading-7">{result.bidding_rationale}</p>}
            </div>
          )}

          {/* Budget allocation */}
          {result.budget_allocation && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Budget Allocation</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(result.budget_allocation).map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-slate-900 px-4 py-3 text-center">
                    <div className="text-amber-400 font-bold text-lg">{v}</div>
                    <div className="text-slate-400 text-xs mt-1 capitalize">{k.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {result.campaign_structure?.length > 0 && <ResultCard title="Campaign Structure" items={result.campaign_structure} color="sky" />}
            {result.priority_services?.length > 0 && <ResultCard title="Priority Services" items={result.priority_services} color="emerald" />}
            {result.targeting_recommendations?.length > 0 && <ResultCard title="Targeting Recommendations" items={result.targeting_recommendations} color="violet" />}
            {result.quick_action_items?.length > 0 && <ResultCard title="Quick Action Items" items={result.quick_action_items} color="amber" />}
          </div>

          {result.expected_outcomes && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Expected Outcomes</div>
              <p className="text-slate-300 text-sm leading-7">{result.expected_outcomes}</p>
            </div>
          )}

          {result['30_day_plan']?.length > 0 && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">30-Day Action Plan</div>
              <div className="space-y-2">
                {result['30_day_plan'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-slate-300 text-sm leading-6">{typeof item === 'string' ? item : JSON.stringify(item)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.raw && (
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Raw AI Response</div>
              <pre className="text-slate-400 text-xs whitespace-pre-wrap overflow-auto max-h-60">{result.raw}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Tab: AI Campaign Generator ────────────────────────────────
function GeneratorTab() {
  const [service, setService] = useState('Dental Implants');
  const [location, setLocation] = useState('Malta');
  const [businessName, setBusinessName] = useState('Apex Dental');
  const [finalUrl, setFinalUrl] = useState('https://www.apexdentalmalta.com');
  const [languages, setLanguages] = useState(['English', 'Italian', 'Spanish']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [activeLang, setActiveLang] = useState('English');

  const allLangs = ['English', 'Italian', 'Spanish'];

  function toggleLang(lang) {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  }

  async function run() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${API}/ai/generate-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, location, businessName, finalUrl, languages }),
        signal: AbortSignal.timeout(120000),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Generation failed');
      setResult(data);
      if (data.campaigns) setActiveLang(Object.keys(data.campaigns)[0]);
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'Request timed out. Please retry.' : e.message);
    } finally { setLoading(false); }
  }

  const camp = result?.campaigns?.[activeLang];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Campaign Settings</div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Service', value: service, set: setService },
            { label: 'Location', value: location, set: setLocation },
            { label: 'Business name', value: businessName, set: setBusinessName },
            { label: 'Final URL', value: finalUrl, set: setFinalUrl },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-2">Languages</label>
          <div className="flex gap-2">
            {allLangs.map(l => (
              <button key={l} onClick={() => toggleLang(l)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  languages.includes(l) ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button onClick={run} disabled={loading || languages.length === 0}
          className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Generating…</> : '✨ Generate AI Campaign Copy'}
        </button>
      </div>

      {loading && <LoadingPulse message="AI is generating campaign copy…" sub={`Creating ${languages.join(', ')} campaign copy with policy-safe content`} />}
      {error && <ErrorBox message={error} onRetry={run} />}

      {result && camp && (
        <div className="space-y-4">
          {/* Language tabs */}
          {Object.keys(result.campaigns).length > 1 && (
            <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50 w-fit">
              {Object.keys(result.campaigns).map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${activeLang === lang ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                  {lang}
                </button>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Headlines */}
            <div className="rounded-2xl bg-slate-800/40 border border-amber-400/20 p-5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">Headlines ({camp.headlines?.length || 0})</div>
              <div className="space-y-2">
                {(camp.headlines || []).map((h, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <span className="text-slate-300 text-sm">{h}</span>
                    <span className={`text-xs shrink-0 ${h.length > 30 ? 'text-rose-400' : 'text-slate-500'}`}>{h.length}/30</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="rounded-2xl bg-slate-800/40 border border-sky-400/20 p-5">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">Descriptions ({camp.descriptions?.length || 0})</div>
              <div className="space-y-2">
                {(camp.descriptions || []).map((d, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <span className="text-slate-300 text-sm">{d}</span>
                    <span className={`text-xs shrink-0 ${d.length > 90 ? 'text-rose-400' : 'text-slate-500'}`}>{d.length}/90</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="rounded-2xl bg-slate-800/40 border border-emerald-400/20 p-5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Keywords ({camp.keywords?.length || 0})</div>
              <div className="flex flex-wrap gap-2">
                {(camp.keywords || []).map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">{k}</span>
                ))}
              </div>
            </div>

            {/* Callouts & sitelinks */}
            <div className="rounded-2xl bg-slate-800/40 border border-violet-400/20 p-5">
              <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Callouts & Sitelinks</div>
              {(camp.callouts || []).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-300">{c}</span>
                  <span className={`text-xs ${c.length > 25 ? 'text-rose-400' : 'text-slate-500'}`}>{c.length}/25</span>
                </div>
              ))}
              {(camp.sitelinks || []).map((s, i) => (
                <div key={i} className="text-slate-400 text-xs mt-1">🔗 {s}</div>
              ))}
              {camp.structuredSnippets && (
                <div className="text-slate-400 text-xs mt-2">📋 {camp.structuredSnippets}</div>
              )}
            </div>
          </div>

          {/* Bidding strategy */}
          {result.biddingStrategy && (
            <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Recommended Bidding</div>
              <div className="text-white font-semibold">{result.biddingStrategy}</div>
              {result.biddingRationale && <p className="text-slate-400 text-sm mt-2 leading-6">{result.biddingRationale}</p>}
            </div>
          )}

          {/* Shutterstock queries */}
          {result.shutterstockQueries?.length > 0 && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Shutterstock Image Queries</div>
              <div className="flex flex-wrap gap-2">
                {result.shutterstockQueries.map((q, i) => (
                  <a key={i} href={`https://www.shutterstock.com/search/${encodeURIComponent(q)}`} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs hover:border-amber-400 hover:text-amber-400 transition">
                    🖼 {q}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function GoogleAdsStrategyEngine() {
  const [activeTab, setActiveTab] = useState('research');

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">Apex Dental</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">AI Strategy Engine</h1>
            <p className="mt-1 text-slate-400 text-sm">Research competitors, score campaigns and get AI-powered recommendations</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/google-ads-dashboard" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">← Dashboard</a>
            <a href="/google-ads-manager" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">Campaign Manager</a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === t.id
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
              }`}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'research'  && <ResearchTab />}
        {activeTab === 'scorer'    && <ScorerTab />}
        {activeTab === 'advisor'   && <AdvisorTab />}
        {activeTab === 'generator' && <GeneratorTab />}

        {/* Nav footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dashboard', href: '/google-ads-dashboard' },
            { label: 'Campaign Manager', href: '/google-ads-manager' },
            { label: 'Campaign Builder', href: '/google-ads-builder' },
            { label: 'AI Strategy', href: '/google-ads-strategy', active: true },
          ].map(l => (
            <a key={l.label} href={l.href}
              className={`rounded-2xl p-4 text-center text-sm font-semibold border transition ${
                l.active ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
