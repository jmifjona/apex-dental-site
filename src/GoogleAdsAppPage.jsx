import React from "react";

export default function GoogleAdsAppPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 pt-32 pb-20">
      <section className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Apex Dental Google Ads App</h1>

        <p className="text-lg leading-8 mb-6">
          This application is used internally by Apex Dental to connect with
          Google Ads and review campaign performance, advertising data, and
          related account information for business marketing purposes.
        </p>

        <p className="text-lg leading-8 mb-6">
          The app may request access to Google account information necessary to
          authenticate users and allow secure access to Google Ads data.
        </p>

        <p className="text-lg leading-8">
          For questions about this application, please contact{" "}
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