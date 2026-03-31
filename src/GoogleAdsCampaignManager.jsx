import React, { useEffect, useState, useCallback } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

// ── Helpers ───────────────────────────────────────────────────
function fmt(n) { return new Intl.NumberFormat().format(Number(n) || 0); }
function money(n) { return `€${Number(n || 0).toFixed(2)}`; }
function pct(n) { return `${Number(n || 0).toFixed(2)}%`; }
function cpc(n) { return `€${Number(n || 0).toFixed(3)}`; }

function getStatusLabel(s) {
  if (typeof s === 'string' && ['Enabled','Paused','Removed'].includes(s)) return s;
  switch (Number(s)) {
    case 2: return 'Paused';
    case 3: return 'Enabled';
    case 4: return 'Removed';
    default: return 'Unknown';
  }
}

function getStatusNum(label) {
  if (label === 'ENABLED')  return 3;
  if (label === 'PAUSED')   return 2;
  if (label === 'REMOVED')  return 4;
  return 0;
}

function StatusBadge({ status }) {
  const label = getStatusLabel(status);
  const styles = {
    Enabled: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    Paused:  'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Removed: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
    Unknown: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
  };
  const dots = {
    Enabled: 'bg-emerald-400',
    Paused:  'bg-amber-400',
    Removed: 'bg-slate-500',
    Unknown: 'bg-slate-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[label] || styles.Unknown}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[label] || dots.Unknown}`} />
      {label}
    </span>
  );
}

