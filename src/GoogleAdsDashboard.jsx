import React, { useEffect, useState } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

// ── Helpers ──────────────────────────────────────────────────
function fmt(n) { return new Intl.NumberFormat().format(n || 0); }
function money(n) { return `€${Number(n || 0).toFixed(2)}`; }
function pct(n) { return `${Number(n || 0).toFixed(2)}%`; }
function cpc(n) { return `€${Number(n || 0).toFixed(3)}`; }

function statusColor(s) {
  const v = typeof s === 'string' ? s : statusLabel(s);
  if (v === 'Enabled') return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' };
  if (v === 'Paused')  return { bg: 'bg-amber-500/15',   text: 'text-amber-400',   dot: 'bg-amber-400' };
  return                       { bg: 'bg-slate-500/15',   text: 'text-slate-400',   dot: 'bg-slate-400' };
}

function statusLabel(s) {
  if (typeof s === 'string') return s;
  switch (Number(s)) {
    case 2: return 'Paused';
    case 3: return 'Enabled';
    case 4: return 'Removed';
    default: return `Status ${s}`;
  }
}

// ── Mini bar chart (pure SVG) ─────────────────────────────────
function MiniBar({ campaigns, field, color = '#f59e0b' }) {
  const values = campaigns.map(c => Number(c[field] || 0));
  const max = Math.max(...values, 1);
  const w = 6, gap = 3, h = 40;
  const total = campaigns.length * (w + gap) - gap;
  return (
    <svg width={total} height={h} className="overflow-visible">
      {values.map((v, i) => {
        const barH = Math.max(2, (v / max) * h);
        return (
          <rect
            key={i}
            x={i * (w + gap)}
            y={h - barH}
            width={w}
            height={barH}
            rx={2}
            fill={color}
            opacity={0.75}
          />
        );
      })}
    </svg>
  );
}

