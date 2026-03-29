import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-800 pt-32 pb-20">
      <section className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4 leading-8">
          Apex Dental respects your privacy. This Privacy Policy explains how we
          collect, use, and protect information when using our internal Google
          Ads application and related services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Information We Collect
        </h2>
        <p className="mb-4 leading-8">
          We may collect limited account information required for authentication
          and access to Google Ads services, including account identifiers,
          profile information, and advertising account data made available by
          Google through authorized API access.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          How We Use Information
        </h2>
        <p className="mb-4 leading-8">
          We use this information solely to authenticate authorized users,
          access Google Ads account data, review campaign performance, and
          support internal business reporting and advertising management for
          Apex Dental.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Data Sharing</h2>
        <p className="mb-4 leading-8">
          We do not sell personal data. Information accessed through Google APIs
          is used only for the intended business purpose and is not shared with
          unauthorized third parties except where required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Data Security</h2>
        <p className="mb-4 leading-8">
          We take reasonable technical and organizational measures to protect
          data from unauthorized access, misuse, or disclosure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="leading-8">
          If you have questions about this Privacy Policy, please contact{" "}
          <a
            href="mailto:jon@apexdental.com.mt"
            className="text-blue-600 underline"
          >
            jon@apexdental.com.mt
          </a>.
        </p>
      </section>
    </main>
  );
}