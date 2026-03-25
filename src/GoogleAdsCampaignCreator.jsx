import React, { useState } from 'react';

const defaultForm = {
  campaignName: '',
  dailyBudget: '20',
  finalUrl: 'https://apexdentalmalta.com',
  adGroupName: 'Main Ad Group',
  keywords: 'dentist malta\nemergency dentist malta\ndental implants malta',
  headlines: 'Dentist In Malta\nEmergency Dentist Malta\nDental Implants Malta',
  descriptions:
    'Book your visit at Apex Dental Malta.\nAdvanced dentistry, implants, aligners, and emergency care.',
  sitelinks: 'Book Visit|https://apexdentalmalta.com/appointment-booking/\nContact Us|https://apexdentalmalta.com/contact-us/',
};

export default function GoogleAdsCampaignCreator() {
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function updateField(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/campaigns/create-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to build campaign payload');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Google Ads Campaign Creator
          </h1>
          <p className="mt-3 text-slate-300 leading-7">
            Build a campaign draft with keywords, RSA text, and sitelinks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Name
              </label>
              <input
                name="campaignName"
                value={form.campaignName}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Search | Apex Dental Malta"
                required
              />
            </div>

            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Daily Budget (€)
              </label>
              <input
                name="dailyBudget"
                value={form.dailyBudget}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                type="number"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Final URL
            </label>
            <input
              name="finalUrl"
              value={form.finalUrl}
              onChange={updateField}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />
          </div>

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ad Group Name
            </label>
            <input
              name="adGroupName"
              value={form.adGroupName}
              onChange={updateField}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Keywords (one per line)
              </label>
              <textarea
                name="keywords"
                value={form.keywords}
                onChange={updateField}
                rows="8"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>

            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Headlines (one per line)
              </label>
              <textarea
                name="headlines"
                value={form.headlines}
                onChange={updateField}
                rows="8"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descriptions (one per line)
              </label>
              <textarea
                name="descriptions"
                value={form.descriptions}
                onChange={updateField}
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>

            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sitelinks (Title|URL per line)
              </label>
              <textarea
                name="sitelinks"
                value={form.sitelinks}
                onChange={updateField}
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-slate-950 text-white px-6 py-3.5 font-semibold"
            >
              {submitting ? 'Building...' : 'Build Campaign Draft'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-[2rem] bg-red-50 border border-red-200 p-6 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-[2rem] bg-green-50 border border-green-200 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-green-800">
              Campaign Created
            </h2>
            <p className="mt-3 text-green-700">{result.message}</p>
            <pre className="mt-4 whitespace-pre-wrap text-sm text-green-900 overflow-auto">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}