// ── Donut chart ───────────────────────────────────────────────
function DonutChart({ campaigns }) {
  const total = campaigns.reduce((a, c) => a + Number(c.cost || 0), 0);
  if (!total) return <div className="text-slate-500 text-sm">No spend data</div>;

  const colors = ['#f59e0b', '#38bdf8', '#a78bfa', '#34d399', '#fb7185', '#fb923c'];
  let offset = 0;
  const r = 54, cx = 70, cy = 70, stroke = 18;
  const circ = 2 * Math.PI * r;
  const slices = campaigns.slice(0, 6).map((c, i) => {
    const share = Number(c.cost || 0) / total;
    const dash = share * circ;
    const slice = { dash, offset, color: colors[i % colors.length], name: c.name, cost: c.cost };
    offset += dash;
    return slice;
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={140} height={140}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${circ - s.dash}`}
            strokeDashoffset={circ / 4 - s.offset}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize={11} fontWeight={600}>Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize={10}>{money(total)}</text>
      </svg>
      <div className="flex flex-col gap-2">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-slate-300 truncate max-w-[120px]">{s.name.split('_')[0].substring(0, 20)}</span>
            <span className="text-slate-400 ml-auto pl-2">{money(s.cost)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, accent = false, trend }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? 'bg-amber-400/10 border-amber-400/20' : 'bg-slate-800/50 border-slate-700/50'}`}>
      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${accent ? 'text-amber-400' : 'text-white'}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
      {trend !== undefined && (
        <div className={`mt-1 text-xs font-medium ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}% vs avg
        </div>
      )}
    </div>
  );
}

// ── Campaign row ──────────────────────────────────────────────
function CampaignRow({ campaign, onToggle, onRemove, isUpdating }) {
  const [expanded, setExpanded] = useState(false);
  const [adGroups, setAdGroups] = useState([]);
  const [loadingAG, setLoadingAG] = useState(false);
  const sc = statusColor(campaign.status);
  const label = statusLabel(campaign.status);
  const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const avgCpc = campaign.clicks > 0 ? campaign.cost / campaign.clicks : 0;

  async function loadAdGroups() {
    if (adGroups.length > 0) { setExpanded(e => !e); return; }
    setLoadingAG(true);
    setExpanded(true);
    try {
      const res = await fetch(`${API}/campaigns/${campaign.id}/ad-groups`);
      const data = await res.json();
      setAdGroups(data.adGroups || []);
    } catch { setAdGroups([]); }
    finally { setLoadingAG(false); }
  }

  return (
    <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 overflow-hidden">
      {/* Campaign header */}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {label}
              </span>
              <span className="text-xs text-slate-500">ID: {campaign.id}</span>
            </div>
            <h3 className="mt-2 text-base font-semibold text-white leading-snug">{campaign.name}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {label !== 'Removed' && (
              <>
                <button
                  onClick={() => onToggle(campaign.id, label === 'Enabled' ? 'PAUSED' : 'ENABLED')}
                  disabled={isUpdating}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition disabled:opacity-50 ${
                    label === 'Enabled'
                      ? 'bg-amber-400/15 text-amber-400 hover:bg-amber-400/25'
                      : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                  }`}
                >
                  {label === 'Enabled' ? '⏸ Pause' : '▶ Enable'}
                </button>
                <button
                  onClick={() => onRemove(campaign.id, campaign.name)}
                  disabled={isUpdating}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition disabled:opacity-50"
                >
                  🗑
                </button>
              </>
            )}
            <button
              onClick={loadAdGroups}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition"
            >
              {expanded ? '▲ Hide' : '▼ Ad Groups'}
            </button>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Impressions', value: fmt(campaign.impressions) },
            { label: 'Clicks', value: fmt(campaign.clicks) },
            { label: 'CTR', value: pct(ctr) },
            { label: 'Cost', value: money(campaign.cost) },
            { label: 'Avg CPC', value: cpc(avgCpc) },
            { label: 'Conversions', value: fmt(campaign.conversions) },
          ].map(m => (
            <div key={m.label} className="rounded-xl bg-slate-900/50 p-3">
              <div className="text-xs text-slate-500">{m.label}</div>
              <div className="mt-1 text-sm font-bold text-white">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad groups */}
      {expanded && (
        <div className="border-t border-slate-700/50 bg-slate-900/30 p-4">
          {loadingAG && <div className="text-slate-400 text-sm py-2">Loading ad groups…</div>}
          {!loadingAG && adGroups.length === 0 && <div className="text-slate-500 text-sm py-2">No ad groups found.</div>}
          {!loadingAG && adGroups.length > 0 && (
            <div className="grid gap-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ad Groups</div>
              {adGroups.map(ag => {
                const agCtr = ag.impressions > 0 ? (ag.clicks / ag.impressions) * 100 : 0;
                const agSc = statusColor(ag.status);
                const agLabel = statusLabel(ag.status);
                return (
                  <div key={ag.id} className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-3 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${agSc.bg} ${agSc.text}`}>
                      <span className={`w-1 h-1 rounded-full ${agSc.dot}`} />{agLabel}
                    </span>
                    <span className="text-sm text-white font-medium flex-1 min-w-0 truncate">{ag.name}</span>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span>{fmt(ag.impressions)} imp</span>
                      <span>{fmt(ag.clicks)} clicks</span>
                      <span>{pct(agCtr)} CTR</span>
                      <span>{money(ag.cost)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────
export default function GoogleAdsDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [summary, setSummary] = useState({ impressions: 0, clicks: 0, cost: 0, conversions: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost');
  const [activeTab, setActiveTab] = useState('overview');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  async function load() {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API}/campaigns/list`);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Failed to load');
      const c = data.campaigns || [];
      setCampaigns(c);
      const s = c.reduce((a, x) => ({
        impressions: a.impressions + x.impressions,
        clicks: a.clicks + x.clicks,
        cost: a.cost + x.cost,
        conversions: a.conversions + x.conversions,
      }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 });
      setSummary(s);
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
      showToast(`Campaign ${newStatus === 'ENABLED' ? 'enabled' : 'paused'} ✓`);
      await load();
    } catch (e) {
      showToast(`Error: ${e.message}`);
    } finally {
      setUpdating(null);
    }
  }

  async function handleRemove(id, name) {
    if (!window.confirm(`Remove campaign "${name}"? This cannot be undone.`)) return;
    setUpdating(id);
    try {
      const res = await fetch(`${API}/campaigns/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: id, status: 'REMOVED' }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast('Campaign removed ✓');
      await load();
    } catch (e) {
      showToast(`Error: ${e.message}`);
    } finally {
      setUpdating(null);
    }
  }

  const overallCtr = summary.impressions > 0 ? (summary.clicks / summary.impressions) * 100 : 0;
  const overallCpc = summary.clicks > 0 ? summary.cost / summary.clicks : 0;
  const enabledCount = campaigns.filter(c => statusLabel(c.status) === 'Enabled').length;
  const pausedCount  = campaigns.filter(c => statusLabel(c.status) === 'Paused').length;

  const filtered = campaigns
    .filter(c => filter === 'All' || statusLabel(c.status) === filter)
    .sort((a, b) => Number(b[sortBy] || 0) - Number(a[sortBy] || 0));

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-800 border border-slate-600 text-white text-sm px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">Apex Dental</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Google Ads Dashboard</h1>
            <p className="mt-1 text-slate-400 text-sm">Last 30 days · Live data</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/google-ads-manager" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">
              Campaign Manager
            </a>
            <a href="/google-ads-builder" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">
              Campaign Builder
            </a>
            <a href="/google-ads-strategy" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition border border-slate-700">
              AI Strategy
            </a>
            <button
              onClick={load}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition disabled:opacity-50"
            >
              {loading ? '…' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-800/50 rounded-2xl border border-slate-700/50 w-fit mb-8">
          {['overview', 'campaigns'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && (
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-12 text-center text-slate-400">
            Loading campaign data…
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-6 text-rose-400">
            {error}
          </div>
        )}

        {!loading && !error && activeTab === 'overview' && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <StatCard label="Impressions" value={fmt(summary.impressions)} sub="Last 30 days" />
              <StatCard label="Clicks" value={fmt(summary.clicks)} />
              <StatCard label="Total Spend" value={money(summary.cost)} accent />
              <StatCard label="Overall CTR" value={pct(overallCtr)} />
              <StatCard label="Avg CPC" value={cpc(overallCpc)} />
              <StatCard label="Conversions" value={fmt(summary.conversions)} />
            </div>

            {/* Status overview + donut */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Status counts */}
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Campaign Status</div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Total', value: campaigns.length, color: 'text-white' },
                    { label: 'Enabled', value: enabledCount, color: 'text-emerald-400' },
                    { label: 'Paused', value: pausedCount, color: 'text-amber-400' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl bg-slate-900/50 p-4 text-center">
                      <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Spend bars */}
                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Spend by campaign</div>
                  {campaigns.slice(0, 5).map(c => {
                    const maxCost = Math.max(...campaigns.map(x => x.cost), 1);
                    const pct = (c.cost / maxCost) * 100;
                    return (
                      <div key={c.id} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400 truncate max-w-[200px]">{c.name.substring(0, 28)}{c.name.length > 28 ? '…' : ''}</span>
                          <span className="text-amber-400 font-semibold">{money(c.cost)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full">
                          <div className="h-1.5 bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cost donut */}
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Cost Distribution</div>
                <DonutChart campaigns={campaigns} />

                {/* Click distribution bars */}
                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Clicks by campaign</div>
                  <div className="flex items-end gap-1 h-10">
                    <MiniBar campaigns={campaigns.slice(0, 8)} field="clicks" color="#38bdf8" />
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Each bar = one campaign (by spend order)</div>
                </div>
              </div>
            </div>

            {/* Top performers table */}
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Campaign Performance Table</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      {['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Avg CPC', 'Conv.'].map(h => (
                        <th key={h} className="text-left pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map(c => {
                      const ctr = c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0;
                      const avgCpc = c.clicks > 0 ? c.cost / c.clicks : 0;
                      const sc = statusColor(c.status);
                      const lbl = statusLabel(c.status);
                      return (
                        <tr key={c.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition">
                          <td className="py-3 pr-4 text-white font-medium max-w-[180px]">
                            <div className="truncate" title={c.name}>{c.name.substring(0, 24)}{c.name.length > 24 ? '…' : ''}</div>
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                              <span className={`w-1 h-1 rounded-full ${sc.dot}`} />{lbl}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-slate-300">{fmt(c.impressions)}</td>
                          <td className="py-3 pr-4 text-slate-300">{fmt(c.clicks)}</td>
                          <td className="py-3 pr-4 text-slate-300">{pct(ctr)}</td>
                          <td className="py-3 pr-4 text-amber-400 font-semibold">{money(c.cost)}</td>
                          <td className="py-3 pr-4 text-slate-300">{cpc(avgCpc)}</td>
                          <td className="py-3 text-slate-300">{fmt(c.conversions)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {!loading && !error && activeTab === 'campaigns' && (
          <>
            {/* Filter + sort bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
                {['All', 'Enabled', 'Paused'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                      filter === f ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f} {f === 'All' ? `(${campaigns.length})` : f === 'Enabled' ? `(${enabledCount})` : `(${pausedCount})`}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs"
              >
                <option value="cost">Sort: Cost</option>
                <option value="clicks">Sort: Clicks</option>
                <option value="impressions">Sort: Impressions</option>
                <option value="conversions">Sort: Conversions</option>
              </select>
              <span className="text-slate-500 text-xs">{filtered.length} campaign{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid gap-4">
              {filtered.length === 0 && (
                <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-8 text-center text-slate-500">
                  No campaigns match this filter.
                </div>
              )}
              {filtered.map(c => (
                <CampaignRow
                  key={c.id}
                  campaign={c}
                  onToggle={handleToggle}
                  onRemove={handleRemove}
                  isUpdating={updating === c.id}
                />
              ))}
            </div>
          </>
        )}

        {/* Nav footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dashboard', href: '/google-ads-dashboard', active: true },
            { label: 'Campaign Manager', href: '/google-ads-manager' },
            { label: 'Campaign Builder', href: '/google-ads-builder' },
            { label: 'AI Strategy', href: '/google-ads-strategy' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`rounded-2xl p-4 text-center text-sm font-semibold border transition ${
                l.active
                  ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
