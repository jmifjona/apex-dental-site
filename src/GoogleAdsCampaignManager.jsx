import React, { useEffect, useState } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

function fmt(n) { return new Intl.NumberFormat().format(n || 0); }
function money(n) { return `€${Number(n || 0).toFixed(2)}`; }
function pct(n) { return `${Number(n || 0).toFixed(2)}%`; }
function cpc(n) { return `€${Number(n || 0).toFixed(3)}`; }

function statusLabel(s) {
  if (typeof s === 'string') return s;
  switch (Number(s)) {
    case 2: return 'Paused';
    case 3: return 'Enabled';
    case 4: return 'Removed';
    default: return `Status ${s}`;
  }
}

function statusStyle(s) {
  const v = typeof s === 'string' ? s : statusLabel(s);
  if (v === 'Enabled') return { badge: 'bg-emerald-500/15 text-emerald-400', dot: 'bg-emerald-400' };
  if (v === 'Paused')  return { badge: 'bg-amber-500/15 text-amber-400',   dot: 'bg-amber-400' };
  return                     { badge: 'bg-slate-500/15 text-slate-400',    dot: 'bg-slate-400' };
}

function MetricTile({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? 'bg-amber-400/10 border border-amber-400/20' : 'bg-slate-900/60 border border-slate-700/40'}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 text-sm font-bold ${highlight ? 'text-amber-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}

function AdGroupRow({ ag }) {
  const sc = statusStyle(ag.status);
  const label = statusLabel(ag.status);
  const agCtr = ag.impressions > 0 ? (ag.clicks / ag.impressions) * 100 : 0;
  const agCpc = ag.clicks > 0 ? ag.cost / ag.clicks : 0;
  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-3">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.badge}`}>
          <span className={`w-1 h-1 rounded-full ${sc.dot}`} />{label}
        </span>
        <span className="text-white text-sm font-medium truncate">{ag.name}</span>
        <span className="text-slate-500 text-xs ml-auto">ID: {ag.id}</span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        <MetricTile label="Impressions" value={fmt(ag.impressions)} />
        <MetricTile label="Clicks" value={fmt(ag.clicks)} />
        <MetricTile label="CTR" value={pct(agCtr)} />
        <MetricTile label="Cost" value={money(ag.cost)} highlight />
        <MetricTile label="Avg CPC" value={cpc(agCpc)} />
        <MetricTile label="Conv." value={fmt(ag.conversions)} />
      </div>
    </div>
  );
}

function CampaignCard({ campaign, onToggle, onRemove, updating }) {
  const [expanded, setExpanded] = useState(false);
  const [adGroups, setAdGroups] = useState([]);
  const [loadingAG, setLoadingAG] = useState(false);
  const [agError, setAgError] = useState('');

  const sc = statusStyle(campaign.status);
  const label = statusLabel(campaign.status);
  const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const avgCpc = campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0;
  const isUpdating = updating === campaign.id;

  async function toggleAdGroups() {
    if (adGroups.length > 0) { setExpanded(e => !e); return; }
    setExpanded(true);
    setLoadingAG(true);
    setAgError('');
    try {
      const res = await fetch(`${API}/campaigns/${campaign.id}/ad-groups`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      setAdGroups(data.adGroups || []);
    } catch (e) {
      setAgError(e.message);
    } finally {
      setLoadingAG(false);
    }
  }

  return (
    <div className={`rounded-2xl bg-slate-800/40 border overflow-hidden transition ${isUpdating ? 'border-amber-400/40 opacity-75' : 'border-slate-700/50'}`}>
      <div className="p-5">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{label}
              </span>
              <span className="text-xs text-slate-500">ID: {campaign.id}</span>
              {campaign.type && <span className="text-xs text-slate-600 bg-slate-900 px-2 py-0.5 rounded-full">{campaign.type}</span>}
            </div>
            <h3 className="text-base font-semibold text-white leading-snug">{campaign.name}</h3>
            {campaign.dailyBudget > 0 && (
              <div className="text-xs text-slate-500 mt-1">Daily budget: {money(campaign.dailyBudget)}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {isUpdating && (
              <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            )}
            {label !== 'Removed' && !isUpdating && (
              <>
                <button
                  onClick={() => onToggle(campaign.id, label === 'Enabled' ? 'PAUSED' : 'ENABLED')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    label === 'Enabled'
                      ? 'bg-amber-400/15 text-amber-400 hover:bg-amber-400/25'
                      : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                  }`}>
                  {label === 'Enabled' ? '⏸ Pause' : '▶ Enable'}
                </button>
                <button
                  onClick={() => onRemove(campaign.id, campaign.name)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition">
                  🗑 Remove
                </button>
              </>
            )}
            <button
              onClick={toggleAdGroups}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition">
              {expanded ? '▲ Hide' : '▼ Ad Groups'}
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <MetricTile label="Impressions" value={fmt(campaign.impressions)} />
          <MetricTile label="Clicks" value={fmt(campaign.clicks)} />
          <MetricTile label="CTR" value={pct(ctr)} />
          <MetricTile label="Cost" value={money(campaign.cost)} highlight />
          <MetricTile label="Avg CPC" value={cpc(avgCpc)} />
          <MetricTile label="Conv." value={fmt(campaign.conversions)} />
        </div>
      </div>

      {/* Ad groups panel */}
      {expanded && (
        <div className="border-t border-slate-700/50 bg-slate-900/30 p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Ad Groups</div>
          {loadingAG && (
            <div className="flex items-center gap-3 text-slate-400 text-sm py-2">
              <div className="w-4 h-4 border-2 border-slate-600 border-t-amber-400 rounded-full animate-spin" />
              Loading ad groups…
            </div>
          )}
          {agError && <div className="text-rose-400 text-sm">{agError}</div>}
          {!loadingAG && !agError && adGroups.length === 0 && (
            <div className="text-slate-500 text-sm">No ad groups found for this campaign.</div>
          )}
          {!loadingAG && adGroups.length > 0 && (
            <div className="space-y-2">
              {adGroups.map(ag => <AdGroupRow key={ag.id} ag={ag} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GoogleAdsCampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState({ impressions: 0, clicks: 0, cost: 0, conversions: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost');
  const [search, setSearch] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  async function load() {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/campaigns/list`);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Failed to load');
      const c = data.campaigns || [];
      setCampaigns(c);
      setSummary(c.reduce((a, x) => ({
        impressions: a.impressions + x.impressions,
        clicks: a.clicks + x.clicks,
        cost: a.cost + x.cost,
        conversions: a.conversions + x.conversions,
      }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleToggle(id, newStatus) {
    setUpdating(id);
    try {
      const res = await fetch(`${API}/campaigns/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: id, status: newStatus }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast(`Campaign ${newStatus === 'ENABLED' ? 'enabled ▶' : 'paused ⏸'}`);
      await load();
    } catch (e) {
      showToast(`Error: ${e.message}`);
    } finally { setUpdating(null); }
  }

  async function handleRemove(id, name) {
    if (!window.confirm(`Remove "${name}"?\n\nThis cannot be undone.`)) return;
    setUpdating(id);
    try {
      const res = await fetch(`${API}/campaigns/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: id, status: 'REMOVED' }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast('Campaign removed 🗑');
      await load();
    } catch (e) {
      showToast(`Error: ${e.message}`);
    } finally { setUpdating(null); }
  }

  const overallCtr = summary.impressions > 0 ? (summary.clicks / summary.impressions) * 100 : 0;
  const enabledCount = campaigns.filter(c => statusLabel(c.status) === 'Enabled').length;
  const pausedCount  = campaigns.filter(c => statusLabel(c.status) === 'Paused').length;

  const filtered = campaigns
    .filter(c => filter === 'All' || statusLabel(c.status) === filter)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(b[sortBy] || 0) - Number(a[sortBy] || 0));

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-800 border border-slate-600 text-white text-sm px-5 py-3 rounded-2xl shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">Apex Dental</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Campaign Manager</h1>
            <p className="mt-1 text-slate-400 text-sm">Enable, pause and manage your Google Ads campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/google-ads-dashboard" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">← Dashboard</a>
            <a href="/google-ads-builder" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">Campaign Builder</a>
            <button onClick={load} disabled={loading}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50">
              {loading ? '…' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* Summary KPIs */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Impressions', value: fmt(summary.impressions) },
              { label: 'Clicks', value: fmt(summary.clicks) },
              { label: 'Total Spend', value: money(summary.cost), highlight: true },
              { label: 'Overall CTR', value: pct(overallCtr) },
              { label: 'Enabled', value: enabledCount, color: 'text-emerald-400' },
              { label: 'Paused', value: pausedCount, color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl p-5 border ${s.highlight ? 'bg-amber-400/10 border-amber-400/20' : 'bg-slate-800/40 border-slate-700/50'}`}>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                <div className={`mt-2 text-2xl font-bold ${s.highlight ? 'text-amber-400' : s.color || 'text-white'}`}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter / sort bar */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
              {['All', 'Enabled', 'Paused'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${filter === f ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                  {f} ({f === 'All' ? campaigns.length : f === 'Enabled' ? enabledCount : pausedCount})
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs">
              <option value="cost">Sort: Cost</option>
              <option value="clicks">Sort: Clicks</option>
              <option value="impressions">Sort: Impressions</option>
              <option value="conversions">Sort: Conversions</option>
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns…"
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs outline-none focus:border-amber-400 transition w-48" />
            <span className="text-slate-500 text-xs">{filtered.length} campaign{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-12 text-center">
            <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-slate-400">Loading campaigns…</div>
          </div>
        )}
        {error && (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6 text-rose-400">
            {error}
            <button onClick={load} className="ml-4 text-xs underline">Retry</button>
          </div>
        )}

        {/* Campaign list */}
        {!loading && !error && (
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-8 text-center text-slate-500">
                No campaigns match this filter.
              </div>
            )}
            {filtered.map(c => (
              <CampaignCard
                key={c.id}
                campaign={c}
                onToggle={handleToggle}
                onRemove={handleRemove}
                updating={updating}
              />
            ))}
          </div>
        )}

        {/* Nav footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dashboard', href: '/google-ads-dashboard' },
            { label: 'Campaign Manager', href: '/google-ads-manager', active: true },
            { label: 'Campaign Builder', href: '/google-ads-builder' },
            { label: 'AI Strategy', href: '/google-ads-strategy' },
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