function Metric({ label, value, gold }) {
  return (
    <div className={`rounded-xl p-3 border ${gold ? 'bg-amber-400/8 border-amber-400/20' : 'bg-slate-900/50 border-slate-700/40'}`}>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`text-sm font-bold ${gold ? 'text-amber-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}

// ── Single campaign card ──────────────────────────────────────
function CampaignCard({ campaign, selected, onSelect, onStatusChange, isUpdating }) {
  const [expanded, setExpanded] = useState(false);
  const [adGroups, setAdGroups] = useState([]);
  const [loadingAG, setLoadingAG] = useState(false);

  const label  = getStatusLabel(campaign.status);
  const ctr    = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const avgCpc = campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0;

  async function loadAdGroups() {
    if (adGroups.length) { setExpanded(e => !e); return; }
    setExpanded(true);
    setLoadingAG(true);
    try {
      const res = await fetch(`${API}/campaigns/${campaign.id}/ad-groups`);
      const d = await res.json();
      setAdGroups(d.adGroups || []);
    } catch { setAdGroups([]); }
    finally { setLoadingAG(false); }
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      selected ? 'border-amber-400/60 bg-amber-400/5' : 'border-slate-700/50 bg-slate-800/40'
    } ${isUpdating ? 'opacity-60 pointer-events-none' : ''}`}>

      <div className="p-5">
        {/* Row: checkbox + status + name + actions */}
        <div className="flex items-start gap-3">

          {/* Checkbox */}
          <div className="mt-1 shrink-0">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(campaign.id)}
              className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <StatusBadge status={campaign.status} />
              <span className="text-xs text-slate-500">ID: {campaign.id}</span>
              {campaign.dailyBudget > 0 && (
                <span className="text-xs text-slate-600 bg-slate-900 px-2 py-0.5 rounded-full">
                  Budget: {money(campaign.dailyBudget)}/day
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-white leading-snug">{campaign.name}</h3>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {isUpdating
              ? <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              : label !== 'Removed' && (
                <>
                  <button
                    onClick={() => onStatusChange([campaign.id], label === 'Enabled' ? 'PAUSED' : 'ENABLED')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      label === 'Enabled'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                    }`}>
                    {label === 'Enabled' ? '⏸ Pause' : '▶ Enable'}
                  </button>
                  <button
                    onClick={() => onStatusChange([campaign.id], 'REMOVED')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition border bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20">
                    🗑
                  </button>
                </>
              )
            }
            <button
              onClick={loadAdGroups}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition border bg-slate-700/40 text-slate-300 border-slate-700/50 hover:bg-slate-700">
              {expanded ? '▲' : '▼'} Ad Groups
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2 pl-7">
          <Metric label="Impressions" value={fmt(campaign.impressions)} />
          <Metric label="Clicks"      value={fmt(campaign.clicks)} />
          <Metric label="CTR"         value={pct(ctr)} />
          <Metric label="Cost"        value={money(campaign.cost)} gold />
          <Metric label="Avg CPC"     value={cpc(avgCpc)} />
          <Metric label="Conv."       value={fmt(campaign.conversions)} />
        </div>
      </div>

      {/* Ad groups panel */}
      {expanded && (
        <div className="border-t border-slate-700/50 bg-slate-900/30 px-5 py-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Ad Groups</div>
          {loadingAG && (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-slate-600 border-t-amber-400 rounded-full animate-spin" />
              Loading…
            </div>
          )}
          {!loadingAG && adGroups.length === 0 && (
            <div className="text-slate-500 text-sm">No ad groups found.</div>
          )}
          {!loadingAG && adGroups.map(ag => {
            const agCtr = ag.impressions > 0 ? (ag.clicks / ag.impressions) * 100 : 0;
            return (
              <div key={ag.id} className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <StatusBadge status={ag.status} />
                  <span className="text-sm text-white font-medium truncate flex-1">{ag.name}</span>
                  <span className="text-xs text-slate-500">ID: {ag.id}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <Metric label="Impressions" value={fmt(ag.impressions)} />
                  <Metric label="Clicks"      value={fmt(ag.clicks)} />
                  <Metric label="CTR"         value={pct(agCtr)} />
                  <Metric label="Cost"        value={money(ag.cost)} gold />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function GoogleAdsCampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary]     = useState({ impressions: 0, clicks: 0, cost: 0, conversions: 0 });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [updating, setUpdating]   = useState(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [toast, setToast]         = useState('');
  const [filter, setFilter]       = useState('Active'); // 'Active' hides Removed by default
  const [sortBy, setSortBy]       = useState('cost');
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState(new Set());

  function showToast(msg, duration = 5000) {
    setToast(msg);
    setTimeout(() => setToast(''), duration);
  }

  const load = useCallback(async () => {
    setLoading(true); setError(''); setSelected(new Set());
    try {
      const res  = await fetch(`${API}/campaigns/list`);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Failed to load');
      const c = data.campaigns || [];
      setCampaigns(c);
      setSummary(c.reduce((a, x) => ({
        impressions: a.impressions + x.impressions,
        clicks:      a.clicks      + x.clicks,
        cost:        a.cost        + x.cost,
        conversions: a.conversions + x.conversions,
      }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 }));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Optimistic update ───────────────────────────────────────
  // Google Ads reporting cache takes 3–5 min to reflect changes.
  // We update local state immediately so the UI responds at once.
  function applyOptimistic(ids, newStatus) {
    const newNum = getStatusNum(newStatus);
    setCampaigns(prev =>
      prev.map(c => ids.includes(String(c.id)) ? { ...c, status: newNum } : c)
    );
    setSelected(new Set());
  }

  // ── Status change (single or bulk) ─────────────────────────
  async function handleStatusChange(ids, newStatus) {
    const strIds = ids.map(String);
    const isRemove = newStatus === 'REMOVED';
    const isBulk   = strIds.length > 1;

    // Confirm removal
    if (isRemove) {
      const names = strIds.map(id => campaigns.find(c => String(c.id) === id)?.name || id);
      const msg = isBulk
        ? `Remove ${strIds.length} campaigns? This cannot be undone.`
        : `Remove "${names[0]}"? This cannot be undone.`;
      if (!window.confirm(msg)) return;
    }

    // Mark as updating
    if (isBulk) {
      setBulkUpdating(true);
    } else {
      setUpdating(prev => new Set([...prev, strIds[0]]));
    }

    // Fire all requests in parallel
    const results = await Promise.allSettled(
      strIds.map(id =>
        fetch(`${API}/campaigns/update-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: id, status: newStatus }),
        })
        .then(r => r.json())
        .then(d => ({ id, ok: d.ok, message: d.message }))
        .catch(e => ({ id, ok: false, message: e.message }))
      )
    );

    const succeeded = results.filter(r => r.value?.ok).map(r => r.value.id);
    const failed    = results.filter(r => !r.value?.ok);

    if (succeeded.length > 0) {
      applyOptimistic(succeeded, newStatus);
      const verb = newStatus === 'ENABLED' ? 'enabled ▶' : newStatus === 'PAUSED' ? 'paused ⏸' : 'removed 🗑';
      showToast(
        `${succeeded.length} campaign${succeeded.length > 1 ? 's' : ''} ${verb}` +
        (isRemove ? '' : ' · changes may take ~5 min to appear in Google Ads')
      );
    }

    if (failed.length > 0) {
      showToast(`⚠ ${failed.length} failed: ${failed[0].value?.message || 'unknown error'}`, 7000);
    }

    // Clear updating state
    if (isBulk) {
      setBulkUpdating(false);
    } else {
      setUpdating(prev => { const n = new Set(prev); n.delete(strIds[0]); return n; });
    }
  }

  // ── Selection ───────────────────────────────────────────────
  function toggleSelect(id) {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(String(id)) ? n.delete(String(id)) : n.add(String(id));
      return n;
    });
  }

  function toggleSelectAll() {
    setSelected(
      selected.size === filtered.length
        ? new Set()
        : new Set(filtered.map(c => String(c.id)))
    );
  }

  // ── Derived values ──────────────────────────────────────────
  const overallCtr   = summary.impressions > 0 ? (summary.clicks / summary.impressions) * 100 : 0;
  const enabledCount = campaigns.filter(c => getStatusLabel(c.status) === 'Enabled').length;
  const pausedCount  = campaigns.filter(c => getStatusLabel(c.status) === 'Paused').length;

  const removedCount = campaigns.filter(c => getStatusLabel(c.status) === 'Removed').length;

  const filtered = campaigns
    .filter(c => {
      const label = getStatusLabel(c.status);
      if (filter === 'Active')  return label !== 'Removed';
      if (filter === 'Enabled') return label === 'Enabled';
      if (filter === 'Paused')  return label === 'Paused';
      if (filter === 'Removed') return label === 'Removed';
      return true; // 'All'
    })
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(b[sortBy] || 0) - Number(a[sortBy] || 0));

  const selectedInView    = filtered.filter(c => selected.has(String(c.id)));
  const allSelectedInView = filtered.length > 0 && selectedInView.length === filtered.length;
  const someSelected      = selectedInView.length > 0;

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-800 border border-slate-600 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl leading-6">
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
          <div className="flex items-center gap-2 flex-wrap">
            <a href="/google-ads-dashboard" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">← Dashboard</a>
            <a href="/google-ads-builder"   className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">Builder</a>
            <a href="/google-ads-strategy"  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">AI Strategy</a>
            <button onClick={load} disabled={loading}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50">
              {loading ? '…' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* KPI summary */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Impressions', value: fmt(summary.impressions) },
              { label: 'Clicks',      value: fmt(summary.clicks) },
              { label: 'Total Spend', value: money(summary.cost), gold: true },
              { label: 'Overall CTR', value: pct(overallCtr) },
              { label: 'Enabled',     value: enabledCount, color: 'text-emerald-400' },
              { label: 'Paused',      value: pausedCount,  color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl p-5 border ${s.gold ? 'bg-amber-400/10 border-amber-400/20' : 'bg-slate-800/40 border-slate-700/50'}`}>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                <div className={`mt-2 text-2xl font-bold ${s.gold ? 'text-amber-400' : s.color || 'text-white'}`}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter / search / sort */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
              {[
                { key: 'Active',  count: campaigns.length - removedCount },
                { key: 'Enabled', count: enabledCount },
                { key: 'Paused',  count: pausedCount },
                { key: 'Removed', count: removedCount },
              ].map(f => (
                <button key={f.key} onClick={() => { setFilter(f.key); setSelected(new Set()); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filter === f.key
                      ? f.key === 'Removed' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}>
                  {f.key} ({f.count})
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs outline-none focus:border-amber-400">
              <option value="cost">Sort: Cost</option>
              <option value="clicks">Sort: Clicks</option>
              <option value="impressions">Sort: Impressions</option>
              <option value="conversions">Sort: Conversions</option>
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns…"
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs outline-none focus:border-amber-400 transition w-52" />
            <span className="text-slate-500 text-xs">{filtered.length} campaign{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Select-all row */}
        {!loading && !error && filtered.length > 0 && (
          <div className="flex items-center gap-3 mb-3 px-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200 transition select-none">
              <input
                type="checkbox"
                checked={allSelectedInView}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
              />
            {allSelectedInView ? 'Deselect all' : `Select all ${filtered.length} visible campaigns`}
            </label>
          </div>
        )}

        {/* Bulk action bar — appears when any are selected */}
        {someSelected && !loading && (
          <div className="flex flex-wrap items-center gap-3 mb-5 px-5 py-4 rounded-2xl bg-amber-400/10 border border-amber-400/30">
            <span className="text-amber-400 text-sm font-bold">
              {selectedInView.length} selected
            </span>
            <div className="flex gap-2 flex-wrap ml-2">
              <button
                disabled={bulkUpdating}
                onClick={() => handleStatusChange([...selected], 'ENABLED')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25 transition disabled:opacity-50 flex items-center gap-1.5">
                {bulkUpdating ? <span className="w-3 h-3 border border-emerald-400 border-t-transparent rounded-full animate-spin" /> : null}
                ▶ Enable selected
              </button>
              <button
                disabled={bulkUpdating}
                onClick={() => handleStatusChange([...selected], 'PAUSED')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25 transition disabled:opacity-50 flex items-center gap-1.5">
                {bulkUpdating ? <span className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin" /> : null}
                ⏸ Pause selected
              </button>
              <button
                disabled={bulkUpdating}
                onClick={() => handleStatusChange([...selected], 'REMOVED')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition disabled:opacity-50">
                🗑 Remove selected
              </button>
              <button onClick={() => setSelected(new Set())}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-700/50 text-slate-400 hover:text-white transition">
                ✕ Clear
              </button>
            </div>
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
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6 text-rose-400 flex items-center gap-4">
            {error}
            <button onClick={load} className="text-xs underline shrink-0">Retry</button>
          </div>
        )}

        {/* Campaign list */}
        {!loading && !error && (
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-8 text-center text-slate-500">
                No campaigns match this filter.
              </div>
            )}
            {filtered.map(c => (
              <CampaignCard
                key={c.id}
                campaign={c}
                selected={selected.has(String(c.id))}
                onSelect={toggleSelect}
                onStatusChange={handleStatusChange}
                isUpdating={updating.has(String(c.id))}
              />
            ))}
          </div>
        )}

        {/* Nav footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dashboard',        href: '/google-ads-dashboard' },
            { label: 'Campaign Manager', href: '/google-ads-manager', active: true },
            { label: 'Campaign Builder', href: '/google-ads-builder' },
            { label: 'AI Strategy',      href: '/google-ads-strategy' },
          ].map(l => (
            <a key={l.label} href={l.href}
              className={`rounded-2xl p-4 text-center text-sm font-semibold border transition ${
                l.active
                  ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
