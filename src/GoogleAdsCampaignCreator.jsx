import React, { useMemo, useState } from 'react';

const defaultForm = {
  campaignName: 'Apex Dental',
  dailyBudget: '20',
  finalUrl: 'https://apexdentalmalta.com',
  adGroupName: 'Main Ad Group',
  keywords: 'apex dental\napex dental malta\napexdental\nbook visit',
  headlines: 'Official Website\nBook Online\nVisit Website',
  descriptions: 'Visit our official website.\nBook online today.',
  sitelinks:
    'Book Visit|https://apexdentalmalta.com/appointment-booking/\nContact Us|https://apexdentalmalta.com/contact-us/',
  callouts: 'Book Online\nModern Clinic\nLocal Malta Practice\nOfficial Website',
  structuredSnippets: 'Services|Checkups, Hygiene, Cosmetic Dentistry, Restorative Care',
};

const masterCampaignMap = {
  brand: {
    label: 'Brand',
    campaignName: 'Apex Dental | Brand | Malta',
  },
  emergency: {
    label: 'Emergency',
    campaignName: 'Apex Dental | Emergency | Malta',
  },
  implants: {
    label: 'Implants',
    campaignName: 'Apex Dental | Implants | Malta',
  },
  aligners: {
    label: 'Aligners',
    campaignName: 'Apex Dental | Aligners | Malta',
  },
  cosmetic: {
    label: 'Cosmetic',
    campaignName: 'Apex Dental | Cosmetic | Malta',
  },
  veneers: {
    label: 'Veneers',
    campaignName: 'Apex Dental | Veneers | Malta',
  },
  orthodontics: {
    label: 'Orthodontics',
    campaignName: 'Apex Dental | Orthodontics | Malta',
  },
};

const campaignTemplates = {
  brand: {
    label: 'Brand Campaign',
    campaignName: 'Apex Dental | Brand | Malta',
    adGroupName: 'Brand Group',
    finalUrl: 'https://apexdentalmalta.com',
    keywords: 'apex dental\napex dental malta\napexdental\nbook visit',
    headlines: 'Apex Dental Malta\nOfficial Website\nBook Online Today\nVisit Our Website\nTrusted Local Clinic',
    descriptions: 'Visit Apex Dental Malta online.\nBook online today in Malta.',
    callouts: 'Book Online\nOfficial Website\nLocal Malta Practice\nModern Clinic',
    sitelinks:
      'Book Visit|https://apexdentalmalta.com/appointment-booking/\nContact Us|https://apexdentalmalta.com/contact-us/',
    structuredSnippets: 'Services|Consultation, Checkups, Hygiene, Patient Care',
  },

  implants: {
    label: 'Implants Campaign',
    campaignName: 'Apex Dental | Implants | Malta',
    adGroupName: 'Implants Group',
    finalUrl: 'https://apexdentalmalta.com',
    keywords:
      'dental implants malta\nimplant clinic malta\nbook dental implants malta\nimplant consultation malta',
    headlines:
      'Dental Implants Malta\nBook Implant Consultation\nModern Implant Clinic\nVisit Our Website\nApex Dental Malta',
    descriptions:
      'Book your implant consultation at Apex Dental.\nVisit our website to learn more and book online.',
    callouts: 'Book Online\nModern Clinic\nImplant Consultation\nOfficial Website',
    sitelinks:
      'Book Visit|https://apexdentalmalta.com/appointment-booking/\nDental Implants|https://apexdentalmalta.com/dental-implants/',
    structuredSnippets: 'Services|Dental Implants, Consultation, Restorative Care, Checkups',
  },

  emergency: {
    label: 'Emergency Campaign',
    campaignName: 'Apex Dental | Emergency | Malta',
    adGroupName: 'Emergency Group',
    finalUrl: 'https://apexdentalmalta.com',
    keywords:
      'emergency dentist malta\ndentist open sunday malta\nurgent dentist malta\ntooth pain malta',
    headlines:
      'Emergency Dentist Malta\nOpen Sunday 9–12\nUrgent Dental Help\nCall Now\nApex Dental Malta',
    descriptions:
      'Urgent dental help in Malta.\nVisit our website or call now for emergency care.',
    callouts: 'Open Sunday\nUrgent Help\nBook Online\nOfficial Website',
    sitelinks:
      'Book Visit|https://apexdentalmalta.com/appointment-booking/\nEmergency Dentist|https://apexdentalmalta.com/emergency-dental-service-malta/',
    structuredSnippets: 'Services|Emergency Care, Consultation, Urgent Visits, Patient Support',
  },

  aligners: {
    label: 'Aligners Campaign',
    campaignName: 'Apex Dental | Aligners | Malta',
    adGroupName: 'Aligners Group',
    finalUrl: 'https://apexdentalmalta.com',
    keywords:
      'clear aligners malta\naligners malta\nbook aligners consultation malta\ninvisible aligners malta',
    headlines:
      'Clear Aligners Malta\nBook Aligners Consultation\nModern Smile Treatment\nVisit Our Website\nApex Dental Malta',
    descriptions:
      'Book your aligners consultation at Apex Dental.\nVisit our website to learn more and book online.',
    callouts: 'Book Online\nModern Clinic\nSmile Consultation\nOfficial Website',
    sitelinks:
      'Book Visit|https://apexdentalmalta.com/appointment-booking/\nClear Aligners|https://apexdentalmalta.com/invisalign-malta/',
    structuredSnippets: 'Services|Clear Aligners, Consultation, Smile Planning, Checkups',
  },

  cosmetic: {
    label: 'Cosmetic Campaign',
    campaignName: 'Apex Dental | Cosmetic | Malta',
    adGroupName: 'Cosmetic Group',
    finalUrl: 'https://apexdentalmalta.com',
    keywords:
      'cosmetic dentistry malta\nveneers malta\nsmile makeover malta\nbook cosmetic consultation malta',
    headlines:
      'Cosmetic Dentistry Malta\nBook Smile Consultation\nModern Cosmetic Care\nVisit Our Website\nApex Dental Malta',
    descriptions:
      'Book your cosmetic consultation at Apex Dental.\nVisit our website to learn more and book online.',
    callouts: 'Book Online\nModern Clinic\nSmile Consultation\nOfficial Website',
    sitelinks:
      'Book Visit|https://apexdentalmalta.com/appointment-booking/\nCosmetic Dentistry|https://apexdentalmalta.com/cosmetic-dentistry-malta/',
    structuredSnippets: 'Services|Cosmetic Dentistry, Veneers, Consultation, Smile Care',
  },
};

