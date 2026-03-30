import React, { useEffect, useState } from 'react';

const API = 'https://google-ads-backend-production-2319.up.railway.app';

function fmt(n) { return new Intl.NumberFormat().format(n || 0); }
function money(n) { return `€${Number(n || 0).toFixed(2)}`; }
function pct(n) { return `${Number(n || 0).toFixed(2)}%`; }

const STATUS_LABELS = { 2: 'Paused', 3: 'Enabled', 4: 'Removed', ENABLED: 'Enabled', PAUSED: 'Paused', REMOVED: 'Removed' };
const STATUS_COLORS = {
  2: { bg: '#FFF3CD', color: '#856404' },
  3: { bg: '#D1FAE5', color: '#065F46' },
  4: { bg: '#FEE2E2', color: '#991B1B' },
  ENABLED: { bg: '#D1FAE5', color: '#065F46' },
  PAUSED: { bg: '#FFF3CD', color: '#856404' },
  REMOVED: { bg: '#FEE2E2', color: '#991B1B' },
};

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || { bg: '#F3F4F6', color: '#374151' };
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
      {STATUS_LABELS[status] || `Status ${status}`}
    </span>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', maxWidth: 400, width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Confirm action</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20, lineHeight: 1.6 }}>{message}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default function GoogleAdsCampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const [adGroups, setAdGroups] = useState({});
  const [adGroupLoading, setAdGroupLoading] = useState({});
  const [confirm, setConfirm] = useState(null);
  const [editBudget, setEditBudget] = useState({});
  const [filter, setFilter] = useState('ENABLED');
  const [search, setSearch] = useState('');

  useEffect(() => { loadCampaigns(); }, []);

  async function loadCampaigns() {
    try {
      setLoading(true); setError('');
      const res = await fetch(`${API}/campaigns/list`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      setCampaigns(data.campaigns || []);
    } catch (e) {
      // Fallback to basic endpoint
      try {
        const res = await fetch(`${API}/test-google-ads`);
        const data = await res.json();
        if (!data.ok) throw new Error(data.message);
        setCampaigns(data.campaigns || []);
      } catch (e2) {
        setError(e2.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  }

  async function updateStatus(campaignId, status) {
    setActionLoading(p => ({ ...p, [campaignId]: true }));
    try {
      const res = await fetch(`${API}/campaigns/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, status }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast(`Campaign ${status.toLowerCase()} successfully.`);
      await loadCampaigns();
    } catch (e) {
      showToast('Error: ' + e.message);
    } finally {
      setActionLoading(p => ({ ...p, [campaignId]: false }));
      setConfirm(null);
    }
  }

  async function updateAdGroupStatus(adGroupId, status, campaignId) {
    setActionLoading(p => ({ ...p, ['ag-' + adGroupId]: true }));
    try {
      const res = await fetch(`${API}/ad-groups/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adGroupId, status }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast(`Ad group ${status.toLowerCase()} successfully.`);
      await loadAdGroups(campaignId);
    } catch (e) {
      showToast('Error: ' + e.message);
    } finally {
      setActionLoading(p => ({ ...p, ['ag-' + adGroupId]: false }));
    }
  }

  async function loadAdGroups(campaignId) {
    setAdGroupLoading(p => ({ ...p, [campaignId]: true }));
    try {
      const res = await fetch(`${API}/campaigns/${campaignId}/ad-groups`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      setAdGroups(p => ({ ...p, [campaignId]: data.adGroups || [] }));
    } catch (e) {
      showToast('Could not load ad groups: ' + e.message);
    } finally {
      setAdGroupLoading(p => ({ ...p, [campaignId]: false }));
    }
  }

  async function updateBudget(campaignId) {
    const budget = editBudget[campaignId];
    if (!budget || isNaN(budget)) { showToast('Enter a valid budget'); return; }
    setActionLoading(p => ({ ...p, ['budget-' + campaignId]: true }));
    try {
      const res = await fetch(`${API}/campaigns/update-budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, dailyBudget: budget }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message);
      showToast('Budget updated successfully.');
      setEditBudget(p => ({ ...p, [campaignId]: '' }));
      await loadCampaigns();
    } catch (e) {
      showToast('Error: ' + e.message);
    } finally {
      setActionLoading(p => ({ ...p, ['budget-' + campaignId]: false }));
    }
  }

  function toggleExpand(campaignId) {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(campaignId);
      if (!adGroups[campaignId]) loadAdGroups(campaignId);
    }
  }

  const filtered = campaigns.filter(c => {
    const statusMap = { 2: 'PAUSED', 3: 'ENABLED', 4: 'REMOVED' };
    const s = statusMap[c.status] || c.status;
    if (filter !== 'ALL' && s !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const summary = campaigns.reduce((a, c) => ({
    impressions: a.impressions + (c.impressions || 0),
    clicks: a.clicks + (c.clicks || 0),
    cost: a.cost + (c.cost || 0),
    conversions: a.conversions + (c.conversions || 0),
  }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

  const card = { background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '1.25rem', marginBottom: '1rem' };
  const btn = (bg, color) => ({ padding: '6px 14px', fontSize: 13, borderRadius: 8, border: 'none', background: bg, color, cursor: 'pointer', fontWeight: 500 });

  return (
    <main style={{ minHeight: '100vh', background: '#F1F5F9', paddingTop: 120, paddingBottom: 80 }}>
      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1E293B', color: 'white', padding: '12px 20px', borderRadius: 10, zIndex: 999, fontSize: 14, maxWidth: 360 }}>
          {toast}
        </div>
      )}

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ ...card, background: '#0F172A', color: 'white', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Campaign manager</h1>
              <p style={{ color: '#94A3B8', marginTop: 4, fontSize: 14 }}>Manage, pause, enable and remove your Google Ads campaigns</p>
            </div>
            <button onClick={loadCampaigns} style={btn('#1E3A5F', '#93C5FD')}>↻ Refresh</button>
          </div>
        </div>

        {/* Summary metrics */}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: '1.5rem' }}>
            {[
              { label: 'Impressions', value: fmt(summary.impressions) },
              { label: 'Clicks', value: fmt(summary.clicks) },
              { label: 'Total spend', value: money(summary.cost) },
              { label: 'Conversions', value: fmt(summary.conversions) },
              { label: 'Avg CTR', value: summary.impressions ? pct(summary.clicks / summary.impressions * 100) : '0%' },
            ].map(m => (
              <div key={m.label} style={card}>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#0F172A' }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14, minWidth: 200 }}
          />
          {['ALL', 'ENABLED', 'PAUSED', 'REMOVED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...btn(filter === f ? '#0F172A' : 'white', filter === f ? 'white' : '#374151'), border: '1px solid #E5E7EB' }}>
              {f === 'ALL' ? 'All campaigns' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#6B7280' }}>{filtered.length} campaign{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* States */}
        {loading && <div style={{ ...card, textAlign: 'center', color: '#6B7280', padding: '3rem' }}>Loading campaigns...</div>}
        {error && <div style={{ ...card, background: '#FEF2F2', color: '#991B1B', borderColor: '#FECACA' }}>{error}</div>}

        {/* Campaign list */}
        {!loading && !error && filtered.map(campaign => {
          const isExpanded = expandedCampaign === campaign.id;
          const isLoading = actionLoading[campaign.id];
          const statusNum = campaign.status;
          const statusMap = { 2: 'PAUSED', 3: 'ENABLED', 4: 'REMOVED' };
          const statusStr = statusMap[statusNum] || campaign.status;
          const ctr = campaign.ctr || (campaign.impressions ? campaign.clicks / campaign.impressions * 100 : 0);

          return (
            <div key={campaign.id} style={card}>
              {/* Campaign header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <StatusBadge status={statusNum} />
                    {campaign.type && <span style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 20 }}>{campaign.type}</span>}
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.3 }}>{campaign.name}</h2>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>ID: {campaign.id}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {statusStr !== 'ENABLED' && (
                    <button
                      disabled={isLoading}
                      onClick={() => updateStatus(campaign.id, 'ENABLED')}
                      style={btn('#D1FAE5', '#065F46')}
                    >
                      {isLoading ? '...' : '▶ Enable'}
                    </button>
                  )}
                  {statusStr !== 'PAUSED' && statusStr !== 'REMOVED' && (
                    <button
                      disabled={isLoading}
                      onClick={() => updateStatus(campaign.id, 'PAUSED')}
                      style={btn('#FEF3C7', '#92400E')}
                    >
                      {isLoading ? '...' : '⏸ Pause'}
                    </button>
                  )}
                  {statusStr !== 'REMOVED' && (
                    <button
                      disabled={isLoading}
                      onClick={() => setConfirm({
                        message: `Are you sure you want to remove "${campaign.name}"? This cannot be undone.`,
                        onConfirm: () => updateStatus(campaign.id, 'REMOVED'),
                      })}
                      style={btn('#FEE2E2', '#991B1B')}
                    >
                      🗑 Remove
                    </button>
                  )}
                  <button
                    onClick={() => toggleExpand(campaign.id)}
                    style={btn('#F3F4F6', '#374151')}
                  >
                    {isExpanded ? '▲ Collapse' : '▼ Expand'}
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 8, marginTop: 16 }}>
                {[
                  { label: 'Impressions', value: fmt(campaign.impressions) },
                  { label: 'Clicks', value: fmt(campaign.clicks) },
                  { label: 'CTR', value: pct(ctr) },
                  { label: 'Cost', value: money(campaign.cost) },
                  { label: 'Avg CPC', value: money(campaign.avgCpc) },
                  { label: 'Conversions', value: fmt(campaign.conversions) },
                ].map(m => (
                  <div key={m.label} style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 12px' }}>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{m.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Budget editor */}
              <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#6B7280' }}>
                  Daily budget: <strong style={{ color: '#0F172A' }}>{campaign.dailyBudget ? money(campaign.dailyBudget) : 'N/A'}</strong>
                </span>
                <input
                  type="number"
                  placeholder="New budget €"
                  value={editBudget[campaign.id] || ''}
                  onChange={e => setEditBudget(p => ({ ...p, [campaign.id]: e.target.value }))}
                  style={{ width: 120, padding: '5px 8px', borderRadius: 6, border: '1px solid #E5E7EB', fontSize: 13 }}
                />
                {editBudget[campaign.id] && (
                  <button
                    onClick={() => updateBudget(campaign.id)}
                    disabled={actionLoading['budget-' + campaign.id]}
                    style={btn('#DBEAFE', '#1E40AF')}
                  >
                    {actionLoading['budget-' + campaign.id] ? '...' : 'Update'}
                  </button>
                )}
              </div>

              {/* Expanded: Ad groups */}
              {isExpanded && (
                <div style={{ marginTop: 16, borderTop: '1px solid #E5E7EB', paddingTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 10 }}>Ad groups</div>
                  {adGroupLoading[campaign.id] && <div style={{ fontSize: 13, color: '#6B7280' }}>Loading ad groups...</div>}
                  {adGroups[campaign.id] && adGroups[campaign.id].map(ag => {
                    const agStatusMap = { 2: 'PAUSED', 3: 'ENABLED', 4: 'REMOVED' };
                    const agStatus = agStatusMap[ag.status] || ag.status;
                    const agLoading = actionLoading['ag-' + ag.id];
                    return (
                      <div key={ag.id} style={{ background: '#F8FAFC', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <StatusBadge status={ag.status} />
                              <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{ag.name}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                              {fmt(ag.impressions)} impr · {fmt(ag.clicks)} clicks · {money(ag.cost)}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {agStatus !== 'ENABLED' && (
                              <button disabled={agLoading} onClick={() => updateAdGroupStatus(ag.id, 'ENABLED', campaign.id)} style={btn('#D1FAE5', '#065F46')}>
                                {agLoading ? '...' : '▶ Enable'}
                              </button>
                            )}
                            {agStatus !== 'PAUSED' && agStatus !== 'REMOVED' && (
                              <button disabled={agLoading} onClick={() => updateAdGroupStatus(ag.id, 'PAUSED', campaign.id)} style={btn('#FEF3C7', '#92400E')}>
                                {agLoading ? '...' : '⏸ Pause'}
                              </button>
                            )}
                            {agStatus !== 'REMOVED' && (
                              <button disabled={agLoading} onClick={() => setConfirm({
                                message: `Remove ad group "${ag.name}"?`,
                                onConfirm: () => updateAdGroupStatus(ag.id, 'REMOVED', campaign.id),
                              })} style={btn('#FEE2E2', '#991B1B')}>
                                🗑
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {adGroups[campaign.id] && adGroups[campaign.id].length === 0 && (
                    <div style={{ fontSize: 13, color: '#6B7280' }}>No ad groups found for this campaign.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ ...card, textAlign: 'center', color: '#6B7280', padding: '3rem' }}>
            No campaigns match your filter.
          </div>
        )}
      </section>
    </main>
  );
}
