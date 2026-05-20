import React, { useState, useCallback } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

const TABS = [
  { id: 'research',  emoji: '🔍', label: 'Competitor Research' },
  { id: 'scorer',    emoji: '📊', label: 'Campaign Scorer' },
  { id: 'advisor',   emoji: '🤖', label: 'Strategy Advisor' },
  { id: 'generator', emoji: '✨', label: 'AI Campaign Generator' },
  { id: 'deepdive',  emoji: '🔬', label: 'Strategy Deep Dive' },
  { id: 'policy',    emoji: '🛡', label: 'Policy Audit' },
];

// ── Shared UI components ──────────────────────────────────────
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
          {(message?.toLowerCase().includes('fetch') || message?.toLowerCase().includes('timeout')) && (
            <div className="mt-2 text-xs text-slate-400">
              This may be a timeout. Try again or set Railway request timeout to 180s (Service → Settings → Networking).
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
  const borders = { amber: 'border-amber-400/20 bg-amber-400/5', sky: 'border-sky-400/20 bg-sky-400/5', emerald: 'border-emerald-400/20 bg-emerald-400/5', violet: 'border-violet-400/20 bg-violet-400/5' };
  const labels  = { amber: 'text-amber-400', sky: 'text-sky-400', emerald: 'text-emerald-400', violet: 'text-violet-400' };
  const dots    = { amber: 'bg-amber-400', sky: 'bg-sky-400', emerald: 'bg-emerald-400', violet: 'bg-violet-400' };
  return (
    <div className={`rounded-2xl border p-5 ${borders[color] || borders.amber}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${labels[color] || labels.amber}`}>{title}</div>
      {items.length === 0
        ? <div className="text-slate-500 text-sm">No data returned.</div>
        : <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dots[color] || dots.amber}`} />
                {typeof item === 'string' ? item : JSON.stringify(item)}
              </li>
            ))}
          </ul>
      }
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

// ── Research insights summary banner ─────────────────────────
function ResearchInsightsBanner({ insights, onUseInStrategy }) {
  if (!insights) return null;
  return (
    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
            ✓ Research data ready
          </div>
          <div className="text-white text-sm font-medium">
            {insights.top_keywords?.length || 0} keywords · {insights.opportunities?.length || 0} opportunities · {insights.competitor_angles?.length || 0} competitor angles found
          </div>
          <div className="text-slate-400 text-xs mt-1">
            Use this data to pre-fill the Strategy Advisor with AI-selected insights
          </div>
        </div>
        <button
          onClick={onUseInStrategy}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-400 transition flex items-center gap-2 shrink-0"
        >
          🤖 Use in Strategy Advisor →
        </button>
      </div>
    </div>
  );
}

// ── Tab: Competitor Research ──────────────────────────────────
function ResearchTab({ onResearchComplete, storedInsights }) {
  const [service,     setService]     = useState('dental implants Malta');
  const [business,    setBusiness]    = useState('Apex Dental Malta');
  const [competitors, setCompetitors] = useState('');
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [result,      setResult]      = useState(storedInsights || null);

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
      onResearchComplete(data, service, business); // pass up to parent
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'Request timed out after 2 minutes. Please retry.' : e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      {/* Settings */}
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
          {loading
            ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Analysing…</>
            : '🔍 Analyse Competitors with AI'}
        </button>
      </div>

      {loading && <LoadingPulse message="Researching competitors with AI + web search…" sub="Searching for competitor ads, keywords and strategies" />}
      {error   && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
          {/* Use in strategy CTA */}
          <ResearchInsightsBanner insights={result} onUseInStrategy={() => onResearchComplete(result, service, business, true)} />

          <div className="grid md:grid-cols-2 gap-4">
            <ResultCard title="Competitor Angles"      items={result.competitor_angles || []}  color="amber" />
            <ResultCard title="Top Keywords"           items={result.top_keywords || []}       color="sky" />
            <ResultCard title="Common USPs"            items={result.common_usps || []}        color="emerald" />
            <ResultCard title="Opportunities for Apex" items={result.opportunities || []}      color="violet" />
          </div>
          {result.suggested_headlines?.length > 0 && (
            <ResultCard title="Suggested Headlines"    items={result.suggested_headlines}      color="amber" />
          )}
          {result.suggested_descriptions?.length > 0 && (
            <ResultCard title="Suggested Descriptions" items={result.suggested_descriptions}   color="sky" />
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
  const [headlines,     setHeadlines]     = useState('');
  const [descriptions,  setDescriptions]  = useState('');
  const [keywords,      setKeywords]      = useState('');
  const [service,       setService]       = useState('dental implants');
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');
  const [result,        setResult]        = useState(null);

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
    ['headline_quality',    'Headline Quality'],
    ['description_quality', 'Description Quality'],
    ['keyword_relevance',   'Keyword Relevance'],
    ['policy_risk',         'Policy Safety'],
    ['character_compliance','Character Compliance'],
    ['usp_clarity',         'USP Clarity'],
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Campaign Copy to Score</div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Service</label>
          <input value={service} onChange={e => setService(e.target.value)}
            className="w-full md:w-64 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Headlines (one per line)',     value: headlines,    set: setHeadlines,    placeholder: 'Book Dental Implants\nApex Dental Malta\nFree Consultation' },
            { label: 'Descriptions (one per line)',  value: descriptions, set: setDescriptions, placeholder: 'Book dental implants at Apex Dental Malta.\nVisit our website to book online.' },
            { label: 'Keywords (one per line)',      value: keywords,     set: setKeywords,     placeholder: 'dental implants malta\nbook dentist malta\napex dental' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
              <textarea value={f.value} onChange={e => f.set(e.target.value)} rows={6} placeholder={f.placeholder}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
            </div>
          ))}
        </div>
        <button onClick={run} disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Scoring…</> : '📊 Score Campaign Copy'}
        </button>
      </div>

      {loading && <LoadingPulse message="AI is scoring your campaign copy…" sub="Checking policy compliance, quality and relevance" />}
      {error   && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
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
          {result.scores && (
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Score Breakdown</div>
              <div className="grid md:grid-cols-2 gap-4">
                {scoreFields.map(([key, label]) => <ScoreBar key={key} label={label} value={result.scores[key]} />)}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {result.issues?.length > 0              && <ResultCard title="Issues Found"          items={result.issues}               color="amber" />}
            {result.quick_wins?.length > 0           && <ResultCard title="Quick Wins"            items={result.quick_wins}           color="emerald" />}
            {result.improved_headlines?.length > 0   && <ResultCard title="Improved Headlines"    items={result.improved_headlines}   color="sky" />}
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
function AdvisorTab({ prefill }) {
  const [budget,      setBudget]      = useState('600');
  const [goal,        setGoal]        = useState('Get appointment bookings');
  const [clicks,      setClicks]      = useState('');
  const [conversions, setConversions] = useState('');
  const [challenge,   setChallenge]   = useState('');
  const [services,    setServices]    = useState('Dental Implants, Invisalign, Teeth Whitening');
  const [context,     setContext]     = useState(''); // populated from research
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [result,      setResult]      = useState(null);
  const [prefillApplied, setPrefillApplied] = useState(false);

  // Apply prefill from research when it arrives
  React.useEffect(() => {
    if (!prefill || prefillApplied) return;

    const lines = [];

    if (prefill.top_keywords?.length > 0) {
      lines.push(`TOP COMPETITOR KEYWORDS:\n${prefill.top_keywords.slice(0, 8).join(', ')}`);
    }
    if (prefill.opportunities?.length > 0) {
      lines.push(`OPPORTUNITIES IDENTIFIED:\n${prefill.opportunities.slice(0, 5).map(o => `• ${o}`).join('\n')}`);
    }
    if (prefill.competitor_angles?.length > 0) {
      lines.push(`COMPETITOR AD ANGLES:\n${prefill.competitor_angles.slice(0, 5).map(a => `• ${a}`).join('\n')}`);
    }
    if (prefill.common_usps?.length > 0) {
      lines.push(`COMMON USPs IN MARKET:\n${prefill.common_usps.slice(0, 4).map(u => `• ${u}`).join('\n')}`);
    }
    if (prefill.recommended_strategy) {
      lines.push(`RESEARCH RECOMMENDATION:\n${prefill.recommended_strategy}`);
    }

    setContext(lines.join('\n\n'));

    if (prefill.service) setServices(prefill.service);
    if (prefill.challenge) setChallenge(prefill.challenge);

    setPrefillApplied(true);
  }, [prefill, prefillApplied]);

  async function run() {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${API}/ai/strategy-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget, goal, clicks, conversions,
          challenge: challenge + (context ? `\n\nRESEARCH CONTEXT:\n${context}` : ''),
          services,
        }),
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

      {/* Research context banner */}
      {prefill && (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4 flex items-start gap-3">
          <span className="text-emerald-400 text-lg mt-0.5">✓</span>
          <div>
            <div className="text-emerald-400 text-sm font-bold">Research data loaded</div>
            <div className="text-slate-400 text-xs mt-0.5">
              Competitor keywords, opportunities and angles from your research have been added to the strategy context below.
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Campaign Data</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Monthly budget (€)', value: budget,      set: setBudget,      placeholder: '600' },
            { label: 'Primary goal',       value: goal,        set: setGoal,        placeholder: 'Get appointment bookings' },
            { label: 'Monthly clicks',     value: clicks,      set: setClicks,      placeholder: '0' },
            { label: 'Monthly conversions',value: conversions, set: setConversions, placeholder: '0' },
            { label: 'Services',           value: services,    set: setServices,    placeholder: 'Dental Implants, Invisalign…' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition" />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Main challenge (optional)</label>
          <textarea value={challenge} onChange={e => setChallenge(e.target.value)} rows={2}
            placeholder="e.g. Low conversion rate, high CPC, not enough impressions…"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none" />
        </div>

        {/* Research context field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-400">
              Research context {prefill ? <span className="text-emerald-400">(auto-filled from competitor research)</span> : '(optional — paste competitor insights)'}
            </label>
            {context && (
              <button onClick={() => setContext('')} className="text-xs text-slate-500 hover:text-slate-300 transition">
                Clear
              </button>
            )}
          </div>
          <textarea value={context} onChange={e => setContext(e.target.value)} rows={6}
            placeholder="Paste any research notes, competitor findings, keyword ideas…"
            className={`w-full rounded-xl bg-slate-900 border px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400 transition resize-none ${
              prefill ? 'border-emerald-500/40' : 'border-slate-700'
            }`} />
        </div>

        <button onClick={run} disabled={loading}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50 flex items-center gap-2">
          {loading
            ? <><div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" /> Generating…</>
            : '🤖 Generate Strategy'}
        </button>
      </div>

      {loading && <LoadingPulse message="AI is building your strategy…" sub={prefill ? 'Using research data + your campaign stats to build a tailored strategy' : 'Analysing budget, goals and campaign structure'} />}
      {error   && <ErrorBox message={error} onRetry={run} />}

      {result && (
        <div className="space-y-4">
          {result.recommended_bidding_strategy && (
            <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Recommended Bidding Strategy</div>
              <div className="text-white font-semibold text-lg">{result.recommended_bidding_strategy}</div>
              {result.bidding_rationale && <p className="text-slate-400 text-sm mt-2 leading-7">{result.bidding_rationale}</p>}
            </div>
          )}
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
            {result.campaign_structure?.length > 0          && <ResultCard title="Campaign Structure"         items={result.campaign_structure}         color="sky" />}
            {result.priority_services?.length > 0           && <ResultCard title="Priority Services"          items={result.priority_services}          color="emerald" />}
            {result.targeting_recommendations?.length > 0   && <ResultCard title="Targeting Recommendations"  items={result.targeting_recommendations}  color="violet" />}
            {result.quick_action_items?.length > 0          && <ResultCard title="Quick Action Items"         items={result.quick_action_items}         color="amber" />}
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

          {/* ── Implement Strategy CTA ── */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-600/5 border border-amber-400/30 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-amber-400 font-bold text-lg">Ready to implement this strategy?</div>
                <div className="text-slate-400 text-sm mt-1">
                  Send this strategy directly to the Campaign Builder — it will pre-fill your services, budget, goals and context so you can generate and launch campaigns immediately.
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                  {result.priority_services?.length > 0 && (
                    <span>📋 {result.priority_services.length} priority service{result.priority_services.length > 1 ? 's' : ''}</span>
                  )}
                  {result.recommended_bidding_strategy && (
                    <span>💡 {result.recommended_bidding_strategy}</span>
                  )}
                  {result['30_day_plan']?.length > 0 && (
                    <span>📅 {result['30_day_plan'].length}-step action plan</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  // Package strategy data for the Campaign Builder
                  const payload = {
                    from: 'strategy',
                    timestamp: Date.now(),
                    services: services,
                    budget: budget,
                    goal: goal,
                    biddingStrategy: result.recommended_bidding_strategy || '',
                    biddingRationale: result.bidding_rationale || '',
                    priorityServices: result.priority_services || [],
                    campaignStructure: result.campaign_structure || [],
                    targetingRecommendations: result.targeting_recommendations || [],
                    quickActionItems: result.quick_action_items || [],
                    expectedOutcomes: result.expected_outcomes || '',
                    thirtyDayPlan: result['30_day_plan'] || [],
                    budgetAllocation: result.budget_allocation || {},
                    researchContext: context || '',
                  };
                  try {
                    sessionStorage.setItem('apex_strategy_prefill', JSON.stringify(payload));
                  } catch(e) {}
                  window.location.href = '/google-ads-builder';
                }}
                className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition flex items-center gap-2 shrink-0 shadow-lg shadow-amber-400/20"
              >
                🚀 Implement in Campaign Builder →
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ── Tab: AI Campaign Generator ────────────────────────────────
function GeneratorTab() {
  const [service,      setService]      = useState('Dental Implants');
  const [location,     setLocation]     = useState('Malta');
  const [businessName, setBusinessName] = useState('Apex Dental');
  const [finalUrl,     setFinalUrl]     = useState('https://www.apexdentalmalta.com');
  const [languages,    setLanguages]    = useState(['English', 'Italian', 'Spanish']);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [result,       setResult]       = useState(null);
  const [activeLang,   setActiveLang]   = useState('English');

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
            { label: 'Service',       value: service,      set: setService },
            { label: 'Location',      value: location,     set: setLocation },
            { label: 'Business name', value: businessName, set: setBusinessName },
            { label: 'Final URL',     value: finalUrl,     set: setFinalUrl },
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
      {error   && <ErrorBox message={error} onRetry={run} />}

      {result && camp && (
        <div className="space-y-4">
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
            <div className="rounded-2xl bg-slate-800/40 border border-emerald-400/20 p-5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Keywords ({camp.keywords?.length || 0})</div>
              <div className="flex flex-wrap gap-2">
                {(camp.keywords || []).map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">{k}</span>
                ))}
              </div>
            </div>
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
          {result.biddingStrategy && (
            <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Recommended Bidding</div>
              <div className="text-white font-semibold">{result.biddingStrategy}</div>
              {result.biddingRationale && <p className="text-slate-400 text-sm mt-2 leading-6">{result.biddingRationale}</p>}
            </div>
          )}
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

// ── DeepDive tab ──────────────────────────────────────────────

const DEEP_DIVE_CACHE_KEY = 'apexdental_deep_dive_v1';
const DEEP_DIVE_TTL_DAYS  = 14;

function DeepDiveTab() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [cacheAge, setCacheAge] = useState(null);

  // Per-item applied state — keys like 'neg-0', 'pause-kw-2', 'sl-camp-0'
  const [applied, setApplied] = useState({});
  const [applying, setApplying] = useState({});
  const [toast, setToast] = useState(null); // {type:'ok'|'err', text:''}

  // Sitelinks state (separate fetch, separate cache)
  const [sitelinks, setSitelinks] = useState(null);
  const [loadingSitelinks, setLoadingSitelinks] = useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(DEEP_DIVE_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        const ageDays = (Date.now() - new Date(cached.generatedAt).getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays < DEEP_DIVE_TTL_DAYS) {
          setData(cached);
          setCacheAge(Math.floor(ageDays));
        } else {
          localStorage.removeItem(DEEP_DIVE_CACHE_KEY);
        }
      }
      const slRaw = localStorage.getItem('apexdental_sitelinks_v1');
      if (slRaw) {
        const cached = JSON.parse(slRaw);
        const ageDays = (Date.now() - new Date(cached.generatedAt).getTime()) / (1000 * 60 * 60 * 24);
        if (ageDays < DEEP_DIVE_TTL_DAYS) setSitelinks(cached);
      }
      // Restore applied state
      const appliedRaw = localStorage.getItem('apexdental_applied_v1');
      if (appliedRaw) setApplied(JSON.parse(appliedRaw));
    } catch {
      localStorage.removeItem(DEEP_DIVE_CACHE_KEY);
    }
  }, []);

  // Auto-clear toast after 4 seconds
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  async function runAnalysis() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/ai/strategy-deep-dive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || 'Analysis failed');
      setData(json);
      setCacheAge(0);
      localStorage.setItem(DEEP_DIVE_CACHE_KEY, JSON.stringify(json));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function runSitelinkScan() {
    setLoadingSitelinks(true);
    try {
      const res = await fetch(`${API}/ai/sitelink-scanner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl: 'https://apexdentalmalta.com' }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || 'Sitelink scan failed');
      setSitelinks(json);
      localStorage.setItem('apexdental_sitelinks_v1', JSON.stringify(json));
    } catch (e) {
      setToast({ type: 'err', text: `Sitelink scan: ${e.message}` });
    } finally {
      setLoadingSitelinks(false);
    }
  }

  // Generic apply caller — used by all the buttons
  async function apply(key, endpoint, body, successText) {
    if (applied[key] || applying[key]) return;
    setApplying(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || 'Apply failed');

      const newApplied = { ...applied, [key]: { ts: Date.now(), msg: json.message } };
      setApplied(newApplied);
      localStorage.setItem('apexdental_applied_v1', JSON.stringify(newApplied));
      setToast({ type: 'ok', text: successText || json.message || 'Applied' });
    } catch (e) {
      setToast({ type: 'err', text: e.message });
    } finally {
      setApplying(prev => ({ ...prev, [key]: false }));
    }
  }

  if (loading) {
    return <LoadingPulse
      message="Analysing your account…"
      sub="Pulling 30 days of campaigns, keywords, search terms and ads, then asking Claude to find waste and opportunities."
    />;
  }

  if (!data) {
    return (
      <div className="rounded-2xl bg-slate-800/40 border border-amber-400/20 p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-3">🔬</div>
          <h2 className="text-2xl font-bold text-white mb-2">Strategy Deep Dive</h2>
          <p className="text-slate-400 text-sm mb-6">
            Pulls your last 30 days of real Google Ads data — campaigns, keywords, search terms, ads —
            and asks Claude to find wasted spend, keywords to pause, ad copy to rewrite, budget
            reallocations and new opportunities. Now with one-click Apply on every recommendation.
          </p>
          <button
            onClick={runAnalysis}
            className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition"
          >
            Run analysis
          </button>
          <p className="mt-3 text-xs text-slate-500">Takes 30–60 seconds. Results cached for 14 days.</p>
          {error && <div className="mt-4"><ErrorBox message={error} onRetry={runAnalysis} /></div>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border max-w-md ${
          toast.type === 'ok'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <div className="text-sm font-medium">{toast.type === 'ok' ? '✓ ' : '⚠ '}{toast.text}</div>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
            Generated {cacheAge === 0 ? 'just now' : `${cacheAge} day(s) ago`}
            {cacheAge !== null && cacheAge < DEEP_DIVE_TTL_DAYS && (
              <> · next refresh in {DEEP_DIVE_TTL_DAYS - cacheAge} day(s)</>
            )}
          </div>
          <div className="text-slate-400 text-sm">
            Based on last {data.periodDays || 30} days of account activity · Click Apply to execute changes live
          </div>
        </div>
        <button
          onClick={runAnalysis}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700"
        >
          ↻ Run new analysis
        </button>
      </div>

      {/* Executive summary */}
      {data.executive_summary && (
        <div className="rounded-2xl bg-slate-800/40 border border-amber-400/20 p-5">
          <div className="text-xs font-bold uppercase tracking-widest mb-2 text-amber-400">Executive summary</div>
          <p className="text-slate-200 text-sm leading-relaxed">{data.executive_summary}</p>
        </div>
      )}

      {/* Headline metrics */}
      {data.headline_metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <MetricCard label="Wasted spend (est.)" value={`€${(data.headline_metrics.wasted_spend_estimate_eur || 0).toFixed(0)}`} tone="rose" />
          <MetricCard label="Biggest opportunity" value={data.headline_metrics.biggest_opportunity || '—'} tone="emerald" small />
          <MetricCard label="Biggest risk" value={data.headline_metrics.biggest_risk || '—'} tone="amber" small />
        </div>
      )}

      {/* Priority actions */}
      {data.priority_actions_this_week?.length > 0 && (
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 text-emerald-400">⚡ Priority actions this week</div>
          <ul className="space-y-2">
            {data.priority_actions_this_week.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                <ImpactBadge impact={a.impact} />
                <span className="text-xs text-slate-500 uppercase mt-0.5">effort: {a.effort}</span>
                <span className="flex-1">{a.action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NEGATIVE KEYWORDS — APPLY ENABLED */}
      {data.negative_keywords_to_add?.length > 0 && (
        <Section title={`🚫 Negative keywords to add (${data.negative_keywords_to_add.length})`} color="rose">
          {data.negative_keywords_to_add.map((n, i) => {
            const key = `neg-${i}`;
            return (
              <div key={i} className="py-2.5 border-t border-slate-700/30 first:border-t-0 flex flex-wrap items-center gap-2">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <code className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 text-xs font-mono">{n.term}</code>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">{n.match_type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                      {n.scope}{n.scope_name ? `: ${n.scope_name}` : ''}
                    </span>
                    {n.estimated_savings_eur > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">save ~€{n.estimated_savings_eur.toFixed(0)}/mo</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{n.reason}</p>
                </div>
                <ApplyButton
                  applied={applied[key]}
                  applying={applying[key]}
                  onClick={() => apply(key, '/apply/add-negative-keyword', {
                    term: n.term,
                    matchType: n.match_type,
                    scope: (n.scope === 'account' || n.scope === 'all') ? 'account' : 'campaign',
                    campaignName: n.scope_name,
                  }, `Added "${n.term}" as negative keyword`)}
                />
              </div>
            );
          })}
        </Section>
      )}

      {/* KEYWORDS TO PAUSE — APPLY ENABLED */}
      {data.keywords_to_pause?.length > 0 && (
        <Section title={`⏸ Keywords to pause (${data.keywords_to_pause.length})`} color="amber">
          {data.keywords_to_pause.map((k, i) => {
            const key = `pause-kw-${i}`;
            return (
              <div key={i} className="py-2.5 border-t border-slate-700/30 first:border-t-0 flex flex-wrap items-center gap-2">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <code className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 text-xs font-mono">{k.keyword}</code>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">€{k.spent_eur?.toFixed(0)} · {k.conversions} conv</span>
                    <span className="text-xs text-slate-500">in {k.campaign} / {k.ad_group}</span>
                  </div>
                  <p className="text-xs text-slate-400">{k.reason}</p>
                </div>
                <ApplyButton
                  applied={applied[key]}
                  applying={applying[key]}
                  onClick={() => apply(key, '/apply/pause-keyword', {
                    keyword: k.keyword,
                    campaignName: k.campaign,
                    adGroupName: k.ad_group,
                  }, `Paused "${k.keyword}"`)}
                />
              </div>
            );
          })}
        </Section>
      )}

      {/* AD COPY — read-only suggestion (not applyable via this UI) */}
      {data.ad_copy_rewrites?.length > 0 && (
        <Section title={`✏️ Ad copy rewrites (${data.ad_copy_rewrites.length})`} color="violet">
          {data.ad_copy_rewrites.map((a, i) => (
            <div key={i} className="py-3 border-t border-slate-700/30 first:border-t-0">
              <div className="text-white text-sm font-semibold mb-1">{a.campaign} → {a.ad_group}</div>
              <p className="text-xs text-slate-400 mb-3">{a.issue}</p>
              {a.suggested_headlines?.length > 0 && (
                <div className="mb-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Suggested headlines</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {a.suggested_headlines.map((h, j) => (
                      <li key={j} className="text-xs text-slate-300 bg-slate-900/50 px-2.5 py-1.5 rounded">{h}</li>
                    ))}
                  </ul>
                </div>
              )}
              {a.suggested_descriptions?.length > 0 && (
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Suggested descriptions</div>
                  <ul className="space-y-1.5">
                    {a.suggested_descriptions.map((d, j) => (
                      <li key={j} className="text-xs text-slate-300 bg-slate-900/50 px-2.5 py-1.5 rounded">{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-xs text-slate-500 italic mt-2">Use the AI Campaign Generator tab to push new copy.</p>
            </div>
          ))}
        </Section>
      )}

      {/* BUDGET REALLOCATION — APPLY ENABLED (raises destination budget) */}
      {data.budget_reallocation?.length > 0 && (
        <Section title="💰 Budget reallocation" color="sky">
          <p className="text-xs text-slate-500 mb-3">Apply increases the destination campaign's daily budget by the suggested amount. Decrease the source campaign manually or pause it separately.</p>
          {data.budget_reallocation.map((b, i) => {
            const key = `budget-${i}`;
            return (
              <div key={i} className="py-2.5 border-t border-slate-700/30 first:border-t-0 flex flex-wrap items-center gap-2">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm text-slate-200">
                      <strong className="text-white">{b.from_campaign}</strong>
                      <span className="text-slate-500 mx-1.5">→</span>
                      <strong className="text-white">{b.to_campaign}</strong>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">+€{b.amount_eur_per_day}/day to destination</span>
                  </div>
                  <p className="text-xs text-slate-400">{b.reason}</p>
                </div>
                <ApplyButton
                  applied={applied[key]}
                  applying={applying[key]}
                  onClick={() => {
                    // Backend needs absolute budget. Ask user to confirm new daily.
                    const newBudget = prompt(`New daily budget for "${b.to_campaign}" (in €)?\n\nThis sets the absolute daily budget. Add the recommended €${b.amount_eur_per_day}/day to the current budget.`);
                    if (!newBudget) return;
                    return apply(key, '/apply/update-budget', {
                      campaignName: b.to_campaign,
                      newDailyBudgetEur: Number(newBudget),
                    }, `Updated budget for "${b.to_campaign}" to €${newBudget}/day`);
                  }}
                />
              </div>
            );
          })}
        </Section>
      )}

      {/* STRUCTURAL CHANGES — read-only (too complex for one-click) */}
      {data.structural_changes?.length > 0 && (
        <Section title="🏗 Structural changes" color="amber">
          <p className="text-xs text-slate-500 mb-3">These need manual restructuring in Campaign Manager.</p>
          {data.structural_changes.map((s, i) => (
            <div key={i} className="py-2.5 border-t border-slate-700/30 first:border-t-0">
              <div className="flex items-start gap-2 mb-1">
                <ImpactBadge impact={s.impact} />
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">
                    {s.issue}
                    {s.campaign && (
                      <span className="text-xs text-slate-500 ml-2">· {s.campaign}{s.ad_group ? ` / ${s.ad_group}` : ''}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{s.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* NEW KEYWORD OPPORTUNITIES — read-only (need ad group assignment) */}
      {data.new_keyword_opportunities?.length > 0 && (
        <Section title={`💡 New keyword opportunities (${data.new_keyword_opportunities.length})`} color="emerald">
          <p className="text-xs text-slate-500 mb-3">Add via Campaign Builder once you've decided which ad group to put them in.</p>
          {data.new_keyword_opportunities.map((k, i) => (
            <div key={i} className="py-2.5 border-t border-slate-700/30 first:border-t-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <code className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 text-xs font-mono">{k.keyword}</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">{k.match_type}</span>
              </div>
              <p className="text-xs text-slate-400">{k.reason}</p>
              {k.based_on_search_term && (
                <p className="text-xs text-slate-500 mt-1 italic">Based on actual search: "{k.based_on_search_term}"</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* SITELINK SUGGESTIONS — NEW SECTION */}
      <SitelinkSection
        sitelinks={sitelinks}
        loading={loadingSitelinks}
        onScan={runSitelinkScan}
        onApply={(key, body, msg) => apply(key, '/apply/add-sitelinks', body, msg)}
        applied={applied}
        applying={applying}
      />

      {error && <ErrorBox message={error} onRetry={runAnalysis} />}
    </div>
  );
}

// ── Apply button — single-click, no confirm ─────────────────────────────────
function ApplyButton({ applied, applying, onClick, label = 'Apply' }) {
  if (applied) {
    return (
      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/25 cursor-default">
        ✓ Applied
      </span>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={applying}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
        applying
          ? 'bg-slate-700/30 text-slate-500 border-slate-700/50 cursor-wait'
          : 'bg-amber-400/10 text-amber-300 border-amber-400/30 hover:bg-amber-400/20'
      }`}
    >
      {applying ? '…working' : label}
    </button>
  );
}

// ── Sitelink Section ─────────────────────────────────────────────────────────
function SitelinkSection({ sitelinks, loading, onScan, onApply, applied, applying }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-800/40 border border-sky-400/20 p-5">
        <div className="text-xs font-bold uppercase tracking-widest mb-3 text-sky-400">🔗 Sitelink suggestions</div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="w-5 h-5 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          Scanning your site and matching sitelinks to campaigns…
        </div>
      </div>
    );
  }

  if (!sitelinks) {
    return (
      <div className="rounded-2xl bg-slate-800/40 border border-sky-400/20 p-5">
        <div className="text-xs font-bold uppercase tracking-widest mb-2 text-sky-400">🔗 Sitelink suggestions</div>
        <p className="text-sm text-slate-400 mb-4">Scan your sitemap and let Claude pick the best pages to add as sitelinks for each campaign.</p>
        <button
          onClick={onScan}
          className="px-4 py-2 rounded-xl bg-sky-400/10 text-sky-300 text-sm font-semibold border border-sky-400/30 hover:bg-sky-400/20 transition"
        >
          Scan site for sitelinks
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-800/40 border border-sky-400/20 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-bold uppercase tracking-widest text-sky-400">
          🔗 Sitelink suggestions ({sitelinks.campaign_sitelinks?.length || 0} campaigns)
        </div>
        <button
          onClick={onScan}
          className="text-xs text-slate-400 hover:text-white transition"
        >
          ↻ Rescan
        </button>
      </div>
      {sitelinks.summary && (
        <p className="text-sm text-slate-300 mb-4">{sitelinks.summary}</p>
      )}

      {/* Universal sitelinks */}
      {sitelinks.universal_sitelinks?.length > 0 && (
        <div className="mb-4 bg-slate-900/40 rounded-xl p-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">Universal sitelinks (safe across any campaign)</div>
          <div className="flex flex-wrap gap-2">
            {sitelinks.universal_sitelinks.map((s, i) => (
              <span key={i} className="text-xs bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-slate-200">
                <strong>{s.text}</strong>
                <span className="text-slate-500 ml-1.5">{s.url?.replace('https://', '').replace('apexdentalmalta.com', '')}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Per-campaign sitelinks */}
      {sitelinks.campaign_sitelinks?.map((c, i) => {
        const key = `sl-camp-${i}`;
        return (
          <div key={i} className="mb-3 bg-slate-900/40 rounded-xl p-4 last:mb-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-[200px]">
                <div className="text-sm font-semibold text-white">{c.campaign_name}</div>
                {c.rationale && <p className="text-xs text-slate-400 mt-1">{c.rationale}</p>}
              </div>
              <ApplyButton
                applied={applied[key]}
                applying={applying[key]}
                onClick={() => onApply(key, {
                  campaignName: c.campaign_name,
                  sitelinks: c.sitelinks,
                }, `Added ${c.sitelinks?.length || 0} sitelinks to "${c.campaign_name}"`)}
                label={`Apply ${c.sitelinks?.length || 0} sitelinks`}
              />
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mt-2">
              {c.sitelinks?.map((s, j) => (
                <li key={j} className="text-xs bg-slate-900 border border-slate-700/50 px-2.5 py-1.5 rounded">
                  <strong className="text-slate-100">{s.text}</strong>
                  <span className="text-slate-500 ml-2">{s.url?.replace('https://', '').replace('apexdentalmalta.com', '')}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ── Helper components used by DeepDiveTab ─────────────────────
function MetricCard({ label, value, tone = 'amber', small = false }) {
  const tones = {
    amber:   'border-amber-400/20 bg-amber-400/5 text-amber-400',
    rose:    'border-rose-500/20 bg-rose-500/5 text-rose-400',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    sky:     'border-sky-500/20 bg-sky-500/5 text-sky-400',
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-widest opacity-80">{label}</div>
      <div className={`text-white font-bold mt-2 ${small ? 'text-sm leading-snug' : 'text-2xl'}`}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children, color = 'amber' }) {
  const borders = {
    amber:   'border-amber-400/20 bg-slate-800/40',
    rose:    'border-rose-500/20 bg-slate-800/40',
    emerald: 'border-emerald-500/20 bg-slate-800/40',
    sky:     'border-sky-500/20 bg-slate-800/40',
    violet:  'border-violet-500/20 bg-slate-800/40',
  };
  const labels = {
    amber:   'text-amber-400',
    rose:    'text-rose-400',
    emerald: 'text-emerald-400',
    sky:     'text-sky-400',
    violet:  'text-violet-400',
  };
  return (
    <div className={`rounded-2xl border p-5 ${borders[color]}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${labels[color]}`}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ImpactBadge({ impact }) {
  const map = {
    high:   'bg-rose-500/20 text-rose-300',
    medium: 'bg-amber-500/20 text-amber-300',
    low:    'bg-slate-700/50 text-slate-400',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full uppercase font-semibold ${map[impact] || map.low}`}>
      {impact || 'low'}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────
export default function GoogleAdsStrategyEngine() {
const POLICY_CACHE_KEY = 'apexdental_policy_audit_v1';

function PolicyAuditTab() {
  const [data, setData]       = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError]     = React.useState(null);
  const [scanTime, setScanTime] = React.useState(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(POLICY_CACHE_KEY);
      if (!raw) return;
      const cached = JSON.parse(raw);
      setData(cached);
      setScanTime(cached.generatedAt);
    } catch {
      localStorage.removeItem(POLICY_CACHE_KEY);
    }
  }, []);

  async function runScan() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/ai/policy-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || 'Policy audit failed');
      setData(json);
      setScanTime(json.generatedAt);
      localStorage.setItem(POLICY_CACHE_KEY, JSON.stringify(json));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingPulse
      message="Scanning for policy issues…"
      sub="Reading every asset, ad and keyword in the account, then asking Claude to cluster issues and suggest fixes."
    />;
  }

  if (!data) {
    return (
      <div className="rounded-2xl bg-slate-800/40 border border-rose-400/20 p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-3">🛡</div>
          <h2 className="text-2xl font-bold text-white mb-2">Policy Audit</h2>
          <p className="text-slate-400 text-sm mb-6">
            Scans every ad, asset (lead forms, sitelinks, callouts, images) and keyword
            in your account for policy disapprovals or limited-serving statuses. Clusters
            issues by root cause and gives you specific fix instructions.
          </p>
          <button
            onClick={runScan}
            className="px-6 py-3 rounded-xl bg-rose-400 text-slate-950 font-semibold hover:bg-rose-300 transition"
          >
            Run scan
          </button>
          <p className="mt-3 text-xs text-slate-500">Takes 15–30 seconds.</p>
          {error && <div className="mt-4"><ErrorBox message={error} onRetry={runScan} /></div>}
        </div>
      </div>
    );
  }

  // Clean account celebration
  if (data.cleanAccount) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Scanned {scanTime ? new Date(scanTime).toLocaleString() : ''}
            </div>
            <div className="text-slate-400 text-sm">No policy violations detected</div>
          </div>
          <button onClick={runScan} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">
            ↻ Re-scan
          </button>
        </div>
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-8 text-center">
          <div className="text-5xl mb-3">✅</div>
          <div className="text-xl font-bold text-emerald-300 mb-2">All clear</div>
          <p className="text-slate-300 text-sm max-w-md mx-auto">{data.summary}</p>
        </div>
      </div>
    );
  }

  const totals = data.totals || { critical: 0, limited: 0, warnings: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-widest mb-1">
            Scanned {scanTime ? new Date(scanTime).toLocaleString() : 'just now'}
          </div>
          <div className="text-slate-400 text-sm">{data.summary}</div>
        </div>
        <button onClick={runScan} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">
          ↻ Re-scan
        </button>
      </div>

      {/* Totals row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PolicyMetric tone="rose"    label="Critical (blocking)"   value={totals.critical} />
        <PolicyMetric tone="amber"   label="Limited (reduced reach)" value={totals.limited} />
        <PolicyMetric tone="slate"   label="Warnings"              value={totals.warnings} />
      </div>

      {data.estimated_impact_eur > 0 && (
        <div className="rounded-2xl bg-rose-500/5 border border-rose-500/20 p-4">
          <div className="text-xs uppercase tracking-widest text-rose-400 mb-1">Estimated impact</div>
          <div className="text-2xl font-bold text-white">~€{data.estimated_impact_eur.toFixed(0)}/month of impressions blocked or limited</div>
        </div>
      )}

      {/* Priority order */}
      {data.priority_order?.length > 0 && (
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 text-emerald-400">⚡ Fix in this order</div>
          <ol className="space-y-1 list-decimal list-inside text-sm text-slate-200">
            {data.priority_order.map((t, i) => <li key={i}>{t}</li>)}
          </ol>
        </div>
      )}

      {/* Critical issues */}
      {data.critical?.length > 0 && (
        <PolicySection title={`🔴 Critical — blocking (${data.critical.length})`} color="rose" issues={data.critical} />
      )}

      {/* Limited */}
      {data.limited?.length > 0 && (
        <PolicySection title={`🟡 Limited — reduced reach (${data.limited.length})`} color="amber" issues={data.limited} />
      )}

      {/* Warnings */}
      {data.warnings?.length > 0 && (
        <PolicySection title={`⚠️ Warnings (${data.warnings.length})`} color="slate" issues={data.warnings} />
      )}

      {error && <ErrorBox message={error} onRetry={runScan} />}
    </div>
  );
}

// ── PolicyMetric — small metric tile ──────────────────────────────────────────
function PolicyMetric({ label, value, tone = 'slate' }) {
  const tones = {
    rose:    'border-rose-500/20 bg-rose-500/5 text-rose-400',
    amber:   'border-amber-400/20 bg-amber-400/5 text-amber-400',
    slate:   'border-slate-700/40 bg-slate-800/40 text-slate-400',
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-widest opacity-80">{label}</div>
      <div className="text-3xl font-bold text-white mt-2">{value}</div>
    </div>
  );
}

// ── PolicySection — collapsible cluster list ─────────────────────────────────
function PolicySection({ title, color, issues }) {
  const borders = {
    rose:  'border-rose-500/20 bg-slate-800/40',
    amber: 'border-amber-400/20 bg-slate-800/40',
    slate: 'border-slate-700/40 bg-slate-800/40',
  };
  const labels = {
    rose:  'text-rose-400',
    amber: 'text-amber-400',
    slate: 'text-slate-400',
  };
  return (
    <div className={`rounded-2xl border p-5 ${borders[color]}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${labels[color]}`}>{title}</div>
      <div className="space-y-3">
        {issues.map((issue, i) => <PolicyIssueCard key={i} issue={issue} />)}
      </div>
    </div>
  );
}

function PolicyIssueCard({ issue }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 hover:bg-slate-900/60 transition flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">{issue.title}</div>
          <p className="text-xs text-slate-400 mt-1">{issue.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {issue.affected_count > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                {issue.affected_count} affected
              </span>
            )}
            {issue.affected_spend_eur > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                €{issue.affected_spend_eur.toFixed(0)}/mo spend
              </span>
            )}
          </div>
        </div>
        <span className="text-slate-500 text-xs mt-1">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-700/40 space-y-3">
          {issue.fix_steps?.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">Fix steps</div>
              <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
                {issue.fix_steps.map((s, j) => <li key={j}>{s}</li>)}
              </ol>
            </div>
          )}
          {issue.where_to_fix && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">Where in Google Ads</div>
              <p className="text-xs text-slate-300">{issue.where_to_fix}</p>
            </div>
          )}
          {issue.examples?.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Examples</div>
              <ul className="space-y-1.5">
                {issue.examples.map((ex, j) => (
                  <li key={j} className="text-xs bg-slate-950/40 border border-slate-700/40 rounded px-2.5 py-1.5">
                    {ex.snippet && <code className="text-amber-300 font-mono">{ex.snippet}</code>}
                    {ex.snippet && (ex.campaign || ex.id) && <span className="text-slate-500"> · </span>}
                    {ex.campaign && <span className="text-slate-400">{ex.campaign}</span>}
                    {ex.id && <span className="text-slate-600 ml-2">[{ex.id}]</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

  
  const [activeTab,      setActiveTab]      = useState('research');
  const [researchData,   setResearchData]   = useState(null); // shared research results
  const [advisorPrefill, setAdvisorPrefill] = useState(null); // data piped to advisor

  // Called by ResearchTab when research completes
  // If switchToAdvisor=true, also navigate to the Advisor tab
  const handleResearchComplete = useCallback((data, service, business, switchToAdvisor = false) => {
    setResearchData(data);
    setAdvisorPrefill({ ...data, service, business });
    if (switchToAdvisor) setActiveTab('advisor');
  }, []);

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
            <a href="/google-ads-manager"   className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">Campaign Manager</a>
          </div>
        </div>

        {/* Research data available indicator */}
        {researchData && activeTab !== 'research' && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400 text-sm">✓ Research data loaded into Strategy Advisor</span>
            <button onClick={() => setActiveTab('research')} className="text-xs text-slate-400 hover:text-white transition ml-auto">
              View research →
            </button>
          </div>
        )}

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
              {t.id === 'advisor' && advisorPrefill && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Research data loaded" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'research'  && <ResearchTab onResearchComplete={handleResearchComplete} storedInsights={researchData} />}
        {activeTab === 'scorer'    && <ScorerTab />}
        {activeTab === 'advisor'   && <AdvisorTab prefill={advisorPrefill} />}
        {activeTab === 'generator' && <GeneratorTab />}
        {activeTab === 'deepdive'  && <DeepDiveTab />}
        {activeTab === 'policy'    && <PolicyAuditTab />}

        {/* Nav footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dashboard',        href: '/google-ads-dashboard' },
            { label: 'Campaign Manager', href: '/google-ads-manager' },
            { label: 'Campaign Builder', href: '/google-ads-builder' },
            { label: 'AI Strategy',      href: '/google-ads-strategy', active: true },
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