function splitLines(value) {
  return String(value || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

function parsePipeLines(value) {
  return splitLines(value).map((line) => {
    const [left, right] = line.split('|');
    return {
      left: left?.trim() || '',
      right: right?.trim() || '',
    };
  });
}

export default function GoogleAdsCampaignCreator() {
  const [form, setForm] = useState(defaultForm);
  const [selectedTemplate, setSelectedTemplate] = useState('brand');
  const [campaignType, setCampaignType] = useState('brand');
  const [campaignMode, setCampaignMode] = useState('improve');
  const [brandSafeOnly, setBrandSafeOnly] = useState(true);
  const [safeMode, setSafeMode] = useState(true);
  const [activeTab, setActiveTab] = useState('sitelinks');
  const [submitting, setSubmitting] = useState(false);
  const [generatorInput, setGeneratorInput] = useState({
    businessName: 'Apex Dental',
    service: 'Dental Care',
    location: 'Malta',
    finalUrl: 'https://apexdentalmalta.com',
    language: 'English',
  });
  const [generatedLanguagePacks, setGeneratedLanguagePacks] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [competitorResearch, setCompetitorResearch] = useState({
    competitorName: '',
    competitorDomain: '',
    observedHeadlines: '',
    observedDescriptions: '',
    observedKeywords: '',
  });
  const [researchOutput, setResearchOutput] = useState(null);
  const [researchAnalysis, setResearchAnalysis] = useState(null);
  const [analyzingResearch, setAnalyzingResearch] = useState(false);
  const [cleanedCampaignDraft, setCleanedCampaignDraft] = useState(null);
  const [result, setResult] = useState(null);
  const [apiDetails, setApiDetails] = useState(null);
  const [creatingConversion, setCreatingConversion] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState('');

  function updateField(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function updateGeneratorInput(e) {
    setGeneratorInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleGenerateCampaign() {
    setGenerating(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/campaigns/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatorInput),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to generate campaign');
      }

      setGeneratedLanguagePacks(data.allLanguages || null);

      setForm((prev) => ({
        ...prev,
        ...data.generated,
      }));
    } catch (err) {
      setError(err.message || 'Failed to generate campaign');
    } finally {
      setGenerating(false);
    }
  }

  async function handleCreateAllLanguages() {
    if (!generatedLanguagePacks) {
      setError('Generate the language packs first.');
      return;
    }

    setSubmitting(true);
    setError('');
    setResult(null);

    try {
      let campaigns = ['English', 'Italian', 'Spanish'].map((lang) => ({
        dailyBudget: form.dailyBudget || '20',
        finalUrl: generatorInput.finalUrl,
        ...generatedLanguagePacks[lang],
      }));

      if (brandSafeOnly) {
        campaigns = campaigns.map((campaign) => buildBrandSafePayload(campaign));
      }

      setApiDetails(null);

      const response = await fetch(
        'http://localhost:3001/campaigns/create-multi-language',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaigns }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to create campaigns');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to create campaigns');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateAppointmentConversion() {
    console.log('CLICKED conversion button');
    setCreatingConversion(true);
    setError('');
    setConversionResult(null);

    try {
      const response = await fetch(
        'http://localhost:3001/conversions/create-appointment-booking',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('CONVERSION RESPONSE STATUS:', response.status);

      const data = await response.json();
      console.log('CONVERSION RESPONSE DATA:', data);

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to create conversion');
      }

      setConversionResult(data);
    } catch (err) {
      console.error('CONVERSION ERROR:', err);
      setError(err.message || 'Failed to create conversion');
    } finally {
      setCreatingConversion(false);
    }
  }

  const keywordList = useMemo(() => splitLines(form.keywords), [form.keywords]);
  const headlineList = useMemo(() => splitLines(form.headlines), [form.headlines]);
  const descriptionList = useMemo(() => splitLines(form.descriptions), [form.descriptions]);
  const sitelinkList = useMemo(() => parsePipeLines(form.sitelinks), [form.sitelinks]);
  const calloutList = useMemo(() => splitLines(form.callouts), [form.callouts]);

  const structuredSnippet = useMemo(() => {
    const first = parsePipeLines(form.structuredSnippets)[0] || { left: '', right: '' };
    return {
      header: first.left,
      values: first.right
        ? first.right.split(',').map((x) => x.trim()).filter(Boolean)
        : [],
    };
  }, [form.structuredSnippets]);

  function countTooLong(items, max) {
    return items.filter((item) => item.length > max).length;
  }

  const longHeadlines = countTooLong(headlineList, 30);
  const longDescriptions = countTooLong(descriptionList, 90);
  const longCallouts = countTooLong(calloutList, 25);

  function buildBrandSafePayload(source) {
    const baseUrl = (source.finalUrl || generatorInput.finalUrl || '').replace(/\/$/, '');

    return {
      ...source,
      campaignName: `${generatorInput.businessName} | Brand Safe | ${generatorInput.location}`,
      adGroupName: `${generatorInput.businessName} Brand Group`,
      keywords: [
        generatorInput.businessName.toLowerCase(),
        `${generatorInput.businessName.toLowerCase()} ${generatorInput.location.toLowerCase()}`,
        'book visit malta',
        'official website malta',
        'apexdental',
      ].join('\n'),
      headlines: [
        `${generatorInput.businessName} Malta`,
        'Official Website',
        'Book Online Today',
        `Visit ${generatorInput.businessName}`,
        `Local Clinic ${generatorInput.location}`,
      ].join('\n'),
      descriptions: [
        `Visit ${generatorInput.businessName} online.`,
        `Book online today in ${generatorInput.location}.`,
      ].join('\n'),
      callouts: [
        'Book Online',
        'Official Website',
        `Local ${generatorInput.location} Practice`,
        'Modern Clinic',
      ].join('\n'),
      sitelinks: [
        `Book Visit|${baseUrl}/appointment-booking/`,
        `Contact Us|${baseUrl}/contact-us/`,
      ].join('\n'),
      structuredSnippets:
        'Services|Consultation, Checkups, Hygiene, Patient Care',
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setResult(null);

    try {
      let payload = { ...form };

      if (brandSafeOnly) {
        payload = buildBrandSafePayload(payload);
      } else if (safeMode) {
        const blockedWords = [
          'implant',
          'implants',
          'emergency',
          'whitening',
          'veneer',
          'veneers',
          'root canal',
          'orthodontic',
          'aligner',
          'aligners',
        ];

        const originalKeywords = payload.keywords
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean);

        const cleanKeywords = originalKeywords.filter((line) => {
          const lower = line.toLowerCase();
          return !blockedWords.some((word) => lower.includes(word));
        });

        payload.keywords =
          cleanKeywords.length > 0
            ? cleanKeywords.join('\n')
            : originalKeywords.join('\n');
      }

      setApiDetails(null);

      const response = await fetch('http://localhost:3001/campaigns/create-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const err = new Error(data.message || 'Failed to create campaign');
        err.apiDetails = data.apiDetails || null;
        throw err;
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setApiDetails(err.apiDetails || null);
    } finally {
      setSubmitting(false);
    }
  }

  function TabButton({ id, children }) {
    const active = activeTab === id;
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          active
            ? 'bg-slate-950 text-white'
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
      >
        {children}
      </button>
    );
  }

  function applyLanguagePack(languageName) {
    if (!generatedLanguagePacks?.[languageName]) return;

    setForm((prev) => ({
      ...prev,
      dailyBudget: prev.dailyBudget || '20',
      finalUrl: generatorInput.finalUrl,
      ...generatedLanguagePacks[languageName],
    }));
  }

  function updateCompetitorResearch(e) {
    const { name, value } = e.target;
    setCompetitorResearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function uniqueLines(text) {
    return Array.from(
      new Set(
        String(text || '')
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean)
      )
    );
  }

  function handleAnalyzeCompetitorResearch() {
    const headlineList = uniqueLines(competitorResearch.observedHeadlines);
    const descriptionList = uniqueLines(competitorResearch.observedDescriptions);
    const keywordList = uniqueLines(competitorResearch.observedKeywords);

    const allWords = [
      ...headlineList,
      ...descriptionList,
      ...keywordList,
    ]
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, ' ')
      .split(/\s+/)
      .filter(Boolean);

    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'you', 'your', 'our', 'are', 'now', 'today',
      'visit', 'website', 'book', 'online', 'in', 'at', 'to', 'of', 'a', 'an',
      'malta', 'clinic'
    ]);

    const freq = {};
    for (const word of allWords) {
      if (word.length < 3) continue;
      if (stopWords.has(word)) continue;
      freq[word] = (freq[word] || 0) + 1;
    }

    const topThemes = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([word]) => word);

    const saferHeadlineIdeas = [
      `Official ${generatorInput.businessName}`,
      `Book Online Today`,
      `${generatorInput.businessName} Malta`,
      `Visit Our Website`,
      `Trusted Local Clinic`,
    ];

    const saferKeywordIdeas = [
      generatorInput.businessName.toLowerCase(),
      `${generatorInput.businessName.toLowerCase()} malta`,
      `${generatorInput.service.toLowerCase()} malta`,
      `${generatorInput.service.toLowerCase()} clinic malta`,
      `book visit malta`,
    ];

    setResearchOutput({
      topThemes,
      headlineList,
      descriptionList,
      keywordList,
      saferHeadlineIdeas,
      saferKeywordIdeas,
    });
  }

  function applyResearchToCampaign() {
    if (!researchOutput) return;

    setForm((prev) => ({
      ...prev,
      keywords: researchOutput.saferKeywordIdeas.join('\n'),
      headlines: researchOutput.saferHeadlineIdeas.join('\n'),
      descriptions:
        'Visit our official website.\nBook online today.',
    }));
  }

  async function handleAnalyzeResearchWithBackend() {
    setAnalyzingResearch(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/campaigns/analyze-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: generatorInput.businessName,
          service: generatorInput.service,
          observedHeadlines: competitorResearch.observedHeadlines,
          observedDescriptions: competitorResearch.observedDescriptions,
          observedKeywords: competitorResearch.observedKeywords,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to analyze research');
      }

      setResearchAnalysis(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze research');
    } finally {
      setAnalyzingResearch(false);
    }
  }

  function handleBuildCleanDraft() {
    if (!researchAnalysis) {
      setError('Analyze competitor research first.');
      return;
    }

    const safeKeywords = researchAnalysis.scoredKeywords
      .filter((item) => item.policyRisk !== 'high')
      .map((item) => item.text);

    const fallbackKeywords = [
      generatorInput.businessName.toLowerCase(),
      `${generatorInput.businessName.toLowerCase()} ${generatorInput.location.toLowerCase()}`,
      `book visit ${generatorInput.location.toLowerCase()}`,
      `official website ${generatorInput.location.toLowerCase()}`,
    ];

    const finalKeywords =
      safeKeywords.length > 0 ? safeKeywords : fallbackKeywords;

    const cleanHeadlines = [
      generatorInput.businessName,
      'Official Website',
      'Book Online Today',
      `Visit ${generatorInput.businessName}`,
      `Local Clinic ${generatorInput.location}`,
    ].slice(0, 5);

    const cleanDescriptions = [
      `Visit ${generatorInput.businessName} online.`,
      `Book online today in ${generatorInput.location}.`,
    ];

    const cleanCallouts = [
      'Book Online',
      'Official Website',
      `Local ${generatorInput.location} Practice`,
      'Modern Clinic',
    ];

    const cleanSitelinks = [
      `Book Visit|${generatorInput.finalUrl.replace(/\/$/, '')}/appointment-booking/`,
      `Contact Us|${generatorInput.finalUrl.replace(/\/$/, '')}/contact-us/`,
    ];

    const cleanStructuredSnippet = `Services|Consultation, Checkups, Hygiene, Patient Care`;

    const draft = {
      campaignName: `${generatorInput.businessName} | Clean Draft | ${generatorInput.location}`,
      dailyBudget: form.dailyBudget || '20',
      finalUrl: generatorInput.finalUrl,
      adGroupName: `${generatorInput.businessName} Clean Group`,
      keywords: finalKeywords.join('\n'),
      headlines: cleanHeadlines.join('\n'),
      descriptions: cleanDescriptions.join('\n'),
      callouts: cleanCallouts.join('\n'),
      sitelinks: cleanSitelinks.join('\n'),
      structuredSnippets: cleanStructuredSnippet,
    };

    setCleanedCampaignDraft(draft);
  }

  function applyCleanDraftToCampaign() {
    if (!cleanedCampaignDraft) return;

    setForm((prev) => ({
      ...prev,
      ...cleanedCampaignDraft,
    }));
  }

  function applyTemplate(templateKey) {
    const template = campaignTemplates[templateKey];
    if (!template) return;

    setSelectedTemplate(templateKey);

    setForm((prev) => ({
      ...prev,
      campaignName: template.campaignName,
      finalUrl: template.finalUrl || prev.finalUrl,
      adGroupName: template.adGroupName,
      keywords: template.keywords,
      headlines: template.headlines,
      descriptions: template.descriptions,
      callouts: template.callouts,
      sitelinks: template.sitelinks,
      structuredSnippets: template.structuredSnippets,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Google Ads Campaign Creator
          </h1>
          <p className="mt-3 text-slate-300 leading-7">
            Create paused search campaigns and prepare ad assets in one place.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            AI Campaign Generator
          </h2>
          <p className="mt-2 text-slate-600">
            Fill in a few campaign details and auto-generate keywords, headlines,
            descriptions, callouts, sitelinks, and structured snippets.
          </p>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Business Name
              </label>
              <input
                name="businessName"
                value={generatorInput.businessName}
                onChange={updateGeneratorInput}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service
              </label>
              <input
                name="service"
                value={generatorInput.service}
                onChange={updateGeneratorInput}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Dental Implants"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                name="location"
                value={generatorInput.location}
                onChange={updateGeneratorInput}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Malta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Final URL
              </label>
              <input
                name="finalUrl"
                value={generatorInput.finalUrl}
                onChange={updateGeneratorInput}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={generatorInput.language}
                onChange={updateGeneratorInput}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option>English</option>
                <option>Italian</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <select value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
              <option value="brand">Brand</option>
              <option value="emergency">Emergency</option>
              <option value="implants">Implants</option>
              <option value="aligners">Aligners</option>
              <option value="cosmetic">Cosmetic</option>
              <option value="veneers">Veneers</option>
              <option value="orthodontics">Orthodontics</option>
            </select>

            <select value={campaignMode} onChange={(e) => setCampaignMode(e.target.value)}>
              <option value="improve">Improve Existing</option>
              <option value="create_if_missing">Create If Missing</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGenerateCampaign}
              disabled={generating}
              className="rounded-full bg-slate-950 text-white px-6 py-3.5 font-semibold"
            >
              {generating ? 'Generating...' : 'Generate Campaign'}
            </button>

            {generatedLanguagePacks && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => applyLanguagePack('English')}
                  className="rounded-full bg-slate-200 text-slate-800 px-4 py-2 font-semibold"
                >
                  Use English Pack
                </button>
                <button
                  type="button"
                  onClick={() => applyLanguagePack('Italian')}
                  className="rounded-full bg-slate-200 text-slate-800 px-4 py-2 font-semibold"
                >
                  Use Italian Pack
                </button>
                <button
                  type="button"
                  onClick={() => applyLanguagePack('Spanish')}
                  className="rounded-full bg-slate-200 text-slate-800 px-4 py-2 font-semibold"
                >
                  Use Spanish Pack
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleCreateAllLanguages}
              disabled={submitting}
              className="mt-4 rounded-full bg-emerald-600 text-white px-6 py-3.5 font-semibold"
            >
              {submitting ? 'Creating All...' : 'Create All 3 Campaigns'}
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Campaign Templates
          </h2>
          <p className="mt-2 text-slate-600">
            Load a ready-made campaign structure for your most common services.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(campaignTemplates).map(([key, template]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyTemplate(key)}
                className={`rounded-full px-4 py-2 font-semibold transition ${
                  selectedTemplate === key
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {template.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
            <div className="text-sm text-slate-500">Selected Template</div>
            <div className="mt-1 font-semibold text-slate-900">
              {campaignTemplates[selectedTemplate]?.label}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Competitor Research
          </h2>
          <p className="mt-2 text-slate-600">
            Paste competitor headlines, descriptions, and keyword themes to extract patterns
            and generate safer campaign variants.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Competitor Name
              </label>
              <input
                name="competitorName"
                value={competitorResearch.competitorName}
                onChange={updateCompetitorResearch}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Competitor Domain
              </label>
              <input
                name="competitorDomain"
                value={competitorResearch.competitorDomain}
                onChange={updateCompetitorResearch}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Observed Headlines
              </label>
              <textarea
                name="observedHeadlines"
                value={competitorResearch.observedHeadlines}
                onChange={updateCompetitorResearch}
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Observed Descriptions
              </label>
              <textarea
                name="observedDescriptions"
                value={competitorResearch.observedDescriptions}
                onChange={updateCompetitorResearch}
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Observed Keyword Themes
              </label>
              <textarea
                name="observedKeywords"
                value={competitorResearch.observedKeywords}
                onChange={updateCompetitorResearch}
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAnalyzeCompetitorResearch}
              className="rounded-full bg-slate-950 text-white px-6 py-3.5 font-semibold"
            >
              Extract Themes
            </button>

            <button
              type="button"
              onClick={applyResearchToCampaign}
              disabled={!researchOutput}
              className="rounded-full bg-emerald-600 text-white px-6 py-3.5 font-semibold disabled:opacity-50"
            >
              Build Campaign From Research
            </button>

            <button
              type="button"
              onClick={handleAnalyzeResearchWithBackend}
              disabled={analyzingResearch}
              className="rounded-full bg-amber-500 text-slate-950 px-6 py-3.5 font-semibold"
            >
              {analyzingResearch ? 'Analyzing...' : 'Score Research'}
            </button>

            <button
              type="button"
              onClick={handleBuildCleanDraft}
              className="rounded-full bg-emerald-600 text-white px-6 py-3.5 font-semibold"
            >
              Build Clean Draft
            </button>

            <button
              type="button"
              onClick={applyCleanDraftToCampaign}
              disabled={!cleanedCampaignDraft}
              className="rounded-full bg-sky-600 text-white px-6 py-3.5 font-semibold disabled:opacity-50"
            >
              Apply Clean Draft
            </button>
          </div>

          {researchOutput && (
            <div className="mt-6 grid lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Top Themes</div>
                <div className="flex flex-wrap gap-2">
                  {researchOutput.topThemes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  Safer Headline Ideas
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  {researchOutput.saferHeadlineIdeas.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  Safer Keyword Ideas
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  {researchOutput.saferKeywordIdeas.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {researchAnalysis && (
            <div className="mt-6 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Research Analysis
              </h3>

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm text-slate-500">Keywords</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    {researchAnalysis.summary.keywordCount}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm text-slate-500">High Risk Keywords</div>
                  <div className="mt-1 font-semibold text-red-600">
                    {researchAnalysis.summary.highRiskKeywordCount}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm text-slate-500">Brand Keywords</div>
                  <div className="mt-1 font-semibold text-emerald-600">
                    {researchAnalysis.summary.brandKeywordCount}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-700 mb-3">
                    Repeated Themes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {researchAnalysis.repeatedThemes.map((item) => (
                      <span
                        key={item.word}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                      >
                        {item.word} ({item.count})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-700 mb-3">
                    Keyword Risk Review
                  </div>
                  <div className="space-y-2">
                    {researchAnalysis.scoredKeywords.map((item, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border p-3 text-sm ${
                          item.policyRisk === 'high'
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : item.policyRisk === 'medium'
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="font-medium">{item.text}</div>
                        <div className="mt-1 text-xs">
                          Risk: {item.policyRisk} | Intent: {item.intent}
                          {item.matchedPolicyTerms.length > 0 && (
                            <> | Terms: {item.matchedPolicyTerms.join(', ')}</>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {cleanedCampaignDraft && (
            <div className="mt-6 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Clean Campaign Draft
              </h3>

              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-500">Campaign Name</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    {cleanedCampaignDraft.campaignName}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Ad Group</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    {cleanedCampaignDraft.adGroupName}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid lg:grid-cols-3 gap-6">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    Keywords
                  </div>
                  <div className="space-y-2 text-sm text-slate-700">
                    {cleanedCampaignDraft.keywords.split('\n').map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    Headlines
                  </div>
                  <div className="space-y-2 text-sm text-slate-700">
                    {cleanedCampaignDraft.headlines.split('\n').map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    Descriptions
                  </div>
                  <div className="space-y-2 text-sm text-slate-700">
                    {cleanedCampaignDraft.descriptions.split('\n').map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Conversion Tracking
          </h2>
          <p className="mt-2 text-slate-600">
            Create the Appointment Booking conversion action in Google Ads and fetch the tag snippets.
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleCreateAppointmentConversion}
              disabled={creatingConversion}
              className="rounded-full bg-slate-950 text-white px-6 py-3.5 font-semibold"
            >
              {creatingConversion ? 'Creating...' : 'Create Appointment Conversion'}
            </button>

            {creatingConversion && (
              <div className="mt-3 text-sm text-slate-600">
                Creating conversion...
              </div>
            )}
          </div>

          {conversionResult?.conversionAction && (
            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <div className="text-sm text-slate-500">Conversion Resource</div>
              <div className="mt-1 font-semibold text-slate-900 break-all">
                {conversionResult.conversionAction.resource_name}
              </div>

              <div className="mt-4 text-sm text-slate-500">Conversion ID</div>
              <div className="mt-1 font-semibold text-slate-900">
                {conversionResult.conversionAction.id}
              </div>

              <div className="mt-4 text-sm text-slate-500">Tag Snippets</div>
              <pre className="mt-2 whitespace-pre-wrap overflow-auto text-sm text-slate-700">
                {JSON.stringify(conversionResult.conversionAction.tag_snippets, null, 2)}
              </pre>
            </div>
          )}
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
                type="number"
                min="1"
                step="0.01"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Keywords
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
                Headlines
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

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descriptions
            </label>
            <textarea
              name="descriptions"
              value={form.descriptions}
              onChange={updateField}
              rows="5"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />
          </div>

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Brand Safe Only
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Forces branded, lower-risk headlines, keywords, descriptions, and assets.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBrandSafeOnly((prev) => !prev)}
                className={`rounded-full px-4 py-2 font-semibold transition ${
                  brandSafeOnly
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {brandSafeOnly ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Safe Mode</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Filters high-risk healthcare keywords before sending to Google Ads.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSafeMode((prev) => !prev)}
                className={`rounded-full px-4 py-2 font-semibold transition ${
                  safeMode
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {safeMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-wrap gap-3">
              <TabButton id="sitelinks">Sitelinks</TabButton>
              <TabButton id="callouts">Callouts</TabButton>
              <TabButton id="snippets">Structured Snippets</TabButton>
            </div>

            <div className="mt-6">
              {activeTab === 'sitelinks' && (
                <div>
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
              )}

              {activeTab === 'callouts' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Callouts (one per line)
                  </label>
                  <textarea
                    name="callouts"
                    value={form.callouts}
                    onChange={updateField}
                    rows="6"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              )}

              {activeTab === 'snippets' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Structured Snippet (Header|value1, value2, value3)
                  </label>
                  <textarea
                    name="structuredSnippets"
                    value={form.structuredSnippets}
                    onChange={updateField}
                    rows="4"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-slate-950 text-white px-6 py-3.5 font-semibold"
            >
              {submitting ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Campaign Preview</h2>

          {brandSafeOnly && (
            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm">
              Brand Safe Only is active. Submission will use safer branded/local wording.
            </div>
          )}

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-slate-500">Campaign Name</div>
              <div className="font-semibold text-slate-900 mt-1">{form.campaignName}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Budget</div>
              <div className="font-semibold text-slate-900 mt-1">€{form.dailyBudget}</div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">
                Keywords ({keywordList.length})
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm space-y-1">
                {keywordList.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">
                Headlines ({headlineList.length})
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm space-y-1">
                {headlineList.map((item, index) => (
                  <div key={index} className={item.length > 30 ? 'text-red-600' : ''}>
                    {item} <span className="text-slate-400">({item.length}/30)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">
                Descriptions ({descriptionList.length})
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm space-y-1">
                {descriptionList.map((item, index) => (
                  <div key={index} className={item.length > 90 ? 'text-red-600' : ''}>
                    {item} <span className="text-slate-400">({item.length}/90)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-700 mb-3">Sitelinks</div>
              <div className="space-y-2 text-sm">
                {sitelinkList.length === 0 ? (
                  <div className="text-slate-400">None</div>
                ) : (
                  sitelinkList.map((item, index) => (
                    <div key={index} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                      <div className="font-medium text-slate-900">{item.left}</div>
                      <div className="text-slate-500 break-all">{item.right}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-700 mb-3">
                Callouts ({calloutList.length})
              </div>
              <div className="space-y-2 text-sm">
                {calloutList.length === 0 ? (
                  <div className="text-slate-400">None</div>
                ) : (
                  calloutList.map((item, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 ${
                        item.length > 25
                          ? 'bg-red-50 border-red-200 text-red-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {item} <span className="text-slate-400">({item.length}/25)</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-700 mb-3">
                Structured Snippet
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm">
                <div className="font-medium text-slate-900">
                  Header: {structuredSnippet.header || '—'}
                </div>
                <div className="mt-2 text-slate-600">
                  {structuredSnippet.values.length > 0
                    ? structuredSnippet.values.join(', ')
                    : 'No values'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Long Headlines</div>
              <div className={`mt-1 font-semibold ${longHeadlines ? 'text-red-600' : 'text-emerald-600'}`}>
                {longHeadlines}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Long Descriptions</div>
              <div className={`mt-1 font-semibold ${longDescriptions ? 'text-red-600' : 'text-emerald-600'}`}>
                {longDescriptions}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Long Callouts</div>
              <div className={`mt-1 font-semibold ${longCallouts ? 'text-red-600' : 'text-emerald-600'}`}>
                {longCallouts}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-[2rem] bg-red-50 border border-red-200 p-6 text-red-700">
            <div className="font-semibold">Campaign creation failed</div>
            <div className="mt-2">{error}</div>

            {apiDetails?.length > 0 && (
              <div className="mt-4 rounded-[2rem] bg-white border border-red-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Google Ads Policy Details
                </h3>

                <div className="mt-4 space-y-4">
                  {apiDetails.map((item, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 p-4">
                      <div className="text-sm font-semibold text-red-700">
                        {item.message}
                      </div>

                      {item.trigger && (
                        <div className="mt-2 text-sm text-slate-700">
                          <span className="font-medium">Trigger:</span> {item.trigger}
                        </div>
                      )}

                      {item.policy && (
                        <div className="mt-2 text-sm text-slate-700">
                          <div>
                            <span className="font-medium">Policy:</span>{' '}
                            {item.policy.externalPolicyName || item.policy.policyName}
                          </div>
                          {item.policy.violatingText && (
                            <div>
                              <span className="font-medium">Violating text:</span>{' '}
                              {item.policy.violatingText}
                            </div>
                          )}
                        </div>
                      )}

                      {item.location?.length > 0 && (
                        <div className="mt-2 text-xs text-slate-500 break-all">
                          {JSON.stringify(item.location)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-[2rem] bg-emerald-50 border border-emerald-200 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800">Campaign Created</h2>
            <p className="mt-2 text-emerald-700">{result.message}</p>

            {result.keywordErrors?.length > 0 && (
              <div className="mt-4 rounded-[2rem] bg-yellow-50 border border-yellow-200 p-6">
                <h3 className="text-lg font-semibold text-yellow-800">
                  Keyword Review Needed
                </h3>

                <div className="mt-4 space-y-3">
                  {result.keywordErrors.map((item, index) => (
                    <div key={index} className="rounded-xl bg-white border border-yellow-100 p-4">
                      <div className="font-medium text-slate-900">{item.trigger || 'Unknown keyword'}</div>
                      <div className="mt-1 text-sm text-slate-700">{item.message}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Exemptible: {item.isExemptible ? 'Yes' : 'No'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.keywordExemptionRetries?.length > 0 && (
              <div className="mt-4 rounded-[2rem] bg-emerald-50 border border-emerald-200 p-6">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Keyword Exemption Retries
                </h3>

                <div className="mt-4 space-y-3">
                  {result.keywordExemptionRetries.map((item, index) => (
                    <div key={index} className="rounded-xl bg-white border border-emerald-100 p-4">
                      <div className="font-medium text-slate-900">{item.keyword}</div>
                      <div className="mt-1 text-sm text-slate-700">
                        Review request submitted: {item.ok ? 'Yes' : 'No'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500">Campaign Resource</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 break-all">
                  {result.campaignResourceName || '—'}
                </div>
              </div>

              <div className="rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500">Sitelinks Added</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {result.sitelinksAdded ?? 0}
                </div>
              </div>
            </div>

            {result.adGroupResourceName && (
              <div className="mt-4 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500">Ad Group Resource</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 break-all">
                  {result.adGroupResourceName}
                </div>
              </div>
            )}

            {result.keywordCreateResult && (
              <div className="mt-4 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500 mb-2">Keyword Create Result</div>
                <pre className="whitespace-pre-wrap overflow-auto text-sm text-slate-700">
                  {JSON.stringify(result.keywordCreateResult, null, 2)}
                </pre>
              </div>
            )}

            {result.sitelinkAssetResourceNames?.length > 0 && (
              <div className="mt-4 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500 mb-2">Sitelink Asset Resources</div>
                <div className="space-y-2">
                  {result.sitelinkAssetResourceNames.map((item, index) => (
                    <div key={index} className="text-sm text-slate-700 break-all">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.sitelinkError && (
              <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
                <div className="font-semibold">Sitelink warning</div>
                <div className="mt-1 text-sm">{result.sitelinkError}</div>
              </div>
            )}

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500">Callouts Added</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {result.calloutsAdded ?? 0}
                </div>
              </div>
            </div>

            {result.calloutAssetResourceNames?.length > 0 && (
              <div className="mt-4 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500 mb-2">Callout Asset Resources</div>
                <div className="space-y-2">
                  {result.calloutAssetResourceNames.map((item, index) => (
                    <div key={index} className="text-sm text-slate-700 break-all">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.calloutError && (
              <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
                <div className="font-semibold">Callout warning</div>
                <div className="mt-1 text-sm">{result.calloutError}</div>
              </div>
            )}

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500">Structured Snippets Added</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {result.structuredSnippetsAdded ?? 0}
                </div>
              </div>
            </div>

            {result.structuredSnippetAssetResourceNames?.length > 0 && (
              <div className="mt-4 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="text-sm text-slate-500 mb-2">
                  Structured Snippet Asset Resources
                </div>
                <div className="space-y-2">
                  {result.structuredSnippetAssetResourceNames.map((item, index) => (
                    <div key={index} className="text-sm text-slate-700 break-all">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.structuredSnippetError && (
              <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
                <div className="font-semibold">Structured snippet warning</div>
                <div className="mt-1 text-sm">{result.structuredSnippetError}</div>
              </div>
            )}

            {result?.results?.length > 0 && (
              <div className="mt-6 rounded-[2rem] bg-white border border-emerald-100 p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Multi-language Campaign Results
                </h3>
                <div className="mt-4 space-y-4">
                  {result.results.map((item, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.campaignName}</div>
                      <div className="mt-2 text-sm text-slate-700 break-all">
                        {item.campaignResourceName}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        Sitelinks: {item.sitelinksAdded} | Callouts: {item.calloutsAdded} | Structured Snippets: {item.structuredSnippetsAdded}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4">
              {result.result?.mutateOperationResponses?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-emerald-100 p-4 text-sm text-slate-700"
                >
                  <pre className="whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}