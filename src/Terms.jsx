import React from "react";

export default function Terms() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4 leading-8">
          These Terms of Service govern access to and use of the Apex Dental
          Google Ads application and related internal tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Use of the App</h2>
        <p className="mb-4 leading-8">
          This application is intended for authorized use in connection with
          Apex Dental’s advertising and business operations. Unauthorized use is
          prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Third-Party Services
        </h2>
        <p className="mb-4 leading-8">
          This application may connect to Google services, including Google Ads,
          through approved APIs. Use of those services may also be subject to
          Google’s own terms and policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">No Warranty</h2>
        <p className="mb-4 leading-8">
          The application is provided on an “as is” and “as available” basis
          without warranties of any kind, to the extent permitted by applicable
          law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Limitation of Liability
        </h2>
        <p className="mb-4 leading-8">
          Apex Dental shall not be liable for any indirect, incidental, or
          consequential damages arising from use of the application, to the
          extent permitted by law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="leading-8">
          For questions regarding these Terms, contact{" "}
          <a
            href="mailto:jon@apexdental.com.mt"
            className="text-blue-600 underline"
          >
            jon@apexdental.com.mt
          </a>
          .
        </p>
      </section>
    </main>
  );
}