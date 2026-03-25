import React, { useEffect, useState } from 'react';

function statusLabel(status) {
  switch (Number(status)) {
    case 2:
      return 'Paused';
    case 3:
      return 'Enabled';
    case 4:
      return 'Removed';
    default:
      return `Status ${status}`;
  }
}

export default function GoogleAdsDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('http://localhost:3001/test-google-ads');
        const data = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(data.message || 'Failed to load campaigns');
        }

        setCampaigns(data.campaigns || []);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Google Ads Dashboard
          </h1>
          <p className="mt-3 text-slate-300 leading-7">
            Live campaigns from your Google Ads account.
          </p>
        </div>

        <div className="mt-8">
          {loading && (
            <div className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm">
              Loading campaigns...
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] bg-red-50 border border-red-200 p-8 shadow-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && campaigns.length === 0 && (
            <div className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm">
              No campaigns found.
            </div>
          )}

          {!loading && !error && campaigns.length > 0 && (
            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {campaign.name}
                      </h2>
                      <p className="mt-2 text-slate-600">
                        Campaign ID: {campaign.id}
                      </p>
                    </div>

                    <div className="inline-flex items-center rounded-full bg-slate-950 text-white px-4 py-2 text-sm font-semibold">
                      {statusLabel(campaign.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}